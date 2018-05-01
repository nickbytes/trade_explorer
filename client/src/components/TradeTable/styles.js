import styled, { css } from "styled-components";

export const Container = styled.div`
  width: 100%;
  padding: 0 22px 22px;
`;

export const Wrapper = styled.div`
  border: 2px solid #000;
  padding: 22px;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  padding: 5px 0;

  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

export const Cell = styled.span`
  margin: 0 11px;
  flex-basis: 200px;

  ${props =>
    props.upcase
      ? css`
          text-transform: uppercase;
        `
      : null};
`;

export const TitleCell = Cell.extend`
  font-weight: 700;
  padding-bottom: 11px;
`;
