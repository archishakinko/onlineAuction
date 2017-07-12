import React, { PropTypes } from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


const Admin = ({ 
    onSubmit,
    onChange,
    errors,
    product,
    }) => (
  <Card className="container">
    <CardTitle
      title="Admin Main"
      subtitle="You should get access to this page only after authentication. Admin page"
    />

     <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">Add product</h2>

      {errors.summary && <p className="error-message">{errors.summary}</p>}

      <div className="field-line">
        <TextField
          floatingLabelText="Title"
          name="title"
          errorText={errors.title}
          onChange={onChange}
          value={product.title}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="Description"
          name="description"
          errorText={errors.description}
          onChange={onChange}
          value={product.description}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="Img"
          name="img"
          errorText={errors.img}
          onChange={onChange}
          value={product.img}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="Start Price"
          name="startPrice"
          errorText={errors.startPrice}
          onChange={onChange}
          value={product.startPrice}
        />
      </div>

      <div className="button-line">
        <RaisedButton type="submit" label="Add Product" primary />
      </div>

    </form>

  </Card>
);

Admin.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default Admin;