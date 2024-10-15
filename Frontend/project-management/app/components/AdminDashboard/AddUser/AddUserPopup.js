


// import React, { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTimesCircle, faUserPlus } from '@fortawesome/free-solid-svg-icons';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import Grid from '@mui/material/Grid';
// import MenuItem from '@mui/material/MenuItem';

// const InviteUserPopup = ({ onClose }) => {
//   const [users, setUsers] = useState([{ email: '', name: '', userType: 'Basic' }]);

//   const handleEmailChange = (e, index) => {
//     const updatedUsers = [...users];
//     updatedUsers[index].email = e.target.value;
//     setUsers(updatedUsers);
//   };

//   const handleInputChange = (e, index) => {
//     const updatedUsers = [...users];
//     updatedUsers[index].name = e.target.value;
//     setUsers(updatedUsers);
//   };

//   const handleUserTypeChange = (e, index) => {
//     const updatedUsers = [...users];
//     updatedUsers[index].userType = e.target.value;
//     setUsers(updatedUsers);
//   };

//   const handleInvite = () => {
//     users.forEach((user) => {
//       console.log(`Inviting ${user.email} as a ${user.userType} user...`);
//       // Add logic to send invitations
//     });

//     onClose();
//   };

//   const handleAddUser = () => {
//     setUsers([...users, { email: '', name: '', userType: 'Basic' }]);
//   };

//   const handleRemoveUser = (index) => {
//     const updatedUsers = [...users];
//     updatedUsers.splice(index, 1);
//     setUsers(updatedUsers);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     handleInvite();
//   };

//   return (
//     <div>
//       <h3 className="text-lg font-semibold mb-4">Add Users</h3>
//       <form onSubmit={handleSubmit}>
//         <Grid container spacing={2}>
//           {users.map((user, index) => (
//             <React.Fragment key={index}>
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   label="Email"
//                   type="text"
//                   name="email"
//                   value={user.email}
//                   onChange={(e) => handleEmailChange(e, index)}
//                   required
//                   fullWidth
//                   margin="normal"
//                   className="mb-2"
//                 />
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   label="Name"
//                   type="text"
//                   name="name"
//                   value={user.name}
//                   onChange={(e) => handleInputChange(e, index)}
//                   margin="normal"
//                   className="mb-2"
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   select
//                   label="User Type"
//                   value={user.userType}
//                   onChange={(e) => handleUserTypeChange(e, index)}
//                   variant="outlined"
//                   size="small"
//                   margin="normal"
//                   className="mb-2"
//                   fullWidth
//                 >
//                   <MenuItem value="Pro-User">Pro-User</MenuItem>
//                   <MenuItem value="Admin">Admin</MenuItem>
//                   <MenuItem value="Guest">Guest</MenuItem>
//                   <MenuItem value="Read-Only">Read-Only</MenuItem>
//                   <MenuItem value="User">User</MenuItem>
//                 </TextField>
//               </Grid>
//               <Grid item xs={12} md={6} className="flex items-center justify-end">
//                 {users.length > 1 && (
//                   <Button
//                     type="button"
//                     variant="outlined"
//                     color="secondary"
//                     onClick={() => handleRemoveUser(index)}
//                     startIcon={<FontAwesomeIcon icon={faTimesCircle} />}
//                     style={{ marginRight: '8px' }}
//                   >
//                     Remove
//                   </Button>
//                 )}
//               </Grid>
//             </React.Fragment>
//           ))}
//           <Grid item xs={12} className="flex justify-end">
//             <Button
//               type="button"
//               variant="outlined"
//               color="primary"
//               onClick={handleAddUser}
//               startIcon={<FontAwesomeIcon icon={faUserPlus} />}
//             >
//               Add User
//             </Button>
//           </Grid>
//           <Grid item xs={12} className="flex justify-end gap-4">
//             <Button
//               type="button"
//               variant="outlined"
//               onClick={onClose}
//               style={{
//                 fontSize: '16px',
//                 margin: '4px 2px',
//               }}
//             >
//               Cancel
//             </Button>
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
//               Submit
//             </Button>
//           </Grid>
//         </Grid>
//       </form>
//     </div>
//   );
// };

// export default InviteUserPopup;
