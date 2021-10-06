// @ts-nocheck
import styled from "styled-components";
import { Card } from "../commonStyles";

export const CountryName = styled.span`
  color: #111;
`;

export const CountryRegion = styled.span`
  color: #444;
`;
export const Row: any = styled.div`
  border-bottom: 1px solid #ccc;

  background-color: ${({ selected }) => {
    return selected ? "#eee" : "none";
  }};

  &:hover {
    cursor: pointer;
    background-color: #eee;
  }

  &:last-child {
    border-bottom: none;
  }

  > td {
    height: 0;
    display: flex;
    height: fit-content;
  }
`;

export const StyledCard = styled(Card)`
  && {
    padding: 0;
    width: 100%;
    min-height: 80%;
    overflow: auto;
    height: 80vh;
  }
`;
