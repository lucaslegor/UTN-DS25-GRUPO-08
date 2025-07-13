import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function OtherGallery() {
  const isMobile = useMediaQuery("(max-width:480px)");
  const imagesToShow = isMobile ? itemData.slice(0, 4) : itemData;

  return (
    <ImageList
      sx={{
        width: isMobile ? "100%" : 500,
        height: isMobile ? "auto" : 550,
        marginTop: 15,
        overflow: "hidden",
      }}
      cols={isMobile ? 2 : 3}
      gap={8}
      variant={isMobile ? "standard" : "woven"} // Quitamos woven en mobile
    >
      {imagesToShow.map((item) => (
        <ImageListItem key={item.img}>
          <img
            srcSet={`${item.img}?w=161&fit=crop&auto=format&dpr=2 2x`}
            src={`${item.img}?w=161&fit=crop&auto=format`}
            alt={item.title}
            loading="lazy"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: 6,
            }}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

const itemData = [
  {
    img: "asesoria.png",
    title: "asesoria",
  },
  {
    img: "oficina.png",
    title: "oficina",
  },
  {
   img: "IA.png",
   title: "IA",
  },
  {
    img: "equipo.png",
    title: "equipo",
  },
  {
    img: "seguro.png",
    title: "seguro",
  },
  {
    img: "cont.png",
    title: "cont",
  },
];