import React, { useEffect, useState } from 'react';
import { Box, Card, CardActions, CardContent, CardMedia, Collapse, Grid, IconButton, IconButtonProps, Typography, useTheme } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { ResponseBanner } from '../../types/BannerInterface';
import { Response } from '../../types/UserInterface';
import { deleteByBannerID } from '../../api/banners/deleteByBannerID';
import { useNavigate } from 'react-router-dom';
import Circular from '../Circular';
import { toastError, toastSuccess } from '../../utils/toast';

interface Props {
  banner: ResponseBanner;
  triger?: {
    triger: boolean;
    trigerSet: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = (props: ExpandMoreProps) => (
  <IconButton {...props} />
);

const CardBanner = (props: Props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [message] = useState('');
  const theme = useTheme();

  useEffect(() => {
    if (localStorage.getItem('token') === null) {
      navigate('/banner/login');
    }
  }, [navigate]);

  const deleteBanner = async () => {
    try {
      setLoading(true);
      const result: Response = await deleteByBannerID(props.banner._id);
      if (result && result.success === true) {
        toastSuccess(result.message);
      } else {
        toastError('Delete failed');
      }
    } catch (error) {
      toastError(String(error));
    } finally {
      props.triger?.trigerSet((prev) => !prev);
      setLoading(false);
    }
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleCardClick = () => {
    navigate(`/banner/banners/ProductPage/${props.banner.productID}`);
  };

  return (
    <Box>
      {loading ? (
        <Box>
          <Circular />
          <Typography>Loading...</Typography>
          {message && <Typography>{message}</Typography>}
        </Box>
      ) : (
        <Card
          sx={{
            maxWidth: 250,
            minHeight: 350,
            margin: '15px',
            boxSizing: 'border-box',
            boxShadow: '0 4px 8px rgba(0, 0, 0.2)',
            marginBlock: '20px',
            transition: 'transform 0.3s',
            marginBottom: '10px',
            borderRadius: theme.shape.borderRadius,
            '&:hover': {
              transform: 'scale(1.05)',
              transition: 'transform 0.3s',
              boxShadow: theme.shadows[3],
            },
          }}
        >
          <Grid onClick={handleCardClick} sx={{ cursor: 'pointer' }}>
            <CardMedia
              component="img"
              height="105"
              image={props.banner.image.url}
              alt={props.banner.image.alt}
            />
            <CardContent>
              <Typography gutterBottom variant="h4" component="div" sx={{ color: theme.palette.primary.main }}>
                {props.banner.name}
              </Typography>
              <Typography variant="h6" component="div" sx={{ color: theme.palette.secondary.main }}>
                Clicks: {props.banner.clickCount}
              </Typography>
            </CardContent>
          </Grid>

          <CardActions>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
              sx={{ color: theme.palette.text.primary }}
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>

          <Grid onClick={handleCardClick} sx={{ cursor: 'pointer' }}>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography variant="body1" color="text.secondary">
                  Size: {props.banner.size}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Kind: {props.banner.kind}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Text: {props.banner.text}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Author: {props.banner.author}
                </Typography>
              </CardContent>
            </Collapse>
          </Grid>

          <CardActions>
            <IconButton onClick={deleteBanner} sx={{ color: '#dc2f02'}}>
              <DeleteIcon />
            </IconButton>
            <IconButton sx={{ color: theme.palette.primary.main }}>
              <EditIcon />
            </IconButton>
          </CardActions>
        </Card>
      )}
    </Box>
  );
};

export default CardBanner;
