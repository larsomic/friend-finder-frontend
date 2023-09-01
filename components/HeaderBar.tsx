import React, { useContext } from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem } from '@mui/material';
import Diversity1TwoToneIcon from '@mui/icons-material/Diversity1TwoTone';
import { Menu as MenuIcon } from '@mui/icons-material';
import type { StoreType } from '../redux/store_type';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { PopupContext } from '../contexts/PopupContext';
import { useDispatch } from 'react-redux';

axios.defaults.withCredentials = true;

function HeaderBar() {
  const state = useSelector((state: StoreType) => state);
  const popupContext = useContext(PopupContext);
  if (!popupContext) {
    throw new Error("PopupContext is undefined, make sure you're using the PopupProvider");
  }
  const { isPopupOpen, openPopup } = popupContext;
  const dispatch = useDispatch();

  const loggedIn = state.auth.loggedIn;

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [anchorElMenu1, setAnchorElMenu1] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleOpenMenu1 = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElMenu1(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCloseUserMenu1 = () => {
    setAnchorElMenu1(null);
  };

  const pages = ['Mission', 'Safety', 'Support'];

  const settings = {
    'Account': () => { openPopup('account'); handleCloseUserMenu(); },
    'Preferences': () => { openPopup('friend-preferences'); handleCloseUserMenu(); },
    'Settings': () => { openPopup('settings'); handleCloseUserMenu(); },
    'Logout': () => { openPopup('logout'); handleCloseUserMenu(); },
  };

  const handleDemo = async () =>  {
    try {
        await axios.post(process.env.NEXT_PUBLIC_BASE_API_URL + "/api/auth/demo");
        dispatch({ type: 'DEMO' });
    } catch (error) {
        console.log("Error when starting demo.");
    }
  };

  const loggedOutItems = {
    'Demo': () => { handleDemo(); },
    'Sign Up': () => { openPopup('signup'); },
    'Login': () => { openPopup('login'); },
  };

  return (
    <React.Fragment>
      <AppBar position="sticky" sx={{ bgcolor: 'var(--color1)' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Diversity1TwoToneIcon sx={{ display: { xs: 'none', md: 'flex' }, color: 'var(--color4)', mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'Montserrat',
                fontWeight: 700,
                color: 'var(--color4)',
                textDecoration: 'none',
                fontSize: { xs: '1.1rem', md: '1.3rem'}
              }}
            >
              Friend Finder
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
              >
                <MenuIcon sx={{ color: 'var(--color4)' }} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center" sx={{ color: 'var(--color4)' }}>{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'Montserrat',
                fontWeight: 700,
                letterSpacing: { xs: '.1rem', md: '.3rem' },
                color: 'var(--color4)',
                textDecoration: 'none',
              }}
            >
              Friend Finder
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'var(--color3)', display: 'block' }}
                >
                  {page}
                </Button>
              ))}
            </Box>
            {loggedIn ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={state.user.name || "NA"} />
                    {/* <Avatar alt={state.user.name || "NA"} src="/static/images/avatar/2.jpg" /> */}
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar-user" // Update the id to differentiate from the previous menu
                  anchorEl={anchorElUser} // Use anchorElUser instead of anchorElNav
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)} // Use anchorElUser instead of anchorElNav
                  onClose={handleCloseUserMenu} // Use handleCloseUserMenu instead of handleCloseNavMenu
                >
                  {Object.entries(settings).map(([setting, handleClick]) => (
                    <MenuItem key={setting} onClick={handleClick}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            ) : (
              <Box>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
                  {Object.entries(loggedOutItems).map(([setting, handleClick]) => (
                    <MenuItem key={setting} onClick={handleClick}>
                      <Typography textAlign="center" sx={{ color: 'var(--color4)' }}>{setting}</Typography>
                    </MenuItem>
                  ))}
                </Box>
                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, justifyContent: 'flex-end' }}>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenMenu1}
                  >
                    <Diversity1TwoToneIcon sx={{ color: 'var(--color4)', mr: 1 }} />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElMenu1}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    open={Boolean(anchorElMenu1)}
                    onClose={handleCloseUserMenu1}
                    sx={{
                      display: { xs: 'block', md: 'none' },
                    }}
                  >
                    {Object.entries(loggedOutItems).map(([setting, handleClick]) => (
                      <MenuItem key={setting} onClick={handleClick}>
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </React.Fragment>
  );
}

export default HeaderBar;
