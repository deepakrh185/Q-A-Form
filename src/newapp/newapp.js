import React, { Component } from "react";
var firebase = require("firebase");
var uuid = require("uuid");

var firebaseConfig = {
  apiKey: "AIzaSyBWiOpxdmJT4ZIlDaLTgPM-xP9pacmPvFY",
  authDomain: "newone-5d1b1.firebaseapp.com",
  databaseURL: "https://newone-5d1b1.firebaseio.com",
  projectId: "newone-5d1b1",
  storageBucket: "newone-5d1b1.appspot.com",
  messagingSenderId: "766445437211",
  appId: "1:766445437211:web:af12ddfbf0d707be6dd3be",
  measurementId: "G-LJ97NG5J3H",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

class Newapp extends Component {
  state = {
    uid: uuid.v1(),
    studentname: "",
    answers: {
      answer1: "",
      answer2: "",
    },
    isSubmitted: false,
  };
  nameHandler = (event) => {
    const student = this.refs.name.value;
    this.setState({ studentname: student }, () => {
      console.log(this.state);
    });
  };
  submitform = () => {
    firebase
      .database()
      .ref("datas/" + this.state.uid)
      .set({
        studentname: this.state.studentname,
        answers: this.state.answers,
      });
    this.setState({ isSubmitted: true });
  };
  changeHandler = (event) => {
    const answer = this.state.answers;
    if (event.target.name === "answer1") {
      answer.answer1 = event.target.value;
    }
    if (event.target.name === "answer2") {
      answer.answer2 = event.target.value;
    }
    this.setState({ answers: answer }, () => {
      console.log(this.state);
    });
  };
  render() {
    var Studentname;
    var Question;

    if (this.state.studentname === "" && this.state.isSubmitted === false) {
      Studentname = (
        <div className="New">
          <h1>Hey there!,Enter your name</h1>
          <form onSubmit={this.nameHandler}>
            <input
              type="text"
              placeholder="Enter your names"
              ref="name"
              className="name"
            />
          </form>
        </div>
      );
      Question = "";
    } else if (
      this.state.studentname !== "" &&
      this.state.isSubmitted === false
    ) {
      Studentname = <h1>Welcome to Question , {this.state.studentname}</h1>;
      Question = (
        <div>
          <h3>Here are some questions </h3>
          <form onSubmit={this.submitform}>
            <div className="card">
              <label>What is your wakeup time ?</label>
              <br />
              <input
                type="radio"
                name="answer1"
                value="five"
                onChange={this.changeHandler}
              />
              Five
              <input
                type="radio"
                name="answer1"
                value="Six"
                onChange={this.changeHandler}
              />
              Six
              <input
                type="radio"
                name="answer1"
                value="Seven"
                onChange={this.changeHandler}
              />
              Seven
            </div>
            <div className="card">
              <label>What do you prefer ?</label>
              <br />
              <input
                type="radio"
                name="answer2"
                value="Tea"
                onChange={this.changeHandler}
              />
              Tea
              <input
                type="radio"
                name="answer2"
                value="Coffee"
                onChange={this.changeHandler}
              />
              Coffee
              <input
                type="radio"
                name="answer2"
                value="Lemon"
                onChange={this.changeHandler}
              />
              Lemon
            </div>

            <input type="submit" value="submit" className="Submit" />
          </form>
        </div>
      );
    } else if (
      this.state.isSubmitted === true &&
      this.state.studentname !== ""
    ) {
      Studentname = <h1>Thank You,{this.state.studentname}</h1>;
    }
    return (
      <div className="New">
        {Studentname}
        -----------------------------------------------------------------------------
        {Question}
      </div>
    );
  }
}

export default Newapp;
