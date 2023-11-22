const fetchAllProducts = async () => {
    const response = await fetch(`${process.env.BASE_URL_ERP}/shopInventory`);
    const data = await response.json();
    return data;
};

const fetchProductById = async (id: string) => {
    const response = await fetch(`${process.env.BASE_URL_ERP}/shopInventory/${id}`);
    const data = await response.json();
    return data;
};

const getProductByCategory = async (category: string) => {
    const response = await fetch(`${process.env.BASE_URL_ERP}/shopInventory?category=${category}`);
    const data = await response.json();
    return data;
};

const getAllCategoryNames = async () => {
    const response = await fetch(`${process.env.BASE_URL_ERP}/shopInventory/categories`);
    const data = await response.json();
    return data;
};

const getProductByProductName = async (product: string) => {
    const response = await fetch(`${process.env.BASE_URL_ERP}/shopInventory?search=${product}`);
    const data = await response.json();
    return data;
};

export default { fetchAllProducts, fetchProductById, getProductByCategory, getAllCategoryNames, getProductByProductName };

