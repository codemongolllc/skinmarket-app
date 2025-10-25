import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SVGComponent = (props: any) => (
  <Svg
    width={28}
    height={27}
    viewBox="0 0 28 27"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M23.5322 13.3711H11.4912"
      stroke="#E53E3E"
      strokeOpacity={0.890196}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M20.6055 10.4551L23.5335 13.3711L20.6055 16.2871"
      stroke="#E53E3E"
      strokeOpacity={0.890196}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M18.1006 8.88C17.7706 5.3 16.4306 4 11.1006 4C3.99959 4 3.99959 6.31 3.99959 13.25C3.99959 20.19 3.99959 22.5 11.1006 22.5C16.4306 22.5 17.7706 21.2 18.1006 17.62"
      stroke="#E53E3E"
      strokeOpacity={0.890196}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default SVGComponent;
