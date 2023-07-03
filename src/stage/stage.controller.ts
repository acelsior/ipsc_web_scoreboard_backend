import {
	BadRequestException,
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Post,
	Put,
} from "@nestjs/common";
import { CreateStageDTO } from "src/dtos/stage.dto";
import { StageService } from "./stage.service";
import { CreateNewStageHistoryDTO } from "src/dtos/shooterStageHistory.dto";

@Controller("stage")
export class StageController {
	constructor(private stageService: StageService) {}

	@Get()
	async getAllStage() {
		return await this.stageService.getAllStages();
	}

	@Get(":id/score")
	async getStageScoreByID(@Param("id", ParseIntPipe) id: number) {
		return (await this.stageService.getStageScoreByID(id));
	}
	@Get("score/:id")
	async getStageScoreByHistoryID(@Param("id", ParseIntPipe) id: number) {
		return (await this.stageService.getStageScoreByHistoryID(id))[0];
	}
	@Delete(":id/score")
	async deleteStageScoreByHistoryID(@Param("id", ParseIntPipe) id: number) {
		return await this.stageService.deleteStageScoreByHistoryID(id);
	}
	@Put(":id/score")
	async renewStageScoreByHistoryID(
		@Param("id", ParseIntPipe) id: number,
		@Body() createNewStageHistoryDTO: CreateNewStageHistoryDTO
	) {
		return await this.stageService.renewStageScoreByHistoryID(
			id,
			createNewStageHistoryDTO
		);
	}

	@Get(":id")
	async getStageByID(@Param("id", ParseIntPipe) id: number) {
		return await this.stageService.getStageByID(id);
	}

	@Delete(":id")
	async deleteStageByID(@Param("id", ParseIntPipe) id: number) {
		return await this.stageService.deleteStageByID(id);
	}

	//upload image before calling this api
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
			!stageParam.photo ||
			!stageParam.condition
		) {
			return new BadRequestException(
				"title, description, stageType, maxScores, paperTargets, poppersOrPlates, noShoots, minRounds, condition, photo can't be null"
			);
		}
		return await this.stageService.createStage(stageParam);
	}
}
