const express = require("express");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 3000;

// Раздаём собранные файлы фронта
app.use(express.static(path.join(__dirname, "client/dist")));

// При любом другом запросе возвращаем index.html (для SPA)
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client/dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
