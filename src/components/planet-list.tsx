import Link from "next/link";

function PlanetList({ name, id }: { name: string; id: number }) {
  return (
    <>
      <Link href={`/planet/${id}`}>
        <ul>{name}</ul>
      </Link>
    </>
  );
}
export default PlanetList;
