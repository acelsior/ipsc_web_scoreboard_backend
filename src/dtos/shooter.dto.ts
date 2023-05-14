import { Division } from "src/types";

export class CreateShooterDTO {
	firstName: string;
	lastName: string;
	division: Division;
}

export interface CreateShooterParameters {
	firstName: string;
	lastName: string;
	division: Division;
}

export class UpdateShooterDTO {
	firstName: string;
	lastName: string;
	division: Division;
}

export interface UpdateShooterParameters {
	firstName: string;
	lastName: string;
	division: Division;
}

