import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

export default function Profile() {
  return (
    <Card style={{ maxWidth: 500,marginLeft:"400px",border:"1px solid black", display: "flex",flexDirection: "column", alignItems: "center", gap: 2,marginTop:"30px" }}>
      <CardContent style={{ textAlign: "center" }}>
        <Typography gutterBottom variant="h4" component="div">s
          Name
        </Typography>
        <Typography gutterBottom variant="h6" component="div" color="text.secondary">
          89r30034234
        </Typography>
        <Typography gutterBottom variant="h6" component="div" color="text.secondary">
          Label
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Avatar
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
}