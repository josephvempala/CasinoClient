import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";
import { Link, useHistory } from "react-router-dom";
import { useContext } from "react";
import { userContext } from "../../contexts/userContext";
import { useRouletteManager } from "../RouletteGame/useRouletteManager";

export default function Navbar() {
  console.log('rendered');
  const history = useHistory();
  const { user, LogOut } = useContext(userContext);
  const RouletteManager = useRouletteManager();
  console.log(RouletteManager.isLoading);
  console.log(RouletteManager.currentGameState);
  console.log(RouletteManager.userBets);
  console.log(RouletteManager.history);
  return (
    <div className="Navbar">
      <Link to="/roulette">Roulete</Link>
      <button onClick={()=>{console.log(document.cookie)}}>test</button>
      {user.isLoggedIn ? (
        <>
        <button className="user-icon">
          <img alt={user.username} className="img" src={user.profilePicture} />
          <span>{user.username}</span>
          <span>
            <FontAwesomeIcon
              icon={faCaretDown}
              size={"2x"}
              color={"white"}
            ></FontAwesomeIcon>
          </span>
        </button>
        <button onClick={()=>{LogOut()}}> jow </button>
        </>
      ) : (
        <button
          className="user-icon"
          onClick={() => {
            history.push("/login");
          }}
        >
          {" "}
          LogIn{" "}
        </button>
      )}
    </div>
  );
}
