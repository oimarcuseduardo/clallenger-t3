import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode
}

const LayoutPage = (props: Props) => {
  return (
    <div className='flex min-h-screen flex-col items-center bg-gradient-to-b from-[#FFFFFF] to-[#E6E7FF] text-neutral-400'>
      {props.children}
    </div>
  )
}

export default LayoutPage