import express from 'express';
import bodyParser from "body-parser";
import cors from 'cors';
import userRouter from './routes/user.js';
import employeeRouter from './routes/employee.js';
import mainRouter from './routes/main.js';
import authRouter from './routes/auth.js';

const port = 3000;

const app = express();
app.use(express.json());
app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//User End point
app.use('/',mainRouter);
app.use('/mande/user', userRouter);
app.use("/mande/auth", authRouter);
app.use("/mande/employee", employeeRouter);

app.get('/mande', (req, res) => {
    res.send("API response");
})

app.listen(port, () => {
    console.log(`Listening on port ${port}` );
})