const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

interface GoogleUser {
    name: string;
    email: string;
    picture: string;
}

export async function googleVerify(token: string): Promise<GoogleUser> {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const { name, email, picture } = ticket.getPayload();

    return {
        name,
        email,
        picture
    }
}
