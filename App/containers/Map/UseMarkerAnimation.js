//useMarkerAnimation
import {useState, useEffect,useLayoutEffect} from 'react';
import Animated from 'react-native-reanimated';
import {useTiming} from 'react-native-redash';

export function useMarkerAnimation({id, selectedMarker}) {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const isActive = id === selectedMarker ? 1 : 0;
    if(id === selectedMarker){

      setActive(1);
    }
    else{
      setActive(0);
    }
  }, [id,selectedMarker]);
  const transition = useTiming(active, {
    duration: 100,
  });


  const scale = Animated.interpolateNode(transition.value, {
    inputRange: [0,1],
    outputRange: [1, 1.7],
  });

  return scale;
}
