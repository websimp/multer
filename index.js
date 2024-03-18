import express from "express";
import multer from "multer";
import { getFileName } from "./utils/myIndex.js";

const app = express();
const PORT = 9000;

const myStorage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "./upload");
  },
  filename: (req, file, callBack) => {
    const fileName = getFileName(file.originalname);
    callBack(null, fileName);
  },
});

const upload = multer({
  storage: myStorage,
  limits: { fileSize: 5000000 },
  fileFilter: (req, file, callBack) => {
    const fileExt = file.mimetype;

    if (fileExt === "image/jpeg" || fileExt === "image/png") {
      callBack(null, true);
    } else {
      console.log("Invalid File Type");
    }
  },
});

// routes
app.get("/", (req, res) => {
  res.json({
    message: "Welcome",
  });
});

// <input type="file" name="image">
app.post("/upload", upload.single("image"), (req, res, next) => {
  // Main work here...
  try {
    res.json({
      message: "File Uploaded",
    });
  } catch (err) {
    res.json({
      error: "Something went wrong!",
    });
  }
});

app.listen(PORT, () => {
  console.log("Server runinng...");
});
