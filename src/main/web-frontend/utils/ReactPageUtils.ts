import { ReactNode} from "react";
import ReactDOM from "react-dom/client";
export function renderComponent(
  component: ReactNode,
  elementId: string = "root"
) {
  const rootElement = document.getElementById(elementId);
  if (rootElement == null) {
    throw new Error(`In order to mount this component, there must be tag with an id of ${elementId} but none was found.`)
  }
  const root = ReactDOM.createRoot(rootElement)
  root.render(component)
}