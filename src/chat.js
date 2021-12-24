class Chatroom {
  constructor(room, username, rendom, data, imgURL) {
    this.room = room;
    this.username = username;
    this.rendom = rendom;
    this.chats = data;
    this.img = imgURL;
    this.unsub;
  }
  async addChat(message) {
    //   format a chat object
    const now = new Date();
    const chat = {
      message,
      username: this.username,
      rndom: this.rendom,
      room: this.room,
      img: this.img,
      created_at: firebase.firestore.Timestamp.fromDate(now),
    };
    // save the document in firestore
    const response = await this.chats.add(chat);
    return response;
  }
  //   get firestore data
  getChats(callback) {
    this.unsub = this.chats
      .where("room", "==", this.room)
      .orderBy("created_at")
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            // update the dom
            callback(change.doc.data());
          }
        });
      });
  }
  // updateName(username, color) {
  //   this.username = username;
  //   this.rendom = color;
  //   localStorage.setItem("username", username);
  //   localStorage.setItem("random", JSON.stringify(color));
  // }
  updateRoom(room) {
    this.room = room;
    // console.log("room updated");
    if (this.unsub) {
      this.unsub();
    }
  }
}

// const chatroom = new Chatroom("general", "suan");
// chatroom
//   .addChat("hello world")
//   .then(() => console.log("chat added"))
//   .catch((err) => console.log(err));

// chatroom.getChats((data) => {
//   console.log(data);
// });

// setTimeout(() => {
//   chatroom.updateRoom("gaming");
//   chatroom.uadateName("rafi");
//   chatroom.getChats((data) => {
//     console.log(data);
//   });
//   chatroom.addChat("ki re vai");
// }, 3000);
