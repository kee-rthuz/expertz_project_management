


// import React, { useState, useEffect } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
// import BidDetailsForm from '../../dashboard/BidDetailsForm';

// export default function BidCard() {
//   const [showMenu, setShowMenu] = useState(false);
//   const [showOverlay, setShowOverlay] = useState(false);
//   const [bids, setBids] = useState([]);
//   const [selectedBids, setSelectedBids] = useState([]);

//   useEffect(() => {
//     fetch('http://localhost:5000/api/bids')
//       .then(response => response.json())
//       .then(data => setBids(data))
//       .catch(error => console.error('Error fetching bids:', error));
//   }, []);

//   const handleMenuClick = (action, bidId) => {
//     setShowMenu(false);
//     if (action === 'delete') {
//       fetch(`http://localhost:5000/api/bids/${bidId}`, {
//         method: 'DELETE',
//       })
//         .then((response) => {
//           if (!response.ok) {
//             throw new Error('Network response was not ok');
//           }
//           return response.json();
//         })
//         .then(() => {
//           setBids(bids.filter(bid => bid._id !== bidId));
//           alert('Bid deleted successfully!');
//         })
//         .catch((error) => {
//           console.error('Error deleting bid:', error);
//           alert('An error occurred while deleting the bid.');
//         });
//     }
//   };

//   const handleRequestClick = () => {
//     setShowOverlay(true);
//   };

//   const handleSelectBid = (bidId) => {
//     setSelectedBids(prevSelectedBids =>
//       prevSelectedBids.includes(bidId)
//         ? prevSelectedBids.filter(id => id !== bidId)
//         : [...prevSelectedBids, bidId]
//     );
//   };

//   const handleSelectAllBids = () => {
//     if (selectedBids.length === bids.length) {
//       setSelectedBids([]);
//     } else {
//       setSelectedBids(bids.map(bid => bid._id));
//     }
//   };

//   const handleDeleteSelected = () => {
//     selectedBids.forEach(bidId => {
//       fetch(`http://localhost:5000/api/bids/${bidId}`, {
//         method: 'DELETE',
//       })
//         .then((response) => {
//           if (!response.ok) {
//             throw new Error('Network response was not ok');
//           }
//           return response.json();
//         })
//         .then(() => {
//           setBids(prevBids => prevBids.filter(bid => bid._id !== bidId));
//         })
//         .catch((error) => {
//           console.error('Error deleting bid:', error);
//           alert('An error occurred while deleting a bid.');
//         });
//     });
//     setSelectedBids([]);
//     alert('Selected bids deleted successfully!');
//   };

//   const addBid = (newBid) => {
//     setBids([...bids, newBid]);
//     alert('Bid created successfully!');
//   };

//   return (
// <div className="p-4">
//   {bids.map((bid) => (
//     <div key={bid._id} className="bg-white shadow-md rounded-lg p-2 mb-2">

//       {/* <div className="flex justify-between items-center mb-4 flex-col md:flex-row">
//         <div className="mb-2 md:mb-0"> */}
//               <div className="flex flex-col">
//               <div className="mb-4">
//           <span className="font-bold">Bid Project Name:</span>
//           <span className="ml-2">{bid.bidProjectName}</span>
//         </div>
//         {/* <div className="flex items-center space-x-4">
//           <button className="bg-blue-500 text-white rounded px-4 py-2" onClick={handleRequestClick}>
//             Request
//           </button>
//           <FontAwesomeIcon icon={faEllipsisV} className="text-gray-500 cursor-pointer" onClick={() => setShowMenu(!showMenu)} />
//         </div> */}
//       </div>

//       {/* <div className="flex flex-col">
//         <div className="mb-4"> */}
//         <div className="flex justify-between items-center mb-4 flex-col md:flex-row">
//         <div className="mb-2 md:mb-0">
//           <span className="font-bold">Bidder Name:</span>
//           <span className="ml-2">{bid.bidderName}</span>
//         </div>
//         <div className="flex items-center space-x-4">
//           <button className="bg-blue-500 text-white rounded px-4 py-2" onClick={handleRequestClick}>
//             Request
//           </button>
//           <FontAwesomeIcon icon={faEllipsisV} className="text-gray-500 cursor-pointer" onClick={() => setShowMenu(!showMenu)} />
//         </div>
//       </div>

//       {showMenu && (
//         <div className="flex mt-4 flex-col md:flex-row">
//           <button className="bg-gray-200 rounded px-4 py-2 mb-2 md:mb-0 md:mr-2" onClick={() => handleMenuClick('cancel')}>
//             Cancel
//           </button>
//           <button className="bg-red-500 text-white rounded px-4 py-2" onClick={() => handleMenuClick('delete', bid._id)}>
//             Delete
//           </button>
//         </div>
//       )}
//     </div>
//   ))}
// </div>

//   );
// }
