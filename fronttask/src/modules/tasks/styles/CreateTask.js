import styled from "styled-components";

export const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const CreateButton = styled.button`
  padding: 10px;
  color: white;
  background-color: green;
  border-radius: 5px;
`;

export const TaskName = styled.input.attrs({ type: "text" })`
  padding: 10px;
  //   color: white;
`;
