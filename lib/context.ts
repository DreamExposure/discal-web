import React from "react";
import User from "./object/user";

export const UserContext = React.createContext<User | null>(null);
