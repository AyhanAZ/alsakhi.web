import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxRpkI57dnQJtGZOzMSMTm8tl2qkU4lxY",
  authDomain: "the-website-saves.firebaseapp.com",
  projectId: "the-website-saves",
  storageBucket: "the-website-saves.appspot.com",
  messagingSenderId: "963337513800",
  appId: "1:963337513800:web:a0503592a496bd9a89217d",
  measurementId: "G-2DTX3DG49W",
};

// Initialize Firebase
console.log("Initializing Firebase...");
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
console.log("Firebase initialized successfully.");

// DOM Elements
console.log("Getting DOM elements...");
const loginPopupOverlay = document.getElementById("login-popup-overlay");
const closeLoginPopup = document.getElementById("close-login-popup");
const accountButton = document.getElementById("account-button");
const signinButton = document.getElementById("signin-btn");
const signupButton = document.getElementById("signup-btn");
const signoutButton = document.getElementById("signout-btn");
const popupTitle = document.getElementById("popup-title");

// Verify DOM Elements
if (!loginPopupOverlay || !closeLoginPopup || !accountButton || !signinButton || !signupButton || !signoutButton) {
  console.error("Error: One or more DOM elements are missing.");
}

// Show popup
accountButton.addEventListener("click", () => {
  console.log("Account button clicked. Showing login popup.");
  loginPopupOverlay.style.display = "block";
});

// Close popup
closeLoginPopup.addEventListener("click", () => {
  console.log("Close button clicked. Hiding login popup.");
  loginPopupOverlay.style.display = "none";
});

// Sign-up logic
signupButton.addEventListener("click", async () => {
  console.log("Sign-up button clicked.");
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  if (!email || !password) {
    console.warn("Sign-up error: Missing email or password.");
    alert("Please fill in both email and password.");
    return;
  }
  try {
    console.log(`Attempting to sign up with email: ${email}`);
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("Sign-up successful:", userCredential);
    alert("Sign-up successful! User: " + userCredential.user.email);
    popupTitle.textContent = "Welcome, " + userCredential.user.email;
    toggleSignInButtons(true);
  } catch (error) {
    console.error("Sign-up error:", error);
    alert("Sign-up error: " + error.message);
  }
});

// Sign-in logic
signinButton.addEventListener("click", async () => {
  console.log("Sign-in button clicked.");
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  if (!email || !password) {
    console.warn("Sign-in error: Missing email or password.");
    alert("Please fill in both email and password.");
    return;
  }
  try {
    console.log(`Attempting to sign in with email: ${email}`);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Sign-in successful:", userCredential);
    alert("Welcome back, " + userCredential.user.email);
    popupTitle.textContent = "Welcome, " + userCredential.user.email;
    toggleSignInButtons(true);
  } catch (error) {
    console.error("Sign-in error:", error);
    alert("Sign-in error: " + error.message);
  }
});

// Sign-out logic
signoutButton.addEventListener("click", async () => {
  console.log("Sign-out button clicked.");
  try {
    await signOut(auth);
    console.log("Sign-out successful.");
    alert("You have been signed out.");
    popupTitle.textContent = "Login to Your Account";
    toggleSignInButtons(false);
  } catch (error) {
    console.error("Sign-out error:", error);
    alert("Sign-out error: " + error.message);
  }
});

// Toggle sign-in/out button visibility
function toggleSignInButtons(isSignedIn) {
  console.log("Toggling sign-in buttons. Is signed in:", isSignedIn);
  if (isSignedIn) {
    signinButton.style.display = "none";
    signupButton.style.display = "none";
    signoutButton.style.display = "block";
  } else {
    signinButton.style.display = "block";
    signupButton.style.display = "block";
    signoutButton.style.display = "none";
  }
}
