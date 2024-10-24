"use client";

import { usePathname } from 'next/navigation'
import Sidebar from './sidebar/Sidebar'

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  // List of paths where you don't want to display the sidebar
  const pathsWithoutSidebar = ['/landing', '/login', '/signup']; // Landing page, Login, and Signup

  return (
    <div className="flex flex-row">
      {/* Conditionally render the sidebar on all pages except the ones in pathsWithoutSidebar */}
      {!pathsWithoutSidebar.includes(pathname) && (
        <div>
          <Sidebar className='flex-1' />
        </div>
      )}
      <div className='w-full'>
        {children}
      </div>
    </div>
  )
}
