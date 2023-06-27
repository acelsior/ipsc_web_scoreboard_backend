import {
	Controller,
	Post,
	UploadedFiles,
	UseInterceptors,
	Res,
	Param,
	Get,
	ParseIntPipe,
	Delete,
} from "@nestjs/common";
import { AnyFilesInterceptor } from "@nestjs/platform-express";
import { Response } from "express";
import { diskStorage } from "multer";
import { ImageUploadService } from "./image-upload.service";

@Controller("image")
export class ImageUploadController {
	constructor(private imageUploadService: ImageUploadService) {}

	@Post("")
	@UseInterceptors(
		AnyFilesInterceptor({
			storage: diskStorage({
				destination: "./uploadedFiles/images",
			}),
		})
	)
	async uploadFile(@UploadedFiles() files: Express.Multer.File[]) {
		return (await this.imageUploadService.uploadImages(files));
	}


	@Get(":id")
	async getImageByID(
		@Param("id", ParseIntPipe) id: number,
		@Res({ passthrough: true }) response: Response
	) {
		const {stream, file} = (await this.imageUploadService.getImageByID(id));
		response.set({
			"Content-Disposition": `inline; filename="${file.filename}"`,
			"Content-Type": file.mimetype,
		});
		return stream
	}

	@Delete(":id")
	async deleteImageByID(
		@Param("id", ParseIntPipe) id: number,
	) {
		return (await this.imageUploadService.deleteImageByID(id))
	}
}
