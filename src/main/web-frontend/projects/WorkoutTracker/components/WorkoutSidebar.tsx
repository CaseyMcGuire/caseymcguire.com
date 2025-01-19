import * as React from "react";
import {createUseStyles} from "react-jss";
import {Dumbbell, LayoutDashboard, LucideIcon, Plus} from "lucide-react";
import {combineClasses} from "utils/CssUtils";
import {Link} from "react-router";

export const SIDEBAR_WIDTH = '256px';

export enum WorkoutSidebarMenuId {
  DASHBOARD,
  WORKOUT,
  EXERCISES,
  HISTORY
}

const useStyles = createUseStyles({
  body: {
    backgroundColor: 'rgb(255, 255, 255)',
    height: '100%',
    width: SIDEBAR_WIDTH,
    borderRight: 'solid 1px rgb(229, 231, 235)',
    position: 'fixed',
    overflowY: 'scroll'
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '16',
    borderBottom: 'solid 1px rgb(229, 231, 235)'
  },
  headerTitle: {
    marginLeft: '8px',
    fontSize: '20px',
    fontWeight: '700'
  },
  menuItemsContainer: {
    padding: '16px 0px'
  }
});

type WorkoutSidebarProps = {
  selectedMenuItemId: WorkoutSidebarMenuId
}

export default function WorkoutSidebar(props: WorkoutSidebarProps) {
  const styles = useStyles();
  return (
    <div className={styles.body}>
      <div className={styles.header}>
        <Dumbbell size={"2rem"} color="rgb(59, 130, 246)"/>
        <div className={styles.headerTitle}>FitTrack</div>
      </div>
      <div className={styles.menuItemsContainer}>
        {
          MENU_ITEMS.map((item) => {
            return <WorkoutSidebarMenuItem
              {...item}
              isSelected={item.id == props.selectedMenuItemId}
            />
          })
        }
      </div>
    </div>
  )
}

type MenuItemConfig = {
  text: string,
  icon: LucideIcon,
  link: string,
  id: WorkoutSidebarMenuId
}

const MENU_ITEMS: MenuItemConfig[] = [
  {
    text: "Dashboard",
    icon: LayoutDashboard,
    link: "/workout_tracker",
    id: WorkoutSidebarMenuId.DASHBOARD
  },
  {
    text: "New Workout",
    icon: Plus,
    link: "/workout_tracker/workout/create",
    id: WorkoutSidebarMenuId.WORKOUT
  },
  {
    text: "Exercises",
    icon: Dumbbell,
    link: "/workout_tracker/exercise",
    id: WorkoutSidebarMenuId.EXERCISES
  },
  {
    text: "History",
    icon: Dumbbell,
    link: "/workout_tracker/workout/history",
    id: WorkoutSidebarMenuId.HISTORY
  }
]

type MenuItemProps = {
  text: string,
  isSelected: boolean,
  icon: LucideIcon,
  link: string,
}

const useMenuItemStyles = createUseStyles({
  menuItemContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: '0px 8px',
    padding: '12px 16px',
    borderRadius: '6px'
  },
  menuItemContainerNotSelected: {
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.05)'
    }
  },
  menuItemContainerSelected: {
    backgroundColor: 'rgb(219, 234, 254)',
    '&:hover': {
      backgroundColor: 'rgb(197, 211, 229)'
    }
  },
  link: {
    textDecoration: 'none'
  },
  menuItemText: {
    marginLeft: '12px',
    fontSize: '.875rem',
    fontWeight: '500',
    color: 'rgb(107, 114, 128)'
  },
  menuItemTextSelected: {
    color: 'rgb(29, 78, 216)'
  }
})

function WorkoutSidebarMenuItem(props: MenuItemProps) {
  const styles = useMenuItemStyles();

  const containerClasses = combineClasses([
    {
      className: styles.menuItemContainer,
      include: true
    },
    {
      className: styles.menuItemContainerSelected,
      include: props.isSelected
    },
    {
      className: styles.menuItemContainerNotSelected,
      include: !props.isSelected
    }
  ]);

  const textClass = combineClasses([
    {
      className: styles.menuItemText,
      include: true
    },
    {
      className: styles.menuItemTextSelected,
      include: props.isSelected
    }
  ]);

  const color = props.isSelected ? "rgb(29, 78, 216)" : "rgb(107, 114, 128)"

  return (
    <Link className={styles.link} to={props.link}>
      <div className={containerClasses}>
        <props.icon color={color} size={24} />
        <div className={textClass}>{props.text}</div>
      </div>
    </Link>
  )
}

