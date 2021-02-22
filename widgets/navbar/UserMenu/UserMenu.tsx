import useAuth from "@auth/useAuth";
import Button from "@components/Button";
import UserAvatar from "@components/UserAvatar";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { useRouter } from "next/router";
import React, { useState, Fragment, useRef } from "react";

export interface UserMenuProps {}

const UserMenu: React.FC<UserMenuProps> = ({}) => {
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
        {user && <MenuItem onClick={handleClickLogout}>Logout</MenuItem>}
        {!user && <MenuItem onClick={handleSignIn}>Sign in</MenuItem>}
      </Menu>
    </Fragment>
  );
};

export default UserMenu;
