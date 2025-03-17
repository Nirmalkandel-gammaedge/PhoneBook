import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { useNavigate } from "react-router-dom"; 

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchContacts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/");
      console.log(response);
      setContacts(response.data.data); 
    } catch (err) {
      setError("Failed to fetch contacts");
      console.log("Failed to fetch contacts", err.message);
    }
  };

  const deleteContact = async (name) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/delete/${name}`
      );
      console.log(response.data);
      fetchContacts();
    } catch (err) {
      setError("Failed to delete contact");
      console.log("Failed to delete contact", err.message);
    }
  };
 
  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <Container style={{ width: "80%", marginTop: "20px" }}>


<Box
          
            style={{
              width: "100%",
              marginBottom: 10,
              padding: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                width: "60%",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h6">Name</Typography>
              <Typography>phoneNumber</Typography>
            </Box>
            
          </Box>
      <Typography style={{marginLeft:"5px"}} gutterBottom>
        Contacts ({Object.keys(contacts).length})
      </Typography>

      {error && <Typography color="error">{error}</Typography>}

      {Object.keys(contacts).length === 0 ? (
        <Typography>No contacts found</Typography>
      ) : (
        Object.entries(contacts).map(([key, contact]) => (
          <Box
            key={key}
            
            style={{
              width: "100%",
              Height: "3%",
              marginBottom: 16,
              border: "1px solid #ccc",
              padding: 16,
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                width: "60%",
                justifyContent: "space-between",
              }}
            >
                <Box style={{display:"flex" ,alignItems:"center",justifyContent:"center",gap:"3px"}}><AccountCircleIcon/>
                <Typography variant="h6" onClick={()=>navigate("/profile")}>{contact.name}</Typography></Box>
              <Typography>{contact.phoneNumber}</Typography>
            </Box>
            <Box style={{ display: "flex", gap: "10px" }}>
              {" "}
              <BookmarkBorderIcon />
              <EditIcon onClick={() => navigate(`/edit/${contact.name}`)} />

               <DeleteIcon onClick={() => deleteContact(contact.name)} />
            </Box>
          </Box>
        ))
      )}
    </Container>
  );
};

export default ContactList;
