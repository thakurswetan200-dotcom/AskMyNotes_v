import { useContext } from "react";
import { UserContext } from "../App";

function UserCard() {
  const username = useContext(UserContext);//hook

  return (
    <div
      style={{
        marginTop: "20px",
        padding: "10px",
        border: "1px solid blue",
      }}
    >
      <h2>Welcome {username}</h2>
    </div>
  );
}

export default UserCard;