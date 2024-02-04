const express = require('express');
const studentsRouter = require('./routes/api/studentRoutes');
const database = require('./model/database');
const bodyParser = require('body-parser');
const corsOptions = require('./config/corsConfig');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));

database.connectDb();

app.use('/students', studentsRouter);

app.listen(PORT, () => {
    console.log(`server has started on port ${PORT}`)
})