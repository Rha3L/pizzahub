import { ActionFunctionArgs, redirect } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import { clearCart } from "../cart/cartSlice";
import { Order } from "../../types";
import store from "../../store/store";
import { isValidPhone } from "../../utils/helpers";

export async function createOrderAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order: Partial<Order> = {
    ...data,
    cart: JSON.parse(data.cart as string),
    priority: data.priority === "true",
  };

  console.log(order);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const errors: any | null = {};
  if (!isValidPhone(order.phone!)) 
    errors.phone =
      "Please give us your correct phone number. We might need it to contact you.";
  
  if (Object.keys(errors).length > 0) return errors;
  
  // If everything is okay, create new order and redirect
  const newOrder = await createOrder(order);

  // Do NOT overuse
  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}
