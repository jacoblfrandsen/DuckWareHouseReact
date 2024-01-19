const express = require('express')
const Duck = require('../models/duckModel.js')

const router = express.Router()

const checkForDupDucks = async (price, color, size) => {
    try {
        const existingDuck = await Duck.findOne({ price, color, size, deleted: { $ne: true } })
        return existingDuck
    } catch (error) {
        console.error('Error checking for existing duck:', error)
        throw error
    }
};


//create a duck
router.post('/', async (req, res) => {
    try{
        if(
            !req.body.color ||
            !req.body.size ||
            !req.body.price ||
            !req.body.quantity
        ){
            console.log(req.body)
            return res.status(400).send({
                message:'Fields cannot be empty'
            })
        }
        
        const newDuck = {
            color: req.body.color,
            size: req.body.size,
            price: req.body.price,
            quantity: req.body.quantity,
            deleted: false
        }

        //check if duck already exsists
        const existingDuck = await checkForDupDucks(newDuck.price, newDuck.color, newDuck.size);
        if (existingDuck) {
            existingDuck.quantity = +existingDuck.quantity + +newDuck.quantity;
            await existingDuck.save();
            
            return res.status(202).send({ message: 'Duck quantity updated', updatedDuck: existingDuck });
        } else{
            const duck = await Duck.create(newDuck)
            return res.status(201).send(duck)
        }
    
    }catch (error){
        console.log(error.message)
        res.status(500).send({message:error.message})
    }
});

//get all ducks
router.get('/', async (req, res) => {
    try{
        // change to -1 to get Acsending order
        const ducks = await Duck.find({ deleted: { $ne: true }}).sort({ quantity: 1 })

        return res.status(200).json({
            count: ducks.length,
            data: ducks
        })
    }catch (error){
        console.log('error in get ducks', error.message)
        res.status(500).send({message:error.message})
    }
});
//gets duck by id
router.get('/:duckId', async (req, res) => {
    try{

        const {duckId} = req.params
        const duck = await Duck.find({_id: duckId})

        return res.status(200).json(duck)
    }catch (error){
        console.log('error in get ducks by id', error.message)
        res.status(500).send({message:error.message})
    }
});


//update duck with id
router.put('/:duckId', async (req, res) => {
    try{
        if(
            !req.body.color ||
            !req.body.size ||
            !req.body.price ||
            !req.body.quantity
        ){
            console.log(req.body)
            return res.status(400).send({
                message:'Fields cannot be empty in update'
            })
        }

        const {duckId} = req.params
        const result1 = await Duck.findOneAndUpdate({_id: duckId}, {quantity: req.body.quantity})
        const result2 = await Duck.findOneAndUpdate({_id: duckId} , {price: req.body.price})

        const duck = await Duck.find({_id: duckId})

        if (!result1 ||  !result2){
            return res.status(404).send({
                message:'Duck Id not found'
            })
        }

        return res.status(200).json(duck)
    }catch (error){
        console.log('error in get ducks by id', error.message)
        res.status(500).send({message:error.message})
    }
});

router.delete('/deleteall', async (req, res) => {
    try{

        const result = await Duck.deleteMany({})

        if(!result){
            return res.status(404).send({
                message:'Delete Failed'
            })
        }
        return res.status(200).send(`All Ducks Deleted deleted`)
    }catch (error){
        console.log('error in delete all ducks', error.message)
        res.status(500).send({message:error.message})
    }
});


router.delete('/delete/:duckId', async (req, res) => {
    try{

        const {duckId} = req.params
        const result = await Duck.findByIdAndUpdate(duckId, {deleted: true})

        if(!result){
            return res.status(404).send({
                message:'Delete Failed'
            })
        }
        return res.status(200).send(`DuckId: ${duckId} deleted`)
    }catch (error){
        console.log('error in delete ducks by duck id', error.message)
        res.status(500).send({message:error.message})
    }
});


module.exports = router