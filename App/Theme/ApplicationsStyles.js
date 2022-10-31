export default {
  shadow: {
    //Shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    //Shadow
  },
};
export const map2 = [
  {
    featureType: 'all',
    elementType: 'all',
    stylers: [
      {
        invert_lightness: true,
      },
      {
        saturation: 20,
      },
      {
        lightness: 50,
      },
      {
        gamma: 0.4,
      },
      {
        hue: '#00ffee',
      },
    ],
  },
  {
    featureType: 'all',
    elementType: 'geometry',
    stylers: [
      {
        visibility: 'simplified',
      },
    ],
  },
  {
    featureType: 'all',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'on',
      },
    ],
  },
  {
    featureType: 'administrative',
    elementType: 'all',
    stylers: [
      {
        color: '#ffffff',
      },
      {
        visibility: 'simplified',
      },
    ],
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'geometry.stroke',
    stylers: [
      {
        visibility: 'simplified',
      },
    ],
  },
  {
    featureType: 'landscape',
    elementType: 'all',
    stylers: [
      {
        color: '#405769',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#232f3a',
      },
    ],
  },
];
