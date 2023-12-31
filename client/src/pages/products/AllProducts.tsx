import { useEffect, useState } from 'react'
import { getAllProducts } from '../../api/products/allProducts'
import { Product } from '../../types/ProductInterface';
import { Link, useNavigate } from 'react-router-dom';
import Circular from '../../components/Circular';
import { Box, Typography } from '@mui/material';
import CardProduct from '../../components/cards/CardProduct';

const AllProducts = () => {
  const [message, setMessage] = useState('');
  const [products, setProduct] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleLoginRedirect = () => navigate('/banner/login');

  useEffect(() => {
    if (localStorage.getItem('token') === null) {
      handleLoginRedirect();
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllProducts();
        const data: Product[] = result.data
        setProduct(data)
      } catch (error) {
        console.error('Error fetching products:', error);
        setMessage('Error fetching products');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <Box>
      <Box>
        {loading && <Circular />}
        {message && <Typography variant="h3">{message}</Typography>}
        <Box sx={{
          display: 'flex', flexWrap: 'wrap',
          justifyContent: 'space-around'
        }}>
          {products && products.map((product, index) => (
            <Link to={`/banner/banners/ProductPage/${product.id}`} key={index}
              style={{ textDecoration: 'none' }}>
              <CardProduct key={index} product={product} />
            </Link>
          ))}
        </Box>
      </Box>
    </Box>
  )
}

export default AllProducts