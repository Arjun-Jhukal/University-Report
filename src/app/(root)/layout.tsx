import Link from 'next/link'
import React from 'react'

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <header className='bg-white shadow-md py-4'>
                <div className="container">
                    <div className="flex justify-between items-center">
                        <Link href="/" className='text-[36px] font-[900]'>University <span className='text-secondary'>Report</span></Link>
                        <Link href="/" className='btn-primary'>Request University & Faculty</Link>
                    </div>
                </div>
            </header>
            {children}
            <footer>
                <div className="container">
                    <div className="text-center py-4">
                        <p className='text-[14px] mb-0'>© {new Date().getFullYear()}
                            &nbsp;   University Report. All rights reserved.</p>
                    </div>
                </div>
            </footer>

        </>
    )
}
