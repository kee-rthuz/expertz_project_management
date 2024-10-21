const initialState = {
    projectDetails: null, // Initial state for project details
  };
  
  const projectReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_PROJECT_DETAILS':
        return {
          ...state,
          projectDetails: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default projectReducer;
  