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
// HTML Tests
// ----------------------------

test(html.includes("<form"), "Registration form exists");

test(html.includes('id="name"'),
    "Full Name field exists");

test(html.includes('id="email"'),
    "Email field exists");

test(html.includes('id="phone"'),
    "Phone Number field exists");

test(html.includes('id="password"'),
    "Password field exists");

test(html.includes('id="confirmPassword"'),
    "Confirm Password field exists");

test(html.includes('name="gender"'),
    "Gender radio buttons exist");

test(html.includes('id="dob"'),
    "Date of Birth field exists");

test(html.includes('id="terms"'),
    "Terms & Conditions checkbox exists");

test(html.includes("Register"),
    "Register button exists");

// ----------------------------
// JavaScript Validation Tests
// ----------------------------

test(js.includes("registerForm"),
    "Form submit event exists");

test(js.includes("password!==confirmPassword"),
    "Password match validation exists");

test(js.includes("phone.length!=10"),
    "Phone validation exists");

test(js.includes("terms"),
    "Terms validation exists");

test(js.includes("gender"),
    "Gender validation exists");

test(js.includes("Registration Successful"),
    "Success message exists");

// ----------------------------
// Summary
// ----------------------------

console.log("\n==========================================");

console.log(`Total Tests  : ${totalTests}`);
console.log(`Passed Tests : ${passedTests}`);
console.log(`Failed Tests : ${totalTests-passedTests}`);

console.log("==========================================");

if (passedTests === totalTests) {
    console.log("\n🎉 ALL TEST CASES PASSED");
    process.exit(0);
} else {
    console.log("\n❌ SOME TEST CASES FAILED");
    process.exit(1);
}
