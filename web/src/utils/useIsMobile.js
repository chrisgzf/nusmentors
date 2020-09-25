import { useMediaQuery, useTheme } from "@material-ui/core";
import react from "react";

export default function useIsMobile() {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down("xs"));
}
