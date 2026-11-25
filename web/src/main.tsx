import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./auth/AuthContext";
import "./styles.css";

// Boot Novus (Pendo) once, before the app renders, with an anonymous visitor. The SDK
// restores a returning visitor from its own storage. AuthProvider identifies the
// signed-in user once a session is available.
pendo.initialize({
  visitor: {
    id: "",
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
