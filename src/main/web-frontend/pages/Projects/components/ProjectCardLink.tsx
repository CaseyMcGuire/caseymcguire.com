import {Link} from "react-router";

type ProjectCardLinkProps = {
  to: string,
  text: string
}

// workaround for until bug is fixed 
export default function ProjectCardLink(props: ProjectCardLinkProps) {
  return (
    <Link to={props.to}>{props.text}</Link>
  )
}