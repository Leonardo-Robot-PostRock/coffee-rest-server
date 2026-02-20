import { User } from "../../users/models/user.model";

import { IAuthRepository } from "../../../../../auth/domain/repositories/auth.repository";
import { IUser } from "../../../../../users/domain/interfaces/user";

import { MongoUserDocument } from "../../users/interfaces/user";
import { userFromMongoToDomain } from "../../users/mappers/user-mongo.mapper";

// Handle duplicate errors
import { handleDuplicateError } from "../../../../../shared/handle-duplicate-error";

// Domain errors
import { DuplicateUserError } from "../../../../../users/domain/errors";

// HTTP error
import { HttpError } from "../../../../../shared/http-error";

export class MongooseAuthRepository implements IAuthRepository {
	async findUserByEmail(email: string): Promise<IUser | null> {
		const user = await User.findOne({ email }).populate('role', 'roleName');

		if (!user) return null;

		return userFromMongoToDomain(user);
	}

	async createGoogleUser(data: {
		name: string;
		email: string;
		password: string;
		img?: string;
		role: string;
	}): Promise<IUser> {
		try {
			const mongoUser = new User({
				name: data.name,
				email: data.email,
				password: data.password,
				img: data.img,
				role: data.role,
				google: true,
			});

			await mongoUser.save();

			const user = await User.findById(mongoUser._id).populate('role', 'roleName');

			if (!user) {
				throw new HttpError(500, 'Falló la creación del usuario');
			}

			return userFromMongoToDomain(user);
		} catch (error: any) {
			handleDuplicateError(error, data.email, DuplicateUserError);
		}
	}
}


