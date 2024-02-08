import { combineReducers,configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import cartReducer from "../features/cart/cartSlice";

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
})

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

