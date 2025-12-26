// ==========================================================================================
// @Types — Msw
// ==========================================================================================

export namespace TTypesMsw {
  export type JsonBodyType<TData = unknown> = {
    code: number
    message: string
  } & TData
}
