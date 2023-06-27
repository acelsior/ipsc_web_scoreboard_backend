import {
	Column,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Division } from "../../types";
import { ShooterStageHistory } from "./ShooterStageHistory";

@Entity({ name: "shooters" })
export class Shooter {
	@PrimaryGeneratedColumn()
		id: number;

	@Column({ nullable: false })
		firstName: string;
	@Column({ nullable: false })
		lastName: string;

	@Column({ nullable: false })
		division: Division;

	@Column()
		stageHaveFinish: number;
	@Column({ type: "float" })
		averageHitFactor: number;

	@Column({ nullable: false })
		createAt: Date;

	@OneToMany(() => ShooterStageHistory, (hist) => hist.shooter)
		history: ShooterStageHistory[];
}
