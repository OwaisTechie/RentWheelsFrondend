//useMarkerAnimation
import { useState, useEffect } from 'react';
import Animated from 'react-native-reanimated';
import { useTiming  } from 'react-native-redash';

export function useMarkerAnimation({ id, selectedMarker }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
   
    const isActive = id === selectedMarker ? 1 : 0;
    setActive(isActive);
  }, [id, selectedMarker]);

  const transition = useTiming(active, {
    duration: 200,
  });

  const inputRange=[
    (id -1) * 200,
    id * 200,
    (id + 1) * 200
  ]

  const scale = Animated.interpolateNode(transition, {
    inputRange,
    // inputRange: [0, 1,0],
    outputRange: [1, 2.5,1],
    extrapolate: "clamp",
  });
  const opacity = Animated.interpolateNode(transition, {
    inputRange,
    // inputRange: [0, 1,0],
    outputRange: [.35, 1,.35],
    extrapolate: "clamp",
  });

  return scale;
}