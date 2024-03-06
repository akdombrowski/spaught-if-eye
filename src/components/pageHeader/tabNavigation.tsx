"use client";
import "client-only";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import type { ElementType, MouseEvent, SyntheticEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { PageByPathnameType } from "~/types/pages";
import type { Route } from "next";

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

export default function TabNavigation(props: { pages: PageByPathnameType }) {
  const { pages } = props;
  const router = useRouter();
  const [value, setValue] = useState("/top-tracks");
  const handleChange = (event: SyntheticEvent, newValue: string) => {
    console.log("handleChange");
    setValue(newValue);
    router.push(newValue as Route);
  };
  return (
    <Tabs
      value={value}
      onChange={handleChange}
      variant="fullWidth"
      aria-label="tabs to navigate to different pages">
      <Tab value="/top-tracks" label={pages["/top-tracks"]!.title} />

      <Tab value="/search" label={pages["/search"]!.title} />
      <Tab value="/videos" label={pages["/videos"]!.title} />
      {/* <Tab value="home" label="Home" /> */}
    </Tabs>
  );
}
