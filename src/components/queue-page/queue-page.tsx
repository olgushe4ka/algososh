import React, { ChangeEvent, useMemo, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import Queue from "./queue-class";

import styles from "./queue.module.css";
import { initialArr, TArray } from "./utils";

export const QueuePage: React.FC = () => {
  const queue = useMemo(() => new Queue<string>(), []);

  const [valueInput, setValueInput] = useState<string>("");
  const [array, setArray] = useState<TArray[]>(initialArr);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValueInput(e.currentTarget.value);
  };

  const clickButtonAdd = () => {
    setValueInput("");

    const newArray = array.concat();

    queue.enqueue(valueInput);

    const head = queue.getHead();
    const tail = queue.getTail();

    newArray[head.index].value = head.value;
    newArray[head.index].head = "head";

    if (tail.index > 0) {
      newArray[tail.index - 1].tail = "";
    }

    newArray[tail.index].value = tail.value;
    newArray[tail.index].tail = "tail";
    newArray[tail.index].color = ElementStates.Changing;
    setArray(newArray);

    setTimeout(() => {
      const array = [...newArray];
      array[tail.index].color = ElementStates.Default;
      setArray(array);
    }, 500);
  };

  const clickButtonDel = () => {
    const newArray = [...array];
    const head = queue.getHead();
    const tail = queue.getTail();
    if (head.index === tail.index) {
      clickButtonClear();
    } else {
      queue.dequeue();
      const head = queue.getHead();
      newArray[head.index - 1].color = ElementStates.Changing;

      setArray(newArray);

      setTimeout(() => {
        const array = [...newArray];

        array[head.index - 1].color = ElementStates.Default;
        if (head.index > 0) {
          array[head.index - 1].head = "";
          array[head.index - 1].value = "";
        }
        array[head.index].value = head.value;
        array[head.index].head = "head";
        setArray(array);
      }, 500);
    }
  };

  const clickButtonClear = () => {
    queue.clear();

    setArray(
      Array.from({ length: 7 }, () => ({
        value: "",
        color: ElementStates.Default,
      }))
    );
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
              disabled={
                valueInput == "" ||
                array[6].tail == "tail" ||
                valueInput.length > 4
              }
            />
          </div>{" "}
          <div className={styles.btnDelete}>
            <Button
              text="Удалить"
              type="submit"
              onClick={clickButtonDel}
              disabled={array.length == 0}
            />
          </div>
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
            {item.head === "head" && <p className={styles.head}>head</p>}
            <Circle letter={item.value} state={item.color} />

            <p>{index}</p>
            {item.tail === "tail" && <p>tail</p>}
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
