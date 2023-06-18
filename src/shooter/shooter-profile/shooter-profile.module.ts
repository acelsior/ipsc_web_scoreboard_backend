import { Module } from "@nestjs/common";
import { ShooterProfileController } from "./shooter-profile.controller";
import { ShooterProfileService } from "./shooter-profile.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ShooterProfile } from "src/entities/shooter/ShooterProfile";
import { Shooter } from "src/entities/shooter/Shooter";

@Module({
	imports: [TypeOrmModule.forFeature([ShooterProfile, Shooter])],
	controllers: [ShooterProfileController],
	providers: [ShooterProfileService],
})
export class ShooterProfileModule {}
