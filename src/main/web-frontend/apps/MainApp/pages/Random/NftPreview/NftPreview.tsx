import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import PreviewCard from "apps/MainApp/pages/Random/NftPreview/PreviewCard";

const styles = stylex.create({
  app: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0D192C",
    width: "100%",
    height: "100%"
  },
});

// see https://www.frontendmentor.io/challenges/nft-preview-card-component-SbdUL_w0U
function NftPreview() {
  return (
    <div {...stylex.props(styles.app)}>
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
