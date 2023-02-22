import React, { ChangeEvent, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import styles from "./fibonacci-page.module.css";

const fibonacciNumbers = (n: number): number[] => {
  let arr: number[] = [1, 1];
  for (let i = 2; i < n + 1; i++) {
    arr.push(arr[i - 2] + arr[i - 1]);
  }
  return arr;
};

export const FibonacciPage: React.FC = () => {
  const [valueInput, setValueInput] = useState<number | string>("");
  const [arrayFibonacci, setArrayFibonacci] = useState<Array<any>>([]);

  const changeArrayFibonacci = (number: number) => {
    let arr = fibonacciNumbers(number);

    let i = 0;
    const newArr: number[] = [];

    const interval = setInterval(() => {
      newArr.push(arr[i]);
      setArrayFibonacci(newArr.concat());

      if (i < arr.length - 1) {
        i++;
      } else {
        clearInterval(interval);
      }
    }, 500);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValueInput(e.currentTarget.value);
  };

  const clickButton = () => {
    const numberInput = Number(valueInput);

    setValueInput("");

    setTimeout(() => changeArrayFibonacci(numberInput), 500);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.stringbox}>
        <div className={styles.inputbox}>
          <div className={styles.input}>
            <Input max={11} onChange={onChange}></Input>
          </div>
          <Button
            text="Рассчитать"
            type="submit"
            onClick={clickButton}
            disabled={valueInput === "" || valueInput > 19}
          />
        </div>
        Максимальное число — 19
      </div>

      <ul className={styles.curcles}>
        {arrayFibonacci.map((item, index) => (
          <li className={styles.curcle} key={index}>
            <Circle letter={item} state={ElementStates.Default} />
            <p>{index}</p>
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
