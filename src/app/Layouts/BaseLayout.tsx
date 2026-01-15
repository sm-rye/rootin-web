import React from 'react';

import { Header } from '@/widgets/layout-header';
import { FooterNav } from '@/widgets/layout-footer';
import { Sidebar } from '@/widgets/layout-sidebar';

import { Outlet } from 'react-router-dom';

export default function BaseLayout() {
  return (
    <div className="flex flex-col min-h-screen ">
      <Header />
      <div className="flex-1 flex">
        <aside className="hidden md:block w-64 border-r">
          <Sidebar />
        </aside>
        <main>
          <Outlet />
        </main>
      </div>
      <footer className="block lg:hidden sticky bottom-0 z-50">
        <FooterNav />
      </footer>
    </div>
  );
}
