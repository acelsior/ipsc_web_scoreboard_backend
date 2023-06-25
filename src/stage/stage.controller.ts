import { Body, Controller, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { CreateStageDTO } from "src/dtos/stage.dto";
import { StageService } from "./stage.service";


function checkParam<T>(interfaceParam: T): boolean {
	console.log(interfaceParam);
	return true;
}

@Controller("stage")
export class StageController {
	constructor(private stageService: StageService) {
		checkParam({d:1,f:2})
	}


	@Get()
	async getAllStage() {
		return 1;
	}

	@Get(":id")
	async getStageByID(@Param("id", ParseIntPipe) id: number) {
		return id;
	}

	@Post()
	async createStage(@Body() stageParam: CreateStageDTO) {


		return await this.stageService.createStage();
	}
}
