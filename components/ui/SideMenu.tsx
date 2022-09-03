import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Input,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import {
  AccountCircleOutlined,
  AdminPanelSettings,
  CategoryOutlined,
  ConfirmationNumberOutlined,
  EscalatorWarningOutlined,
  FemaleOutlined,
  LoginOutlined,
  MaleOutlined,
  SearchOutlined,
  VpnKeyOutlined,
} from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import { AuthContext, UiContext } from "../../context";
import { useRouter } from "next/router";

export const SideMenu = () => {
  const { toogleSideMenu, isMenuOpen } = useContext(UiContext)
  const { user, isLoggedIn } = useContext(AuthContext)
  const [searchTerm, setSearchTerm] = useState('');


  const { push, replace } = useRouter()

  const navigateTo = (url: string) => {
    replace(url)
    toogleSideMenu()
  }

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return
    navigateTo(`/search/${searchTerm}`)
    setSearchTerm('')
  }

  return (
    <Drawer
      onClose={() => toogleSideMenu()}
      open={isMenuOpen}
      anchor="right"
      sx={{ backdropFilter: "blur(4px)", transition: "all 0.5s ease-out" }}
    >
      <Box sx={{ width: 250, paddingTop: 5 }}>
        <List>
          <ListItem>
            <Input
              autoFocus={true}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && onSearchTerm()}
              type="text"
              placeholder="Buscar..."
              endAdornment={
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility">
                    <SearchOutlined />
                  </IconButton>
                </InputAdornment>
              }
            />
          </ListItem>

          <ListItem button style={{ display: isLoggedIn? 'flex':'none'}} >
            <ListItemIcon>
              <AccountCircleOutlined />
            </ListItemIcon>
            <ListItemText primary={"Perfil"} />
          </ListItem>

          <ListItem button style={{ display: isLoggedIn? 'flex':'none'}} >
            <ListItemIcon>
              <ConfirmationNumberOutlined />
            </ListItemIcon>
            <ListItemText primary={"Mis Ordenes"} />
          </ListItem>

          <ListItem button sx={{ display: { xs: "", sm: "none" } }}>
            <ListItemIcon>
              <MaleOutlined />
            </ListItemIcon>
            <ListItemText
              primary={"Men"}
              onClick={() => {
                navigateTo("/category/men");
              }}
            />
          </ListItem>

          <ListItem button sx={{ display: { xs: "", sm: "none" } }}>
            <ListItemIcon>
              <FemaleOutlined />
            </ListItemIcon>
            <ListItemText
              primary={"Women"}
              onClick={() => {
                navigateTo("/category/women");
              }}
            />
          </ListItem>

          <ListItem button sx={{ display: { xs: "", sm: "none" } }}>
            <ListItemIcon>
              <EscalatorWarningOutlined />
            </ListItemIcon>
            <ListItemText
              primary={"Niños"}
              onClick={() => {
                navigateTo("/category/kid");
              }}
            />
          </ListItem>
          <ListItem button style={{ display: isLoggedIn? 'none':'flex'}} >
            <ListItemIcon>
              <VpnKeyOutlined />
            </ListItemIcon>
            <ListItemText primary={"Ingresar"} />
          </ListItem>
          <ListItem button style={{ display: isLoggedIn? 'flex':'none'}} >
            <ListItemIcon>
              <LoginOutlined />
            </ListItemIcon>
            <ListItemText primary={"Salir"} />
          </ListItem>
          {/* Admin */}
          <Divider />
          {user?.role === 'admin' && 
          (<Box>
          <ListSubheader>Admin Panel</ListSubheader>
            <ListItem button>
              <ListItemIcon>
                <CategoryOutlined />
              </ListItemIcon>
              <ListItemText primary={"Productos"} />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <ConfirmationNumberOutlined />
              </ListItemIcon>
              <ListItemText primary={"Ordenes"} />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <AdminPanelSettings />
              </ListItemIcon>
              <ListItemText primary={"Usuarios"} />
            </ListItem>
          </Box>
          )
          }
        </List>
      </Box>
    </Drawer>
  );
};
