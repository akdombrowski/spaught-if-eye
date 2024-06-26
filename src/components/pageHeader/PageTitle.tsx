"use client";
import "client-only";

import Typography from "@mui/material/Typography";
import { usePathname } from "next/navigation";
import type { PageByPathnameType } from "~/types/pages";
export default function PageTitle(props: { pages: PageByPathnameType }) {
  const pathname = usePathname();
  const { pages } = props;
  return (
    <Typography variant="h5" component="h1" textAlign="center">
      {pages[pathname]?.title ?? pathname}
    </Typography>
  );
}
