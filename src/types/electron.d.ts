export interface ElectronAPI {
  ipcRenderer: {
    send: (channel: string, data?: unknown) => void;
    on: (
      channel: string,
      listener: (event: Electron.IpcRendererEvent, ...args: unknown[]) => void
    ) => void;
    invoke: (channel: string, ...args: unknown[]) => Promise<unknown>;
    removeAllListeners: (channel: string) => void;
  };
  platform: NodeJS.Platform;
  isElectron: boolean;
}

declare global {
  interface Window {
    electron: ElectronAPI;
  }
}

