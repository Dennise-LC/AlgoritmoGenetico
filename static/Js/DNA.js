
function newChar() {
  let c = floor(random(63, 122));
  if (c === 63) c = 32;
  if (c === 64) c = 46;

  return String.fromCharCode(c);
}

// Constructora (hace un ADN aleatorio)
class DNA {
  constructor(num) {
    // La secuencia genética
    this.genes = [];
    this.fitness = 0;
    for (let i = 0; i < num; i++) {
      this.genes[i] = newChar(); // Elija entre una variedad de caracteres
    }
  }

  // Convierte la matriz de caracteres en una cadena
  getPhrase() {
    return this.genes.join("");
  }

  // Función de aptitud (devuelve% de coma flotante de caracteres "correctos")
  calcFitness(target) {
    let score = 0;
    for (let i = 0; i < this.genes.length; i++) {
      if (this.genes[i] == target.charAt(i)) {
        score++;
      }
    }
    this.fitness = score / target.length;
    this.fitness = pow(this.fitness, 4);
  }

  // Crossover
  crossover(partner) {
    //Un nuevo hijo
    let child = new DNA(this.genes.length);

    let midpoint = floor(random(this.genes.length)); // Pick a midpoint

    // La mitad de una, la mitad de la otra
    for (let i = 0; i < this.genes.length; i++) {
      if (i > midpoint) child.genes[i] = this.genes[i];
      else child.genes[i] = partner.genes[i];
    }
    return child;
  }

  // Según una probabilidad de mutación, elige un nuevo carácter aleatorio
  mutate(mutationRate) {
    for (let i = 0; i < this.genes.length; i++) {
      if (random(1) < mutationRate) {
        this.genes[i] = newChar();
      }
    }
  }
}
