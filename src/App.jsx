import React, { Component } from "react";
import "./style.css";
import io from "socket.io-client";
let socket = io.connect("https://appchat-fmj9.onrender.com/");

socket.on("text_sender", (data,id) => {
  
  let text1 = `<div class=${id===socket.id?"you":"other"}>
              <h1>${data}</h1>
  </div>`;
  console.log(id)
  document.querySelector(".message").innerHTML+=text1
})



export default class App extends Component {
  arrText = [];
  state = {
    chat: "",
    left:"left",
    right:"right",
    id:socket.id
  };
  a = true;

  textMessage = async (event) => {
     
      this.setState({
        chat: document.getElementById("inputMess").value,
        position: "text-end",
        id:socket.id
      });
      
   
     
   await socket.emit("text_send", document.getElementById("inputMess").value,socket.id)

      console.log(this.state.id)
   
    event.preventDefault();
  };


  // alertMessage = () => {
  //  return 
    
    
    
      
  //   });
   
  // };
  
  render() {
   
    return (
      <div className="container">
        <div className="header">
          <h1>App chat</h1>
        </div>
        <div className="reverse">
          <div className="message">
              {/* <div className="you">
                  <h1>abc</h1>
            </div>
            <div className="other">
                  <h1>abc</h1>
            </div> */}
          </div>
        </div>

        <div className="footer">
          <form onSubmit={this.textMessage} className="form">
            <div className="mb-3 d-flex">
              <input
                type="text"
                className="form-control"
                id="inputMess"
                placeholder="Message"
              />
              <button type="submit" className="btn btn-primary">
                Gui
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
