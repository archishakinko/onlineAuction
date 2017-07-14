import React from 'react';
import Auth from '../modules/Auth';
import Admin from '../components/Admin.jsx';


class AdminPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      product: {
        title: '',
        description: '',
        img: '',
        startPrice: ''
      }
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);

  }

  changeUser(event) {
    const field = event.target.name;
    const product = this.state.product;
    product[field] = event.target.value;

    this.setState({
      product
    });
  }

  processForm(event) {
    event.preventDefault();

    const title = encodeURIComponent(this.state.product.title);
    const description = encodeURIComponent(this.state.product.description);
    const img = encodeURIComponent(this.state.product.img);
    const startPrice = encodeURIComponent(this.state.product.startPrice);
    const formData = `title=${title}&description=${description}&img=${img}&startPrice=${startPrice}`;

    const xhr = new XMLHttpRequest();
    xhr.open('post', '/api/admin/product');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        this.setState({
          errors: {}
        });
        
      } else {
        const errors = xhr.response.errors ? xhr.response.errors : {};
        errors.summary = xhr.response.message;
        this.setState({
          errors
        });
      }
    });
    xhr.send(formData);
  }

  render() {
    return (<Admin 
        onSubmit1={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        product={this.state.product}
         />);
  }

}

export default AdminPage;