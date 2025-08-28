import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function OtherGallery() {
  // Breakpoints
  const isTablet = useMediaQuery("(max-width:900px)");
  const isMobile = useMediaQuery("(max-width:600px)");

  // Config responsive (mantengo tu look en desktop)
  const cols = isMobile ? 2 : 3;
  const listWidth = isTablet ? "100%" : 500;
  const listHeight = isTablet ? "auto" : 550;
  const gap = isMobile ? 6 : 8;
  const variant = isMobile ? "standard" : "woven";

  // En móvil muestro menos imágenes (4) para que respire
  const imagesToShow = isMobile ? itemData.slice(0, 4) : itemData;

  return (
    <ImageList
      sx={{
        width: listWidth,
        height: listHeight,
        marginTop: 2,           // un poco menos que 15 para móviles
        overflow: "hidden",
      }}
      cols={cols}
      gap={gap}
      variant={variant}
    >
      {imagesToShow.map((item) => (
        <ImageListItem key={item.img}>
          <img
            srcSet={`${item.img}?w=300&fit=crop&auto=format&dpr=2 2x`}
            src={`${item.img}?w=300&fit=crop&auto=format`}
            alt={item.title}
            loading="lazy"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: 6,
              display: "block",
            }}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

const itemData = [
  { img: "asesoria.png", title: "asesoria" },
  { img: "oficina.png", title: "oficina" },
  { img: "IA.png", title: "IA" },
  { img: "equipo.png", title: "equipo" },
  { img: "seguro.png", title: "seguro" },
  { img: "cont.png", title: "cont" },
];
