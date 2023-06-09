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
	Options,
	Query,
} from "@nestjs/common";
import { CreateShooterDTO, UpdateShooterDTO } from "src/dtos/shooter.dto";
import { ShooterService } from "./shooter.service";
import { Shooter } from "src/entities/shooter/Shooter";

@Controller("shooter")
export class ShooterController {
	constructor(private shooterService: ShooterService) {}

	@Get()
	async getAllShooters(
		@Query("id") id,
		@Query("firstName") firstName,
		@Query("lastName") lastName,
		@Query("division") division,
		@Query("createAt") createAt,
		@Query("stageHaveFinish") stageHaveFinish,
		@Query("averageHitFactor") averageHitFactor,
		@Query("history") history,
	) {
		let shooters: Shooter[];
		if (
			id != undefined ||
			firstName != undefined ||
			lastName != undefined ||
			division != undefined ||
			createAt != undefined ||
			stageHaveFinish != undefined ||
			averageHitFactor != undefined ||
			history != undefined
		) {
			shooters =
				await this.shooterService.getAllShootersWithOptionalFields(
					id,
					firstName,
					lastName,
					division,
					createAt,
					stageHaveFinish,
					averageHitFactor,
					history
				);
		} else {
			shooters = await this.shooterService.getAllShooters();
		}
		return shooters;
	}
	@Get(":id")
	async getShooterByID(@Param("id", ParseIntPipe) id: number) {
		return (await this.shooterService.getShooterByID(id))[0];
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
