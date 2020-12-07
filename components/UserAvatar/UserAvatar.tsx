import useAuth from "@auth/useAuth";
import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { Box } from "@material-ui/core";
import BodyText from "@components/BodyText";

export interface UserAvatarProps {}

const UserAvatar: React.FC<UserAvatarProps> = ({}) => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <Box display="flex" alignContent="center" alignItems="center">
      <Box marginRight={1}>
        <Avatar alt={user.displayName} src={user.photoURL}>
          {user.displayName.substring(0, 2)}
        </Avatar>
      </Box>
      {/* <Box>
        <BodyText>{user.firstName}</BodyText>
      </Box> */}
    </Box>
  );
};

export default UserAvatar;