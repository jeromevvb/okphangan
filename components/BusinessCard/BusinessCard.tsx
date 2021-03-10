import BodyText from "@components/BodyText";
import BusinessAvatar from "@components/BusinessAvatar";
import Card from "@components/Card";
import Subtitle from "@components/Subtitle";
import { Box, Chip, makeStyles } from "@material-ui/core";
import { BusinessModel } from "@models/business";
import capitalize from "helpers/capitalize";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  cardRoot: {
    height: "100%",
    "&:hover": {
      // border: `1px solid ${theme.palette.primary.main}`,
      cursor: "pointer",
      boxShadow: "0px 1px 5px #d7d7d7",
    },
  },
}));

const BusinessCard: React.FC<{ business: BusinessModel }> = ({ business }) => {
  const router = useRouter();
  const classes = useStyles();

  const handleClick = () => {
    return router.push(`/business/${business.slug}`);
  };

  return (
    <Card onClick={handleClick} className={classes.cardRoot}>
      <Box textAlign="center" marginTop={1}>
        <BusinessAvatar business={business} size="small" />

        <Box marginTop={1}>
          <Subtitle strong>{business.name.toUpperCase()}</Subtitle>
          <BodyText>
            {capitalize(business.type)} - {capitalize(business.category)}
          </BodyText>
        </Box>
      </Box>
      <Box marginTop={2}>
        {business.tags instanceof Array &&
          business.tags.map((tag: string) => (
            <Box key={tag} margin={0.2} display="inline-flex">
              <Chip label={tag.toUpperCase()} size="small" />
            </Box>
          ))}
      </Box>
    </Card>
  );
};

export default BusinessCard;
