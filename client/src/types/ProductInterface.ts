export interface Product {
    id: string,
    name: string,
    salePrice: number,
    quantity: number,
    description: string,
    category: string,
    discountPercentage: number,
    rating: number,
    click: number
    coordinate: {
        longitude1: number
        longitude2: number
        longitude3: number
        latitude1: number
        latitude2: number
        latitude3: number
        //(if you have an idea who to make it dynamic for each product go for it)
    }
    image:
    {
        url: string
        alt: string
    }
}