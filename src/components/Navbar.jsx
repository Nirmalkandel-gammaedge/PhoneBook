import React, { useState } from "react";
import {
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Button,
  Box,
} from "@mui/material";
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#f1f3f4",
  marginLeft: theme.spacing(2),
  width: "100%",
  maxWidth: "300px",
  display: "flex",
  alignItems: "center",
  padding: "4px 12px",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "black",
  cursor: "pointer",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  flex: 1,
  color: "black",
}));

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [list, setList] = useState({});
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    try {
      const response = await axios.get(
        `http://localhost:3000/find/${searchTerm}`
      );
      setList(response.data.data);
      console.log("search data ", response.data.data);
    } catch (error) {
      console.error("Search failed", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <Box style={{ marginTop: "0px", padding: "10px" }}>
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <Box style={{ display: "flex", gap: "2px", alignItems: "center" }}>
          <AccountCircleIcon />
          <Typography
            variant="h6"
            component="div"
            style={{ cursor: "pointer" }}
          >
            Phonebook
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <Search>
            <SearchIconWrapper onClick={handleSearch}>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
          </Search>
        </form>

        <Box>
          <IconButton color="inherit">
            <FilterIcon />
          </IconButton>
          <Button
            variant="contained"
            color="success"
            startIcon={<AddIcon />}
            onClick={() => navigate("/add")}
            style={{ ml: 2 }}
          >
            Create Contact
          </Button>
        </Box>
      </Toolbar>
    </Box>
  );
};

export default Navbar;
