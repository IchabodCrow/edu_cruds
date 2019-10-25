function Complex(re,im) {
  return {
    re,
    im,
    plus: function(z){
      return Complex(this.re + z.re, this.im + z.im);
    },
    abs: function(){
      return Math.sqrt((this.re * this.re) + (this.im * this.im));
    },
    mult: function(z){
      return Complex((this.re * z.re) - (this.im * z.im)), ((this.im * z.re) + (this.re * z.im));
    },
    toString: function(){
      if (this.re === 0 && this.im === 0 ) return 0;
      const re = `${this.re === 0 ? '' : this.re }`;
      const plus = `${this.im >= 0 ? `${this.im <=0 || this.re <=0 ? '' : '+'}` : '' }`;
      const im = `${this.im === 0 ? '' : this.im + 'i' }`;
      return `${re}${plus}${im}`;
    },
    pow: function(n){
      return Complex(Math.pow(this.abs(),n) * Math.cos(n * this.arg()), Math.pow(this.abs(),n) * Math.sin(n * this.arg()));
    },
    arg: function() {
      if (this.re === 0 && this.im === 0) throw 'Arg not find';
      if (this.re === 0) return this.re < 0 ? (3*Math.PI)/2 : Math.PI/2;
      if (this.im === 0) return this.im < 0 ? Math.PI : 0;
      return Math.atan(this.im/this.re);
    }
  };
}
// a + bi = z
const z10 = Complex(0,0);
try {
  console.log(z1.pow(2));
} catch (error) {
  console.warn('Sheet hapenes' + error);
}
const z1 = Complex(0,0);
console.log(z1.toString());
const z2 = Complex(2,-6);
console.log(z2.toString());
const z4 = Complex(2,0);
console.log(z4.toString());
const z5 = Complex(0,2);
console.log(z5.toString());
const z6 = Complex(2,1);
console.log(z6.toString());
const z7 = Complex(2,-1);
console.log(z7.toString());

// console.log(z1.plus(z2));
// console.log(z1.abs());
// console.log(z1.mult(z2));
// console.log(z1.toString());

faf = {
  foo: 1,
  bar: function() {
    const that = this;
    const calculate = function() {
      console.log(that.foo);
    }
      calculate()
  }
}

console.log(faf.bar());

foof = {
  foo: 1,
  bar: function() {
    const calculate = () => console.log(this.foo);
      calculate()
  }
}
