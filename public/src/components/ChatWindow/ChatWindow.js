import React, { Component } from "react";
import './ChatWindow.css';

import axios from "axios";
import url from '../../api'

import Message from './Message/Message';

import dateCreator from '../../utils/dateCreator';

export default class ChatWindow extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      text: '',
      displayName: '',
      icon: ''
    };

    this.handleChange = this.handleChange.bind( this );
    this.createMessage = this.createMessage.bind( this );
    this.editMessage = this.editMessage.bind( this );
    this.removeMessage = this.removeMessage.bind( this );
  }

  componentDidMount() {
    axios.get( url ).then( response => {
      this.setState({ messages: response.data });
    });
  }

  handleChange( event ) {
    this.setState({ text: event.target.value});
  }
  
  handleNameChange( value ) {
    this.setState({ displayName: value });
  }

  handleImg( value ) {
    this.setState({ icon: value });
  }

  createMessage( event ) {
    let { displayName, icon, text } = this.state;
    if(!icon){
      this.setState({
        icon: "https://www.shareicon.net/data/512x512/2017/06/21/887435_logo_512x512.png"
      })
    }
    if ( event.key === "Enter" && text.length !== 0 ) {
      axios.post( url, { displayName, icon, text, time: dateCreator() } ).then( response => {
        this.setState({ messages: response.data });
      });

      this.setState({ text: '' });
    }
  }

  editMessage( id, text ) {
    console.log( 'editMessage:', id, text ); 
    axios.put( url + `/${id}`, { text } ).then( response => {
      this.setState({ messages: response.data });
    });
  }

  removeMessage( id ) {
    axios.delete( url + `/${id}` ).then( response => {
      this.setState({ messages: response.data });
    });
  }

  render() {
    return (
      <div id="ChatWindow__container">
        <div id="ChatWindow__messagesParentContainer">
          <div id="ChatWindow__messagesChildContainer">
            {
              this.state.messages.map( message => (
                <Message displayName={message.displayName} icon={message.icon} id={ message.id} key={ message.id } text={ message.text } time={ message.time } edit={ this.editMessage } remove={ this.removeMessage } />
              ))
            }
          </div>
        </div>
        <div id="ChatWindow__newMessageContainer">
        <input className="DNuser" placeholder="username" 
        onChange={(e) => {this.handleNameChange(e.target.value)}}
        value={this.state.displayName} />

        <input className="DNuser" placeholder="Image" 
        onChange={(e) => {this.handleImg(e.target.value)}}
         />

          <input className="Msg" placeholder="What's on your mind? Press enter to send." 
                 onKeyPress={ this.createMessage }
                 onChange={ this.handleChange }
                 value={ this.state.text }
          />
        </div>
      </div>
    )
  }
}