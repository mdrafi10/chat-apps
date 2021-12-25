// dom slector
const chatlist = document.querySelector(".chat-list");
const newChatFrom = document.querySelector(".new-chat");
const upDateName = document.querySelector(".new-name");
const upDateMssg = document.querySelector(".upadate-mssg");
const rooms = document.querySelector(".chat-room");
const newChatroom = document.querySelector(".new-chatroom");
const newChatroom1 = document.querySelector("#chatroom1");
const chatClass = document.querySelector(".chatClass");
const userName = document.querySelector(".user");
const userName1 = document.querySelector(".user1");
// popup er jannno
const popUp = document.querySelector(".pop");
const backdrop = document.querySelector(".bg");
const showPop = document.querySelector("#popupForm");
// login & signup
const loginPage = document.querySelector(".login-page");
const signupPage = document.querySelector(".signup-page");

const newAccout = document.querySelector("#create-accont");
const login = document.querySelector("#login");
// profile proShow
const profile = document.querySelector(".profile");
const proShow = document.querySelector(".proShow");
// profile photo close and show
const profilePhoto = document.querySelector(".profile-photo");
const profileClose = document.querySelector(".profile-close");
const chatMessage = document.querySelector(".right-side-message");
const proF = document.querySelector("#proF");
// Mobile toggle
const sideTog = document.querySelector(".nav-tog");
const leftSideRoom = document.querySelector(".left-side-room");
const imgUploading = document.querySelector(".img-uploading");
const EditPhoto = document.querySelector("#EditPhoto");
const showP = document.querySelector(".show-p");

// setupUser function form auth js
function setupUser(user) {
  if (user) {
    // account info
    db.collection("user")
      .doc(user.uid)
      .get()
      .then((doc) => {
        const colorGenerate = {
          upName: doc.data().fname,
          gColor: doc.data().color,
          userId: doc.data().userId,
        };
        localStorage.setItem("random", JSON.stringify(colorGenerate));
        userName.innerHTML = doc.data().fname;
        userName.classList.add(doc.data().color);
        userName1.innerHTML = doc.data().fname;
        userName1.classList.add(doc.data().color);
      });
  } else {
    userName.innerHTML = "";
  }
}
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// setupChats function form auth js
function setupChats(data) {
  // add a new chat
  newChatFrom.addEventListener("submit", (e) => {
    e.preventDefault();

    const message = newChatFrom.message.value.trim();
    chatroom
      .addChat(message)
      .then(() => newChatFrom.reset())
      .catch((err) => console.log(err));

    newChatFrom.reset();
  });

  // update the chat room
  rooms.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      chatUI.clear();
      chatClass.innerHTML = e.target.innerHTML.trim();
      chatroom.updateRoom(e.target.getAttribute("id"));
      chatroom.getChats((chat) => chatUI.render(chat));
    }
  });

  // check local stroage for a name
  // const colorjson = JSON.parse(localStorage.getItem("instantNameColor"));
  const randm = JSON.parse(localStorage.getItem("random"));
  const colorRndom = randm ? randm : null;

  const username = randm?.upName ? randm?.upName : "Rafi";
  const imgURL = localStorage.getItem("imgURL")
    ? localStorage.getItem("imgURL")
    : "";

  //  class instance
  const chatroom = new Chatroom("general", username, colorRndom, data, imgURL);

  // get chat & render
  chatroom.getChats((data) => chatUI.render(data));
}
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// setupChatroom function form auth js
function setupChatroom(data) {
  // class instance
  const createRoom = new CreateChatroom(data);

  // new chatroom added
  newChatroom.addEventListener("submit", (e) => {
    e.preventDefault();
    if (newChatroom.nchatroom.value) {
      const room = {
        id: new Date().getTime(),
        chatroom: newChatroom.nchatroom.value.trim(),
      };
      createRoom
        .addChatRoom(room)
        .then(() => newChatroom.reset())
        .catch((err) => console.log(err));
    }
    showPop.style.display = "none";
    backdrop.style.display = "none";
  });

  // get chat & render
  createRoom.getChatsRoom((data) => chatUI.newChatRoom(data));
}
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//  class instances
const chatUI = new ChatUI(chatlist, newChatroom1, chatClass);

// popUp event
popUp.addEventListener("click", () => {
  showPop.style.display = "block";
  backdrop.style.display = "block";
});
backdrop.addEventListener("click", () => {
  showPop.style.display = "none";
  backdrop.style.display = "none";
});
// user inner Html
const username1 = localStorage.getItem("username");
// user.innerHTML = username1;

// login & signup event
newAccout.addEventListener("click", () => {
  loginPage.classList.add("hidden");
  signupPage.classList.toggle("hidden");
});
login.addEventListener("click", () => {
  loginPage.classList.toggle("hidden");
  signupPage.classList.add("hidden");
});
// profile event
profile.addEventListener("click", () => proShow.classList.toggle("hidden"));
proShow.addEventListener("mouseleave", () => proShow.classList.add("hidden"));
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// profile photo Add
function setupProfileUser(user) {
  const imgP = document.querySelector("#imgP");
  const img = document.querySelector("#img");
  const chooseFile = document.querySelector("#chooseFile");
  const uploadBtn = document.querySelector("#uploadBtn");
  const showUp = document.querySelector(".field-s");
  const imgUpl = document.querySelector(".imgUpl");

  let file = {};

  chooseFile.addEventListener("change", (e) => {
    file = e.target.files[0];
    imgUploading.classList.remove("hidden");
    imgUpl.classList.remove("hidden");
    storage
      .ref("users/" + user.uid + "/profile.jpg")
      .put(file)
      .then((c) => {
        imgUploading.classList.add("hidden");
        imgUpl.classList.add("hidden");
        console.log("uploded");
      })
      .catch((err) => console.log(err.message));
    showUp.classList.remove("hidden");
  });

  uploadBtn.addEventListener("click", (e) => {
    e.preventDefault();
    storage
      .ref("users/" + user.uid + "/profile.jpg")
      .getDownloadURL()
      .then((imgURl) => {
        img.src = imgURl;
        imgP.src = imgURl;
      })
      .catch((err) => {
        console.log(err.message);
      });

    showUp.classList.add("hidden");
  });
  const icon = document.querySelector(".profile > i");
  const div = document.querySelector(".profile > div");
  storage
    .ref("users/" + user?.uid + "/profile.jpg")
    .getDownloadURL()
    .then((imgURl) => {
      img.src = imgURl;
      imgP.src = imgURl;
      localStorage.setItem("imgURL", imgURl);
      div.style.display = "block";
      icon.style.display = "none";
    })
    .catch((err) => {
      icon.style.display = "block";
      div.style.display = "none";
      if (err.message) {
        console.log("user image not set");
      }
    });
}
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// profile toggle
profileClose.addEventListener("click", () => {
  setTimeout(() => {
    if (!window.location.hash) {
      window.location = window.location + "#loaded";
      window.location.reload();
    }
    console.log(window.location);
    console.log("logut click");
  }, 2);
  setTimeout(() => {
    if (window.location.hash === "#loaded") {
      window.location.hash = "";
      window.location.href = window.location.href.replace("#", "");
    }
  }, 3);

  profilePhoto.classList.add("hidden");
  chatMessage.classList.remove("hidden");
});
proF.addEventListener("click", () => {
  profilePhoto.classList.remove("hidden");
  chatMessage.classList.add("hidden");
});

// side toggle btn
sideTog.addEventListener("click", () => {
  leftSideRoom.style.left = "0px";
  imgUploading.classList.remove("hidden");
});

imgUploading.addEventListener("click", () => {
  leftSideRoom.style.left = "-225px";
  imgUploading.classList.add("hidden");
});

// EditPhoto uploading toggle
EditPhoto.addEventListener("click", () => {
  showP.style.visibility = "visible";
  showP.style.top = "3.5rem";
  showP.style.transition = "0.4s";
});

 const chats = document.querySelector(".chatApp");
  if (window.innerHeight < 670 && window.innerWidth > 640) {
    chats.style.paddingTop = "20px";
  } else if (window.innerWidth < 640) {
    chats.style.paddingTop = "0px";
  } else {
    chats.style.paddingTop = "8rem";
  }

window.addEventListener("resize", () => {
  const chats = document.querySelector(".chatApp");
  if (window.innerHeight < 670 && window.innerWidth > 640) {
    chats.style.paddingTop = "20px";
  } else if (window.innerWidth < 640) {
    chats.style.paddingTop = "0px";
  } else {
    chats.style.paddingTop = "8rem";
  }
});
