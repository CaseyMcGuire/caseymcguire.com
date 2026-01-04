import * as React from "react";
import { Dumbbell, LayoutDashboard, LucideIcon, Plus } from "lucide-react";
import { Link } from "react-router";
import * as stylex from "@stylexjs/stylex";
import {WorkoutStyles} from "./WorkoutStyles.stylex";


export enum WorkoutSidebarMenuId {
  DASHBOARD,
  WORKOUT,
  EXERCISES,
  HISTORY,
}

const sidebarStyles = stylex.create({
  body: {
    backgroundColor: "rgb(255, 255, 255)",
    height: "100%",
    width: WorkoutStyles.sidebarWidth,
    borderRightWidth: 1,
    borderRightStyle: "solid",
    borderRightColor: "rgb(229, 231, 235)",
    position: "fixed",
    overflowY: "scroll",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: "rgb(229, 231, 235)",
  },
  headerTitle: {
    marginLeft: 8,
    fontSize: 20,
    fontWeight: 700,
  },
  menuItemsContainer: {
    padding: "16px 0px",
  },
});

type WorkoutSidebarProps = {
  selectedMenuItemId: WorkoutSidebarMenuId;
};

export default function WorkoutSidebar(props: WorkoutSidebarProps) {
  return (
    <div {...stylex.props(sidebarStyles.body)}>
      <div {...stylex.props(sidebarStyles.header)}>
        <Dumbbell size={"2rem"} color="rgb(59, 130, 246)" />
        <div {...stylex.props(sidebarStyles.headerTitle)}>FitTrack</div>
      </div>
      <div {...stylex.props(sidebarStyles.menuItemsContainer)}>
        {MENU_ITEMS.map(item => (
          <WorkoutSidebarMenuItem
            key={item.id}
            {...item}
            isSelected={item.id === props.selectedMenuItemId}
          />
        ))}
      </div>
    </div>
  );
}

type MenuItemConfig = {
  text: string;
  icon: LucideIcon;
  link: string;
  id: WorkoutSidebarMenuId;
};

const MENU_ITEMS: MenuItemConfig[] = [
  {
    text: "Dashboard",
    icon: LayoutDashboard,
    link: "/workout_tracker",
    id: WorkoutSidebarMenuId.DASHBOARD,
  },
  {
    text: "New Workout",
    icon: Plus,
    link: "/workout_tracker/workout/create",
    id: WorkoutSidebarMenuId.WORKOUT,
  },
  {
    text: "Exercises",
    icon: Dumbbell,
    link: "/workout_tracker/exercise",
    id: WorkoutSidebarMenuId.EXERCISES,
  },
  {
    text: "History",
    icon: Dumbbell,
    link: "/workout_tracker/workout/history",
    id: WorkoutSidebarMenuId.HISTORY,
  },
];

type MenuItemProps = {
  text: string;
  isSelected: boolean;
  icon: LucideIcon;
  link: string;
};

const menuItemStyles = stylex.create({
  menuItemContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    margin: "0px 8px",
    padding: "12px 16px",
    borderRadius: 6,
  },
  menuItemContainerNotSelected: {
    ":hover": {
      backgroundColor: "rgba(0, 0, 0, 0.05)",
    },
  },
  menuItemContainerSelected: {
    backgroundColor: "rgb(219, 234, 254)",
    ":hover": {
      backgroundColor: "rgb(197, 211, 229)",
    },
  },
  link: {
    textDecorationLine: "none",
  },
  menuItemText: {
    marginLeft: 12,
    fontSize: ".875rem",
    fontWeight: 500,
    color: "rgb(107, 114, 128)",
  },
  menuItemTextSelected: {
    color: "rgb(29, 78, 216)",
  },
});

function WorkoutSidebarMenuItem(props: MenuItemProps) {
  const color = props.isSelected
    ? "rgb(29, 78, 216)"
    : "rgb(107, 114, 128)";

  return (
    <Link {...stylex.props(menuItemStyles.link)} to={props.link}>
      <div
        {...stylex.props(
          menuItemStyles.menuItemContainer,
          props.isSelected
            ? menuItemStyles.menuItemContainerSelected
            : menuItemStyles.menuItemContainerNotSelected,
        )}
      >
        <props.icon color={color} size={24} />
        <div
          {...stylex.props(
            menuItemStyles.menuItemText,
            props.isSelected && menuItemStyles.menuItemTextSelected,
          )}
        >
          {props.text}
        </div>
      </div>
    </Link>
  );
}

