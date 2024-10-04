export interface Navlink {
  title: string;
  img?: string;
  dropdown?: NavlinkDropdown[];
}

export interface NavlinkDropdown {
  title: string;
  types?: typeDropdown[];
}

export interface typeDropdown {
  title: string;
}
