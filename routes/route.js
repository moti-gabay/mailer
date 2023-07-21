const { Router } = require('express');

const router = require('express').Router();

const {singup,getbill} = require("../controller/appController")


router.post('/user/singup',singup);
router.post('/product/getbill/:email',getbill);


module.exports = router;