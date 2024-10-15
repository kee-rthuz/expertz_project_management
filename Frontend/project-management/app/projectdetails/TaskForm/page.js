




// // now currently wrking code 2

// // import React, { useState } from 'react';
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // import { faTimes } from '@fortawesome/free-solid-svg-icons';
// // import TextField from '@mui/material/TextField';
// // import Button from '@mui/material/Button';
// // import styles from './taskform.module.css';

// // const TaskForm = ({ projectId, onClose, onTaskAdded }) => {
// //   const [taskData, setTaskData] = useState({
// //     title: '',
// //     assignedTo: '',
// //     startDate: '',
// //     dueDate: '',
// //   });

// //   const handleInputChange = (e) => {
// //     setTaskData({
// //       ...taskData,
// //       [e.target.name]: e.target.value,
// //     });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     try {
// //       const response = await fetch('http://localhost:5000/api/tasks', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({
// //           projectId,
// //           ...taskData,
// //         }),
// //       });

// //       const data = await response.json();

// //       console.log('Task created successfully:', data);

// //       // Notify the parent component that a task has been added
// //       onTaskAdded();

// //       // Close the task creation popup
// //       onClose();
// //     } catch (error) {
// //       console.error('Error creating task:', error);
// //     }
// //   };

// //   return (
// //     <div className={styles.popupStyle}>
// //       <div className={styles.closeIcon} onClick={onClose}>
// //         <FontAwesomeIcon icon={faTimes} />
// //       </div>
// //       <h3 className={styles.h3}>Add Task</h3>
// //       <form className={styles.form} onSubmit={handleSubmit}>
// //         <TextField
// //           label="Task Title"
// //           type="text"
// //           name="title"
// //           onChange={handleInputChange}
// //           required
// //           fullWidth
// //           margin="normal"
// //           className={styles.TextField}
// //         />
// //         <TextField
// //           label="Assigned To"
// //           type="text"
// //           name="assignedTo"
// //           onChange={handleInputChange}
// //           // required
// //           // fullWidth
// //           margin="normal"
// //           className={styles.TextField}
// //         />
// //         <TextField
// //           label="Start Date"
// //           type="date"
// //           name="startDate"
// //           onChange={handleInputChange}
// //           required
// //           fullWidth
// //           margin="normal"
// //           InputLabelProps={{ shrink: true }}
// //           className={styles.TextField}
// //         />
// //         <TextField
// //           label="Due Date"
// //           type="date"
// //           name="dueDate"
// //           onChange={handleInputChange}
// //           required
// //           fullWidth
// //           margin="normal"
// //           InputLabelProps={{ shrink: true }}
// //           className={styles.TextField}
// //         />

// //         <Button
// //           type="submit"
// //           variant="contained"
// //           style={{backgroundColor: '#000', fontSize:'16px', color:'white', margin:'4px 2px'}}>
// //           Submit
// //         </Button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default TaskForm;



// // add status and icon code  1------------------------------


// // import React, { useState } from 'react';
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // import { faTimes, faHourglass, faCheck, faSpinner } from '@fortawesome/free-solid-svg-icons'; // Import additional icons
// // import TextField from '@mui/material/TextField';
// // import Button from '@mui/material/Button';
// // import Grid from '@mui/material/Grid';
// // import MenuItem from '@mui/material/MenuItem';
// // import styles from './taskform.module.css';

// // const TaskForm = ({ projectId, onClose, onTaskAdded }) => {
// //   const [taskData, setTaskData] = useState({
// //     title: '',
// //     assignedTo: '',
// //     startDate: '',
// //     dueDate: '',
// //     status: 'No Progress',
// //   });

// //   const handleInputChange = (e) => {
// //     setTaskData({
// //       ...taskData,
// //       [e.target.name]: e.target.value,
// //     });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     try {
// //       const response = await fetch('http://localhost:5000/api/tasks', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({
// //           projectId,
// //           ...taskData,
// //         }),
// //       });

// //       const data = await response.json();

// //       console.log('Task created successfully:', data);

// //       // Notify the parent component that a task has been added and pass the new task data
// //       onTaskAdded(data);

// //       // Close the task creation popup
// //       onClose();
// //     } catch (error) {
// //       console.error('Error creating task:', error);
// //     }
// //   };

// //   return (
// //     <div className={styles.popupStyle}>
// //       <div className={styles.closeIcon} onClick={onClose}>
// //         <FontAwesomeIcon icon={faTimes} />
// //       </div>
// //       <h3 className={styles.h3}>Add Task</h3>
// //       <form className={styles.form} onSubmit={handleSubmit}>
// //         <Grid container spacing={2}>
// //           <Grid item xs={12}>
// //             <TextField
// //               label="Task Title"
// //               type="text"
// //               name="title"
// //               onChange={handleInputChange}
// //               required
// //               fullWidth
// //               margin="normal"
// //               className={styles.TextField}
// //             />
// //           </Grid>
// //             <Grid item xs={6}>
// //              <TextField
// //               label="Assigned To"
// //               type="text"
// //               name="assignedTo"
// //               onChange={handleInputChange}
// //               margin="normal"
// //               className={styles.TextField}
// //             />
// //           </Grid>
// //           <Grid item xs={6}>
// //             <TextField
// //               label="Start Date"
// //               type="date"
// //               name="startDate"
// //               onChange={handleInputChange}
// //               required
// //               fullWidth
// //               margin="normal"
// //               InputLabelProps={{ shrink: true }}
// //               className={styles.TextField}
// //             />
// //           </Grid>
// //           <Grid item xs={6}>
// //             <TextField
// //               label="Due Date"
// //               type="date"
// //               name="dueDate"
// //               onChange={handleInputChange}
// //               required
// //               fullWidth
// //               margin="normal"
// //               InputLabelProps={{ shrink: true }}
// //               className={styles.TextField}
// //             />
// //           </Grid>
          
// //           <Grid item xs={6}>
// //             <TextField
// //               label="Status"
// //               select
// //               name="status"
// //               value={taskData.status}
// //               onChange={handleInputChange}
// //               required
// //               fullWidth
// //               margin="normal"
// //               className={styles.TextField}
// //             >
// //               <MenuItem value="No Progress">No Progress
// //               <FontAwesomeIcon icon={faHourglass} color="#aaa" size="1x" />
// //               </MenuItem>


// //               <MenuItem value="In Progress">In Progress
// //               <FontAwesomeIcon icon={faSpinner} color="black" size="1x" />
// //               </MenuItem>
// //               <MenuItem value="Complete">Complete <FontAwesomeIcon icon={faCheck} color="green" size="1x" />
// //               </MenuItem>
// //             </TextField>
// //           </Grid>

// //           <Grid item xs={12}>
// //             <Button
// //               type="submit"
// //               variant="contained"
// //               style={{
// //                 backgroundColor: '#000',
// //                 fontSize: '16px',
// //                 color: 'white',
// //                 margin: '4px 2px',
// //               }}
// //             >
// //               Submit
// //             </Button>
// //           </Grid>
// //         </Grid>
// //       </form>
// //     </div>
// //   );
// // };

// // export default TaskForm;



// // ----------------icon is showing in task row fixed ------------------------------


// // 111111111111111111
// import React, { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTimes, faHourglass, faCheckCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import Grid from '@mui/material/Grid';     
// import MenuItem from '@mui/material/MenuItem';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import styles from './taskform.module.css';
// import { Row } from 'react-bootstrap';

// const getStatusColor = (statusIcon) => {
//   switch (statusIcon) {
//     case faHourglass:
//       return '#aaa';
//     case faSpinner:
//       return 'orange';
//     case faCheckCircle:
//       return 'green';
//     default:
//       return ''; // default color
//   }
// };

// const TaskForm = ({ projectId, onClose, onTaskAdded }) => {
//   const [selectedStatusIcon, setSelectedStatusIcon] = useState(faHourglass);
//   const [taskData, setTaskData] = useState({
//     title: '',
//     assignedTo: '',
//     startDate: '',
//     dueDate: '',
//     status: 'No Progress',
//   });

//   const handleInputChange = (e) => {
//     setTaskData({
//       ...taskData,
//       [e.target.name]: e.target.value,
//     });

//     if (e.target.name === 'status') {
//       switch (e.target.value) {
//         case 'No Progress':
//           setSelectedStatusIcon(faHourglass);
//           break;
//         case 'In Progress':
//           setSelectedStatusIcon(faSpinner);
//           break;
//         case 'Complete':
//           setSelectedStatusIcon(faCheckCircle);
//           break;
//         default:
//           break;
//       }
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch('http://localhost:5000/api/tasks', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           projectId,
//           ...taskData,
//         }),
//       });

//       const data = await response.json();

//       console.log('Task created successfully:', data);

//       // Notify the parent component that a task has been added and pass the new task data, status icon, and color
//       onTaskAdded({
//         ...data,
//         statusIcon: selectedStatusIcon,
//         statusColor: getStatusColor(selectedStatusIcon),
//       });

//       // Close the task creation popup
//       onClose();
//     } catch (error) {
//       console.error('Error creating task:', error);
//     }
//   };

//   return (
//     <div className={styles.popupStyle}>
//       <div className={styles.closeIcon} onClick={onClose}>
//         <FontAwesomeIcon icon={faTimes} />
//       </div>
//       <h3 className={styles.h3}>Add Task</h3>
//       <form className={styles.form} onSubmit={handleSubmit}>
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             <TextField
//               label="Task Title"
//               type="text"
//               name="title"
//               onChange={handleInputChange}
//               required
//               fullWidth
//               margin="normal"
//               className={styles.TextField}
//             />
//           </Grid>
//           <Grid item xs={6}>
//             <TextField
//               label="Assigned To"
//               type="text"
//               name="assignedTo"
//               onChange={handleInputChange}
//               margin="normal"
//               className={styles.TextField}
//             />
//           </Grid>
//           <Grid item xs={6}>
//             <TextField
//               label="Start Date"
//               type="date"
//               name="startDate"
//               onChange={handleInputChange}
//               required
//               fullWidth
//               margin="normal"
//               InputLabelProps={{ shrink: true }}
//               className={styles.TextField}
//             />
//           </Grid>
//           <Grid item xs={6}>
//             <TextField
//               label="Due Date"
//               type="date"
//               name="dueDate"
//               onChange={handleInputChange}
//               required
//               fullWidth
//               margin="normal"
//               InputLabelProps={{ shrink: true }}
//               className={styles.TextField}
//             />
//           </Grid>
//           <Grid item xs={6}>
//             <TextField
//               label="Status"
//               select
//               name="status"
//               value={taskData.status}
//               onChange={handleInputChange}
//               required
//               fullWidth
//               margin="normal"
//               className={styles.TextField}
//             >
//               <MenuItem value="No Progress">
//                 <ListItemIcon>
//                   <FontAwesomeIcon icon={faHourglass} color="#aaa" size="1x" />
//                 </ListItemIcon>
//                 No Progress
//               </MenuItem>

//               <MenuItem value="In Progress">
//                 <ListItemIcon>
//                   <FontAwesomeIcon icon={faSpinner} color="orange" size="1x" />
//                 </ListItemIcon>
//                 In Progress
//               </MenuItem>

//               <MenuItem value="Complete">
//                 <ListItemIcon>
//                   <FontAwesomeIcon icon={faCheckCircle} color="green" size="1x" />
//                 </ListItemIcon>
//                 Complete
//               </MenuItem>
//             </TextField>
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
//               Submit
//             </Button>
//           </Grid>

//         </Grid>
//       </form>
//     </div>
//   );
// };

// export default TaskForm;








