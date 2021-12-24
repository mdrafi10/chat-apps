class CreateChatroom {
  constructor(data) {
    this.createRoom = data;
    this.unsub;
  }
  async addChatRoom(room) {
    //   format a chat object
    const chat = {
      title: room,
    };
    // save the document in firestore
    const response = await this.createRoom.add(chat);
    return response;
  }
  //   get firestore data
  getChatsRoom(callback) {
    this.unsub = this.createRoom.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          // update the dom
          callback(change.doc.data());
        }
      });
    });
  }
}
// const createRoom = new CreateChatroom();
// createRoom
//   .addChatRoom("hello world")
//   .then(() => console.log("room added"))
//   .catch((err) => console.log(err));

// createRoom.getChatsRoom((data) => {
//   console.log(data);
// });
