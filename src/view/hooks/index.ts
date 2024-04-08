import { useContext } from "react";
import { AppContext } from "../components/app/AppContext";

export function useApp () {
    return useContext(AppContext)
}
