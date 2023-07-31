const mongoose = require('mongoose')


const url =`mongodb+srv://ba7254491:jalnodea123@cluster0.er0iqiv.mongodb.net/?retryWrites=true&w=majority`

const mongoDB = async () => {

    await mongoose.connect(url)
        .then(async () => {
            console.log('Connected to the database ')
            


        }).catch ( (err) => {
    console.error(`Error connecting to the database. n${err}`);
})
}
module.exports = mongoDB;

