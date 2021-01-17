import clsx from "clsx";
import React, { useState } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import { FilterOptions, Header, MediaContainer } from "./containers";
import styles from "./App.module.css";

function App() {
  const [isSideBarOpen, toggleSideBar] = useState(false);

  return (
    <div className={styles.appContainer}>
      <section className={styles.leftContainer}>
        <Header />
        <MediaContainer />
      </section>
      <MenuIcon
        className={styles.toggleSideBarButton}
        onClick={() => toggleSideBar(!isSideBarOpen)}
      />
      <aside
        className={clsx(
          styles.rightContainer,
          isSideBarOpen && styles.openSideBar
        )}
      >
        <FilterOptions />
      </aside>
    </div>
  );
}

export default App;
