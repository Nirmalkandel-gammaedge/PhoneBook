import React, { useState } from "react";
import { AppBar, Toolbar, Typography, IconButton, InputBase, Button, Box } from "@mui/material";
import { Search as SearchIcon, FilterList as FilterIcon, Add as AddIcon } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#f1f3f4",
  marginLeft: 0,
  width: "100%",
  display: "flex",
  alignItems: "center",
  padding: "4px 10px",
  [theme.breakpoints.up("sm")]: {
    width: "250px",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "gray",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  flex: 1,
  color: "inherit",
}));

const Navbar = ({ onSearch, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/find/${searchTerm}`);
      onSearch(response.data);
    } catch (error) {
      console.error("Search failed", error);
    }
  };

  const handleFilter = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/filter?label=${searchTerm}`);
      onFilter(response.data);
    } catch (error) {
      console.error("Filter failed", error);
    }
  };

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar style={{ display: "flex", justifyContent: "space-between" ,width:"100%"}}>
        {/* Logo/Title */}
        <Typography variant="h5" component="div">
          📘 Phonebook
        </Typography>

        {/* Search Bar */}
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Search>

        {/* Right Side Buttons */}
        <Box>
          <IconButton color="inherit" onClick={handleFilter}>
            <FilterIcon />
          </IconButton>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
          
            onClick={() => navigate("/add-contact")}
          >
            Create Contact
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
