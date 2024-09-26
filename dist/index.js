"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("./models/User"));
const userRouter_1 = __importDefault(require("./router/userRouter"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 3000;
// Middleware
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use('/', userRouter_1.default);
// Syncing the User model and starting the server
User_1.default.sync({ force: false })
    .then(() => {
    console.log("Database Connected.....");
    app.listen(port, () => {
        console.log(`Server connected on http://localhost:${port}....`);
    });
})
    .catch((err) => {
    console.log("Error: ", err);
});
