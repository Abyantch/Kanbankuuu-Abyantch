import { useState, useEffect } from "react";
import { TextField } from "@mui/material";

export default function TaskSearch({ onSearchChange }) {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    onSearchChange(searchTerm); 
  }, [searchTerm, onSearchChange]); 

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <TextField
      label="Search Tasks"
      variant="outlined"
      fullWidth
      margin="normal"
      value={searchTerm}
      onChange={handleSearchChange}
    />
  );
}
