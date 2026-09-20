
const upload = require('../helpers/upload')
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
router.post('/:id/upload',[
    upload.single('photo'),
    body('photo').custom((value,{req})=>{
       if(!req.file){
        throw new Error('photo is required')
       }
       if(!req.file.mimetype.startsWith('image')){
        throw new Error('must be image')
       }
       return true
    })
],handleMessage,RecipeController.upload)

module.exports = router;