import React from "react";
import Container from '@material-ui/core/Container';
import styled, { css } from 'styled-components/macro'
const backgroundImage =
    "code-client\public\hero_Shot.jpg";
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

export default class Home extends React.Component {
    
    render() {
        return (
            <HeroSection>
                <HeroWrapper>
                    <div style={{ backgroundImage: "url(/image.png)" }}>
                        ENTER SLOGAN GUYS!!!!!
                    </div>
                </HeroWrapper>
            </HeroSection>
        )
    }
}