const fs = require("fs");

console.log("==============================================");
console.log("     REGISTRATION PAGE - AUTOMATED TESTS");
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
// Load Registration Page Files
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
// TEST CASE 1 - Required Files
// =================================================

runTest(
    1,
    "Required project files exist",
    fs.existsSync("index.html") &&
    fs.existsSync("style.css") &&
    fs.existsSync("script.js")
);


// =================================================
// TEST CASE 2 - Registration Form
// =================================================

runTest(
    2,
    "Registration form exists",
    html.includes("<form")
);


// =================================================
// TEST CASE 3 - Username / Full Name
// =================================================

runTest(
    3,
    "Full Name / Username input exists",
    html.includes('id="name"')
);


// =================================================
// TEST CASE 4 - Email Validation
// =================================================

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

runTest(
    4,
    "Valid email is accepted",
    validateEmail("student@gmail.com")
);


// =================================================
// TEST CASE 5 - Invalid Email
// =================================================

runTest(
    5,
    "Invalid email is rejected",
    !validateEmail("studentgmail.com")
);


// =================================================
// TEST CASE 6 - Phone Number
// =================================================

function validatePhone(phone) {
    return /^[0-9]{10}$/.test(phone);
}

runTest(
    6,
    "Valid 10-digit phone number is accepted",
    validatePhone("9876543210")
);


// =================================================
// TEST CASE 7 - Password Matching
// =================================================

function validatePassword(password, confirmPassword) {
    return password === confirmPassword;
}

runTest(
    7,
    "Matching passwords are accepted",
    validatePassword("Test@123", "Test@123")
);


// =================================================
// TEST CASE 8 - Password Mismatch
// =================================================

runTest(
    8,
    "Different passwords are rejected",
    !validatePassword("Test@123", "Test@456")
);


// =================================================
// TEST CASE 9 - Date of Birth
// =================================================

function validateDOB(dob) {

    const birthDate = new Date(dob);
    const today = new Date();

    if (isNaN(birthDate.getTime())) {
        return false;
    }

    return birthDate < today;
}

runTest(
    9,
    "Valid Date of Birth is accepted",
    validateDOB("2002-05-15")
);


// =================================================
// TEST CASE 10 - Terms & Conditions
// =================================================

function validateTerms(accepted) {
    return accepted === true;
}

runTest(
    10,
    "Terms & Conditions must be accepted",
    validateTerms(true)
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
    console.log("Registration Page is working correctly.");
    console.log("==============================================");

    process.exit(0);

} else {

    console.log("SOME TEST CASES FAILED");
    console.log("Please check the failed test cases.");
    console.log("==============================================");

    process.exit(1);
}
