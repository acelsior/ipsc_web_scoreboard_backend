import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import { Shooter } from "./entities/shooter/Shooter";
import { ShooterModule } from "./shooter/shooter.module";
import { ShooterStageHistory } from "./entities/shooter/ShooterStageHistory";
import { Stage } from "./entities/stage/Stage";
import { StageModule } from './stage/stage.module';
import { ImageUploadModule } from './image-upload/image-upload.module';
import ImageUploadFile from "./entities/image-upload/ImageUpload";
dotenv.config();

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: "mysql",
			host: "localhost",
			port: 3306,
			username: "root",
			password: process.env.MYSQL_PSW,
			database: "ipsc_scoreboard_db",
			entities: [Shooter, ShooterStageHistory, Stage, ImageUploadFile],
			synchronize: true,
		}),
		ShooterModule,
		StageModule,
		ImageUploadModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
