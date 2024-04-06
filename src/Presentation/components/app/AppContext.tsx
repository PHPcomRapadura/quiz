import { createContext } from "react";
import { AppContextContract } from "../../types";

export const AppContext = createContext<AppContextContract>(null!)
