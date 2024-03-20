const express = require("express");
const cors = require("cors");
const Code = require("./db/Code");
const client = require("./redis/client");

const app = express();
app.use(cors())
app.use(express.json());

const { connectWithDb } = require('./db/config');
const { submitCode } = require("./api/submit");
const { fetchCode } = require("./api/fetch");
connectWithDb();

// Define your routes
app.get("/api/code-submissions", async (req, res) => {
	try {
        const cache = await client.get("code_data");
        if (cache) return res.json(JSON.parse(cache));

		// const codeSubmissions = await Code.find().sort({ timestamp: -1 });
        const codeSubmissions = await Code.findAll({ order: [['timestamp', 'DESC']] });
        client.set("code_data", JSON.stringify(codeSubmissions));
        await client.expire("code_data", 60) // cache available for 60s
		res.json(codeSubmissions);
	} catch (error) {
		console.error("Error fetching code submissions:", error);
		res.status(500).json({ error: "Internal server error" });
	}
});

// POST endpoint to create a new code submission
app.post("/api/code-submissions", async (req, res) => {
	try {
		const { username, language, stdin, code } = req.body;

        const result_token = await submitCode(language, code, stdin);
        setTimeout(async () => {
            const std_out = await fetchCode(result_token);
            const newCodeSubmission = await Code.create({
                username,
                language,
                code,
                stdin,
                stdout: std_out.stdout
            });
            res.status(201).json(newCodeSubmission);
        }, 1000);

	} catch (error) {
		console.error("Error creating code submission:", error);
		res.status(500).json({ error: "Internal server error" });
	}
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
