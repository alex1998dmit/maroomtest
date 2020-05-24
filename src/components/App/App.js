import React from 'react';
import ApartamentCalculator from '../Calculator';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#FBFBFD;',
    height: '100vh',
  },
});

const App = () => {
  const classes = useStyles();
  return (
    <div className="App">
      <Container className={classes.root}>
        <ApartamentCalculator />
      </Container>
    </div>
  );
};

export default App;
