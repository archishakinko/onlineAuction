import React from 'react';
import Auth from '../modules/Auth';
import Dashboard from '../components/Dashboard.jsx';
import Websocket from 'react-websocket';


class DashboardPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    this.state = {
      secretData: ''
    };
  }

   handleData(data) {
      let result = JSON.parse(data);
      this.setState({secretData: this.state.secretData + result});
      console.log("ws client: ", result);
    }

  /**
   * This method will be executed after initial rendering.
   */
  componentDidMount() {
      var socket = new WebSocket("ws://localhost/"+ localStorage.token);
      var that = this;
      socket.onmessage = function(event){
        console.log("client data: ", event.data);
        that.setState({
          secretData: event.data
        });
      };
  };

  /**
   * Render the component.
   */
  render() {
    return (
    <div>
      <Dashboard secretData={this.state.secretData} />
    </div>);
  }

}

export default DashboardPage;