// render the chat tamplates to the dom
// clear the list of chats (when the room changes)

class ChatUI {
  constructor(list, room, chatClass) {
    this.list = list;
    this.room = room;
    this.chatClass = chatClass;
  }
  clear() {
    this.list.innerHTML = "";
  }
  getColor(data) {
    this.color = data;
    // return data;
    // console.log(data);
  }
  render(data) {
    const when = dateFns.distanceInWordsToNow(data.created_at.toDate(), {
      addSuffix: true,
    });

    const getClor = JSON.parse(localStorage.getItem("random"));
    // console.log(getClor.upName);
    const html = `
      <li class="username mb-3 flex ${
        getClor?.userId === data.rndom?.userId ? "justify-end" : "justify-start"
      } items-end ">
      
      <div class="flex items-end">
         <div class="${data.img === "" ? "hidden" : "block"}">
         <img src=${data.img}
          class="w-6 h-6 object-cover rounded-full overflow-hidden"/>
        </div>
        <div class="bg-${data.rndom.gColor.replace(
          "text-",
          ""
        )} w-7 h-7 object-cover rounded-full overflow-hidden flex items-center capitalize justify-center font-semibold ${
      data.img === "" ? "block" : "hidden"
    }">${data.username.substr(0, 1)}</div>
      </div>
       <div class="${
         getClor?.userId === data.rndom?.userId ? "bg-mess" : "bg-mess"
       } p-3 rounded-md inline-block overflow-hidden ml-1">
       <div class="flex items-center justify-between">
        <span class="font-bold mr-2 capitalize  ${
          data.rndom?.userId === data.rndom?.userId
            ? data.rndom.gColor
            : "text-red-500"
        }">${data.username}</span>
        <div class="time  text-xs  ${
          getClor?.userId === data.rndom?.userId
            ? "text-gray-500"
            : "text-gray-500"
        }">${when}</div>
        </div>
        <span class="message">${data.message}</span>
       </div> 
       
      </li>
      `;
    this.list.innerHTML += html;

    this.list.scrollBy(0, this.list.scrollHeight);
  }
  newChatRoom(data) {
    const htmlT = `
      <button
      class="btnRoom flex items-center text-left p-2 px-4 pl-9 mb-0.5 font-semibold rounded-lg text-gray-500  hover:bg-srci w-full"
      id=${data.title.id}><span class="has text-2xl mr-1">#</span> ${data.title.chatroom}</button>`;
    this.room.innerHTML += htmlT;
    let items = document.querySelectorAll(".btnRoom");
    const leftSideRoom = document.querySelector(".left-side-room");
    const imgUploading = document.querySelector(".img-uploading");
    items.forEach((item) => {
      item.addEventListener("click", () => {
        items.forEach((equal) => {
          if (equal.className !== item.className) {
            equal.classList.remove("bg-srci");
            equal.classList.remove("text-gray-300");
            equal.classList.add("text-gray-500");
          }
        });
        item.classList.add("bg-srci");
        item.classList.add("text-gray-300");
        item.classList.remove("text-gray-500");
        leftSideRoom.style.left = "-225px";
        imgUploading.classList.add("hidden");
      });
    });
  }
}
