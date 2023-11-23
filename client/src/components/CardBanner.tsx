import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, IconButton, IconButtonProps, Typography, styled } from '@mui/material';
import { blue } from '@mui/material/colors';
import { useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

type Props = {
  _id: string;
  productID: string;
  catogryID: string;
  clickCount: number;
  image: {
      url: string;
      alt: string;
  };
  size: 'side' | 'top' | 'all';
  kind:  ('price' | 'sale' )[];
  text: string;
  createdAt: Date;
  author: string;
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


const CardBanner = (prop: Props) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Card 
    sx={{ 
      maxWidth: 250, 
      maxHeight:500,
      margin: '5px', 
      boxSizing:'border-box',
      boxShadow: '0 4px 8px rgba(0, 0, 0.9, 0.8)',
      marginBlock:'10px',
      transition: 'transform 0.3s',
      '&:hover': {
        transform: 'scale(1.05)',
        
      },
    }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor:blue[400]}}>
            {prop.author.charAt(0)}
          </Avatar>}
        title={prop.productID} subheader={prop.createdAt.toDateString()}/>
      <CardMedia
        component="img"
        height="105"
        width='100'
        image= {prop.image.url}
        alt={prop.image.alt}
      />
      <CardContent>
          <Typography variant='h6' component='div'>
            clicks: {prop.clickCount}
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
            size: {prop.size}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            kind: {prop.kind}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            text: {prop.text}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            author: {prop.author}
          </Typography>
        </CardContent>
      </Collapse>
      <CardActions>
        <IconButton>
          <DeleteIcon/>
        </IconButton>
        <IconButton>
          <EditIcon/>
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default CardBanner