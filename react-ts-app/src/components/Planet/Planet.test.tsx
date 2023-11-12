import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import { Planet } from "./Planet";
import "@testing-library/jest-dom";

jest.mock("axios");

const mockPlanetData = {
  name: "Mock Planet",
  rotation_period: "24",
  orbital_period: "365",
  diameter: "12742",
  climate: "Temperate",
  gravity: "1 standard",
  terrain: "Grasslands, mountains",
  surface_water: "40",
  population: "1000000",
};

axios.get.mockResolvedValue({ data: mockPlanetData });

describe("Planet Component", () => {
  it("renders planet details when data is loaded", async () => {

    render(
      <MemoryRouter initialEntries={["/?details=1"]}>
        <Planet />
      </MemoryRouter>,
    );

    await waitFor(() => {
      const nameElement = screen.getByText("Name: Mock Planet");
      const rotationElement = screen.getByText("Rotation period: 24");
      const orbitalElement = screen.getByText("Orbital period: 365");

      expect(nameElement).toBeInTheDocument();
      expect(rotationElement).toBeInTheDocument();
      expect(orbitalElement).toBeInTheDocument();
    });
  });

  it("displays loading spinner when data is being fetched", async () => {
    render(
      <MemoryRouter initialEntries={["/?details=1"]}>
        <Planet />
      </MemoryRouter>,
    );

    const spinner = screen.getByTitle("faRotate");
    expect(spinner).toBeInTheDocument();
  });
});
