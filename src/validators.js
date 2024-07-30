import { MESSAGES } from "./messages.js";
export const isValidCarName = (carNames) => {
	carNames = carNames.split(",");
	const nameSet = new Set(carNames);
	if (nameSet.size !== carNames.length) throw new Error(MESSAGES.ERROR.NO_DUPLICATION);
	for (const name of carNames) {
		if (name.length > 5) throw new Error(MESSAGES.ERROR.OVER_FIVE_CHARACTER);
		else if (name[0] === " " || name[name.length - 1] === " " || name === "")
			throw new Error(MESSAGES.ERROR.SIDE_SPACE);
	}
};

export const isValidTryCount = (tryCount) => {
	tryCount = Number(tryCount);
	if (isNaN(tryCount)) throw new Error(MESSAGES.ERROR.NOT_A_NUMBER);
	else if (tryCount <= 0 || tryCount >= 10) throw new Error(MESSAGES.ERROR.OUT_OF_RANGE);
};
