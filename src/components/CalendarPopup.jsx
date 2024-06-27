import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import Calendar from "./Calendar";

function CalendarPopup({ tasks, open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Calendar</DialogTitle>
      <DialogContent>
        <Calendar tasks={tasks} onEventClick={onClose} /> {/* Close on event click */}
      </DialogContent>
    </Dialog>
  );
}

export default CalendarPopup;
