"use client";

import { styled } from "@mui/material/styles";
import Tooltip, {
  type TooltipProps,
  tooltipClasses,
} from "@mui/material/Tooltip";
import type { ReactElement } from "react";

export const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.background,
    fontWeight: ".8rem",
    color: theme.palette.primary,
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));

export const BootstrapTooltip = styled(
  ({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ),
)(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}));

export const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

export interface StyledTooltipProps {
  tooltipType: "light" | "bootstrap" | "html";
  title: string;
  children?: ReactElement;
  tooltipProps?: TooltipProps;
  popperClassName?: string;
}

export default LightTooltip;
