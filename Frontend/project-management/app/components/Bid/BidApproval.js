
// import React, { useState, useRef, useEffect } from 'react';
// import styles from './BidApproval.module.css';
// import TextField from '@mui/material/TextField';

// const BidApproval = ({ bid, onApprove, onReject }) => {
//     const [note, setNote] = useState('');
//     const [showApprovalPage, setShowApprovalPage] = useState(true);

//     const overlayRef = useRef(null);

//     useEffect(() => {
//         const handleOverlayClick = (event) => {
//             if (event.target === overlayRef.current) {
//                 handleClose();
//             }
//         };

//         document.addEventListener('click', handleOverlayClick);

//         return () => {
//             document.removeEventListener('click', handleOverlayClick);
//         };
//     }, []);

//     const handleClose = () => {
//         setShowApprovalPage(false);
//     };

//     // Function to handle changes in the comment field
//     const handleNoteChange = (event) => {
//         setNote(event.target.value);
//     };

//     const handleApprove = () => {
//         // Send a DELETE request to the server
//         fetch(`http://localhost:5000/api/delete_bids_approved/${bid._id}`, {
//             method: 'DELETE',
//         })
//         .then((response) => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then((deletedBid) => {
//             // Handle the response if needed
//             console.log('Bid deleted:', deletedBid);
            
//             // Display a popup message
//             alert('Bid approved successfully!');
            
//             // Reload the page after successful deletion
//             window.location.reload();
            
//             // Close the approval page by updating showApprovalPage state to false
//             setShowApprovalPage(false);
//         })
//         .catch((error) => {
//             console.error('Error deleting bid:', error);
//         });
//     };

//     // Function to handle bid rejection
//     const handleReject = () => {
//         if (onReject) {
//             onReject(note);
//         }
//     };

//     // Function to handle cancellation
//     const handleCancel = () => {
//         setShowApprovalPage(false);
//     };

//     if (!showApprovalPage) {
//         return null; // or return some component to indicate the approval page is closed
//     }

//     return (
//         <div ref={overlayRef} className={styles.overlayGlassEffect}>
//             <div className={styles.approvalPage}>
//                 <h2>Owner approval bid</h2>
                
//                 {/* Comment Section */}
//                 <div className={styles.noteSection}>
//                     <TextField
//                         label="Comment"
//                         multiline
//                         rows={4}
//                         value={note}
//                         onChange={handleNoteChange}
//                         variant="outlined"
//                         fullWidth
//                     />
//                 </div>

//                 {/* Buttons for Approve, Reject, and Cancel */}
//                 <div>
//                     <button className={styles.approveButton} onClick={handleApprove}>Approve</button>
//                     <button className={styles.rejectButton} onClick={handleReject}>Reject</button>
//                     <button className={styles.cancelButton} onClick={handleCancel}>Cancel</button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default BidApproval;





