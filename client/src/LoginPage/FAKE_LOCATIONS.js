const FAKE_LOCATIONS = [
  {
    coords: {
      latitude: -64.85943,
      longitude: 90.76217,
    },
  },
  {
    coords: {
      latitude: -2.25611,
      longitude: -77.35059,
    },
  },
  {
    coords: {
      latitude: 33.10716,
      longitude: 100.99913,
    },
  },
  {
    coords: {
      latitude: -35.70398,
      longitude: 34.22285,
    },
  },
  {
    coords: {
      latitude: 52.31236,
      longitude: 62.02366,
    },
  },
  {
    coords: {
      latitude: 38.20215,
      longitude: 102.99681,
    },
  },
  {
    coords: {
      latitude: 58.65216,
      longitude: 88.04268,
    },
  },
  {
    coords: {
      latitude: 49.07332,
      longitude: 119.88183,
    },
  },
  {
    coords: {
      latitude: 39.5621,
      longitude: 123.18168,
    },
  },
  {
    coords: {
      latitude: -6.44697,
      longitude: 128.63471,
    },
  },
  {
    coords: {
      latitude: -5.52265,
      longitude: -76.83916,
    },
  },
];

export const getFakeLocation = () => {
  return FAKE_LOCATIONS[Math.floor(Math.random() * FAKE_LOCATIONS.length)];
};
