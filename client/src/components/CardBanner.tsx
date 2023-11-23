import { Avatar, Box, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, Grid, IconButton, IconButtonProps, Typography, styled } from '@mui/material';
import { blue } from '@mui/material/colors';
import { useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { ResponseBanner } from '../types/BannerInterface';
import { deleteByBannerID } from '../api/deleteByBannerID';

type Props = {
  banner: ResponseBanner
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


const CardBanner = (props: Props) => {
  const banner = props.banner;
  const [loading, setLoading] = useState(false)

  const [expanded, setExpanded] = useState(false);

  const [message, setMessage] = useState('')
  const deleteBanner = async () => {
    try {
      const result = await deleteByBannerID(banner._id);
      setMessage(result.message);
      console.log(result.message);
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
      }, 2000);
      window.location.reload();
    } catch (error) {
      setMessage(String(error));
      console.log(error);
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
      }, 2000);
      window.location.reload();
    }
  };
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (<>
    {loading ?
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          minWidth: '420px',
          minHeight: '360px'
        }}>
        <Grid
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <Typography>Loding.....</Typography>
          {message && <Typography>{message}</Typography>}
        </Grid>
      </Box>
      :
      <Card
        sx={{
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

        <CardMedia
          component="img"
          height="105"
          width='100'
          image={banner.image.url}
          alt={banner.image.alt}
        />
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            {banner.name}
          </Typography>
          <Typography variant='h6' component='div'>
            clicks: {banner.clickCount}
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
        <CardActions>
          <IconButton onClick={() => deleteBanner()}>
            <DeleteIcon />
          </IconButton>
          <IconButton>
            <EditIcon />
          </IconButton>
        </CardActions>
      </Card>}</>
  )
}

export default CardBanner