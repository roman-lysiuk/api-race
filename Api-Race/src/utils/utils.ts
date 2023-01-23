function getRandomNumber(max: number): number {
  return Math.floor(Math.random() * (max + 1));
}

export function getRandomHexColor(): string {
  const red = getRandomNumber(255).toString(16).padStart(2, '0');
  const green = getRandomNumber(255).toString(16).padStart(2, '0');
  const blue = getRandomNumber(255).toString(16).padStart(2, '0');
  return `#${red}${green}${blue}`;
}
export function getRandomNameCar(): string {
  const brandCar = ['Audi', 'BMW', 'Ford', 'Honda', 'Hyundai', 'Kia', 'Lada', 'Mazda', 'Skoda', 'Toyota', 'Volkswagen'];
  const modelCar = [
    'M2',
    '7',
    '8',
    '8 Gran Coupe',
    '3',
    '5',
    'M8',
    '4',
    'M5',
    'A8',
    'A4 ',
    'A6',
    'S5',
    'A5',
    'A3',
    'RS6',
    'E-tron',
  ];

  return brandCar[getRandomNumber(brandCar.length - 1)] + ' ' + modelCar[getRandomNumber(modelCar.length - 1)];
}
