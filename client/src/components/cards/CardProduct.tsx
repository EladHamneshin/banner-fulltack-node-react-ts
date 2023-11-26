import { Avatar, CardActions, CardHeader, Collapse, IconButton, IconButtonProps } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../types/ProductInterface';

type Props = {
  product: Product
}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const CardProduct = (props: Props) => {
  const product = props.product
  const navigate = useNavigate();
  const handelClickLogin = () => { navigate(`/login`) }
  if (localStorage.getItem('token') === null) { handelClickLogin() }

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 250,
        maxHeight: 500,
        margin: '5px',
        boxSizing: 'border-box',
        boxShadow: '0 4px 8px rgba(0, 0, 0.9, 0.8)',
        marginBlock: '10px',
        transition: 'transform 0.3s',
        '&:hover': {
          transform: 'scale(1.05)',

        },
      }}>

      <CardContent>
        <Typography gutterBottom variant="h4" component="div">
          {product.name}
        </Typography>
        <img src={product.image.url} alt={product.image.alt} width='200px' />
        <Typography variant='h6' component='div'>
          rating: {product.rating}
        </Typography>
        <Typography variant='h6' component='div'>
          clicks: {product.click}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant='body1' color='text.secondary'>
            quantity:{product.quantity}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            regular price: {product.salePrice}$
          </Typography>
          <Typography variant='body1' color='text.secondary'>
            discount: {product.discountPercentage}%
          </Typography>
          <Typography variant='body1' color='text.secondary'>
            special price: {product.salePrice - product.salePrice * product.discountPercentage * 0.01}$
          </Typography>
          <Typography variant="body2" color="text.secondary">
            description: {product.description}
          </Typography>
        </CardContent>
      </Collapse>
      <CardActions>
        <IconButton>
          <AddCircleIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default CardProduct
