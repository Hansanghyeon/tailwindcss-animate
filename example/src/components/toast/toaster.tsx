import { pipe } from 'fp-ts/function'
import * as A from 'fp-ts/Array'
import { Toast } from './'
import { useToast } from './use-toast'

export function Toaster() {
  const { toasts } = useToast()
  const topLeft = pipe(
    toasts,
    A.filter((toast) => toast.position === 'top-left')
  )
  const topCenter = pipe(
    toasts,
    A.filter((toast) => toast.position === 'top-center')
  )
  const topRight = pipe(
    toasts,
    A.filter((toast) => toast.position === 'top-right')
  )
  const bottomLeft = pipe(
    toasts,
    A.filter((toast) => toast.position === 'bottom-left')
  )
  const bottomCenter = pipe(
    toasts,
    A.filter((toast) => toast.position === 'bottom-center')
  )
  const bottomRight = pipe(
    toasts,
    A.filter((toast) => toast.position === 'bottom-right')
  )
  const middleLeft = pipe(
    toasts,
    A.filter((toast) => toast.position === 'middle-left')
  )
  // const middleCenter = pipe(
  //   toasts,
  //   A.filter((toast) => toast.position === 'middle-center')
  // )
  const middleRight = pipe(
    toasts,
    A.filter((toast) => toast.position === 'middle-right')
  )

  return (
    <>
      <Toast.Provider swipeDirection="right">
        {pipe(
          [topRight, middleRight, bottomRight],
          A.flatten,
          A.map((toast) => (
            <Toast.Root key={toast.id} {...toast} position={toast.position}>
              {toast.component}
            </Toast.Root>
          ))
        )}
        <Toast.Viewport />
      </Toast.Provider>
      <Toast.Provider swipeDirection="left">
        {pipe(
          [topLeft, middleLeft, bottomLeft],
          A.flatten,
          A.map((toast) => (
            <Toast.Root key={toast.id} {...toast} position={toast.position}>
              {toast.component}
            </Toast.Root>
          ))
        )}
        <Toast.Viewport />
      </Toast.Provider>
      <Toast.Provider swipeDirection="up">
        {pipe(
          [topCenter],
          A.flatten,
          A.map((toast) => (
            <Toast.Root key={toast.id} {...toast} position={toast.position}>
              {toast.component}
            </Toast.Root>
          ))
        )}
        <Toast.Viewport />
      </Toast.Provider>
      <Toast.Provider swipeDirection="down">
        {pipe(
          [bottomCenter],
          A.flatten,
          A.map((toast) => (
            <Toast.Root key={toast.id} {...toast} position={toast.position}>
              {toast.component}
            </Toast.Root>
          ))
        )}
        <Toast.Viewport />
      </Toast.Provider>
    </>
  )
}
