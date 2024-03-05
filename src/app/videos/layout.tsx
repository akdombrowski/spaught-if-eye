import Script from "next/script";
import { ReactNode } from "react";
export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <section>{children}</section>
      {/**
       *https://developers.google.com/youtube/iframe_api_reference
       */}
      <Script src="https://www.youtube.com/iframe_api" />
    </>
  );
}
