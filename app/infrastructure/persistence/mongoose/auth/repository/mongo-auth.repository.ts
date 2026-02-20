import { User } from "../../users/models/user.model";

import { IAuthRepository } from "../../../../../auth/domain/repositories/auth.repository";
import { IUser } from "../../../../../users/domain/interfaces/user";

import { MongoUserDocument } from "../../users/interfaces/user";
import { userFromMongoToDomain } from "../../users/mappers/user-mongo.mapper";

export class MongooseAuthRepository implements IAuthRepository {
	async findUserByEmail(email: string): Promise<IUser | null> {
		const userDoc = await User.findOne({ email });

		if (!userDoc) return null;

		return userFromMongoToDomain(userDoc as MongoUserDocument);
	}

	async createGoogleUser(data: {
		name: string;
		email: string;
		password: string;
		img?: string;
		role: string;
	}): Promise<IUser> {
		const mongoUser = new User({
			name: data.name,
			email: data.email,
			password: data.password,
			img: data.img,
			role: data.role,
			google: true,
		});

		await mongoUser.save();

		return userFromMongoToDomain(mongoUser as MongoUserDocument);
	}
}


