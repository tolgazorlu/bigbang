import { Cart } from "./Cart";
import { UserInfo } from "./UserInfo";

export type AppState = {
    userInfo?: UserInfo;
    cart: Cart;
  };