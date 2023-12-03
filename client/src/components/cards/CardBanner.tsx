import { useEffect, useState } from 'react';
import { Box, Card, CardActions, CardContent, CardMedia, Collapse, Grid, IconButton, IconButtonProps, styled, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { ResponseBanner } from '../../types/BannerInterface';
import { deleteByBannerID } from '../../api/banners/deleteByBannerID';
import { useNavigate } from 'react-router-dom';
import Circular from '../Circular';
import { toastSuccess } from '../../api/banners/toast';

// Interface for ExpandMore button props
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

// Styled component for ExpandMore button
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
type Props = {
  banner: ResponseBanner,
  triger?: {
    triger: boolean,
    trigerSet: React.Dispatch<React.SetStateAction<boolean>>
  }
}

// Component
const CardBanner = (props: Props) => {
  const navigate = useNavigate();
  const handelClickLogin = () => navigate('/banners/login');

  useEffect(() => {
    if (localStorage.getItem('token') === null) {
      handelClickLogin();
    }
  }, []);

  const { banner } = props;
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [message, setMessage] = useState('');

  const deleteBanner = async () => {
    try {
      const result = await deleteByBannerID(banner._id);
      toastSuccess('message')

      setMessage(result.message);

    } catch (error) {
      setMessage(String(error));
    } finally {
      props.triger!.trigerSet(prev => !prev)
      setLoading(false);
      // window.location.reload();

    }
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handelClickCardProduct = () => navigate(`/banners/ProductPage/${banner.productID}`);

  return (
    <Box >
      {loading ? (
        <Box>
          <Circular />
          <Typography>Loading.....</Typography>
          {message && <Typography>{message}</Typography>}
        </Box>
      ) : (
        <Card
          sx={{
            maxWidth: 250,
            minHeight: 350,
            // height: 350,
            margin: '5px',
            boxSizing: 'border-box',
            boxShadow: '0 4px 8px rgba(0, 0, 0.9, 0.8)',
            marginBlock: '10px',
            transition: 'transform 0.3s',
          }}>
          <Grid
            onClick={handelClickCardProduct}
            sx={{cursor:'pointer'}}
            >

            <CardMedia
              component="img"
              height="105"
              // width="100"
              image={banner.image.url}
              alt={banner.image.alt}
              />
            <CardContent>
              <Typography gutterBottom variant="h4" component="div">
                {banner.name}
              </Typography>
              <Typography variant="h6" component="div">
                clicks: {banner.clickCount}
              </Typography>
            </CardContent>
              </Grid>

            <CardActions >
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
           
              <Grid
                onClick={handelClickCardProduct}
                sx={{cursor:'pointer'}}
                >

            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography variant="body1" color="text.secondary">
                  size: {banner.size}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  kind: {banner.kind}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  text: {banner.text}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  author: {banner.author}
                </Typography>
              </CardContent>
            </Collapse>
              </Grid>

          <CardActions>
            <IconButton onClick={deleteBanner}>
              <DeleteIcon />
            </IconButton>
            <IconButton>
              <EditIcon />
            </IconButton>
          </CardActions>
        </Card>
      )}
    </Box>
  );
};

export default CardBanner;
