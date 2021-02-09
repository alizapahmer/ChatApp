localStorage.clear();

//import contacts for the message list 
let currContact=""
fetch('https://jsonplaceholder.typicode.com/users')
  .then(function (response) {
      return response.json();
  })
  .then(function (data) {  
      appendData(data);
  })
  .catch(function (err) {
      console.log('error: ' + err);
  });
//read JSON contacts file, extract the contact names save them in the messages list.
//make each name clickable to get to the chat messages 
function appendData(data) {
  var mainContainer = document.getElementById("conversations");
  for (let i = 0; i < data.length; i++) {
      let div = document.createElement("div");
      div.innerHTML = data[i].name;
      div.classList.add('conversations');
      mainContainer.appendChild(div);
      div.addEventListener("click", () =>renderChat(data[i].name));
  }
}
//open up chat history from storage (if any) and display in the messages box
//using local storage to render and save chat history
function renderChat(contact_message){
    let data=""
    currContact=contact_message;
    document.getElementById("currentUser").innerHTML=currContact;
    document.getElementById('submit').classList.remove('hidden'); 
    if (localStorage.getItem(currContact) !=null){ //check if there is any message history is storage
        data= localStorage.getItem(currContact)
    }
 
    document.getElementById("chat").innerHTML= data //currently this just pastes all of the chat history as a long string without format. 
    //splitting up the string and adding the css classes should take care of that 

}
//if the user presses the Send button, return the current time, add it to the chat history and trigger the response on a delay
function sendDate(){
    let chatStorage = localStorage.getItem(currContact);
    let time = new Date().toLocaleTimeString();
    let div = document.createElement("p");
    div.innerHTML= time;
    document.getElementById("chat").appendChild(div);
    div.classList.add("usermsg");
    let chats = chatStorage ? chatStorage + div.innerHTML : div.innerHTML;
    localStorage.setItem(currContact,chats); 
    let response = setTimeout('sendBack()',1000);
    
}
function sendBack(){
    let time = new Date().toLocaleTimeString();
    let div = document.createElement("p");
    div.innerHTML= time;
    document.getElementById("chat").appendChild(div);
    div.classList.add("friendmsg");
    let chatStorage = localStorage.getItem(currContact);
    let chats = chatStorage + " " + div.innerHTML; 
    localStorage.setItem(currContact,chats);
}
