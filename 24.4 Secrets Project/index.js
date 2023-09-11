//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming
import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { userInfo } from "os";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

var correctPW = "ILoveProgramming";
var isAuthorized = false;

app.use(bodyParser.urlencoded({extended: true}));

function checkPassword(req, res, next) {
    var inputPW = req.body["password"];
    if (inputPW == correctPW) {
        isAuthorized = true;
    }
    next();
}

app.use(checkPassword);

app.post("/check", (req, res) => {
    if (isAuthorized) {
        res.sendFile(__dirname + "/public/secret.html");
    } else {
        res.sendFile(__dirname + "/public/index.html");
    }
});


app.get("/", (req, res) => {
    isAuthorized = false;
    res.sendFile(__dirname + "/public/index.html");
});

app.listen(port, () => {
    console.log(`Listening at port ${port}`);
});