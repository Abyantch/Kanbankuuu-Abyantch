import React from "react";
import { TextField, Grid, Box, MenuItem } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

export default function TaskForm({
  newTask,
  handleChange,
  handleLabelChange,
  handleDateChange,
  colors,
}) {
  return (
    <form>
      <TextField
        label="Judul"
        name="title"
        value={newTask.title}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Deskripsi"
        name="description"
        value={newTask.description}
        onChange={handleChange}
        fullWidth
        margin="normal"
        multiline
        rows={3}
        sx={{ height: 100 }}
      />
      <TextField
        label="Link"
        name="link"
        value={newTask.link}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Deadline"
          value={newTask.deadline}
          onChange={handleDateChange}
          renderInput={(params) => (
            <TextField {...params} fullWidth margin="normal" />
          )}
        />
      </LocalizationProvider>
      {newTask.labels.map((label, index) => (
        <Grid container spacing={1} key={index} alignItems="center">
          <Grid item xs={7}>
            <TextField
              label="Label"
              value={label.name}
              onChange={(e) => handleLabelChange(index, "name", e.target.value)}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              select
              label="Warna"
              value={label.color}
              onChange={(e) =>
                handleLabelChange(index, "color", e.target.value)
              }
              fullWidth
              margin="normal"
            >
              {colors.map((color, idx) => (
                <MenuItem key={idx} value={color}>
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      backgroundColor: color,
                      display: "inline-block",
                      marginRight: 1,
                    }}
                  />
                  {color}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      ))}
    </form>
  );
}
