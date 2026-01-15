import React from 'react';

import { Header } from '@/widgets/layout-header';
import { FooterNav } from '@/widgets/layout-footer';
import { Sidebar } from '@/widgets/layout-sidebar';

import { Outlet } from 'react-router-dom';

export default function BaseLayout() {
  return (
    <div>
      <Header />
      <div>
        <Sidebar />
        <main>
          <Outlet />
        </main>
      </div>
      <FooterNav />
    </div>
  );
}
