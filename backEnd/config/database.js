const mongoose = require('mongoose');

const connectToDB = () => {
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then((CONNECTED) => {
        console.log(`Successfully connected to DataBase: ${CONNECTED.connection.host}`);
    })
    .catch((ERROR) => {
        console.log(ERROR.message);
        console.log('some ERROR occured in the DataBase connection !');
        process.exit(1);
    });
}

module.exports = connectToDB;