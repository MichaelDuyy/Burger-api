import { privateDecrypt } from 'crypto';
import {Request, Response} from 'express'
import { omit } from 'lodash';
import { CreateBurgerInput, UpdateBurgerInput, UpdateBurgerScoreInput } from '../schema/burger.schema'
import { createBurger, deleteBurger, findAndUpdateBurger, findBurger, fndAllBurgers } from '../service/burger.service';
import { fndAllRestaurants } from '../service/restaurant.service';

export async function createBurgerHandler(req: Request<{}, {}, CreateBurgerInput['body']>, res: Response) {
    const userId = res.locals.user._id;
    const body = req.body;
    const restaurants =  await fndAllRestaurants();
    let restaurantId;

    for(var restaurant of restaurants) {
        console.log(restaurant)
        if(restaurant.name === body.restaurant) {
            restaurantId = restaurant.restaurantId;
        }
    }

    if(!restaurantId) {
        restaurantId = "The restaurant is not yet in the application"
    }

    const burger = await createBurger({...omit(body, 'restaurant'), user: userId, restaurant:{name: body.restaurant, restaurantId: restaurantId}});

    return res.send(burger);

}

export async function updateBurgerHandler(req: Request<UpdateBurgerInput['params']>, res: Response) {
    const userId = res.locals.user._id;
    const burgerId = req.params.burgerId;
    const update = req.body;

    const burger = await findBurger({burgerId});
    
    if(!burger) {
        return res.sendStatus(404);
    }

    if(String(burger.user) !== userId) {
        return res.sendStatus(403);
    }

    const restaurants = await fndAllRestaurants();
    let restaurantId;

    for(var restaurant of restaurants) {
        console.log(restaurant)
        if(restaurant.name === update.restaurant) {
            restaurantId = restaurant.restaurantId;
        }
    }

    if(!restaurantId) {
        restaurantId = "The restaurant is not yet in the application"
    }

    const updateQuery = {
        restaurant: {
            name: update.restaurant,
            restaurantId: restaurantId
        },
        title: update.title,
        description: update.description,
        price: update.price,
        image: update.image
    }

    const updatedBurger = await findAndUpdateBurger({burgerId}, updateQuery, {
        new: true,
    });

    return res.send(updatedBurger);

}

export async function updateBurgerScoreHandler(req: Request<UpdateBurgerScoreInput['params']>, res: Response) {
    const burgerId = req.params.burgerId;
    const update = req.body;
    const burger = await findBurger({burgerId});

    if(!burger) {
        return res.sendStatus(404);
    }
    const newReview = burger.reviews + 1;
    const newScore = (burger.score * burger.reviews + update.score) / newReview;


    const updatedBurger = await findAndUpdateBurger({burgerId}, {score: newScore, reviews: newReview}, {
        new: true,
    });

    if(!updatedBurger) {
        return res.sendStatus(404);
    }

    return res.send(updatedBurger);
}

export async function getBurgerHandler(req: Request<UpdateBurgerInput['params']>, res: Response) {
    const burgerId = req.params.burgerId;
    const burger = await findBurger({burgerId})

    if(!burger) {
        return res.sendStatus(404);
    }

    return res.send(burger);
}

export async function deleteBurgerHandler(req: Request, res: Response) {
    const userId = res.locals.user._id;
    const burgerId = req.params.burgerId;

    const burger = await findBurger({burgerId});
    
    if(!burger) {
        return res.sendStatus(404);
    }

    if(String(burger.user) !== userId) {
        return res.sendStatus(403);
    }
    await deleteBurger({burgerId});

    return res.send(200);

}

export async function getAllBurgerHandler(req: Request, res: Response) {
    const burgers = await fndAllBurgers();
    if(!burgers) {
        return res.sendStatus(404);
    }

    return res.send(burgers);
}