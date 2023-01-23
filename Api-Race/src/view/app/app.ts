import Garage from '../garage/garage';
import { getAllCars } from '../../api/api';

class App {
  garage: Garage;

  constructor() {
    this.garage = Garage.getInstance();
  }

  async start() {
    const allCars = await getAllCars();
    await this.garage.drawGarage(allCars);
  }
}

export default App;
