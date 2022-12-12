import { P } from 'pino';
import {object, number, string, TypeOf} from 'zod'

const payload = {
    body: object({
        restaurant: string({
            required_error: 'Restaurant is required'
        }),
        title: string({
            required_error: 'Title is required'
        }),
        description: string({
            required_error: 'Description is required'
        }),
        price: number({
            required_error: 'Price is required'
        }).nonnegative(),
        score: number({
            required_error: 'Score is required'
        }).nonnegative().lte(5),
        image: string({
            required_error: 'Image is required'
        }),
    }),
};

const score = {
    body: object({
        score: number({
            required_error: 'Score is required'
        }).nonnegative().lte(5),
    }),
};

const params = {
    params: object({
        burgerId: string({
            required_error: 'burgerId is required'
        }),
    }),
};

export const createBurgerSchema = object({
    ...payload,
});

export const updateBurgerSchema = object({
    ...payload, 
    ...params,
});

export const deleteBurgerSchema = object({
    ...params,
});

export const getBurgerSchema = object({
    ...params,
});

export const updateBurgerScoreSchema = object({
    ...score, 
    ...params,
})

export type CreateBurgerInput = TypeOf<typeof createBurgerSchema>;
export type UpdateBurgerInput = TypeOf<typeof updateBurgerSchema>;
export type DeleteBurgerInput = TypeOf<typeof deleteBurgerSchema>;
export type GetBurgerInput = TypeOf<typeof getBurgerSchema>;
export type UpdateBurgerScoreInput = TypeOf<typeof updateBurgerScoreSchema>