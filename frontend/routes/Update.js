const express = require('express');
const router = express.Router();
const task = require('../Modals/task');

router.post('/', async (req, res) => {
    console.log(req.body);
    try {
        let user = await task.findOne({ email: req.body.email });

        if (user) {

            let newObj={
                title:req.body.obj.taskDetail,
                desc:req.body.obj.taskDescription,
                dueDate:req.body.obj.dueDate,
                status:req.body.obj.status,
                id:new Date()
            }
            
            const requestIDString = JSON.stringify(req.body.id);
            user.TaskArray.push(newObj)

            let updatedTaskArray=user.TaskArray.filter((item)=>{
               return requestIDString!=JSON.stringify(item.id);
            })
            
           
            console.log(newObj);
             
             

          
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