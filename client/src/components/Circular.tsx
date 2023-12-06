import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';

export default function Circular() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                minWidth: '420px',
                minHeight: '360px'
            }}
        >
            <Grid
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
                    <CircularProgress color="success" />
                </Stack>
                <Typography>Loding.....</Typography>
            </Grid>
        </Box>
    );
}