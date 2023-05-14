import { Controller, Post, Param, ParseIntPipe } from "@nestjs/common";
import { ShooterProfileService } from "./shooter-profile.service";

@Controller("shooter")
export class ShooterProfileController {
	constructor(private shooterProfileService: ShooterProfileService) {}
	@Post(":id/profile")
	createShooterProfile(@Param("id", ParseIntPipe) id: number) {
		return this.shooterProfileService.createShooterProfile(id);
	}
}
