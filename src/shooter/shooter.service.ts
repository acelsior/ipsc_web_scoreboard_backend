import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
	CreateShooterParameters,
	UpdateShooterParameters,
} from "src/dtos/shooter.dto";
import { Shooter } from "src/entities/shooter/Shooter";
import { Repository } from "typeorm";

@Injectable()
export class ShooterService {
	constructor(
		@InjectRepository(Shooter) private shooterRepo: Repository<Shooter>
	) {}

	getAllShooters() {
		return this.shooterRepo.find({
			relations: ["history"],
		});
	}

	getAllShootersWithOptionalFields(
		id: string,
		firstName: string,
		lastName: string,
		division: string,
		createAt: string,
		stageHaveFinish: string,
		averageHitFactor: string,
		history: string
	) {
		const select = [];
		if (id != undefined) {
			select.push("id");
		}
		if (firstName != undefined) {
			select.push("firstName");
		}
		if (lastName != undefined) {
			select.push("lastName");
		}
		if (division != undefined) {
			select.push("division");
		}
		if (createAt != undefined) {
			select.push("createAt");
		}
		if (stageHaveFinish != undefined) {
			select.push("stageHaveFinish");
		}
		if (averageHitFactor != undefined) {
			select.push("averageHitFactor");
		}
		const relations = [];
		if (history != undefined) {
			relations.push("history");
		}

		return this.shooterRepo.find({
			select: select,
			relations: relations,
		});
	}

	getShooterByID(id: number) {
		return this.shooterRepo.find({
			relations: ["history"],
			where: {
				id: id,
			},
		});
	}

	createShooter(shooterParam: CreateShooterParameters) {
		const newShooter = this.shooterRepo.create({
			createAt: new Date(),
			division: shooterParam.division,
			firstName: shooterParam.firstName,
			lastName: shooterParam.lastName,
			averageHitFactor: 0.0,
			stageHaveFinish: 0,
		});
		return this.shooterRepo.save(newShooter);
	}

	updateShooter(id: number, newShooterData: UpdateShooterParameters) {
		return this.shooterRepo.update(
			{
				id: id,
			},
			{
				division: newShooterData.division,
				firstName: newShooterData.firstName,
				lastName: newShooterData.lastName,
			}
		);
	}

	deleteShooter(id: number) {
		return this.shooterRepo.delete({
			id: id,
		});
	}
}
