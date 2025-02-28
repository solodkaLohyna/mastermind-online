'use client'

//UI Components
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner";
import { Toaster } from "sonner";
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

//Icons
import { CircleCheckBig, Delete, Play } from "lucide-react";

//Hooks & React
import { JSX, useEffect, useState } from "react";
import { generateColor } from "@/src/modules/main/components/generateColor";

//Components
import { ColorButtons } from "@/src/modules/main/components/ColorButtons";
import { PegsContainer } from "@/src/modules/main/components/PegsContainer";
import { Peg } from "@/src/modules/main/components/Peg";
import { GameRules } from "@/src/modules/main/components/GameRules";

export default function Home() {
  const [value, setValue] = useState(4);
  const [isStarted, setIsStarted] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const [currentPeg, setCurrentPeg] = useState(0);
  const [currentRow, setCurrentRow] = useState(0);
  const [rows, setRows] = useState<JSX.Element[][]>(
    Array.from({ length: 10 }, () => Array(value).fill(<Peg size="w-12 h-12" content="transparent" />))
  );
  const [rowsColors, setRowsColors] = useState<string[][]>(
    Array.from({ length: 10 }, () => Array(value).fill("transparent"))
  );
  const [hints, setHints] = useState<JSX.Element[][]>(
    Array.from({ length: 10 }, () => Array(value).fill(<Peg size="w-6 h-6" content="transparent" />))
  );

  const [pegsCombination, setPegsCombination] = useState<string[]>([]);

  useEffect(() => {
    generatePegs();
    setIsChecked(true);
  }, []);

  const handleColorChange = (color: string) => {
    setRows((prevRows) => {
      return prevRows.map((row, rowIndex) =>
        rowIndex === currentRow
          ? row.map((peg, pegIndex) =>
            pegIndex === currentPeg ? <Peg size="w-12 h-12" key={pegIndex} content={color} /> : peg
          )
          : row
      );
    });

    setRowsColors((prevRowsColors) =>
      prevRowsColors.map((rowColors, rowIndex) =>
        rowIndex === currentRow
          ? [...rowColors.slice(0, currentPeg), color, ...rowColors.slice(currentPeg + 1)]
          : rowColors
      )
    );

    if (currentPeg < value) {
      setCurrentPeg(currentPeg + 1);
    } else {
      setCurrentPeg(0);
    }
  };

  const handlePegDeleting = () => {
    const pegToDelete = currentPeg - 1;

    setRows((prevRows) => {
      return prevRows.map((row, rowIndex) =>
        rowIndex === currentRow
          ? row.map((peg, pegIndex) =>
            pegIndex === pegToDelete ? <Peg size="w-12 h-12" key={pegIndex} content="transparent" /> : peg
          )
          : row
      );
    });

    setRowsColors((prevRowsColors) => {
      const newRowsColors = prevRowsColors.map((rowColors, rowIndex) =>
        rowIndex === currentRow
          ? rowColors.map((color, colorIndex) =>
            colorIndex === pegToDelete ? "transparent" : color
          )
          : rowColors
      );

      return newRowsColors;
    });

    setCurrentPeg(pegToDelete);
  };

  const isRowFilled = rowsColors[currentRow].every((color) => color !== "transparent");

  const mapRows = rows.map((pegs, rowIndex) => {
    return (
      <div key={rowIndex} className="flex items-center space-x-4">
        {pegs.map((peg, pegIndex) => {
          return <div key={pegIndex}>{peg} </div>;
        })}
        <Button
          key={rowIndex}
          className={currentRow === rowIndex && isStarted ? "visible" : "invisible"}
          size="icon"
          variant="outline"
          onClick={handlePegDeleting}
          disabled={currentPeg == 0}
        >
          <Delete size={48} strokeWidth={1.3} />
        </Button>
        <div key={currentPeg} className="flex flex-wrap w-max">
          <div className="flex flex-wrap gap-1 w-2/3">
            {hints[rowIndex]}
          </div>
        </div>
      </div >
    );
  });

  const generatePegs = () => {
    const colorsArray = [];
    for (let i = 0; i < value; i++) {
      const randomColor = generateColor();
      colorsArray.push(randomColor);
    }

    console.log(colorsArray);
    return colorsArray;
  };

  const handleClick = () => {
    setIsStarted(true);
    setIsChecked(false);
    setPegsCombination(generatePegs());
  };

  const handleChange = (value: string) => {
    const newValue = Number(value);

    setValue(() => newValue);
    clearEveryPeg(newValue);
  }

  const handleCheck = () => {
    if (!isRowFilled) {
      toast("Fill every peg");
      return;
    }

    if (currentRow === 9) {
      toast.error("You lost!");

      setIsStarted(false);
      setIsChecked(true);
      return;

    }

    const currentColors = rowsColors[currentRow];

    if (currentColors.toString() === pegsCombination.toString()) {
      toast.success("You won!");

      setIsStarted(false);
      setIsChecked(true);

      return;
    }

    console.log("Current combo: " + currentColors);

    const newHints = [...hints];
    const checkedIndices = new Set();
    let hintIndex = 0;

    for (let i = 0; i < value; i++) {
      if (currentColors[i] === pegsCombination[i]) {
        console.log(`Black peg at ${i}: ${currentColors[i]}`);
        newHints[currentRow][hintIndex] = <Peg size="w-6 h-6" key={hintIndex} content="black" />;
        checkedIndices.add(i);
        hintIndex++;
      }
    }

    for (let i = 0; i < value; i++) {
      if (checkedIndices.has(i)) continue;

      const pegIndex = pegsCombination.findIndex(
        (color, idx) => color === currentColors[i] && !checkedIndices.has(idx)
      );

      if (pegIndex !== -1) {
        console.log(`White peg at ${i}: ${currentColors[i]}`);
        newHints[currentRow][hintIndex] = <Peg size="w-6 h-6" key={hintIndex} content="white" />;
        checkedIndices.add(pegIndex);
        hintIndex++;
      }
    }

    setHints(newHints);
    setCurrentRow((prevRow) => prevRow + 1);
    setCurrentPeg(0);
  };

  const clearEveryPeg = (value: number) => {
    setRows(Array.from({ length: 10 }, () => Array(value).fill(<Peg size="w-12 h-12" content="transparent" />)));
    setRowsColors(Array.from({ length: 10 }, () => Array(value).fill("transparent")));
    setHints(Array.from({ length: 10 }, () => Array(value).fill(<Peg size="w-6 h-6" content="transparent" />)));
  }

  return (
    <div className="bg-[url(/pexels-fwstudio-33348-172277.jpg)] h-[100vh] bg-cover w-full">
      <div className="flex items-center flex-col">
        <h1>Mastermind</h1>

        <div className="flex justify-around w-full space-x-28">
          <div className="">
            <GameRules />
          </div>

          <div className="flex flex-col justify-center rounded-xl shadow-xl border-orange-200 border-2 bg-orange-100 p-4">
            <div className="flex items-center justify-between gap-4">
              <PegsContainer content="icon" number={value} />

              <Select onValueChange={handleChange} defaultValue={"4"} disabled={isStarted}>
                <SelectTrigger className="w-12">
                  <SelectValue placeholder="4" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="6">6</SelectItem>
                  <SelectItem value="7">7</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="icon" onClick={handleClick} disabled={isStarted}>
                <Play size={48} strokeWidth={1.25} />
              </Button>
            </div>

            <div className="mx-auto flex">
              <div className="flex flex-col gap-2">
                {mapRows}
              </div>
            </div>

            <div className="flex flex-col">
              <p>Available colors:</p>
              <ColorButtons isStarted={isStarted} isFilled={isRowFilled} onColorSelect={handleColorChange} />
            </div>

            <div className="mx-auto">
              <Button variant="outline" size="lg" className="text-xl" onClick={handleCheck} disabled={isChecked}>
                Check
                <CircleCheckBig />
              </Button>
            </div>
          </div>
          <div className="w-[20vw]">
            <Label className="text-2xl">Your notes</Label>
            <Textarea className="h-[20vh] text-xl"></Textarea>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
