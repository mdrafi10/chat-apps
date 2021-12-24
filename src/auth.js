// listen for auth stats changes
auth.onAuthStateChanged((user) => {
  if (user) {
    // get data
    setupUser(user);
    setupProfileUser(user);
    setTimeout(() => {
      const room = db.collection("chatroom");
      setupChatroom(room);

      const data = db.collection("chats");
      setupChats(data);
    }, 3500);

    const chats = document.querySelector(".chatApp");
    const signupPage = document.querySelector(".signup-page");
    const loginPage = document.querySelector(".login-page");
    chats.style.display = "block";
    signupPage.classList.add("hidden");
    loginPage.classList.add("hidden");
  } else {
    setupUser();
    setTimeout(() => {
      if (window.location.hash === "#loaded") {
        window.location.hash = "";
        window.location.href = window.location.href.replace("#", "");
      }
    }, 20);
    const chats = document.querySelector(".chatApp");
    const loginPage = document.querySelector(".login-page");
    chats.style.display = "none";
    loginPage.classList.toggle("hidden");
  }
});

// signup
const signupForm = document.querySelector("#signup-form");
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //   color
  const color = [
    "text-green-500",
    "text-yellow-500",
    "text-blue-500",
    "text-indigo-500",
    "text-purple-500",
    "text-pink-500",
    "text-lime",
    "text-teal",
    "text-cyan",
    "text-violet",
    "text-fuchsia",
    "text-rose",
    "text-orabge",
  ];
  const rndm = Math.floor(Math.random() * color.length);
  const getColor = color[rndm];
  //   get user info
  const email = signupForm["signup-email"].value;
  const password = signupForm["signup-password"].value;

  //   signup the user
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((cred) => {
      // console.log(cred);
      return db.collection("user").doc(cred.user.uid).set({
        fname: signupForm["signup-text"].value,
        color: getColor,
        userId: new Date().getTime().toString(),
      });
    })
    .then(() => signupForm.reset());
});

// logout
const logout = document.querySelector("#logout1");

logout.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.clear();
  setTimeout(() => {
    if (!window.location.hash) {
      window.location = window.location + "#loaded";
      window.location.reload();
    }
    console.log(window.location);
    console.log("logut click");
  }, 10);
  auth.signOut();
});

// login
const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const messageF = document.querySelector(".login-message");
  // get user info
  const email = loginForm["login-email"].value;
  const password = loginForm["login-password"].value;

  auth
    .signInWithEmailAndPassword(email, password)
    .then((cred) => {
      messageF.innerHTML = "Login Success";
      messageF.classList.remove("hidden");
      messageF.style.background = "green";
      setTimeout(() => messageF.classList.add("hidden"), 2000);
      loginForm.reset();
    })
    .catch((err) => {
      if (err.code === "auth/user-not-found") {
        messageF.innerHTML = "The Email is invalid";
        messageF.classList.remove("hidden");
        setTimeout(() => messageF.classList.add("hidden"), 2000);
      } else {
        messageF.innerHTML = "The Password is invalid";
        messageF.classList.remove("hidden");
        setTimeout(() => messageF.classList.add("hidden"), 2000);
      }
    });
});
