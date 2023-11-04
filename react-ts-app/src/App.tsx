import React, { useEffect, useState } from "react";
import classes from "./app.module.css";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import { Title } from "./components/Title/Title";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { SearchButton } from "./components/SearchButton/SearchButton";
import { ErrorGenerator } from "./components/ErrorGenerator/ErrorGenerator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PlanetList } from "./components/PlanetList/PlanetList";
import { IPlanetData } from "./types";
import { faRotate } from "@fortawesome/free-solid-svg-icons";
import { fetchSearchPlanet } from "./apis/PlanetsApi";
import { Outlet } from "react-router";
import { Button } from "./components/Button/Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Pagination } from "./components/Pagination/Pagination";

type MyState = {
  data: IPlanetData[];
  loading: boolean;
  error: string;
  inputValue: string;
  dataCount: number;
};

export const Root: React.FC = () => {
  const [myState, setMyState] = useState<MyState>({
    data: [],
    loading: false,
    error: "",
    inputValue: "",
    dataCount: 1,
  });

  const navigateTo = useNavigate();

  const [searchParams] = useSearchParams();
  const planetId = searchParams.get("details");

  useEffect(() => {
    const valueLocalStorage = localStorage.getItem("inputValue");
    setMyState({
      data: [],
      loading: true,
      error: "",
      inputValue: valueLocalStorage || "",
      dataCount: 1,
    });
    fetchSearchPlanet(valueLocalStorage || "", currentPage)
      .then((data) => {
        if (!data.results) {
          setMyState({
            data: [],
            loading: false,
            error:
              "Something went wrong; please review your server connection!",
            inputValue: valueLocalStorage || "",
            dataCount: 1,
          });
          return;
        }
        setMyState({
          data: data.results,
          loading: false,
          error: "",
          inputValue: valueLocalStorage || "",
          dataCount: data.count,
        });
      })
      .catch(() => {
        setMyState({
          data: [],
          loading: false,
          error: "Something went wrong; please review your server connection!",
          inputValue: valueLocalStorage || "",
          dataCount: 1,
        });
      });
  }, []);

  const changeInput = (text: string) => {
    setMyState({ ...myState, inputValue: text });
  };

  const changeData = (planets: IPlanetData[]) => {
    setMyState({ ...myState, data: planets, loading: false });
  };

  const changeLoading = (loading: boolean) => {
    setMyState({ ...myState, loading: loading });
  };

  const [currentPage, setCurrentPage] = useState(1);

  let lastPage = 0;
  if (myState.dataCount < 10) {
    lastPage = 1;
  } else {
    lastPage = Math.ceil(myState.dataCount / 10);
  }

  return (
    <div>
      <ErrorBoundary>
        {!planetId && (
          <section className={classes.searchWrapper}>
            <Title />
            <div className={classes.searchBox}>
              <SearchBar
                changeInput={changeInput}
                value={myState.inputValue}
                changeData={changeData}
                changeLoading={changeLoading}
                currentPage={currentPage}
              />
              <SearchButton
                changeData={changeData}
                value={myState.inputValue}
                changeLoading={changeLoading}
                currentPage={currentPage}
              />
              <ErrorGenerator hasError={false} />
            </div>
          </section>
        )}

        <section
          className={!planetId ? classes.planetsFull : classes.planetsSidebar}
        >
          {myState.error && (
            <div className="error">
              Something went wrong; please review your server connection!
            </div>
          )}
          {myState.loading && (
            <FontAwesomeIcon
              icon={faRotate}
              style={{
                color: "#6e1dbf",
                fontSize: 20,
                marginTop: 50,
                marginLeft: 600,
              }}
              spin
            />
          )}
          {!myState.loading && !myState.error && (
            <div
              className={
                !planetId
                  ? classes.planetsWrapper
                  : classes.sidebarPlanetsWrapper
              }
            >
              <PlanetList
                data={myState.data}
                currentPage={currentPage}
              ></PlanetList>
              {!planetId && (
                <Pagination
                  currentPage={currentPage}
                  lastPage={lastPage}
                  setCurrentPage={setCurrentPage}
                  changeData={changeData}
                />
              )}
              {planetId && (
                <div className={classes.goBackBtn}>
                  <Button handleClick={() => navigateTo("/")}>Go Back</Button>
                </div>
              )}
            </div>
          )}

          <Outlet />
        </section>
      </ErrorBoundary>
    </div>
  );
};
