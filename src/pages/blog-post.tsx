import { Button, Card, Flex, List, Typography, Avatar, Space, Tag } from "antd"
import { Home, Plus, MessageCircle, Heart, Share2 } from "lucide-react"
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
          title: <Typography.Text>Blog Post</Typography.Text>,
          href: "/blog-post",
        },
      ]}
    />
  )
}

// ------------------------------------------------------------------------------------------
// Sample Data
// ------------------------------------------------------------------------------------------

interface BlogPost {
  id: string
  title: string
  excerpt: string
  author: {
    name: string
    avatar: string
  }
  tags: string[]
  likes: number
  comments: number
  publishedAt: string
}

const samplePosts: BlogPost[] = [
  {
    id: "1",
    title: "Getting Started with Electron and Next.js",
    excerpt: "Learn how to build cross-platform desktop applications using Electron with Next.js as the frontend framework. This guide covers the basic setup and configuration.",
    author: {
      name: "John Doe",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    },
    tags: ["Electron", "Next.js", "Tutorial"],
    likes: 42,
    comments: 8,
    publishedAt: "2024-01-15",
  },
  {
    id: "2",
    title: "State Management with Zustand",
    excerpt: "Explore the simplicity and power of Zustand for state management in React applications. Compare it with other solutions like Redux and MobX.",
    author: {
      name: "Jane Smith",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
    },
    tags: ["React", "Zustand", "State Management"],
    likes: 35,
    comments: 12,
    publishedAt: "2024-01-10",
  },
  {
    id: "3",
    title: "Building Beautiful UIs with Ant Design",
    excerpt: "A comprehensive guide to using Ant Design components effectively. Learn best practices and tips for creating professional-looking interfaces.",
    author: {
      name: "Alice Brown",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
    },
    tags: ["Ant Design", "UI/UX", "React"],
    likes: 28,
    comments: 5,
    publishedAt: "2024-01-05",
  },
  {
    id: "4",
    title: "TypeScript Best Practices in 2024",
    excerpt: "Stay up-to-date with the latest TypeScript features and best practices. This article covers type safety, generics, and advanced patterns.",
    author: {
      name: "Bob Wilson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
    },
    tags: ["TypeScript", "Best Practices"],
    likes: 56,
    comments: 15,
    publishedAt: "2024-01-01",
  },
]

// ------------------------------------------------------------------------------------------
// @MainComponent - Blog Post Page
// ------------------------------------------------------------------------------------------

export default function BlogPostPage() {
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
                <Flex justify="space-between" align="center">
                  <Typography.Title level={3}>Blog Posts</Typography.Title>
                  <Button type="primary" icon={<Plus size={16} />}>
                    Create Post
                  </Button>
                </Flex>
              </Col>

              <Col span={24}>
                <List
                  itemLayout="vertical"
                  size="large"
                  dataSource={samplePosts}
                  renderItem={(post) => (
                    <Card className="mb-4" hoverable>
                      <List.Item
                        key={post.id}
                        actions={[
                          <Space key="likes">
                            <Heart size={16} />
                            {post.likes}
                          </Space>,
                          <Space key="comments">
                            <MessageCircle size={16} />
                            {post.comments}
                          </Space>,
                          <Space key="share">
                            <Share2 size={16} />
                            Share
                          </Space>,
                        ]}
                      >
                        <List.Item.Meta
                          avatar={<Avatar src={post.author.avatar} />}
                          title={
                            <Typography.Title level={5} style={{ margin: 0 }}>
                              {post.title}
                            </Typography.Title>
                          }
                          description={
                            <Flex vertical gap={8}>
                              <Typography.Text type="secondary">
                                By {post.author.name} • {post.publishedAt}
                              </Typography.Text>
                              <Space>
                                {post.tags.map((tag) => (
                                  <Tag key={tag} color="blue">
                                    {tag}
                                  </Tag>
                                ))}
                              </Space>
                            </Flex>
                          }
                        />
                        <Typography.Paragraph>{post.excerpt}</Typography.Paragraph>
                      </List.Item>
                    </Card>
                  )}
                />
              </Col>
            </Row>
          </Box>
        </Content>
      </App>
    </ProtectedPrivateProvider>
  )
}
