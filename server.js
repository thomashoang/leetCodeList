const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');

//bodyParser middleware
app.use(express.json());

mongoose.connect('mongodb+srv://thomas123:leetCodeList@cluster0.soc3m.mongodb.net/leetCodeList?retryWrites=true&w=majority', {
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