import {
  createCar,
  updateCart,
  getCar,
  deleteCar,
  getAllCars,
  getTotalCar,
  carDriveMode,
  toggleEngine,
} from '../api/api';
import { ICarInfo, ICarParams } from '../interface';
import { getRandomHexColor, getRandomNameCar } from '../utils/utils';
import Garage from '../view/garage/garage';
import Car from '../view/car/car';

export async function handlerCreateCar(e: Event, newCar: ICarParams): Promise<void> {
  const garage = Garage.getInstance();

  e.preventDefault();

  await createCar(newCar);
  const allCars = await getAllCars(Garage.currentPage);
  garage.drawGarage(allCars);
}

export async function handlerUpdateCar(e: Event, car: ICarParams): Promise<void> {
  const garage = Garage.getInstance();

  const updateCarForm = document.querySelector('#update-car-form');
  const carId: number = Number(updateCarForm?.getAttribute('data-update-car-id'));

  e.preventDefault();
  await updateCart(car, carId);
  const allCars = await getAllCars(Garage.currentPage);
  garage.drawGarage(allCars);
}

export async function handlerSelectCar(e: Event): Promise<void> {
  const nameCarUpdateInput: HTMLInputElement | null = document.querySelector('#name-car-update-input');
  const colorCarUpdateInput: HTMLInputElement | null = document.querySelector('#color-car-update-input');
  const updateCarForm = document.querySelector('#update-car-form');

  const currentElement: Element = e.target as Element;
  const carRow: HTMLElement | null = currentElement.closest('.car-row');
  const carId: number = Number(carRow?.getAttribute('data-car-id'));

  const car: ICarParams = await getCar(carId);

  updateCarForm?.setAttribute('data-update-car-id', `${carId}`);

  if (nameCarUpdateInput) nameCarUpdateInput.value = `${car.name}`;
  if (colorCarUpdateInput) colorCarUpdateInput.value = `${car.color}`;
}
export async function handlerRemoveCar(e: Event): Promise<void> {
  const garage = Garage.getInstance();

  const currentElement: Element = e.target as Element;
  const carRow: HTMLElement | null = currentElement.closest('.car-row');
  const carId: number = Number(carRow?.getAttribute('data-car-id'));

  deleteCar(carId).then(async () => {
    const allCars = await getAllCars(Garage.currentPage);
    garage.drawGarage(allCars);
  });
}

export async function nextPage(): Promise<void> {
  const garage = Garage.getInstance();

  const currentPage: number = Garage.currentPage;
  const maxPage = Math.ceil((await getTotalCar()) / 7);

  if (currentPage < maxPage) {
    const allCars = await getAllCars(currentPage + 1);
    Garage.currentPage += 1;
    garage.drawGarage(allCars);
  }
}
export async function prevPage(): Promise<void> {
  const garage = Garage.getInstance();

  const currentPage: number = Garage.currentPage;

  if (Garage.currentPage > 1) {
    const allCars = await getAllCars(currentPage - 1);
    Garage.currentPage -= 1;
    garage.drawGarage(allCars);
  }
}

export async function generateCars(e: Event, quantity: number): Promise<void> {
  for (let i = 0; i < quantity; i += 1) {
    const car: Car = new Car({
      name: getRandomNameCar(),
      color: getRandomHexColor(),
    });
    handlerCreateCar(e, car);
  }
}

export async function race(): Promise<void> {
  const garage = Garage.getInstance();
  const raceParticipants = garage.raceParticipants;
  const startEngine: Promise<ICarInfo>[] = raceParticipants.map((car) => toggleEngine(car.id!, 'started'));
  const drive: Promise<Response>[] = raceParticipants.map((car) => carDriveMode(car.id!, 'drive'));
  const buttonsStartEngine: NodeListOf<HTMLButtonElement> = document.querySelectorAll('#btn-start-engine');
  const buttonsStopEngine: NodeListOf<HTMLButtonElement> = document.querySelectorAll('#btn-stop-engine');
  Promise.all(startEngine).then((carInfo) => {
    carInfo.forEach(async (info, index) => {
      const currentCar = raceParticipants[index];
      const durationAnimation = info.distance / info.velocity;
      currentCar.carHTML.style.left = '90%';
      currentCar.carMoveKeyframes.updateTiming({ duration: durationAnimation });
      currentCar.animation!.play();
    });
    if (buttonsStopEngine) {
      buttonsStopEngine.forEach((button) => {
        const btn: HTMLButtonElement = button;
        btn.disabled = false;
      });
    }

    if (buttonsStartEngine) {
      buttonsStartEngine.forEach((button) => {
        const btn: HTMLButtonElement = button;
        btn.disabled = true;
      });
    }
    drive.forEach(async (promise) => {
      const result = await promise;
      const carId: number = Number(result.url.slice(33, 35).replace('&', ''));
      const currentCar: Car = raceParticipants.filter((car) => car.id === carId)[0];

      if (result.status === 500) currentCar.animation?.pause();
      if (result.status === 200) {
        /* empty */
      }
    });
  });
}

export async function resetRace(): Promise<void> {
  const allButtonStopEngine: NodeListOf<HTMLElement> = document.querySelectorAll('#btn-stop-engine');

  allButtonStopEngine.forEach(async (button) => button.click());
}
