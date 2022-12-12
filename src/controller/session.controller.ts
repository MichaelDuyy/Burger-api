import {Request, Response} from 'express'
import { CreateUserInput } from '../schema/user.schema';
import { createUser, validatePassword } from '../service/user.service';
import {omit} from 'lodash'
import logger from "../utils/logger"
import { createSession, findSessions, updateSession } from '../service/session.service';
import config from 'config';
import { signJwt } from '../utils/jwt.utils';


export async function createSessionHandler(req: Request, res: Response) {
    // Validet user password
    const user = await validatePassword(req.body)

    if(!user) {
        return res.status(401).send('Invalid email or password')
    }
    // Create a session 
    const session = await createSession(user._id, req.get('user-agent') || '');

    // Create an access token

    const accessToken = signJwt({
        ...user, session: session._id }, {
            expiresIn: config.get('accessTokenTtl') 
    });

    // Create a refresh token

    const refreshToken = signJwt({
        ...user, session: session._id }, {
            expiresIn: config.get('refreshTokenTtl') 
    });

    // Return access and refresh token
    return res.send({ accessToken, refreshToken })
}

export async function getSessionsHandler(req: Request, res: Response) {
    const userId = res.locals.user._id;
    const sessions = await findSessions({user: userId, valid: true});
    return res.send(sessions);
}

export async function deleteSessionHandler(req: Request, res: Response) {
    const sessionId = res.locals.user.session
    await updateSession({_id: sessionId}, {valid: false});
    return res.send({ 
        accessToken: null,
        refreshToken: null
    })
}


