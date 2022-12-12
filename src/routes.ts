import { Express, Request, Response } from 'express';
import { createUserHandler } from './controller/user.controller';
import validateResource from './middleware/validateResource';
import { createUserSchema } from './schema/user.schema';
import { createSessionSchema } from './schema/session.schema';
import { createSessionHandler, deleteSessionHandler, getSessionsHandler } from './controller/session.controller';
import requireUser from './middleware/requireUser';
import { createBurgerSchema, deleteBurgerSchema, getBurgerSchema, updateBurgerSchema, updateBurgerScoreSchema } from './schema/burger.schema';
import { createBurgerHandler, deleteBurgerHandler, getAllBurgerHandler, getBurgerHandler, updateBurgerHandler, updateBurgerScoreHandler } from './controller/burger.controller';
import { createRestaurantSchema, deleteRestaurantSchema, getRestaurantSchema, updateRestaurantSchema } from './schema/restaurant.schema';
import { createRestaurantHandler, deleteRestaurantHandler, getAllRestaurantHandler, getRestaurantHandler, updateRestaurantHandler } from './controller/restaurant.controller';

function routes(app: Express) {
    app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));

    app.post('/api/users', validateResource(createUserSchema), createUserHandler);

    app.post('/api/sessions', validateResource(createSessionSchema), createSessionHandler);
    
    app.get('/api/sessions', requireUser, getSessionsHandler);

    app.delete('/api/sessions', requireUser, deleteSessionHandler);

    app.post( "/api/burgers",[requireUser, validateResource(createBurgerSchema)],createBurgerHandler);

    app.get( "/api/burgers", getAllBurgerHandler);

    app.put("/api/burgers/:burgerId", [requireUser, validateResource(updateBurgerSchema)],updateBurgerHandler);
    
    app.get("/api/burgers/:burgerId", validateResource(getBurgerSchema), getBurgerHandler);
    
    app.delete("/api/burgers/:burgerId", [requireUser, validateResource(deleteBurgerSchema)],deleteBurgerHandler);

    app.put("/api/burgers/:burgerId/score-update", validateResource(updateBurgerScoreSchema), updateBurgerScoreHandler);

    app.post( "/api/restaurants",[requireUser, validateResource(createRestaurantSchema)],createRestaurantHandler);

    app.get( "/api/restaurants", getAllRestaurantHandler);

    app.put("/api/restaurants/:restaurantId", [requireUser, validateResource(updateRestaurantSchema)],updateRestaurantHandler);
    
    app.get("/api/restaurants/:restaurantId", validateResource(getRestaurantSchema), getRestaurantHandler);
    
    app.delete("/api/restaurants/:restaurantId", [requireUser, validateResource(deleteRestaurantSchema)],deleteRestaurantHandler);
}


export default routes;