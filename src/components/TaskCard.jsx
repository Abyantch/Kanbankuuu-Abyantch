import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Box,
  Chip,
  Grid,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { Draggable } from "react-beautiful-dnd";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LinkIcon from "@mui/icons-material/Link";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format, isPast, differenceInDays } from "date-fns";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const colors = ["#ff6961", "#fdd835", "#77dd77", "#84b6f4", "#f06292"];

export default function TaskCard({
  task,
  index,
  handleDelete,
  handleEdit,
  handleToggleComplete,
}) {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });
  const [openCalendar, setOpenCalendar] = useState(false);

  const handleOpenCalendar = () => setOpenCalendar(true);
  const handleCloseCalendar = () => setOpenCalendar(false);

  const handleClickOpenEdit = () => {
    setOpenEditDialog(true);
    setEditedTask({ ...task });
  };

  const handleCloseEdit = () => {
    setOpenEditDialog(false);
  };

  const handleChangeEdit = (event) => {
    const { name, value } = event.target;
    setEditedTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLabelChange = (index, field, value) => {
    setEditedTask((prev) => {
      const updatedLabels = [...prev.labels];
      updatedLabels[index][field] = value;
      return { ...prev, labels: updatedLabels };
    });
  };

  const handleDateChange = (newDate) => {
    setEditedTask((prev) => ({
      ...prev,
      deadline: newDate,
    }));
  };

  const handleSaveEdit = () => {
    handleEdit(task.id, editedTask);
    handleCloseEdit();
  };

  const isTaskOverdue = () => {
    return isPast(new Date(task.deadline)) && !task.completed;
  };

  const getTooltipText = () => {
    if (task.completed) {
      return "Tugas Telah Selesai";
    }
    const today = new Date();
    const deadline = new Date(task.deadline);
    const daysLeft = differenceInDays(deadline, today);
    if (daysLeft < 0) {
      return "Deadline telah lewat";
    }
    return `Sisa ${daysLeft} hari sampai deadline`;
  };

  const handleLinkClick = (link) => {
    window.open(link, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <Draggable draggableId={task.id} index={index}>
        {(provided, snapshot) => (
          <Card
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            sx={{
              mb: 2,
              boxShadow: snapshot.isDragging ? 3 : 1,
              width: 330,
              minHeight: 150,
              position: "relative",
              borderRadius: 2,
              transition:
                "transform 0.3s ease-in-out, opacity 0.3s ease-in-out",
              opacity: snapshot.isDragging ? 0.5 : 1,
              transform: snapshot.isDragging ? "rotate(5deg)" : "rotate(0deg)",
              boxSizing: "border-box",
              backgroundColor: "#fff",
              border: "1px solid #e0e0e0",
              "&:hover": {
                boxShadow: 4,
                outline: "2.5px solid #00BFFF",
                "& .edit-icon, & .delete-icon, & .link-icon": {
                  opacity: 1,
                },
              },
            }}
          >
            <CardContent>
              <Typography
                variant="h7"
                sx={{ fontWeight: "bold", color: "#333" }}
              >
                {task.title}
              </Typography>
              <Typography variant="body2" sx={{ color: "#666" }}>
                {task.description}
              </Typography>
              <Box
                sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: "8px" }}
              >
                {task.labels.map((label, index) => (
                  <Box
                    key={index}
                    sx={{
                      backgroundColor: label.color,
                      color: "#fff",
                      borderRadius: "4px",
                      padding: "4px 8px",
                      fontSize: "0.8em",
                    }}
                  >
                    {label.name}
                  </Box>
                ))}
              </Box>
              <Box
                sx={{
                  mt: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <Tooltip title={getTooltipText()}>
                  <Chip
                    icon={
                      task.completed ? <CheckCircleIcon /> : <AccessTimeIcon />
                    }
                    label={
                      task.completed
                        ? "Selesai"
                        : format(new Date(task.deadline), "dd/MM/yyyy")
                    }
                    sx={{
                      backgroundColor: task.completed
                        ? "#fff"
                        : isTaskOverdue()
                        ? "#fff"
                        : "#fff",

                      fontWeight: "bold",
                    }}
                    onClick={() => handleToggleComplete(task.id)}
                  />
                </Tooltip>
              </Box>
              <IconButton
                aria-label="edit"
                onClick={handleClickOpenEdit}
                className="edit-icon"
                sx={{
                  position: "absolute",
                  bottom: 3,
                  right: 3,
                  color: "#1976d2",
                  opacity: 0,
                  transition: "opacity 0.2s ease-in-out",
                  "&:hover": {
                    opacity: 1,
                  },
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                aria-label="delete"
                onClick={() => handleDelete(task.id)}
                className="delete-icon"
                sx={{
                  position: "absolute",
                  top: 3,
                  right: 3,
                  color: "#d32f2f",
                  opacity: 0,
                  transition: "opacity 0.2s ease-in-out",
                  "&:hover": {
                    opacity: 1,
                  },
                }}
              >
                <ClearIcon />
              </IconButton>
              {task.link && (
                <IconButton
                  aria-label="link"
                  onClick={() => handleLinkClick(task.link)}
                  className="link-icon"
                  sx={{
                    position: "absolute",
                    bottom: 2,
                    right: 30,
                    color: "#00BFFF",
                    opacity: 0,
                    transition: "opacity 0.2s ease-in-out",
                    "&:hover": {
                      opacity: 1,
                    },
                  }}
                >
                  <LinkIcon />
                </IconButton>
              )}
            </CardContent>
          </Card>
        )}
      </Draggable>

      {/* Edit Dialog */}
      <Dialog open={openEditDialog} onClose={handleCloseEdit}>
        <DialogTitle>Edit Tugas</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            sx={{ mt: 1 }}
            label="Judul"
            name="title"
            variant="outlined"
            value={editedTask.title}
            onChange={handleChangeEdit}
          />
          <TextField
            fullWidth
            multiline
            rows={3}
            sx={{ height: 100, mt: 2 }}
            label="Deskripsi"
            name="description"
            variant="outlined"
            value={editedTask.description}
            onChange={handleChangeEdit}
          />
          <TextField
            fullWidth
            sx={{ mt: 2 }}
            label="Link"
            name="link"
            variant="outlined"
            value={editedTask.link}
            onChange={handleChangeEdit}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Deadline"
              sx={{ mt: 2 }}
              value={editedTask.deadline}
              onChange={handleDateChange}
              renderInput={(params) => (
                <TextField {...params} margin="normal" fullWidth />
              )}
            />
          </LocalizationProvider>
          {editedTask.labels.map((label, index) => (
            <Grid container spacing={1} key={index} alignItems="center">
              <Grid item xs={7}>
                <TextField
                  margin="normal"
                  fullWidth
                  label="Nama Label"
                  name={`labelName-${index}`}
                  value={label.name}
                  onChange={(e) =>
                    handleLabelChange(index, "name", e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  select
                  fullWidth
                  margin="normal"
                  label="Warna Label"
                  name={`labelColor-${index}`}
                  value={label.color}
                  onChange={(e) =>
                    handleLabelChange(index, "color", e.target.value)
                  }
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

          <Button onClick={handleSaveEdit} variant="contained" sx={{ mt: 2 }}>
            Simpan Perubahan
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
