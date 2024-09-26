import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';
import express from 'express';
import User from '../models/User'; // Assuming the User model is also in TypeScript

const app = express();
const secret: string = "Anurag123#@!";
let token: string;

app.use(express.json());

// Get User by ID
export const getUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).send("User not Found");
        }
    } catch (err) {
        res.status(404).send(`${err} & User not Found......`);
    }
};

// Add New User
export const addUser = async (req: Request, res: Response): Promise<void> => {
    try {
        // Hashing the password
        req.body.password = await bcrypt.hash(req.body.password, 10);
        
        // Creating new user
        const user = await User.create(req.body);
        res.json(user);
    } catch (err: any) { // Adding `any` as fallback in case of unknown type
        console.log(err.message);
        res.status(404).send(`${err} & User can't be added`);
    }
};

// Update User
export const updatUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            await user.update(req.body);
            res.json(user);
        } else {
            res.status(404).send("User Not Found");
        }
    } catch (err: any) {
        res.status(500).send(`${err} & Error updating the user`);
    }
};

// Login User
export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });

        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (isPasswordValid) {
                token = JWT.sign({ user }, secret);

                res.json({ user, token });

                const verified = JWT.verify(token, secret);
                console.log(verified);
                console.log("User login successful");
            } else {
                res.status(401).send("Invalid Credentials");
            }
        } else {
            res.status(401).send("User doesn't exist");
        }
    } catch (err: any) {
        res.status(500).send(`Error logging in: ${err}`);
    }
};

// Get All Users
export const getAllUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (err: any) {
        res.status(500).send(`Error retrieving users: ${err}`);
    }
};
