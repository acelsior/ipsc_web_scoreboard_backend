import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import { Shooter } from "./entities/Shooter";
import { ShooterModule } from "./shooter/shooter.module";
import { ShooterProfile } from "./entities/ShooterProfile";
import { ShooterStageHistory } from "./entities/ShooterStageHistory";
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
			entities: [Shooter, ShooterProfile, ShooterStageHistory],
			synchronize: true,
		}),
		ShooterModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
