import { Typography, Button } from '@mui/material';

const getHomePage = () => {
    const randomNumber = Math.random();
    return randomNumber >= 0.5 ? 0 : 1;
  };

const UnauthenticatedHomePage = () => {
    const whichHomePage = getHomePage();
    const imagePath = whichHomePage ? 'home' : 'home1';
    const textShown = whichHomePage ? 'No need to swipe!' : 'Get back to what works, Dating!';

    return (
        <>
            <div className='textContainer'>
            <Typography className='color4 Montserrat' variant="h2">{textShown}</Typography>
            <Button variant="contained" type="submit">Learn More!</Button>
            </div>
            <div style={{position: 'relative'}} className='vignette imageContainer'>
                <picture>
                    <source srcSet={`/images/${imagePath}.webp`} type="image/webp" />
                    <source srcSet={`/images/${imagePath}.jpg`} type="image/jpeg" /> 
                    <img src={`/images/${imagePath}.jpg`} alt="Dating Photo" />
                </picture>
            </div>
        </>
    );
};

export default UnauthenticatedHomePage;
