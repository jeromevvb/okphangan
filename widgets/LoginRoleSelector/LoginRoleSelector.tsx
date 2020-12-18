import ButtonRadios from "@components/ButtonRadios";
import { Box } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import React from "react";

interface LoginRoleSelectorProps {
  onChangeRole(role: string): void;
  role: "member" | "business" | string;
}

const LoginRoleSelector: React.FC<LoginRoleSelectorProps> = ({
  role,
  onChangeRole,
}) => {
  const options = [
    { label: "I live here or i'm a tourist", value: "member" },
    { label: "I have a business or i'm a freelancer", value: "business" },
  ];

  return (
    <Box>
      <ButtonRadios
        onChange={(option) => onChangeRole(option.value as string)}
        label="Please select who you are"
        options={options}
      />

      {role && (
        <Alert severity="info">
          <AlertTitle>
            {options.find((o) => o.value === role)?.label}
          </AlertTitle>
          {role === "member" && "Be part of the community"}
          {role === "business" &&
            "In less than five minutes and for free, create your business page and be part of the community."}
        </Alert>
      )}
    </Box>
  );
};

export default LoginRoleSelector;
