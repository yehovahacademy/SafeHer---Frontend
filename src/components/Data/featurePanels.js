import { Eye, MapPinned, ShieldCheck } from "lucide-react";

export const featurePanels = [
  {
    id: "awareness",
    icon: Eye,
    eyebrow: "01 — Awareness",
    title: "Know your route options.",
    description:
      "Explore available route alternatives and understand the information behind each journey before making a decision.",
    visualTitle: "See the bigger picture.",
    visualDescription:
      "Route information helps you make informed travel decisions. It does not establish that a route is safe.",
  },
  {
    id: "route-insights",
    icon: MapPinned,
    eyebrow: "02 — Route insights",
    title: "Compare your journey.",
    description:
      "Compare available routes by distance and estimated travel time, where that information is available.",
    visualTitle: "Distance meets direction.",
    visualDescription:
      "Estimated times can change with traffic and conditions. Current route options are driving-based.",
  },
  {
    id: "transparency",
    icon: ShieldCheck,
    eyebrow: "03 — Transparency",
    title: "Safety starts with honesty.",
    description:
      "Understand what the app can tell you, what remains unverified, and why route information alone cannot guarantee personal safety.",
    visualTitle: "Clear information. No false promises.",
    visualDescription:
      "SafeHer does not currently verify routes as safe or identify a guaranteed safest route.",
  },
];