import styled from "styled-components";
import { Card } from "../commonStyles";

export const CountryDetail = styled.div`
  margin: 1rem 0;
`;

export const Placeholder = styled.div`
  width: 30px;
  height: 30px;
  background-color: #aaa;
  margin-right: 1rem;
  border-radius: 50%;
`;

export const StyledCard = styled(Card)`
  && {
    height: fit-content;
    width: 100%;
  }
`;
