const mongoose = require("mongoose");

const connectDatabase = () => {
    mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((data)=>{
    console.log(`Mongodb is connected  with server : ${data.connection.host} at ${process.env.DB_URI}`)
    })
};

module.exports = connectDatabase
