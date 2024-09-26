import express, { Express } from 'express';
import User from './models/User';
import userRouter from './router/userRouter';
import bodyParser from 'body-parser';
import cors from 'cors';

const app: Express = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/', userRouter);

// Syncing the User model and starting the server
User.sync({ force: false })
    .then(() => {
        console.log("Database Connected.....");

        app.listen(port, () => {
            console.log(`Server connected on http://localhost:${port}....`);
        });
    })
    .catch((err: Error) => {
        console.log("Error: ", err);
    });
