import useAuth from "@auth/useAuth";
import Button from "@components/Button";
import UserAvatar from "@components/UserAvatar";
import {
  Box,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { useRouter } from "next/router";
import React, { useState, Fragment, useRef } from "react";
import { HiOutlineLogout } from "react-icons/hi";
import { MdBusinessCenter } from "react-icons/md";

import Divider from "@material-ui/core/Divider";
export interface UserMenuProps {
  onlyAvatar?: boolean;
}

const UserMenu: React.FC<UserMenuProps> = ({ onlyAvatar = false }) => {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const avatarRef = useRef(null);

  const handleClickLogout = () => {
    signOut();
  };

  const handleSignIn = () => {
    return router.push("/login");
  };
  const handleClickBusiness = () => {
    if (!user?.business) return;
    return router.push(`/business/${user.business.slug}`);
  };

  if (onlyAvatar) {
    return <UserAvatar user={user} />;
  }

  return (
    <Fragment>
      <IconButton
        ref={avatarRef}
        color="inherit"
        onClick={() => setOpenMenu(true)}
      >
        <UserAvatar user={user} />
      </IconButton>

      <Menu
        elevation={1}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        id="user-menu"
        anchorEl={avatarRef.current}
        open={openMenu}
        onClose={() => setOpenMenu(false)}
      >
        {user && (
          <div>
            {user.business && (
              <div>
                <MenuItem onClick={handleClickBusiness}>
                  <ListItemIcon>
                    <MdBusinessCenter></MdBusinessCenter>
                  </ListItemIcon>
                  {user.business.name}
                </MenuItem>
                <Box padding="10px 0">
                  <Divider />
                </Box>
              </div>
            )}
            <MenuItem onClick={handleClickLogout}>
              <ListItemIcon>
                <HiOutlineLogout></HiOutlineLogout>
              </ListItemIcon>
              Logout
            </MenuItem>
          </div>
        )}
        {!user && <MenuItem onClick={handleSignIn}>Sign in</MenuItem>}
      </Menu>
    </Fragment>
  );
};

export default UserMenu;
