/* ═══════════════════════════════════════════════════════════
   🔥 FIREBASE CONFIGURATION
   ───────────────────────────────────────────────────────────
   Project: mysmm-bd
   Realtime Database: https://mysmm-bd-default-rtdb.firebaseio.com
   ═══════════════════════════════════════════════════════════ */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  get,
  onValue,
  remove
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// 🔑 Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEs98MYk4Kr6L735WDcsLc9XlC9vmotsw",
  authDomain: "mysmm-bd.firebaseapp.com",
  databaseURL: "https://mysmm-bd-default-rtdb.firebaseio.com",
  projectId: "mysmm-bd",
  storageBucket: "mysmm-bd.firebasestorage.app",
  messagingSenderId: "931765663822",
  appId: "1:931765663822:web:da8c4aa0351790c08eab1f",
  measurementId: "G-0XD6G2ZS9P"
};

// 🚀 Initialize Firebase
const app = initializeApp(firebaseConfig);
const db  = getDatabase(app);

// 📍 Reference to our config node
const CONFIG_REF = ref(db, "3dlove_config");

// 🌐 Expose to global window so non-module scripts can access
window.firebaseDB = {
  app,
  db,
  ref,
  set,
  get,
  onValue,
  remove,
  CONFIG_REF
};

// 🔔 Dispatch event when Firebase is ready
window.dispatchEvent(new Event("firebase-ready"));
console.log("🔥 Firebase initialized successfully — Project: mysmm-bd");
