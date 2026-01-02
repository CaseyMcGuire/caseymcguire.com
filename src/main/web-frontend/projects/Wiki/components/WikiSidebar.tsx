import {useFragment} from "react-relay/hooks";
import {graphql, useMutation} from "react-relay";
import {WikiSidebar_wiki$data, WikiSidebar_wiki$key} from "__generated__/relay/WikiSidebar_wiki.graphql";
import * as stylex from "@stylexjs/stylex";
import {WikiSidebarFolder, WikiSidebarItem} from "projects/Wiki/models/WikiModels";
import WikiSidebarItemComponent, {HoverData} from "projects/Wiki/components/WikiSidebarItemComponent";
import {WikiStyles} from "./WikiStyles.stylex";
import {closestCenter, DndContext, DragOverEvent, PointerSensor, useSensor, useSensors} from "@dnd-kit/core";
import type {DragEndEvent} from "@dnd-kit/core/dist/types";
import {useMemo, useState} from "react";
import {WikiSidebarMutation} from "__generated__/relay/WikiSidebarMutation.graphql";

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
    width: WikiStyles.sidebarWidth,
    height: '100%',
    borderRightWidth: 1,
    borderRightStyle: "solid",
    borderRightColor: "rgb(229, 231, 235)",
    position: "fixed",
    overflowY: "scroll",
    overflowX: "hidden",
  },
})

export default function WikiSidebar(
  props: Props
) {

  const data = useFragment(
    sidebarFragment,
    props.wiki
  );

  const [commit, isInFlight] = useMutation<WikiSidebarMutation>(
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

  const onDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;
    setHoverId(null);
    console.log("Drag end:", event)
    const id = active.id.toString();
    if (over == null) {
      return
    }

    const { data } = over;
    const hoverData = data.current as HoverData;
    commit(
      {
        variables: {
          wikiId: props.wikiId,
          itemId: id,
          destinationParentFolderId: hoverData.parentFolderId,
          beforeSiblingId: hoverData.id,
          afterSiblingId: hoverData.afterId,
        },
        onCompleted: (data) => {
          const moveWikiItem = data.moveWikiItem;
          console.log(moveWikiItem);
          switch(moveWikiItem?.__typename) {
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
    setHoverId(over.id.toString())
    console.log(event)
  }

  return (
    <div {...stylex.props(styles.body)}>
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
            />
          )
        }
      </DndContext>
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

