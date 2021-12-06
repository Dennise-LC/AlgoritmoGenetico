// Genetic Algorithm, Evolving Shakespeare

// Una clase para describir una población de organismos virtuales.
// En este caso, cada organismo es solo una instancia de un objeto de ADN.

class Population {
  constructor(p, m, num) {
    this.population; // Matriz para contener la población actual
    this.matingPool; // ArrayList que usaremos para nuestro "grupo de apareamiento"
    this.generations = 0; // Numero de generaciones
    this.finished = false; // ¿Hemos terminado de evolucionar?
    this.target = p; // Frase de destino
    this.mutationRate = m; // Tasa de mutacion
    this.perfectScore = 1;

    this.best = "";

    this.population = [];
    for (let i = 0; i < num; i++) {
      this.population[i] = new DNA(this.target.length);
    }
    this.matingPool = [];
    this.calcFitness();
  }

  // Llene nuestra matriz de fitness con un valor para cada miembro de la población
  calcFitness() {
    for (let i = 0; i < this.population.length; i++) {
      this.population[i].calcFitness(target);
    }
  }

  // Generate a mating pool
  naturalSelection() {
    // Borrar ArrayList
    this.matingPool = [];

    let maxFitness = 0;
    for (let i = 0; i < this.population.length; i++) {
      if (this.population[i].fitness > maxFitness) {
        maxFitness = this.population[i].fitness;
      }
    }

    // Según la condición física, cada miembro se agregará al grupo de apareamiento una cierta cantidad de veces
    // una mayor aptitud = más entradas al grupo de apareamiento = más probabilidades de ser elegido como padre
    // menor aptitud = menos entradas al grupo de apareamiento = menos probabilidades de ser elegido como padre
    for (let i = 0; i < this.population.length; i++) {
      let fitness = map(this.population[i].fitness, 0, maxFitness, 0, 1);
      let n = floor(fitness * 100); // Multiplicador arbitrario, también podemos usar el método monte carlo
      for (let j = 0; j < n; j++) {
        // y elige dos números aleatorios
        this.matingPool.push(this.population[i]);
      }
    }
  }

  // Crea una nueva generación
  generate() {
    // Rellenar la población con niños del grupo de apareamiento.
    for (let i = 0; i < this.population.length; i++) {
      let a = floor(random(this.matingPool.length));
      let b = floor(random(this.matingPool.length));
      let partnerA = this.matingPool[a];
      let partnerB = this.matingPool[b];
      let child = partnerA.crossover(partnerB);
      child.mutate(this.mutationRate);
      this.population[i] = child;
    }
    this.generations++;
  }

  getBest() {
    return this.best;
  }

  // Calcule el miembro actual "más apto" de la población
  evaluate() {
    let worldrecord = 0.0;
    let index = 0;
    for (let i = 0; i < this.population.length; i++) {
      if (this.population[i].fitness > worldrecord) {
        index = i;
        worldrecord = this.population[i].fitness;
      }
    }

    this.best = this.population[index].getPhrase();
    if (worldrecord === this.perfectScore) {
      this.finished = true;
    }
  }

  isFinished() {
    return this.finished;
  }

  getGenerations() {
    return this.generations;
  }

  // Calcular la aptitud promedio para la población
  getAverageFitness() {
    let total = 0;
    for (let i = 0; i < this.population.length; i++) {
      total += this.population[i].fitness;
    }
    return total / this.population.length;
  }

  allPhrases() {
    let everything = "";

    let displayLimit = min(this.population.length, 50);

    for (let i = 0; i < displayLimit; i++) {
      everything += "<tr>" + "<td>" + this.population[i].getPhrase() + "</td>" + "</tr>";
    }
    return everything;
  }
}
