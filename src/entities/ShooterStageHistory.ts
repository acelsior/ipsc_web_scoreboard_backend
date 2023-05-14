import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Shooter } from "./Shooter";

@Entity({ name: "shooter_stage_history" })
export class ShooterStageHistory {
	@PrimaryGeneratedColumn()
		id: number;

	@ManyToOne(() => Shooter, (shooter) => shooter.history)
		shooter: Shooter;
	@Column()
		firstName: string;
	@Column()
		lastName: string;

	@Column()
		alphaCount: number;
	@Column()
		charlieCount: number;
	@Column()
		deltaCount: number;
	@Column()
		plateCount: number;
	@Column()
		missCount: number;
	@Column()
		noShootCount: number;
	@Column()
		procedureErrorCount: number;
	@Column()
		scoreCount: number;
	@Column()
		timeCount: number;
	@Column()
		hitFactor: number;
	@Column()
		disqualified: boolean;
}
