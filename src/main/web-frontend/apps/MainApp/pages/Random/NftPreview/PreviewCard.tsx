import * as React from "react";
import { useEffect } from "react";
import * as WebFont from "webfontloader";
import * as stylex from "@stylexjs/stylex";

type Props = {
  title: string;
  description: string;
  price: string;
  timeLeft: string;
  creator: string;
};

const padding = 24;
const imageBorderRadius = 8;

const styles = stylex.create({
  cardContainer: {
    fontFamily: "Outfit",
    display: "flex",
    flexDirection: "column",
    padding,
    backgroundColor: "#15263F",
    height: "min-content",
    maxWidth: 350,
    borderRadius: 15,
  },
  imageContainer: {
    position: "relative",
    marginBottom: 24,
  },
  image: {
    maxWidth: 350 - padding * 2,
    objectFit: "cover",
    borderRadius: imageBorderRadius,
  },
  imageCover: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 0,

    ":hover": {
      backgroundColor: "hsla(178, 100%, 50%, 0.5)",
      borderRadius: imageBorderRadius,
      opacity: 1,
    },
  },
  titleContainer: {
    marginBottom: 16,
  },
  title: {
    fontFamily: "Outfit",
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: 600,
    cursor: "pointer",

    ":hover": {
      color: "#00FFF8",
    },
  },
  descriptionContainer: {
    marginBottom: 24,
  },
  description: {
    fontFamily: "Outfit",
    fontSize: 18,
    color: "#8BACD9",
  },
  priceAndTimeContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  price: {
    fontFamily: "Outfit",
    color: "#00FFF8",
    fontWeight: 600,
  },
  time: {
    color: "#8BACD9",
    marginLeft: 4,
  },
  ethereumContainer: {
    display: "flex",
    justifyContent: "center",
  },
  ethereumIcon: {
    marginRight: 6,
  },
  clockContainer: {
    display: "flex",
    justifyContent: "center",
  },
  divider: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#2E405A",
    marginBottom: 16,
  },
  creatorContainer: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    width: 33,
    height: 33,
    marginRight: 16,
  },
  creationText: {
    color: "#8BACD9",
    marginRight: 5,
  },
  creatorText: {
    color: "#FFFFFF",
    cursor: "pointer",

    ":hover": {
      color: "#00FFF8",
    },
  },
});

export default function PreviewCard(props: Props) {
  // taken from https://blog.greenroots.info/3-quick-ways-to-add-fonts-to-your-react-app#heading-using-the-web-font-loader
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Outfit"],
      },
    });
  }, []);

  return (
    <div sx={styles.cardContainer}>
      <div sx={styles.imageContainer}>
        <div sx={styles.imageCover}>
          <img src="/assets/images/icon-view.svg" />
        </div>
        <img
          sx={styles.image}
          src="/assets/images/image-equilibrium.jpg"
        />
      </div>

      <div sx={styles.titleContainer}>
        <span sx={styles.title}>{props.title}</span>
      </div>

      <div sx={styles.descriptionContainer}>
        <span sx={styles.description}>{props.description}</span>
      </div>

      <div sx={styles.priceAndTimeContainer}>
        <div sx={styles.ethereumContainer}>
          <img
            sx={styles.ethereumIcon}
            src="/assets/images/icon-ethereum.svg"
          />
          <span sx={styles.price}>{props.price}</span>
        </div>
        <div sx={styles.clockContainer}>
          <img src="/assets/images/icon-clock.svg" />
          <span sx={styles.time}>{props.timeLeft}</span>
        </div>
      </div>

      <div sx={styles.divider} />

      <div sx={styles.creatorContainer}>
        <img
          sx={styles.avatar}
          src="/assets/images/image-avatar.png"
        />
        <span sx={styles.creationText}>Creation of</span>
        <span sx={styles.creatorText}>{props.creator}</span>
      </div>
    </div>
  );
}
