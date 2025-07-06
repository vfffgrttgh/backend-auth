// IMPORT STATEMENTS
import http from "http";
import cors from "cors";
import crypto from "crypto";

// DEFINITIONS
const storedHashes = {
    q1: crypto.createHash("sha256").update("INTJ").digest("hex"),
    q2: crypto.createHash("sha256").update("Black Mamba").digest("hex"),
    q3: crypto.createHash("sha256").update("Wagonar").digest("hex")
};

// SERVER CREATION
http.createServer((req, res) => {
    if (req.method === "OPTIONS") {
        res.writeHead(200, {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*", // or your frontend URL
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type"
        });
        res.end();
        return;
    }

    if (req.method === "POST") {
        let body = "";

        // DATA BEING CHECKED
        req.on("data", chunk => {
            body += chunk;
        });

        // PROCESSING
        req.on("end", () => {
            const data = JSON.parse(body);
            const q1 = crypto.createHash("sha256").update(data.q1).digest("hex");
            const q2 = crypto.createHash("sha256").update(data.q2).digest("hex");
            const q3 = crypto.createHash("sha256").update(data.q3).digest("hex");
            let count = 0;

            // CHECKS
            if (q1 === storedHashes.q1) count++;
            if (q2 === storedHashes.q2) count++;
            if (q3 === storedHashes.q3) count++;

            if (count >= 3) {
                res.writeHead(200, { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" })
                res.end(JSON.stringify({
                    "recovery": "https://github.com/vfffgrttgh/Dev-Home",
                    "password": "Aayansh@2013",
                    "username": "Aayansh13",
                    "email": "aayansh.saxena13@gmail.com",
                    "message": "Passed",
                }));
            } else {
                res.writeHead(404, {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                });
                res.end(JSON.stringify({
                    "message": "Failed",
                }));
            }
        })
    }
    // LISTENING ON PORT 8080
}).listen(process.env.PORT || 8080, "0.0.0.0", () => {
    console.log("Listening on" + process.env.PORT);
});
