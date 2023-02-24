import React, { useState } from "react";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import styles from "./sorting.module.css";

type TArray = {
  value: number;
  color: ElementStates;
};

const randomArr = () => {
  const arr = [];
  const length = Math.floor(Math.random() * 13) + 3;
  for (let i = 0; i < length; i++) {
    arr.push({
      value: Math.round(Math.random() * 100),
      color: ElementStates.Default,
    });
  }
  return arr;
};

export const SortingPage: React.FC = () => {
  const [methodSorting, setMethodSorting] = useState("selection");

  const [array, setArray] = useState<Array<TArray>>([]);

  const bubbleSortUP = (arr: TArray[]) => {
    for (var i = 0; i < arr.length; i++) {
      for (var j = 0; j < arr.length - i - 1; j++) {
        if (arr[j].value > arr[j + 1].value) {
          var temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
    }
    return arr;
  };

  const bubbleSortDOWN = (arr: TArray[]) => {
    for (var i = 0; i < arr.length; i++) {
      for (var j = 0; j < arr.length - i - 1; j++) {
        if (arr[j].value < arr[j + 1].value) {
          var temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
    }
    return arr;
  };

  const selectionSortUP = (arr: TArray[]) => {
    for (let i = 0; i < arr.length - 1; i++) {
      let min = i;
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j].value < arr[min].value) {
          min = j;
        }
      }
      let temp = arr[i];
      arr[i] = arr[min];
      arr[min] = temp;
    }
    return arr;
  };

  const selectionSortDOWN = (arr: TArray[]) => {
    for (let i = 0; i < arr.length - 1; i++) {
      let min = i;
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j].value > arr[min].value) {
          min = j;
        }
      }
      let temp = arr[i];
      arr[i] = arr[min];
      arr[min] = temp;
    }
    return arr;
  };

  const clickButtonUp = () => {
    if (methodSorting == "bubble") {
      const newArr = [...array];
      bubbleSortUP(newArr);
      setArray(newArr);
    } else {
      const newArr = [...array];
      selectionSortUP(newArr);
      setArray(newArr);
    }
  };

  const clickButtonDown = () => {
    if (methodSorting == "bubble") {
      const newArr = [...array];
      bubbleSortDOWN(newArr);
      setArray(newArr);
    } else {
      const newArr = [...array];
      selectionSortDOWN(newArr);
      setArray(newArr);
    }
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.main}>
        <div className={styles.flex}>
          <RadioInput
            label={"Выбор"}
            checked={methodSorting === "selection"}
            onChange={() => setMethodSorting("selection")}
          />
          <RadioInput
            label={"Пузырек"}
            checked={methodSorting === "bubble"}
            onChange={() => setMethodSorting("bubble")}
          />
        </div>
        <div className={styles.flex}>
          <Button
            text="По возрастанию"
            type="submit"
            onClick={clickButtonUp}
            sorting={Direction.Ascending}
            disabled={array.length == 0}
          />

          <Button
            text="По убыванию"
            type="submit"
            onClick={clickButtonDown}
            sorting={Direction.Descending}
            disabled={array.length == 0}
          />
        </div>
        <div>
          <Button
            text="Новый массив"
            type="submit"
            onClick={() => {
              setArray(randomArr());
            }}
            //   disabled={}
          />
        </div>
      </div>
      <ul className={styles.columns}>
        {array.map((item, index) => (
          <li className={styles.column} key={index}>
            <Column index={item.value} state={item.color} />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
