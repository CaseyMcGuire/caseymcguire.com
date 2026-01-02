import {WikiSidebarFolder, WikiSidebarItem, WikiSidebarPage} from "projects/Wiki/models/WikiModels";
import {useEffect, useState} from "react";
import * as stylex from "@stylexjs/stylex";
import WikiChevronIcon from "projects/Wiki/components/WikiChevronIcon";
import {useNavigate} from "react-router";
import {CSS} from '@dnd-kit/utilities';
import {useDraggable, useDroppable} from "@dnd-kit/core";

type Props = {
  item: WikiSidebarItem,
  selectedId: string | null
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
  },
  hoverItem: {
    borderBottomWidth: '2px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'rgb(229, 231, 235)',
  }
})

export default function WikiSidebarItemComponent(props: Props) {
  switch (props.item.type) {
    case "WikiSidebarPage":
      return <WikiSidebarPageComponent
        page={props.item}
        selectedId={props.selectedId}
      />;
    case "WikiSidebarFolder":
      return <WikiSidebarFolderComponent folder={props.item} selectedId={props.selectedId}/>;
    default:
      return null;
  }
}


function WikiSidebarPageComponent(props: { page: WikiSidebarPage, selectedId: string | null }) {
  const page = props.page;
  const wikiName = props.page.wikiName;
  const navigate = useNavigate();
  const onClick = () => navigate(`/wiki/${wikiName}/${page.id}`);
  const args = {
    id: page.id,
    data: {type: 'page', name: page.name}
  };
  const droppable = useDroppable(args);
  const draggable = useDraggable(args);
  const {attributes, listeners, transform} = draggable

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  const isHovering = !draggable.isDragging && props.selectedId === page.id;

  return (
    <div
      onClick={onClick}
      ref={(node) => {
        droppable.setNodeRef(node);
        draggable.setNodeRef(node);
      }}
      style={style}
      {...stylex.props(styles.item, isHovering && styles.hoverItem)}
      {...listeners}
      {...attributes}
    >
      {page.name}
    </div>
  )
}

function WikiSidebarFolderComponent(props: { folder: WikiSidebarFolder, selectedId: string | null }) {
  const folder = props.folder;
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);
  const args = {
    id: folder.id,
    data: {type: 'folder', folder}
  };
  const droppable = useDroppable(args);
  const draggable = useDraggable(args);
  const {attributes, listeners, transform} = draggable;
  const style = {
    transform: CSS.Translate.toString(transform),
  };

  const isHovering = !draggable.isDragging && props.selectedId === folder.id;

  useEffect(() => {
    if (draggable.isDragging && isOpen) {
      setIsOpen(false);
    }
  }, [draggable.isDragging, isOpen]);


  return (
    <div>
      <div
        {...stylex.props(styles.item, isHovering && styles.hoverItem)}
        onClick={toggleOpen}
        ref={(node) => {
          draggable.setNodeRef(node);
          droppable.setNodeRef(node);
        }}
        style={style}
        {...attributes}
        {...listeners}
      >
        {folder.name}
        <WikiChevronIcon isOpen={isOpen}/>
      </div>
      <div {...stylex.props(
        styles.container,
        !isOpen && styles.children
      )}>
        {
          folder.children.map(item => (
            <WikiSidebarItemComponent key={item.id} item={item} selectedId={props.selectedId}/>
          ))
        }
      </div>
    </div>
  )
}