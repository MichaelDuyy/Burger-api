import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import RestaurantModel, { RestaurantDocument } from "../models/restaurant.model";
import { Omit } from 'lodash'

export async function createRestaurant(input: DocumentDefinition<Omit<RestaurantDocument, "restaurantId" | "createdAt" | "updatedAt" >>) {
    return RestaurantModel.create(input);
}

export async function findRestaurant(query: FilterQuery<RestaurantDocument>, options: QueryOptions = {lean: true}) {
    return RestaurantModel.findOne(query, {}, options);
}

export async function findAndUpdateRestaurant(query: FilterQuery<RestaurantDocument>, update: UpdateQuery<RestaurantDocument>, options: QueryOptions) {
    return RestaurantModel.findOneAndUpdate(query, update, options);
}

export async function deleteRestaurant(query: FilterQuery<RestaurantDocument>) {
    return RestaurantModel.deleteOne(query);
}

export async function fndAllRestaurants() {
    return RestaurantModel.find();
}
