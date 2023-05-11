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
    info.url.match(/(\d+)/g): Este es el código que está utilizando una expresión regular para buscar todos los números en la cadena info.url.
      \d es un metacarácter en las expresiones regulares que coincide con cualquier dígito decimal (equivalente a [0-9]).
      
      + es un cuantificador que significa "uno o más" del elemento anterior, en este caso, \d.
      
      Los paréntesis () crean un grupo de captura, que permite extraer una subsección de la coincidencia.
      
      g es una bandera que significa "global", que causa que la expresión regular busque todas las coincidencias en la cadena, en lugar de detenerse después de la primera coincidencia.
    Entonces, match(/(\d+)/g) devuelve un array con todas las secuencias de dígitos encontradas en la cadena info.url.

    [0]: Esto toma el primer elemento del array retornado por match(). En otras palabras, se está obteniendo la primera secuencia de dígitos encontrada en la URL.

    parseInt(..., 10): Esto convierte la cadena de dígitos extraída en un número entero. El segundo argumento, 10, especifica la base del número, que en este caso es 10 (decimal).
    
    En el contexto de tu código, parece que estás obteniendo datos de la API de Star Wars (SWAPI), y cada planeta tiene una URL como https://swapi.dev/api/planets/2/. El número al final de la URL es el ID del planeta en la base de datos de SWAPI. El código const id = parseInt(info.url.match(/(\d+)/g)[0], 10); está extrayendo ese ID de la URL.
    */
    //const id = planet.url.split("/").slice(-2)[0];
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

/*
  Antes de que se cargue la página, Next.js llama a la función getServerSideProps.
  Esta función realiza una petición a la API de Star Wars (SWAPI) para obtener los datos de los planetas.
  El número de página (que se obtiene de context.params.page) se utiliza para determinar qué página de datos se solicita a la API.

  La función getServerSideProps devuelve un objeto que incluye los datos de los planetas y la página actual como props.
  Estas props se pasan a la función Planets cuando se la invoca para renderizar la página.

  Dentro de la función Planets, se utiliza la prop data para crear un nuevo array, InfoPlanet, que contiene objetos con la información de cada planeta.
  Para cada planeta, se extrae el nombre y el ID del objeto de datos del planeta.
  El ID se obtiene de la URL del planeta utilizando la línea de código que hemos explicado antes: const id = parseInt(info.url.match(/(\d+)/g)[0], 10);.

  El componente Planets renderiza un título, una lista de componentes PlanetList (uno por cada objeto en InfoPlanet), y dos botones para la paginación.

  Cada componente PlanetList recibe un objeto con las propiedades name e id de un planeta.
  Estos datos se usan para renderizar la información de cada planeta.

  Los botones de "Anterior" y "Siguiente" permiten al usuario navegar entre las páginas de planetas.
  Cuando se hace clic en uno de estos botones, se llama a la función cambioPagina con el número de la nueva página como argumento.
  Esta función utiliza el método push del router de Next.js para cambiar la URL a la de la nueva página.
  Esto a su vez desencadena una nueva llamada a getServerSideProps con la nueva página como parámetro, lo que actualiza los datos de los planetas que se renderizan.
*/
