import mongoose from 'mongoose';
import * as UserService from '../service/user.service'
import * as SessionService from '../service/session.service'
import supertest from 'supertest';
import createServer from '../utils/server'
import { createSessionHandler } from '../controller/session.controller'


const app = createServer();
const userId = new mongoose.Types.ObjectId().toString();

const userPayload = {
    _id: userId,
    name: "Michael Duy",
    email: "test@test.dk",
};

const userInput = {
    name: "Michael Duy",
    email: "test@test.dk",
    password: "123123",
    passwordConfirmation: "123123"
};


const sessionPayload = {
    _id: new mongoose.Types.ObjectId().toString(),
    user: userId,
    valid: true,
    userAgent: "PostmanRuntime/7.29.2",
    createdAt: new Date("2022-12-11T15:45:46.891Z"),
    updatedAt: new Date("2022-12-11T15:45:46.891Z"),
    __v: 0
};


describe('user', () => {
    // User registratiion 

    describe('user registration', () => {
        describe('given valid username and password', () => {
            it(' should return the user', async () => {
                const createUserServiceMock = jest
                .spyOn(UserService, 'createUser')
                // @ts-ignore
                .mockReturnValueOnce(userPayload);

                const {statusCode, body} = await supertest(app).post('/api/users').send(userInput);

                expect(statusCode).toBe(200);
                expect(body).toEqual(userPayload);
                expect(createUserServiceMock).toHaveBeenCalledWith(userInput);
            });
        });
        describe('If the passwords don\'t match', () => {
            it('should return 400', async () => {
                const createUserServiceMock = jest
                .spyOn(UserService, 'createUser')
                // @ts-ignore
                .mockReturnValueOnce(userPayload);
                const { statusCode } = await supertest(app).post('/api/users').send({...userInput, passwordConfirmation: 'somethingelse'});
        
                expect(statusCode).toBe(400);
        
                expect(createUserServiceMock).not.toHaveBeenCalled();
            });
        });
    });
        
})