const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/cruduser', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("conected to mongodb");
}).catch(error => {
    console.log("mongo error", error);
})

require('./note');