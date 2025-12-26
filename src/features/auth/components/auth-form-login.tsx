import { Button, Checkbox, Flex, Form, Input } from "antd"
import Link from "next/link"
import { useRouter } from "next/router"
import * as React from "react"
import { servicesAuth, useStoresAccount } from "@/features"
import { toolkitHttp } from "@/toolkits"
import { FormItemLabel } from "@/ui/components/form"

// ------------------------------------------------------------------------------------------
// @MainComponent — Auth Form Login
// ------------------------------------------------------------------------------------------

export type TFormValuesLogin = {
  email: string
  password: string
}

type TAuthFormLoginProps = {}

export function AuthFormLogin({ ...props }: TAuthFormLoginProps) {
  const router = useRouter()
  const authMutation = servicesAuth.useAuthMutations()
  const actionsStoresAccount = useStoresAccount((stores) => stores.actions)
  const [form] = Form.useForm<TFormValuesLogin>()
  const [isSubmitable, setIsSubmitable] = React.useState<boolean>(false)
  const requestLogin = authMutation.useAuthLogin({
    onSuccess: (response, payload) => {
      actionsStoresAccount.setAccount({
        id: response.token,
        email: payload.email,
        name: payload.email,
      })
      router.push("/dashboard")
    },
    onError: (error) => {
      const err = toolkitHttp.error(error)
      alert(err.response?.data.error)
    },
  })

  function handleLogin(values: TFormValuesLogin) {
    requestLogin.mutate(values)
  }

  React.useEffect(() => {
    form
      .validateFields({
        validateOnly: true,
      })
      .then(() => {
        setIsSubmitable(true)
      })
      .catch((error) => {
        if (error.errorFields.length) {
          setIsSubmitable(false)
        }
      })
  }, [form])

  return (
    <Form
      initialValues={{
        email: "eve.holt@reqres.in",
        password: "cityslicka",
      }}
      layout="vertical"
      form={form}
      onFinish={handleLogin}
      requiredMark={false}
      {...props}
    >
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your email.",
          },
        ]}
        label={<FormItemLabel required label="Email" />}
      >
        <Input placeholder="Input your email" size="large" />
      </Form.Item>

      <Form.Item
        rules={[
          {
            required: true,
            message: "Please input your password.",
          },
        ]}
        name="password"
        label={<FormItemLabel required label="Password" />}
      >
        <Input.Password placeholder="Input your password" size="large" />
      </Form.Item>

      <Flex className="mb-12" justify="space-between" align="center">
        <Form.Item className="m-0" valuePropName="checked" name="rememberMe">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item className="m-0">
          <Link href="/">
            <Button className="font-medium" type="text">
              Forgot password?
            </Button>
          </Link>
        </Form.Item>
      </Flex>

      <Form.Item>
        <Button
          disabled={!isSubmitable}
          loading={requestLogin.isPending}
          size="large"
          className="w-full"
          type="primary"
          htmlType="submit"
        >
          Login
        </Button>
      </Form.Item>
    </Form>
  )
}
