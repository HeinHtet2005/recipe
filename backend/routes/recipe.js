

const handleMessage = require('../middlewares/handleMessage')
const express = require('express');
const {body} = require('express-validator')
const RecipeController = require('../controllers/RecipeController')
const router = express.Router();

router.get('',RecipeController.index);
router.post('',[
    body('title').notEmpty(),
    body('description').notEmpty(),
    body('ingredients').notEmpty()
    .isArray({min:3})
],handleMessage,RecipeController.store)
router.get('/:id',RecipeController.show)
router.delete('/:id',RecipeController.destory)
router.patch('/:id',RecipeController.update)


module.exports = router;