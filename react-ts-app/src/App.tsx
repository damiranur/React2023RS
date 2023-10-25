import React from "react";
import { Title } from "./components/Title/Title";
import SearchButton from "./components/Button/Button";
import SearchBar from "./components/SearchBar/SearchBar";
import PlanetList from "./components/PlanetList/PlanetList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotate } from "@fortawesome/free-solid-svg-icons";
import "./index.css";
import { IPlanetData } from "./types";

type MyState = {
  data: IPlanetData[];
  loading: boolean;
  error: string;
};

export default class App extends React.Component<null, MyState> {
  state: MyState = {
    data: [],
    loading: false,
    error: "",
  };

  componentDidMount() {
    const apiUrl = "https://swapi.dev/api/planets/";
    this.setState({ data: [], loading: true, error: "", });
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log("This is your data", data);
        if(!data.results) {
          this.setState({
            data:[],
            loading: false,
            error: "Something went wrong; please review your server connection!",
          });
          return
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
          data:[],
          loading: false,
          error: "Something went wrong; please review your server connection!",
        });
      });
  }

  render() {
    return (
      <div className="container">
        <Title></Title>
        <div className="searchWrapper">
          <SearchBar></SearchBar>
          <SearchButton></SearchButton>
        </div>
        <div className="planets">
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
        </div>
      </div>
    );
  }
}
