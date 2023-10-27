import React from "react";
import { Title } from "./components/Title/Title";
import SearchButton from "./components/SearchButton/SearchButton";
import SearchBar from "./components/SearchBar/SearchBar";
import PlanetList from "./components/PlanetList/PlanetList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotate } from "@fortawesome/free-solid-svg-icons";
import "./index.css";
import { IPlanetData } from "./types";
import { FetchSearchPlanet } from "./apis/Planets";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import ErrorGenerator from "./components/ErrorGenerator/ErrorGenerator";

type MyState = {
  data: IPlanetData[];
  loading: boolean;
  error: string;
  inputValue: string;
};

export default class App extends React.Component<null, MyState> {
  state: MyState = {
    data: [],
    loading: false,
    error: "",
    inputValue: "",
  };

  componentDidMount() {
    const valueLocalStorage = localStorage.getItem("inputValue");
    this.setState({
      data: [],
      loading: true,
      error: "",
      inputValue: valueLocalStorage || "",
    });
    FetchSearchPlanet(valueLocalStorage || "")
      .then((data) => {
        console.log("This is your data", data);
        if (!data.results) {
          this.setState({
            data: [],
            loading: false,
            error:
              "Something went wrong; please review your server connection!",
          });
          return;
        }

        this.setState({
          data: data.results,
          loading: false,
          error: "",
        });
      })
      .catch(() => {
        console.log("some error");
        this.setState({
          data: [],
          loading: false,
          error: "Something went wrong; please review your server connection!",
        });
      });
  }

  changeInput = (text: string) => {
    this.setState({ ...this.state, inputValue: text });
  };

  changeData = (planets: IPlanetData[]) => {
    this.setState({ ...this.state, data: planets });
  };

  render() {
    return (
      <div className="container">
        <ErrorBoundary>
          <Title />
          <section className="searchWrapper">
            <SearchBar
              changeInput={this.changeInput}
              value={this.state.inputValue}
              changeData={this.changeData}
            />
            <SearchButton
              changeData={this.changeData}
              value={this.state.inputValue}
            />
          </section>
          <ErrorGenerator />
          <section className="planets">
            {this.state.error && (
              <div className="error">
                Something went wrong; please review your server connection!
              </div>
            )}
            {this.state.loading && (
              <FontAwesomeIcon
                icon={faRotate}
                style={{ color: "#fff", fontSize: 20, marginTop: 50 }}
                spin
              />
            )}
            {!this.state.loading && !this.state.error && (
              <PlanetList data={this.state.data}></PlanetList>
            )}
          </section>
        </ErrorBoundary>
      </div>
    );
  }
}
