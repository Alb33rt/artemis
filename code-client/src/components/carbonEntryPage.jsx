import React from "react";
import Container from '@material-ui/core/Container';
import styled, { css } from 'styled-components/macro'
import backgroundImage from '../images/545792.jpg';
import { withRouter } from "react-router";
import PropTypes from 'prop-types';
import { makeStyles, ThemeProvider, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { theme } from "../colorTheme";
import ReactDOM from "react-dom";


class CarbonEntryPage extends React.Component{
    componentDidMount(){
        const script = document.createElement("script");
        script.async = true;
        script.src = "https://tnc-coolclimate-calculator-ui.firebaseapp.com/assets/widget.min.js";
        this.div.appendChild(script);
    }

    render(){
        return(
            <div className="App" ref={el => (this.div = el)}>
        <h1>Hello react</h1>
        {/* Script is inserted here */}
      </div>
        );
    }
}

export default CarbonEntryPage;