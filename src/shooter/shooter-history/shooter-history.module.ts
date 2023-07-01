import { Module } from "@nestjs/common";
import { ShooterHistoryController } from "./shooter-history.controller";
import { ShooterHistoryService } from "./shooter-history.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ShooterStageHistory } from "src/entities/shooter/ShooterStageHistory";
import { Shooter } from "src/entities/shooter/Shooter";
import { StageModule } from "src/stage/stage.module";
import { Stage } from "src/entities/stage/Stage";

@Module({
	imports: [
		TypeOrmModule.forFeature([ShooterStageHistory, Shooter,Stage]),
	],
	controllers: [ShooterHistoryController],
	providers: [ShooterHistoryService],
})
export class ShooterHistoryModule {}
