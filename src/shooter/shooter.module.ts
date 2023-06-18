import { Module } from "@nestjs/common";
import { ShooterController } from "./shooter.controller";
import { ShooterService } from "./shooter.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Shooter } from "src/entities/shooter/Shooter";
import { ShooterProfileModule } from "./shooter-profile/shooter-profile.module";
import { ShooterHistoryModule } from './shooter-history/shooter-history.module';

@Module({
	imports: [TypeOrmModule.forFeature([Shooter]), ShooterProfileModule, ShooterHistoryModule],
	controllers: [ShooterController],
	providers: [ShooterService],
})
export class ShooterModule {}
