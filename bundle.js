// bundle.js — full production code

// --- ENV ---
const ENV = {
  APP_NAME: "Elparadisogonzalo",
  APP_PACKAGE: "com.elparadisogonzalo.app",
  APP_VERSION: "2.0.0",
  BUILD_ENV: "production",
  DOMAIN: "https://elparadisogonzalo.com",
  API_BASE: "https://elparadisogonzalo.com/api",
  DEBUG: false
};

// --- Logger ---
const log = (...args) => { if (ENV.DEBUG) console.log("[APP]", ...args); };

// --- API Service ---
const api = async (path, options={}) => {
  const res = await fetch(`${ENV.API_BASE}/${path}`, {
    ...options,
    headers: { "Content-Type": "application/json" }
  });
  if(!res.ok) throw new Error("API request failed");
  return res.json();
};

// --- Components ---
const renderHeader = () => {
  const header = document.createElement("header");
  header.innerHTML = "<h1>Elparadisogonzalo</h1>";
  return header;
};

const renderHome = () => {
  const main = document.createElement("main");
  main.innerHTML = `
    <h2>Welcome</h2>
    <p>This is the official app for elparadisogonzalo.com</p>
  `;
  return main;
};

const renderFooter = () => {
  const footer = document.createElement("footer");
  footer.innerHTML = "<small>© Elparadisogonzalo 2026</small>";
  return footer;
};

// --- App ---
const startApp = () => {
  log("Starting app");
  const root = document.getElementById("app");
  if(!root) throw new Error("#app element not found");
  root.appendChild(renderHeader());
  root.appendChild(renderHome());
  root.appendChild(renderFooter());
};

// --- Initialize ---
document.addEventListener("DOMContentLoaded", startApp);
