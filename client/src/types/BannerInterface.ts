export interface BannerInterface {
    _id?: string;
    name: string;
    productID: string;
    catogryID: string;
    click: number;
    image: {
        url: string;
        alt: string;
    };
    size: "side" | "top" | "all";
    kind: ("price" | "sale")[];
    text: string;
    createdAt: Date;
    author: string;
}
export interface ResponseBanner {
    author: string;
    catogryID: string;
    clickCount: number;
    createdAt: string;
    image: {
        alt: string;
        url: string;
    };
    kind: string[]; 
    name: string;
    productID: string;
    size: string;
    text: string;
    __v: number;
    _id: string;
};