interface Builder {
  addDitch(): void;
  addBasement(): void;
  addWalls(): void;
  addFacade(): void;
  addRoff(): void;
}

class House {
  public partsHouse: string[] = [];

  public getHouseParts(): void {
    console.log(`Дом состоит из: ${this.partsHouse.join(', ')}`);
  }
}

class HouseBuilder implements Builder {
  private house: House;

  constructor() {
    this.init();
  }

  public init(): void {
    this.house = new House();
  }

  public addDitch(): void {
    this.house.partsHouse.push('Катлован');
  }

  public addBasement() {
    this.house.partsHouse.push('Фундамент');
  }

  public addWalls() {
    this.house.partsHouse.push('Стены');
  }

  public addFacade() {
    this.house.partsHouse.push('Фасад');
  }

  public addRoff() {
    this.house.partsHouse.push('Крыша');
  }

  public buildHouse(): House {
    const structure = this.house;
    this.init();
    return structure;
  }
}

const house = new HouseBuilder();
house.addDitch();
house.addBasement();
house.addWalls();
house.addFacade();
house.addRoff();
house.buildHouse().getHouseParts();
