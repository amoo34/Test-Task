import React, { useEffect, useState } from "react";

import {
  CardWrapper,
  Title,
  Description,
  CheckboxContainer,
  StyledInputCheckbox,
} from "../styles/Card";

function Card({ task, handleCheckbox, selectIds, deleteOption }) {
  const [check, setCheck] = useState(false);

  return (
    <CardWrapper>
      <CheckboxContainer>
        {deleteOption && (
          <StyledInputCheckbox
            onChange={() => handleCheckbox(task.id)}
            checked={selectIds.includes(task.id)}
          />
        )}
      </CheckboxContainer>
      {/* <CardTextTitle>{task.name}</CardTextTitle> */}
      {/* <CardTextBody>{task.name}</CardTextBody> */}
      <Title>ID: {task.id}</Title>
      <Description>NAME : {task.name}</Description>
    </CardWrapper>
  );
}

export default Card;
