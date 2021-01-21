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
  return (
    <Page>
      <div className={styles.homePageContainer}>
        <div className={styles.homePagePictureContainer}>
          <img className={styles.homePagePicture} src="/assets/images/home_picture.jpeg"/>
        </div>
        <div className={styles.infoContainer}>
          <h3>Software Engineer in Seattle, WA.</h3>
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