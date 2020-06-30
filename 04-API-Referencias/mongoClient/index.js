const mongoose = require('mongoose');

mongoose.connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },)
    .then(()=> console.log(`Database connected`))
    .catch(()=> console.log(`Error connecting to database...`));