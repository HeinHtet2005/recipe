
const Recipe = require("../models/Recipe");
const mongoose = require('mongoose')

const RecipeController = {
    index:async(req,res)=>{

        const page = req.query.page || 1;
        const limit = 6;
        const skip = (page -1)*limit;
        const recipes = await Recipe
        .find()
        .skip(skip)
        .limit(limit)
        .sort({createdAt:-1});
        const totalRecipesCount =await Recipe.countDocuments();
        const totalPages = Math.ceil(totalRecipesCount/6);
  
        //generate loopableLinks     
         const links = {
            nextPage:totalPages == page || totalPages < page? false:true,
            prevPage: page == 1 ? false : true,
            currentPage:page,
            loopableLinks :[]
          }
        for (let index = 0; index < totalPages; index++) {
            links.loopableLinks.push({pageNumber:index+1})
            
        }
        console.log(totalRecipesCount)
        const response = {
            data:recipes,
            links,
        }
        return res.json(response)
    },
    store:async(req,res)=>{
        const {title,description,ingredients} = req.body;
        const recipe = await Recipe.create({
            title,
            description,
            ingredients
        })
        return res.json(recipe)  
    },
    show:async(req,res)=>{
        try{
        let id = req.params.id;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({msg:" not a valid ID"})
        }
           const recipe = await Recipe.findById(id);
           if(!recipe){
                return res.status(404).json({msg:"recipe not found"})
           }
            return res.json(recipe)
        
        }catch(error){
            return res.status(500).json({msg:"Internal Server Error"})
        }
    },
    destory:async(req,res)=>{
        try{
            let id = req.params.id;
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({msg:" not a valid ID"})
            }
            const recipe = await Recipe.findByIdAndDelete(id);
            if(!recipe){
                return res.status(404).json({msg:"recipe not found"})
            }
            return res.json(recipe)
        
        }catch(error){
            return res.status(500).json({msg:"Internal Server Error"})
        }
    },
    update:async(req,res)=>{
        try{
        let id = req.params.id;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({msg:" not a valid ID"})
        }
           const recipe = await Recipe.findByIdAndUpdate(id,{
            ...req.body
           });
           if(!recipe){
                return res.status(404).json({msg:"recipe not found"})
           }
            return res.json(recipe)
        
        }catch(error){
            return res.status(500).json({msg:"Internal Server Error"})
        }
    },
    upload:async(req,res)=>{
        try{
              console.log(req.file);
             console.log(req.body);
            return res.json({msg:"uploaded"})
        }catch(error){
            console.log(error);
            return res.status(500).json({msg:'internet server error'})
        }
    }

};

module.exports = RecipeController;