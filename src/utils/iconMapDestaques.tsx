// src/app/utils/iconMapDestaques.tsx
import type { JSX } from 'react';
import Icone from '../../components/Icone';


type IconProps = { size?: number; color?: string };


const iconMap: Record<string, (props?: IconProps) => JSX.Element> = {
  paw: (props) => <Icone tipo="FontAwesome5" nome="paw" {...props} />,
  wifi: (props) => <Icone tipo="Feather" nome="wifi" {...props} />,
  wheelchair: (props) => <Icone tipo="MaterialCommunityIcons" nome="wheelchair-accessibility" {...props} />,
  camera: (props) => <Icone tipo="Feather" nome="camera" {...props} />,
  baby: (props) => <Icone tipo="FontAwesome5" nome="baby" {...props} />,
  laptop: (props) => <Icone tipo="Feather" nome="monitor" {...props} />,
  calendar: (props) => <Icone tipo="Feather" nome="calendar" {...props} />,
  truck: (props) => <Icone tipo="Feather" nome="truck" {...props} />,
  leaf: (props) => <Icone tipo="FontAwesome5" nome="leaf" {...props} />,
  'bread-slice': (props) => <Icone tipo="FontAwesome5" nome="bread-slice" {...props} />,
  cheese: (props) => <Icone tipo="FontAwesome5" nome="cheese" {...props} />,
  'user-plus': (props) => <Icone tipo="Feather" nome="user-plus" {...props} />,
  users: (props) => <Icone tipo="Feather" nome="users" {...props} />,
  cross: (props) => <Icone tipo="FontAwesome5" nome="cross" {...props} />,
  sun: (props) => <Icone tipo="Feather" nome="sun" {...props} />,
};

export default iconMap;
