import { Layout, type LayoutProps, type MenuProps, Typography } from "antd"
import {
  LayoutDashboard,
  MessageCircle,
  Users,
} from "lucide-react"
import Link from "next/link"
import * as React from "react"
import { Box } from "@/ui/components"
import { Header } from "./header"
import { Menu, MenuList, MenuTrigger } from "./menu"

// ==========================================================================================
// Miscellaneous
// ==========================================================================================

const Variables = {
  menuList: [
    {
      key: "/dashboard",
      label: <Link href="/dashboard">Dashboard</Link>,
      icon: <LayoutDashboard size={24} />,
      className: "font-normal",
    },
    {
      key: "/user-management",
      label: <Link href="/user-management">User Management</Link>,
      icon: <Users size={24} />,
      className: "font-normal",
    },
    {
      key: "/blog-post",
      label: <Link href="/blog-post">Blog Post</Link>,
      icon: <MessageCircle size={24} />,
      className: "font-normal",
    },
  ] as Array<Required<MenuProps>["items"][number]>,
}

// ------------------------------------------------------------------------------------------
// @MainComponent - App
// ------------------------------------------------------------------------------------------

type TAppProps = {} & LayoutProps

export function App({ children, ...props }: TAppProps) {
  const [collapsed, setCollapsed] = React.useState(false)

  function handleToggleMenu() {
    setCollapsed(!collapsed)
  }

  return (
    <Layout {...props}>
      {
        // ------------------------------------------------------------------------------------------
        // @Header
        // ------------------------------------------------------------------------------------------
      }
      <Layout className="sticky top-0 z-10">
        <Header>
          <Typography.Title level={4} style={{ margin: 0 }}>Electron App</Typography.Title>
        </Header>
      </Layout>

      <Layout className="min-h-screen">
        {
          // ------------------------------------------------------------------------------------------
          // @Menu
          // ------------------------------------------------------------------------------------------
        }
        <Menu collapsed={collapsed} onCollapse={handleToggleMenu}>
          <MenuTrigger className="top-2 -right-3" onClick={handleToggleMenu} />

          <MenuList className="mt-4" items={Variables.menuList} />

          <Box className="menu-madhani-copyright">
            <Box className="flex flex-col items-center justify-center">
              <Typography.Text className="text-center text-xs text-gray-400">
                Copyright <span className="font-semibold">© 2024 Your Company</span>
              </Typography.Text>
              <Typography.Text className="text-center text-xs text-gray-400">All Rights Reserved</Typography.Text>
            </Box>

            <Box className="flex flex-col items-center justify-center mt-3">
              <Typography.Text className="text-center text-xs text-gray-400">App version 1.0.0</Typography.Text>
            </Box>
          </Box>
        </Menu>

        {
          // ------------------------------------------------------------------------------------------
          // @Content
          // ------------------------------------------------------------------------------------------
        }
        <React.Fragment>{children}</React.Fragment>
      </Layout>
    </Layout>
  )
}
