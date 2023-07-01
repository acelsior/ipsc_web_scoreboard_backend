import { Module } from "@nestjs/common";
import { StageController } from "./stage.controller";
import { StageService } from "./stage.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Stage } from "src/entities/stage/Stage";
import { ImageUploadModule } from "src/image-upload/image-upload.module";
import { ShooterStageHistory } from "src/entities/shooter/ShooterStageHistory";

@Module({
	imports: [
		TypeOrmModule.forFeature([Stage, ShooterStageHistory]),
		ImageUploadModule
	],
	controllers: [StageController],
	providers: [StageService],
	exports: [StageService]
})
export class StageModule {}
