import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Link as ScrollToLink, animateScroll as scroll } from "react-scroll";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Fade from "@mui/material/Fade";
import logo_black from "../../assets/logo_black.png";
import {
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { groceryContext } from "../Layout/Layout";
import { ShoppingCartRounded } from "@mui/icons-material";
import SuccessAlert from "../SuccessAlert/SuccessAlert";
import Typography from "@mui/material/Typography";
import useCategory from "../../hooks/useCategory";
// This function will add Go_back feature on the Navbar
function ScrollTop(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  // Go_back to the top Button Handler
  const handleClick = () => {
    scroll.scrollToTop({
      duration: 500,
      smooth: true,
    });
  };
  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 20, right: 16 }}
      >
        {children}
      </Box>
    </Fade>
  );
}

// This function will show a Elevation effect on the Navbar when scrolling
function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const Links = ({ drawer, setIsOpenDrawer, isOpenDrawer }) => {
  const location = useLocation();
  const { pathname } = location;

  // This class will create Link Obj
  class LinkClass {
    constructor(id, linkName) {
      this.id = id;
      this.linkName = linkName;
    }
  }

  const pageLink = [
    new LinkClass(0, "Home"),
    new LinkClass(1, "About"),
    new LinkClass(3, "Product"),
  ];
  const componentsLink = [, new LinkClass("footer", "Contact")];

  return drawer ? (
    <List sx={{ mt: 1.5 }}>
      {pageLink.map((link) => (
        <Link to={`/${link.linkName.toLowerCase()}`} key={link.id}>
          <ListItem sx={{ minWidth: "12rem" }} disablePadding>
            <ListItemButton
              onClick={() => setIsOpenDrawer(!isOpenDrawer)}
              sx={{ ":hover": { bgcolor: "#E0F3D7" } }}
            >
              <ListItemText
                sx={{ marginLeft: "0.4rem" }}
                primary={link.linkName}
              />
            </ListItemButton>
          </ListItem>
        </Link>
      ))}
      {componentsLink.map((link, i) => (
        <ScrollToLink
          to={link.id}
          key={i}
          smooth={true}
          spy={true}
          offset={-70}
          duration={80}
        >
          <ListItem
            disabled={
              link.id !== "footer" && pathname !== "/" && pathname !== "/home"
            }
            key={i}
            sx={{ minWidth: "12rem" }}
            disablePadding
          >
            <ListItemButton
              onClick={() => setIsOpenDrawer(!isOpenDrawer)}
              sx={{ ":hover": { bgcolor: "#E0F3D7" } }}
            >
              <ListItemText
                sx={{ marginLeft: "0.4rem" }}
                primary={link.linkName}
              />
            </ListItemButton>
          </ListItem>
        </ScrollToLink>
      ))}
    </List>
  ) : (
    <ul className={`flex p-0 sm:space-x-8 space-x-5' text-black`}>
      {pageLink.map((li) => (
        <Link to={`/${li.linkName.toLowerCase()}`} key={li.id}>
          <li className="sm:text-base hover:text-gray-800 hover:scale-[0.99] text-sm">
            {li.linkName}
          </li>
        </Link>
      ))}
      {componentsLink.map((link, i) => (
        <li
          key={i}
          className={`sm:text-base ${
            link.id !== "footer" && pathname !== "/" && pathname !== "/home"
              ? "hidden"
              : "block"
          } hover:text-gray-800 transition-all duration-500 hover:scale-[0.99] text-sm cursor-pointer`}
        >
          <ScrollToLink
            to={link.id}
            activeClass="active"
            smooth={true}
            spy={true}
            offset={-70}
            duration={500}
          >
            {link.linkName}
          </ScrollToLink>
        </li>
      ))}
    </ul>
  );
};
export const userLoggedIn = JSON.parse(sessionStorage.getItem("userLoggedIn"));

const Navbar = (props) => {
  const [isNavBarElevated, setIsNavbarElevated] = React.useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = React.useState(false);

  // Media Query
  const isExtraSmallScreen = useMediaQuery("(max-width: 664px)");
  const isSemiMediumScreen = useMediaQuery("(max-width: 900px)");
  const isLargeScreen = useMediaQuery("(max-width:1280px)");
  const category = useCategory(); 
  // This function will change the navBar bg-color when user scrolls
  window.addEventListener("scroll", () => {
    setIsNavbarElevated(window.scrollY > 0);
  });
  React.useEffect(() => {
    setIsNavbarElevated(window.pageYOffset > 0);
  }, []);

  const navigate = useNavigate();
  const { userLoggedInState } = React.useContext(groceryContext);
  const [isUserLoggedIn, setIsUserLoggedIn] = userLoggedInState;

  const [openAlert, setOpenAlert] = React.useState(false);

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    // Navigate to the selected category URL
    window.location.href = selectedCategory;
  };

  // Log out button handler
  const handleLogOut = () => {
    setIsUserLoggedIn(false);
    setOpenAlert(!openAlert);
    sessionStorage.setItem("userLoggedIn", JSON.stringify(false));
  };

  return (
    <>
      <SuccessAlert
        state={[openAlert, setOpenAlert]}
        massage={"Log out successfully"}
      />

      <nav className="fixed z-50">
        <CssBaseline />
        <ElevationScroll {...props}>
          <AppBar
            sx={{
              bgcolor: isNavBarElevated ? "white" : "transparent",
              transition: "all 150ms ease-in-out",
            }}
          >
            <Toolbar>
              <Container
                disableGutters={isLargeScreen}
                sx={{ display: "flex", px: isLargeScreen ? 0.5 : 0 }}
              >
                {/* Open Drawer Btn */}
                {isSemiMediumScreen && (
                  <IconButton
                    color="black"
                    aria-label="open drawer"
                    onClick={() => setIsOpenDrawer(!isOpenDrawer)}
                    edge="start"
                    sx={{ mr: 1 }}
                  >
                    <MenuIcon fontSize="inherit" />
                  </IconButton>
                )}

                <div className="flex w-full justify-between items-center">
                  {/* Brand_icon */}
                  <Link to={"/home"} style={{display:"flex"}}>
                    <img
                      className="sm:max-h-6 max-h-5 my-auto cursor-pointer"
                      src={logo_black}
                      alt="grocery"
                    />

                    <Typography
                      variant="h6"
                      sx={{
                        marginLeft: "8px",
                        color: isNavBarElevated ? "black" : "green",
                      }}
                    >
                      HyperBazaar
                    </Typography>
                  </Link>
                  <div className="flex items-center space-x-8">
                    {/* Links */}
                    {isSemiMediumScreen ? (
                      <Drawer
                        anchor={"left"}
                        open={isOpenDrawer}
                        onClose={() => setIsOpenDrawer(!isOpenDrawer)}
                      >
                        <Links
                          setIsOpenDrawer={setIsOpenDrawer}
                          isOpenDrawer={isOpenDrawer}
                          drawer={true}
                        />
                      </Drawer>
                    ) : (
                      <Links
                        setIsOpenDrawer={setIsOpenDrawer}
                        isOpenDrawer={isOpenDrawer}
                      />
                    )}
                    <div className="sm:space-x-8 space-x-5">
                     {/* Go to specific category */}

                     <li className="nav-item dropdown">
                        <div
                          className="row"
                          style={{ display: "flex", gap: "2rem", color:"black" }}
                        >
                          <label htmlFor="categorySelect">Categories</label>
                          <select
                            id="categorySelect"
                            className="form-select"
                            onChange={handleCategoryChange}
                          >
                            <option value="/categories">Select any category</option>
                            {category?.map((c) => (
                              <option
                                key={c.slug}
                                value={`/category/${c.name}`}
                              >
                                {c.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </li>
                      {/* Go to cart btn */}
                      <Tooltip title="Cart">
                        <span>
                          <IconButton
                            onClick={() => navigate("/cart")}
                            // disabled
                            sx={{ textTransform: "capitalize" }}
                            color="warning"
                          >
                            <ShoppingCartRounded fontSize="inherit" />
                          </IconButton>
                        </span>
                      </Tooltip>
                      {/* // Sign up */}
                      <Button
                        onClick={() => navigate("/register")}
                        size={isExtraSmallScreen ? "small" : "medium"}
                        sx={{ textTransform: "capitalize" }}
                        color="success"
                        variant="contained"
                      >
                        Sign Up
                      </Button>
                      {
                        // Log in Btn
                        !isUserLoggedIn ? (
                          <Button
                            onClick={() => navigate("/login")}
                            size={isExtraSmallScreen ? "small" : "medium"}
                            sx={{ textTransform: "capitalize" }}
                            color="success"
                            variant="contained"
                          >
                            Log in
                          </Button>
                        ) : (
                          // Log out Btn
                          <Button
                            size={isExtraSmallScreen ? "small" : "medium"}
                            onClick={handleLogOut}
                            sx={{ textTransform: "capitalize" }}
                            color="success"
                            variant="contained"
                          >
                            Log out
                          </Button>
                        )
                      }

                     
                    </div>
                  </div>
                </div>
              </Container>
            </Toolbar>
          </AppBar>
        </ElevationScroll>
        <Toolbar id="back-to-top-anchor" />

        {/* Go_Back on the top btn */}
        <ScrollTop {...props}>
          <Fab color="warning" size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      </nav>
    </>
  );
};

export default Navbar;

// import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import { Link, useNavigate } from 'react-router-dom';
// import { ShoppingCartRounded } from '@mui/icons-material';
// import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import Drawer from '@mui/material/Drawer';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemText from '@mui/material/ListItemText';
// import Tooltip from '@mui/material/Tooltip';
// import useMediaQuery from '@mui/material/useMediaQuery';
// // import { handleSessionStorage } from '../../utils/utils';
// import SuccessAlert from '../SuccessAlert/SuccessAlert';

// const Navbar = ({ isUserLoggedIn, setIsUserLoggedIn }) => {
//     const navigate = useNavigate();
//     const [openAlert, setOpenAlert] = React.useState(false);
//     const [isOpenDrawer, setIsOpenDrawer] = React.useState(false);

//     const handleLogOut = () => {
//         setIsUserLoggedIn(false);
//         setOpenAlert(!openAlert);
//         // sessionStorage.setItem('userLoggedIn', JSON.stringify(false));
//     };

//     return (
//         <>
//             <SuccessAlert
//                 state={[openAlert, setOpenAlert]}
//                 massage={'Log out successfully'}
//             />
//             <AppBar position="fixed">
//                 <Toolbar>
//                     {/* Your Logo or Branding */}
//                     <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//                         Your Brand
//                     </Typography>

//                     {/* Navigation Links */}
//                     <div>
//                         {/* Cart Button */}
//                         <Tooltip title="Cart">
//                             <IconButton onClick={() => navigate('/cart')} color="inherit">
//                                 <ShoppingCartRounded />
//                             </IconButton>
//                         </Tooltip>

//                         {/* Conditional Rendering of Sign In/Log Out Button */}
//                         {isUserLoggedIn ? (
//                             <button onClick={handleLogOut}>Log Out</button>
//                         ) : (
//                             <button onClick={() => navigate('/login')}>Sign In</button>
//                         )}

//                         {/* Drawer for Mobile */}
//                         <IconButton
//                             size="large"
//                             edge="start"
//                             color="inherit"
//                             aria-label="menu"
//                             sx={{ ml: 2 }}
//                             onClick={() => setIsOpenDrawer(true)}
//                         >
//                             <MenuIcon />
//                         </IconButton>
//                         <Drawer
//                             anchor="right"
//                             open={isOpenDrawer}
//                             onClose={() => setIsOpenDrawer(false)}
//                         >
//                             <List>
//                                 <ListItem button onClick={() => setIsOpenDrawer(false)}>
//                                     <Link to="/about">
//                                         <ListItemText>About</ListItemText>
//                                     </Link>
//                                 </ListItem>
//                                 <ListItem button onClick={() => setIsOpenDrawer(false)}>
//                                     <Link to="/contact">
//                                         <ListItemText>Contact</ListItemText>
//                                     </Link>
//                                 </ListItem>
//                             </List>
//                         </Drawer>
//                     </div>
//                 </Toolbar>
//             </AppBar>
//             <Toolbar />
//         </>
//     );
// };

// export default Navbar;
