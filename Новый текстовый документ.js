class Animal {
  constructor(){
    this.age = 0;
  };
  grow() {
    this.age++;
  };
};

class Cow extends Animal {
  constuctor() {
    super();  // Реализация поведения родлительского конструктора.
    this.legs = 4; // Реализация поведения дочерниго конструктора.
  };
  grow(){
    this.age += 2;
  };
};

const cow = new Cow();
