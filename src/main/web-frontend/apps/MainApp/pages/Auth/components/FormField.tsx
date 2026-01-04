import * as stylex from "@stylexjs/stylex";
import * as React from "react";

type Props = {
  labelText?: string
  formName: string,
  placeholder: string,
  type: string,
  onChange?: (text: string) => void
}

const styles = stylex.create({
  formContainer: {
    marginBottom: '24px'
  },
  formField: {
    height: '42px',
    width: '380px',
    paddingLeft: '.75rem',
    paddingRight: '.75rem',
    paddingTop: '.5rem',
    paddingBottom: '.5rem',
    borderWidth: '1px',
    borderColor: 'rgb(209 213 219)',
    borderStyle: 'solid',
    borderRadius: '.5rem',
    fontSize: '16px',
  },
  formLabel: {
    marginBottom: '4px'
  }
});

export default function FormField(props: Props) {
  return (
    <div {...stylex.props(styles.formContainer)}>
        {
          props.labelText && (
            <div {...stylex.props(styles.formLabel)}>
              <label htmlFor={props.formName}>
                {props.labelText}
              </label>
            </div>
          )
        }
        <input {...stylex.props(styles.formField)}
          placeholder={props.placeholder}
          name={props.formName}
          id={props.formName}
          type={props.type}
          onChange={event => {
            if (props.onChange != null) {
              props.onChange(event.target.value)
            }
          }}/>
    </div>
  );
}