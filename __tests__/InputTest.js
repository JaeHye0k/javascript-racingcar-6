import App from "../src/App.js";
import { MESSAGES } from "../src/messages.js";
import { isValidCarName, isValidTryCount } from "../src/validators.js";
import { mockQuestions } from "./ApplicationTest.js";

describe("입력 테스트", () => {
	const PASS_CASE = [
		[
			["a,ab,abc,abcd", "2"],
			["a,ab,abc,abcd", "2"],
		],
		[
			["Ose,WER,QWER", "9"],
			["Ose,WER,QWER", "9"],
		],
	];
	const ERROR_CAR_NAME_CASE = [
		["a,a", MESSAGES.ERROR.NO_DUPLICATION],
		["abcdef", MESSAGES.ERROR.OVER_FIVE_CHARACTER],
		[" ab,abc,de", MESSAGES.ERROR.SIDE_SPACE],
		["ab,abc,de ", MESSAGES.ERROR.SIDE_SPACE],
		["ab,abc,", MESSAGES.ERROR.SIDE_SPACE],
	];

	const ERROR_TRY_COUNT_CASE = [
		["a", MESSAGES.ERROR.NOT_A_NUMBER],
		["10", MESSAGES.ERROR.OUT_OF_RANGE],
		["-1", MESSAGES.ERROR.OUT_OF_RANGE],
	];

	test.each(PASS_CASE)("통과하는 케이스", async (input, output) => {
		// given
		mockQuestions(input);

		// when
		const app = new App();
		await app.input();

		// then
		expect(app.cars.map((car) => car.name).join(",")).toBe(output[0]);
		expect(app.count).toBe(+output[1]);
	});

	test.each(ERROR_CAR_NAME_CASE)("자동차 이름 예외 케이스", (input, errorMessage) => {
		// given
		mockQuestions(input);
		// when & then
		expect(() => isValidCarName(input)).toThrow(errorMessage);
	});

	test.each(ERROR_TRY_COUNT_CASE)("시도 횟수 예외 케이스", (input, errorMessage) => {
		// given
		mockQuestions(input);
		// when & then
		expect(() => isValidTryCount(input)).toThrow(errorMessage);
	});
});
