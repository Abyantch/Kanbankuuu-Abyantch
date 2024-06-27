import { useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  TextField,
  Menu,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";
import TaskForm from "./TaskForm";
import CalendarPopup from "./CalendarPopup";

const colors = ["#ff6961", "#fdd835", "#77dd77", "#00b0ff", "#f06292"];

export default function KanbanBoard({ tasks, setTasks }) {
  const [openTaskDialog, setOpenTaskDialog] = useState(false);
  const [openBoardDialog, setOpenBoardDialog] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    deadline: null,
    labels: [{ name: "", color: "" }],
    link: "",
  });

  const [newBoardName, setNewBoardName] = useState("");

  const [anchorEl, setAnchorEl] = useState(null);

  const [calendarOpen, setCalendarOpen] = useState(false);

  const handleOpenCalendar = () => {
    setCalendarOpen(true);
  };

  const handleCloseCalendar = () => {
    setCalendarOpen(false);
  };

  const handleEventClick = (info) => {
    const taskTitle = info.event.title;
  };

  const handleClickAdd = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleClickOpenTaskDialog = () => {
    setOpenTaskDialog(true);
    handleCloseMenu();
  };

  const handleClickOpenBoardDialog = () => {
    setOpenBoardDialog(true);
    handleCloseMenu();
  };

  const handleCloseTaskDialog = () => {
    setOpenTaskDialog(false);
  };

  const handleCloseBoardDialog = () => {
    setOpenBoardDialog(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleBoardChange = (event) => {
    const { value } = event.target;
    setNewBoardName(value);
  };

  const handleLabelChange = (index, field, value) => {
    setNewTask((prevTask) => {
      const updatedLabels = [...prevTask.labels];
      updatedLabels[index][field] = value;
      return { ...prevTask, labels: updatedLabels };
    });
  };

  const handleDateChange = (newDate) => {
    setNewTask((prevTask) => ({
      ...prevTask,
      deadline: newDate,
    }));
  };

  const handleAddTask = (event) => {
    event.preventDefault();
    setTasks((prev) => ({
      ...prev,
      Rencana: [
        ...prev["Rencana"],
        {
          id: Date.now().toString(),
          ...newTask,
          completed: false,
        },
      ],
    }));
    setNewTask({
      title: "",
      description: "",
      deadline: null,
      labels: [{ name: "", color: "" }],
      link: "", // Reset link
    });
    handleCloseTaskDialog();
  };

  const handleAddBoard = () => {
    if (newBoardName.trim() !== "") {
      setTasks((prevTasks) => ({
        ...prevTasks,
        [newBoardName]: [],
      }));
      setNewBoardName("");
      handleCloseBoardDialog();
    }
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prev) => {
      const newTasks = { ...prev };
      for (const column in newTasks) {
        newTasks[column] = newTasks[column].filter(
          (task) => task.id !== taskId
        );
      }
      return newTasks;
    });
  };

  const handleEditTask = (taskId, updatedTask) => {
    setTasks((prev) => ({
      ...prev,
      [Object.keys(prev).find((key) =>
        prev[key].some((task) => task.id === taskId)
      )]: prev[
        Object.keys(prev).find((key) =>
          prev[key].some((task) => task.id === taskId)
        )
      ].map((task) => (task.id === taskId ? updatedTask : task)),
    }));
  };

  const handleToggleComplete = (taskId) => {
    setTasks((prev) => {
      const newTasks = { ...prev };
      for (const column in newTasks) {
        newTasks[column] = newTasks[column].map((task) =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        );
      }
      return newTasks;
    });
  };

  const onDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceColumn = Array.from(tasks[source.droppableId]);
    const destColumn = Array.from(tasks[destination.droppableId]);
    const [removed] = sourceColumn.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceColumn.splice(destination.index, 0, removed);
      setTasks((prev) => ({
        ...prev,
        [source.droppableId]: sourceColumn,
      }));
    } else {
      destColumn.splice(destination.index, 0, removed);
      setTasks((prev) => ({
        ...prev,
        [source.droppableId]: sourceColumn,
        [destination.droppableId]: destColumn,
      }));
    }
  };

  return (
    <Container
      sx={{
        pt: 6,
        pb: 4,
        mt: 2,
        mx: { xs: 0, md: 4 },
        justifyContent: "center",
        alignItems: "center",
        minWidth: "300px",
        maxWidth: "100%",
      }}
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <Grid container spacing={3}>
          {Object.keys(tasks).map((columnId) => (
            <Grid item xs={12} sm={6} md={4} lg={4} key={columnId}>
              <Typography
                variant="h6"
                sx={{
                  mb: 2,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {columnId.replace("-", " ")}
              </Typography>
              <Droppable droppableId={columnId}>
                {(provided) => (
                  <Box
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    sx={{
                      boxShadow: 1,
                      backgroundColor: "#F2F2F3",
                      padding: 2,
                      borderRadius: 1,
                      wordWrap: "break-word",
                      backgroundClip: "border-box",
                      minHeight: "300px",
                      maxHeight: "450px",
                      minWidth: "260px",
                      maxWidth: "100%",
                      border: "1px solid rgba(0, 0, 0, 0.125)",
                      transition: "transform 0.3s ease-in-out",
                      "&:hover": {
                        outline: "2.5px solid #00BFFF",
                      },
                      overflowY: "auto",
                      scrollbarWidth: "thin",
                      scrollbarColor: "rgb(242, 242, 243) transparent",
                      "&::-webkit-scrollbar": {
                        width: "1px",
                      },
                      "&::-webkit-scrollbar-track": {
                        background: "transparent",
                      },
                      "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "rgb(242, 242, 243)",
                        borderRadius: "10px",
                      },
                    }}
                  >
                    {tasks[columnId].map((task, index) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        index={index}
                        handleDelete={handleDeleteTask}
                        handleEdit={handleEditTask}
                        handleToggleComplete={handleToggleComplete}
                      />
                    ))}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            </Grid>
          ))}
        </Grid>
      </DragDropContext>
      <Button onClick={handleOpenCalendar}>Open Calendar</Button>{" "}
      {/* Add a trigger button */}
      <CalendarPopup
        tasks={tasks}
        open={calendarOpen}
        onClose={handleCloseCalendar}
      />{" "}
      <Box
        sx={{
          position: "fixed",
          bottom: 50,
          right: { xs: 20, md: 50 },
        }}
      >
        <Fab
          color="primary"
          aria-label="add"
          onClick={handleClickAdd}
          sx={{ mr: 3 }}
        >
          <AddIcon />
        </Fab>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          getContentAnchorEl={null}
          style={{
            marginTop: "-10px",
            marginLeft: "-70px",
          }}
        >
          <MenuItem onClick={handleClickOpenTaskDialog}>Tambah Tugas</MenuItem>
          <MenuItem onClick={handleClickOpenBoardDialog}>Tambah Board</MenuItem>
        </Menu>
      </Box>
      <Dialog open={openTaskDialog} onClose={handleCloseTaskDialog}>
        <DialogTitle>Tambah Tugas</DialogTitle>
        <DialogContent>
          <TaskForm
            newTask={newTask}
            handleChange={handleChange}
            handleLabelChange={handleLabelChange}
            handleDateChange={handleDateChange}
            colors={colors}
          />
          <Button
            onClick={handleAddTask}
            variant="contained"
            color="primary"
            fullWidth
          >
            Tambah
          </Button>
        </DialogContent>
      </Dialog>
      <Dialog open={openBoardDialog} onClose={handleCloseBoardDialog}>
        <DialogTitle>Tambah Board</DialogTitle>
        <DialogContent>
          <TextField
            value={newBoardName}
            onChange={handleBoardChange}
            name="newBoard"
            label="Nama Board"
            fullWidth
            margin="normal"
          />
          <Button
            onClick={handleAddBoard}
            variant="contained"
            color="primary"
            fullWidth
          >
            Tambah
          </Button>
        </DialogContent>
      </Dialog>
    </Container>
  );
}
