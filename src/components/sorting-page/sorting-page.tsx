import React, { useState } from "react";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import styles from "./sorting.module.css";

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
  const [array, setArray] = useState<Array<any>>([]);

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.main}>
        <div className={styles.flex}>
          <RadioInput label={"Выбор"} />
          <RadioInput label={"Пузырек"} />
        </div>
        <div className={styles.flex}>
          <Button
            text="По возрастанию"
            type="submit"
            onClick={() => {}}
            sorting={Direction.Ascending}
            //   disabled={}
          />

          <Button
            text="По убыванию"
            type="submit"
            onClick={() => {}}
            sorting={Direction.Descending}
            //   disabled={}
          />
        </div>{" "}
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
