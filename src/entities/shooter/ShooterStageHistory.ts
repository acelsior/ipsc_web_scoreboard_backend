import {
	AfterLoad,
	BeforeInsert,
	BeforeUpdate,
	Column,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Shooter } from "./Shooter";
import { Stage } from "../stage/Stage";
import { ProceduralErrorTypes } from "src/types";

@Entity({ name: "shooter_stage_history" })
export class ShooterStageHistory {
	@PrimaryGeneratedColumn()
		id: number;

	@ManyToOne(() => Shooter, (shooter) => shooter.history, {
		onDelete: "CASCADE",
	})
		shooter: Shooter;
	@ManyToOne(() => Stage, (stage) => stage.history, {
		onDelete: "CASCADE",
	})
		stage: Stage;

	@Column()
		alphaCount: number;
	@Column()
		charlieCount: number;
	@Column()
		deltaCount: number;
	@Column()
		paperMissCount: number;
	@Column()
		plateCount: number;
	@Column()
		plateMissCount: number;
	@Column()
		noShootCount: number;
	@Column()
		procedureErrorCount: number;
	@Column()
		scoreCount: number;
	@Column({ type: "float" })
		timeCount: number;
	@Column({ type: "float" })
		hitFactor: number;
	@Column()
		disqualified: boolean;
	@Column()
		didNotFinished: boolean;
	@Column({ nullable: false })
		createAt: Date;
	@Column()
		attempted: boolean;

	@Column("simple-array", { nullable: true })
		proErrors: ProceduralErrorTypes[];
}
