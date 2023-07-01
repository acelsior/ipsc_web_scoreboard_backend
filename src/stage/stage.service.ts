import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateStageDTO } from "src/dtos/stage.dto";
import { ShooterStageHistory } from "src/entities/shooter/ShooterStageHistory";
import { Stage } from "src/entities/stage/Stage";
import { ImageUploadService } from "src/image-upload/image-upload.service";
import { Repository } from "typeorm";

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
			where: {
				stage: await this.stageRepo.find({
					where: {
						id: id,
					},
				}),
			},
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
