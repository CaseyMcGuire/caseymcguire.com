import * as React from "react";
import {useEffect} from "react";
import * as stylex from "@stylexjs/stylex";
import * as WebFont from "webfontloader";

const styles = stylex.create({
  container: {
    height: '100%',
    width: '100%',
    fontFamily: 'Inter, sans-serif',
  },
  sidebar: {
    height: '100%',
    width: '240px',
    position: 'fixed',
    borderRightWidth: '1px',
    borderRightColor: '#E5E5E5',
    borderRightStyle: 'solid',
  },
  content: {
    height: '100%',
    marginLeft: '240px',
  }
});

export default function AiChatPage() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Inter"],
      },
    });
  }, []);

  return (
    <div sx={styles.container}>
      <div sx={styles.sidebar}>
        AI Chat
      </div>
      <div sx={styles.content}>

      </div>
    </div>
  )
}
