export interface navlink {
    title: string
    img: string
    dropdown? : navlinkDropdown[] 
}

export interface navlinkDropdown {
    title: string
    types? : typeDropdown[]
}

export interface typeDropdown {
    title: string
}