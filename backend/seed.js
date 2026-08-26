import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import Recipe from "./models/Recipe.js";

mongoose.connect('mongodb://127.0.0.1:27017/mern-project');

const generateRecipes = (count) => {
  const recipes = [];

  for (let i = 0; i < count; i++) {
    recipes.push({
      title: faker.food.dish(),
      description: faker.food.description(),
      ingredients: [
        faker.food.ingredient(),
        faker.food.ingredient(),
        faker.food.ingredient(),
      ],
      cookingTime: faker.number.int({ min: 10, max: 120 }),
      createdAt: new Date(),
    });
  }

  return recipes;
};

const seedDB = async () => {
  try {
    await Recipe.deleteMany();

    const recipes = generateRecipes(100);

    await Recipe.insertMany(recipes);

    console.log("100 recipes inserted!");
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

seedDB();