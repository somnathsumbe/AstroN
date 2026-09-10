'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { getEventStatus, getIndianDateKey } from '@/lib/notification-manager';

const CATEGORIES = ['All Categories', 'Lunar & Calendar', 'Bhadra', 'Planetary Analysis'];
const STATUS_ORDER = { TODAY: 0, UPCOMING: 1, EXPIRED: 2 };

function displayDate(value) {
  const [year, month, day] = String(value).slice(0, 10).split('-').map(Number);
  if (!year || !month || !day) return value;
  return new Intl.DateTimeFormat('en-IN', { day: '2-digit', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(Date.UTC(year, month - 1, day)));
}

function displayDay(value) {
  const [year, month, day] = String(value).slice(0, 10).split('-').map(Number);
  if (!year || !month || !day) return '';
  return new Intl.DateTimeFormat('en-IN', { weekday: 'long', timeZone: 'UTC' }).format(new Date(Date.UTC(year, month - 1, day)));
}

function daysUntil(value, now) {
  const current = getIndianDateKey(now).split('-').map(Number);
  const target = String(value).slice(0, 10).split('-').map(Number);
  const difference = Date.UTC(target[0], target[1] - 1, target[2]) - Date.UTC(current[0], current[1] - 1, current[2]);
  return Math.max(0, Math.round(difference / 86400000));
}

function statusLabel(status) {
  return status === 'EXPIRED' ? 'PASSED' : status;
}

function EventCard({ event, now }) {
  const status = getEventStatus(event, now);
  return <article className={`dashboard-event-card status-${status.toLowerCase()}`}><div className="dashboard-event-card-top"><span className="dashboard-event-icon"><i className={`bi ${event.icon}`} /></span><span className={`dashboard-event-status status-badge ${status === 'TODAY' ? 'today-status' : status === 'UPCOMING' ? 'trading-status' : 'passed-status'}`}>{statusLabel(status)}</span></div><span className="dashboard-event-category">{event.category}</span><h3>{event.title}</h3><strong className="dashboard-event-date">{displayDate(event.eventDate)}</strong><span className="dashboard-event-day">{displayDay(event.eventDate)}{event.startTime ? ` · ${event.startTime}` : ''}</span>{event.description && <p>{event.description}</p>}<Link href={event.route} className="dashboard-event-link">View Details <i className="bi bi-arrow-up-right" /></Link></article>;
}

export default function AstroEventOverview({ events, now }) {
  const [statusFilter, setStatusFilter] = useState('UPCOMING');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [showAll, setShowAll] = useState(false);

  const normalizedEvents = useMemo(() => events.map((event) => ({ ...event, status: getEventStatus(event, now) })), [events, now]);
  const todayEvents = normalizedEvents.filter((event) => event.status === 'TODAY');
  const nextEvent = normalizedEvents.filter((event) => event.status === 'UPCOMING').sort((a, b) => a.eventDate.localeCompare(b.eventDate))[0] || null;
  const visibleEvents = useMemo(() => normalizedEvents.filter((event) => (statusFilter === 'ALL' || event.status === statusFilter) && (categoryFilter === 'All Categories' || event.category === categoryFilter)).sort((a, b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status] || a.eventDate.localeCompare(b.eventDate)), [categoryFilter, normalizedEvents, statusFilter]);
  const cards = showAll || statusFilter !== 'UPCOMING' ? visibleEvents : visibleEvents.slice(0, 6);

  return <section className="astro-overview-section" aria-labelledby="astro-overview-title">
    <div className="astro-section-heading"><div><span className="eyebrow">EVENT MONITOR / PRIORITIZED FEED</span><h2 id="astro-overview-title"><i className="bi bi-bell" /> Astro Events &amp; Notifications</h2></div><span className="astro-date-label">{todayEvents.length} today · {normalizedEvents.filter((event) => event.status === 'UPCOMING').length} upcoming</span></div>
    <section className="astro-next-event" aria-labelledby="next-astro-event-title">{nextEvent ? <><div><span className="eyebrow">NEXT ASTRO EVENT</span><h3 id="next-astro-event-title"><i className={`bi ${nextEvent.icon}`} /> {nextEvent.title}</h3><p>{displayDate(nextEvent.eventDate)} · {displayDay(nextEvent.eventDate)}{nextEvent.startTime ? ` · ${nextEvent.startTime}` : ''}</p></div><div className="astro-next-count"><strong>{daysUntil(nextEvent.eventDate, now) === 0 ? 'Today' : daysUntil(nextEvent.eventDate, now) === 1 ? 'Tomorrow' : `In ${daysUntil(nextEvent.eventDate, now)} days`}</strong><span>until event</span></div><Link href={nextEvent.route} className="outline-action">View Details <i className="bi bi-arrow-up-right" /></Link></> : <p className="mb-0">No upcoming Astro event available.</p>}</section>
    <div className="astro-overview-filters"><div className="btn-group" role="group" aria-label="Filter event status">{[['ALL', 'All'], ['TODAY', 'Today'], ['UPCOMING', 'Upcoming'], ['EXPIRED', 'Passed']].map(([value, label]) => <button type="button" className={`subtle-action ${statusFilter === value ? 'active-action' : ''}`} key={value} onClick={() => { setStatusFilter(value); setShowAll(false); }}>{label}</button>)}</div><label className="astro-category-filter"><span className="visually-hidden">Filter by category</span><select value={categoryFilter} onChange={(event) => { setCategoryFilter(event.target.value); setShowAll(false); }} aria-label="Filter by event category">{CATEGORIES.map((category) => <option key={category}>{category}</option>)}</select></label></div>
    {cards.length ? <div className="row g-3">{cards.map((event) => <div className="col-12 col-sm-6 col-lg-4 col-xl-3" key={event.id}><EventCard event={event} now={now} /></div>)}</div> : <div className="astro-empty-state"><i className="bi bi-calendar2-check" /><strong>No Astro Events Available</strong><span>There are no events available for the selected period.</span></div>}
    {visibleEvents.length > 6 && statusFilter === 'UPCOMING' && <button type="button" className="subtle-action overview-more-button" onClick={() => setShowAll((current) => !current)}>{showAll ? 'Show Fewer Events' : 'View All Events'} <i className={`bi bi-chevron-${showAll ? 'up' : 'down'}`} /></button>}
  </section>;
}
