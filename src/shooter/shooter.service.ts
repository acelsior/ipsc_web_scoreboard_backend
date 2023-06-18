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
			relations: ["profile", "history"],
		});
	}

	getShooterByID(id: number) {
		return this.shooterRepo.find({
			relations: ["profile", "history"],
			where: {
				id: id
			}
		})
	}

	createShooter(shooterParam: CreateShooterParameters) {
		const newShooter = this.shooterRepo.create({
			createAt: new Date(),
			division: shooterParam.division,
			firstName: shooterParam.firstName,
			lastName: shooterParam.lastName,
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
