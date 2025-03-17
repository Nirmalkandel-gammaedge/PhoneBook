import React from "react";
import { useLocation } from "react-router-dom";
import { Card, CardActions, CardContent, Button, Typography, Stack } from "@mui/material";

const Profile = () => {
  const location = useLocation();
  const { contact } = location.state || {};

  if (!contact) {
    return <Typography>No contact data available.</Typography>;
  }

  return (
    <Card 
      style={{ 
        maxWidth: 500, 
        margin: "30px auto", 
        border: "1px solid black", 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        padding: "20px"
      }}
    >
      <CardContent style={{ textAlign: "center" }}>
        <Typography gutterBottom variant="h4">
          {contact.name}
        </Typography>
        <Typography gutterBottom variant="h6" color="text.secondary">
          {contact.phoneNumber}
        </Typography>
      </CardContent>
      <CardActions>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" color="success">
            Edit
          </Button>
          <Button variant="outlined" color="primary">
            Update
          </Button>
          <Button variant="outlined" color="error">
            Delete
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default Profile;
