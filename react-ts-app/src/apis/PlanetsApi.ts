export async function fetchSearchPlanet(value: string, currentPage: number) {
  const url = `https://swapi.dev/api/planets/?search=${value}&page=${currentPage}`;
  const response = await fetch(url);
  return response.json();
}
