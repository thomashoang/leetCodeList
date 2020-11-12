const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const config = require('config');

//bodyParser middleware
app.use(express.json());

const db = config.get("MONGO_URI");
mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
    .then(() => console.log('database connected'))
    .catch(err => console.error(err.msg));

//use routes
app.use("/api/problems", require("./routes/api/problems"));

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
});