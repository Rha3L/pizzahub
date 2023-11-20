import { LoaderFunctionArgs } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";

export async function orderLoader({ params }: LoaderFunctionArgs) {
  const order = await getOrder(params.orderId!);
  return order;
}
