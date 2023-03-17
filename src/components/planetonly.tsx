function PlanetOnly({ planet }: { planet: any }) {
  return (
    <>
      <h2>{planet.name}</h2>
      <p>Climate: {planet.climate}</p>
      <p>Diameter: {planet.diameter}</p>
      <p>Gravity: {planet.gravity}</p>
      <p>Population: {planet.population}</p>
      <p>Terrain: {planet.terrain}</p>
      <p>Surface Water: {planet.surface_water}</p>
      <p>Rotation Period: {planet.rotation_period}</p>
      <p>Orbital Period: {planet.orbital_period}</p>
      <p>Residents:</p>
      <ul>
        {planet.residents.map((residentName: string, index: number) => (
          <li key={index}>{residentName}</li>
        ))}
      </ul>
    </>
  );
}
export default PlanetOnly;
