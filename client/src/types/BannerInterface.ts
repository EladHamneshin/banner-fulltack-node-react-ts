export interface BannerInterface {
    _id: string;
    image: {
        url: string;
        alt: string;
    }; 
    text: string;
    createdAt: Date;
    author: string;
}

export interface NewBannerInterface {
    _id: string;
    productID: string;
    catogryID: string;
    onClick: string;
    image: {
        url: string;
        alt: string;
    }; 
    size: "side" | "top" | "all";
    kind:  ("price" | "sale" )[];
    text: string;
    createdAt: Date;
    author: string;
}