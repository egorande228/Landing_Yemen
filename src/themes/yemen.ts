import { baseThemeScales, createThemeVars } from "@/themes/base";
import type { ThemeTokens } from "@/schemas/landing";

export const yemenTheme: ThemeTokens = {
  color: {
    bg: "#040506",
    bgTop: "#0a0b0e",
    foreground: "#f1eadf",
    foregroundSoft: "rgba(241, 234, 223, 0.68)",
    primary: "#981d26",
    primarySoft: "rgba(152, 29, 38, 0.14)",
    primaryStrong: "#cb2d38",
    secondary: "#efe7d8",
    surface: "rgba(12, 13, 17, 0.88)",
    surfaceStrong: "rgba(8, 9, 12, 0.96)",
    surfaceAccent: "rgba(26, 11, 14, 0.96)",
    borderSoft: "rgba(241, 234, 223, 0.07)",
    borderStrong: "rgba(152, 29, 38, 0.24)",
    gridLine: "rgba(241, 234, 223, 0.022)",
    glow: "rgba(152, 29, 38, 0.12)",

    success: "#6dd0a0",
    danger: "#f26a73",
  },

  type: {
    ...baseThemeScales.type,
    display: "clamp(2.45rem, 5vw, 4.7rem)",
    heading: "clamp(2.02rem, 3.12vw, 2.98rem)",
    subheading: "clamp(1.08rem, 1.46vw, 1.22rem)",
    cardTitle: "clamp(1.1rem, 1.38vw, 1.3rem)",
    bodyLg: "clamp(1.1rem, 1.2vw, 1.16rem)",
    body: "1.02rem",
    label: "0.78rem",
    meta: "0.74rem",
    metric: "clamp(1.56rem, 2.3vw, 2.28rem)",
    metricSecondary: "0.92rem",
    stat: "0.97rem",
  },
  radius: {
    sm: "11px",
    md: "15px",
    lg: "22px",
    xl: "28px",
    pill: "999px",
  },
  space: {
    ...baseThemeScales.space,
    sectionY: "clamp(2.1rem, 3.2vw, 2.8rem)",
    sectionYMobile: "1.95rem",
    containerX: "clamp(14px, 2.9vw, 32px)",
    cardPadding: "clamp(0.82rem, 1.1vw, 1rem)",
    gridGap: "clamp(0.68rem, 0.98vw, 0.9rem)",
  },

  shadow: {
    soft: "0 14px 38px rgba(0, 0, 0, 0.24)",
    card: "0 18px 52px rgba(0, 0, 0, 0.32), inset 0 1px 0 rgba(255, 255, 255, 0.028)",
    hero: "0 24px 70px rgba(0, 0, 0, 0.36), inset 0 1px 0 rgba(255, 255, 255, 0.03)",
    glow: "0 0 48px rgba(152, 29, 38, 0.14)",
  },

  motion: baseThemeScales.motion,
};

export const yemenThemeVars = createThemeVars(yemenTheme);
