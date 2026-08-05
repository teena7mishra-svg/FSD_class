const fs = require("fs");

const files = [
    "index.html",
    "style.css",
    "script.js"
];

let passed = true;

console.log("========== Running Automated Tests ==========\n");

files.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`✔ PASS : ${file} found`);
    } else {
        console.log(`✖ FAIL : ${file} not found`);
        passed = false;
    }
});

console.log();

if (passed) {
    console.log("All tests passed successfully.");
    process.exit(0);
} else {
    console.log("Some tests failed.");
    process.exit(1);
}
const fs = require("fs");

console.log("==========================================");
console.log(" Registration Form Automated Test Report");
console.log("==========================================\n");

let totalTests = 0;
let passedTests = 0;

function test(condition, description) {
    totalTests++;

    if (condition) {
        passedTests++;
        console.log("✔ PASS :", description);
    } else {
        console.log("✖ FAIL :", description);
    }
}

// ----------------------------
// Check Files
// ----------------------------

const files = ["index.html", "style.css", "script.js"];

files.forEach(file => {
    test(fs.existsSync(file), `${file} exists`);
});

if (
    !fs.existsSync("index.html") ||
    !fs.existsSync("script.js")
) {
    console.log("\nCannot continue because required files are missing.");
    process.exit(1);
}

const html = fs.readFileSync("index.html", "utf8");
const js = fs.readFileSync("script.js", "utf8");


// ----------------------------
// Username Validation Tests
// ----------------------------

function validateUsername(username) {
    return /^[A-Za-z ]{3,30}$/.test(username);
}

test(validateUsername("Teena Mishra"),
    "Valid username");

test(!validateUsername("T"),
    "Username too short");

test(!validateUsername("Teena123"),
    "Username should not contain numbers");

test(!validateUsername(""),
    "Username should not be empty");

// ----------------------------
// Email Validation Tests
// ----------------------------

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

test(validateEmail("teena@gmail.com"),
    "Valid email");

test(!validateEmail("teenagmail.com"),
    "Email missing @");

test(!validateEmail("teena@"),
    "Email missing domain");

test(!validateEmail("@gmail.com"),
    "Email missing username");

test(!validateEmail(""),
    "Email should not be empty");

// ----------------------------
// Date of Birth Validation Tests
// ----------------------------

function validateDOB(dob) {

    const birthDate = new Date(dob);
    const today = new Date();

    if (isNaN(birthDate.getTime()))
        return false;

    let age = today.getFullYear() - birthDate.getFullYear();

    const month = today.getMonth() - birthDate.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate()))
        age--;

    return age >= 18;
}

test(validateDOB("2002-05-15"),
    "Valid age (18+)");

test(!validateDOB("2015-10-10"),
    "User below 18 years");

test(!validateDOB(""),
    "Empty Date of Birth");

test(!validateDOB("abcd"),
    "Invalid Date format");


