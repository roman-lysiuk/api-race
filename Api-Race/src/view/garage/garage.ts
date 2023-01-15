import Car from '../car/car';

import { ICar, AllCars } from '../../interface';

class Garage {
  drawGarage(cars: AllCars): void {
    this.drawControlPanel();
    this.drawTotalCarsTitle(5);
    this.drawCars(cars);
  }

  private drawControlPanel(): void {
    const body: HTMLElement = document.body;
    const controlPanel: HTMLDivElement = document.createElement('div');
    const createCarForm: HTMLFormElement = this.getCreateCarForm();
    const updateCarForm: HTMLFormElement = this.getUpdateCarForm();

    controlPanel.append(createCarForm);
    controlPanel.append(updateCarForm);
    body.append(controlPanel);
  }

  private getCreateCarForm(): HTMLFormElement {
    const createCarForm: HTMLFormElement = document.createElement('form');
    const nameCarInput: HTMLInputElement = document.createElement('input');
    const colorCarInput: HTMLInputElement = document.createElement('input');
    const buttonCreateCar: HTMLButtonElement = document.createElement('button');

    nameCarInput.type = 'text';
    colorCarInput.type = 'color';

    nameCarInput.placeholder = 'Enter name car';

    nameCarInput.setAttribute('id', 'name-car-create-input');
    colorCarInput.setAttribute('id', 'color-car-create-input');
    buttonCreateCar.setAttribute('id', 'btn-create--car');

    buttonCreateCar.textContent = 'Create Car';

    createCarForm.appendChild(nameCarInput);
    createCarForm.appendChild(colorCarInput);
    createCarForm.appendChild(buttonCreateCar);

    return createCarForm;
  }

  private getUpdateCarForm(): HTMLFormElement {
    const updateCarForm: HTMLFormElement = document.createElement('form');
    const nameCarInput: HTMLInputElement = document.createElement('input');
    const colorCarInput: HTMLInputElement = document.createElement('input');
    const buttonUpdateCar: HTMLButtonElement = document.createElement('button');

    nameCarInput.type = 'text';
    colorCarInput.type = 'color';

    nameCarInput.setAttribute('id', 'name-car-update-input');
    colorCarInput.setAttribute('id', 'color-car-update-input');
    buttonUpdateCar.setAttribute('id', 'btn-update-car');

    buttonUpdateCar.textContent = 'Update Car';

    updateCarForm.appendChild(nameCarInput);
    updateCarForm.appendChild(colorCarInput);
    updateCarForm.appendChild(buttonUpdateCar);

    return updateCarForm;
  }

  private drawTotalCarsTitle(cars: number): void {
    const body: HTMLElement = document.body;
    const title: HTMLHeadElement = document.createElement('h2');
    const numberCars: HTMLSpanElement = document.createElement('span');

    title.classList.add('title-garage');

    numberCars.setAttribute('id', 'title-garage');

    title.textContent = 'Garage ';
    numberCars.textContent = `( ${cars} )`;

    title.append(numberCars);
    body.append(title);
  }

  private drawCars(cars: AllCars) {
    cars.forEach((car) => this.drawCarRow(car));
  }

  private drawCarRow(car: ICar): void {
    const body = document.body;
    const carRow: HTMLDivElement = document.createElement('div');
    const controlCar = this.getControlCar(car);
    const roadCar = this.getRoadCar(car);

    carRow.classList.add('car-row');

    carRow.append(controlCar);
    carRow.append(roadCar);

    body.append(carRow);
  }

  private getControlCar(car: ICar): HTMLElement {
    const controlCar: HTMLDivElement = document.createElement('div');
    const buttonSelectCar: HTMLButtonElement = document.createElement('button');
    const buttonRemoveCar: HTMLButtonElement = document.createElement('button');
    const carName: HTMLHeadingElement = document.createElement('h5');

    controlCar.classList.add('control-car');

    buttonSelectCar.textContent = 'Select';
    buttonRemoveCar.textContent = 'Remove';
    carName.textContent = car.name;

    controlCar.append(buttonSelectCar);
    controlCar.append(buttonRemoveCar);
    controlCar.append(carName);
    return controlCar;
  }

  private getRoadCar(car: ICar): HTMLElement {
    const newCar = new Car(car).getCar();

    const road: HTMLDivElement = document.createElement('div');
    const buttonStartEngine: HTMLButtonElement = document.createElement('button');
    const buttonStopEngine: HTMLButtonElement = document.createElement('button');
    const winFlag: HTMLImageElement = document.createElement('img');

    road.classList.add('road');

    buttonStartEngine.id = 'btn-start-engine';
    buttonStopEngine.id = 'btn-stop-engine';
    winFlag.id = 'win-flag';

    buttonStartEngine.textContent = 'Start Engine';
    buttonStopEngine.textContent = 'Stop Engine';
    // winFlag.src =

    road.append(buttonStartEngine);
    road.append(buttonStopEngine);
    road.append(newCar);
    road.append(winFlag);

    return road;
  }
}
export default Garage;
