import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateNewStageHistoryParameters } from "src/dtos/shooterStageHistory.dto";
import { Shooter } from "src/entities/shooter/Shooter";
import { ShooterStageHistory } from "src/entities/shooter/ShooterStageHistory";
import { Repository } from "typeorm";

@Injectable()
export class ShooterHistoryService {
	constructor(
		@InjectRepository(Shooter) private shooterRepo: Repository<Shooter>,
		@InjectRepository(ShooterStageHistory)
		private historyRepo: Repository<ShooterStageHistory>
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
			miss,
			noShoot,
			procedureError,
			time,
			disqualified,
		} = createNewStageHistoryParameters;
		const score =
			alpha * 5 +
			charlie * 3 +
			delta +
			plate * 5 -
			miss * 10 -
			noShoot * 10 -
			procedureError * 10;
		const hitFactor = score / time;

		const newHistory = this.historyRepo.create({
			shooter: shooter,
			firstName: shooter.firstName,
			lastName: shooter.lastName,
			alphaCount: alpha,
			charlieCount: charlie,
			deltaCount: delta,
			plateCount: plate,
			missCount: miss,
			noShootCount: noShoot,
			procedureErrorCount: procedureError,
			scoreCount: score,
			timeCount: time,
			hitFactor: hitFactor,
			disqualified: disqualified,
		});
		const savedHistory = await this.historyRepo.save(newHistory);
		return savedHistory;
	}
}
