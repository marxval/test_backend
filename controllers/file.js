import path from "path";
import XLSX from "xlsx";
import User from "../models/user.js";

export const uploadToDb = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload an excel file!");
    }

    const filePath = path.resolve() + "/resources/" + req.file.filename;

    const workbook = XLSX.readFile(filePath, {
      cellText: false,
      cellDates: true,
    });
    const worksheet = workbook.Sheets["Sheet1"];
    const jsonSheet = XLSX.utils.sheet_to_json(worksheet, {
      header: 1,
      defval: "",
      blankrows: true,
      raw: false,
      dateNF: 'm"/"d"/"yyyy h:mm',
    });

    const users = {};

    for (let ix = 1; ix < jsonSheet.length; ix++) {
      const row = jsonSheet[ix];
      console.log(row);
      const userId = row[0];

      // Create full date for punch in/out
      const dateDMY = row[2].split(" ")[0];
      const punchIn = row[3].split(" ")[1];
      const punchOut = row[4].split(" ")[1];

      const date = new Date(row[2]);
      const punchInFullDate = new Date(`${dateDMY} ${punchIn}`);
      const punchOutFullDate = new Date(`${dateDMY} ${punchOut}`);

      const record = {
        date: date,
        punchIn: punchInFullDate,
        punchOut: punchOutFullDate,
      };

      if (!users[userId]) {
        users[userId] = {
          id: userId,
          username: row[1],
          records: [record],
        };
      } else {
        users[userId].records.push(record);
      }
    }

    try {
      await User.deleteMany();
      await User.insertMany(Object.values(users));
    } catch (error) {
      res.status(500).send("Error");
    }

    res.status(200).send({ data: Object.values(users) });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Could not upload the file: " + req.file.originalname,
    });
  }
};
