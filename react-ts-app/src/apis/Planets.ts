import axios from "axios";

export default axios.create({
  baseURL: "https://swapi.dev/api/planets/",
  params: {
    maxResults: 10,
  },
});
