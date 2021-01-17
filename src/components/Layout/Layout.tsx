import React, { CSSProperties, useEffect } from "react";
import styles from "./Layout.module.css";

interface ComponentProps {
  layoutStyles?: CSSProperties;
}
const Layout: React.FC<ComponentProps> = ({ children, layoutStyles }) => {
  return (
    <main className={styles.layout} style={{ ...layoutStyles }}>
      {children}
    </main>
  );
};
export default Layout;
