import supertest from "supertest";
import { MongoMemoryServer } from 'mongodb-memory-server';
import createServer from "../utils/server"
import mongoose from "mongoose"
import { signJwt } from "../utils/jwt.utils";
import { createBurger } from "../service/burger.service";
import * as burgerService from '../service/burger.service'

const app = createServer();

const userId = new mongoose.Types.ObjectId().toString();

const userPayload = {
    _id: userId,
    email: "test@test.dk",
    name: "Michael Duy",
};


const burgerInput = {
    restaurant: "Burger King",
    title: "Cheeseburger",
    description: "Best cheap burger",
    price: 3,
    score: 5,
    image: "Menu should be here: https://picsum.photos"
}

const burgerPayload = {
    user: userId,
    restaurant: {
        name: "Burger King",
        restaurantId: "The restaurant is not yet in the application"
    },
    title: "Cheeseburger",
    description: "Best cheap burger",
    price: 3,
    score: 5,
    image: "Menu should be here: https://picsum.photos",
    _id: expect.any(String),
    burgerId: expect.any(String),
    reviews: 1,
    createdAt: expect.any(String), 
    updatedAt: expect.any(String),
    __v: 0
}


describe('burger', () => {
    beforeAll(async () => {
        const mongoServer = await MongoMemoryServer.create()

        await mongoose.connect(mongoServer.getUri());
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoose.connection.close();
    });

    describe('create burger', () => {
        describe('if user is not logged in', () => {
            it('should return error 403', async () => {
                const { statusCode } = await supertest(app).post('/api/burgers');

                expect(statusCode).toBe(403);
            });
        });

        describe('if user is logged in', () => {
            it('should return 200 and create burger', async () => {
                const jwt = signJwt(userPayload);
                const {statusCode, body} = await supertest(app).post('/api/burgers').set('Authorization', `Bearer ${jwt}`).send(burgerInput);
                expect(statusCode).toBe(200);

                expect(body).toEqual(burgerPayload);
                
            });
        });
    });

    describe('get burger', () => {
        describe('if the burger does not exist', () => {
            it('should return a error 404', async () => {
                const burgerId = 'burger-1';

                const { statusCode } = await supertest(app).get(`/api/burgers/${burgerId}`);
                expect(statusCode).toBe(404);

            })
        })
        describe('if the burger exists', () => {
            it('should return 200 and the product', async () => {
                //@ts-ignore
                const burger = await createBurger(burgerInput);
                const { statusCode, body } = await supertest(app).get(`/api/burgers/${burger.burgerId}`);
                expect(statusCode).toBe(200);
                expect(body.burgerId).toBe(burger.burgerId);

            }) 
        })
    })
});