import {createUseStyles} from "react-jss";
import PreviewCard from "./PreviewCard";
import * as React from "react";

const useStyles = createUseStyles({
  app: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0D192C',
    width: '100%',
    height: '100%'
  }
})

// see https://www.frontendmentor.io/challenges/nft-preview-card-component-SbdUL_w0U
function NftPreview() {
  const styles = useStyles()
  return (
    <div className={styles.app}>
      <PreviewCard
        title={"Equilibrium #3429"}
        description={"Our Equilibrium collection promotes balance and calm."}
        price={"0.041 ETH"}
        timeLeft={"3 days left"}
        creator={"Jules Wyvern"}
      />
    </div>
  );
}

export default NftPreview;