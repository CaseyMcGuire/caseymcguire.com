import "ace-builds"
import * as React from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/theme-github";
import 'ace-builds/src-noconflict/mode-markdown';
import Post from "./Post";
import * as stylex from "@stylexjs/stylex";

const CONTENT_WIDTH = '750px';

const styles = stylex.create({
  postContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitButton: {
    width: CONTENT_WIDTH,
    textAlign: 'center',
    backgroundColor: '#337ab7',
    color: '#f1f1f1',
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 3,
    cursor: 'pointer',
    ':hover': {
      backgroundColor: '#2e6da4'
    }
  },
  submitButtonContainer: {
    marginTop: 8,
    marginBottom: 8
  },
  titleInput: {
    width: CONTENT_WIDTH,
    height: '25px'
  },
  editorContainer: {
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'grey',
    padding: 5,
  },
  titleContainer: {
    marginBottom: '5px'
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: 'grey',
    width: '100%',
  },
});

type Props = {
  title?: string;
  content?: string;
  onSubmit: (title: string, content: string) => void;
};

export default function PostCreationContainer(props: Props) {
  const [title, setTitle] = React.useState(props.title ?? '');
  const [content, setContent] = React.useState(props.content ?? '');

  return (
    <div {...stylex.props(styles.postContainer)}>
      <div {...stylex.props(styles.titleContainer)}>
        <input
          name="title"
          {...stylex.props(styles.titleInput)}
          type="text"
          placeholder="Title"
          onChange={e => setTitle(e.target.value)}
          value={title ?? ''}
        />
      </div>
      <div {...stylex.props(styles.editorContainer)}>
        <AceEditor
          height="500px"
          width={CONTENT_WIDTH}
          mode="markdown"
          theme="github"
          value={content ?? ''}
          onChange={(content) => setContent(content)}
          name="UNIQUE_ID_OF_DIV"
          showGutter={false}
          showPrintMargin={false}
        />
      </div>
      <div {...stylex.props(styles.submitButtonContainer)}>
        <SubmitButton onClick={() => props.onSubmit(title, content)} />
      </div>
      <div {...stylex.props(styles.divider)} />
      {title.length > 0 || content.length > 0 ? (
        <Post title={title} contents={content} />
      ) : null}
    </div>
  );
}

function SubmitButton(props: { onClick: () => void }) {
  return (
    <div {...stylex.props(styles.submitButton)} onClick={props.onClick}>
      Submit
    </div>
  );
}