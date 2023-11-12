import React, { ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { PlanetList } from "./PlanetList";
import { MyContext, CurrentPageContext } from "../../context/context";

interface IProps {
  children: ReactNode;
}

const mockMyContextData = {
  myState: {
    data: [
      {
        name: "Tatooine",
        rotation_period: "23",
        orbital_period: "304",
        diameter: "10465",
        climate: "arid",
        gravity: "1 standard",
        terrain: "desert",
        surface_water: "1",
        population: "200000",
        url: "https://swapi.dev/api/planets/1/",
      },
    ],
    loading: false,
    error: "",
    inputValue: "",
    dataCount: 1,
    planetsPerPage: 10,
  },
  setMyState: () => {},
};

const mockCurrentPageContextData = {
  currentPage: 1,
  setCurrentPage: () => {},
};

const MockContextProvider: React.FC<IProps> = ({ children }) => {
  return (
    <MyContext.Provider value={mockMyContextData}>
      <CurrentPageContext.Provider value={mockCurrentPageContextData}>
        {children}
      </CurrentPageContext.Provider>
    </MyContext.Provider>
  );
};

describe("PlanetList Component", () => {
  it("renders a list of planets with links", () => {
    render(
      <MemoryRouter>
        <MockContextProvider>
          <PlanetList />
        </MockContextProvider>
      </MemoryRouter>,
    );

    const planetLinks = screen.getAllByRole("link");
    expect(planetLinks).toHaveLength(1);
  });
});
