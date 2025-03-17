import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function Profile() {
  return (
    <Card style={{ maxWidth: 500, display: "flex" }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          name
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          89r30034234
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          label
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Avatarl <link rel="stylesheet" href="" />
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="success">
          Edit
        </Button>
        <Button variant="outlined" color="primary">
          Update
        </Button>{" "}
        <Button variant="outlined" color="error">
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
