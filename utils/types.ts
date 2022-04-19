import { ReactNode } from 'react';

export interface User {
  name: string;
  image?: string;
}

export interface Tab {
  name: string;
  link: string;
  icon?: ReactNode;
}
