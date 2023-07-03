import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateNewStageHistoryParameters } from "src/dtos/shooterStageHistory.dto";
import { Shooter } from "src/entities/shooter/Shooter";
import { ShooterStageHistory } from "src/entities/shooter/ShooterStageHistory";
import { Stage } from "src/entities/stage/Stage";
import { StageService } from "src/stage/stage.service";
import { Repository } from "typeorm";

@Injectable()
export class ShooterHistoryService {
	constructor(
		@InjectRepository(Shooter) private shooterRepo: Repository<Shooter>,
		@InjectRepository(ShooterStageHistory)
		private historyRepo: Repository<ShooterStageHistory>,
		@InjectRepository(Stage) private stageRepo: Repository<Stage>
	) {}

	async createNewStageHistory(
		id: number,
		createNewStageHistoryParameters: CreateNewStageHistoryParameters
	) {
		const shooter = await this.shooterRepo.findOneBy({
			id: id,
		});
		if (!shooter)
			throw new HttpException(
				`${id} shooter not found`,
				HttpStatus.NOT_FOUND
			);

		const {
			alpha,
			charlie,
			delta,
			plate,
			paperMiss,
			plateMiss,
			noShoot,
			procedureError,
			time,
			disqualified,
			dnf,
			stageID,
			attempted,
			proError,
		} = createNewStageHistoryParameters;
		let score: number, hitFactor: number;
		if (dnf || disqualified) {
			score = 0
			hitFactor = 0
		} else {
			score =
				alpha * 5 +
				charlie * 3 +
				delta +
				plate * 5 -
				(paperMiss + plateMiss) * 10 -
				noShoot * 10 -
				procedureError * 10;
			hitFactor = score / time;
		}
		const newHistory = this.historyRepo.create({
			shooter: shooter,
			alphaCount: alpha,
			charlieCount: charlie,
			deltaCount: delta,
			paperMissCount: paperMiss,
			plateCount: plate,
			plateMissCount: plateMiss,
			noShootCount: noShoot,
			procedureErrorCount: procedureError,
			scoreCount: score,
			timeCount: time,
			hitFactor: hitFactor,
			disqualified: disqualified,
			didNotFinished: dnf,
			stage: (await this.stageRepo.findBy({ id: stageID }))[0],
			createAt: new Date(),
			attempted: attempted,
			proErrors: proError,
		});
		const savedHistory = await this.historyRepo.save(newHistory);
		return savedHistory;
	}
}
