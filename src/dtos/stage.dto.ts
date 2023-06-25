import { Condition, StageType } from "src/types";

export interface CreateStageDTO {
	title: string;
	description: string;
	stageType: StageType;
	maxScores: number;
	paperTargets: number;
	poppersOrPlates: number;
	noShoots: number;
	minRounds: number;
	photo: string;
	condition: Condition;
}
