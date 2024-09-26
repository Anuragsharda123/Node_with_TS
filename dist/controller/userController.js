"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUser = exports.loginUser = exports.updatUser = exports.addUser = exports.getUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../models/User")); // Assuming the User model is also in TypeScript
const app = (0, express_1.default)();
const secret = "Anurag123#@!";
let token;
app.use(express_1.default.json());
// Get User by ID
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findByPk(req.params.id);
        if (user) {
            res.json(user);
        }
        else {
            res.status(404).send("User not Found");
        }
    }
    catch (err) {
        res.status(404).send(`${err} & User not Found......`);
    }
});
exports.getUser = getUser;
// Add New User
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Hashing the password
        req.body.password = yield bcrypt_1.default.hash(req.body.password, 10);
        // Creating new user
        const user = yield User_1.default.create(req.body);
        res.json(user);
    }
    catch (err) { // Adding `any` as fallback in case of unknown type
        console.log(err.message);
        res.status(404).send(`${err} & User can't be added`);
    }
});
exports.addUser = addUser;
// Update User
const updatUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findByPk(req.params.id);
        if (user) {
            yield user.update(req.body);
            res.json(user);
        }
        else {
            res.status(404).send("User Not Found");
        }
    }
    catch (err) {
        res.status(500).send(`${err} & Error updating the user`);
    }
});
exports.updatUser = updatUser;
// Login User
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield User_1.default.findOne({ where: { email } });
        if (user) {
            const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
            if (isPasswordValid) {
                token = jsonwebtoken_1.default.sign({ user }, secret);
                res.json({ user, token });
                const verified = jsonwebtoken_1.default.verify(token, secret);
                console.log(verified);
                console.log("User login successful");
            }
            else {
                res.status(401).send("Invalid Credentials");
            }
        }
        else {
            res.status(401).send("User doesn't exist");
        }
    }
    catch (err) {
        res.status(500).send(`Error logging in: ${err}`);
    }
});
exports.loginUser = loginUser;
// Get All Users
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.findAll();
        res.json(users);
    }
    catch (err) {
        res.status(500).send(`Error retrieving users: ${err}`);
    }
});
exports.getAllUser = getAllUser;
