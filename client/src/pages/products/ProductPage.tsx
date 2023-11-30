import { useEffect, useState } from 'react';
import { getProductById } from '../../api/products/productById';
import { Button, Box, Typography, Card, CardContent, CardMedia, IconButton, Stack } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { Product } from '../../types/ProductInterface';
import Circular from '../../components/Circular';
import BannersTable from '../../components/Tables/BannersTable';
import { bannerByProducdID } from '../../api/banners/bannerByProducdID';
import { ResponseBanner } from '../../types/BannerInterface';
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import AppsIcon from '@mui/icons-material/Apps';
import CardHomePage from '../../components/cards/CardHomePage';
import BannerSide from '../../components/production/BannerSide';

const ProductPage = () => {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState(true);
    const navigate = useNavigate();

    const { productId } = useParams();
    const [message, setMessage] = useState('');
    const [banners, setBanners] = useState<ResponseBanner[]>([]);
    const [bannerSide, setbannerSide] = useState<JSX.Element | null>(null)
    const [bannerTop, setbannerTop] = useState<JSX.Element | null>(null)
    useEffect(() => {
        setbannerSide(<BannerSide limit='1' size='side' />)
        setbannerTop(<BannerSide limit='1' size='top' />)
        // return (setbannerSide(null))
    }, [])
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const result = await getProductById(String(productId));
                setProduct(result);
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const bannerFetch = await bannerByProducdID(productId!);
                if (bannerFetch.success === false) {
                    setMessage(bannerFetch.message);
                }
                if (bannerFetch.success === true) {
                    const data: ResponseBanner[] = bannerFetch.data;
                    setBanners(data.length === 0 ? [] : data);
                }
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchBanners();
    }, [productId]);

    const handleAddBanner = () => navigate(`/createBanner/${productId}`);



    const handleTable = () => setProducts(true);



    const handleCards = () => setProducts(false);



    if (loading) {
        return (
            <Box>
                <Typography variant="h3">Loading...</Typography>
                <Circular />
            </Box>
        );
    }

    if (message) {
        return <Typography variant="h3">{message}</Typography>;
    }

    if (!product) {
        return <Typography variant="h3">Product not found</Typography>;
    }

    return (
        <Box>
            {bannerSide && bannerSide}
            {bannerTop && bannerTop}
            <Box sx={{}}>
                <IconButton onClick={handleCards}>
                    <CalendarViewMonthIcon />
                </IconButton>
                <IconButton onClick={handleTable}>
                    <AppsIcon />
                </IconButton>
                <Box sx={{ display: 'flex' }}>
                    <Box sx={{ width: '45%', margin: 2 }}>


                        {products ? (
                            <BannersTable pro={banners} />
                        ) : (
                            <Stack direction="row" spacing={2}>
                                {banners.map((banner, index) => (
                                    <CardHomePage key={index} banner={banner} />
                                ))}
                            </Stack>
                        )}

                    </Box>
                    <Box sx={{ width: '45%', margin: 2 }}>
                        <Card sx={{ height: '80vh' }}>
                            <CardMedia
                                component="img"
                                height="35%"
                                image={product.image.url} // Replace with your product image URL
                                alt={product.image.alt}
                            />                        <CardContent>
                                <Typography variant="h5" component="div" sx={{ margin: '4px' }} >
                                    {product.name}
                                </Typography>
                                <Typography variant="body1" color="text.secondary" sx={{ margin: '4px' }} >
                                    Category: {product.category}
                                </Typography>
                                {product.salePrice !== undefined && (
                                    <Typography variant="body1" color="text.secondary" sx={{ margin: '4px' }} >
                                        Price: ${product.salePrice.toFixed(2)}
                                    </Typography>
                                )}
                                <Typography variant="body1" color="text.secondary" sx={{ margin: '4px' }} >
                                    Quantity: {product.quantity}
                                </Typography>
                                <Typography variant="body1" color="text.secondary" sx={{ margin: '4px' }} >
                                    Description: {product.description}
                                </Typography>
                                <Typography variant="body1" color="text.secondary" sx={{ margin: '4px' }} >
                                    Rating: {product.rating}/5
                                </Typography>
                                <Button variant="contained" color="primary" onClick={handleAddBanner} sx={{ margin: '4px' }} >
                                    Add Banner
                                </Button>
                            </CardContent>
                        </Card>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default ProductPage;
