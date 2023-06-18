import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Shooter } from "./Shooter";

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
	@Column({ type: "float" })
		averageHitFactor: number;

	@OneToOne(() => Shooter, (shooter) => shooter.profile, {
		onDelete: "CASCADE",
	})
	@JoinColumn()
		shooter: Shooter;
}
