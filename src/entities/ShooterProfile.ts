import {
	Column,
	Entity,
	PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "shooter_profile" })
export class ShooterProfile {
	@PrimaryGeneratedColumn()
		id: number;

	@Column()
		firstName: string;
	@Column()
		lastName: string;

	@Column()
		stageHaveFinish: number;
	@Column({ type: "float"})
		averageHitFactor: number;
}
