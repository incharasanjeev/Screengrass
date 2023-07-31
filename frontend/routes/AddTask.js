const express = require('express');
const router = express.Router();
const task = require('../Modals/task');


router.post('/', async (req, res) => {
    const objF = req.body.taskOBJ;
   const obj = {
        title: objF.title,
        desc: objF.description,
        dueDate: objF.dueDate,
        status:false,
        id:new Date
    }

    console.log(obj);

    try {
        let user = await task.findOne({ email: req.body.email });

        if (user) {
            await task.findOneAndUpdate({ email: req.body.email }, { $push: { TaskArray: obj } });
        } else {
            await task.create({
                email: req.body.email,
                TaskArray: [obj] 
            });
        }

        res.send("Task added Successfully");

    } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred.");
    }
});




module.exports = router;