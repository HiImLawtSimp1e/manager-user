import "./App.scss";

import { ToastContainer } from "react-toastify";

import NavLayout from "./Components/Navigation/NavLayout";
import AppRoutes from "./Routes/AppRoutes";

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <NavLayout />
      </div>
      <div className="App-container">
        <AppRoutes />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={1800}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      ></ToastContainer>
    </div>
  );
}

export default App;
