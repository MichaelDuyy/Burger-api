import supertest from "supertest";
import { MongoMemoryServer } from 'mongodb-memory-server';
import createServer from "../utils/server"
import mongoose from "mongoose"
import { signJwt } from "../utils/jwt.utils";
import { createRestaurant } from "../service/restaurant.service";
import * as restaurantService from '../service/restaurant.service'

const app = createServer();

const userId = new mongoose.Types.ObjectId().toString();

const userPayload = {
    _id: userId,
    email: "test@test.dk",
    name: "Michael Duy",
};


const restaurantInput = {
    name: "McD",
    location: "Road12345111",
    menu: "Menu should be here: https://picsum.photos",
    openingHours: "Friday"
}

const restaurantPayload = {
    user: userId,
    name: "McD",
    location: "Road12345111",
    menu: "Menu should be here: https://picsum.photos",
    openingHours: "Friday",
    _id: expect.any(String),
    restaurantId: expect.any(String),
    createdAt: expect.any(String), 
    updatedAt: expect.any(String),
    __v: 0
}


describe('restaurant', () => {
    beforeAll(async () => {
        const mongoServer = await MongoMemoryServer.create()

        await mongoose.connect(mongoServer.getUri());
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoose.connection.close();
    });

    describe('create restaurant', () => {
        describe('if user is not logged in', () => {
            it('should return error 403', async () => {
                const { statusCode } = await supertest(app).post('/api/restaurants');

                expect(statusCode).toBe(403);
            });
        });

        describe('if user is logged in', () => {
            it('should return 200 and create restaurant', async () => {
                const jwt = signJwt(userPayload);
                const {statusCode, body} = await supertest(app).post('/api/restaurants').set('Authorization', `Bearer ${jwt}`).send(restaurantInput);
                expect(statusCode).toBe(200);

                expect(body).toEqual(restaurantPayload);
                
            });
        });
    });

    describe('get restaurant', () => {
        describe('if the restaurant does not exist', () => {
            it('should return a error 404', async () => {
                const restaurantId = 'restaurant-1';

                const { statusCode } = await supertest(app).get(`/api/restaurants/${restaurantId}`);
                expect(statusCode).toBe(404);

            })
        })
        describe('if the restaurant exists', () => {
            it('should return 200 and the product', async () => {
                //@ts-ignore
                const restaurant = await createRestaurant(restaurantInput);
                const { statusCode, body } = await supertest(app).get(`/api/restaurants/${restaurant.restaurantId}`);
                expect(statusCode).toBe(200);
                expect(body.restaurantId).toBe(restaurant.restaurantId);

            }) 
        })
    })
});