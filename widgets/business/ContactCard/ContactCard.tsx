import React from "react";
import { BusinessModel } from "@models/business";
import { Box, Link } from "@material-ui/core";
import { HiOutlinePhone } from "react-icons/hi";
import Subtitle from "@components/Subtitle";
import {
  FaFacebookSquare,
  FaInstagram,
  FaInternetExplorer,
} from "react-icons/fa";
import useAuth from "@auth/useAuth";
import Card from "@components/Card";
import BodyText from "@components/BodyText";
import Button from "@components/Button";

export interface ContactCardProps {
  business: BusinessModel;
}

const ContactCard: React.FC<ContactCardProps> = ({ business }) => {
  const { user } = useAuth();

  if (!user) {
    return (
      <Card title="Contact">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          padding={3}
        >
          <BodyText>You need to be logged to see contact informations</BodyText>
          <Box marginTop={2} width="100%">
            <Button
              fullWidth
              variant="contained"
              color="primary"
              href={`/login?redirectBusiness=${business.name}`}
            >
              LOGIN
            </Button>
          </Box>
        </Box>
      </Card>
    );
  }

  return (
    <Card title="Contact">
      <Box marginBottom={2} display="flex" alignItems="center">
        <Box marginRight={1}>
          <HiOutlinePhone size={25} />
        </Box>
        <Box>
          <Subtitle>{business.phone}</Subtitle>
        </Box>
      </Box>
      <Box marginBottom={2} display="flex" alignItems="center">
        <Box marginRight={1}>
          <FaInternetExplorer size={25} />
        </Box>
        <Box>
          {business.website && <Subtitle>{business.website}</Subtitle>}
          {!business.website && (
            <Subtitle color="textSecondary">No website</Subtitle>
          )}
        </Box>
      </Box>
      <Box marginBottom={2} display="flex" alignItems="center">
        <Box marginRight={1}>
          <FaFacebookSquare size={25} />
        </Box>
        <Box>
          {business.facebookPage && (
            <Link href={business.facebookPage} target="__blank">
              <Subtitle>{business.facebookPage}</Subtitle>
            </Link>
          )}
          {!business.facebookPage && (
            <Subtitle color="textSecondary">No facebook page</Subtitle>
          )}
        </Box>
      </Box>
      <Box marginBottom={2} display="flex" alignItems="center">
        <Box marginRight={1}>
          <FaInstagram size={25} />
        </Box>
        <Box>
          {business.instagramPage && (
            <Link href={business.instagramPage} target="__blank">
              <Subtitle>{business.instagramPage}</Subtitle>
            </Link>
          )}
          {!business.instagramPage && (
            <Subtitle color="textSecondary">No instagram page</Subtitle>
          )}
        </Box>
      </Box>
    </Card>
  );
};

export default ContactCard;
