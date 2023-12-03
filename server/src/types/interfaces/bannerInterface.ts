export interface BannerInterface {
    _id?: string;
    name: string;
    productID: string;
    categoryName: string;
    clickCount: number;
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