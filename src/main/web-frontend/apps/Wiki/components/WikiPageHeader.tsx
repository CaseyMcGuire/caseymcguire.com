import * as stylex from "@stylexjs/stylex";
import {Link} from "react-router";
import {WikiStyles} from "apps/Wiki/components/WikiStyles.stylex";
import {Menu} from "lucide-react";

const styles = stylex.create({
  header: {
    width: '100%',
    height: WikiStyles.headerHeight,
    borderBottomStyle: "solid",
    backgroundColor: "rgb(255, 255, 255)",
    borderBottomWidth: 1,
    borderBottomColor: "rgb(229, 231, 235)",
    position: 'fixed',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  menuContainer: {
    marginRight: 8,
    display: {
      default: 'none',
      '@media (max-width: 600px)': 'block'
    }
  },
  menuButton: {
    borderStyle: 'none',
    backgroundColor: 'transparent',
    color: 'rgb(0, 0, 0)',
    padding: 6,
    borderRadius: 6,
    display: 'flex',
    alignItems: 'center',
    ':hover': {
      backgroundColor: 'rgba(0,0,0,0.05)',
      cursor: 'pointer',
    },
  },
  headerText: {
    fontSize: 24,
    paddingLeft: 12,
    fontWeight: 'bold'
  },
  headerLink: {
    textDecoration: 'none',
    color: 'inherit',
  },
});

type Props = {
  onMenuButtonClick?: () => void
}

export default function WikiPageHeader(props: Props) {
  return (
    <div {...stylex.props(styles.header)}>
      <Link {...stylex.props(styles.headerLink)} to={"/wiki"}>
        <span {...stylex.props(styles.headerText)}>WikiMate</span>
      </Link>
      {props.onMenuButtonClick && (
        <div {...stylex.props(styles.menuContainer)}>
          <button
            type="button"
            aria-label="Open wiki sidebar"
            {...stylex.props(styles.menuButton)}
            onClick={props.onMenuButtonClick}
          >
            <Menu size={28}/>
          </button>
        </div>
      )}
    </div>
  );
}
