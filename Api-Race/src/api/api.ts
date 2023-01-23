import {
  AllCars,
  StatusEngine,
  ICarInfo,
  DriveMode,
  ICarParams,
} from '../interface';
const BASE_URL: string | undefined = process.env.BASE_URL;
const PORT: string | undefined = process.env.PORT;
const defaultPage: number = 1;
const limitCarForPage: number = 7;

export async function getAllCars(page = defaultPage, limit = limitCarForPage): Promise<AllCars> {
  const response: Response = await fetch(`
  ${BASE_URL}:${PORT}/garage?_page=${page}&_limit=${limit}`);

  const allCart: AllCars = await response.json();

  return allCart;
}

export async function getCar(id: number): Promise<ICarParams> {
  const response: Response = await fetch(`${BASE_URL}:${PORT}/garage/${id}`);
  const car: ICarParams = await response.json();

  return car;
}

export async function createCar(car: ICarParams): Promise<ICarParams> {
  const response: Response = await fetch(`${BASE_URL}:${PORT}/garage/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(car),
  });
  const newCar: ICarParams = await response.json();

  return newCar;
}

export async function deleteCar(id: number): Promise<ICarParams> {
  const response: Response = await fetch(`${BASE_URL}:${PORT}/garage/${id}`, { method: 'DELETE' });
  const deletedCar: ICarParams = await response.json();

  return deletedCar;
}

export async function updateCart(car: ICarParams, id: number): Promise<ICarParams> {
  const response: Response = await fetch(`${BASE_URL}:${PORT}/garage/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(car),
  });
  const updatedCart: ICarParams = await response.json();

  return updatedCart;
}
export async function getTotalCar(): Promise<number> {
  const response: Response = await fetch(`${BASE_URL}:${PORT}/garage?_limit=${limitCarForPage}`);
  const totalCar: number = Number(response.headers.get('X-Total-Count'));
  return totalCar;
}

export async function toggleEngine(id: number, status: StatusEngine): Promise<ICarInfo> {
  const response: Response = await fetch(`${BASE_URL}:${PORT}/engine/?id=${id}&status=${status}`, {
    method: 'PATCH',
  });
  const carInfo: ICarInfo = await response.json();
  return carInfo;
}
export async function carDriveMode(id: number, status: DriveMode): Promise<Response> {
  const response: Response = await fetch(`${BASE_URL}:${PORT}/engine/?id=${id}&status=${status}`, {
    method: 'PATCH',
  });

  return response;
}
