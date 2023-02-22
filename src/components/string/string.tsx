import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import styles from "./string.module.css";

export const StringComponent: React.FC = () => {
  const [valueInput, setValueInput] = useState("null");
  const [arrayLetters, setArrayLetters] = useState<Array<any>>([]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValueInput(e.currentTarget.value);
  };

  const reverse = (arr: any[]) => {
    const n = Math.floor(arr.length / 2);

    let i = 0;

    changeColor(arr, i, ElementStates.Changing);

    const interval = setInterval(() => {
      const temp = arr[arr.length - i - 1];
      arr[arr.length - i - 1] = arr[i];
      arr[i] = temp;

      changeColor(arr, i, ElementStates.Modified);

      if (i < n) {
        i++;
        changeColor(arr, i, ElementStates.Changing);
      } else {
        clearInterval(interval);
      }
    }, 1000);
  };

  const changeColor = (arr: any[], i: number, color: ElementStates) => {
    arr[i].color = color;
    arr[arr.length - i - 1].color = color;
    const newArr: any[] = arr.concat();

    setArrayLetters(newArr);
  };

  const clickButton = () => {
    const arr = valueInput
      .split("")
      .map((value) => ({ value, color: ElementStates.Default }));

    setArrayLetters(arr);
    setValueInput("");

    setTimeout(() => reverse(arr), 1000);
  };

  return (
    <SolutionLayout title="Строка">
      <div className={styles.stringbox}>
        <div className={styles.inputbox}>
          <div className={styles.input}>
            <Input max={11} onChange={onChange}></Input>
          </div>
          <Button
            text="Развернуть"
            type="submit"
            onClick={clickButton}
            disabled={valueInput === "" || valueInput.length > 11}
          />
        </div>
        Максимум 11 символов
      </div>

      <ul className={styles.curcles}>
        {arrayLetters.map((item, index) => (
          <li className={styles.curcle} key={index}>
            <Circle letter={item.value} state={item.color} />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
