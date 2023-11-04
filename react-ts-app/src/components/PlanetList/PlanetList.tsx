import React from "react";
import classes from "./PlanetList.module.css";
import { IPlanetData } from "../../types";
import { Link } from "react-router-dom";

export const PlanetList: React.FC<{
  data: IPlanetData[];
  currentPage: number;
}> = (props) => {
 
 
  return (
    <nav className={classes.planetsWrapper}>
      {props.data.map((el) => (
        <ul key={el.name} className={classes.planetCard}>
          <li>
            <Link
              to={`/planets?pageNumber=${props.currentPage}&details=${
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
