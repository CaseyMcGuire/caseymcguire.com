import * as React from "react";
import CsrfUtils from "./CsrfUtils";

export default function CsrfToken() {
  return (
    <input type="hidden" name="_csrf" value={CsrfUtils.getToken()}/>
  );
}