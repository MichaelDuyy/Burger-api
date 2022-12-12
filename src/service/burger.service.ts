import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import BurgerModel, { BurgerDocument } from "../models/burger.model";
import { Omit } from 'lodash'

export async function createBurger(input: DocumentDefinition<Omit<BurgerDocument, "burgerId" | "reviews" | "createdAt" | "updatedAt" >>) {
    return BurgerModel.create(input);
}

export async function findBurger(query: FilterQuery<BurgerDocument>, options: QueryOptions = {lean: true}) {
    return BurgerModel.findOne(query, {}, options);
}

export async function findAndUpdateBurger(query: FilterQuery<BurgerDocument>, update: UpdateQuery<BurgerDocument>, options: QueryOptions) {
    return BurgerModel.findOneAndUpdate(query, update, options);
}

export async function deleteBurger(query: FilterQuery<BurgerDocument>) {
    return BurgerModel.deleteOne(query);
}

export async function fndAllBurgers() {
    console.log("IUHGYBHIJNKIOBHJNKMNJBHKNLM")
    return BurgerModel.find();
}
