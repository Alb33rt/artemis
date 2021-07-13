import React from "react";
import Container from '@material-ui/core/Container';
import styled, { css } from 'styled-components/macro'
import backgroundImage from '../images/hero_Shot.jpg';
import { withRouter } from "react-router";

const HeroSection = styled.section`
    height: 100vh;
    max-height: 1100px;
    position: relative;
    overflow: hidden;

`;

const HeroWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    position: relative;
`;

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: localStorage.getItem("isAuthenticated")
        }
    }

    componentDidMount() {
        const { history } = this.props;
        if (this.state.isAuthenticated) {
            history.push('/dashboard');
        }
    }
    
    render() {
        return (
            <Container max-width="lg">
            <HeroSection>
                <HeroWrapper>
                    <div style={{ backgroundImage: `url(${backgroundImage})` }}>
                        ENTER SLOGAN GUYS!!!!!
                    </div>
                </HeroWrapper>
            </HeroSection>
            </Container>
        )
    }
}

export default withRouter(Home);