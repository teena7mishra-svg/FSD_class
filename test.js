const http = require("http");

http.get("http://localhost:5000", (res) => {

    if (res.statusCode === 200) {
        console.log("✅ Server Test Passed");
        process.exit(0);
    } else {
        console.log("❌ Server Test Failed");
        process.exit(1);
    }

}).on("error", () => {

    console.log("❌ Server Not Running");
    process.exit(1);

});
