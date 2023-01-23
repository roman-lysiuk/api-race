import Car from './view/car/car';

export type AllCars = Array<Car>;
export type StatusEngine = 'started' | 'stopped';
export type DriveMode = 'drive';
export interface ICarInfo {
  velocity: 64;
  distance: 500000;
}

export interface ICarParams {
  id?: number;
  name: string;
  color: string;
}
