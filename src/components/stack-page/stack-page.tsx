import React, { ChangeEvent, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";


import styles from "./stack.module.css";

type TArray = {
  value: string;
  color: ElementStates;
};

export const StackPage: React.FC = () => {
  const [valueInput, setValueInput] = useState<any>("null");
  const [array, setArray] = useState<TArray[]>([]);


  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValueInput(e.currentTarget.value);
  };

  const clickButtonAdd = () => {
    const arr: any = array.concat;

    const newArr = arr.push({ value: valueInput, color: ElementStates.Default });

    // const newArr2 =   newArr.map((value: any) => ({ value, color: ElementStates.Default }));

    console.log(newArr);
    // console.log(newArr2);

    //setArray(newArr2);
    setValueInput("");
  };

  return (
    <SolutionLayout title="Стек">
      <div className={styles.stringbox}>
        <div className={styles.inputbox}>
          <div className={styles.input}>
            <Input max={11} onChange={onChange}></Input>
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
              onClick={() => {}}
              disabled={!!array}
            />
          </div>{" "}
          <div>
            <Button
              text="Очистить"
              type="submit"
              onClick={() => {}}
              disabled={!!array}
            />
          </div>
        </div>
        Максимум 4 символа
      </div>

      <ul className={styles.curcles}>
        {/* {array.map((item, index) => (
          <li className={styles.curcle} key={index}>
            <Circle letter={item.value} state={item.color} />
            <p>{index - 1}</p>
          </li>
        ))} */}
      </ul>
    </SolutionLayout>
  );
};
