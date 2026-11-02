import React from "react";
import type {Session, SessionContextData} from "./types";

const SessionContext = React.createContext({
    session: {} as SessionContextData,
    setSession: (session: SessionContextData) => {},
})

export default SessionContext
