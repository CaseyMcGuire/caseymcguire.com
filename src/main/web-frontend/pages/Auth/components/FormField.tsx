import * as React from "react";

export default function FormField(props: { formName: string, title: string, type: string, onChange?: (text: string) => void }) {
  return (
    <div>
      <div>
        <span>{props.title}:</span>
      </div>
      <div>
        <input name={props.formName} type={props.type} onChange={event => {
          if (props.onChange != null) {
            props.onChange(event.target.value)
          }
        }}/>
      </div>
    </div>
  );
}