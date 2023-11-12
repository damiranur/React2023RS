import React, { useContext } from "react";
import { fetchSearchPlanet } from "../../apis/PlanetsApi";
import { Button } from "../Button/Button";
import { MyContext, CurrentPageContext } from "../../context/context";

export const SearchButton: React.FC = () => {
  const myContext = useContext(MyContext);
  const currentPageContext = useContext(CurrentPageContext);

  const onClick = () => {
    myContext?.setMyState((prev) => ({ ...prev, loading: true }));
    fetchSearchPlanet(myContext?.myState.inputValue || "", 1).then((data) => {
      myContext?.setMyState((prev) => ({ ...prev, data: data.results }));
      myContext?.setMyState((prev) => ({ ...prev, loading: false }));
      localStorage.setItem("inputValue", myContext?.myState.inputValue || "");
      myContext?.setMyState((prev) => ({ ...prev, dataCount: data.count }));
      currentPageContext?.setCurrentPage(1);
    });
  };
  return <Button handleClick={onClick}>Search</Button>;
};
