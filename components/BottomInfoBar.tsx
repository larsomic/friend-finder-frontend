import { Box, Grid, Link, Typography, useMediaQuery, useTheme } from '@mui/material';

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const links = {
    'Legal': ['Privacy', 'Terms', 'Cookie Policy', 'Intellectual Property'],
    'Career': ['Careers Portal', 'Tech Blog'],
    'Social': ['Instagram', 'TikTok', 'YouTube', 'Twitter', 'Facebook'],
    'Other': ['FAQ', 'Destinations', 'Press Room', 'Contact', 'Promo Code']
  };

  return (
    <Box sx={{ backgroundColor: 'var(--color1)', padding: isMobile ? 2 : 3, marginTop: 'auto' }}>
        <Grid container spacing={isMobile ? 2 : 3}>
            {Object.entries(links).map(([category, linkGroup], index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
                <Typography sx={{color:'var(--color2)'}} variant="subtitle1" gutterBottom>
                {category}
                </Typography>
                {linkGroup.map((link, index) => (
                <Typography variant="body1" component="div" key={index} sx={{color:'var(--color3)'}}>
                    <Link href="#" color="inherit">
                    {link}
                    </Link>
                </Typography>
                ))}
            </Grid>
            ))}
        </Grid>
    </Box>
  );
};

export default Footer;
