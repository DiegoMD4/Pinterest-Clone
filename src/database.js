const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
mongoose
.connect(
`mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.whmrcia.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
)
.then(db => console.log("succesfully conected"))
.catch((error) => console.log(error));