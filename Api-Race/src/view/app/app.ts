import Garage from '../garage/garage';

class App {
  garage: Garage;

  constructor() {
    this.garage = new Garage();
  }

  drawMenu() {
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

  start() {
    this.drawMenu();
  }
}

export default App;
