import Car from '../car/car';
import redFlag from '../../assets/icons/red_flag.svg';

import {
  handlerCreateCar,
  handlerRemoveCar,
  handlerSelectCar,
  handlerUpdateCar,
  nextPage,
  prevPage,
  generateCars,
  race,
  resetRace,
} from '../../handlers/handlers';
import { AllCars, ICarInfo, ICarParams } from '../../interface';
import { getRandomHexColor, getRandomNameCar } from '../../utils/utils';

import { carDriveMode, getTotalCar } from '../../api/api';

class Garage {
  static currentPage: number = 1;

  private static instance: Garage;

  raceParticipants: Array<Car> = [];

  public static getInstance(): Garage {
    if (!Garage.instance) {
      Garage.instance = new Garage();
    }

    return Garage.instance;
  }

  async drawGarage(cars: AllCars): Promise<void> {
    const totalCar: number = await getTotalCar();

    document.body.innerHTML = '';
    this.drawMenu();
    this.drawControlPanel();
    this.drawTotalCarsTitle(totalCar);
    this.drawCars(cars);
    this.drawPagination();
  }

  private drawMenu(): void {
    const body: HTMLElement = document.body;
    const menu = document.createElement('div');
    const buttonGarage: HTMLButtonElement = document.createElement('button');
    const buttonWinners: HTMLButtonElement = document.createElement('button');

    menu.classList.add('menu');

    buttonGarage.innerHTML = 'To Garage';
    buttonWinners.innerHTML = 'To Winners';

    buttonGarage.setAttribute('id', 'btn-garage');
    buttonWinners.setAttribute('id', 'btn-winners');
    menu.appendChild(buttonGarage);
    menu.appendChild(buttonWinners);

    body.append(menu);
  }

  private drawControlPanel(): void {
    const controlPanel: HTMLDivElement = document.createElement('div');
    const createCarForm: HTMLFormElement = this.getCreateCarForm();
    const updateCarForm: HTMLFormElement = this.getUpdateCarForm();
    const animationRowButton: HTMLElement = this.getAnimationRowButton();

    controlPanel.append(createCarForm, updateCarForm, animationRowButton);

    document.body.appendChild(controlPanel);
  }

  private getAnimationRowButton(): HTMLElement {
    const buttonRow = document.createElement('div');
    const buttonRace: HTMLButtonElement = document.createElement('button');
    const buttonReset: HTMLButtonElement = document.createElement('button');
    const buttonGenerate: HTMLButtonElement = document.createElement('button');

    buttonRace.textContent = 'Race';
    buttonReset.textContent = 'Reset';
    buttonGenerate.textContent = 'Generate 100 car';

    buttonRace.addEventListener('click', race);
    buttonReset.addEventListener('click', resetRace);
    buttonGenerate.addEventListener('click', (e: Event) => {
      generateCars(e, 100);
    });

    buttonRow.id = 'animation-button-row';
    buttonRow.append(buttonRace, buttonReset, buttonGenerate);

    return buttonRow;
  }

  private getCreateCarForm(): HTMLFormElement {
    const createCarForm: HTMLFormElement = document.createElement('form');
    const nameCarInput: HTMLInputElement = document.createElement('input');
    const colorCarInput: HTMLInputElement = document.createElement('input');
    const buttonCreateCar: HTMLButtonElement = document.createElement('button');

    createCarForm.id = 'create-car-form';

    nameCarInput.type = 'text';
    colorCarInput.type = 'color';

    nameCarInput.placeholder = 'Enter name car';

    nameCarInput.setAttribute('id', 'name-car-create-input');
    colorCarInput.setAttribute('id', 'color-car-create-input');
    buttonCreateCar.setAttribute('id', 'btn-create--car');

    buttonCreateCar.addEventListener('click', (e) => {
      const newCar: ICarParams = {
        name: nameCarInput.value ? nameCarInput.value : getRandomNameCar(),
        color: colorCarInput.value !== '#000000' ? colorCarInput.value : getRandomHexColor(),
      };

      handlerCreateCar(e, newCar);
    });

    buttonCreateCar.textContent = 'Create Car';

    createCarForm.append(nameCarInput, colorCarInput, buttonCreateCar);

    return createCarForm;
  }

  private getUpdateCarForm(): HTMLFormElement {
    const updateCarForm: HTMLFormElement = document.createElement('form');
    const nameCarInput: HTMLInputElement = document.createElement('input');
    const colorCarInput: HTMLInputElement = document.createElement('input');
    const buttonUpdateCar: HTMLButtonElement = document.createElement('button');

    updateCarForm.id = 'update-car-form';

    buttonUpdateCar.addEventListener('click', (e) => {
      const updateCar = {
        name: nameCarInput.value,
        color: colorCarInput.value,
      };

      handlerUpdateCar(e, updateCar);
    });

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
    const title: HTMLHeadElement = document.createElement('h2');
    const numberCars: HTMLSpanElement = document.createElement('span');

    title.classList.add('title-garage');

    numberCars.setAttribute('id', 'title-garage');

    title.textContent = 'Garage ';
    numberCars.textContent = `( ${cars} )`;

    title.append(numberCars);

    document.body.appendChild(title);
  }

  private drawCars(cars: AllCars): void {
    const garageDOM = document.body.querySelector('#garage');
    if (garageDOM) {
      garageDOM.remove();
    }
    const garage = document.createElement('div');
    garage.id = 'garage';
    cars.forEach((car) => garage.append(this.getCarRow(car)));
    document.body.appendChild(garage);
  }

  private getCarRow(car: ICarParams): HTMLElement {
    const carRow: HTMLDivElement = document.createElement('div');
    const controlCar = this.getControlCar(car);
    const roadCar = this.getRoadCar(car);

    carRow.classList.add('car-row');
    carRow.setAttribute('data-car-id', `${car.id}`);

    carRow.append(controlCar);
    carRow.append(roadCar);

    return carRow;
  }

  private getControlCar(car: ICarParams): HTMLElement {
    const controlCar: HTMLDivElement = document.createElement('div');
    const buttonSelectCar: HTMLButtonElement = document.createElement('button');
    const buttonRemoveCar: HTMLButtonElement = document.createElement('button');
    const carName: HTMLHeadingElement = document.createElement('h5');

    controlCar.classList.add('control-car');

    buttonSelectCar.addEventListener('click', handlerSelectCar);
    buttonRemoveCar.addEventListener('click', handlerRemoveCar);

    buttonSelectCar.id = 'select';
    buttonRemoveCar.id = 'remove';

    buttonSelectCar.textContent = 'Select';
    buttonRemoveCar.textContent = 'Remove';

    carName.textContent = car.name;

    controlCar.append(buttonSelectCar);
    controlCar.append(buttonRemoveCar);
    controlCar.append(carName);
    return controlCar;
  }

  private getRoadCar(car: ICarParams): HTMLElement {
    const newCar: Car = new Car(car);
    const carHtml: HTMLDivElement = newCar.carHTML;
    this.raceParticipants.push(newCar);
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
    winFlag.src = redFlag;
    winFlag.style.width = '25px';
    winFlag.style.position = 'fixed';
    winFlag.style.left = '89%';
    buttonStopEngine.disabled = true;
    buttonStartEngine.addEventListener('click', async () => {
      const carInfo: ICarInfo = await newCar.startEngine();
      newCar.runMoveCar(carInfo);
      buttonStopEngine.disabled = false;
      buttonStartEngine.disabled = true;
      if ((await carDriveMode(newCar.id!, 'drive')).status !== 200) {
        newCar.stopMoveCar();
      }
    });
    buttonStopEngine.addEventListener('click', async () => {
      buttonStopEngine.disabled = true;
      buttonStartEngine.disabled = false;
      newCar.stopEngine().then(() => newCar.returnToStart());
    });

    road.append(buttonStartEngine, buttonStopEngine, carHtml, winFlag);

    return road;
  }

  private drawPagination(): void {
    const garage: HTMLElement | null = document.querySelector('#garage');
    const titlePagination: HTMLHeadElement = document.createElement('h3');
    const buttonRow: HTMLDivElement = document.createElement('div');
    const btnPrevPage: HTMLButtonElement = document.createElement('button');
    const btnNextPage: HTMLButtonElement = document.createElement('button');

    btnNextPage.addEventListener('click', nextPage);
    btnPrevPage.addEventListener('click', prevPage);

    btnNextPage.id = 'pagination-next';
    btnNextPage.textContent = 'Next Page';
    btnPrevPage.textContent = 'Prev Page';

    titlePagination.innerHTML = `Page: #<span id="current-page"> ${Garage.currentPage}</span>`;
    buttonRow.append(btnPrevPage, btnNextPage);

    if (garage) {
      garage.insertAdjacentElement('beforebegin', titlePagination);
      garage.insertAdjacentElement('afterend', buttonRow);
    }
  }
}
export default Garage;
