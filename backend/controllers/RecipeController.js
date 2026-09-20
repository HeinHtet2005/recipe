const Recipe = require("../models/Recipe");
const mongoose = require("mongoose");
const deleteFile = require("../helpers/deleteFile");
const User = require("../models/User");
const emailQueue = require("../queues/emailQueue")
const RecipeController = {
  index: async (req, res) => {
    const page = req.query.page || 1;
    const limit = 6;
    const skip = (page - 1) * limit;
    const recipes = await Recipe.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    const totalRecipesCount = await Recipe.countDocuments();
    const totalPages = Math.ceil(totalRecipesCount / 6);

    //generate loopableLinks
    const links = {
      nextPage: totalPages == page || totalPages < page ? false : true,
      prevPage: page == 1 ? false : true,
      currentPage: page,
      loopableLinks: [],
    };
    for (let index = 0; index < totalPages; index++) {
      links.loopableLinks.push({ pageNumber: index + 1 });
    }
    const response = {
      data: recipes,
      links,
    };
    return res.json(response);
  },
  store: async (req, res) => {
    try {
      const { title, description, ingredients } = req.body;
      const recipe = await Recipe.create({
        title,
        description,
        ingredients,
      });
      const users = await User.find({}, "name email");
      const emails = users.map((user) => user.email);
      const validEmail = emails.filter(
        (email) => email !== req.authenticatedUser.email,
      );
      emailQueue.add({
        viewFileName: "email",
        data: {
          name: req.authenticatedUser.name,
          recipe: recipe.title,
        },
        from: req.authenticatedUser.email,
        to: validEmail,
        subject: "New Recipe Added",
      });

      return res.json(recipe);
    } catch (e) {
      return res
        .status(500)
        .json({ msg: "Internal Server Error", error: e.message });
    }
  },
  show: async (req, res) => {
    try {
      let id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: " not a valid ID" });
      }
      const recipe = await Recipe.findById(id);
      if (!recipe) {
        return res.status(404).json({ msg: "recipe not found" });
      }
      return res.json(recipe);
    } catch (error) {
      return res.status(500).json({ msg: "Internal Server Error" });
    }
  },
  destory: async (req, res) => {
    try {
      let id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: " not a valid ID" });
      }
      const recipe = await Recipe.findByIdAndDelete(id);

      const absolutePath = __dirname + "/../public" + recipe.photo;

      await deleteFile(absolutePath);
      if (!recipe) {
        return res.status(404).json({ msg: "recipe not found" });
      }
      return res.json(recipe);
    } catch (error) {
      return res.status(500).json({ msg: "Internal Server Error" });
    }
  },
  update: async (req, res) => {
    try {
      let id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: " not a valid ID" });
      }
      const recipe = await Recipe.findByIdAndUpdate(id, {
        ...req.body,
      });

      const absolutePath = __dirname + "/../public" + recipe.photo;
      console.log("Absolute Path = ", absolutePath);
      await deleteFile(absolutePath);

      if (!recipe) {
        return res.status(404).json({ msg: "recipe not found" });
      }
      return res.json(recipe);
    } catch (error) {
      return res
        .status(500)
        .json({ msg: "Internal Server Error", error: error.message });
    }
  },
  upload: async (req, res) => {
    try {
      const id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: " not a valid ID" });
      }

      const recipe = await Recipe.findByIdAndUpdate(id, {
        photo: "/" + req.file.filename,
      });

      if (!recipe) {
        return res.status(404).json({ msg: "recipe not found" });
      }

      return res.json(recipe);
    } catch (error) {
      return res.status(500).json({ msg: "internet server error" });
    }
  },
};

module.exports = RecipeController;
