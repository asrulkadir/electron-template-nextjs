import { Button, Card, Flex, Table, Typography, Tag, Space } from "antd"
import type { ColumnsType } from "antd/es/table"
import { Home, Plus, Edit, Trash2 } from "lucide-react"
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
        {
          title: <Typography.Text>User Management</Typography.Text>,
          href: "/user-management",
        },
      ]}
    />
  )
}

// ------------------------------------------------------------------------------------------
// Sample Data
// ------------------------------------------------------------------------------------------

interface DataType {
  key: string
  name: string
  email: string
  role: string
  status: "active" | "inactive"
}

const sampleData: DataType[] = [
  {
    key: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Admin",
    status: "active",
  },
  {
    key: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "Editor",
    status: "active",
  },
  {
    key: "3",
    name: "Bob Wilson",
    email: "bob.wilson@example.com",
    role: "Viewer",
    status: "inactive",
  },
  {
    key: "4",
    name: "Alice Brown",
    email: "alice.brown@example.com",
    role: "Editor",
    status: "active",
  },
  {
    key: "5",
    name: "Charlie Davis",
    email: "charlie.davis@example.com",
    role: "Viewer",
    status: "active",
  },
]

const columns: ColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
    render: (role: string) => {
      const color = role === "Admin" ? "blue" : role === "Editor" ? "green" : "default"
      return <Tag color={color}>{role}</Tag>
    },
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: string) => {
      const color = status === "active" ? "success" : "error"
      return <Tag color={color}>{status.toUpperCase()}</Tag>
    },
  },
  {
    title: "Actions",
    key: "actions",
    render: () => (
      <Space>
        <Button type="text" icon={<Edit size={16} />} />
        <Button type="text" danger icon={<Trash2 size={16} />} />
      </Space>
    ),
  },
]

// ------------------------------------------------------------------------------------------
// @MainComponent - User Management Page
// ------------------------------------------------------------------------------------------

export default function UserManagementPage() {
  const account = useStoresAccount((stores) => stores.states.account)

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
                <Card>
                  <Flex justify="space-between" align="center" className="mb-6">
                    <Typography.Title level={4} style={{ margin: 0 }}>
                      User Management
                    </Typography.Title>
                    <Button type="primary" icon={<Plus size={16} />}>
                      Add User
                    </Button>
                  </Flex>

                  <Table
                    columns={columns}
                    dataSource={sampleData}
                    pagination={{
                      pageSize: 10,
                      showSizeChanger: true,
                      showTotal: (total) => `Total ${total} users`,
                    }}
                  />
                </Card>
              </Col>
            </Row>
          </Box>
        </Content>
      </App>
    </ProtectedPrivateProvider>
  )
}
