import { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import "../style/Greeting.css";

function Greeting() {
  const [greeting, setGreeting] = useState("Selamat Pagi 👋");
  const greetings = [
    "Kanbankuu siap membantumu🚀",
    "Wujudkan idemu dengan Kanbankuu!",
    "Kelola proyekmu dengan mudah bersama Kanbankuu! ",
    "Kanbankuu, solusi manajemen proyek yang intuitif.",
  ];
  const [currentGreetingIndex, setCurrentGreetingIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGreetingIndex(
        (prevIndex) => (prevIndex + 1) % greetings.length
      );
    }, 3000); // Ganti teks setiap 5 detik

    return () => clearInterval(interval);
  }, [greetings.length]);

  useEffect(() => {
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 5 && hour < 12) {
      setGreeting("Selamat Pagi 👋");
    } else if (hour >= 12 && hour < 18) {
      setGreeting("Selamat Siang 👋");
    } else {
      setGreeting("Selamat Sore 👋");
    }
  }, []);
  return (
    <Grid
      container
      spacing={0.5}
      alignItems="center"
      sx={{
        marginTop: "100px",
        marginLeft: "55px",
        position: "flex",
        justifyContent: "center",
        textAlign: "start",
        maxWidth: "500px",
      }}
    >
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          {greeting}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography
          variant="body1"
          className="greeting-content"
          sx={{ fontStyle: "italic", fontWeight: 600 }}
        >
          {greetings[currentGreetingIndex]}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default Greeting;
