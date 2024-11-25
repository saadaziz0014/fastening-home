'use client'

import dynamic from 'next/dynamic'

const HandsontableWrapper = dynamic(() => import('@/app/components/Example'), {
    ssr: false,
})

export default function Page() {
    return <HandsontableWrapper />
}