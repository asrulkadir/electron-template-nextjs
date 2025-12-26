import type { MenuProps } from "antd"
import { useRouter } from "next/router"

function createDefaultOpenKeys(defaultKey: string) {
  return defaultKey
    .split("/")
    .filter(Boolean)
    .reduce(
      (paths, _, idx, context) => {
        const key = "/" + context.slice(0, idx + 1).join("/")
        return [...paths, key]
      },
      [] as Array<string>,
    )
}

type TMenuItemsWithChildren = Array<
  NonNullable<MenuProps["items"]>[number] & {
    children?: TMenuItemsWithChildren
  }
>

type TTraverseMenuListOptions = {
  menuList: TMenuItemsWithChildren
  pathname: string
  currentDefaultKey: string
}

function traverseMenuList(options: TTraverseMenuListOptions) {
  let targetDefaultKey = options.currentDefaultKey

  if (!options.menuList || !Array.isArray(options.menuList) || options.menuList.length === 0) {
    return targetDefaultKey
  }

  for (const item of options.menuList) {
    const itemKey = item?.key?.toString() || ""

    if (!itemKey) {
      continue
    }

    if (itemKey === options.pathname || options.pathname.includes(itemKey || "")) {
      targetDefaultKey = itemKey
    }

    if (item.children) {
      targetDefaultKey = traverseMenuList({
        menuList: item.children,
        pathname: options.pathname,
        currentDefaultKey: targetDefaultKey,
      })
    }
  }

  return targetDefaultKey
}

// ==========================================================================================
// @MainHook
// ==========================================================================================

type TUseAntdMenuDefaultKeysOptions = {
  menuList: MenuProps["items"]
}

export function useAntdMenuDefaultKeys(options: TUseAntdMenuDefaultKeysOptions) {
  const router = useRouter()
  const pathname = router.pathname
  
  if (!options.menuList || !Array.isArray(options.menuList) || options.menuList.length === 0) {
    return {
      defaultSelectedKeys: [""],
    }
  }
  const menuList = [...options.menuList] as TTraverseMenuListOptions["menuList"]
  const defaultKey = traverseMenuList({ menuList, pathname, currentDefaultKey: "" })
  const defaultOpenKeys = createDefaultOpenKeys(defaultKey)

  return {
    defaultSelectedKeys: [defaultKey],
    defaultOpenKeys: defaultOpenKeys,
  }
}
