import { Module } from "@nestjs/common";
import { ShooterController } from "./shooter.controller";
import { ShooterService } from "./shooter.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Shooter } from "src/entities/shooter/Shooter";

@Module({
	imports: [TypeOrmModule.forFeature([Shooter])],
	controllers: [ShooterController],
	providers: [ShooterService],
})
export class ShooterModule {}
