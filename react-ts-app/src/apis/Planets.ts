export async function FetchSearchPlanet(value: string) {
  const url = `https://swapi.dev/api/planets/?search=${value}`;
  const response = await fetch(url);
  return response.json();
}
