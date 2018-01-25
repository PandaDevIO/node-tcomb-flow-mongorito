import bodyParser from 'body-parser';
import config from './config/config';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import users from "./routes/users";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    next();
});

app.use(cors());

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.use('/users', users);
app.listen(PORT);
console.log(`Server Express : ${PORT}`);
