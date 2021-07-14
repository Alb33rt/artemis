import React from "react";
import Container from '@material-ui/core/Container';
import styled, { css } from 'styled-components/macro'
import backgroundImage from '../images/hero_Shot.jpg';
import { withRouter } from "react-router";

const HeroSection = styled.section`
    
    position: relative;
    overflow: hidden;

`;

const HeroWrapper = styled.div`
    width: 100%;
    justify-content: center;
    align-items: center;
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
            <Container>
            <HeroSection>
                <HeroWrapper>
                    <div style={{ backgroundImage: `url(${backgroundImage})` }}>
                        but something here
                    </div>
                </HeroWrapper>
            </HeroSection>
            </Container>
        )
    }
}

export default withRouter(Home);