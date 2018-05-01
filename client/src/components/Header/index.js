import React from "react";
import { Headline, HeaderContainer } from "./styles";
import { Button } from "../Button/styles";

const Header = ({ fetchFn, currentNumber }) => {
  return (
    <HeaderContainer>
      <Headline>
        Trade Explorer<sup>{currentNumber}</sup>
      </Headline>
      <Button onClick={() => fetchFn()}>Refresh</Button>
    </HeaderContainer>
  );
};

export default Header;
