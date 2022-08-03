const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const database = require("./database");

// routes
const authRoutes = require("./routes/auth.route");
const userRoutes = require("./routes/user.route");
const examRoutes = require("./routes/exam.route");

// models
const Role = require("./models/role.model");
const User = require("./models/user.model");
const Question = require("./models/question.model");
const Material = require("./models/material.model");
const Exam = require("./models/exam.model");


database
	.authenticate()
	.then(() => {
		console.log("Database connection has been established successfully.");
	})
	.catch((err) => {
		console.error("Unable to connect to the database:", err);
	});

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(
	cors({
		origin: "*",
		methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
	})
);
app.set("view engine", "ejs");

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/exam", examRoutes);

const PORT = process.env.PORT || 8001;

app.listen(PORT, () => {
	console.log(`Server running at: ${PORT}/`);
});
