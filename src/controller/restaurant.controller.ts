import {Request, Response} from 'express'
import { CreateRestaurantInput, UpdateRestaurantInput} from '../schema/restaurant.schema'
import { createRestaurant, deleteRestaurant, findAndUpdateRestaurant, findRestaurant, fndAllRestaurants } from '../service/restaurant.service';

export async function createRestaurantHandler(req: Request<{}, {}, CreateRestaurantInput['body']>, res: Response) {
    const userId = res.locals.user._id;
    const body = req.body;

    const restaurant = await createRestaurant({...body, user: userId});

    return res.send(restaurant);

}

export async function updateRestaurantHandler(req: Request<UpdateRestaurantInput['params']>, res: Response) {
    const userId = res.locals.user._id;
    const restaurantId = req.params.restaurantId;
    const update = req.body;

    const restaurant = await findRestaurant({restaurantId});
    
    if(!restaurant) {
        return res.sendStatus(404);
    }

    if(String(restaurant.user) !== userId) {
        return res.sendStatus(403);
    }

    const updatedRestaurant = await findAndUpdateRestaurant({restaurantId}, update, {
        new: true,
    });

    return res.send(updatedRestaurant);

}

export async function getRestaurantHandler(req: Request<UpdateRestaurantInput['params']>, res: Response) {
    const restaurantId = req.params.restaurantId;
    const restaurant = await findRestaurant({restaurantId})

    if(!restaurant) {
        return res.sendStatus(404);
    }

    return res.send(restaurant);
}

export async function deleteRestaurantHandler(req: Request, res: Response) {
    const userId = res.locals.user._id;
    const restaurantId = req.params.restaurantId;

    const restaurant = await findRestaurant({restaurantId});
    
    if(!restaurant) {
        return res.sendStatus(404);
    }

    if(String(restaurant.user) !== userId) {
        return res.sendStatus(403);
    }
    await deleteRestaurant({restaurantId});

    return res.send(200);

}

export async function getAllRestaurantHandler(req: Request, res: Response) {
    const restaurants = await fndAllRestaurants();
    console.log(restaurants);
    if(!restaurants) {
        return res.sendStatus(404);
    }

    return res.send(restaurants);
}