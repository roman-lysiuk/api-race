import App from './view/app/app';
import './global.scss';

const app = new App();

export async function main() {
  await app.start();
}
main();
