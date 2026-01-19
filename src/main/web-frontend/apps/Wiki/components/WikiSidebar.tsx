import {useFragment} from "react-relay/hooks";
import {graphql, useMutation} from "react-relay";
import {WikiSidebar_wiki$data, WikiSidebar_wiki$key} from "__generated__/relay/WikiSidebar_wiki.graphql";
import * as stylex from "@stylexjs/stylex";
import {WikiSidebarFolder, WikiSidebarItem} from "apps/Wiki/models/WikiModels";
import WikiSidebarItemComponent, {HoverData} from "apps/Wiki/components/WikiSidebarItemComponent";
import {WikiStyles} from "./WikiStyles.stylex";
import {closestCenter, DndContext, DragOverEvent, PointerSensor, useSensor, useSensors} from "@dnd-kit/core";
import type {DragEndEvent} from "@dnd-kit/core/dist/types";
import {useContext, useMemo, useRef, useState} from "react";
import {WikiSidebarMutation, WikiSidebarMutation$variables} from "__generated__/relay/WikiSidebarMutation.graphql";
import UserContext from "components/context/UserContext";
import Button from "components/buttons/Button";
import WikiSidebarMenuFlyout, {WikiSidebarMenuFlyoutItem} from "apps/Wiki/components/WikiSidebarMenuFlyout";
import {Folder, Plus, StickyNote} from "lucide-react";
import {
  WikiSidebarCreatePageMutation,
} from "__generated__/relay/WikiSidebarCreatePageMutation.graphql";
import {WikiSidebarCreateFolderMutation} from "__generated__/relay/WikiSidebarCreateFolderMutation.graphql";
import AdminComponentGating from "components/gating/AdminComponentGating";
import {useOnClickOutside} from "usehooks-ts";

type Props = {
  wikiId: string,
  wiki: WikiSidebar_wiki$key | null | undefined;
}

const sidebarFragment =
  graphql`
    fragment WikiSidebar_wiki on GqlWiki {
      name
      rootFolder {
        id
        name
        children {
          __typename
          ... on GqlWikiFolder {
            id
            name
            children {
              __typename
              ... on GqlWikiFolder {
                id
                name
                # We only allow two levels of nesting 
                children {
                  ... on GqlWikiPage {
                    id
                    name
                  }
                }
              }
              ... on GqlWikiPage {
                id
                name
              }
            }
          }
          ... on GqlWikiPage {
            id
            name
          }
        }
      }
    }
  `;


const styles = stylex.create({
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

  const data = useFragment(
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
              ...WikiSidebar_wiki
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
              ...WikiSidebar_wiki
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
              ...WikiSidebar_wiki
            }
          }
          ... on FailedWikiResponse {
            userFacingErrorMessage
          }
        }
      }
    `
  )

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
    }
  ]

  const isRequestInFlight = isInFlightCreatePage || isInFlightCreateFolder || isMoveWikiItemInFlight;

  if (data == null) {
    return null;
  }

  const rootFolder = useMemo(
    () => (data ? createWikiSidebar(data) : null),
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

  const ref = useRef(null);
  useOnClickOutside(ref, handleClickOutside)
  const context = useContext(UserContext);
  const isAdmin = context.user?.isAdmin == true;
  return (
    <div {...stylex.props(styles.body)}>
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
                dragDisabled={isRequestInFlight || !isAdmin}
              />
            )
          }
        </DndContext>
      </div>

      <div {...stylex.props(styles.bottomContainer)}>
        <WikiSidebarMenuFlyout reference={ref} items={items} visible={menuOpen}/>
        <AdminComponentGating>
          <Button
            state={isRequestInFlight ? 'loading' : 'active'}
            text={"New"}
            icon={Plus}
            style={'dark'}
            onClick={() => {
              setMenuOpen(!menuOpen)
            }
            }
          />
        </AdminComponentGating>
      </div>
    </div>
  );
}

function createWikiSidebar(data: WikiSidebar_wiki$data): WikiSidebarFolder | null {
  const wikiName = data.name;
  const rootFolder = data.rootFolder;
  const rootChildren: Array<WikiSidebarItem> = [];
  rootFolder?.children?.forEach(child => {
    if (child.__typename === "GqlWikiPage") {
      const rootId = child.id;
      const rootName = child.name;

      if (rootId == null || rootName == null) {
        return;
      }

      rootChildren.push({
        type: "WikiSidebarPage",
        id: rootId,
        name: rootName,
        wikiName
      })
    } else if (child.__typename === "GqlWikiFolder") {
      const rootId = child.id;
      const rootName = child.name;

      if (rootId == null || rootName == null) {
        return;
      }

      const folderChildren: Array<WikiSidebarItem> = []
      child.children?.forEach(nestedChild => {
        if (nestedChild.__typename === "GqlWikiPage") {
          const nestedChildId = nestedChild.id;
          const nestedChildName = nestedChild.name;

          if (nestedChildId == null || nestedChildName == null) {
            return;
          }

          folderChildren.push({
            type: "WikiSidebarPage",
            id: nestedChildId,
            name: nestedChildName,
            wikiName
          })

        } else if (nestedChild.__typename === "GqlWikiFolder") {
          const nestedChildId = nestedChild.id;
          const nestedChildName = nestedChild.name;
          if (nestedChildId == null || nestedChildName == null) {
            return;
          }

          const grandChildPages: Array<WikiSidebarItem> = [];
          nestedChild.children?.forEach(grandChildPage => {
            const grandChildId = grandChildPage.id;
            const grandChildName = grandChildPage.name;
            if (grandChildId == null || grandChildName == null) {
              return;
            }

            grandChildPages.push({
              id: grandChildId,
              name: grandChildName,
              type: "WikiSidebarPage",
              wikiName
            })
          });

          folderChildren.push(
            {
              type: "WikiSidebarFolder",
              id: nestedChildId,
              name: nestedChildName,
              children: grandChildPages,
              wikiName
            }
          )
        }
      })

      rootChildren.push({
        type: "WikiSidebarFolder",
        id: rootId,
        name: rootName,
        children: folderChildren,
        wikiName
      })
    }

  });

  const id = data.rootFolder?.id;
  const name = data.rootFolder?.name;

  if (id == null || name == null) {
    return null;
  }

  return {
    type: "WikiSidebarFolder",
    id,
    name,
    children: rootChildren,
    wikiName
  }
}
