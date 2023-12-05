import React, { useEffect, useState } from 'react';
import ProductTable from '../components/Tables/ProductTable';
import BannersTable from '../components/Tables/BannersTable';
import AllbannersHomePage from './bannersPages/AllbannersHomePage';
import BannerSide from '../components/production/BannerImage';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { getAllProducts } from '../api/products/allProducts';
import { getAllBannersImage } from '../api/banners/bannersImageFunc';
import { Product } from '../types/ProductInterface';
import { ResponseBanner } from '../types/BannerInterface';
import Circular from '../components/Circular';

const HomePage = () => {
//   const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [banners, setBanners] = useState<ResponseBanner[]>([]);
  const [bannerSide, setBannerSide] = useState<JSX.Element | null>(null);
  const [bannerTop, setBannerTop] = useState<JSX.Element | null>(null);

  const handleLoginRedirect = () => {
    navigate('/banner/login');
  };

  const fetchData = async (apiCall: () => Promise<any>, setState: React.Dispatch<React.SetStateAction<any>>) => {
    try {
      const result = await apiCall();
      setState(result.data || []);
    } catch (error) {
      console.error('Error:', error);
    //   setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token') === null) {
      handleLoginRedirect();
    } else {
      fetchData(getAllProducts, setProducts);
      fetchData(getAllBannersImage, setBanners);
    }
  }, []);

  useEffect(() => {
    setBannerSide(<BannerSide limit='1' size='side' />);
    setBannerTop(<BannerSide limit='1' size='top' />);
    return () => setBannerSide(null);
  }, []);

  return (
    <Box>
      {bannerSide && bannerSide}
      {bannerTop && bannerTop}
      <Box sx={{ width: '100%' }}>
        <AllbannersHomePage />
      </Box>
      <Box
        sx={{
          width: '45%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 2,
          gap: 2,
        }}
      >
        <Box sx={{ flex: 1 }}>
          {loading ? <Box> <Circular />Loading Banners...</Box> : <BannersTable pro={banners} />}
        </Box>
        <Box sx={{ flex: 1 }}>
          {loading ? <Box> <Circular />Loading Products...</Box> : <ProductTable prod={products} />}
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
