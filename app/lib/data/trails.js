const trailInfo = [
  {
    id: 1,
    title: "Cumberland River Trail",
    description:
      "5-mile path from picnic area's far end to falls parking lot. Follows river upstream for 2 miles, continues along old logging road, intersects with Moonbow Trail.",
  },
  {
    id: 2,
    title: "Laurel Trail",
    description:
      "Short 0.25 mile connector path starting at the end of cabin area 1. This convenient trail provides a direct route to the scenic Gatliff Bridge overlook. Perfect for a quick and easy walk.",
  },
  {
    id: 3,
    title: "Moonbow Trail",
    description:
      "10.8 miles from Cumberland Falls to Laurel River mouth. Follows Sheltowee Trace with riverside views. Can be combined for a 7-mile loop experience.",
  },
  {
    id: 4,
    title: "Cumberland Falls Trail",
    description:
      "0.5 mile path from Dupont Lodge display to falls parking lot. Features river views, Gatliff Bridge, and 200 ft descent. Our most popular route to the falls.",
  },
  {
    id: 5,
    title: "Eagle Falls Trail",
    description:
      "1.8 miles following cliff line to spectacular Cumberland Falls views. Features seasonal stream crossing and optional river access spur. Lower sections may flood during high water. Only trail leading to Eagle Falls.",
  },
  {
    id: 6,
    title: "Anvil Branch Trail",
    description:
      "2.5 miles connecting main paths near park entrance at KY 90. Features abundant spring wildflowers and some steep sections. Multiple access points available.",
  },
];

function getTrails() {
  return trailInfo;
}

function getTrailById(id) {
  return trailInfo.find((trail) => trail.id === id);
}

export { getTrails, getTrailById };
