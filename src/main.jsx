// import React from "react";
// import { BrowserRouter } from "react-router-dom";
// import ReactDOM from "react-dom";
// import { PersistGate } from "reduxjs-toolkit-persist/es/integration/react";
// import { persistStore } from "reduxjs-toolkit-persist";
// import store from "./Redux/store.js";
// import { Provider } from "react-redux";
// import App from "./App";
// import LandingPage from "./Pages/LandingPage/LandingPage";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./index.css";

// let persistor = persistStore(store);

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <Provider store={store}>
//         <PersistGate loading={null} persistor={persistor}>
//           <React.Suspense fallback={<LandingPage />}>
//             <App />
//           </React.Suspense>
//         </PersistGate>
//       </Provider>
//     </BrowserRouter>
//   </React.StrictMode>
// );

// ======================================================

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/store.js";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
