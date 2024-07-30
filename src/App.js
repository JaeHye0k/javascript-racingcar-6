import Car from "./Car.js";
import { Console, Random } from "@woowacourse/mission-utils";
import { MESSAGES } from "./messages.js";
import { isValidCarName, isValidTryCount } from "./validators.js";

class App {
	constructor() {
		this.cars = [];
		this.count = 0;
	}
	async play() {
		await this.input();
	}

	async input() {
		let carNames = await Console.readLineAsync(MESSAGES.INPUT.CAR_NAMES);
		isValidCarName(carNames); // 자동차 이름 유효성 검사
		this.cars = carNames.split(",").map((e) => new Car(e));

		let tryCount = await Console.readLineAsync(MESSAGES.INPUT.TRY_COUNT);
		isValidTryCount(tryCount); // 시도할 횟수 유효성 검사
		this.count = +tryCount;
	}
}

export default App;
