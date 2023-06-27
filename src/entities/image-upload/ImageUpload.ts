import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Stage } from "../stage/Stage";

@Entity({ name: "images" })
class ImageUploadFile {
	@PrimaryGeneratedColumn()
	public id: number;

	@Column()
		filename: string;

	@Column()
		path: string;

	@Column()
		mimetype: string;
	
	@ManyToOne(() => Stage, (hist) => hist.images)
		stage: Stage;
}

export default ImageUploadFile;
