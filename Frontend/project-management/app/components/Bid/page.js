

// //  working  now
// "use client"
// import React, { useState, useEffect } from 'react';
// import BidCardList from './BidCardList';
// import styles from './Bid.module.css';

// const BidPage = () => {
//   const [bids, setBids] = useState([]);
//   const [selectedBid, setSelectedBid] = useState(null);
//   const [showOverlay, setShowOverlay] = useState(false);

//   useEffect(() => {
//     fetchBids();
//   }, []);

//   const fetchBids = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/bids');
//       if (response.ok) {
//         const data = await response.json();
//         setBids(data);
//       } else {
//         console.error('Failed to fetch bids');
//       }
//     } catch (error) {
//       console.error('Error fetching bids:', error);
//     }
//   };

//   const handleViewClick = (bid) => {
//     setShowOverlay(true);
//     setSelectedBid(bid);
//   };

//   const handleCloseOverlay = () => {
//     setShowOverlay(false);
//     setSelectedBid(null);
//   };

//   return (
//     <div className={styles.bidPage}>
//       <div className={`${styles.overlay} ${showOverlay ? styles.active : ''}`} onClick={handleCloseOverlay}></div>
//       <BidCardList bids={bids} onCardClick={handleViewClick} setShowOverlay={setShowOverlay} />
//       {selectedBid && <div>Selected Bid: {selectedBid.id}</div>}
//     </div>
//   );
// };

// export default BidPage;





