import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import AiChatSidebar from "apps/AiChat/components/AiChatSidebar";

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
  return (
    <div sx={styles.container}>
      <div sx={styles.sidebar}>
        <AiChatSidebar />
      </div>
      <div sx={styles.content}>

      </div>
    </div>
  )
}
