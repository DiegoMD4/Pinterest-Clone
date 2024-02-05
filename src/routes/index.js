const {Router} = require('express');
const router = Router();
const Image = require('../models/image');
const path = require('path')
const {unlink} = require('fs-extra');
const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET

});


router.get('/', async (req, res)=>{
   const images =  await Image.find();
   res.render('index', {images});
});


router.get('/upload', (req, res)=>{
    res.render('upload')
});

router.post('/upload', async (req, res)=>{
    console.log(req.file)
    const result = await cloudinary.uploader.upload(req.file.path);

    const image = new Image();
    image.title = req.body.title;
    image.description = req.body.description;
    image.filename = req.file.filename;
    image.path =  '/img/uploads/' + req.file.filename;
    image.originalname = req.file.originalname;
    image.mimetype = req.file.mimetype;
    image.size = req.file.size;
    image.image_url = result.url;
    image.public_id = result.public_id;

    console.log(result);

    await image.save();
    await unlink(path.resolve(`./src/public/${image.path}`))

    res.redirect('/');
});


router.get('/image/:id/', async (req, res)=>{
    const {id} = req.params;
    const image = await Image.findById(id)
    res.render('profile', {image})
});

router.get('/image/:id/delete', async (req, res)=>{
    const {id} = req.params
    const image = await Image.findByIdAndDelete(id);
     await unlink(path.resolve(`./src/public/${image.path}`))
    const result = await cloudinary.uploader.destroy(image.public_id);
    console.log(result);
    res.redirect("/");
});

module.exports = router;