import { createContext, useContext, useState } from "react";
import { ICoordinates } from "../types/station";

interface IUserLocationContext {
  sharedLocation: ICoordinates | undefined ;
  setSharedLocation: (location: ICoordinates) => void;
}

export const UserLocationContext = createContext<IUserLocationContext>({
  sharedLocation: undefined,
  setSharedLocation: () => {},
});

export const useUserLocation = () => useContext(UserLocationContext);

const UserLocationProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [sharedLocation, setSharedLocation] = useState<ICoordinates | undefined>(undefined);

  return (
    <UserLocationContext.Provider value={{ sharedLocation, setSharedLocation }}>
      {children}
    </UserLocationContext.Provider>
  );
};

export default UserLocationProvider;