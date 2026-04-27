import * as React from "react";
import {HTMLAttributes, ReactNode} from "react";
import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  container: {
    width: '100%',
    maxWidth: '100%',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: '#6A6A6A',
    marginBottom: 32,
    paddingBottom: 12,
  },
  titleContainer: {
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: '#CCCCCC',
    marginBottom: 24,
  },
  contents: {
    padding: '0px 5px',
  },
});

type PostShellProps = {
  children: ReactNode,
};

type TitleProps = {
  children: ReactNode,
};

type ContentsProps = HTMLAttributes<HTMLDivElement>;

function PostShell(props: PostShellProps) {
  const {children} = props;
  return <div sx={styles.container}>{children}</div>;
}

function Title(props: TitleProps) {
  const {children} = props;
  return <div sx={styles.titleContainer}>{children}</div>;
}

function Contents(props: ContentsProps) {
  const {children, ...rest} = props;
  return <div sx={styles.contents} {...rest}>{children}</div>;
}

PostShell.Title = Title;
PostShell.Contents = Contents;

export default PostShell;
