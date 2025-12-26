import { Breadcrumb, type BreadcrumbProps, type GetProps, Layout } from "antd"
import { cx } from "@/libraries"

// ------------------------------------------------------------------------------------------
// Content Breadcrumb
// ------------------------------------------------------------------------------------------

type TContentBreadcrumbProps = {} & BreadcrumbProps

export function ContentBreadcrumb({ ...props }: TContentBreadcrumbProps) {
  return <Breadcrumb {...props} />
}

// ------------------------------------------------------------------------------------------
// @MainComponent - Content
// ------------------------------------------------------------------------------------------

type TContentProps = {} & GetProps<typeof Layout.Content>

export function Content({ children, className, ...props }: TContentProps) {
  return (
    <Layout.Content className={cx("bg-white min-h-full flow-root p-8", className)} {...props}>
      {children}
    </Layout.Content>
  )
}
