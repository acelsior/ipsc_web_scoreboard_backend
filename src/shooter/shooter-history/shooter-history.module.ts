import { Module } from "@nestjs/common";
import { ShooterHistoryController } from "./shooter-history.controller";
import { ShooterHistoryService } from "./shooter-history.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ShooterStageHistory } from "src/entities/ShooterStageHistory";
import { Shooter } from "src/entities/Shooter";

@Module({
	imports: [TypeOrmModule.forFeature([ShooterStageHistory, Shooter])],
	controllers: [ShooterHistoryController],
	providers: [ShooterHistoryService],
})
export class ShooterHistoryModule {}
