import mongoose from "mongoose";
import { customAlphabet } from 'nanoid'
import { UserDocument } from "./user.model";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface RestaurantInput extends mongoose.Document {
    user: UserDocument["_id"];
    restaurantId: string;
    name: string;
    location: string;
    menu: string;
    openingHours: string;
}

export interface RestaurantDocument extends RestaurantInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}

const restaurantSchema = new mongoose.Schema({ 
    restaurantId: {type: String, required: true, unique: true, default: () => `restaurant_${nanoid()}`,},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    name: {type: String, required: true},
    location: {type: String, required: true},
    menu: {type: String, required: true},
    openingHours: {type: String, required: true},
    }, { 
    timestamps: true,
});


const RestaurantModel = mongoose.model<RestaurantDocument>("Restaurant", restaurantSchema);

export default RestaurantModel;