import Car from "./Car.js";
import { Console, Random } from "@woowacourse/mission-utils";
import { MESSAGES } from "./messages.js";
import { isValidCarName, isValidTryCount } from "./validators.js";

class App {
	constructor() {
		this.cars = [];
		this.tryCount = 0;
	}
	async play() {
		await this.input();
		Console.print("\n실행 결과");
		for (let i = 0; i < this.tryCount; i++) {
			this.cars.forEach((car) => {
				this.race(car);
				Console.print(car.output); // 각 차의 실행 결과 출력
			});
			Console.print(""); // 한 줄 띄우기
		}
		const winners = this.getWinner(this.cars);
		Console.print(`최종 우승자 : ${winners.join(", ")}`);
	}

	async input() {
		let carNames = await Console.readLineAsync(MESSAGES.INPUT.CAR_NAMES);
		isValidCarName(carNames); // 자동차 이름 유효성 검사
		this.cars = carNames.split(",").map((e) => new Car(e));

		let tryCount = await Console.readLineAsync(MESSAGES.INPUT.TRY_COUNT);
		isValidTryCount(tryCount); // 시도할 횟수 유효성 검사
		this.tryCount = +tryCount;
	}

	race(car) {
		const num = this.getRandomNumber();
		const moveFoward = this.isMoveFoward(num);
		if (moveFoward) car.moveFoward();
	}

	getRandomNumber() {
		return Random.pickNumberInRange(0, 9);
	}

	isMoveFoward(num) {
		return num >= 4;
	}

	getWinner(cars) {
		const winners = [];
		let max = 0;
		cars.forEach(({ moveCount, name }) => {
			if (moveCount > max) {
				winners.length = 0;
				winners.push(name);
				max = moveCount;
			} else if (moveCount === max) {
				winners.push(name);
			}
		});
		return winners;
	}
}

export default App;
