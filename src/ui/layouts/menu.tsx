import { Menu as AntdMenu, Button, type ButtonProps, Layout, type MenuProps, type SiderProps } from "antd"
import { ChevronLeft } from "lucide-react"
import * as React from "react"
import { cx } from "@/libraries/clsx"
import { useAntdMenuDefaultKeys } from "../hooks/use-antd-menu-default-keys"

// ------------------------------------------------------------------------------------------
// Menu Trigger
// ------------------------------------------------------------------------------------------

type TMenuTriggerProps = {} & ButtonProps

export function MenuTrigger({ className, ...props }: TMenuTriggerProps) {
  return (
    <Button
      className={cx("absolute bg-gray-300 z-auto menu-trigger", className)}
      shape="circle"
      size="small"
      type="default"
      {...props}
    >
      <ChevronLeft size={16} strokeWidth={1.5} />
    </Button>
  )
}

// ------------------------------------------------------------------------------------------
// Menu List
// ------------------------------------------------------------------------------------------

type TMenuListProps = {} & MenuProps

export function MenuList({ className, items, ...props }: TMenuListProps) {
  const { defaultSelectedKeys, defaultOpenKeys } = useAntdMenuDefaultKeys({
    menuList: items,
  })

  React.useEffect(() => {
    setTimeout(() => {
      const menuItemList = document.querySelectorAll("#App-Sidebar-Menu .ant-menu-item") as NodeListOf<HTMLElement>
      menuItemList.forEach((item) => {
        if (item.className.includes("ant-menu-item-selected")) {
          // @Docs stackoverflow.com/a/52835382
          item.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" })
        }
      })
    }, 100)
  }, [])

  return (
    <AntdMenu
      id="App-Sidebar-Menu"
      defaultOpenKeys={defaultOpenKeys}
      defaultSelectedKeys={defaultSelectedKeys}
      className={cx("bg-white border-none overflow-y-auto h-full overscroll-contain scrollbar--none", className)}
      mode="inline"
      items={items}
      {...props}
    />
  )
}

// ------------------------------------------------------------------------------------------
// @MainComponent - Menu
// ------------------------------------------------------------------------------------------

type TMenuProps = {} & SiderProps

export function Menu({ children, className, width = 300, ...props }: TMenuProps) {
  return (
    <Layout.Sider
      className={cx(
        "[&_.ant-layout-sider-children]:relative group",
        // @Notes Hide group title when collapsed.
        "[&_.ant-menu-item-group-title]:group-[.ant-layout-sider-collapsed]:text-transparent",
        "[&_.ant-menu-item-group-title]:group-[.ant-layout-sider-collapsed]:absolute",
        "[&_.ant-menu-item-group-title]:group-[.ant-layout-sider-collapsed]:transition-none",
        "[&_.menu-madhani-copyright]:group-[.ant-layout-sider-collapsed]:hidden",
        "[&_.menu-trigger]:group-[.ant-layout-sider-collapsed]:rotate-180",
        // @Notes Icons dimensions.
        "[&_.ant-menu-item]:group-[.ant-layout-sider-collapsed]:flex",
        "[&_.ant-menu-item]:group-[.ant-layout-sider-collapsed]:items-center",
        "[&_.ant-menu-item]:group-[.ant-layout-sider-collapsed]:justify-center",
        "[&_.ant-menu-item]:group-[.ant-layout-sider-collapsed]:p-0",
        "[&_.ant-menu-title-content]:group-[.ant-layout-sider-collapsed]:hidden",
        "[&_.ant-menu-submenu-title]:group-[.ant-layout-sider-collapsed]:flex",
        "[&_.ant-menu-submenu-title]:group-[.ant-layout-sider-collapsed]:items-center",
        "[&_.ant-menu-submenu-title]:group-[.ant-layout-sider-collapsed]:justify-center",
        "[&_.ant-menu-submenu-title]:group-[.ant-layout-sider-collapsed]:p-0",
        // @Notes Sticky menu.
        // `64px` is the height of the `header.tsx`.
        "h-[calc(100vh-64px)] sticky top-[64px] border-r-[1px] border-gray-200",
        // @Notes Menu children.
        "[&_.ant-layout-sider-children]:flex [&_.ant-layout-sider-children]:flex-col [&_.ant-layout-sider-children]:justify-between",
        "[&_.ant-layout-sider-children]:gap-12 [&_.ant-layout-sider-children]:py-6",
        className,
      )}
      width={width}
      trigger={null}
      collapsible
      {...props}
    >
      {children}
    </Layout.Sider>
  )
}
