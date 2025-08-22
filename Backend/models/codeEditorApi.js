import express from "express";
import fs from "fs";
import path from "path";
import { spawn } from "child_process";

const router = express.Router();

router.post("/run", async (req, res) => {
  const { language, code, input } = req.body;

  if (!language || !code) {
    return res.json({ ok: false, stderr: "Missing language or code" });
  }

  const folder = path.join(process.cwd(), "temp");
  if (!fs.existsSync(folder)) fs.mkdirSync(folder);

  let filePath = "";
  let runCommand = "";
  let args = [];

  try {
    switch (language.toLowerCase()) {
      case "javascript":
        filePath = path.join(folder, "main.js");
        fs.writeFileSync(filePath, code);
        runCommand = "node";
        args = [filePath];
        break;

      case "python":
        filePath = path.join(folder, "main.py");
        fs.writeFileSync(filePath, code);
        runCommand = "python";
        args = [filePath];
        break;

      case "cpp":
        filePath = path.join(folder, "main.cpp");
        fs.writeFileSync(filePath, code);
        // compile first
        const exePath = path.join(folder, "a.out");
        const compile = spawn("g++", [filePath, "-o", exePath]);
        compile.on("close", (codeCompile) => {
          if (codeCompile !== 0) {
            return res.json({ ok: false, stderr: "C++ compilation failed" });
          }
          runCommand = exePath;
          args = [];
          runProgram();
        });
        return; // important, wait for compile

      case "java":
        filePath = path.join(folder, "Main.java");
        fs.writeFileSync(filePath, code);
        // compile first
        const javac = spawn("javac", [filePath]);
        javac.on("close", (codeCompile) => {
          if (codeCompile !== 0) {
            return res.json({ ok: false, stderr: "Java compilation failed" });
          }
          runCommand = "java";
          args = ["-cp", folder, "Main"];
          runProgram();
        });
        return;

      default:
        return res.json({ ok: false, stderr: "Unsupported language" });
    }

    // JS/Python
    if (language.toLowerCase() === "javascript" || language.toLowerCase() === "python") {
      runProgram();
    }

    function runProgram() {
      const child = spawn(runCommand, args);

      let stdout = "";
      let stderr = "";

      child.stdout.on("data", (data) => {
        stdout += data.toString();
      });

      child.stderr.on("data", (data) => {
        stderr += data.toString();
      });

      child.on("close", () => {
        res.json({ ok: true, stdout: stdout || "", stderr: stderr || "" });
      });

      if (input) {
        child.stdin.write(input);
      }
      child.stdin.end();
    }
  } catch (err) {
    res.json({ ok: false, stderr: err.message });
  }
});

export default router;
