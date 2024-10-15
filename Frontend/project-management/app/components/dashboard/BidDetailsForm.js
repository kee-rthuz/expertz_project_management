


// import React, { useState } from 'react';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import Grid from '@mui/material/Grid';

// export default function BidDetailsForm({ show, onClose, onSubmit }) {
//   const [projectName, setProjectName] = useState('');
//   const [bidAmount, setBidAmount] = useState('');
//   const [bidDate] = useState(new Date().toISOString().split('T')[0]);
//   const [durationFrom, setDurationFrom] = useState('');
//   const [durationTo, setDurationTo] = useState('');

//   if (!show) {
//     return null;
//   }

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (!projectName || !bidAmount || !durationFrom || !durationTo) {
//       alert('Please fill all fields');
//       return;
//     }

//     const newBid = {
//       bidProjectName: projectName,
//       bidAmount,
//       bidDate,
//       durationFrom,
//       durationTo,
//     };

//     try {
//       const response = await fetch('http://localhost:5000/api/bids', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newBid),
//       });

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const createdBid = await response.json();
//       onSubmit(createdBid);
//       onClose();
//     } catch (error) {
//       console.error('Error creating bid:', error);
//       alert('An error occurred while creating the bid.');
//     }
//   };

//   return (
// <div >
//   <h1 className="text-lg font-bold mb-4">Bid Details</h1>
//   <form onSubmit={handleSubmit}>
//     <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//       <div>
//         <TextField
//           type="text"
//           label="Project Name"
//           placeholder="Project Name"
//           className="w-full"
//           value={projectName}
//           onChange={(e) => setProjectName(e.target.value)}
//           required
//         />
//       </div>
//       <div>
//         <TextField
//           type="number"
//           label="Bid Amount"
//           placeholder="Bid Amount"
//           className="w-full"
//           value={bidAmount}
//           onChange={(e) => setBidAmount(e.target.value)}
//           required
//         />
//       </div>
//       <div>
//         <TextField
//           label="Duration From"
//           type="date"
//           name="durationFrom"
//           value={durationFrom}
//           onChange={(e) => setDurationFrom(e.target.value)}
//           required
//           fullWidth
//           margin="normal"
//           InputLabelProps={{ shrink: true }}
//           className="w-full"
//         />
//       </div>
//       <div>
//         <TextField
//           label="Bid Date"
//           type="date"
//           name="bidDate"
//           value={bidDate}
//           disabled
//           fullWidth
//           margin="normal"
//           InputLabelProps={{ shrink: true }}
//           className="w-full"
//         />
//       </div>
//       <div>
//         <TextField
//           label="Duration To"
//           type="date"
//           name="durationTo"
//           value={durationTo}
//           onChange={(e) => setDurationTo(e.target.value)}
//           required
//           fullWidth
//           margin="normal"
//           InputLabelProps={{ shrink: true }}
//           className="w-full"
//         />
//       </div>
//       <div className="md:col-span-2 flex justify-end gap-4">
//         <Button
//           type="button"
//           variant="outlined"
//           style={{
//             fontSize: '16px',
//             margin: '4px 2px',
//           }}
//           onClick={onClose}
//         >
//           Cancel
//         </Button>
//         <Button
//           type="submit"
//           variant="contained"
//           style={{
//             backgroundColor: '#000',
//             fontSize: '16px',
//             color: 'white',
//             margin: '4px 2px',
//           }}
//         >
//           Create Bid
//         </Button>
//       </div>
//     </div>
//   </form>
// </div>
//   );
// }