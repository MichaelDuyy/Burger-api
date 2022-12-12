import {object, number, string, TypeOf} from 'zod'

const payload = {
    body: object({
        name: string({
            required_error: 'Name is required'
        }),
        location: string({
            required_error: 'Location is required'
        }),
        menu: string({
            required_error: 'Menu is required'
        }),
        openingHours: string({
            required_error: 'Opening hours is required'
        }),
    }),
};

const params = {
    params: object({
        restaurantId: string({
            required_error: 'restaurantId is required'
        }),
    }),
};

export const createRestaurantSchema = object({
    ...payload
});

export const updateRestaurantSchema = object({
    ...payload, 
    ...params,
});

export const deleteRestaurantSchema = object({
    ...params,
});

export const getRestaurantSchema = object({
    ...params,
});


export type CreateRestaurantInput = TypeOf<typeof createRestaurantSchema>;
export type UpdateRestaurantInput = TypeOf<typeof updateRestaurantSchema>;
export type DeleteRestaurantInput = TypeOf<typeof deleteRestaurantSchema>;
export type GetRestaurantInput = TypeOf<typeof getRestaurantSchema>;