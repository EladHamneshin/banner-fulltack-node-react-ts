import { useEffect, useState } from 'react';
import { Button, Box, Typography, Card, CardContent, CardMedia, IconButton, Stack, createTheme, ThemeProvider, Divider } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { Product } from '../../types/ProductInterface';
import Circular from '../../components/Circular';
import BannersTable from '../../components/Tables/BannersTable';
import { bannerByProducdID } from '../../api/banners/bannerByProducdID';
import { ResponseBanner } from '../../types/BannerInterface';
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import CardHomePage from '../../components/cards/CardHomePage';
import BannerSide from '../../components/production/BannerImage';
import TableRowsIcon from '@mui/icons-material/TableRows';
import { getProductById } from '../../api/products/productById';

const ProductPage = () => {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [cardOrRow, setCardOrRow] = useState(true);
    const navigate = useNavigate();

    const { productId } = useParams();
    const [, setMessage] = useState('');
    const [banners, setBanners] = useState<ResponseBanner[]>([]);
    const [bannerSide, setBannerSide] = useState<JSX.Element | null>(null);
    const [bannerTop, setBannerTop] = useState<JSX.Element | null>(null);

    useEffect(() => {
        setBannerSide(<BannerSide limit='1' size='side' />);
        setBannerTop(<BannerSide limit='1' size='top' />);
    }, []);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const result = await getProductById(productId!);
                setProduct(result.data);
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
                if (productId) {
                    const bannerFetch = await bannerByProducdID(productId!);
                    if (bannerFetch.success === false) {
                        setMessage(bannerFetch.message);
                    }
                    if (bannerFetch.success === true) {
                        const data: ResponseBanner[] = bannerFetch.data;
                        setBanners(data.length === 0 ? [] : data);
                    }
                }
            } catch (error) {
                console.error('Error fetching banners:', error);
                setMessage('Product not found');
            } finally {
                setLoading(false);
            }
        };
        fetchBanners();
    }, [productId]);

    const handleAddBanner = () => navigate(`/banner/createBanner/${productId}`);
    const handleTable = () => setCardOrRow(true);
    const handleCards = () => setCardOrRow(false);

    if (loading) {
        return (
            <Box sx={{ backgroundColor: '#f8f8f8', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Circular />
                <Typography variant="h3" sx={{ color: '#2196F3', marginTop: '16px' }}>Loading...</Typography>
            </Box>
        );
    }

    const theme = createTheme({
        typography: {
            h3: {
                fontSize: '1.2rem',
                '@media (min-width:600px)': {
                    fontSize: '1.5rem',
                },
                '@media (min-width:960px)': {
                    fontSize: '2rem',
                },
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ backgroundColor: '#f8f8f8',padding:'20px' }}>
                {product && (
                    <Typography variant="h3" sx={{ display: 'flex', justifyContent: 'center', color: '#2196F3', marginTop: '16px' }}>
                        {product.name}
                    </Typography>
                )}
                {bannerSide && bannerSide}
                {bannerTop && bannerTop}
                <Box sx={{ marginTop: '16px' }}>
                    <IconButton onClick={handleCards} sx={{ color: '#2196F3' }}>
                        <CalendarViewMonthIcon />
                    </IconButton>
                    <IconButton onClick={handleTable} sx={{ color: '#2196F3' }}>
                        <TableRowsIcon />
                    </IconButton>
                    <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                        <Box sx={{ flexGrow: 2, width: '100%', margin: 2 }}>
                            {cardOrRow ? (
                                <BannersTable pro={banners} />
                            ) : (
                                <Stack sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    flexWrap: 'wrap',
                                    cursor: 'pointer',
                                    justifyContent: 'center',
                                    // height: '270px',
                                    margin: '5px',
                                    marginBottom: '10px',
                                }}>
                                    {banners.map((banner, index) => (
                                        <CardHomePage key={index} banner={banner} />
                                    ))}
                                </Stack>
                            )}
                        </Box>

                        <Divider sx={{ margin: '10px', border: '1px solid #2196F3' }} />
                        {product && (
                            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', width: '80%', margin: 2 }}>
                                <Card sx={{ display:'flex',alignItems:'center',borderRadius:'0.5rem', height: '80vh', width: '25vw', flexDirection: 'column', justifyContent: 'space-around', backgroundColor: '#fff', boxShadow: '0px 0px 10px 2px rgba(0,0,0,0.1)' }}>
                                    <CardMedia 
                                    sx={{width:'90%'}}
                                        component="img"
                                        height="200vh"
                                        image={product.image.url}
                                        alt={product.image.alt}
                                    />
                                    <CardContent>
                                        <Typography variant="h5" component="div" sx={{ margin: '4px', color: '#2196F3' }}>
                                            {product.name}
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary" sx={{ margin: '4px' }}>
                                            Category: {product.category}
                                        </Typography>
                                        {product.salePrice !== undefined && (
                                            <Typography variant="body1" color="text.secondary" sx={{ margin: '4px' }}>
                                                Price: ${product.salePrice.toFixed(2)}
                                            </Typography>
                                        )}
                                        <Typography variant="body1" color="text.secondary" sx={{ margin: '4px' }}>
                                            Quantity: {product.quantity}
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary" sx={{ margin: '4px' }}>
                                            Description: {product.description}
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary" sx={{ margin: '4px' }}>
                                            Rating: {product.rating}/5
                                        </Typography>
                                    </CardContent>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleAddBanner}
                                            sx={{ margin: '4px' }}
                                        >
                                            Add Banner
                                        </Button>
                                </Card>
                            </Box>
                        )}
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default ProductPage;
