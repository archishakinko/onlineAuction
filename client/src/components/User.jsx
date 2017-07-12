import React, { PropTypes } from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';


const User = ({ data }) => (
  <Card className="container">
    <CardTitle
      title="Personal info"
      subtitle="your personal info"
    />
    {data.name && <CardText style={{ fontSize: '16px', color: 'green' }}>Name: {data.name}</CardText>}
    {data.surname && <CardText style={{ fontSize: '16px', color: 'green' }}>Surname: {data.surname}</CardText>}
    {data.phone && <CardText style={{ fontSize: '16px', color: 'green' }}>Phone: {data.phone}</CardText>}
    {data.email && <CardText style={{ fontSize: '16px', color: 'green' }}>Email: {data.email}</CardText>}
    {data.balance && <CardText style={{ fontSize: '16px', color: 'green' }}>Balance: {data.balance}</CardText>}
  </Card>
);

User.propTypes = {
  data: PropTypes.object.isRequired
};

export default User;