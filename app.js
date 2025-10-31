import express from "express";
import htmlToDocx from "html-to-docx";

const app = express();
app.use(express.json({ urlencoded: true }));

app.post("/convert", async (req, res) => {
  try {
    const data = req.body;
    const fileBuffer = await htmlToDocx(data.html);
    const filename = req.body.filename;

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${filename}.docx`,
    );
    res.send(fileBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error generating DOCX");
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
