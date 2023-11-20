import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./ui/Home";
import Error from "./ui/Error";
import Menu from "./features/menu/Menu";
import { menuLoader } from "./features/menu/MenuLoader";
import Cart from "./features/cart/Cart";
import CreateOrder from "./features/order/CreateOrder";
import { createOrderAction } from "./features/order/CreateOrderAction";
import Order from "./features/order/Order";
import { orderLoader } from "./features/order/OrderLoader";
import { updateOrderAction } from "./features/order/UpdateOrderAction";

import AppLayout from "./ui/AppLayout";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,

    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      { path: "/cart", element: <Cart /> },
      {
        path: "/order/new",
        element: <CreateOrder />,
        action: createOrderAction,
      },
      {
        path: "/order/:orderId",
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
        action: updateOrderAction,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
