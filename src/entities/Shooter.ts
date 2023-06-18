import {
	Column,
	Entity,
	JoinColumn,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Division } from "../types";
import { ShooterProfile } from "./ShooterProfile";
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

	@Column({ nullable: false })
		createAt: Date;

	@OneToOne(() => ShooterProfile, { eager: true, onDelete: "CASCADE" })
	@JoinColumn()
		profile: ShooterProfile;

	@OneToMany(() => ShooterStageHistory, (hist) => hist.shooter)
		history: ShooterStageHistory[];
}
