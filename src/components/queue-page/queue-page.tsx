import React, { ChangeEvent, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import styles from "./queue.module.css";

type TArray = {
  value: string;
  color: ElementStates;
};

const emptyArr = Array.from({ length: 7 }, () => ({
  value: "",
  color: ElementStates.Default,
}));

export const QueuePage: React.FC = () => {
  const [valueInput, setValueInput] = useState<any>("");
  const [array, setArray] = useState<TArray[]>(emptyArr);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValueInput(e.currentTarget.value);
  };

  const clickButtonAdd = () => {};

  const clickButtonDel = () => {};

  const clickButtonClear = () => {
    setArray(emptyArr);
  };

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.stringbox}>
        <div className={styles.inputbox}>
          <div className={styles.input}>
            <Input max={11} onChange={onChange} value={valueInput}></Input>
            <p className={styles.maxText}>Максимум 4 символа</p>
          </div>
          <div>
            <Button
              text="Добавить"
              type="submit"
              onClick={clickButtonAdd}
              disabled={valueInput === "" || valueInput.length > 4}
            />
          </div>{" "}
          <div className={styles.btnDelete}>
            <Button
              text="Удалить"
              type="submit"
              onClick={clickButtonDel}
              disabled={array.length == 0}
            />
          </div>{" "}
          <div>
            <Button
              text="Очистить"
              type="submit"
              onClick={clickButtonClear}
              disabled={array.length == 0}
            />
          </div>
        </div>
      </div>

      <ul className={styles.curcles}>
        {array.map((item, index) => (
          <li className={styles.curcle} key={index}>
            {index == array.length - 1 && <p className={styles.head}>head</p>}
            <Circle letter={item.value} state={item.color} />

            <p>{index}</p>
            {index == array.length - 1 && <p>tail</p>}
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
