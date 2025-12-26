import { Button, Card, Flex, Typography } from "antd"
import { Home, LogOut } from "lucide-react"
import { useRouter } from "next/router"
import { useStoresAccount } from "@/features"
import { Box, Col, Row } from "@/ui/components"
import { App, Content, ContentBreadcrumb } from "@/ui/layouts"
import { ProtectedPrivateProvider } from "@/ui/providers"

// ------------------------------------------------------------------------------------------
// Navigation Page
// ------------------------------------------------------------------------------------------

function NavigationPage() {
  return (
    <ContentBreadcrumb
      items={[
        {
          title: (
            <Box className="inline-flex items-center text-black gap-2">
              <Home size={16} />
              <Typography.Text>Dashboard</Typography.Text>
            </Box>
          ),
          href: "/dashboard",
        },
      ]}
    />
  )
}

// ------------------------------------------------------------------------------------------
// @MainComponent - Dashboard Page
// ------------------------------------------------------------------------------------------

export default function DashboardPage() {
  const router = useRouter()
  const account = useStoresAccount((stores) => stores.states.account)
  const actionsStoresAccount = useStoresAccount((stores) => stores.actions)

  function handleLogout() {
    actionsStoresAccount.resetAccount()
    router.push("/login")
  }

  return (
    <ProtectedPrivateProvider isAccountExist={Boolean(account)}>
      <App>
        <Content>
          <Box>
            <NavigationPage />
          </Box>

          <Box className="mt-6">
            <Row gutter={[24, 24]}>
              <Col span={24}>
                <Flex justify="space-between" align="center">
                  <Typography.Title level={2}>Welcome, {account?.name || "User"}!</Typography.Title>
                  <Button type="primary" danger icon={<LogOut size={16} />} onClick={handleLogout}>
                    Logout
                  </Button>
                </Flex>
              </Col>

              <Col span={24} md={8}>
                <Card hoverable>
                  <Flex vertical gap={16}>
                    <Typography.Title level={4}>📊 Statistics</Typography.Title>
                    <Typography.Paragraph type="secondary">
                      View your application statistics and analytics here.
                    </Typography.Paragraph>
                  </Flex>
                </Card>
              </Col>

              <Col span={24} md={8}>
                <Card hoverable>
                  <Flex vertical gap={16}>
                    <Typography.Title level={4}>👥 Users</Typography.Title>
                    <Typography.Paragraph type="secondary">
                      Manage users and their permissions in the system.
                    </Typography.Paragraph>
                  </Flex>
                </Card>
              </Col>

              <Col span={24} md={8}>
                <Card hoverable>
                  <Flex vertical gap={16}>
                    <Typography.Title level={4}>⚙️ Settings</Typography.Title>
                    <Typography.Paragraph type="secondary">
                      Configure your application settings and preferences.
                    </Typography.Paragraph>
                  </Flex>
                </Card>
              </Col>

              <Col span={24}>
                <Card>
                  <Typography.Title level={4}>About This Dashboard</Typography.Title>
                  <Typography.Paragraph>
                    This is a sample dashboard page built with Electron and Next.js. It demonstrates how to create
                    a protected route that requires authentication. The user information is stored in Zustand with
                    persistence, so you will remain logged in even after refreshing the page.
                  </Typography.Paragraph>
                  <Typography.Paragraph>
                    You can navigate to other pages using the sidebar menu on the left. The menu supports nested
                    items and automatically highlights the current page.
                  </Typography.Paragraph>
                </Card>
              </Col>
            </Row>
          </Box>
        </Content>
      </App>
    </ProtectedPrivateProvider>
  )
}
