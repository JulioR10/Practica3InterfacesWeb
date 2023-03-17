import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import PlanetOnly from "@/components/planetonly";

type PlanetType = {
  name: string;
  climate: string;
  diameter: number;
  gravity: number;
  population: number;
  terrain: string;
  surface_water: number;
  rotation_period: number;
  orbital_period: number;
  residents: string[];
};

type Resident = {
  name: string;
};

function Planet() {
  const [planet, setPlanet] = useState<PlanetType | null>(null);
  const router = useRouter();
  const { id } = router.query;

  const fetchData = async () => {
    try {
      const res = await fetch(`https://swapi.dev/api/planets/${id}`);
      const planetjson: PlanetType = await res.json();

      const residentsData = await Promise.all(
        planetjson.residents.map(async (residentUrl) => {
          const residentRes = await fetch(residentUrl);
          const residentData: Resident = await residentRes.json();
          return residentData;
        })
      );

      setPlanet({
        ...planetjson,
        residents: residentsData.map((resident) => resident.name),
      });
    } catch (e) {
      console.log("Error en el fetch.");
    }
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  return (
    <>
      <h1>Detalles</h1>
      {planet ? <PlanetOnly planet={planet} /> : <p>Loading...</p>}
      <button onClick={() => router.back()}>Volver</button>
    </>
  );
}

export default Planet;
