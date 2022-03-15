import styled from "styled-components";

export const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 250px;
  height: 250px;
  background-color: blue;
  border-radius: 4px;
  padding: 1rem;
  margin: 1rem;

  &:hover {
    opacity: 0.5;
    cursor: pointer;
  }
`;

export const Title = styled.h1`
  font-size: 1.2rem;
  font-weight: 300;
  margin: 1rem;
  color: white;
`;

export const Description = styled.p`
  color: white;
`;

export const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`;
export const StyledInputCheckbox = styled.input.attrs({ type: "checkbox" })``;
