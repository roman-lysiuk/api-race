import { AllCars, ICar } from '../interface';
const BASE_URL: string | undefined = process.env.BASE_URL;
const PORT: string | undefined = process.env.PORT;
const defaultPage: number = 1;
const limitCarForPage: number = 7;

export async function getAllCars(page = defaultPage, limit = limitCarForPage): Promise<AllCars> {
  const response: Response = await fetch(`${BASE_URL}:${PORT}/garage?_page=${page}&_limit=${limit}`);
  const allCart: AllCars = await response.json();

  return allCart;
}

export async function getCar(id: number): Promise<ICar> {
  const response: Response = await fetch(`${BASE_URL}:${PORT}/garage/${id}`);
  const car: ICar = await response.json();

  return car;
}

export async function createCar(car: ICar): Promise<ICar> {
  const response: Response = await fetch(`${BASE_URL}:${PORT}/garage/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(car),
  });
  const newCar: ICar = await response.json();

  return newCar;
}

export async function deleteCar(id: number): Promise<ICar> {
  const response: Response = await fetch(`${BASE_URL}:${PORT}/garage/${id}`, { method: 'DELETE' });
  const deletedCar: ICar = await response.json();

  return deletedCar;
}

export async function updateCart(car: ICar): Promise<ICar> {
  const response: Response = await fetch(`${BASE_URL}:${PORT}/garage/${car.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(car),
  });
  const updatedCart: ICar = await response.json();

  return updatedCart;
}
