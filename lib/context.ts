import React from "react";
import type { Session } from "./types";

const SessionContext = React.createContext({
    session: {} as Session,
    setSession: (session: Session) => {},
});

export default SessionContext
