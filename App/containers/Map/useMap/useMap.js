//useMap.js
import { useState, useRef, useCallback } from 'react';

const DEVIATION = 0.0002;

export function useMap(props) {
  const {LocationMarker} = props;
  const mapRef = useRef(null);
  const [selectedMarker, setSelectedMarker] = useState(null);

  const handleNavigateToPoint = useCallback(
    (id, lat, long) => {

      if (mapRef) {
        mapRef.current.animateCamera(
          {
            center: {
              latitude: lat - DEVIATION,
              longitude: long,
            },
            zoom: 18.5,
          },
          500
        );
      }
      setSelectedMarker(id);
    },
    [mapRef, setSelectedMarker]
  );

  const handelResetInitialPosition = useCallback((props) => {
    const {LocationMarker} = props;
    if (mapRef) {
      mapRef.current.animateToRegion(
        {

            latitude: LocationMarker?.latitude,
            longitude: LocationMarker?.longitude,
            latitudeDelta: 0.003,
            longitudeDelta: 0.003,
        },
        500
      );
      setSelectedMarker(null);
    }
  }, [mapRef, setSelectedMarker]);

  return {
    mapRef,
    selectedMarker,
    handleNavigateToPoint,
    handelResetInitialPosition,
  };
}