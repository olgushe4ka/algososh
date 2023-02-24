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

  const bubbleSort = (direction: boolean) => {
    let i = 0;
    let j = 0;

    let newArr = array.concat();
    newArr.map((item) => {item.color = ElementStates.Default})

    const interval = setInterval(function () {
      newArr = newArr.concat();

      newArr[j].color = ElementStates.Changing;
      newArr[j + 1].color = ElementStates.Changing;

      setArray(newArr);
      setTimeout(function () {
        if (direction == true) {
          if (newArr[j].value > newArr[j + 1].value) {
            let temp = newArr[j];
            newArr[j] = newArr[j + 1];
            newArr[j + 1] = temp;
          }
        } else {
          if (newArr[j].value < newArr[j + 1].value) {
            let temp = newArr[j];
            newArr[j] = newArr[j + 1];
            newArr[j + 1] = temp;
          }
        }

        newArr[j].color = ElementStates.Default;
        setArray(newArr);

        if (j < newArr.length - i - 2) {
          j++;
        } else {
          newArr[j + 1].color = ElementStates.Modified;
          setArray(newArr);

          i++;
          j = 0;
          if (i >= newArr.length) {
            setTimeout(function () {
              newArr = newArr.concat();
              console.log(i, j);
              newArr[j + 1].color = ElementStates.Modified;
              newArr[j].color = ElementStates.Modified;

              setArray(newArr);
              clearInterval(interval);
            }, 300);
          }
        }
      }, 500);
    }, 500);
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

  const selectionSort = (direction: boolean) => {
    let i = 0;
    let j = 0;

    let newArr = array.concat();
    newArr.map((item) => {item.color = ElementStates.Default})

    const interval = setInterval(function () {
      newArr = newArr.concat();

      newArr[j].color = ElementStates.Changing;
      newArr[j + 1].color = ElementStates.Changing;

      setArray(newArr);
      setTimeout(function () {
        if (direction == true) {
          if (newArr[j].value > newArr[j + 1].value) {
            let temp = newArr[j];
            newArr[j] = newArr[j + 1];
            newArr[j + 1] = temp;
          }
        } else {
          if (newArr[j].value < newArr[j + 1].value) {
            let temp = newArr[j];
            newArr[j] = newArr[j + 1];
            newArr[j + 1] = temp;
          }
        }

        newArr[j].color = ElementStates.Default;
        setArray(newArr);

        if (j < newArr.length - i - 2) {
          j++;
        } else {
          newArr[j + 1].color = ElementStates.Modified;
          setArray(newArr);

          i++;
          j = 0;
          if (i >= newArr.length) {
            setTimeout(function () {
              newArr = newArr.concat();
              console.log(i, j);
              newArr[j + 1].color = ElementStates.Modified;
              newArr[j].color = ElementStates.Modified;

              setArray(newArr);
              clearInterval(interval);
            }, 300);
          }
        }
      }, 500);
    }, 500);
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
      bubbleSort(true);
    } else {
      const newArr = [...array];
      selectionSortUP(newArr);
      setArray(newArr);
    }
  };

  const clickButtonDown = () => {
    if (methodSorting == "bubble") {
      bubbleSort(false);
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
