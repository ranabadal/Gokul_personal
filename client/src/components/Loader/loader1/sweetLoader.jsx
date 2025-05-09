// import React from "react";
// import styles from "./sweetLoader.module.css";

// const Loader = () => {
//   return (
//     <div className={styles.loader}></div>
//   );
// };

// export default Loader;


import React from "react";
import styles from "./sweetLoader.module.css";
import loaderVideo from "./assets/loader.mp4"; // ✅ Replace with your actual video path

const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <video className={styles.loaderVideo} autoPlay loop muted>
        <source src={loaderVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Loader;