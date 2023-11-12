import React, { useContext } from "react";
import classes from "./PlanetList.module.css";
import { Link } from "react-router-dom";
import { MyContext, CurrentPageContext } from "../../context/context";

export const PlanetList: React.FC = () => {
  const myContext = useContext(MyContext);
  const currentPageContext = useContext(CurrentPageContext);

  return (
    <nav className={classes.planetsWrapper}>
      {myContext?.myState.data.map((el) => (
        <ul key={el.name} className={classes.planetCard}>
          <li>
            <Link
              to={`/planets?pageNumber=${currentPageContext?.currentPage}&details=${
                el.url.split("/")[5]
              }`}
            >
              {el.name}
            </Link>
          </li>
        </ul>
      ))}
    </nav>
  );
};
