import {createUseStyles} from "react-jss";
import * as React from "react";
import {useEffect} from "react";
import * as WebFont from "webfontloader";

type Props = {
  title: string,
  description: string,
  price: string,
  timeLeft: string,
  creator: string
}

const padding = 24
const imageBorderRadius = 8;

const useStyles = createUseStyles({
  cardContainer: {
    fontFamily: 'Outfit',
    display: 'flex',
    flexDirection: 'column',
    padding: 24,
    background: '#15263F',
    height: 'min-content',
    maxWidth: '350px',
    borderRadius: 15
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 24,
  },
  image: {
    maxWidth: 350 - padding * 2,
    objectFit: 'cover',
    borderRadius: imageBorderRadius,
  },
  imageCover: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0,
    '&:hover': {
      backgroundColor: 'hsla(178, 100%, 50%, 0.5)',
      borderRadius: imageBorderRadius,
      opacity: 1
    }
  },
  titleContainer: {
    marginBottom: '16px',
  },
  title: {
    fontFamily: 'Outfit',
    color: '#FFFFFF',
    fontSize: '22px',
    fontWeight: 600,
    cursor: 'pointer',
    '&:hover': {
      color: '#00FFF8'
    }
  },
  descriptionContainer: {
    marginBottom: '24px'
  },
  description: {
    fontFamily: 'Outfit',
    fontSize: '18px',
    color: '#8BACD9'
  },
  priceAndTimeContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24
  },
  price: {
    fontFamily: 'Outfit',
    color: '#00FFF8',
    fontWeight: 600
  },
  time: {
    color: '#8BACD9',
    marginLeft: 4
  },
  ethereumContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  ethereumIcon: {
    marginRight: '6px'
  },
  clockContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  divider: {
    border: '1px solid #2E405A',
    marginBottom: 16
  },
  creatorContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    width: 33,
    height: 33,
    marginRight: 16
  },
  creationText: {
    color: '#8BACD9',
    marginRight: 5
  },
  creatorText: {
    color: '#FFFFFF',
    cursor: 'pointer',
    '&:hover': {
      color: '#00FFF8'
    }
  }
})

export default function PreviewCard(props: Props) {
  const styles = useStyles();
  // taken from https://blog.greenroots.info/3-quick-ways-to-add-fonts-to-your-react-app#heading-using-the-web-font-loader
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Outfit']
      }
    });
  }, []);

  return (
    <div className={styles.cardContainer}>
      <div className={styles.imageContainer}>
        <div className={styles.imageCover}>
          <img src={"/assets/images/icon-view.svg"} />
        </div>
        <img className={styles.image} src={"/assets/images/image-equilibrium.jpg"} />
      </div>
      <div className={styles.titleContainer}>
        <span className={styles.title}>{props.title}</span>
      </div>
      <div className={styles.descriptionContainer}>
        <span className={styles.description}>{props.description}</span>
      </div>
      <div className={styles.priceAndTimeContainer}>
        <div className={styles.ethereumContainer}>
          <img className={styles.ethereumIcon} src={"/assets/images/icon-ethereum.svg"} />
          <span className={styles.price}>{props.price}</span>
        </div>
        <div className={styles.clockContainer}>
          <img src={"/assets/images/icon-clock.svg"} />
          <span className={styles.time}>{props.timeLeft}</span>
        </div>
      </div>
      <div className={styles.divider} />
      <div className={styles.creatorContainer}>
        <img className={styles.avatar} src={"/assets/images/image-avatar.png"} />
        <span className={styles.creationText}>Creation of</span> <span className={styles.creatorText}>{props.creator}</span>
      </div>
    </div>
  )
}
