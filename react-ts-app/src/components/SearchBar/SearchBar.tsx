import React, { useContext } from "react";
import classes from "./SearchBar.module.css";
import { fetchSearchPlanet } from "../../apis/PlanetsApi";
import { MyContext, CurrentPageContext } from "../../context/context";

export const SearchBar: React.FC = () => {
  const myContext = useContext(MyContext);
  const currentPageContext = useContext(CurrentPageContext);
  const onInputChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    myContext?.setMyState((prev) => ({
      ...prev,
      inputValue: (event.target as HTMLInputElement).value,
    }));
  };

  const onFormSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    myContext?.setMyState((prev) => ({ ...prev, loading: true }));
    fetchSearchPlanet(myContext?.myState.inputValue || "", 1).then((data) => {
      myContext?.setMyState((prev) => ({ ...prev, data: data.results }));
      myContext?.setMyState((prev) => ({ ...prev, loading: false }));
      localStorage.setItem("inputValue", myContext?.myState.inputValue || "");
      myContext?.setMyState((prev) => ({ ...prev, dataCount: data.count }));
      currentPageContext?.setCurrentPage(1);
    });
  };

  return (
    <form onSubmit={onFormSubmit}>
      <input
        type="text"
        placeholder="Search planet by the name..."
        className={classes.search}
        value={myContext?.myState.inputValue || ""}
        onChange={onInputChange}
      />
    </form>
  );
};
