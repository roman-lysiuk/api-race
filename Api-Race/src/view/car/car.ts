import { ICarInfo, ICarParams } from '../../interface';

import { imgCar } from '../../assets/icons/car';
import { toggleEngine } from '../../api/api';

class Car {
  img: string;

  color: string;

  name: string;

  id: number | undefined;

  carHTML: HTMLDivElement;

  animation: Animation | null;

  carMoveKeyframes: KeyframeEffect;

  constructor(car: ICarParams) {
    this.color = car.color;
    this.name = car.name;
    this.img = imgCar;
    this.id = car.id;
    this.carHTML = this.createHTMLCar();
    this.carMoveKeyframes = new KeyframeEffect(this.carHTML, [
      { left: '200px' },
      { left: '40%' },
      { left: '50%' },
      { left: '90%' },
    ]);

    this.animation = new Animation(this.carMoveKeyframes, document.timeline);
  }

  createHTMLCar(): HTMLDivElement {
    if (this.carHTML) {
      return this.carHTML;
    }
    const car = document.createElement('div');
    car.classList.add('img-car');

    car.innerHTML = `${this.img}`;

    const svg: SVGElement | null = car.querySelector('svg > g > path');

    if (svg) svg.style.fill = this.color;
    return car;
  }

  getCar(): HTMLDivElement {
    return this.carHTML;
  }

  async startEngine(): Promise<ICarInfo> {
    const id: number | undefined = this.id;
    const carInfo: ICarInfo = await toggleEngine(id!, 'started');

    return carInfo;
  }

  async stopEngine(): Promise<void> {
    const id: number | undefined = this.id;
    toggleEngine(id!, 'stopped');
  }

  runMoveCar(carInfo: ICarInfo): void {
    const durationAnimation = carInfo.distance / carInfo.velocity;
    this.carHTML.style.left = '90%';
    this.carMoveKeyframes.updateTiming({ duration: durationAnimation });
    this.animation!.play();
  }

  stopMoveCar(): void {
    if (this.animation) this.animation.pause();
  }

  returnToStart(): void {
    this.animation!.cancel();
    this.carHTML.style.left = '200px';
  }
}
export default Car;
