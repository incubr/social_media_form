import { createContext, useState } from "react";

declare global {
  interface Window {
    gapi: any;
    google: any;
  }
}

interface ContextTypes {
  user: any;
  setUser: (user: any) => void;
  gapi: any;
  setGapi: (gapi: any) => void;
}

export const Context = createContext<ContextTypes>({
  user: null,
  setUser: () => {},
  gapi: null,
  setGapi: () => {},
});

interface Props {
  children: React.ReactNode;
}

export const Provider = ({ children }: Props) => {
  const [user, setUser] = useState<any>();
  const [gapi, setGapi] = useState<any>();

  return (
    <Context.Provider value={{ user, setUser, gapi, setGapi }}>
      {children}
    </Context.Provider>
  );
};
