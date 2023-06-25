import { Condition, StageType } from "src/types";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "stages" })
export class Stage {
	@PrimaryGeneratedColumn()
		id: number;

	@Column()
		title: string;

	@Column()
		description: string;

	@Column({ type: "longtext" })
		photo: string; //base64 encoded photo

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
