import React from "react";
import classes from "./PlanetList.module.css";
import { IPlanetData } from "../../types";

export default class PlanetList extends React.Component<{
  data: IPlanetData[];
}> {
  render() {
    return (
      <div className={classes.planetsWrapper}>
        {this.props.data.map((el) => (
          <div key={el.name} className={classes.planetCard}>
            <div>Name: {el.name}</div>
            <div>Rotation period: {el.rotation_period}</div>
            <div>Orbital period: {el.orbital_period}</div>
            <div>Diameter: {el.diameter}</div>
            <div>Climate: {el.climate}</div>
            <div>Gravity: {el.gravity}</div>
            <div>Terrain: {el.terrain}</div>
            <div>Surface water: {el.surface_water}</div>
            <div>Population: {el.population}</div>
          </div>
        ))}
      </div>
    );
  }
}
