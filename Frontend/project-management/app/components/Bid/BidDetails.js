
// import React from 'react';
// import styles from './BidDetails.module.css';        

// export default function BidDetails({ bid, onClose, onRequestBid })  {
//   const handleRequestBid = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/bids/request', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           bidProjectName: bid.bidProjectName,
//           bidderName: bid.bidderName,
//           bidAmount: bid.bidAmount,
//         }),
//       });
  
//       if (response.ok) {
//         // const data = await response.json();
//         // console.log('Bid request successful:', data);
//         alert('Bid request successfully');
//         onClose();
//         window.location.reload();
//         // Optionally, you can perform actions after a successful bid request
//       } else {
//         alert('Failed to submit bid');
//         // console.error('Bid request failed:', response.statusText);
//         // Optionally, handle errors or display error messages
//       }
//     } catch (error) {
//       console.error('Error requesting bid:', error.message);
//       // Optionally, handle errors or display error messages
//     }
//   };

//   return (
//     <div className={styles.detailsContainer}>
//           <h2>Bid Details</h2>
//           <p>Bid Project Name: {bid.bidProjectName}</p>
//           <p>Bidder Name: {bid.bidderName}</p>
//           <p>Bid Amount: ${bid.bidAmount}</p>
          

//         <div>
//             <button className={styles.requestButton} onClick={handleRequestBid}>Request Bid</button>
        
//             <button className={styles.closeButton} onClick={onClose}>Close</button>
//         </div>
//     </div>
//   );
// }



