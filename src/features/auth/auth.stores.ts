import { create, type StateCreator } from "zustand"
import { persist } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"

// @synapsis-codegen-template //

// ==========================================================================================
// @Stores — Account
// ==========================================================================================

export namespace TUseStoresAccount {
  export type States = {
    account: null | {
      id: string
      name: string
      email: string
    }
  }

  export type Actions = {
    setAccount: (account: TUseStoresAccount.States["account"]) => void
    resetAccount: VoidFunction
  }
  export type Stores = {
    states: States
    actions: Actions
  }
}

// ------------------------------------------------------------------------------------------
// @States — Account
// ------------------------------------------------------------------------------------------

const StatesAccount: TUseStoresAccount.States = {
  account: null,
}

// ------------------------------------------------------------------------------------------
// @Hook — Account
// ------------------------------------------------------------------------------------------

const storesAccount: StateCreator<
  TUseStoresAccount.Stores,
  [["zustand/immer", never]],
  [],
  TUseStoresAccount.Stores
> = (set) => ({
  states: {
    account: StatesAccount.account,
  },
  actions: {
    setAccount: (account) => {
      set((state) => {
        state.states.account = account
      })
    },
    resetAccount: () => {
      set((state) => {
        state.states.account = StatesAccount.account
      })
    },
  },
})

export const useStoresAccount = create<TUseStoresAccount.Stores>()(
  persist(immer(storesAccount), {
    name: "auth-account",
    merge: (persistedState, currentState) => {
      /**
       * @Note
       * The initial value of store should be `undefined` to prevent FOUC.
       * And then we can fill the store with the persisted state or the current state if exists.
       * If the persisted state is not available, we can use `null` for the last fallback.
       */
      const initialPersistedStores = persistedState as Partial<TUseStoresAccount.Stores>
      const account = initialPersistedStores.states?.account || currentState.states.account || null

      return {
        states: { account },
        actions: currentState.actions,
      }
    },
  }),
)
