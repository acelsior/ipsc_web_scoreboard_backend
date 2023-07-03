import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateNewStageHistoryDTO } from "src/dtos/shooterStageHistory.dto";
import { CreateStageDTO } from "src/dtos/stage.dto";
import { ShooterStageHistory } from "src/entities/shooter/ShooterStageHistory";
import { Stage } from "src/entities/stage/Stage";
import { ImageUploadService } from "src/image-upload/image-upload.service";
import { FindOptionsWhere, Repository } from "typeorm";

@Injectable()
export class StageService {
	constructor(
		@InjectRepository(Stage) private stageRepo: Repository<Stage>,
		private imageUploadService: ImageUploadService,
		@InjectRepository(ShooterStageHistory)
		private stageHistRepo: Repository<ShooterStageHistory>
	) {}

	async getAllStages() {
		return await this.stageRepo.find({ relations: ["images", "history"] });
	}

	async getStageScoreByID(id: number) {
		return await this.stageHistRepo.find({
			where: [
				{
					stage: await this.stageRepo.findOneBy({
						id: id,
					}),
				},
			] as FindOptionsWhere<Stage>,
			relations: {
				shooter: true,
			},
		});
	}
	async deleteStageScoreByHistoryID(id: number) {
		return await this.stageHistRepo.delete({ id: id });
	}

	async renewStageScoreByHistoryID(
		id: number,
		createNewStageHistoryParameters: CreateNewStageHistoryDTO
	) {
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
			score = 0;
			hitFactor = 0;
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
		return await this.stageHistRepo.update(
			{ id: id },
			{
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
			}
		);
	}
	async getStageScoreByHistoryID(id: number) {
		return await this.stageHistRepo.find({
			where: { id: id },
			relations: ["shooter"],
		});
	}

	async getStageByID(id: number) {
		return (
			await this.stageRepo.find({
				where: {
					id: id,
				},
				relations: ["images", "history"],
			})
		)[0];
	}

	async deleteStageByID(id: number) {
		const stage = (
			await this.stageRepo.find({
				where: {
					id: id,
				},
				relations: ["images"],
			})
		)[0];
		for (const image of stage.images) {
			await this.imageUploadService.deleteImageByID(image.id);
		}

		return await this.stageRepo.delete({ id: id });
	}

	async createStage(stageParam: CreateStageDTO) {
		const newStage = this.stageRepo.create({
			description: stageParam.description,
			maxScores: stageParam.maxScores,
			minRounds: stageParam.minRounds,
			noShoots: stageParam.noShoots,
			paperTargets: stageParam.paperTargets,
			poppersOrPlates: stageParam.poppersOrPlates,
			stageType: stageParam.stageType,
			title: stageParam.title,
			// photo: stageParam.photo,
			condition: stageParam.condition,
			createAt: new Date(),
		});
		const newStageInstance = await this.stageRepo.save(newStage);

		stageParam.photo.forEach((photoId) => {
			this.imageUploadService.bindImageToStage(photoId, newStage);
		});
		return newStageInstance.id;
	}
}
