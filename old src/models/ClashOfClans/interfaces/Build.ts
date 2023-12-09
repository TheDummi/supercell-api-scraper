export interface URLS {
  tiny?: string;
  small?: string;
  large?: string;
  medium?: string;
}

export interface League {
  id: number;
  name: string;
  iconUrls: URLS;
}

export interface Achievement {
  name: string;
  stars: 0 | 1 | 2 | 3;
  value: number;
  target: number;
  info: string;
  completionInfo: string;
  village: "home" | "builderBase";
}

export interface Label {
  id: number;
  name: string;
  iconUrls: URLS;
}
