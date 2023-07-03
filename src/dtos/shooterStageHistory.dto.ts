import { ProceduralError, ProceduralErrorTypes } from "src/types";

export class CreateNewStageHistoryDTO {
	alpha: number;
	charlie: number;
	delta: number;
	paperMiss: number;
	plate: number;
	plateMiss: number;
	noShoot: number;
	procedureError: number;
	time: number;
	disqualified: boolean;
	dnf: boolean;
	stageID: number;
	attempted: boolean;
	proError: ProceduralErrorTypes[];
}

export interface CreateNewStageHistoryParameters {
	alpha: number;
	charlie: number;
	delta: number;
	paperMiss: number;
	plate: number;
	plateMiss: number;
	noShoot: number;
	procedureError: number;
	time: number;
	disqualified: boolean;
	dnf: boolean;
	stageID: number;
	attempted: boolean;
	proError: ProceduralErrorTypes[];
}