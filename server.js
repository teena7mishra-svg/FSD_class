const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static(__dirname));

const filePath = path.join(__dirname, "student.json");

app.get("/students", (req, res) => {

    if (!fs.existsSync(filePath)) {

        fs.writeFileSync(filePath, JSON.stringify({ students: [] }, null, 2));

    }

    const data = JSON.parse(fs.readFileSync(filePath));

    res.json(data);

});

app.post("/register", (req, res) => {

    let data = { students: [] };

    if (fs.existsSync(filePath)) {

        data = JSON.parse(fs.readFileSync(filePath));

    }

    data.students.push(req.body);

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    res.json({

        message: "Registration Successful"

    });

});

app.listen(3000, () => {

    console.log("Server Running : http://localhost:3000");

});
