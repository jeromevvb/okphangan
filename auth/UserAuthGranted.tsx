import React, { useEffect } from "react";
import useAuth from "./useAuth";
import { useRouter } from "next/router";
import Typography from "@material-ui/core/Typography";

interface UserAuthGrantedProps {
  children: any;
  role?: "business" | "member";
}

const UserAuthGranted: React.FC<UserAuthGrantedProps> = ({
  role,
  children,
}) => {
  const { user, userLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // if user is still null, means that there is not user authenticated
    // we redirect.
    if (!user && !userLoading) {
      router.replace("/");
    }

    // if user but his role is not granted
    // we redirect.
    if (user && role && user.role !== role) {
      router.replace("/");
    }
  }, [user, userLoading]);

  // if user is fetching...
  if (userLoading || !user) return <Typography>Loading...</Typography>;

  return children;
};

export default UserAuthGranted;
