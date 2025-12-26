"use client"
import "@ant-design/v5-patch-for-react-19"
import { AntdRegistry } from "@ant-design/nextjs-registry"
import { ConfigProvider, type ConfigProviderProps } from "antd"
import dayjs from "dayjs"
import "dayjs/locale/id"
import { theme } from "@/configs/theme"

dayjs.locale("id")

// ------------------------------------------------------------------------------------------
// @MainComponent - Antd Config Provider
// ------------------------------------------------------------------------------------------

type TAntdConfigProviderProps = {
  children: React.ReactNode
} & ConfigProviderProps

export function AntdConfigProvider({ children, ...props }: TAntdConfigProviderProps) {
  return (
    <AntdRegistry>
      <ConfigProvider {...props} theme={theme}>
        {children}
      </ConfigProvider>
    </AntdRegistry>
  )
}
