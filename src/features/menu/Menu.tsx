import { useLoaderData } from "react-router-dom";
import MenuItem from "./MenuItem";
import { PizzaItem } from "../../types";

function Menu() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const menu: any = useLoaderData();

  return (
    <ul className="divide-y divide-stone-200 px-2">
      {menu.map((pizza: PizzaItem) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

export default Menu;
