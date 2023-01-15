import { AllCars, Car } from '../interface';

const BASE_URL: string | undefined = process.env.BASE_URL;
const PORT: string | undefined = process.env.PORT;
const defaultPage: number = 1;
const limitCarForPage: number = 7;

export async function getAllCars(page = defaultPage, limit = limitCarForPage): Promise<AllCars> {
  const response: Response = await fetch(`${BASE_URL}:${PORT}/garage?_page=${page}&_limit=${limit}`);
  const allCart: AllCars = await response.json();

  return allCart;
}

export async function getCar(id: number): Promise<Car> {
  const response: Response = await fetch(`${BASE_URL}:${PORT}/garage/${id}`);
  const car: Car = await response.json();

  return car;
}

export async function createCar(car: Car): Promise<Car> {
  const response: Response = await fetch(`${BASE_URL}:${PORT}/garage/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(car),
  });
  const newCar: Car = await response.json();

  return newCar;
}

export async function deleteCar(id: number): Promise<Car> {
  const response: Response = await fetch(`${BASE_URL}:${PORT}/garage/${id}`, { method: 'DELETE' });
  const deletedCar: Car = await response.json();

  return deletedCar;
}

export async function updateCart(car: Car): Promise<Car> {
  const response: Response = await fetch(`${BASE_URL}:${PORT}/garage/${car.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(car),
  });
  const updatedCart: Car = await response.json();

  return updatedCart;
}
