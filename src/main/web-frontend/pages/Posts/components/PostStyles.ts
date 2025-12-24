import * as stylex from '@stylexjs/stylex';

export const postStyles = stylex.create({
  postContainer: {
    width: '100%',
    maxWidth: '100%',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: '#6A6A6A',
    marginBottom: 32,
    paddingBottom: 12,
  },
  postTitleContainer: {
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: '#CCCCCC',
    marginBottom: 24,
  },
  postTitleLink: {
    textDecorationLine: 'none',
  },
  postSubtitle: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '4px 0px',
  },
  postFormContainer: {
    marginBottom: 5,
  },
  titleInput: {
    width: '100%',
    height: 25,
  },
  date: {
    color: 'grey',
  },
  postContentsContainer: {
    padding: '0px 5px',
  },
  blockText: {
    marginTop: 20,
    marginBottom: 20,
  },
  listNested: {
    marginBottom: 4,
  },
  listFirstItem: {
    marginTop: 4,
  },
  listItem: {
    paddingLeft: 20,
  },
  blockquote: {
    margin: 10,
    borderLeftWidth: '3px',
    borderLeftStyle: 'solid',
    borderLeftColor: '#CCCCCC',
    paddingLeft: 7,
  },
  codeBlock: {
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
    overflow: 'auto',
    padding: 5,
    marginBottom: 10,
    '@media (max-width: 600px)': {
      fontSize: 11,
    },
  },
});
