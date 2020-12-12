import "ace-builds"
import * as React from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/theme-github";
import 'ace-builds/src-noconflict/mode-markdown';
import {useState} from "react";
import Post from "../Post";
import {createUseStyles} from "react-jss";

const CONTENT_WIDTH = '750px';

const getStyles = createUseStyles({
  postContainer: {
    flexDirection: 'column',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitButton: {
    width: CONTENT_WIDTH,
    textAlign: 'center',
    backgroundColor: '#337ab7',
    color: '#f1f1f1',
    padding: '5px 0px',
    borderRadius: '3px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#2e6da4'
    }
  },
  submitButtonContainer: {
    margin: '5px 0'
  },
  titleInput: {
    width: CONTENT_WIDTH,
    height: '25px'
  },
  editorContainer: {
    borderRadius: '4px',
    border: 'solid grey 1px',
    padding: '5px'
  },
  titleContainer: {
    marginBottom: '5px'
  },
  divider: {
    borderBottom: '1px grey solid',
    width: '100%'
  }
});

type Props = {
  title?: string,
  content?: string,
  onSubmit: (title: string, content: string) => void
};

export default function PostCreationContainer(props: Props) {

  const [title, setTitle] = useState(props.title ?? '');
  const [content, setContent] = useState(props.content ?? '');
  const styles = getStyles();

  return (
    <div className={styles.postContainer}>
      <div className={styles.titleContainer}>
      <input name="title"
             className={styles.titleInput}
             type="text"
             placeholder="Title"
             onChange={(e) => setTitle(e.target.value)}
             value={title ?? ''}/>
      </div>
      <div className={styles.editorContainer}>
        <AceEditor
          height={'500px'}
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
      <div className={styles.submitButtonContainer}>
        <SubmitButton onClick={() => props.onSubmit(title, content)}/>
      </div>
      <div className={styles.divider} />
      {title.length > 0 || content.length > 0 ?
        <Post title={title} contents={content}/>
        : null}

    </div>
  );
}

function SubmitButton(props: { onClick: () => void }) {
  const styles = getStyles();
  return (
    <div onClick={props.onClick} className={styles.submitButton}>
      Submit
    </div>
  );
}