// server.js - This file runs on a server, NOT in the browser.
// You need to have Node.js and npm installed to run this.
// Run `npm install express mongodb cors` to install dependencies.

const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors'); // To allow requests from your React app

const app = express();
const port = 5000; // Port for your backend server

// --- Connection URI for MongoDB ---
// Replace this with your actual MongoDB connection string.
const uri = "mongodb://localhost:27017/alumni-portal"; // Example for a local DB
const client = new MongoClient(uri);

app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Middleware to parse JSON bodies

let db;

// --- Connect to MongoDB and start the server ---
async function startServer() {
    try {
        await client.connect();
        db = client.db(); // Get the database instance
        console.log("✅ Successfully connected to MongoDB.");
        
        app.listen(port, () => {
            console.log(`🚀 Server running at http://localhost:${port}`);
        });
    } catch (err) {
        console.error("❌ Could not connect to MongoDB.", err);
        process.exit(1);
    }
}

// --- API ENDPOINTS ---
// Your React app will fetch data from these URLs.

// GET /api/activities - Fetch recent activities
app.get('/api/activities', async (req, res) => {
    try {
        const activities = await db.collection('activities')
            .find()
            .sort({ timestamp: -1 }) // -1 for descending order
            .limit(5)
            .toArray();
        res.json(activities);
    } catch (err) {
        res.status(500).json({ message: "Error fetching activities", error: err });
    }
});

// GET /api/events - Fetch upcoming events
app.get('/api/events', async (req, res) => {
    try {
        const now = new Date();
        const events = await db.collection('events')
            .find({ date: { $gt: now } }) // $gt means "greater than"
            .sort({ date: 1 }) // 1 for ascending order
            .toArray();
        res.json(events);
    } catch (err) {
        res.status(500).json({ message: "Error fetching events", error: err });
    }
});

// GET /api/stats - Fetch dashboard statistics
app.get('/api/stats', async (req, res) => {
    try {
        // In a real app, you'd calculate these stats more efficiently
        const totalAlumni = await db.collection('alumni').countDocuments();
        // Add more stats queries here (donations, active users, etc.)

        res.json({
            totalAlumni,
            // Add other stats here
        });
    } catch (err) {
        res.status(500).json({ message: "Error fetching stats", error: err });
    }
});


startServer();
