import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateStageDTO } from "src/dtos/stage.dto";
import { Stage } from "src/entities/stage/Stage";
import { Repository } from "typeorm";

@Injectable()
export class StageService {
	constructor(
		@InjectRepository(Stage) private stageRepo: Repository<Stage>
	) {}

	async getAllStages() {
		return await this.stageRepo.find();
	}

	async getStageByID(id: number) {
		return (
			await this.stageRepo.find({
				where: {
					id: id,
				},
			})
		)[0];
	}

	async deleteStageByID(id: number) {
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
			photo: stageParam.photo,
			condition: stageParam.condition
		});
		return (await this.stageRepo.save(newStage)).id;
	}
}
