import express from "express";
import passport from "passport";

// Database Model
import { RestaurantModel } from "../../database/allModels";

// Router Setup
const Router = express.Router();


// validation
import {
  ValidateRestaurantCity,
  ValidateRestaurantSearchString,
} from "../../validation/restaurant";
import { ValidateRestaurantId } from "../../validation/food";
import { Strategy } from "passport-jwt";


/*
Route :     /
Des :        Get all the restaurant details based on city
Params :   None
Access :   Public
Method:   Get
*/
// restaurant/?city=jammu
Router.get("/", async (req, res) => {
  try {
    await ValidateRestaurantCity(req.query);
    const { city } = req.query;
    const restaurants = await RestaurantModel.find({ city });

    return res.json({ restaurants });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});


// add new
Router.post("/new", passport.authenticate("jwt"), async (req, res) => {
  try {
    const newRestaurant = await RestaurantModel.create(req.body.restaurantData);
    return res.json({ restaurants: newRestaurant });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/*
Route :     /
Des :        Get individual restaurant details based on id
Params :   id
Access :   Public
Method:   Get
*/
Router.get("/:_id", async (req, res) => {
  try {
    await ValidateRestaurantId(req.params);

    const { _id } = req.params;
    const restaurant = await RestaurantModel.findById(_id);
    if (!restaurant)
      return res.status(404).json({ error: "Restaurant Not Found" });

    return res.json({ restaurant });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});



/*
Route :     /search
Des :        Get  restaurant details based on search string
Body : search string
Params :   none
Access :   Public
Method:   Get
*/
Router.get("/search", async (req, res) => {
  try {
    await ValidateRestaurantSearchString(req.body);

    const { searchString } = req.body;

    const restaurants = await RestaurantModel.find({
      name: { $regex: searchString, $options: "i" },
    });
    if (!restaurants)
      return res
        .status(404)
        .json({ error: `No Restaurant matched with ${searchString}` });

    return res.json({ restaurants });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});



export default Router;