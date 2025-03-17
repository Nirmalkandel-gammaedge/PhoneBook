const express = require("express");
const connect = require("./DB/connection");
const cors = require("cors");
const contact = require("./DB/contactSchema");

const app = express();
const port = 3000;

// Connect to MongoDB
connect();

app.use(express.json());
app.use(cors());

// Get all contacts
app.get("/", async (req, res) => {
  try {
    const data = await contact.find();
    res.status(200).json({ message: "Contact list retrieved", data });
  } catch (err) {
    res.status(500).json({ message: "Error retrieving contacts", error: err.message });
  }
});

// Save a contact
app.post("/save", async (req, res) => {
  try {
    const { name, avatar, phoneNumber, address, label } = req.body;
    
    if (!name || !avatar || !phoneNumber || !address || !label) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const data = new contact({ name, avatar, phoneNumber, address, label });
    await data.save();
    res.status(201).json({ message: "Your contact is saved", data });
  } catch (err) {
    res.status(500).json({ message: "Failed to save contact", error: err.message });
  }
});

// Find a contact by 
app.get("/find/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const data = await contact.findOne({ name: { $regex: new RegExp("^" + name + "$", "i") } });


    if (!data) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json({ message: "Contact found", data });
  } catch (err) {
    res.status(500).json({ message: "Error occurred while finding user", error: err.message });
  }
});

// Update
app.put("/update/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const { avatar, address, phoneNumber, label } = req.body;

    const updateContact = await contact.findOneAndUpdate(
      { name: new RegExp("^" + name + "$", "i") },
      { avatar, address, phoneNumber, label },
      { new: true }
    );

    if (!updateContact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json({ message: "Contact updated successfully", updateContact });
  } catch (err) {
    res.status(500).json({ message: "Error updating contact", error: err.message });
  }

});

// Delete 
app.delete("/delete/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const deletedContact = await contact.findOneAndDelete({ name: new RegExp("^" + name + "$", "i") });

    if (!deletedContact) {
      return res.status(404).json({ message: "Cannot find contact" });
    }

    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting contact", error: err.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
