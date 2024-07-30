export const MESSAGES = {
	INPUT: {
		CAR_NAMES:
			"경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)\n",
		TRY_COUNT: "시도할 횟수는 몇 회인가요?\n",
	},
	ERROR: {
		OVER_FIVE_CHARACTER: "[ERROR] 자동차 이름은 5자 이하만 가능합니다.",
		SIDE_SPACE:
			"[ERROR] 자동차 이름은 공백으로 시작하거나 끝날 수 없습니다.",
		NO_DUPLICATION: "[ERROR] 중복된 자동차 이름이 존재합니다.",
		NOT_A_NUMBER: "[ERROR] 시도할 횟수는 숫자이어야 합니다.",
		OUT_OF_RANGE: "[ERROR] 시도할 횟수는 0보다 크고 10보다 작아야 합니다.",
	},
};
