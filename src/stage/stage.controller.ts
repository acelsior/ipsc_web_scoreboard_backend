import {
	BadRequestException,
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Post,
} from "@nestjs/common";
import { CreateStageDTO } from "src/dtos/stage.dto";
import { StageService } from "./stage.service";

@Controller("stage")
export class StageController {
	constructor(private stageService: StageService) {}

	@Get()
	async getAllStage() {
		return await this.stageService.getAllStages();
	}

	@Get(":id")
	async getStageByID(@Param("id", ParseIntPipe) id: number) {
		return await this.stageService.getStageByID(id);
	}

	@Delete(":id")
	async deleteStageByID(@Param("id", ParseIntPipe) id: number) {
		return await this.stageService.deleteStageByID(id);
	}

	@Post()
	async createStage(@Body() stageParam: CreateStageDTO) {
		if (
			!stageParam.title ||
			!stageParam.description ||
			!stageParam.stageType ||
			!stageParam.maxScores ||
			!stageParam.paperTargets ||
			!stageParam.poppersOrPlates ||
			!stageParam.noShoots ||
			!stageParam.minRounds ||
			!stageParam.scoringMethod ||
			!stageParam.photo
		) {
			return new BadRequestException("title, description, stageType, maxScores, paperTargets, poppersOrPlates, noShoots, minRounds, scoringMethod, photo can't be null");
		}
		return await this.stageService.createStage(stageParam);
	}
}
