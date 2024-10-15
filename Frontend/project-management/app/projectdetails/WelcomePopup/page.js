
// // create a popup page 1
// // import React from 'react';
// // import styles from './Welcome.module.css';

// // const WelcomePopup = () => {
// //   return (
// //     <div className={styles.welcome}>
// //       {/* <div className={styles.Horizontalline}></div> */}
// //         {/* <h2>Welcome to Task Details</h2> */}
// //     </div>
// //   );
// // };

// // export default WelcomePopup;



// //  add close , refresh scroll top & bottam icon & horizontal line 
// // --------------------------------------------------------------

// import React from 'react';
// import styles from './Welcome.module.css';
// import CloseIcon from '@mui/icons-material/Close';
// import RefreshIcon from '@mui/icons-material/Refresh';
// import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
// import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown'; // Import scroll to bottom icon from Material-UI

// const WelcomePopup = ({ onClose, onRefresh, onScrollToTop, onScrollToBottom }) => {
//   const handleClose = () => {
//     if (onClose) {
//       onClose();
//     }
//   };

//   const handleRefresh = () => {
//     if (onRefresh) {
//       onRefresh();
//     }
//   };

//   const handleScrollToTop = () => {
//     if (onScrollToTop) {
//       onScrollToTop();
//     }
//   };

//   const handleScrollToBottom = () => {
//     if (onScrollToBottom) {
//       onScrollToBottom();
//     }
//   };


//   return (
//     <div className={styles.welcome}>
//       {/* Icons container */}
//       <div className={styles.iconContainer}>
//         {/* Close icon */}
//         <div className={styles.closeIcon} onClick={handleClose}>
//           <CloseIcon />
//         </div>

//         {/* Refresh icon */}
//         <div className={styles.refreshIcon} onClick={handleRefresh}>
//           <RefreshIcon />
//         </div>

//         {/* Scroll to top icon */}
//         <div className={styles.scrollToTopIcon} onClick={handleScrollToTop}>
//           <ArrowCircleUpIcon />
//         </div>

//         {/* Scroll to bottom icon */}
//         <div className={styles.scrollToBottomIcon} onClick={handleScrollToBottom}>
//           <ArrowCircleDownIcon />
//         </div>
//       </div>

//       <div className={styles.Horizontalline}></div>
//       {/* <h2>Welcome to Task Details</h2> */}
//     </div>
//   );
// };

// export default WelcomePopup;



