import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AddContact = ({ onContactAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    avatar: "",
    phoneNumber: "",
    address: "",
    label: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post("http://localhost:3000/save", formData);
      
      if (onContactAdded) onContactAdded();
      navigate("/");
      setFormData({
        name: "",
        avatar: "",
        phoneNumber: "",
        address: "",
        label: "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add contact");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Add Contact
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          label="Avatar URL"
          name="avatar"
          value={formData.avatar}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          label="Phone Number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          label="Label"
          name="label"
          value={formData.label}
          onChange={handleChange}
          required
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary">
          Save Contact
        </Button>
      </Box>
    </Container>
  );
};

export default AddContact;
