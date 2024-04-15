import { createContext } from "react";
import { AppContextContract } from "../../contracts.ts";

export const AppContext = createContext<AppContextContract>(null!)
