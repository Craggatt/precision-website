'use client';

import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import BorderGlow from './BorderGlow';
import { useQuoteStore } from '@/store/quoteStore';
import {
  Media,
  Product,
  ProductCategory,
  ProductSubcategory,
  Content,
  ContentCategory,
  ContentSubcategory,
  Project,
} from '@/payload-types';
import Link from 'next/link';
import Image from 'next/image';

const navItems = ['Products', 'Pulse', 'Projects', 'Content', 'Support', 'Customer Login'];

interface NavbarProps {
  ready: boolean;
  products: Product[];
  productCategories: ProductCategory[];
  content: Content[];
  contentCategories: ContentCategory[];
  projects: Project[];
  logoVariant?: 'default' | 'pulse';
}

export default function Navbar({
  ready,
  products,
  productCategories,
  content,
  contentCategories,
  projects,
  logoVariant = 'default',
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [productsHovered, setProductsHovered] = useState(false);
  const [contentHovered, setContentHovered] = useState(false);
  const [projectsHovered, setProjectsHovered] = useState(false);
  const [customerLoginHovered, setCustomerLoginHovered] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileContentOpen, setMobileContentOpen] = useState(false);
  const [mobileProjectsOpen, setMobileProjectsOpen] = useState(false);
  const [mobileCustomerLoginOpen, setMobileCustomerLoginOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const customerLoginRef = useRef<HTMLParagraphElement | null>(null);
  const { setOpen } = useQuoteStore();
  const isPulseLogo = logoVariant === 'pulse';

  const openMenu = (
    menuType: 'products' | 'content' | 'projects' | 'customerLogin'
  ) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setProductsHovered(menuType === 'products');
    setContentHovered(menuType === 'content');
    setProjectsHovered(menuType === 'projects');
    setCustomerLoginHovered(menuType === 'customerLogin');
  };

  const closeMenu = () => {
    closeTimer.current = setTimeout(() => {
      setProductsHovered(false);
      setContentHovered(false);
      setProjectsHovered(false);
      setCustomerLoginHovered(false);
    }, 100);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const productMenu = productCategories.map(cat => {
    const thumbnailImg = cat.thumbnail.value;
    const thumbnailUrl =
      typeof thumbnailImg === 'object'
        ? ((thumbnailImg as Media).url ?? null)
        : null;

    const catProducts = products.filter(p => {
      const c = p.category;
      return typeof c === 'object' ? c.id === cat.id : c === cat.id;
    });

    const subcategoryMap: Record<string, { name: string; slug: string }[]> = {};
    for (const product of catProducts) {
      const subs = product.subcategory;
      let subName = 'General';
      if (subs && subs.length > 0) {
        const first = subs[0];
        subName =
          typeof first === 'object'
            ? (first as ProductSubcategory).name
            : 'General';
      }
      if (!subcategoryMap[subName]) subcategoryMap[subName] = [];
      subcategoryMap[subName].push({ name: product.name, slug: product.slug });
    }

    const subcategories = Object.entries(subcategoryMap).map(
      ([name, items]) => ({
        name,
        items,
      })
    );

    return {
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      thumbnailUrl,
      subcategories,
    };
  });

  const contentMenu = contentCategories.map(cat => {
    const thumbnailImg = cat.thumbnail.value;
    const thumbnailUrl =
      typeof thumbnailImg === 'object'
        ? ((thumbnailImg as Media).url ?? null)
        : null;

    const catContent = content.filter(c => {
      const category = c.category;
      return typeof category === 'object'
        ? category.id === cat.id
        : category === cat.id;
    });

    const subcategoryMap: Record<string, { name: string; slug: string }[]> = {};
    for (const contentItem of catContent) {
      const subs = contentItem.subcategory;
      let subName = 'General';
      if (subs && subs.length > 0) {
        const first = subs[0];
        subName =
          typeof first === 'object'
            ? (first as ContentSubcategory).name
            : 'General';
      }
      if (!subcategoryMap[subName]) subcategoryMap[subName] = [];
      subcategoryMap[subName].push({
        name: contentItem.name,
        slug: contentItem.slug,
      });
    }

    const subcategories = Object.entries(subcategoryMap).map(
      ([name, items]) => ({
        name,
        items,
      })
    );

    return {
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      thumbnailUrl,
      subcategories,
    };
  });

  const projectMenu = projects.map(project => {
    const thumbnailImg = project.featuredImage?.value;
    const thumbnailUrl =
      typeof thumbnailImg === 'object'
        ? ((thumbnailImg as Media).url ?? null)
        : null;

    return {
      id: project.id,
      name: project.name,
      href: `/projects/${project.slug}`,
      thumbnailUrl,
    };
  });

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 backdrop-blur-md px-2.5 md:px-5 lg:px-10 ${
          scrolled ? 'bg-white/80 ' : 'bg-transparent border-b border-white/20'
        }`}
      >
        <div className="max-w-[1600px] mx-auto  flex items-center justify-between h-14 relative">
          <Link href="/" prefetch>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: ready ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Image
                src={isPulseLogo ? '/images/pulse/pulse.png' : '/logo.png'}
                alt={isPulseLogo ? 'Precision Pulse' : 'Precision Signs'}
                width={isPulseLogo ? 160 : 200}
                height={isPulseLogo ? 90 : 36}
                className={`${isPulseLogo ? 'h-11' : 'h-9'} w-auto object-contain transition-all duration-300 ${
                  scrolled ? '' : 'brightness-0 invert'
                }`}
              />
            </motion.div>
          </Link>
          <div className="hidden md:flex items-stretch gap-8">
            {navItems.map((item, i) => {
              const isLink =
                item === 'Support' ||
                item === 'Products' ||
                item === 'Pulse' ||
                item === 'Content';
              const href =
                item === 'Support'
                  ? '/service-support'
                  : item === 'Products'
                    ? '/products'
                    : item === 'Pulse'
                      ? '/pulse'
                      : item === 'Content'
                        ? '/content'
                        : undefined;

              const menuContent = (
                <motion.p
                  key={item}
                  ref={item === 'Customer Login' ? customerLoginRef : null}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: ready ? 1 : 0 }}
                  transition={{
                    delay: 0.15 + i * 0.06,
                    duration: 0.4,
                    ease: 'easeOut',
                  }}
                  className={`font-satoshi text-[0.85rem] font-semibold cursor-pointer transition-colors duration-300 flex items-center ${
                    scrolled
                      ? 'text-[#111111] hover:text-[#555555]'
                      : 'text-white hover:text-white/70'
                  }`}
                  onHoverStart={() => {
                    if (item === 'Products') openMenu('products');
                    if (item === 'Content') openMenu('content');
                    if (item === 'Projects') openMenu('projects');
                    if (item === 'Customer Login') openMenu('customerLogin');
                  }}
                  onHoverEnd={() => {
                    if (
                      item === 'Products' ||
                      item === 'Content' ||
                      item === 'Projects' ||
                      item === 'Customer Login'
                    )
                      closeMenu();
                  }}
                >
                  {item}
                </motion.p>
              );

              return isLink ? (
                <a key={item} href={href}>
                  {menuContent}
                </a>
              ) : (
                menuContent
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: ready ? 1 : 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="hidden md:flex items-center gap-3 h-full"
          >
            <a
              href="/contact"
              className={`font-satoshi text-[0.8rem] px-4 py-1.5 rounded-sm transition-colors duration-300 ${
                scrolled
                  ? 'text-[#111111] border border-[#111111]/20 hover:bg-gray-100'
                  : 'text-white border border-white/20 hover:text-white/70'
              }`}
            >
              Contact Us
            </a>
            <button
              className="font-satoshi text-[0.8rem] bg-brand-primary text-white px-4 py-1.5 rounded-sm hover:bg-[#2a2a2a] transition-colors font-medium"
              onClick={() => setOpen(true)}
            >
              Get a Quote
            </button>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: ready ? 1 : 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="md:hidden flex flex-col gap-1.5 w-6 h-6 justify-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block h-0.5 w-full transition-all duration-300 ${
                scrolled ? 'bg-[#111111]' : 'bg-white'
              } ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}
            />
            <span
              className={`block h-0.5 w-full transition-all duration-300 ${
                scrolled ? 'bg-[#111111]' : 'bg-white'
              } ${mobileMenuOpen ? 'opacity-0' : ''}`}
            />
            <span
              className={`block h-0.5 w-full transition-all duration-300 ${
                scrolled ? 'bg-[#111111]' : 'bg-white'
              } ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}
            />
          </motion.button>
        </div>
      </nav>
      <AnimatePresence>
        {productsHovered && (
          <motion.div
            className="w-full fixed top-14 left-0 z-50 px-10 h-screen backdrop-blur-lg"
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <BorderGlow
              backgroundColor="#171717"
              borderRadius={0}
              colors={['#0b6fd3', '#1a7fe3', '#0958a8']}
              glowColor="210 90 60"
              glowIntensity={1.2}
              glowRadius={30}
              edgeSensitivity={20}
              className="max-w-[1600px] mx-auto"
            >
              <div
                onMouseEnter={() => openMenu('products')}
                onMouseLeave={closeMenu}
              >
                <motion.div
                  className="flex flex-col w-full"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 40 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                >
                  <div className="flex flex-row w-full">
                    {[...productMenu].reverse().map(item => (
                      <a
                        href={`/products?cat=${encodeURIComponent(item.name)}`}
                        className="flex flex-col p-5 border-l border-l-neutral-700 flex-1 hover:bg-neutral-800/50 transition-colors"
                        key={item.id}
                      >
                        {item.thumbnailUrl && (
                          <img
                            src={item.thumbnailUrl}
                            alt={item.name}
                            className="w-28 h-20 object-contain"
                          />
                        )}
                        <h3 className="font-aller text-xl mt-2">{item.name}</h3>
                      </a>
                    ))}
                  </div>
                  <div className="flex flex-row w-full bg-neutral-800">
                    {[...productMenu].reverse().map(item => (
                      <div
                        key={item.id}
                        className="flex flex-col p-5 border-l border-l-neutral-700 flex-1 gap-6"
                      >
                        {[...item.subcategories].reverse().map(sub => (
                          <div key={sub.name} className="flex flex-col">
                            <h3 className="uppercase font-mono text-neutral-400 text-xs mb-2">
                              {sub.name}
                            </h3>
                            <div className="flex flex-col gap-1">
                              {[...sub.items].reverse().map(product => (
                                <a
                                  key={product.slug}
                                  href={`/products/${product.slug}`}
                                  className="font-aller text-neutral-300 text-sm hover:text-white transition-colors"
                                >
                                  {product.name}
                                </a>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </BorderGlow>
          </motion.div>
        )}
        {contentHovered && (
          <motion.div
            className="w-full fixed top-14 left-0 z-50 px-10 h-screen backdrop-blur-lg"
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <BorderGlow
              backgroundColor="#171717"
              borderRadius={0}
              colors={['#0b6fd3', '#1a7fe3', '#0958a8']}
              glowColor="210 90 60"
              glowIntensity={1.2}
              glowRadius={30}
              edgeSensitivity={20}
              className="max-w-[1600px] mx-auto"
            >
              <div
                onMouseEnter={() => openMenu('content')}
                onMouseLeave={closeMenu}
              >
                <motion.div
                  className="flex flex-col w-full"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 40 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                >
                  <div className="flex flex-row w-full">
                    {[...contentMenu].reverse().map(item => (
                      <a
                        href={`/content?cat=${encodeURIComponent(item.name)}`}
                        className="flex flex-col p-5 border-l border-l-neutral-700 flex-1 hover:bg-neutral-800/50 transition-colors"
                        key={item.id}
                      >
                        {item.thumbnailUrl && (
                          <img
                            src={item.thumbnailUrl}
                            alt={item.name}
                            className="w-28 h-20 object-contain"
                          />
                        )}
                        <h3 className="font-aller text-xl mt-2">{item.name}</h3>
                      </a>
                    ))}
                  </div>
                  <div className="flex flex-row w-full bg-neutral-800">
                    {[...contentMenu].reverse().map(item => (
                      <div
                        key={item.id}
                        className="flex flex-col p-5 border-l border-l-neutral-700 flex-1 gap-6"
                      >
                        {[...item.subcategories].reverse().map(sub => (
                          <div key={sub.name} className="flex flex-col">
                            <h3 className="uppercase font-mono text-neutral-400 text-xs mb-2">
                              {sub.name}
                            </h3>
                            <div className="flex flex-col gap-1">
                              {[...sub.items].reverse().map(contentItem => (
                                <a
                                  key={contentItem.slug}
                                  href={`/content/${contentItem.slug}`}
                                  className="font-aller text-neutral-300 text-sm hover:text-white transition-colors"
                                >
                                  {contentItem.name}
                                </a>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </BorderGlow>
          </motion.div>
        )}
        {projectsHovered && (
          <motion.div
            className="w-full fixed top-14 left-0 z-50 px-10 h-screen backdrop-blur-lg"
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <BorderGlow
              backgroundColor="#171717"
              borderRadius={0}
              colors={['#0b6fd3', '#1a7fe3', '#0958a8']}
              glowColor="210 90 60"
              glowIntensity={1.2}
              glowRadius={30}
              edgeSensitivity={20}
              className="max-w-[1600px] mx-auto"
            >
              <div
                onMouseEnter={() => openMenu('projects')}
                onMouseLeave={closeMenu}
              >
                <motion.div
                  className="flex flex-col w-full"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 40 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                >
                  <div className="flex flex-row w-full flex-wrap">
                    {[...projectMenu].reverse().map(project => (
                      <a
                        href={project.href}
                        className="flex flex-col p-5 border-l border-l-neutral-700 flex-1 min-w-[200px] hover:bg-neutral-800/50 transition-colors"
                        key={project.id}
                      >
                        {project.thumbnailUrl && (
                          <img
                            src={project.thumbnailUrl}
                            alt={project.name}
                            className="w-28 h-20 object-contain"
                          />
                        )}
                        <h3 className="font-aller text-xl mt-2">
                          {project.name}
                        </h3>
                      </a>
                    ))}
                  </div>
                </motion.div>
              </div>
            </BorderGlow>
          </motion.div>
        )}
        {customerLoginHovered && customerLoginRef.current && (
          <motion.div
            className="fixed z-50"
            style={{
              top: customerLoginRef.current.getBoundingClientRect().bottom + 8,
              left: customerLoginRef.current.getBoundingClientRect().left,
            }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            onMouseEnter={() => openMenu('customerLogin')}
            onMouseLeave={closeMenu}
          >
            <div
              className={`flex flex-col min-w-[200px] rounded-sm shadow-lg overflow-hidden ${
                scrolled
                  ? 'bg-white border border-gray-200'
                  : 'bg-neutral-900 border border-neutral-700'
              }`}
            >
              <a
                href="https://pixel.precisionsigns.com.au"
                target="_blank"
                rel="noopener noreferrer"
                className={`px-4 py-3 font-satoshi text-sm transition-colors ${
                  scrolled
                    ? 'text-[#111111] hover:bg-gray-100'
                    : 'text-white hover:bg-neutral-800'
                }`}
              >
                Precision Pixel
              </a>
              <a
                href="https://pulse.precisionsigns.com.au"
                target="_blank"
                rel="noopener noreferrer"
                className={`px-4 py-3 font-satoshi text-sm transition-colors ${
                  scrolled
                    ? 'text-[#111111] hover:bg-gray-100 border-t border-gray-200'
                    : 'text-white hover:bg-neutral-800 border-t border-neutral-700'
                }`}
              >
                Precision Pulse
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Sidebar */}
            <motion.div
              className="fixed top-0 right-0 h-full w-[280px] bg-neutral-900 z-50 md:hidden overflow-y-auto"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-neutral-700">
                  <span className="font-satoshi font-semibold text-white">
                    Menu
                  </span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-white hover:text-neutral-400 transition-colors"
                    aria-label="Close menu"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {/* Menu Items */}
                <div className="flex flex-col p-5 gap-1">
                  {/* Products */}
                  <div className="flex flex-col">
                    <button
                      onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                      className="flex items-center justify-between font-satoshi font-semibold text-white py-3 hover:text-neutral-400 transition-colors"
                    >
                      <span>Products</span>
                      <svg
                        className={`w-4 h-4 transition-transform ${mobileProductsOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    <AnimatePresence>
                      {mobileProductsOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-col gap-4 pl-4 py-2">
                            {productMenu.map(category => (
                              <div
                                key={category.id}
                                className="flex flex-col gap-2"
                              >
                                <a
                                  href={`/products?cat=${encodeURIComponent(category.name)}`}
                                  className="font-aller text-white font-semibold text-sm hover:text-blue-400 transition-colors"
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  {category.name}
                                </a>
                                {category.subcategories.map(sub => (
                                  <div
                                    key={sub.name}
                                    className="flex flex-col gap-1 pl-3"
                                  >
                                    <span className="uppercase font-mono text-neutral-500 text-xs">
                                      {sub.name}
                                    </span>
                                    {sub.items.map(product => (
                                      <a
                                        key={product.slug}
                                        href={`/products/${product.slug}`}
                                        className="font-aller text-neutral-400 text-xs hover:text-white transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                      >
                                        {product.name}
                                      </a>
                                    ))}
                                  </div>
                                ))}
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Pulse */}
                  <a
                    href="/pulse"
                    className="font-satoshi font-semibold text-white py-3 hover:text-neutral-400 transition-colors border-t border-neutral-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Pulse
                  </a>

                  {/* Projects */}
                  <div className="flex flex-col border-t border-neutral-700">
                    <button
                      onClick={() => setMobileProjectsOpen(!mobileProjectsOpen)}
                      className="flex items-center justify-between font-satoshi font-semibold text-white py-3 hover:text-neutral-400 transition-colors"
                    >
                      <span>Projects</span>
                      <svg
                        className={`w-4 h-4 transition-transform ${mobileProjectsOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    <AnimatePresence>
                      {mobileProjectsOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-col pl-4 py-2">
                            {projectMenu.map(project => (
                              <a
                                key={project.id}
                                href={project.href}
                                className="font-aller text-neutral-400 text-sm py-2 hover:text-white transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {project.name}
                              </a>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col border-t border-neutral-700">
                    <button
                      onClick={() => setMobileContentOpen(!mobileContentOpen)}
                      className="flex items-center justify-between font-satoshi font-semibold text-white py-3 hover:text-neutral-400 transition-colors"
                    >
                      <span>Content</span>
                      <svg
                        className={`w-4 h-4 transition-transform ${mobileContentOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    <AnimatePresence>
                      {mobileContentOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-col gap-4 pl-4 py-2">
                            {contentMenu.map(category => (
                              <div
                                key={category.id}
                                className="flex flex-col gap-2"
                              >
                                <a
                                  href={`/content?cat=${encodeURIComponent(category.name)}`}
                                  className="font-aller text-white font-semibold text-sm hover:text-blue-400 transition-colors"
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  {category.name}
                                </a>
                                {category.subcategories.map(sub => (
                                  <div
                                    key={sub.name}
                                    className="flex flex-col gap-1 pl-3"
                                  >
                                    <span className="uppercase font-mono text-neutral-500 text-xs">
                                      {sub.name}
                                    </span>
                                    {sub.items.map(contentItem => (
                                      <a
                                        key={contentItem.slug}
                                        href={`/content/${contentItem.slug}`}
                                        className="font-aller text-neutral-400 text-xs hover:text-white transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                      >
                                        {contentItem.name}
                                      </a>
                                    ))}
                                  </div>
                                ))}
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Custom */}
                  <a
                    href="/custom"
                    className="font-satoshi font-semibold text-white py-3 hover:text-neutral-400 transition-colors border-t border-neutral-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Custom
                  </a>

                  {/* Support */}
                  <a
                    href="/service-support"
                    className="font-satoshi font-semibold text-white py-3 hover:text-neutral-400 transition-colors border-t border-neutral-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Support
                  </a>

                  {/* Customer Login */}
                  <div className="flex flex-col border-t border-neutral-700">
                    <button
                      onClick={() =>
                        setMobileCustomerLoginOpen(!mobileCustomerLoginOpen)
                      }
                      className="flex items-center justify-between font-satoshi font-semibold text-white py-3 hover:text-neutral-400 transition-colors"
                    >
                      <span>Customer Login</span>
                      <svg
                        className={`w-4 h-4 transition-transform ${mobileCustomerLoginOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    <AnimatePresence>
                      {mobileCustomerLoginOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-col pl-4 py-2">
                            <a
                              href="https://pixel.precisionsigns.com.au"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-aller text-neutral-400 text-sm py-2 hover:text-white transition-colors"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              Precision Pixel
                            </a>
                            <a
                              href="https://pulse.precisionsigns.com.au"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-aller text-neutral-400 text-sm py-2 hover:text-white transition-colors"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              Precision Pulse
                            </a>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="mt-auto p-5 border-t border-neutral-700 flex flex-col gap-3">
                  <a
                    href="/contact"
                    className="font-satoshi text-sm text-white border border-white/20 px-4 py-2.5 rounded-sm text-center hover:bg-white/10 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Contact Us
                  </a>
                  <button
                    className="font-satoshi text-sm bg-brand-primary text-white px-4 py-2.5 rounded-sm hover:bg-[#2a2a2a] transition-colors font-medium"
                    onClick={() => {
                      setOpen(true);
                      setMobileMenuOpen(false);
                    }}
                  >
                    Get a Quote
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
