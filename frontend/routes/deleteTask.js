const express = require('express');
const router = express.Router();
const task = require('../Modals/task');

router.post('/', async (req, res) => {
    console.log(req.body);
    try {
        let user = await task.findOne({ email: req.body.email });

        if (user) {
            
            const requestIDString = JSON.stringify(req.body.id);
          

            let updatedTaskArray=user.TaskArray.filter((item)=>{
               return requestIDString!=JSON.stringify(item.id);
            })    
   
           

            // Update the 'TaskArray' with the updated array
            await task.findOneAndUpdate(
                { email: req.body.email },
                { TaskArray: updatedTaskArray }
            );

            res.send("Task deleted successfully");
        } else {
            console.log("User not found");
            res.send("User not found");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
});

module.exports = router;