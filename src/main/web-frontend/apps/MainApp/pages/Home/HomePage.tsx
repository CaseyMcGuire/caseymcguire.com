import * as React from "react";
import Page from "apps/MainApp/components/Page";
import * as stylex from '@stylexjs/stylex';


const styles = stylex.create({
  homePageContainer: {
    display: 'flex',
    flexDirection: {
      default: 'row',
      '@media (max-width: 600px)': 'column'
    },
    justifyContent: 'center'
  },
  textContainer: {
    fontSize: '18px'
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
    justifyContent: 'center',
    minWidth: '230px'
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
  }
});

export default function HomePage() {
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
      <div {...stylex.props(styles.homePageContainer)}>
        <div {...stylex.props(styles.homePagePictureContainer)}>
          <img alt="Picture of Casey McGuire" {...stylex.props(randomPicture.className)} src={randomPicture.src}/>
        </div>
        <div {...stylex.props(styles.infoContainer)}>
          <div {...stylex.props(styles.textContainer)}>
            Hi, my name is Casey McGuire and I'm a software engineer currently working in the Seattle area. This is my personal
            website where I occasionally blog and host my side projects. 
          </div>
          <div {...stylex.props(styles.pictureContainer)}>
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
  return (
    <a href={props.link}>
      <img {...stylex.props(styles.socialMediaIcon)} src={props.src}/>
    </a>
  )
}