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
import { Select } from "./components/Select/Select";
import { MyContext, CurrentPageContext } from "./context/context";

export type MyState = {
  data: IPlanetData[];
  loading: boolean;
  error: string;
  inputValue: string;
  dataCount: number;
  planetsPerPage: number;
};

export const Root: React.FC = () => {
  const [myState, setMyState] = useState<MyState>({
    data: [],
    loading: false,
    error: "",
    inputValue: "",
    dataCount: 1,
    planetsPerPage: 10,
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
      planetsPerPage: 10,
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
            planetsPerPage: 10,
          });
          return;
        }
        setMyState({
          data: data.results,
          loading: false,
          error: "",
          inputValue: valueLocalStorage || "",
          dataCount: data.count,
          planetsPerPage: 10,
        });
      })
      .catch(() => {
        setMyState({
          data: [],
          loading: false,
          error: "Something went wrong; please review your server connection!",
          inputValue: valueLocalStorage || "",
          dataCount: 1,
          planetsPerPage: 10,
        });
      });
  }, []);

  const [currentPage, setCurrentPage] = useState<number>(1);

  let lastPage = 0;
  if (myState.dataCount < 10) {
    lastPage = 1;
  } else {
    lastPage = Math.ceil(myState.dataCount / 10);
  }

  return (
    <div>
      <ErrorBoundary>
        <MyContext.Provider value={{ myState, setMyState }}>
          <CurrentPageContext.Provider value={{ currentPage, setCurrentPage }}>
            {!planetId && (
              <section className={classes.searchWrapper}>
                <Title />

                <div className={classes.searchBox}>
                  <SearchBar />
                  <SearchButton />
                  <ErrorGenerator hasError={false} />
                </div>
              </section>
            )}

            <section
              className={
                !planetId ? classes.planetsFull : classes.planetsSidebar
              }
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
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: 50,
                    marginBottom: 0,
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
                  <PlanetList />
                  {!planetId && <Pagination lastPage={lastPage} />}
                  {!planetId && <Select />}
                  {planetId && (
                    <div className={classes.goBackBtn}>
                      <Button handleClick={() => navigateTo("/")}>
                        Go Back
                      </Button>
                    </div>
                  )}
                </div>
              )}
              <Outlet />
            </section>
          </CurrentPageContext.Provider>
        </MyContext.Provider>
      </ErrorBoundary>
    </div>
  );
};
