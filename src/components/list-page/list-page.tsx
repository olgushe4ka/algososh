import React, { ChangeEvent, useMemo, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import LinkedList from "./list-class";

import styles from "./list.module.css";

type TArray = {
  value: any;
  color: ElementStates;
  tail?: string;
  head?: string;
};

type TDownCircle = {
  value: any;
  index: number | null;
};

const defaultArray = Array.from({ length: 4 }, () => ({
  value: "1",
  color: ElementStates.Default,
}));

export const ListPage: React.FC = () => {
  const list = useMemo(() => new LinkedList<string>(), []);

  const [valueInput, setValueInput] = useState<any>("");
  const [indexInput, setIndexInput] = useState<any>("");

  // const [numberChainging, setNumberChainging] = useState<boolean>(false);
  const [indexUpCircle, setIndexUpCircle] = useState<number | null>(null);
  const [indexDownCircle, setIndexDownCircle] = useState<TDownCircle>({
    value: "",
    index: null,
  });

  const [array, setArray] = useState<TArray[]>(defaultArray);

  const onChangeValueInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValueInput(e.currentTarget.value);
  };

  const onChangeIndexInput = (e: ChangeEvent<HTMLInputElement>) => {
    setIndexInput(e.currentTarget.value);
  };

  console.log(array);
  console.log(list.container);

  const clickButtonAddToHead = () => {
    setValueInput("");

    setIndexUpCircle(0);

    const newArray = array.concat();

    list.addToHead(valueInput);

    const newElement = {
      value: valueInput,
      color: ElementStates.Changing,
    };

    newArray.unshift(newElement);

    setArray(newArray);

    setTimeout(() => {
      setIndexUpCircle(null);

      const array = [...newArray];
      array[0].color = ElementStates.Default;
      setArray(array);
    }, 500);
  };

  const clickButtonAddToTail = () => {};

  const clickButtonDelHead = () => {
    const newArray = array.concat();
    //  setValueInput("");
    const downCircle = {
      value: newArray[0].value,
      index: 0,
    };

    setIndexDownCircle(downCircle);

    list.delFromHead();

    newArray[0].value = "";
    newArray[0].color = ElementStates.Changing;

    setArray(newArray);

    setTimeout(() => {
      const downCircle = {
        value: "",
        index: null,
      };

      setIndexDownCircle(downCircle);
      const array = [...newArray];
      array.shift();

      setArray(array);
    }, 500);
  };
  const clickButtonDelTail = () => {};

  const clickButtonAddByIndex = () => {};

  const clickButtonDelByIndex = () => {};

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.stringbox}>
        <div className={styles.stringbox}>
          <div className={styles.inputbox}>
            <div className={styles.input}>
              <Input
                placeholder="Введите значение"
                max={11}
                onChange={onChangeValueInput}
                value={valueInput}
              ></Input>
              <p className={styles.maxText}>Максимум 4 символа</p>
            </div>
            <div className={styles.btn}>
              <Button
                text="Добавить в head"
                type="submit"
                onClick={clickButtonAddToHead}
                disabled={valueInput.length > 4}
              />
            </div>
            <div className={styles.btn}>
              <Button
                text="Добавить в tail"
                type="submit"
                onClick={clickButtonAddToTail}
                disabled={valueInput.length > 4}
              />
            </div>
            <div className={styles.btn}>
              <Button
                text="Удалить из head"
                type="submit"
                onClick={clickButtonDelHead}
                disabled={array.length == 0}
              />
            </div>
            <div>
              <Button
                text="Удалить из tail"
                type="submit"
                onClick={clickButtonDelTail}
                disabled={array.length == 0}
              />
            </div>{" "}
          </div>
        </div>

        <div className={styles.stringboxSecond}>
          <div className={styles.inputbox}>
            <div className={styles.input}>
              <Input
                placeholder="Введите индекс"
                max={11}
                onChange={onChangeIndexInput}
                value={indexInput}
              ></Input>
            </div>
            <div className={styles.btnBig}>
              <Button
                text="Добавить по индексу"
                type="submit"
                onClick={clickButtonAddByIndex}
                disabled={valueInput.length > 4}
                extraClass={styles.buttonWidth}
              />
            </div>
            <div className={styles.btnBig}>
              <Button
                text="Удалить по индексу"
                type="submit"
                onClick={clickButtonDelByIndex}
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
              {index == indexUpCircle && (
                <Circle
                  state={ElementStates.Changing}
                  letter={item.value}
                  isSmall={true}
                  extraClass={styles.upCircle}
                />
              )}
              {index == 0 && <p className={styles.head}>head</p>}
              <Circle letter={item.value} state={item.color} />
              <p>{index}</p>
              {index == array.length - 1 && <p className={styles.tail}>tail</p>}
              {index == indexDownCircle.index && (
                <Circle
                  state={ElementStates.Changing}
                  //  letter={item.value}
                  letter={indexDownCircle.value}
                  isSmall={true}
                  extraClass={styles.downCircle}
                />
              )}
            </div>
            {index !== array.length - 1 && <ArrowIcon />}
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
