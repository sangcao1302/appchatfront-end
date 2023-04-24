import React, { Component } from "react";
import "./style.css";
import io from "socket.io-client";
const socket = io.connect("https://appchat-fmj9.onrender.com");
socket.on("text_sender", (data,id) => {
  
  let text1 = `<div class=${id===socket.id?"you":"other"}>
              <p>${data}</p>
  </div>`;
  console.log(id)
  document.querySelector(".message").innerHTML+=text1
})



export default class App extends Component {
  arrText = [];
  state = {
    id:socket.id
  };
  a = true;

  textMessage = async(event) => {
     
    await  this.setState({
        chat: document.getElementById("inputMess").value,
      
        id:socket.id
      });
      
   
     
  socket.emit("text_send",this.state.chat,socket.id)

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
        <div className="reverse row">
          <div className="message col-12">
              {/* <div className="you">
                  <h1>abc</h1>
            </div> */}
            <div className="other">
            </div>
          </div>
        </div>

        <div className="footer">
          <form onSubmit={this.textMessage} className="form">
            <div className=" d-flex">
              <input
                type="text"
                className="form-control"
                id="inputMess"
                placeholder="Message"
              />
              <button type="submit" className="btn btn-primary">
                Gửi
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
