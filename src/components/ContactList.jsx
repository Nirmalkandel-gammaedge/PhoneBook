import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, Box } from "@mui/material";

const ContactList = () => {
  const [contacts, setContacts] = useState({});
  const [error, setError] = useState("");

  const fetchContacts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/");
      console.log(response)
      setContacts(response.data.data);
    } catch (err) {
      setError("Failed to fetch contacts");
      console.log("Failed to fetch contacts", err.message);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <Container maxWidth="sm">
      <Typography variant="h3" gutterBottom>Contacts {contacts.length}</Typography>
      {error && <Typography color="error">{error}</Typography>}

      {contacts.length === 0 ? (
        <Typography>No contacts found</Typography>
      ) : (
        Object.values(contacts).map((contact, index) => (
          <Box key={index} style={{  width :"95%", marginBottom: 2, border: '1px solid #ccc', padding: 2, borderRadius: '8px' ,display:"flex",alignItem:"center",justifyContent:"center"}}>
            <Typography variant="h6">{contact.name}</Typography>
            <Typography>Phone: {contact.phoneNumber}</Typography>
          </Box>
        ))
        
      )}
    </Container>
  );
};

export default ContactList;
