import * as fs from "fs";

// console.log("Please input the amount of cubes of each colour there are in the bag.")
// const redMax = prompt("Red cubes: ");
// const greenMax = prompt("Green cubes: ")
// const blueMax = prompt("Blue cubes: ")
/// The above code is what I would use for getting an input, but it wasn't working for my debug console and I don't really need to implement it to solve the problem.
const redMax = 12;
const greenMax = 13;
const blueMax = 14;
// Create an array of the valid games by their number
const validGames: number[] = [];

fs.readFile("./Day2/testStrings.txt", "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const textFileInput = data.split("\n");
    let validGameSum = 0;
    for (const line of textFileInput) {
        // Start colour counts at 0
        let redCount = 0;
        let greenCount = 0;
        let blueCount = 0;
        // Splits the 
        const splitLine = line.split(": ");
        // Stores the current game number
        const currentGameNum = Number(splitLine[0].replace(/Game| /g, ""));
        // Stores the rest of the string
        const noGameNum = splitLine[1];
        // Removes spaces from the string and replaces the ';' with a ',' to make the string consistent
        const noSpaces = noGameNum.replace(/ /g, "");
        const listedColourNum = noSpaces.replace(/;/g, ",");
        const numsAndColours = listedColourNum.split(",");
        for(let i = 0; i < numsAndColours.length; i++){
            if(numsAndColours[i].includes("red")){
                const redNum = numsAndColours[i].replace("red", "");
                redCount += Number(redNum);
            }
            else if(numsAndColours[i].includes("green")){
                const greenNum = numsAndColours[i].replace("green", "");
                greenCount += Number(greenNum);
            }
            else if(numsAndColours[i].includes("blue")){
                const blueNum = numsAndColours[i].replace("blue", "");
                blueCount += Number(blueNum);
            }
        }
        if(redCount <= redMax){
            if(greenCount <= greenMax){
                if(blueCount <= blueMax){
                    validGames.push(currentGameNum);
                    validGameSum += currentGameNum;
                }
            }
        }
        console.log("-=Game " + currentGameNum + "=-" + "\nRed: " + redCount + "\nGreen: " + greenCount + "\nBlue: " + blueCount);
    }
    console.log("The sum of all valid games is: " + validGameSum);
});