import { ReactNode, FormEvent } from "react";
import { To } from "react-router-dom";

type Item = {
  name: string;
  quantity: number;
  totalPrice: number;
};

export type PizzaItem = {
  id: number;
  name: string;
  unitPrice: number;
  ingredients: string[];
  soldOut: boolean;
  imageUrl: string;
};

export type MenuItem = {
  pizza: PizzaItem;
};

export type CartItem = {
  pizzaId: number;
  unitPrice: number;
} & Item;

export interface Order {
  id: number;
  status: string;
  customer: string;
  phone: string;
  address: string;
  priority: boolean;
  estimatedDelivery: string;
  cart: CartItem[];
  addIngredients?: string[];
  removeIngredients?: string[];
  position: string;
  orderPrice: number;
  priorityPrice: number;
}

export type CartState = {
  cart: CartItem[];
};

export type OrderItemProps = {
  item: Item;
  isLoadingIngredients?: boolean;
  ingredients?: string[];
};

export enum Status {
  "idle",
  "loading",
  "error",
}

export type UserState = {
  username: string;
  status: Status;
  position: GeoLocationProps;
  address: string;
  error: string | undefined;
}

export type GeoLocationProps = {
  latitude: number | undefined;
  longitude: number | undefined;
};

export type ButtonProps = {
  children: ReactNode;
  disabled?: boolean;
  type: "primary" | "small" | "secondary" | "round";
  to?: To;
  onClick?: (e: FormEvent) => void;
};

export type LinkButtonProps = {
  children: ReactNode;
  to: To;
};
