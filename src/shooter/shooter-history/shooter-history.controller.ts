import { Controller, Post, Param, ParseIntPipe, Body } from "@nestjs/common";
import { ShooterHistoryService } from "./shooter-history.service";
import { CreateNewStageHistoryDTO } from "src/dtos/shooterStageHistory.dto";

@Controller("shooter")
export class ShooterHistoryController {
	constructor(private shooterHistoryService: ShooterHistoryService) {}

	@Post(":id/stage")
	createNewStageHistory(
		@Param("id", ParseIntPipe) id: number,
		@Body() createNewStageHistoryDTO: CreateNewStageHistoryDTO
	) {
		return this.shooterHistoryService.createNewStageHistory(id, createNewStageHistoryDTO);
	}
}
