// import React, { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTimesCircle, faUserPlus} from '@fortawesome/free-solid-svg-icons';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import Grid from '@mui/material/Grid';
// import MenuItem from '@mui/material/MenuItem'; // Import MenuItem component for the user type selection
// import styles from './InviteMembersPopup.module.css';

// const InviteMembersPopup = ({ onClose }) => {
//   const [members, setMembers] = useState([{ email: '', name: '', userType: 'Basic' }]); // Include userType field in state

//   const handleEmailChange = (e, index) => {
//     const updatedMembers = [...members];
//     updatedMembers[index].email = e.target.value;
//     setMembers(updatedMembers);
//   };

//   const handleInputChange = (e, index) => {
//     const updatedMembers = [...members];
//     updatedMembers[index].name = e.target.value;
//     setMembers(updatedMembers);
//   };

//   const handleUserTypeChange = (e, index) => {
//     const updatedMembers = [...members];
//     updatedMembers[index].userType = e.target.value;
//     setMembers(updatedMembers);
//   };

//   const handleInvite = () => {
//     members.forEach((member) => {
//       console.log(`Inviting ${member.email} as a ${member.userType} user...`);
//       // Add logic to send invitations
//     });
//     fetch('http://localhost:5000/api/invite', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ members }),
//     })
//       .then(response => response.json())
//       .then(data => {
//         console.log('Invite sent successfully:', data);
//         onClose(); // Close the popup after sending the invitation
//       })
//       .catch(error => {
//         console.error('Error sending invitation:', error);
//       });
      
//     onClose(); // Close the popup after sending the invitation
//   };

//   const handleAddMember = () => {
//     setMembers([...members, { email: '', name: '', userType: 'Basic' }]);
//   };

//   const handleRemoveMember = (index) => {
//     const updatedMembers = [...members];
//     updatedMembers.splice(index, 1);
//     setMembers(updatedMembers);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     handleInvite();
//   };

//   return (
//     <div className={styles.InviteMembersPopup}>
//       <div className={styles.closeIcon} onClick={onClose}>
//         <FontAwesomeIcon icon={faTimesCircle} />
//       </div>
//       <h3 className={styles.h3}>Invite Members</h3>
//       <form className={styles.form} onSubmit={handleSubmit}>
//         {members.map((member, index) => (
//           <Grid container spacing={2} key={index}>
//             <Grid item xs={12}>
//               <TextField
//                 label="Email"
//                 type="text"
//                 name="email"
//                 value={member.email}
//                 onChange={(e) => handleEmailChange(e, index)}
//                 required
//                 fullWidth
//                 margin="normal"
//                 className={styles.TextField}
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <TextField
//                 label="Name"
//                 type="text"
//                 name="name"
//                 value={member.name}
//                 onChange={(e) => handleInputChange(e, index)}
//                 margin="normal"
//                 className={styles.TextField}
//               />
//             </Grid>
//             <Grid item xs={2}>
//               <TextField
//                 select
//                 label="User Type"
//                 value={member.userType}
//                 onChange={(e) => handleUserTypeChange(e, index)}
//                 variant="outlined"
//                 size="small"
//                 margin='normal'
//               >
//                 <MenuItem value="Pro-User">Pro-User</MenuItem>
//                 <MenuItem value="Admin">Admin</MenuItem>
//                 <MenuItem value="Guest">Guest</MenuItem>
//                 <MenuItem value="Read-Only">Read-Only</MenuItem>
//                 <MenuItem value="User">User</MenuItem>

//               </TextField>
//             </Grid>
//             <Grid item xs={2}>
//               <Button
//                 type="button"
//                 variant="contained"
//                 color="secondary"
//                 onClick={() => handleRemoveMember(index)}
//                 style={{ background: 'transparent', boxShadow: 'none' }}
                
//               >
//                 <FontAwesomeIcon icon={faTimesCircle} style={{ color: 'red'}} />
//               </Button>
//             </Grid>
//           </Grid>
//         ))}
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             <Button
//               type="button"
//               variant="contained"
//               color="primary"
//               onClick={handleAddMember}
//               style={{
//                 background: 'transparent',
//                 color: 'black',
//                 boxShadow: 'none',
//               }}
//               startIcon={<FontAwesomeIcon icon={faUserPlus} style={{ color: 'black' }} />}
//             >
//               Add Members
//             </Button>
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
//               }}
//             >
//               Invite
//             </Button>
//           </Grid>
//         </Grid>
//       </form>
//     </div>
//   );
// };

// export default InviteMembersPopup;

