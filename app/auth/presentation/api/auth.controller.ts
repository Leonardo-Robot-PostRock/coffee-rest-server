import { Request, Response } from "express";
import { AuthService } from "../../services/auth.service";
import { HttpError } from "../../../shared/http-error";

export const buildAuthController = (authService: AuthService) => ({

	loginController: async (req: Request, res: Response) => {
		const { email, password } = req.body;

		try {
			const { user, token } = await authService.login(email, password);

			res.status(200).json({
				user,
				token,
			});
		} catch (error: unknown) {
			if (error instanceof HttpError) {
				res.status(error.statusCode).json({
					msg: error.message,
				});
				return;
			}

			res.status(500).json({
				msg: "Hable con el administrador",
			});
		}
	},

	googleSignInController: async (req: Request, res: Response) => {
		const { id_token } = req.body;

		try {
			const { user, token } = await authService.googleSignIn(id_token);

			res.status(200).json({
				user,
				token,
			});
		} catch (error) {
			if (error instanceof HttpError) {
				if (error.statusCode === 401 && error.message === "Token de Google no es válido") {
					res.status(401).json({
						ok: false,
						msg: error.message,
					});
					return;
				}

				res.status(error.statusCode).json({
					msg: error.message,
				});
				return;
			}

			res.status(500).json({
				msg: "Hable con el administrador",
			});
		}
	},
});
