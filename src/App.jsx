import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState } from "react";
import AppAppBar from "./components/AppAppBar";
import KanbanBoard from "./components/KanbanBoard";
import Footer from "./components/Footer.jsx";
import Greeting from "./components/Greeting.jsx";
import ProgressCircle from "./components/ProgressCircle.jsx";
import getLPTheme from "./getLPTheme";

export default function LandingPage() {
  const [mode, setMode] = React.useState("light");
  const [showCustomTheme] = React.useState(true);
  const LPtheme = createTheme(getLPTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });

  const [tasks, setTasks] = useState({
    Rencana: [
      {
        id: Date.now().toString(),
        title: "Merencanakan Sprint Selanjutnya",
        description:
          "Buat jadwal sprint, alokasikan tugas, dan tetapkan target.",
        deadline: "2024-07-15",
        labels: [{ name: "Perencanaan", color: "#fdd835" }],
      },
      {
        id: Date.now().toString() + 1,
        title: "Evaluasi Kinerja Tim",
        description:
          "Kumpulkan feedback dan lakukan penilaian kinerja anggota tim.",
        deadline: "2024-07-22",
        labels: [{ name: "Manajemen Tim", color: "#84b6f4" }],
      },
    ],
    "Sedang Dikerjakan": [
      {
        id: Date.now().toString() + 2,
        title: "Rapat Progres Proyek",
        description: "Diskusikan kemajuan proyek, hambatan, dan solusi.",
        deadline: "2024-07-02",
        labels: [{ name: "Rapat", color: "#ff6961" }],
      },
      {
        id: Date.now().toString() + 3,
        title: "Koordinasi dengan Klien",
        description:
          "Jadwalkan pertemuan dengan klien untuk presentasi dan diskusi.",
        deadline: "2024-07-05",
        labels: [{ name: "Komunikasi", color: "#f06292" }],
      },
    ],
    Selesai: [
      {
        id: Date.now().toString() + 4,
        title: "Penyusunan Laporan Mingguan",
        description:
          "Buat laporan tentang perkembangan proyek dan kirimkan ke manajemen.",
        deadline: "2024-06-28",
        labels: [{ name: "Pelaporan", color: "#77dd77" }],
        completed: true,
      },
    ],
  });

  const toggleColorMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
      <CssBaseline />
      <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
      <Box
        sx={{
          bgcolor: "background.default",
          overflow: "hidden",
          overflowY: "hidden  ",
          minHeight: "100vh",
        }}
      >
        <Divider />
        <Greeting />
        <ProgressCircle tasks={tasks} />
        <KanbanBoard tasks={tasks} setTasks={setTasks} />
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
