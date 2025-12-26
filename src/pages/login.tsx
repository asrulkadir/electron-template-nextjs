import { Flex, Typography } from "antd"
import Image from "next/image"
import { AuthFormLogin, useStoresAccount } from "@/features"
import { Col, Row } from "@/ui/components"
import { ProtectedGuestProvider } from "@/ui/providers"

// ------------------------------------------------------------------------------------------
// @MainComponent - Login Page
// ------------------------------------------------------------------------------------------

export default function LoginPage() {
  const account = useStoresAccount((stores) => stores.states.account)

  return (
    <ProtectedGuestProvider isAccountExist={Boolean(account)}>
      <main>
        <Row gutter={[0, 0]} className="p-12 min-h-screen">
          <Col>
            <Flex className="h-full" vertical justify="space-between">
              <Typography.Title level={2}>Electron App</Typography.Title>

              <Flex vertical gap={32}>
                <Typography.Title level={3}>Login</Typography.Title>
                <AuthFormLogin />
              </Flex>
            </Flex>
          </Col>

          <Col>
            <Flex justify="center" align="center" className="h-full">
              <Image
                src="/next.svg"
                alt="Next.js logo"
                width={300}
                height={300}
                priority
              />
            </Flex>
          </Col>
        </Row>
      </main>
    </ProtectedGuestProvider>
  )
}
