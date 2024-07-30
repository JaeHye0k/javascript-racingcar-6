/**
 * @property {String} name 자동차 이름
 * @property {Number} moveCount 전진 횟수
 */
class Car {
	constructor(name) {
		this.name = name;
		this.moveCount = 0;
		this.output = `${name} : `;
	}
	moveFoward() {
		this.output += "-";
		this.moveCount += 1;
	}
}

export default Car;
