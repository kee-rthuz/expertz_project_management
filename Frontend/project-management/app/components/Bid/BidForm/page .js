
// //  working now 

// import React, { useState } from 'react';
// import styles from './bidform.module.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTimes } from '@fortawesome/free-solid-svg-icons';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import Grid from '@mui/material/Grid';

// export default function BidForm({ show, onClose }) {
//   const [projectName, setProjectName] = useState('');
//   const [name, setName] = useState('');
//   const [companyName, setCompanyName] = useState('');
//   const [bidAmount, setBidAmount] = useState('');
//   const [bidHours, setBidHours] = useState(0);

//   if (!show) {
//     return null;
//   }

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (!projectName || !name || !companyName || !bidAmount || bidHours <= 0) {
//       alert('Please fill all fields');
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:5000/api/bids', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           bidProjectName: projectName,
//           bidderName: name,
//           bidAmount: bidAmount,
//           bidHour: bidHours,
//         }),
//       });

//       if (response.ok) {
//         alert('Bid submitted successfully');
//         onClose(); // Close the bid form and the overlay
//         window.location.reload();
//       } else {
//         alert('Failed to submit bid');
//       }
//     } catch (error) {
//       console.error('Error submitting bid:', error);
//       alert('An error occurred');
//     }
//   };

//   return (
//     <div className={styles.popupStyle}>
//       <div className={styles.closeIcon} onClick={onClose}>
//         <FontAwesomeIcon icon={faTimes} />
//       </div>
//       <h1 className={styles.h1}>Bid Request</h1>
//       <form onSubmit={handleSubmit}>
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             <TextField
//               type="text"
//               label="Project Name"
//               placeholder="Project Name"
//               className={styles.inputField}
//               value={projectName}
//               onChange={(e) => setProjectName(e.target.value)}
//               required
//               fullWidth
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               type="text"
//               label="Name"
//               placeholder="Your Name"
//               className={styles.inputField}
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//               fullWidth
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               type="text"
//               label="Company Name"
//               placeholder="Company Name"
//               className={styles.inputField}
//               value={companyName}
//               onChange={(e) => setCompanyName(e.target.value)}
//               required
//               fullWidth
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               type="number"
//               label="Bid Amount"
//               placeholder="Bid Amount"
//               className={styles.inputField}
//               value={bidAmount}
//               onChange={(e) => setBidAmount(e.target.value)}
//               required
//               fullWidth
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               type="number"
//               label="Bid Hours"
//               placeholder="Bid Hours"
//               className={styles.inputField}
//               value={bidHours}
//               onChange={(e) => setBidHours(e.target.value)}
//               required
//               fullWidth
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <Button
//               type="submit"
//               variant="contained"
//               style={{ 
//                 backgroundColor: '#000', 
//                 fontSize: '16px', 
//                 color: 'white', 
//                 margin: '4px 2px', 
//                }}
//             >
//               Submit
//             </Button>
//           </Grid>
//         </Grid>
//       </form>
//     </div>
//   );
// }
