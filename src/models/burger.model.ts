import mongoose from "mongoose";
import { customAlphabet } from 'nanoid'
import { RestaurantDocument } from "./restaurant.model";
import { UserDocument } from "./user.model";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface BurgerInput extends mongoose.Document {
    user: UserDocument["_id"];
    burgerId: string;
    restaurant: {
        name: string,
        restaurantId: string
    };
    title: string; 
    description: string;
    price: number;
    score: number;
    image: string;
    reviews: number;
}

export interface BurgerDocument extends BurgerInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}

const burgerSchema = new mongoose.Schema({ 
    burgerId: {type: String, required: true, unique: true, default: () => `burger_${nanoid()}`,},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    restaurant: {type: Object, ref: 'Restaurant',required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    score: {type: Number, required: true},
    image: {type: String, required: true},
    reviews: {type: Number, required: true, default: () => 1}
    }, { 
    timestamps: true,
});


const BurgerModel = mongoose.model<BurgerDocument>("Burger", burgerSchema);

export default BurgerModel;