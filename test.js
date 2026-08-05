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


