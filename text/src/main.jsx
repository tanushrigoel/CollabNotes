import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { RecoilRoot } from "recoil";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RecoilRoot>
      <GoogleOAuthProvider clientId="1005623784929-hn11je6dhv9hbe3gghmt1k1ke749r83b.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    </RecoilRoot>
  </StrictMode>
);
