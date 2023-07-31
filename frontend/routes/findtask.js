const express = require('express');
const router = express.Router();
const task = require('../Modals/task');


router.post('/', async (req, res) => {
    try {
        let user = await task.findOne({ email: req.body.email });
       
        if (user) {
            let arr = user.TaskArray;

            for (let i = 0; i < arr.length; i++) {
                const taskIDString = JSON.stringify(arr[i].id);

                
                const requestIDString = JSON.stringify(req.body.id);
                if (taskIDString === requestIDString) {
                    res.send(arr[i]);
                }
            }
            res.send("id nhi mili");
        }
        else {
            console.log("nhi hai");
            res.send("nhi hai kuch");
        }


    } catch (error) {
        console.log(error);
    }
})

module.exports = router;