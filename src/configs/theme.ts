import type { ThemeConfig } from "antd"

export const theme: ThemeConfig = {
  token: {
    fontFamily:
      "Sora, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
    colorPrimary: "#5F5AD5",
  },
  components: {
    Typography: {
      titleMarginBottom: 0,
      titleMarginTop: 0,
    },
    Layout: {
      headerBg: "#FFFFFF",
      siderBg: "#FFFFFF",
      footerBg: "#FFFFFF",
    },
    Menu: {
      itemMarginInline: 12,
      itemHeight: 48,
    },
  },
}
