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
