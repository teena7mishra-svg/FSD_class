const fs = require("fs");

console.log("==============================================");
console.log("   REGISTRATION PAGE - JSON DATA TESTS");
console.log("==============================================\n");

let passed = 0;
let failed = 0;

function runTest(testNumber, testName, condition) {
    if (condition) {
        console.log(`TEST ${testNumber}: PASS - ${testName}`);
        passed++;
    } else {
        console.log(`TEST ${testNumber}: FAIL - ${testName}`);
        failed++;
    }
}

// =================================================
// Load project files
// =================================================

const html = fs.existsSync("index.html")
    ? fs.readFileSync("index.html", "utf8")
    : "";

const js = fs.existsSync("script.js")
    ? fs.readFileSync("script.js", "utf8")
    : "";

const css = fs.existsSync("style.css")
    ? fs.readFileSync("style.css", "utf8")
    : "";

// =================================================
// Load users.json
// =================================================

let users = [];

if (fs.existsSync("users.json")) {
    try {
        const jsonData = JSON.parse(
            fs.readFileSync("users.json", "utf8")
        );

        users = Array.isArray(jsonData.users)
            ? jsonData.users
            : [];

    } catch (error) {
        console.log("ERROR: users.json contains invalid JSON.");
    }
}

const user = users.length > 0
    ? users[0]
    : {};

// =================================================
// Validation Functions
// =================================================

function validateName(name) {
    return typeof name === "string" &&
           name.trim().length >= 3 &&
           /^[A-Za-z ]+$/.test(name.trim());
}

function validateEmail(email) {
    return typeof email === "string" &&
           /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
    return /^[0-9]{10}$/.test(String(phone));
}

function validatePassword(password) {
    return typeof password === "string" &&
           password.length >= 8 &&
           /[A-Z]/.test(password) &&
           /[a-z]/.test(password) &&
           /[0-9]/.test(password);
}

function validatePasswordMatch(password, confirmPassword) {
    return password === confirmPassword;
}

function validateDOB(dob) {

    const birthDate = new Date(dob);
    const today = new Date();

    if (!dob || isNaN(birthDate.getTime())) {
        return false;
    }

    return birthDate < today;
}

function validateTerms(accepted) {
    return accepted === true;
}

// =================================================
// TEST 1 - Required Files
// =================================================

runTest(
    1,
    "Required project files exist",
    fs.existsSync("index.html") &&
    fs.existsSync("style.css") &&
    fs.existsSync("script.js")
);

// =================================================
// TEST 2 - Registration Form
// =================================================

runTest(
    2,
    "Registration form exists",
    html.includes("<form")
);

// =================================================
// TEST 3 - Full Name / Username
// =================================================

runTest(
    3,
    "Valid Full Name / Username",
    validateName(user.name || user.username)
);

// =================================================
// TEST 4 - Email
// =================================================

runTest(
    4,
    "Valid email is accepted",
    validateEmail(user.email)
);

// =================================================
// TEST 5 - Phone Number
// =================================================

runTest(
    5,
    "Valid 10-digit phone number is accepted",
    validatePhone(user.phone)
);

// =================================================
// TEST 6 - Password
// =================================================

runTest(
    6,
    "Valid password is accepted",
    validatePassword(user.password)
);

// =================================================
// TEST 7 - Password Matching
// =================================================

runTest(
    7,
    "Matching passwords are accepted",
    validatePasswordMatch(
        user.password,
        user.confirmPassword
    )
);

// =================================================
// TEST 8 - Date of Birth
// =================================================

runTest(
    8,
    "Valid Date of Birth is accepted",
    validateDOB(user.dob)
);

// =================================================
// TEST 9 - Terms & Conditions
// =================================================

runTest(
    9,
    "Terms & Conditions are accepted",
    validateTerms(user.termsAccepted)
);

// =================================================
// TEST 10 - Complete Registration Record
// =================================================

runTest(
    10,
    "Complete registration record is valid",

    validateName(user.name || user.username) &&
    validateEmail(user.email) &&
    validatePhone(user.phone) &&
    validatePassword(user.password) &&
    validatePasswordMatch(
        user.password,
        user.confirmPassword
    ) &&
    validateDOB(user.dob) &&
    validateTerms(user.termsAccepted)
);

// =================================================
// FINAL TEST REPORT
// =================================================

console.log("\n==============================================");
console.log("              TEST SUMMARY");
console.log("==============================================");

console.log(`Total Tests  : ${passed + failed}`);
console.log(`Passed Tests : ${passed}`);
console.log(`Failed Tests : ${failed}`);

console.log("==============================================");

if (failed === 0) {

    console.log("ALL TEST CASES PASSED");
    console.log("Registration data is valid.");
    console.log("==============================================");

    process.exit(0);

} else {

    console.log("SOME TEST CASES FAILED");
    console.log("Please check the failed test cases.");
    console.log("==============================================");

    process.exit(1);
}

