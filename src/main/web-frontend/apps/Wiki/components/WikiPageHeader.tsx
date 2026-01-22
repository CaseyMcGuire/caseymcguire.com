import * as stylex from "@stylexjs/stylex";
import {Link} from "react-router";
import {WikiStyles} from "./WikiStyles.stylex";

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
  },
  headerText: {
    fontSize: 24,
    paddingLeft: 12,
    fontWeight: 'bold'
  },
  container: {
    paddingTop: WikiStyles.headerHeight
  },
  linkContainer: {
    marginLeft: 24,
  },
  links: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    listStyleType: 'none'
  },
  linkListItem: {
    marginInline: 8,
  },
  link: {
    textDecoration: 'none',
  },
  linkText: {
    fontSize: 16,
    color: 'rgb(100,102,104)',
    ':hover': {
      color: 'rgb(100,102,104,0.8)',
    }
  }
});

type HeaderLink = {
  name: string,
  link: string
}

type Props = {
  links?: HeaderLink[]
}

export default function WikiPageHeader(props: Props) {
  return (
    <div {...stylex.props(styles.header)}>
      <span {...stylex.props(styles.headerText)}>WikiMate</span>
      <div {...stylex.props(styles.linkContainer)}>
        <ul {...stylex.props(styles.links)}>
          {props.links?.map((link, index) => {
            return (
              <li {...stylex.props(styles.linkListItem)} key={index}>
                <Link {...stylex.props(styles.link)} to={link.link}>
                  <span {...stylex.props(styles.linkText)}>{link.name}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  );
}