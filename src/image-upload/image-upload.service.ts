import { Injectable, NotFoundException, StreamableFile } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { createReadStream } from "fs";
import { join } from "path";
import ImageUploadFile from "src/entities/image-upload/ImageUpload";
import { Stage } from "src/entities/stage/Stage";
import { Repository } from "typeorm";
const fs = require("fs");

@Injectable()
export class ImageUploadService {
	constructor(
		@InjectRepository(ImageUploadFile)
		private imageUploadRepo: Repository<ImageUploadFile>
	) {}

	async uploadImages(files: Express.Multer.File[]) {
		const fileList = [];
		files.forEach((file) => {
			const newFile = this.imageUploadRepo.create({
				filename: file.filename,
				mimetype: file.mimetype,
				path: file.path,
			});
			fileList.push(newFile);
		});
		await this.imageUploadRepo.save(fileList);
		return fileList;
	}

	async getImageByID(id: number) {
		const file = await this.imageUploadRepo.findOne({
			where: {
				id: id,
			},
		});
		if (!file) {
			throw new NotFoundException();
		}
		const stream = createReadStream(join(process.cwd(), file.path));

		return { stream: new StreamableFile(stream), file: file };
	}

	async deleteImageByID(id: number) {
		const file = await this.imageUploadRepo.findOne({
			where: {
				id: id,
			},
		});
		if (!file) {
			throw new NotFoundException();
		}
		return new Promise(async (resolve, reject) => {
			fs.unlink(file.path, async (err) => {
				if (err) {
					reject(err);
				}
				resolve(
					await this.imageUploadRepo.delete({
						id: id,
					})
				);
			});
		});
	}

	async bindImageToStage(imageId: number, stage: Stage) {
		return (await this.imageUploadRepo.update(imageId, {
			stage: stage
		}));
	}
}
