import React, { useEffect, useState } from "react";
import classes from "./Planet.module.css";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { IPlanetData } from "../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotate } from "@fortawesome/free-solid-svg-icons";

type PlanetCardState = {
  loading: boolean;
};

export const Planet: React.FC = () => {
  const [searchParams] = useSearchParams();
  const planetId = searchParams.get("details");

  const [planetCardState, setPlanetCardState] = useState<PlanetCardState>({
    loading: false,
  });

  const [planets, setPlanets] = useState<IPlanetData>();
  useEffect(() => {
    setPlanetCardState({
      loading: true,
    });
    axios
      .get(`https://swapi.dev/api/planets/${planetId}`)
      .then((res) => {
        setPlanets(res.data);
      })
      .catch((err) => {
        setPlanetCardState({
          loading: false,
        });
        console.log(err);
      })
      .finally(() => {
        setPlanetCardState({
          loading: false,
        });
      });
  }, [planetId]);

  return planetCardState.loading ? (
    <FontAwesomeIcon
      icon={faRotate}
      title="faRotate"
      style={{
        color: "#6e1dbf",
        fontSize: 20,
        marginTop: 50,
        marginLeft: 100,
      }}
      spin
    />
  ) : (
    <div className={classes.planetCard}>
      <div>Name: {planets?.name}</div>
      <div>Rotation period: {planets?.rotation_period}</div>
      <div>Orbital period: {planets?.orbital_period}</div>
      <div>Diameter: {planets?.diameter}</div>
      <div>Climate: {planets?.climate}</div>
      <div>Gravity: {planets?.gravity}</div>
      <div>Terrain: {planets?.terrain}</div>
      <div>Surface water: {planets?.surface_water}</div>
      <div>Population: {planets?.population}</div>
    </div>
  );
};
