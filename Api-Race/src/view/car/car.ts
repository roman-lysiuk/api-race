import { ICar } from '../../interface';

import { imgCar } from '../../assets/icons/car';

class Car {
  img: string;

  color: string;

  name: string;

  id: number | undefined;

  constructor(car: ICar) {
    this.color = car.color;
    this.name = car.name;
    this.img = imgCar;
    this.id = car.id;
  }

  getCar() {
    const car = document.createElement('div');
    car.classList.add('img-car');

    car.innerHTML = `${this.img}`;

    const svg: SVGElement | null = car.querySelector('svg > g > path');

    if (svg) svg.style.fill = this.color;
    return car;
  }
}
export default Car;
