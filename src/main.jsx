// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
// import store from "./Redux/store.js";
// import { PersistGate } from "reduxjs-toolkit-persist/es/integration/react";
// import { persistStore } from "reduxjs-toolkit-persist";
// import { Provider } from "react-redux";
// import "./index.css";

// let persistor = persistStore(store);

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <PersistGate loading={null} persistor={persistor}>
//         <App />
//       </PersistGate>
//     </Provider>
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
