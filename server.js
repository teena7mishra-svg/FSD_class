const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Serve frontend
app.use(express.static(path.join(__dirname, "public")));

const filePath = path.join(__dirname, "data.json");

// Read JSON file
function readData() {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, "[]");
    }

    return JSON.parse(fs.readFileSync(filePath));
}

// Write JSON file
function writeData(data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// ---------------- Register ----------------

app.post("/register", (req, res) => {

    const { name, email, password } = req.body;

    let students = readData();

    const exists = students.find(student => student.email === email);

    if (exists) {
        return res.json({
            success: false,
            message: "Email already registered"
        });
    }

    students.push({
        name,
        email,
        password
    });

    writeData(students);

    res.json({
        success: true,
        message: "Registration Successful"
    });

});

// ---------------- Login ----------------

app.post("/login", (req, res) => {

    const { email, password } = req.body;

    let students = readData();

    const student = students.find(
        s => s.email === email && s.password === password
    );

    if (!student) {
        return res.json({
            success: false,
            message: "Invalid Email or Password"
        });
    }

    res.json({
        success: true,
        name: student.name,
        message: "Login Successful"
    });

});

// Get all users (optional)

app.get("/students", (req, res) => {

    res.json(readData());

});

app.listen(PORT, () => {

    console.log(`Server Running at http://localhost:${PORT}`);

});

   
