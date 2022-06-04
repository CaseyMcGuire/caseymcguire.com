import * as React from "react";
import {createUseStyles} from "react-jss";

type Props = {
  formName: string,
  title: string,
  type: string,
  onChange?: (text: string) => void
}

const useStyles = createUseStyles({
  formField: {
    height: '24px',
    width: '240px'
  }
});

export default function FormField(props: Props) {
  const styles = useStyles()
  return (
    <div>
      <div>
        <input
          className={styles.formField}
          placeholder={props.formName}
          name={props.formName}
          type={props.type}
          onChange={event => {
            if (props.onChange != null) {
              props.onChange(event.target.value)
            }
          }}/>
      </div>
    </div>
  );
}