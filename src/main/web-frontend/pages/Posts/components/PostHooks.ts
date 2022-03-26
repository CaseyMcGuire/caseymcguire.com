import {createUseStyles} from "react-jss";
import Common from "../../Page/Common";

export const usePostStyles = createUseStyles({
  postContainer: {
    width: '100%',
    maxWidth: '100%',
    borderBottom: '1px solid #6A6A6A',
    marginBottom: '32px',
    paddingBottom: '12px'
  },
  postTitleContainer: {
    borderBottom: '#CCCCCC solid 1px',
    marginBottom: '24px'
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
    width: '100%',
    height: '25px'
  },
  date: {
    color: 'grey'
  },
  postContentsContainer: {
    fontSize: '17px',
    lineHeight: '135%',
    padding: '0px 5px',
    listStylePosition: 'inside',
    '& p, h1, h2, h3, h4, h5, h6': {
      marginBottom: '16px'
    },
    '& li': {
      paddingLeft: '20px'
    },
    '& blockquote': {
      margin: '10px',
      borderLeft: '#CCCCCC solid 3px',
      paddingLeft: '7px'
    },
    '& pre': {
      backgroundColor: '#f8f8f8',
      borderRadius: '5px',
      overflow: 'auto',
      padding: '5px',
      marginBottom: '10px'
    },
    '&> ul': {
      marginBottom: '16px'
    }
  },
  '@media only screen and (max-width: 600px)': {
    pre: {
      fontSize: '11px'
    }
  }
});