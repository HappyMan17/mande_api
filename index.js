import express from 'express';
import bodyParser from "body-parser";

const port = 3000;

const app = express();
app.use(express.json());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/mande', (req, res) => {
    res.send("API response");
})

app.listen(port, () => {
    console.log(`Listening on port ${port}` );
})