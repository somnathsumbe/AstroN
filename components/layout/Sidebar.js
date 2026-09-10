'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const menus = [
  {
    title: 'Lunar',
    items: [
      ['Amavasya', '/amavasya'],
      ['Purnima', '/purnima'],
    ],
  },
  {
    title: 'Bhadra',
    items: [
      ['Bhadra Kaal', '/bhadra-kaal'],
    ],
  },
  {
    title: 'Planetary',
    items: [
      ['Mangal Gochar', '/mangal-gochar'],
      ['March Equinox', '/march-equinox'],
      ['Panchak', '/panchak'],
      ['Pushya Nakshatra', '/pushya-nakshatra'],
      ['Shukra Gochar', '/shukra-gochar'],
      ['Sun-Jupiter Tracking', '/sun-jupiter-tracking'],
    ],
  },
  {
    title: 'Market Analysis',
    items: [
      ['Degree Calculator', '/degree-calculator'],
      ['Planet-Stock Mapping', '/planet-stock-mapping'],
      ['Jupiter Venus Tracking', '/jupiter-venus-tracking'],
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState(() => Object.fromEntries(menus.map((section) => [section.title, true])));

  useEffect(() => {
    const toggle = () => setOpen((current) => !current);
    window.addEventListener('astro:toggle-sidebar', toggle);
    return () => window.removeEventListener('astro:toggle-sidebar', toggle);
  }, []);

  if (pathname === '/login') return null;
  
  return (
    <aside className={`sidebar ${open ? 'is-open' : ''}`}>
      <nav aria-label="Main navigation" className="py-2 sidebar-menu is-expanded">
        <a href="/dashboard" className={`sidebar-link ${pathname === '/dashboard' ? 'active' : ''}`}><i className="bi bi-grid-1x2-fill" /> Dashboard</a>

        {menus.map((section) => (
          <div key={section.title}>
            <button className="sidebar-section-toggle" type="button" onClick={() => setExpandedSections((current) => ({ ...current, [section.title]: !current[section.title] }))} aria-expanded={expandedSections[section.title]}>
              <span>{section.title}</span><i className={`bi bi-chevron-${expandedSections[section.title] ? 'up' : 'down'}`} />
            </button>
            <div className={`sidebar-section-items ${expandedSections[section.title] ? 'is-expanded' : 'is-collapsed'}`}>
              {section.items.map(([label, href]) => (
                <a href={href} className={`sidebar-link ${pathname === href ? 'active' : ''}`} key={href}>{label}</a>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
