import {
	Controller,
	Post,
	Get,
	Body,
	Put,
	Param,
	ParseIntPipe,
	BadRequestException,
	Delete,
} from "@nestjs/common";
import { CreateShooterDTO, UpdateShooterDTO } from "src/dtos/shooter.dto";
import { ShooterService } from "./shooter.service";

@Controller("shooter")
export class ShooterController {
	constructor(private shooterService: ShooterService) {}

	@Get()
	async getAllShooters() {
		const shooters = await this.shooterService.getAllShooters();
		return shooters;
	}
	@Get(":id")
	async getShooterByID(
		@Param("id", ParseIntPipe) id: number,
	) {
		return this.shooterService.getShooterByID(id);
	}

	@Post()
	async createShooter(@Body() createShooterDTO: CreateShooterDTO) {
		if (
			createShooterDTO.division.toString() == "" ||
			createShooterDTO.firstName == "" ||
			createShooterDTO.lastName == ""
		)
			return new BadRequestException(
				"division, lastname or firstname can't be null"
			);
		return this.shooterService.createShooter(createShooterDTO);
	}

	@Put(":id")
	async updateShooterByID(
		@Param("id", ParseIntPipe) id: number,
		@Body() newShooterData: UpdateShooterDTO
	) {
		return this.shooterService.updateShooter(id, newShooterData);
	}

	@Delete(":id")
	async deleteShooterByID(@Param("id", ParseIntPipe) id: number) {
		return this.shooterService.deleteShooter(id);
	}
}
