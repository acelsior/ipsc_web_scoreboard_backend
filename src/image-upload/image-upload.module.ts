import { Module } from "@nestjs/common";
import { ImageUploadController } from "./image-upload.controller";
import { ImageUploadService } from "./image-upload.service";
import ImageUploadFile from "src/entities/image-upload/ImageUpload";
import { TypeOrmModule } from "@nestjs/typeorm";


@Module({
	imports: [
		TypeOrmModule.forFeature([ImageUploadFile]),
	],
	controllers: [ImageUploadController],
	providers: [ImageUploadService],
	exports: [ImageUploadService],
})
export class ImageUploadModule {}
