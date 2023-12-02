import * as fs from "fs";

fs.readFile("testStrings.txt", "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(data);
    // const textFileInput = data.split("\n");
    // for (const line of textFileInput) {
    //     let blueCount = 0;
    //     let redCount = 0;
    //     let greenCount = 0;
    // }
});

