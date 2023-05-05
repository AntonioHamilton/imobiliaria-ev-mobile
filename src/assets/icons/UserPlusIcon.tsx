import React from 'react';
import { Svg, Path } from 'react-native-svg';

type UserPlusProps = {
  color: string;
  size: number;
};

const UserPlus = ({color, size}:UserPlusProps) => (
<Svg fill="none" viewBox="0 2 22 20" strokeWidth={1.5} stroke="currentColor" width={size} height={size}>
  <Path stroke={color} strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
</Svg>
)

export default UserPlus