"use client";
import "client-only";

import Link from "next/link";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import type { ElementType, MouseEvent, SyntheticEvent } from "react";
import { forwardRef, useState } from "react";
import { useRouter } from "next/navigation";

interface LinkTabProps {
  href: string;
  onClick: (event: MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  value: string;
  component: ElementType;
  label?: string;
  selected?: boolean;
}

export const samePageLinkNavigation = (
  event: MouseEvent<HTMLAnchorElement, MouseEvent>,
) => {
  if (
    event.defaultPrevented ||
    event.button !== 0 || // ignore everything but left-click
    event.metaKey ||
    event.ctrlKey ||
    event.altKey ||
    event.shiftKey
  ) {
    return false;
  }
  return true;
};

const pages = {
  topTracks: "/top-tracks",
  search: "/search",
  home: "/",
};

export default function TabNavigation() {
  const router = useRouter();
  const [value, setValue] = useState("topTracks");
  const handleChange = (event: SyntheticEvent, newValue: string) => {
    console.log("handleChange");
    setValue(newValue);
    router.push(pages[newValue]);
  };
  return (
    <Tabs
      value={value}
      onChange={handleChange}
      variant="fullWidth"
      aria-label="tabs to navigate to different pages">
      <Tab value="topTracks" label="Top Tracks" />

      <Tab value="search" label="Search" />
      {/* <Tab value="home" label="Home" /> */}
    </Tabs>
  );
}
