import React, { PropTypes } from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';


const Admin = ({ secretData }) => (
  <Card className="container">
    <CardTitle
      title="Admin Main"
      subtitle="You should get access to this page only after authentication. Admin page"
    />

    {secretData && <CardText style={{ fontSize: '16px', color: 'green' }}>{secretData}</CardText>}
  </Card>
);

Admin.propTypes = {
  secretData: PropTypes.string.isRequired
};

export default Admin;