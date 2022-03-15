import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Wrapper, RightItems } from "../styles/Navbar";

function Navbar() {
  const [check, setCheck] = useState(false);

  return (
    <>
      <Wrapper>
        <RightItems>
          <Link to="/list-tasks"> List Tasks</Link>
          <Link to="/create-task">Create Task</Link>
          <Link to="/bulk-delete">Bulk Delete</Link>
        </RightItems>
      </Wrapper>
    </>
  );
}

export default Navbar;
