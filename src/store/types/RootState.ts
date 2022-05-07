import { CommonState } from "./CommonState";
import { AuthState } from "./AuthState";

export interface RootState {
  common: CommonState;
  auth: AuthState;
}
