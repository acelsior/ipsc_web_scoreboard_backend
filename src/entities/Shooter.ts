import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Division } from "../types"

@Entity({ name: "shooters" })
export class Shooter {
	@PrimaryGeneratedColumn()
		id: number;

	@Column({ nullable: false})
		firstName: string;
	@Column({ nullable: false})
		lastName: string;
	
	@Column({ nullable: false})
		division: Division;
	
	@Column({ nullable: false})
		createAt: Date;
}
