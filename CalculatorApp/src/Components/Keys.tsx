import { useState, useEffect } from "react";

function reduceCalculation(opsArray: Array<String>, numArray: Array<String>){
    if(!opsArray.includes('x')&& !opsArray.includes('/')){
         let workingNumber: number;
        workingNumber = Number(numArray[0]);
          for (let i: number = 0; i < numArray.length; i++) {
            if (opsArray[i] === "-") {
              workingNumber = workingNumber - Number(numArray[i + 1]);
            }
            if (opsArray[i] === "+") {
              workingNumber = workingNumber + Number(numArray[i + 1]);
            }
    }
    return workingNumber
}
else{
    for(let i=0; i<opsArray.length; i++){
        if(opsArray[i]==='x'){
            const intermediateNum : number = Number(numArray[i]) * Number(numArray[i+1])
            numArray[i]= intermediateNum.toString()
            numArray.splice(i+1, 1)
            opsArray.splice(i,1)
        }
        if(opsArray[i]==='/'){
            const intermediateNum : number = Number(numArray[i]) / Number(numArray[i+1])
            numArray[i]= intermediateNum.toString()
            numArray.splice(i+1, 1)
            opsArray.splice(i,1)
        }
    }
    return reduceCalculation(opsArray, numArray)
}
}

function Keys() {
  const [workingCalculation, setWorkingCalculation] = useState<string>("");
  const [result, setResult] = useState<number>(0);
  type ButtonType = "number" | "operation" | "";
  const [latestButtonType, setLatestButtonType] = useState<ButtonType>("");

  function handleClickNum(event) {
    setLatestButtonType("number");
    setWorkingCalculation((calculation) => {
      return calculation + event.target.innerHTML;
    });
  }

  function handleClickOp(event) {
    if (latestButtonType === "operation") {
      setWorkingCalculation((calculation) => {
        let copyCalc: string = calculation.substring(0, calculation.length - 1);
        return copyCalc + event.target.innerHTML;
      });
    } else {
        if(workingCalculation.length || event.target.innerHTML==='-'){
      setLatestButtonType("operation");
      setWorkingCalculation((calculation) => {
        return calculation + event.target.innerHTML;
      })}
      
    }
  }
  function handleReset() {
    setWorkingCalculation("");
    setResult(0);
  }
  function handleDelete() {
    setWorkingCalculation((calculation) => {
      return calculation.slice(0, -1);
    });
  }

  function handleCalculateButton(event) {

    
    const numRegex: RegExp = /\d{1,}/g;
    const numArray: Array<string> = workingCalculation.match(numRegex) || [];
    const opsRegex: RegExp = /\D/g;
    const opsArray: Array<string> | null =
      workingCalculation.match(opsRegex) || [];
      if(workingCalculation[0]==='-'){
        opsArray.shift()
        numArray[0] = (Number(numArray[0])*-1).toString()
      }

      if (
        workingCalculation[workingCalculation.length - 1] === "x" ||
        workingCalculation[workingCalculation.length - 1] === "/" ||
        workingCalculation[workingCalculation.length - 1] === "+" ||
        workingCalculation[workingCalculation.length - 1] === "-"
      ) {
        setWorkingCalculation((calculation) => {
          return calculation.substring(0, calculation.length - 1);
        });
        setLatestButtonType("number");
      }
    if (opsArray.length >= numArray.length) {
      opsArray.pop();
    }
    const reduceCalcResult: number | undefined= reduceCalculation(opsArray, numArray)
setResult(reduceCalcResult)

    // let workingNumber: number;
    // if (
    //   ((opsArray.includes("-") || opsArray.includes("+")) &&
    //     !opsArray.includes("x") &&
    //     !opsArray.includes("/")) ||
    //   ((opsArray.includes("x") || opsArray.includes("/")) &&
    //     !opsArray.includes("+") &&
    //     !opsArray.includes("-"))
    // ) {
    //   workingNumber = Number(numArray[0]);
    //   console.log(true);
    //   for (let i: number = 0; i < numArray.length; i++) {
    //     if (opsArray[i] === "-") {
    //       workingNumber = workingNumber - Number(numArray[i + 1]);
    //     }
    //     if (opsArray[i] === "+") {
    //       workingNumber = workingNumber + Number(numArray[i + 1]);
    //     }
    //     if (opsArray[i] === "x") {
    //       workingNumber = workingNumber * Number(numArray[i + 1]);
    //     }
    //     if (opsArray[i] === "/") {
    //       workingNumber = workingNumber / Number(numArray[i + 1]);
    //     }
    //   }
    // } else {
    //   console.log(false);
    //   const xIndices: Array<number> = [];
    //   const divIndices: Array<number> = [];
    //   const addIndices: Array<number> = [];
    //   const minusIndices: Array<number> = [];

    //   let xIdx = opsArray.indexOf("x");
    //   while (xIdx !== -1) {
    //     xIndices.push(xIdx);
    //     xIdx = opsArray.indexOf("x", xIdx + 1);
    //   }
    //   let divIdx = opsArray.indexOf("/");
    //   while (divIdx !== -1) {
    //     divIndices.push(divIdx);
    //     divIdx = opsArray.indexOf("/", divIdx + 1);
    //   }
    //   let addIdx = opsArray.indexOf("+");
    //   while (addIdx !== -1) {
    //     addIndices.push(addIdx);
    //     addIdx = opsArray.indexOf("+", addIdx + 1);
    //   }
    //   let minusIdx = opsArray.indexOf("-");
    //   while (minusIdx !== -1) {
    //     minusIndices.push(minusIdx);
    //     minusIdx = opsArray.indexOf("-", minusIdx + 1);
    //   }

    //   console.log(divIndices, "divIndices");
    //   console.log(xIndices, "xIndices");
    //   console.log(addIndices, "addIndices");
    //   console.log(minusIndices, "minusIndices");

    //   const xAndDivIndices: Array<number> = [...divIndices];
    //   const addAndMinusIndices: Array<number> = [...addIndices];
    //   for (let i: number = 0; i < xIndices.length; i++) {
    //     xAndDivIndices.push(xIndices[i]);
    //   }
    //   for (let i: number = 0; i < minusIndices.length; i++) {
    //     addAndMinusIndices.push(minusIndices[i]);
    //   }

    //   console.log(xAndDivIndices, "xAndDivIndices");
    //   console.log(addAndMinusIndices, "addAndMinusIndices");
    //   xAndDivIndices.sort(function (a, b) {
    //     return a - b;
    //   });
    //   addAndMinusIndices.sort(function (a, b) {
    //     return a - b;
    //   });
    //   console.log(xAndDivIndices, "sortedxandDivs");
    //   console.log(addAndMinusIndices, "sortedAddandMinus");
    //   let lowXorDivIndex: number = xAndDivIndices[0];
    //   console.log(lowXorDivIndex, "lowXorDivIndex");

    //   const intermediateNumsArray: Array<number> = [];
    //   for (let i = 0; i < xAndDivIndices.length; i++) {
    //     if (xAndDivIndices[i] !== xAndDivIndices[i - 1] + 1) {
    //       let intermediateNum: number = numArray[xAndDivIndices[i]];
    //       let index: number = xAndDivIndices[i];
    //       console.log(intermediateNum, "intermediateNum");
    //       while (xAndDivIndices.includes(index)) {
    //         if (opsArray[index] === "x") {
    //           intermediateNum = intermediateNum * Number(numArray[index + 1]);
    //           console.log("opsArray = x", intermediateNum, "intermediate Num");
    //         } else {
    //           intermediateNum = intermediateNum / Number(numArray[index + 1]);
    //           console.log("opsArray = /", intermediateNum, "intermediate Num");
    //         }
    //         index++;
    //       }
    //       intermediateNumsArray.push(intermediateNum);
    //     }
    //     console.log(intermediateNumsArray, "intermediateNumsArray");
    //     if (intermediateNumsArray.length > addAndMinusIndices.length) {
    //         console.log('intermediateNumsArray is greater than add and minus indices')
    //       workingNumber = intermediateNumsArray[0];
    //       for (let i = 0; i < addAndMinusIndices.length; i++) {
    //         if (opsArray[addAndMinusIndices[i]] === "+") {
    //           workingNumber = workingNumber + intermediateNumsArray[i + 1];
    //         } else {
    //           workingNumber = workingNumber - intermediateNumsArray[i + 1];
    //         }
    //       }
    //     }
       
    //   }
    // }

    // setResult(workingNumber);


  }

  return (
    <section id="keys">
      <div id="numbers_div">
        <button className="number" onClick={handleClickNum}>
          1
        </button>
        <button className="number" onClick={handleClickNum}>
          2
        </button>
        <button className="number" onClick={handleClickNum}>
          3
        </button>
        <button className="number" onClick={handleClickNum}>
          4
        </button>
        <button className="number" onClick={handleClickNum}>
          5
        </button>
        <button className="number" onClick={handleClickNum}>
          6
        </button>
        <button className="number" onClick={handleClickNum}>
          7
        </button>
        <button className="number" onClick={handleClickNum}>
          8
        </button>
        <button className="number" onClick={handleClickNum}>
          9
        </button>
        <button className="number" onClick={handleClickNum}>
          0
        </button>
      </div>
      <div id="operations_div">
        <button id="+" onClick={handleClickOp}>
          +
        </button>
        <button id="-" onClick={handleClickOp}>
          -
        </button>
        <button id="x" onClick={handleClickOp}>
          x
        </button>
        <button id="/" onClick={handleClickOp}>
          /
        </button>
      </div>
      <div id="calculate_div">
        <p id="working_calculation">{workingCalculation}</p>
        <button id="calculate_button" onClick={handleCalculateButton}>
          Calculate
        </button>
        <button id="reset_button" onClick={handleReset}>
          Reset
        </button>
        <button id="delete_button" onClick={handleDelete}>
          Delete
        </button>
      </div>
      <div id="result_div">
        <p id="result">{result}</p>
      </div>
    </section>
  );
}

export default Keys;
