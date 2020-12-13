import * as React from "react";
import * as marked from "marked";
import * as sanitizeHtml from "sanitize-html";
import * as hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import {createUseStyles} from "react-jss";
import Common from '../Page/Common';

const getStyles = createUseStyles({
  postContainer: {
    width: '100%',
    maxWidth: Common.postWidth + 'px',
    borderBottom: '1px solid #6A6A6A',
    marginBottom: '30px'
  },
  postTitleContainer: {
    borderBottom: '#CCCCCC solid 1px',
    marginBottom: '10px'
  },
  postTitle: {
    '& a': {
      textDecoration: 'none'
    }
  },
  postFormContainer: {
    marginBottom: '5px'
  },
  titleInput: {
    width: Common.postWidth + 'px',
    height: '25px'
  },
  postContentsContainer: {
    fontSize: '17px',
    lineHeight: '135%',
    padding: '0px 5px',
    listStylePosition: 'inside',
    '& p, h1, h2, h3, h4, h5, h6': {
      marginBottom: '10px'
    },
    '& li': {
      border: '1px solid grey',
      borderRadius: '5px',
      overflow: 'scroll',
      padding: '5px',
      marginBottom: '10px',
    }
  },
  '@media only screen and (max-width: 600px)': {
    pre: {
      fontSize: '11px'
    }
  }
});

type Props = Readonly<{
  id?: number,
  title: string,
  contents: string
}>

export default function Post(props: Props) {
  const {
    id,
    title,
    contents
  } = props;
  const styles = getStyles();

  const unsanitized_html_DO_NOT_USE = marked(contents, {
    highlight: (code, lang) => {
      return hljs.highlight(lang, code).value;
    }
  });

  const sanitizedHtml = sanitizeHtml(unsanitized_html_DO_NOT_USE, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['span']),
    allowedAttributes: Object.assign({}, sanitizeHtml.defaults.allowedAttributes, {
      'span': ['class'],
      'code': ['class']
    })
  });

  const blogTitleElement = id ? <a href={"/posts/" + id}>{title}</a> : title;
  return (
    <div className={styles.postContainer}>
      <div className={styles.postTitleContainer}>
        <h2 className={styles.postTitle}>{blogTitleElement}</h2>
      </div>
      <div className={styles.postContentsContainer}
           dangerouslySetInnerHTML={{__html: sanitizedHtml}}/>
    </div>
  );
}