import PlanetList from "@/components/planet-list";
import { useRouter } from "next/router";

// Context recibe un objeto con la propiedad params y la pagina actual
export async function getServerSideProps(context: any) {
  const page = context.params.page || 1;
  const res = await fetch(`https://swapi.dev/api/planets/?page=${page}`);
  const data = await res.json();

  return {
    props: { data, page: parseInt(page) },
  };
}

function Planets({ data, page }: { data: any; page: any }) {
  const router = useRouter();

  function cambioPagina(e: number) {
    router.push(`/planets/${e}`);
  }

  const InfoPlanet = data.results.map((info: any) => {
    /*
    const id fue hecho por chatgpt por lo siguiente:
    Index no funciona, los planetas de distintas paginas envian la informacion de 
    los planetas de la primera pagina.
    Expresion regular, no tengo ni idea de como funciona, pero funciona.
    */
    const id = parseInt(info.url.match(/(\d+)/g)[0], 10);

    return { name: info.name, id };
  });

  return (
    <>
      <h1>Planetas</h1>

      {InfoPlanet.map((planet: any) => (
        <PlanetList key={planet.id} name={planet.name} id={planet.id} />
      ))}

      <button onClick={() => cambioPagina(page - 1)} disabled={page === 1}>
        Anterior
      </button>
      <button onClick={() => cambioPagina(page + 1)} disabled={!data.next}>
        Siguiente
      </button>
    </>
  );
}

export default Planets;
