import React from 'react';
import Auth from '../modules/Auth';
import Dashboard from '../components/Dashboard.jsx';
import Websocket from 'react-websocket';


class DashboardPage extends React.Component {

  constructor(props) {
    super(props);
    this.socket = new WebSocket("ws://localhost/"+ localStorage.token);

    this.state = {
      secretData: {
        id: '',
        title: '',
        description: '',
        img: '',
        startPrice: '',
        price: ''
      }
    };
    this.onClick5c =  this.onClick5c.bind(this);
    this.onClick10c = this.onClick10c.bind(this);
    this.onClick20c = this.onClick20c.bind(this);
  }

  onClick5c(event){
    this.socket.send("5");
  }

  onClick10c(event){
    this.socket.send("10");
  }

  onClick20c(event){
    this.socket.send("20");
  }

  componentDidMount() {
      var that = this;
      this.socket.onmessage = function(event){
        that.setState({
          secretData: JSON.parse(event.data)
        });
      };
  };

  render() {
    return (
    <div>
      <Dashboard
       secretData={this.state.secretData}
       onClick5 ={this.onClick5c}
       onClick10={this.onClick10c} 
       onClick20={this.onClick20c}  
       />
    </div>);
  }

}

export default DashboardPage;