import {WikiSidebarFolder, WikiSidebarItem, WikiSidebarPage} from "apps/Wiki/models/WikiModels";
import React, {useEffect, useState} from "react";
import * as stylex from "@stylexjs/stylex";
import WikiChevronIcon from "apps/Wiki/components/WikiChevronIcon";
import {useNavigate} from "react-router";
import {CSS} from '@dnd-kit/utilities';
import {useDraggable, useDroppable} from "@dnd-kit/core";
import WikiSidebarItemName from "apps/Wiki/components/WikiSidebarItemName";
import WikiFolderActionsButton from "apps/Wiki/components/WikiFolderActionsButton";
import WikiPageActionsButton from "apps/Wiki/components/WikiPageActionsButton";

type CommonProps = {
  selectedId: string | null,
  parentFolderId: string,
  beforeId: string | null | undefined,
  afterId: string | null | undefined,
  editModeEnabled: boolean,
  onNavigate?: () => void,
}

type WikiSidebarFolderProps = {
  folder: WikiSidebarFolder,
} & CommonProps

type WikiSidebarPageProps = {
  page: WikiSidebarPage,
} & CommonProps

type WikiSidebarItemProps = {
  item: WikiSidebarItem,
} & CommonProps

export type HoverData = {
  type: 'page' | 'folder',
  name: string,
  id: string,
  parentFolderId: string,
  afterId: string | null | undefined,
  beforeId: string | null | undefined,
  childrenIds?: string[],
  isOpen?: boolean
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
    height: 36
  },
  children: {
    display: 'none'
  },
  hoverItem: {
    borderBottomWidth: '2px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'rgb(229, 231, 235)',
  },
  hoverEmptyFolder: {
    backgroundColor: 'rgb(229, 231, 235)'
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  }
})

export default function WikiSidebarItemComponent(props: WikiSidebarItemProps) {
  switch (props.item.type) {
    case "WikiSidebarPage":
      return <WikiSidebarPageComponent
        page={props.item}
        parentFolderId={props.parentFolderId}
        selectedId={props.selectedId}
        beforeId={props.beforeId}
        afterId={props.afterId}
        editModeEnabled={props.editModeEnabled}
        onNavigate={props.onNavigate}
      />;
    case "WikiSidebarFolder":
      return <WikiSidebarFolderComponent
        folder={props.item}
        parentFolderId={props.parentFolderId}
        selectedId={props.selectedId}
        beforeId={props.beforeId}
        afterId={props.afterId}
        editModeEnabled={props.editModeEnabled}
        onNavigate={props.onNavigate}
      />;
    default:
      return null;
  }
}


function WikiSidebarPageComponent(props: WikiSidebarPageProps) {
  const page = props.page;
  const wikiId = props.page.wikiId;
  const navigate = useNavigate();
  const onClick = () => {
    navigate(`/wiki/${wikiId}/${page.id}`);
    props.onNavigate?.();
  };

  const data: HoverData = {
    type: 'page',
    id: page.id,
    name: page.name,
    parentFolderId: props.parentFolderId,
    afterId: props.afterId,
    beforeId: props.beforeId,
  };

  const args = {
    id: page.id,
    data,
    disabled: !props.editModeEnabled
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
      {...stylex.props(
        styles.item,
        isHovering && styles.hoverItem,
      )}
      {...listeners}
      {...attributes}
    >
      <WikiSidebarItemName
        id={page.id}
        name={page.name}
        isEditable={props.editModeEnabled}
      />
      {
        props.editModeEnabled &&
          <WikiPageActionsButton
              pageId={page.id}
              pageName={page.name}
          />
      }
    </div>
  )
}

function WikiSidebarFolderComponent(props: WikiSidebarFolderProps) {
  const folder = props.folder;
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);


  const data: HoverData = {
    type: 'folder',
    id: folder.id,
    name: folder.name,
    parentFolderId: props.parentFolderId,
    afterId: props.afterId,
    beforeId: props.beforeId,
    childrenIds: folder.children.map(child => child.id),
    isOpen: isOpen
  };

  const args = {
    id: folder.id,
    data,
    disabled: !props.editModeEnabled
  };

  const droppable = useDroppable(args);
  const draggable = useDraggable(args);
  const {attributes, listeners, transform} = draggable;
  const style = {
    transform: CSS.Translate.toString(transform),
  };

  const isHovering = !draggable.isDragging && props.selectedId === folder.id;
  const isEmpty = folder.children.length === 0;

  useEffect(() => {
    if (draggable.isDragging && isOpen) {
      setIsOpen(false);
    }
  }, [draggable.isDragging, isOpen]);


  return (
    <div>
      <div
        {...stylex.props(
          styles.item,
          (isHovering && !isEmpty) && styles.hoverItem,
          (isHovering && (isEmpty || isOpen)) && styles.hoverEmptyFolder,
        )}
        onClick={toggleOpen}
        ref={(node) => {
          draggable.setNodeRef(node);
          droppable.setNodeRef(node);
        }}
        style={style}
        {...attributes}
        {...listeners}
      >
        <WikiSidebarItemName
          id={folder.id}
          name={folder.name}
          isEditable={props.editModeEnabled}
        />
        <div {...stylex.props(styles.actions)}>
          <WikiChevronIcon isOpen={isOpen}/>
          {props.editModeEnabled &&
              <WikiFolderActionsButton
                  folderId={folder.id}
                  isFolderEmpty={isEmpty}
              />
          }
        </div>
      </div>
      <div {...stylex.props(
        styles.container,
        !isOpen && styles.children
      )}>
        {
          folder.children.map((item, index) => (
            <WikiSidebarItemComponent
              key={item.id}
              item={item}
              parentFolderId={folder.id}
              selectedId={props.selectedId}
              afterId={folder.children.at(index + 1)?.id}
              beforeId={folder.children.at(index - 1)?.id}
              editModeEnabled={props.editModeEnabled}
              onNavigate={props.onNavigate}
            />
          ))
        }
      </div>
    </div>
  )
}
