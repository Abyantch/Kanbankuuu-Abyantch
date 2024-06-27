import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

function ProgressCircle({ tasks }) {
  const theme = useTheme();
  const calculateProgress = () => {
    const totalTasks = Object.values(tasks).flat().length;
    const completedTasks = Object.values(tasks)
      .flat()
      .filter((task) => task.completed).length;
    return totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  };

  const progress = calculateProgress();
  let message = "Kerja, kerja, kerja!";
  if (progress < 100 && progress > 0) {
    message = "Sebentar lagi selesai, ayo semangat!";
  } else if (progress === 100) {
    message = "Tidak ada tugas ni, healing yuk!";
  }

  return (
    <Box
      sx={{
        right: { xs: 20, md: 50 },
        p: 2,
        borderRadius: 2,
        boxShadow: 1,
        backgroundColor:
          theme.palette.mode === "light"
            ? "hsla(220, 60%, 99%, 0.6)"
            : "hsla(220, 0%, 0%, 0.7)",
        boxShadow:
          theme.palette.mode === "light"
            ? "0 1px 2px hsla(210, 0%, 0%, 0.05), 0 2px 12px hsla(210, 100%, 80%, 0.5)"
            : "0 1px 2px hsla(210, 0%, 0%, 0.5), 0 2px 12px hsla(210, 100%, 25%, 0.3)",
        display: "fixed",
        width: "380px",
        flexDirection: "column",
        alignItems: "center",
        marginLeft: { xs: "18px", md: "600px", lg: "820px" },
        marginTop: { xs: "18px", md: -11 },
      }}
    >
      <Box sx={{ position: "relative", mr: 2 }}>
        <Box
          sx={{
            position: "absolute",
            top: "-29%",
            left: "440%",
            transform: "translate(-50%, -50%)",
            width: 20,
            height: 20,
            borderRadius: "50%",
            bgcolor: "#84b6f4",
            animation: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
            "@keyframes ping": {
              "0%": {
                transform: "scale(1)",
                opacity: 1,
              },
              "75%, 100%": {
                transform: "scale(2)",
                opacity: 0,
              },
            },
          }}
        />
        <CircularProgress
          variant="determinate"
          value={progress}
          size={70}
          sx={{ ml: 1 }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography variant="body1" sx={{ mt: 1, fontWeight: 600 }}>
          {Math.round(calculateProgress())}% Complete
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, fontStyle: "italic" }}>
          {message}
        </Typography>
      </Box>
    </Box>
  );
}

export default ProgressCircle;
