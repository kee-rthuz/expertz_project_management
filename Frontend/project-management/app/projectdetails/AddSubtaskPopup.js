// import React, { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import Grid from '@mui/material/Grid';
// import styles from './AddSubtask.module.css';

// const AddSubtaskPopup = ({ onClose }) => {
//   const [subtasks, setSubtasks] = useState([{ name: '' }]);

//   const handleInputChange = (e, index) => {
//     const { name, value } = e.target;
//     const list = [...subtasks];
//     list[index][name] = value;
//     setSubtasks(list);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission here
//   };

//   return (
//     <div className={styles.AddSubtaskPopup}>
//       <div className={styles.closeIcon} onClick={onClose}>
//         <FontAwesomeIcon icon={faTimesCircle} />
//       </div>
//       <h3 className={styles.h3}>Add SubTask</h3>
//       <form className={styles.form} onSubmit={handleSubmit}>
//         {subtasks.map((subtask, index) => (
//           <Grid container spacing={2} key={index}>
//             <Grid item xs={12}>
//               <TextField
//                 label="Title"
//                 type="text"
//                 name="title"
//                 value={subtask.title}
//                 onChange={(e) => handleInputChange(e, index)}
//                 margin="normal"
//                 className={styles.TextField}
//               />
//             </Grid>
//           </Grid>
//         ))}
//         <Grid item xs={12}>
//           <Button
//             type="submit"
//             variant="contained"
//             style={{
//               backgroundColor: '#000',
//               fontSize: '16px',
//               color: 'white',
//               margin: '4px 2px',
//             }}
//           >
//             Add Subtask
//           </Button>
//         </Grid>
//       </form>
//     </div>
//   );
// };

// export default AddSubtaskPopup;
