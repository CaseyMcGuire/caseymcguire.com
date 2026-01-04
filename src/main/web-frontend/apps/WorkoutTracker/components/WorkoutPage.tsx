import * as React from "react";
import { Suspense } from "react";
import * as stylex from "@stylexjs/stylex";
import WorkoutSidebar, {
  WorkoutSidebarMenuId,
} from "./WorkoutSidebar";
import WorkoutTrackerButton from "./WorkoutTrackerButton";
import { useNavigate } from "react-router";
import { WorkoutStyles } from "./WorkoutStyles.stylex";

type Props = {
  children: React.ReactNode;
  title?: string;
  titleLink?: string;
  selectedMenuItemId: WorkoutSidebarMenuId;
};

const styles = stylex.create({
  pageContainer: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "rgb(249 250 251)",
    height: "100%",
  },
  contentsContainer: {
    display: "flex",
    height: "100%",
    width: "100%",
    marginLeft: WorkoutStyles.sidebarWidth,
    justifyContent: "center",
  },
  contents: {
    width: "100%",
    padding: 32,
    maxWidth: 1208,
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: 700,
  },
});

export default function WorkoutPage(props: Props) {
  return (
    <div {...stylex.props(styles.pageContainer)}>
      <WorkoutSidebar selectedMenuItemId={props.selectedMenuItemId} />
      <div {...stylex.props(styles.contentsContainer)}>
        <div {...stylex.props(styles.contents)}>
          <Suspense fallback={<div>Loading</div>}>
            {props.title && (
              <WorkoutTrackerPageHeader
                title={props.title}
                link={props.titleLink}
              />
            )}
            {props.children}
          </Suspense>
        </div>
      </div>
    </div>
  );
}

type WorkoutPageHeaderProps = {
  title: string;
  link?: string | null;
};

function WorkoutTrackerPageHeader(props: WorkoutPageHeaderProps) {
  const navigate = useNavigate();
  const { link } = props;

  return (
    <div {...stylex.props(styles.titleContainer)}>
      <span {...stylex.props(styles.title)}>{props.title}</span>
      {link && (
        <WorkoutTrackerButton
          text={"Create Exercise"}
          onClick={() => navigate(link)}
        />
      )}
    </div>
  );
}

