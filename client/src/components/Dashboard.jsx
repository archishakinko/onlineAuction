import React, { PropTypes } from 'react';
import { Card, CardTitle, CardText, CardMedia } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';


const Dashboard = ({ 
  secretData,
  onClick5,
  onClick10,
  onClick20
 }) => (
  <Card className="container">
    <CardTitle
      title="User Main"
      subtitle="You should get access to this page only after authentication. User page"
    />
    {secretData.img && <CardMedia overlay={<CardTitle title={secretData.title}/>}>
      <img src={secretData.img}/>
    </CardMedia>}

    {secretData.description && <CardText style={{ fontSize: '16px', color: 'green' }}>{secretData.description}</CardText>}
    {secretData.startPrice && <CardText style={{ fontSize: '16px', color: 'green' }}>Start Price: {secretData.startPrice}</CardText>}
    {secretData.price && <CardText style={{ fontSize: '16px', color: 'green' }}>Actual Price: {secretData.price}</CardText>}

    {secretData.startPrice && <div className="button-line">
      <RaisedButton label="5%"  onClick= {onClick5} />
      <RaisedButton label="10%" onClick= {onClick10} primary/>
      <RaisedButton label="20%" onClick= {onClick20} secondary/>
    </div>}
  </Card>
);

Dashboard.propTypes = {
  secretData: PropTypes.object.isRequired,
  onClick5:  PropTypes.func.isRequired,
  onClick10: PropTypes.func.isRequired,
  onClick20: PropTypes.func.isRequired
};

export default Dashboard;