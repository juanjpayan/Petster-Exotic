import React from 'react';
import './profiles.css';
import '../../colors.css';
import { Typography, Card, CardContent } from '@material-ui/core/';

const ProfileName = (props) => {
  return (
    <Card className="gradient-border" id="profile-name" elevation="3">
      <CardContent className="card-inside">
        <Typography
          gutterBottom
          className="name-title"
          variant="h5"
          component="h5"
        >
          {props.name}
        </Typography>
        <Typography className="role-title" variant="h6" component="h6">
          {props.role}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProfileName;
