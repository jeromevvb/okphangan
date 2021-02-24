import BodyText from "@components/BodyText";
import { Box, colors, Hidden, makeStyles, Theme } from "@material-ui/core";
import Image from "next/image";
import React, { Fragment, useState } from "react";
import { FaPhotoVideo } from "react-icons/fa";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css"; //

export interface PhotosLightboxProps {
  photos: Array<string>;
}

const useStyles = makeStyles((theme: Theme) => ({
  imgContainer: {
    flex: "50%",
    // padding: "0px 5px 5px 0px",
  },
  img: {
    cursor: "pointer",
    objectFit: "cover",
    width: "100%",
    maxHeight: "100%",
  },
  emptyPhotosContainer: {
    borderRadius: theme.shape.borderRadius,
    minHeight: 250,
    backgroundColor: colors.grey[200],
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  photosContainer: {
    overflow: "hidden",
    display: "flex",
    flexWrap: "wrap",
    maxHeight: "400px",
    borderRadius: theme.shape.borderRadius,
  },
}));

const PhotosLightbox: React.FC<PhotosLightboxProps> = ({ photos }) => {
  const classes = useStyles();

  const [lightboxPhotoIndex, setLightboxPhotoIndex] = useState<number>(0);
  const [showLightbox, setShowLightbox] = useState<boolean>(false);

  if (photos.length === 0)
    return (
      <Box className={classes.emptyPhotosContainer}>
        <Box>
          <FaPhotoVideo size={60} color={colors.grey[800]} />
        </Box>
        <BodyText>No pictures available</BodyText>
      </Box>
    );

  return (
    <Box className={classes.photosContainer}>
      {photos.map((photoUrl, indexPhoto) => {
        return (
          <div key={photoUrl} className={classes.imgContainer}>
            <Image
              onClick={() => {
                setLightboxPhotoIndex(indexPhoto);
                setShowLightbox(true);
              }}
              className={classes.img}
              src={photoUrl}
              width={400}
              height={200}
            />
          </div>
        );
      })}

      {showLightbox && (
        <Lightbox
          mainSrc={photos[lightboxPhotoIndex]}
          nextSrc={photos[(lightboxPhotoIndex + 1) % photos.length]}
          prevSrc={
            photos[(lightboxPhotoIndex + photos.length - 1) % photos.length]
          }
          onCloseRequest={() => setShowLightbox(false)}
          onMovePrevRequest={() =>
            setLightboxPhotoIndex(
              (lightboxPhotoIndex + photos.length - 1) % photos.length
            )
          }
          onMoveNextRequest={() =>
            setLightboxPhotoIndex((lightboxPhotoIndex + 1) % photos.length)
          }
        />
      )}
    </Box>
  );
};

export default PhotosLightbox;
