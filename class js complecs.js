class Complex {
  constructor(re,im){
    this.re = re;
    this.im = im;
  }
  plus(z) {
    return new Complex(this.re + z.re, this.im + z.im);
  };
  abs(){
    return new Math.sqrt((this.re * this.re) + (this.im * this.im));
  };
  mult(z) {
      return new Complex((this.re * z.re) - (this.im * z.im)), ((this.im * z.re) + (this.re * z.im));
  };
  toString() {
    if (this.re === 0 && this.im === 0 ) return '0';
    const re = `${this.re === 0 ? '' : this.re }`;
    const plus = `${this.im >= 0 ? `${this.im <=0 || this.re <=0 ? '' : '+'}` : '' }`;
    const im = `${this.im === 0 ? '' : this.im + 'i' }`;
    return `${re}${plus}${im}`;
  };
  pow() {
    return new Complex(Math.pow(this.abs(),n) * Math.cos(n * this.arg()), Math.pow(this.abs(),n) * Math.sin(n * this.arg()));
  };
  arg() {
    if (this.re === 0 && this.im === 0) throw 'Arg not find';
    if (this.re === 0) return this.re < 0 ? (3*Math.PI)/2 : Math.PI/2;
    if (this.im === 0) return this.im < 0 ? Math.PI : 0;
    return new Math.atan(this.im/this.re);
  };
}
