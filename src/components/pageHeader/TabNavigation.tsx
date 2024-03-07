"use client";
import "client-only";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Tabs, { type TabsOwnProps } from "@mui/material/Tabs";
import Tab, { TabOwnProps } from "@mui/material/Tab";
import { styled } from "@mui/material/styles";
import type { MouseEvent, SyntheticEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { PageByPathnameType } from "~/types/pages";
import type { Route } from "next";

interface StyledTabsProps extends TabsOwnProps {
  onChange: (event: SyntheticEvent, newValue: string) => void;
}

const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs
    {...props}
    // TabIndicatorProps={{
    //   children: (
    //     <Box
    //       height="100%"
    //       width="100%"
    //       my={4}
    //       display="flex"
    //       alignItems="center"
    //       gap={4}
    //       p={2}
    //       sx={{ border: "8px solid green" }}
    //       className="MuiTabs-indicatorSpan"
    //     />
    //   ),
    // }}
  />
))({
  "& .MuiTabs-root": {},
  "& .MuiTabs-indicator": {
    height: ".2rem",
    marginBottom: "1px",
    backgroundColor: "cyan",
  },
});

interface StyledTabProps extends TabOwnProps {
  label: string;
  value: string;
}

const StyledTab = styled((props: StyledTabProps) => <Tab {...props} />)(
  ({ theme }) => ({
    "textTransform": "none",
    // "typography": theme.typography.body1,
    "fontWeight": theme.typography.fontWeightLight,
    // "fontSize": theme.typography.pxToRem(1),
    "fontSize": "1.25rem",
    // "marginRight": theme.spacing(1),
    // "backgroundColor": "transparent",
    "color": "white",
    "padding": 0,
    "margin": 0,
    "&.MuiButtonBase-root": {
      fontSize: ".75rem",
      color: "white",
      backgroundColor: "rgba(255, 255, 255, 0.02)",
    },
    "&.Mui-selected": {
      fontSize: ".8rem",
      fontWeight: theme.typography.fontWeightBold,
      color: theme.palette.secondary,
      backgroundColor: "rgba(255, 255, 255, 0.05)",
    },
    "&.Mui-focusVisible": {
      fontSize: theme.typography.pxToRem(1),
      // backgroundColor: "rgba(255, 255, 255, 0.5)",
    },
  }),
);
const SignOutTab = styled((props: StyledTabProps) => <Tab {...props} />)(
  ({ theme }) => ({
    "textTransform": "uppercase",
    // "typography": theme.typography.body1,
    "fontWeight": theme.typography.fontWeightLight,
    // "fontSize": theme.typography.pxToRem(1),
    "fontSize": "1.25rem",
    // "marginRight": theme.spacing(1),
    // "backgroundColor": "transparent",
    "color": "white",
    "padding": 0,
    "margin": 0,
    "&.MuiButtonBase-root": {
      fontSize: ".75rem",
      color: "white",
      backgroundColor: "rgba(255, 2, 200, 0.08)",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "rgba(255, 2, 255, 0.1)",
    },
    "&.Mui-selected": {
      fontSize: ".8rem",
      fontWeight: theme.typography.fontWeightBold,
      color: theme.palette.secondary,
      backgroundColor: "rgba(255, 255, 255, 0.05)",
    },
    "&.Mui-focusVisible": {
      fontSize: theme.typography.pxToRem(1),
      // backgroundColor: "rgba(255, 255, 255, 0.5)",
    },
  }),
);

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
    setValue(newValue);
    router.push(newValue as Route);
  };
  return (
    <StyledTabs
      value={value}
      onChange={handleChange}
      variant="fullWidth"
      aria-label="tabs to navigate to different pages">
      <StyledTab value="/top-tracks" label={pages["/top-tracks"]!.title} />

      <StyledTab value="/search" label={pages["/search"]!.title} />
      <StyledTab value="/videos" label={pages["/videos"]!.title} />
      <SignOutTab
        value="/api/auth/signout"
        label={pages["/api/auth/signout"]!.title}
      />
      {/* <Tab value="home" label="Home" /> */}
    </StyledTabs>
  );
}
