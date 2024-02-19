import * as React from "react";
import {createUseStyles} from "react-jss";

type Props = {
  score: number
}

const useStyles = createUseStyles({
  tetrisScore: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100px',
    width: '100px',
    fontSize: '24px'
  }
})

export default function TetrisScore(props: Props) {
  const styles = useStyles()
  return (
    <div className={styles.tetrisScore}>
      <span>Score</span>
      {props.score}
    </div>
  )
}