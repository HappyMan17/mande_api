import express from 'express';

const port = 3000;

const app = express();
app.use(express.json());

app.get('/mande', (req, res) => {
    res.send("API response");
})

app.listen(port, () => {
    console.log(`Listening on port ${port}` );
})