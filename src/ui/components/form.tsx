import { Flex, type FlexProps, Typography } from "antd"
import type * as React from "react"
import { Show } from "./show"

// ------------------------------------------------------------------------------------------
// Form Item Label
// ------------------------------------------------------------------------------------------

type TFormItemLabelProps = {
  required?: boolean
  label: string | React.ReactNode
} & Omit<FlexProps, "children">

export function FormItemLabel({ required = false, label, ...props }: TFormItemLabelProps) {
  return (
    <Flex justify="start" {...props}>
      <Typography.Text strong>{label}</Typography.Text>

      <Show when={required}>
        <Typography.Text type="danger">*</Typography.Text>
      </Show>
    </Flex>
  )
}
