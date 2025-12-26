import { Col as AntdCol, Row as AntdRow, type ColProps, Flex, type RowProps, Typography } from "antd"
import * as React from "react"
import { Show } from "./show"

// ------------------------------------------------------------------------------------------
// Grid Detail
// ------------------------------------------------------------------------------------------

type TGridDetailProps = {
  contentList: Array<{
    header: string | React.ReactNode
    content: string | React.ReactNode
  }>
  cols: "1" | "2" | "3" | "4"
} & RowProps

export function GridDetail({ children, contentList, cols = "2", ...props }: TGridDetailProps) {
  const colsSpan = {
    "1": 24,
    "2": 12,
    "3": 8,
    "4": 6,
  }

  return (
    <Row gutter={[16, 32]} {...props}>
      {contentList.map((content, index) => (
        <Col key={`item-${index}`} span={colsSpan[cols]}>
          <Flex vertical gap={16}>
            <Show when={React.isValidElement(content.header)}>{content.header}</Show>
            <Show when={!React.isValidElement(content.header)}>
              <Typography.Title level={5}>{content.header}</Typography.Title>
            </Show>

            <Show when={React.isValidElement(content.content)}>{content.content}</Show>
            <Show when={!React.isValidElement(content.content)}>
              <Typography.Text>{content.content}</Typography.Text>
            </Show>
          </Flex>
        </Col>
      ))}
    </Row>
  )
}

// ------------------------------------------------------------------------------------------
// @MainComponent - Grid
// ------------------------------------------------------------------------------------------

type TColprops = {} & ColProps

export function Col({ children, ...props }: TColprops) {
  /**
   * Default props.
   */
  const defaultProps: ColProps = {
    span: 12,
  }

  return (
    <AntdCol {...defaultProps} {...props}>
      {children}
    </AntdCol>
  )
}

type TRowProps = {} & RowProps

export function Row({ children, ...props }: TRowProps) {
  /**
   * Default props.
   */
  const defaultProps: RowProps = {
    gutter: [16, 16],
  }

  return (
    <AntdRow {...defaultProps} {...props}>
      {children}
    </AntdRow>
  )
}
