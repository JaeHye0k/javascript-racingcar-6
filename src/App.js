import Car from "./Car.js";
import { Console, Random } from "@woowacourse/mission-utils";
import { MESSAGES } from "./messages.js";
import { isValidCarName, isValidTryCount } from "./validators.js";

/**
 * @property {Car[]} cars 자동차 객체 배열
 * @property {Number} tryCount 시도 횟수
 * @property {String} output 실행 결과
 * @method play 진입점
 * @method input 사용자 입력 처리
 * @method print 실행 결과 출력
 * @method race 하나의 차량이 한 회차에서 수행하는 동작들을 수행하는 함수
 * @method getRandomNumber 랜덤값 추출
 * @method ismoveForward 정지-전진 여부 확인
 * @method getWinner 최종 우승자 추출
 */
class App {
	constructor() {
		this.cars = [];
		this.tryCount = 0;
		this.output = "\n실행 결과\n";
	}
	async play() {
		await this.input();
		for (let i = 0; i < this.tryCount; i++) {
			this.cars.forEach((car) => {
				this.race(car);
				this.output += car.output + "\n";
			});
			this.output += "\n"; // 한 줄 띄우기
		}
		const winners = this.getWinner(this.cars);
		this.output += `최종 우승자 : ${winners.join(", ")}`;
		this.print();
	}

	async input() {
		let carNames = await Console.readLineAsync(MESSAGES.INPUT.CAR_NAMES);
		isValidCarName(carNames); // 자동차 이름 유효성 검사
		this.cars = carNames.split(",").map((e) => new Car(e));

		let tryCount = await Console.readLineAsync(MESSAGES.INPUT.TRY_COUNT);
		isValidTryCount(tryCount); // 시도할 횟수 유효성 검사
		this.tryCount = +tryCount;
	}

	print() {
		Console.print(this.output);
	}

	race(car) {
		const num = this.getRandomNumber();
		const moveForward = this.ismoveForward(num);
		if (moveForward) car.moveForward();
	}

	getRandomNumber() {
		return Random.pickNumberInRange(0, 9);
	}

	ismoveForward(num) {
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
