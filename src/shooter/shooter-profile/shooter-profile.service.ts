import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Shooter } from "src/entities/Shooter";
import { ShooterProfile } from "src/entities/ShooterProfile";
import { Repository } from "typeorm";

@Injectable()
export class ShooterProfileService {
	constructor(
		@InjectRepository(ShooterProfile)
		private shooterProfileRepo: Repository<ShooterProfile>,
		@InjectRepository(Shooter)
		private shooterRepo: Repository<Shooter>
	) {}

	async createShooterProfile(
		id: number,
	) {
		const shooter = await this.shooterRepo.findOneBy({
			id: id,
		});
		if (!shooter)
			throw new HttpException(`${id} shooter not found`, HttpStatus.NOT_FOUND);
		
		const newProfile = this.shooterProfileRepo.create({
			averageHitFactor: 0,
			firstName: shooter.firstName,
			lastName: shooter.lastName,
			stageHaveFinish: 0,
			shooter: shooter,
		})
		const savedProfile = await this.shooterProfileRepo.save(newProfile);
		shooter.profile = savedProfile;
		return this.shooterRepo.save(shooter);
	}
}
