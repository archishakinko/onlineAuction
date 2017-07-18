import React from 'react';
import Auth from '../modules/Auth';
import User from '../components/User.jsx';


class UserPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      data: ''
    };
  }

  componentDidMount() {
    const xhr = new XMLHttpRequest();
    xhr.open('get', '/api/user/user');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        this.setState({
          data: xhr.response.data
        });
      }
    });
    xhr.send();
  }

  render() {
    return (<User data={this.state.data} />);
  }

}

export default UserPage;