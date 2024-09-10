import React, { Component } from "react";
import App from '/app.css'
function Home(){
    return(
    <div className="curd">
        <form className="addform">
            <div>
            <lable>NAME</lable>
            <input type="text" placeholder="type here"/>
            </div>
            <div>
            <lable>EMAIL</lable>
            <input type="text" placeholder="type here"/>
            </div>
            <button>ADD</button>
        </form>
        </div>y
        
    )

}

export default Home