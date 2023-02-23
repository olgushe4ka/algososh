import React, { ChangeEvent, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import styles from "./list.module.css";

type TArray = {
  value: string;
  color: ElementStates;
};

const defaultArray = Array.from({ length: 4 }, () => ({
  value: "1",
  color: ElementStates.Default,
}));

export const ListPage: React.FC = () => {
  const [valueInput, setValueInput] = useState<any>("");
  const [array, setArray] = useState<TArray[]>(defaultArray);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValueInput(e.currentTarget.value);
  };

  const clickButtonAdd = () => {};

  const clickButtonDel = () => {};

  const clickButtonClear = () => {};

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.stringbox}>
        <div className={styles.stringbox}>
          <div className={styles.inputbox}>
            <div className={styles.input}>
              <Input max={11} onChange={onChange} value={valueInput}></Input>
              <p className={styles.maxText}>Максимум 4 символа</p>
            </div>
            <div className={styles.btn}>
              <Button
                text="Добавить в head"
                type="submit"
                onClick={clickButtonAdd}
                disabled={valueInput.length > 4}
              />
            </div>
            <div className={styles.btn}>
              <Button
                text="Добавить в tail"
                type="submit"
                onClick={clickButtonDel}
                disabled={valueInput.length > 4}
              />
            </div>
            <div className={styles.btn}>
              <Button
                text="Удалить из head"
                type="submit"
                onClick={clickButtonAdd}
                disabled={array.length == 0}
              />
            </div>
            <div>
              <Button
                text="Удалить из tail"
                type="submit"
                onClick={clickButtonDel}
                disabled={array.length == 0}
              />
            </div>{" "}
          </div>
        </div>

        <div className={styles.stringboxSecond}>
          <div className={styles.inputbox}>
            <div className={styles.input}>
              <Input max={11} onChange={onChange} value={valueInput}></Input>
            </div>
            <div className={styles.btnBig}>
              <Button
                text="Добавить по индексу"
                type="submit"
                onClick={clickButtonAdd}
                disabled={valueInput.length > 4}
                extraClass={styles.buttonWidth}
              />
            </div>
            <div className={styles.btnBig}>
              <Button 
                text="Удалить по индексу"
                type="submit"
                onClick={clickButtonAdd}
                disabled={array.length == 0}
                extraClass={styles.buttonWidth}
              />
            </div>
          </div>
        </div>
      </div>

      <ul className={styles.curcles}>
        {array.map((item, index) => (
          <li className={styles.curcle} key={index}>
            <div>
              {index == array.length - 1 && <p className={styles.head}>head</p>}
              <Circle letter={item.value} state={item.color} />

              <p>{index}</p>
              {index == array.length - 1 && <p>tail</p>}
            </div>
            {index !== array.length - 1 && <ArrowIcon />}
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
