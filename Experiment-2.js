const fs = require("fs");

fs.writeFileSync("student.txt", "Aniket Kumar");

console.log("Read:", fs.readFileSync("student.txt", "utf8"));


fs.appendFileSync("student.txt", "\nFSD Workshop-I");

fs.renameSync("student.txt", "student_updated.txt");

fs.unlinkSync("student_updated.txt");

console.log("CRUD operations completed successfully.");
