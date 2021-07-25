import  mongoose from "mongoose";

const FoodSchema = new Mongoose.Schema({
    name: {type: String, required: true},
    descript: {type: String, required: true},
    isVeg: {type: Boolean, required: true},
    isContainsEgg: {type: Boolean, required:true},
    Category: {type: String, required: true},
    photos: {
        type: mongoose.Types.ObjectId,
        ref: "Images",
    },
    prices: {type: Number, default: 150, required:true },
    addOns: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Foods",
        },
    ],
    resturant: {
        type: mongoose.Types.ObjectId,
        ref:"Restaurants",
        required: true,
    },
});

export const FoodModel = mongoose.model("Foods", FoodSchema);