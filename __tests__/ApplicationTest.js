import App from "../src/App.js";
import { MissionUtils } from "@woowacourse/mission-utils";

export const mockQuestions = (inputs) => {
	MissionUtils.Console.readLineAsync = jest.fn();

	MissionUtils.Console.readLineAsync.mockImplementation(() => {
		const input = inputs.shift();
		return Promise.resolve(input);
	});
};

// pickNumberInRange가 호출될 때마다 mockRandoms의 인수로 주어진 숫자가 앞에서 부터 차례차례 하나씩 반환됨
export const mockRandoms = (numbers) => {
	MissionUtils.Random.pickNumberInRange = jest.fn();
	numbers.reduce((acc, number) => {
		return acc.mockReturnValueOnce(number);
	}, MissionUtils.Random.pickNumberInRange);
};

// MissionUrills.Console.print 메서드에 spy 달기
export const getLogSpy = () => {
	const logSpy = jest.spyOn(MissionUtils.Console, "print");
	logSpy.mockClear();
	return logSpy;
};

describe("자동차 경주 게임", () => {
	test("전진-정지", async () => {
		// given
		const MOVING_FORWARD = 4;
		const STOP = 3;
		const inputs = ["pobi,woni", "1"];
		const outputs = ["pobi : -"];
		const randoms = [MOVING_FORWARD, STOP];
		const logSpy = getLogSpy();

		mockQuestions(inputs);
		mockRandoms([...randoms]);

		// when
		const app = new App();
		await app.play();

		// then
		outputs.forEach((output) => {
			expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
		});
	});

	test.each([[["pobi,javaji"]], [["pobi,eastjun"]]])("이름에 대한 예외 처리", async (inputs) => {
		// given
		mockQuestions(inputs);

		// when
		const app = new App();

		// then
		await expect(app.play()).rejects.toThrow("[ERROR]");
	});
});
