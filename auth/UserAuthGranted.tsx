import React, { useEffect } from "react";
import useAuth from "./useAuth";
import { useRouter } from "next/router";

interface UserAuthGrantedProps {
  children: any;
  role?: "business" | "member";
  onboarded?: boolean;
}

const UserAuthGranted: React.FC<UserAuthGrantedProps> = ({
  role,
  children,
  onboarded = true,
}) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/");
    }

    //TODO: SHOW PAGE 404
    if (user && user.onboarded !== onboarded) {
      router.replace("/");
    }

    if (user && role && user.role !== role) {
      router.replace("/");
    }
  }, []);

  return children;
};

export default UserAuthGranted;
