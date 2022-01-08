import React from "react";
import Session from "./object/session";

const SessionContext = React.createContext({
    session: new Session(null, null),
    setSession: (session: Session) => {},
});

export default SessionContext
