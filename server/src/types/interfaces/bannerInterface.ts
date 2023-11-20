export interface bannerInterface {
    _id: string;
    productID: string;
    catogryID: string;
    onClick: string;
    image: {
        url: string;
        alt: string;
    };
    size: 'side' | 'top' | 'all';
    kind:  ('price' | 'sale' )[];
    text: string;
    createdAt: Date;
    author: string;
}