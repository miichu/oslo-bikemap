import { BodyShort } from "@navikt/ds-react";
import { getUserLocationFromBrowser } from "../util/getLocation";
import { useContext, useState } from "react";
import { UserLocationContext } from "../contexts/UserLocationContext";

export const UserLocation: React.FC = () => {
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const locationOnClick = async () => {
    setIsGettingLocation(true);
    try {
      setSharedLocation(await getUserLocationFromBrowser());
    } catch (error) {
      setError("Could not get your location 😿");
      throw new Error("error");
    }
    setIsGettingLocation(false);
  };

  const { sharedLocation, setSharedLocation } = useContext(UserLocationContext);

  if (error) return <BodyShort>{error}</BodyShort>;
  if (isGettingLocation) return <BodyShort>Getting user location...</BodyShort>;

  return (
    <div className="user-location-container">
      {sharedLocation ? (
        <>
          <BodyShort data-testid="position-permission-success-message">
            ✨ Du har delt din lokasjon! 📍✨
          </BodyShort>
        </>
      ) : (
        <>
          <BodyShort>
            Vil du finne sykkelstativene som er nærmest deg? Del din
            lokasjon📍✨
          </BodyShort>
          <button onClick={locationOnClick}>Del din lokasjon✨</button>
        </>
      )}
    </div>
  );
};

export default UserLocation;
