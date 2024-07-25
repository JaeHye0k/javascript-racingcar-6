import Car from "./Car.js";
import { Console, Random } from "@woowacourse/mission-utils";

class App {
	constructor() {
		this.cars = [];
		this.count = 0;
	}
	async play() {
		this.input();
	}

	async input() {
		let carNames = await Console.readLineAsync(
			"경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)\n"
		);
		carNames = carNames.split(",");
		for (const name of carNames) {
			this.cars.push(new Car(name));
		}
		let tryCount = +(await Console.readLineAsync(
			"시도할 횟수는 몇 회인가요?\n"
		));
	}
}

export default App;
