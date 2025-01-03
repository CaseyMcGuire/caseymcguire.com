import * as React from "react";
import {createUseStyles} from "react-jss";
import Page from "../Page/Page";

const getStyles = createUseStyles({
  homePageContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '30px 60px',
    textAlign: 'center'
  },
  pictureContainer: {
    marginTop: '10px'
  },
  homePagePictureContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  homePagePicture: {
    width: '200px',
    height: '200px',
    borderRadius: '40%'
  },
  homePagePicture2: {
    width: '230px',
    height: '200px',
    borderRadius: '30%'
  },
  socialMediaIcon: {
    width: '50px',
    height: '45px',
    margin: '5px'
  },
  '@media only screen and (max-width: 600px)': {
    homePageContainer: {
      flexDirection: 'column'
    }
  }
});

export default function HomePage() {
  const styles = getStyles();
  const pictures = [
    {
      className: styles.homePagePicture,
      src: "/assets/images/home_picture.jpeg"
    },
    {
      className: styles.homePagePicture2,
      src: "/assets/images/home_picture_2.png"
    }
  ]
  const randomPicture = pictures[Math.floor(Math.random() * pictures.length)];
  return (
    <Page>
      <div className={styles.homePageContainer}>
        <div className={styles.homePagePictureContainer}>
          <img alt="Picture of Casey McGuire" {...randomPicture} />
        </div>
        <div className={styles.infoContainer}>
          <div>
            Hi, my name is Casey McGuire and I'm a software engineer currently working in the Seattle area. This is my personal
            website where I occasionally blog and host my side projects. 
          </div>
          <div className={styles.pictureContainer}>
            <SocialMediaIcon src={"/assets/images/linkedin_picture.png"}
                             link={"https://www.linkedin.com/in/casey-mcguire-68966891/"}/>
            <SocialMediaIcon src={"/assets/images/github_picture.png"} link={"https://github.com/CaseyMcGuire"}/>
          </div>
        </div>
      </div>
    </Page>
  );
}


function SocialMediaIcon(props: { src: string, link: string }) {
  const styles = getStyles();
  return (
    <a href={props.link}>
      <img className={styles.socialMediaIcon} src={props.src}/>
    </a>
  )
}