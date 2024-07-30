import App from "../src/App";
import { mockQuestions, mockRandoms, getLogSpy } from "./ApplicationTest";

const MOVING_FORWARD = 4;
const STOP = 3;

const INPUT_OUTPUT = [
	[
		["a,b,c", "2"],
		[MOVING_FORWARD, STOP, MOVING_FORWARD, STOP, STOP, STOP],
		[
			"실행 결과",
			"a : -",
			"b : ",
			"c : -",
			"",
			"a : -",
			"b : ",
			"c : -",
			"",
			"최종 우승자 : a, c",
		],
	],
	[
		["poo,bar,foo", "3"],
		[
			STOP,
			MOVING_FORWARD,
			STOP,
			MOVING_FORWARD,
			MOVING_FORWARD,
			STOP,
			STOP,
			MOVING_FORWARD,
			MOVING_FORWARD,
		],
		[
			"실행 결과",
			"poo : ",
			"bar : -",
			"foo : ",
			"",
			"poo : -",
			"bar : --",
			"foo : ",
			"",
			"poo : -",
			"bar : ---",
			"foo : -",
			"",
			"최종 우승자 : bar",
		],
	],
];

test.each(INPUT_OUTPUT)("출력 테스트", async (inputs, randoms, outputs) => {
	mockQuestions(inputs);
	mockRandoms(randoms);
	const logSpy = getLogSpy();

	const app = new App();
	await app.play();

	// outputs.forEach((output) => {
	// 	expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
	// });

	expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(outputs.join("\n")));
});
