import React from "react";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import styles from "./string.module.css";


export const StringComponent: React.FC = () => {
  return (
    <SolutionLayout title="Строка">
      <div className={styles.stringbox}>
        <div className={styles.inputbox}>
        <div className={styles.input}> <Input  max={11}></Input> </div>
          <Button text="Развернуть" />
        </div>
        Максимум 11 символов
      </div>
    </SolutionLayout>
  );
};
