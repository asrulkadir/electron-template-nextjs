import { Button, Typography, Flex, Card } from "antd"
import Link from "next/link"
import Image from "next/image"
import { useStoresAccount } from "@/features"
import { Box, Row, Col } from "@/ui/components"

// ------------------------------------------------------------------------------------------
// @MainComponent - Home Page
// ------------------------------------------------------------------------------------------

export default function HomePage() {
  const account = useStoresAccount((stores) => stores.states.account)

  return (
    <Box className="min-h-screen p-8">
      <Row gutter={[24, 24]} className="items-center justify-center">
        <Col span={24}>
          <Flex vertical align="center" gap={32} className="py-12">
            <Image
              src="/next.svg"
              alt="Next.js logo"
              width={180}
              height={38}
              priority
            />

            <Typography.Title level={2} className="text-center">
              Electron + Next.js App
            </Typography.Title>

            <Typography.Text type="secondary" className="text-center">
              A desktop application built with Electron and Next.js
            </Typography.Text>
          </Flex>
        </Col>

        <Col span={24} md={8}>
          <Card hoverable className="h-full">
            <Flex vertical gap={16}>
              <Typography.Title level={4}>🚀 Fast Development</Typography.Title>
              <Typography.Paragraph type="secondary">
                Hot reload for both the main process and renderer. Edit your code and see changes instantly.
              </Typography.Paragraph>
            </Flex>
          </Card>
        </Col>

        <Col span={24} md={8}>
          <Card hoverable className="h-full">
            <Flex vertical gap={16}>
              <Typography.Title level={4}>💻 Cross Platform</Typography.Title>
              <Typography.Paragraph type="secondary">
                Build for Windows, macOS, and Linux from a single codebase using Electron Builder.
              </Typography.Paragraph>
            </Flex>
          </Card>
        </Col>

        <Col span={24} md={8}>
          <Card hoverable className="h-full">
            <Flex vertical gap={16}>
              <Typography.Title level={4}>🎨 Modern UI</Typography.Title>
              <Typography.Paragraph type="secondary">
                Built with Ant Design and Tailwind CSS for beautiful, responsive interfaces.
              </Typography.Paragraph>
            </Flex>
          </Card>
        </Col>

        <Col span={24}>
          <Flex justify="center" gap={16} className="mt-8">
            {account ? (
              <Link href="/dashboard">
                <Button type="primary" size="large">
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button type="primary" size="large">
                  Login
                </Button>
              </Link>
            )}
            <Button
              size="large"
              onClick={() => window.open("https://nextjs.org/docs", "_blank")}
            >
              Documentation
            </Button>
          </Flex>
        </Col>
      </Row>
    </Box>
  )
}
