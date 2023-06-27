import { Condition, StageType } from "src/types";
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import ImageUploadFile from "../image-upload/ImageUpload";

@Entity({ name: "stages" })
export class Stage {
	@PrimaryGeneratedColumn()
		id: number;

	@Column()
		title: string;

	@Column()
		description: string;

	@OneToMany(() => ImageUploadFile, (hist) => hist.stage)
		images: ImageUploadFile[];


	@Column()
		stageType: StageType;

	@Column()
		maxScores: number;

	@Column()
		paperTargets: number;

	@Column()
		poppersOrPlates: number;

	@Column()
		noShoots: number;

	@Column()
		minRounds: number;

	@Column()
		condition: Condition;
}
