import { FC, useContext, useState } from "react";
import NextLink from "next/link";
import { ClearOutlined, SearchOutlined, ShoppingCartOutlined } from "@mui/icons-material";
import { useRouter } from "next/router";
import {
  AppBar,
  Button,
  Link,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Badge,
  Input,
  InputAdornment,
} from "@mui/material";
import { CartContext, UiContext } from "../../context";

export const NavBar:FC<{}> = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false)
  const {toogleSideMenu} = useContext(UiContext);
 const {asPath,push} = useRouter();
 const {cartSummary}= useContext(CartContext)

  const onCloseSideBar=()=>{toogleSideMenu()}
    const navigateTo = (url: string) => {
      push(url);
    };
    const onSearchTerm = () => {
      if (searchTerm.trim().length === 0) return;
      navigateTo(`/search/${searchTerm}`);
      setSearchTerm("");
    };
    const eraseField = () =>{
      setIsSearchVisible(!isSearchVisible)
    }
  
  return (
    <AppBar>
      <Toolbar>
        <NextLink href="/" passHref>
          <Link display="flex" alignItems="center">
            <Typography variant="h6">Teslo |</Typography>
            <Typography sx={{ ml: 0.5 }}>shop</Typography>
          </Link>
        </NextLink>
        <Box flex={1} />
        <Box
          sx={{
            display: isSearchVisible ? "none" : { xs: "none", sm: "block" },
          }}
        >
          <NextLink href="/category/men" passHref>
            <Link>
              <Button
                color={asPath.substring(10) === "men" ? "primary":"info"}
              >
                Men
              </Button>
            </Link>
          </NextLink>
          <NextLink href="/category/women" passHref>
            <Link>
              <Button
                color={asPath.substring(10) === "women" ? "primary":"info"}
              >
                Women
              </Button>
            </Link>
          </NextLink>
          <NextLink href="/category/kid" passHref>
            <Link>
              <Button
                color={asPath.substring(10) === "kid" ? "primary":"info"}
              >
                Kids
              </Button>
            </Link>
          </NextLink>
        </Box>

        <Box flex={1} />
        {/**big screens*/}
        {isSearchVisible ? (
          <Input
            className="fadeIn"
            autoFocus={true}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && onSearchTerm()}
            type="text"
            placeholder="find..."
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={eraseField}>
                  <ClearOutlined />
                </IconButton>
              </InputAdornment>
            }
          />
        ) : (
          <>
            <IconButton
              className="fadeIn"
              sx={{ display: { xs: "none", sm: "flex" } }}
              onClick={() => setIsSearchVisible(!isSearchVisible)}
            >
              <SearchOutlined />
            </IconButton>
          </>
        )}

        {/**small screens */}
        <IconButton
          sx={{ display: { xs: "flex", sm: "none" } }}
          onClick={toogleSideMenu}
        >
          <SearchOutlined />
        </IconButton>
        <NextLink href="/cart" passHref>
          <Link>
            <IconButton>
              <Badge badgeContent={cartSummary.quantityOfIttems > 9 ? '+9': cartSummary.quantityOfIttems} color="secondary">
                <ShoppingCartOutlined />
              </Badge>
            </IconButton>
          </Link>
        </NextLink>
        <Button color={"info"} onClick={() => onCloseSideBar()}>Menu</Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;


