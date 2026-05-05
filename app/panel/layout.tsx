import type { Metadata } from "next";

import PanelLayout from "@/components/panel/PanelLayout";

export const metadata: Metadata = {
  title: "Panel Privado",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PanelRootLayout({ children }: { children: React.ReactNode }) {
  return <PanelLayout>{children}</PanelLayout>;
}
