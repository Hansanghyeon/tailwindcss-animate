import { pipe } from 'fp-ts/function'
import * as A from 'fp-ts/Array'
import { Toast, useToast } from './components/toast'
import { Button } from './components/ui/button'
import { useCallback } from 'react'

function Banner() {
  return   <div className="inline-block">
  <div
    className={
      'flex gap-x-[8px] rounded-full text-[#fff] relative overflow-hidden bg-[#0B0C0ED9] items-center pl-[20px] pr-[24px] py-[8px]'
    }
  >
      <div className="semantic-p16 whitespace-nowrap">토스트</div>
      <Toast.Action asChild altText="Goto schedule to undo"><button type="button" className='border-none p-0 w-auto h-auto'>X</button></Toast.Action>
  </div>
</div>
}
function App() {
  const { toasts, toast } = useToast()
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

  const onMidleCenterClick = useCallback(() => {
    toast({
      id: 'bulk',
      variant: 'clear',
      duration: 100000,
      position: 'bottom-center',
      modalOver: true,
      component: (
        <Banner />
      ),
    })
  }, [])

  return (
    <>
    <div className='grid grid-cols-3 grid-rows-3 leading-none gap-2'>
      <div>
        <Button className='p-0 w-[24px] h-[24px]' />
      </div>
      <div>
        <Button className='p-0 w-[24px] h-[24px]' />
      </div>
      <div>
        <Button className='p-0 w-[24px] h-[24px]' />
      </div>
      <div>
        <Button className='p-0 w-[24px] h-[24px]' />
      </div>
      <div>
        <Button className='p-0 w-[24px] h-[24px]' />
      </div>
      <div>
        <Button className='p-0 w-[24px] h-[24px]' />
      </div>
      <div>
        <Button className='p-0 w-[24px] h-[24px]' />
      </div>
      <div>
        <Button onClick={onMidleCenterClick} className='p-0 w-[24px] h-[24px]' />
      </div>
      <div>
        <Button className='p-0 w-[24px] h-[24px]' />
      </div>
    </div>
      <Toast.Provider swipeDirection="right" >
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

export default App
