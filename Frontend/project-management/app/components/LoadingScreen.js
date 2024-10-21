// components/LoadingScreen.js
import CircularProgress from "@mui/material/CircularProgress";

const LoadingScreen = () => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-[#c8d8e4] flex justify-center items-center">
      <CircularProgress size={60} color="inherit" />
    </div>
  );
};

export default LoadingScreen;
