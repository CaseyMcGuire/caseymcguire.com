import {WikiSidebarFolder, WikiSidebarItem, WikiSidebarPage} from "projects/Wiki/models/WikiModels";
import {useState} from "react";
import * as stylex from "@stylexjs/stylex";
import WikiChevronIcon from "projects/Wiki/components/WikiChevronIcon";

type Props = {
  item: WikiSidebarItem
}

const styles = stylex.create({
  container: {
    paddingInline: '12px'
  },
  item: {
    cursor: "pointer",
    color: 'rgb(81,83,85)',
    ':hover': {
      backgroundColor: 'rgba(0,0,0,0.05)'
    },
    paddingBlock: '8px',
    paddingInline: '12px',
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  children: {
    display: 'none'
  }
})

export default function WikiSidebarItemComponent(props: Props) {
  switch(props.item.type) {
    case "WikiSidebarPage":
      return <WikiSidebarPageComponent page={props.item} />;
    case "WikiSidebarFolder":
      return <WikiSidebarFolderComponent folder={props.item} />;
    default:
      return null;
  }
}


function WikiSidebarPageComponent(props: { page: WikiSidebarPage }) {
  const page = props.page;
  return (
    <div {...stylex.props(styles.item)}>
      {page.name}
    </div>
  )
}

function WikiSidebarFolderComponent(props: { folder: WikiSidebarFolder }) {
  const folder = props.folder;
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div>
      <div
        {...stylex.props(styles.item)}
        onClick={toggleOpen}>
        {folder.name}
        <WikiChevronIcon isOpen={isOpen} />
      </div>
      <div {...stylex.props(
        styles.container,
        !isOpen && styles.children
      )}>
        {
          folder.children.map(item =>
             <WikiSidebarItemComponent key={item.id} item={item} />
          )
        }
      </div>
    </div>
  )
}