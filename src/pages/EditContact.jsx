import React, { useEffect, useState } from "react";
import axios from "axios";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const EditContact = ({ name, onContactUpdated }) => {
  const [formData, setFormData] = useState({
    avatar: "",
    phoneNumber: "",
    address: "",
    label: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/contact/${name}`
        );
        setFormData(response.data);
      } catch (err) {
        setError("Failed to load contact");
      }
    };
    fetchContact();
  }, [name]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.put(
        `http://localhost:3000/update/${name}`,
        formData
      );
      alert("contact edited successfully");

      if (onContactUpdated) onContactUpdated();
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update contact");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Edit Contact
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
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
          Update Contact
        </Button>
      </Box>
    </Container>
  );
};

export default EditContact;
