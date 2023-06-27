import { Module } from "@nestjs/common";
import { StageController } from "./stage.controller";
import { StageService } from "./stage.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Stage } from "src/entities/stage/Stage";
import { ImageUploadModule } from "src/image-upload/image-upload.module";

@Module({
	imports: [
		TypeOrmModule.forFeature([Stage]),
		ImageUploadModule
	],
	controllers: [StageController],
	providers: [StageService],
})
export class StageModule {}
