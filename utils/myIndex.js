import path from "path";

// web Simp.jpg
// web-simp.jpg

export const getFileName = (originalFile) => {
  const fileExt = path.extname(originalFile);

  const file = `${originalFile
    .replace(fileExt, "")
    .toLowerCase()
    .split(" ")
    .join("-")}-${Date.now()}${fileExt}`;

  return file;
};
