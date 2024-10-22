const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const model = require("./model/model")
const app = express();
app.use(express.json());
app.use(cors());


//read
app.get("/", async (req, res) => {
    const data = await model.find()
    console.log(data)
    res.json({ data: data });
})

//create

app.post('/create', async (req, res) => {
    try {
        console.log(req.body); // This should now log the actual data
        const { name, email, phone } = req.body; // Extract name, email, and phone from request body
        if (!name || !email || !phone) {
            return res.status(400).send('All fields are required');
        }

        const data = new model({ name, email, phone });
        await data.save();
        res.send("Record created");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error creating record");
    }
});

//update
app.put("/update/:id", async (req, res) => {
    const id = req.params.id; // Get ID from the request params
    const { name, email, phone } = req.body; // Extract the updated data from the request body

    try {
        // Use updateOne with both the filter (id) and the updated data
        const data = await model.updateOne(
            { _id: id }, // Find the document by id
            { $set: { name, email, phone } } // Update the fields with new values
        );

        console.log("Updated data:", data);
        res.status(200).send("Update successfully");
    } catch (error) {
        console.error("Error updating:", error);
        res.status(500).send("Error updating the data");
    }
});


//delete

app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id; // Correctly access the ID from params
    try {
        const data = await model.deleteOne({ _id: id });
        console.log("Deleted", data); // Log the deleted data response
        res.status(200).send("Deleted successfully"); // Send a success response
    } catch (error) {
        console.error("Error deleting:", error);
        res.status(500).send("Error deleting the data"); // Handle any errors
    }
});


mongoose.connect("mongodb+srv://lalo:lalo@react.niutp.mongodb.net/?retryWrites=true&w=majority&appName=react")
try {
    console.log("sucess");
    app.listen(3000, () => {
        console.log("port connected");
    })
}
catch (err) {
    console.log(err)
}

