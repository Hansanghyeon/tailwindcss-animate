import { pipe } from 'fp-ts/function'
import * as A from 'fp-ts/Array'
import React from 'react'
import {
  type ToastRootProps,
  type ToastPositionType,
  type ToastActionElement,
} from './toast'

const TOAST_LIMIT = 10000
const TOAST_REMOVE_DELAY = 1000

export type ToasterToast = ToastRootProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
  position?: ToastPositionType
  component?: React.ReactNode
}

const ACTION_TYPES = {
  ADD_TOAST: 'ADD_TOAST',
  UPDATE_TOAST: 'UPDATE_TOAST',
  DISMISS_TOAST: 'DISMISS_TOAST',
  REMOVE_TOAST: 'REMOVE_TOAST',
} as const

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_VALUE
  return count.toString()
}

type ActionType = typeof ACTION_TYPES

type Action =
  | {
      type: ActionType['ADD_TOAST']
      toast: ToasterToast
    }
  | {
      type: ActionType['UPDATE_TOAST']
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType['DISMISS_TOAST']
      toastId?: ToasterToast['id']
    }
  | {
      type: ActionType['REMOVE_TOAST']
      toastId?: ToasterToast['id']
    }

interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    // eslint-disable-next-line no-use-before-define
    dispatch({
      type: 'REMOVE_TOAST',
      toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case 'UPDATE_TOAST':
      return {
        ...state,
        toasts: state.toasts.map((t) => {
          if (t.id === action.toast.id) {
            return { ...t, ...action.toast }
          }
          return t
        }),
      }

    case 'DISMISS_TOAST':
      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (action.toastId) {
        addToRemoveQueue(action.toastId)
      } else {
        // eslint-disable-next-line no-shadow
        state.toasts.forEach((_toast) => {
          addToRemoveQueue(_toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) => {
          if (t.id === action.toastId || action.toastId === undefined) {
            return {
              ...t,
              open: false,
            }
          }
          return t
        }),
      }
    case 'REMOVE_TOAST':
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
    default:
      return state
  }
}

const listeners: Array<(state: State) => void> = []

let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  // eslint-disable-next-line no-console
  // console.log(action)
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

// ToasterToast에서 id를 제외하고 Toast에 전달

type Toast = Omit<ToasterToast, 'id'>

// toast 함수 실행 부분

function toast({
  ...props
}: Toast & {
  id?: string
}) {
  const id = props.id || genId()
  // eslint-disable-next-line no-shadow
  const update = (_props: ToasterToast) =>
    dispatch({
      type: 'UPDATE_TOAST',
      toast: { ..._props, id },
    })
  const dismiss = () => dispatch({ type: 'DISMISS_TOAST', toastId: id })

  dispatch({
    type: 'ADD_TOAST',
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open: boolean) => {
        if (!open) {
          dismiss()
        }
      },
    },
  })

  return {
    id,
    dismiss,
    update,
  }
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    toasts: pipe(
      state,
      (e) => e.toasts,
      // 같은ID 를 가진 토스트는 제거
      A.reduce([], (acc: ToasterToast[], cur) => {
        const isExist = acc.some((r) => r.id === cur.id)
        return isExist ? acc : [...acc, cur]
      })
    ),
    toast,
    dismiss: (toastId?: string) => dispatch({ type: 'DISMISS_TOAST', toastId }),
  }
}

export { useToast, reducer as toastReducer }
