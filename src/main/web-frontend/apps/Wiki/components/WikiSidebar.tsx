import {readInlineData} from "react-relay/hooks";
import {graphql, useMutation} from "react-relay";
import {WikiSidebarFragment_wiki$data, WikiSidebarFragment_wiki$key} from "__generated__/relay/WikiSidebarFragment_wiki.graphql";
import * as stylex from "@stylexjs/stylex";
import {WikiSidebarFolder, WikiSidebarItem} from "apps/Wiki/models/WikiModels";
import WikiSidebarItemComponent, {HoverData} from "apps/Wiki/components/WikiSidebarItemComponent";
import {WikiStyles} from "./WikiStyles.stylex";
import {closestCenter, DndContext, DragOverEvent, PointerSensor, useSensor, useSensors} from "@dnd-kit/core";
import type {DragEndEvent} from "@dnd-kit/core/dist/types";
import React, {useContext, useMemo, useRef, useState} from "react";
import {WikiSidebarMutation, WikiSidebarMutation$variables} from "__generated__/relay/WikiSidebarMutation.graphql";
import UserContext from "components/context/UserContext";
import Button from "components/buttons/Button";
import WikiSidebarMenuFlyout, {WikiSidebarMenuFlyoutItem} from "apps/Wiki/components/WikiSidebarMenuFlyout";
import {Folder, Menu, StickyNote, ToggleLeft, ToggleRight} from "lucide-react";
import {
  WikiSidebarCreatePageMutation,
} from "__generated__/relay/WikiSidebarCreatePageMutation.graphql";
import {WikiSidebarCreateFolderMutation} from "__generated__/relay/WikiSidebarCreateFolderMutation.graphql";
import AdminComponentGating from "components/gating/AdminComponentGating";
import {useOnClickOutside} from "usehooks-ts";
import {createWikiNavigationModel, sidebarFragment} from "apps/Wiki/components/WikiSidebarFragment";

type Props = {
  wikiId: string,
  wiki: WikiSidebarFragment_wiki$key | null | undefined;
  mobileOpen: boolean,
  onRequestClose: () => void,
}


const styles = stylex.create({
  mobileOverlay: {
    display: {
      default: 'none',
      '@media (max-width: 600px)': 'block'
    },
    position: 'fixed',
    top: WikiStyles.headerHeight,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    opacity: 0,
    pointerEvents: 'none',
    transitionProperty: 'opacity',
    transitionDuration: '0.3s',
    zIndex: 1,
  },
  mobileOverlayVisible: {
    opacity: 1,
    pointerEvents: 'all',
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    width: WikiStyles.sidebarWidth,
    borderRightWidth: 1,
    borderRightStyle: "solid",
    borderRightColor: WikiStyles.borderColor,
    position: "fixed",
    top: WikiStyles.headerHeight,
    bottom: 0,
    zIndex: 2,
    left: 0,
    transitionProperty: 'transform',
    transitionDuration: '0.35s',
    '@media (max-width: 600px)': {
      right: 0,
      left: 'auto',
      width: '75%',
      maxWidth: 320,
      borderLeftWidth: 1,
      borderLeftStyle: "solid",
      borderLeftColor: WikiStyles.borderColor,
      borderRightWidth: 0,
      transform: 'translateX(100%)',
      pointerEvents: 'none',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.18)',
      backgroundColor: 'white',
    }
  },
  bodyMobileOpen: {
    '@media (max-width: 600px)': {
      transform: 'translateX(0)',
      pointerEvents: 'auto',
    }
  },
  content: {
    flexGrow: 1,
    minHeight: 0,
    overflowY: "scroll",
    overflowX: "hidden",
  },
  bottomContainer: {
    height: 60,
    display: 'flex',
    justifyContent: 'center',
    padding: '12px',
    borderTopStyle: 'solid',
    borderTopColor: WikiStyles.borderColor,
    borderTopWidth: 1,
    position: 'relative',
  }
})

export default function WikiSidebar(
  props: Props
) {

  const data = readInlineData(
    sidebarFragment,
    props.wiki
  );

  const [commitMoveWikiItem, isMoveWikiItemInFlight] = useMutation<WikiSidebarMutation>(
    graphql`
      mutation WikiSidebarMutation(
        $wikiId: ID!,
        $itemId: ID!,
        $destinationParentFolderId: ID!,
        $beforeSiblingId: ID,
        $afterSiblingId: ID) {
        moveWikiItem(
          wikiId: $wikiId,
          itemId: $itemId,
          destinationParentFolderId: $destinationParentFolderId,
          beforeSiblingId: $beforeSiblingId,
          afterSiblingId: $afterSiblingId
        ) {
          __typename
          ... on SuccessfulMoveWikiItemResponse {
            wiki {
              ...WikiSidebarFragment_wiki
            }
          }
          ... on FailedWikiResponse {
            userFacingErrorMessage
          }
        }
      }
    `
  )

  const [commitCreatePage, isInFlightCreatePage] = useMutation<WikiSidebarCreatePageMutation>(
    graphql`
      mutation WikiSidebarCreatePageMutation($wikiId: ID!, $pageName: String!) {
        createWikiPage(wikiId: $wikiId, pageName: $pageName) {
          __typename
          ... on SuccessfulCreateWikiPageResponse {
            wikiPage {
              id
              name
            }
            wiki {
              ...WikiSidebarFragment_wiki
            }
          }
          ... on FailedWikiResponse {
            userFacingErrorMessage
          }
        }
      }
    `
  )

  const [commitCreateFolder, isInFlightCreateFolder] = useMutation<WikiSidebarCreateFolderMutation>(
    graphql`
      mutation WikiSidebarCreateFolderMutation($wikiId: ID!, $folderName: String!) {
        createWikiFolder(wikiId: $wikiId, folderName: $folderName) {
          __typename
          ... on SuccessfulCreateWikiFolderResponse {
            wikiFolder {
              id
              name
            }
            wiki {
              ...WikiSidebarFragment_wiki
            }
          }
          ... on FailedWikiResponse {
            userFacingErrorMessage
          }
        }
      }
    `
  )
  const [sidebarEditingEnabled, setSidebarEditingEnabled] = useState<boolean>(false);

  const items: WikiSidebarMenuFlyoutItem[] = [
    {
      text: "New Page",
      icon: StickyNote,
      onClick: () => {
        setMenuOpen(false);
        commitCreatePage({
          variables: {
            wikiId: props.wikiId,
            pageName: "New Page"
          },
          onCompleted: (response) => {
            switch (response.createWikiPage.__typename) {
              case "SuccessfulCreateWikiPageResponse":
                console.log("success")
                break;
              case "FailedWikiResponse":
                console.error("failure")
            }
          }
        })
      }
    },
    {
      text: "New Folder",
      icon: Folder,
      onClick: () => {
        setMenuOpen(false);
        commitCreateFolder({
          variables: {
            wikiId: props.wikiId,
            folderName: "New Folder"
          },
          onCompleted: (response) => {
            switch (response.createWikiFolder.__typename) {
              case "SuccessfulCreateWikiFolderResponse":
                console.log("success");
                break;
              case "FailedWikiResponse":
                console.error("failure")
                break;
            }
          }
        })
      }
    },
    {
      text: sidebarEditingEnabled ? "Disable Sidebar Editing" : "Enable Sidebar Editing",
      icon: sidebarEditingEnabled ? ToggleRight : ToggleLeft,
      onClick: () => {
        setSidebarEditingEnabled(!sidebarEditingEnabled);
      }
    }
  ]

  const isRequestInFlight = isInFlightCreatePage || isInFlightCreateFolder || isMoveWikiItemInFlight;

  if (data == null) {
    return null;
  }

  const rootFolder = useMemo(
    () => (data ? createWikiNavigationModel(data) : null),
    [data]
  );
  const sensors = useSensors(
    useSensor(
      PointerSensor,
      {
        activationConstraint: {
          distance: 5,
        },
      })
  );

  if (rootFolder == null) {
    return null;
  }

  const [hoverId, setHoverId] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const onDragEnd = (event: DragEndEvent) => {
    const {over, active} = event;
    setHoverId(null);
    const id = active.id.toString();
    if (over == null || active.id === over.id) {
      return
    }

    const {data} = over;
    const hoverData = data.current as HoverData;

    const dropInsideFolder = hoverData.type === "folder" && (hoverData.childrenIds?.length === 0 || hoverData.isOpen === true);

    const variables: WikiSidebarMutation$variables = (() => {
      if (dropInsideFolder) {
        return {
          wikiId: props.wikiId,
          itemId: id,
          destinationParentFolderId: hoverData.id,
          beforeSiblingId: null,
          afterSiblingId: hoverData.childrenIds?.at(0)
        }
      } else {
        return {
          wikiId: props.wikiId,
          itemId: id,
          destinationParentFolderId: hoverData.parentFolderId,
          beforeSiblingId: hoverData.id,
          afterSiblingId: hoverData.afterId,
        }
      }
    })();

    commitMoveWikiItem(
      {
        variables,
        onCompleted: (data) => {
          const moveWikiItem = data.moveWikiItem;
          switch (moveWikiItem?.__typename) {
            case "SuccessfulMoveWikiItemResponse":
              console.log("success")
              break;
            case "FailedWikiResponse":
              console.error("failure")
              break;
          }
        },
        onError: (error) => {
          console.error(error)
        }
      }
    )
  }

  const onDragOver = (event: DragOverEvent) => {
    const {over} = event;

    if (over == null) {
      return;
    }
    const hoverData = over.data.current as HoverData;
    setHoverId(hoverData.id)
  }

  const handleClickOutside = () => {
    setMenuOpen(false);
  }

  const ref = useRef<HTMLElement>(null) as React.RefObject<HTMLDivElement>;
  useOnClickOutside(ref, handleClickOutside)
  const context = useContext(UserContext);
  const isAdmin = context.user?.isAdmin == true;
  return (
    <>
      <div
        {...stylex.props(
          styles.mobileOverlay,
          props.mobileOpen && styles.mobileOverlayVisible
        )}
        onClick={props.onRequestClose}
      />
      <div {...stylex.props(styles.body, props.mobileOpen && styles.bodyMobileOpen)}>
        <div {...stylex.props(styles.content)}>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={onDragEnd}
            onDragOver={onDragOver}
          >
            {
              rootFolder.children.map((child, index) =>
                <WikiSidebarItemComponent
                  key={child.id}
                  item={child}
                  parentFolderId={rootFolder.id}
                  selectedId={hoverId}
                  afterId={rootFolder.children.at(index + 1)?.id}
                  beforeId={rootFolder.children.at(index - 1)?.id}
                  editModeEnabled={!isRequestInFlight && isAdmin && sidebarEditingEnabled}
                  onNavigate={props.onRequestClose}
                />
              )
            }
          </DndContext>
        </div>

        <div {...stylex.props(styles.bottomContainer)}>
          <WikiSidebarMenuFlyout ref={ref} items={items} visible={menuOpen}/>
          <AdminComponentGating>
            <Button
              state={isRequestInFlight ? 'loading' : 'active'}
              text={"Menu"}
              icon={Menu}
              style={'dark'}
              onClick={() => {
                setMenuOpen(!menuOpen)
              }
              }
            />
          </AdminComponentGating>
        </div>
      </div>
    </>
  );
}