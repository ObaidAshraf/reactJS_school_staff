import React from 'react';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });


function Main({ students, teachers}) {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    return (
        <Container maxWidth="sm" style={{paddingTop: 100}}>
        <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Number of Students registered:
          </Typography>
          <Typography variant="h5" component="h2">
            {students}
          </Typography>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Number of Teachers registered:
          </Typography>
          <Typography variant="h5" component="h2">
            {teachers}
          </Typography>
        </CardContent>
      </Card>
      </Container>
    )
}

export default Main