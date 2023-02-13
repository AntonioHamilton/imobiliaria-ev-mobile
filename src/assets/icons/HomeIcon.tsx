import React from 'react';
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg';

type HomeIconProps = {
  color: string;
  size: number;
};

const HomeIcon = ({ color, size }: HomeIconProps) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 27 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <G clipPath="url(#clip0_133_138)">
        <Path
          d="M26.3754 12.7423L13.8754 0.242327C13.7192 0.0871181 13.508 0 13.2879 0C13.0677 0 12.8565 0.0871181 12.7004 0.242327L0.200381 12.7423C0.0638589 12.9017 -0.00747948 13.1068 0.000621485 13.3165C0.00872245 13.5263 0.0956661 13.7252 0.244078 13.8736C0.39249 14.022 0.59144 14.109 0.80117 14.1171C1.0109 14.1252 1.21596 14.0539 1.37538 13.9173L13.2837 2.00899L25.192 13.9257C25.3515 14.0622 25.5565 14.1335 25.7663 14.1254C25.976 14.1173 26.1749 14.0304 26.3233 13.882C26.4718 13.7336 26.5587 13.5346 26.5668 13.3249C26.5749 13.1151 26.5036 12.9101 26.367 12.7507L26.3754 12.7423Z"
          fill={color}
        />
        <Path
          d="M21.617 25.0007H17.4504V16.6674H9.11702V25.0007H4.95036V13.334L3.28369 15.0007V25.0007C3.28369 25.4427 3.45929 25.8667 3.77185 26.1792C4.08441 26.4918 4.50833 26.6674 4.95036 26.6674H10.7837V18.334H15.7837V26.6674H21.617C22.0591 26.6674 22.483 26.4918 22.7955 26.1792C23.1081 25.8667 23.2837 25.4427 23.2837 25.0007V14.8007L21.617 13.134V25.0007Z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_133_138">
          <Rect width={size} height={size} fill={color} />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default HomeIcon;