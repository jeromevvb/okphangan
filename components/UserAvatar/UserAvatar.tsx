import useAuth from "@auth/useAuth";
import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { Box } from "@material-ui/core";
import { UserModel } from "@models/auth";

export interface UserAvatarProps {
  user: UserModel | null;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ user }) => {
  return (
    <Box display="flex" alignContent="center" alignItems="center">
      <Box>
        {!user && <Avatar />}
        {user && (
          <Avatar alt={user.displayName} src={user.photoURL}>
            {user.displayName.substring(0, 2).toUpperCase()}
          </Avatar>
        )}
      </Box>
    </Box>
  );
};

export default UserAvatar;
