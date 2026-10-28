import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/layout/header';
import { Footer } from '../components/layout/footer';
import { ScrollToTop as ScrollToTopOnNavigate } from '../components/layout/scroll-to-top';
import { ScrollToTop as ScrollToTopButton } from '@/shared/ScrollToTop';

export const RootLayout: React.FC = () => {
  return (
    <>
      <ScrollToTopOnNavigate />
      <Header />
      <Outlet />
      <Footer />
      <ScrollToTopButton />
    </>
  );
};
