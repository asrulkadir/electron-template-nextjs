"use client"
import { notification } from "antd"
import type { NotificationInstance } from "antd/es/notification/interface"
import * as React from "react"

// ------------------------------------------------------------------------------------------
// Antd Notification Context
// ------------------------------------------------------------------------------------------

export const AntdNotificationContext = React.createContext<NotificationInstance>({} as NotificationInstance)

export function useAntdNotification() {
  const ctx = React.useContext(AntdNotificationContext)

  return ctx
}

// ------------------------------------------------------------------------------------------
// @MainComponent - Antd Notification Provider
// ------------------------------------------------------------------------------------------

type TAntdNotificationProviderProps = {
  children: React.ReactNode
}

export function AntdNotificationProvider({ children }: TAntdNotificationProviderProps) {
  const [api, contextHolder] = notification.useNotification()

  return (
    <AntdNotificationContext.Provider value={api}>
      <React.Fragment>{contextHolder}</React.Fragment>
      <React.Fragment>{children}</React.Fragment>
    </AntdNotificationContext.Provider>
  )
}
