# Trackingly

A habit tracker and to-do list, with charts that show your progress and cloud sync between your phone and laptop.

**Live app:** https://trackingly.netlify.app

## Features

- **To-do list** — add, edit, tick and delete daily tasks
- **Task progress pie chart** — see completed vs. total at a glance (e.g. 4 of 5 done)
- **Habit tracker** — track yes/no habits (e.g. "Meditate") or number habits with a daily goal (e.g. "15,000 steps")
- **Habit progress pie chart** — how many of today's habits are done
- **Streaks** — a 🔥 counter for consecutive days a habit is completed
- **Weekly view** — a 7-day grid showing which habits were done each day
- **Line graph** — for number habits, plots each day's entry over the last 14 days against the goal
- **History** — past days' tasks are saved and browsable
- **Cloud sync** — sign in and your data follows you across devices, powered by Supabase
- **Installable (PWA)** — add it to your phone's home screen and it works offline
- **Backup** — export/import your data as a JSON file

## Tech stack

- Plain HTML, CSS and JavaScript — no framework, no build step
- Canvas API for the pie charts and line graph
- Supabase (Postgres + Auth) for accounts and cross-device sync
- Row Level Security so each user can only read and write their own data
- A service worker + Web App Manifest for offline support and installability
- Hosted on Netlify, deployed from GitHub

## Running it yourself

1. Clone this repo.
2. Create a free project at [supabase.com](https://supabase.com).
3. In the Supabase SQL editor, run:
   ```sql
   create table tracker_data (
     user_id uuid primary key references auth.users(id) on delete cascade,
     data jsonb not null,
     updated_at timestamptz default now()
   );
   alter table tracker_data enable row level security;
   create policy "own row" on tracker_data for all
     using (auth.uid() = user_id) with check (auth.uid() = user_id);
   ```
4. In `index.html`, set `SUPABASE_URL` and `SUPABASE_KEY` to your project's URL and anon/publishable key (Project Settings → API).
5. Deploy `index.html`, `manifest.json`, `sw.js`, `icon-192.png` and `icon-512.png` to any static host (Netlify, Vercel, GitHub Pages).

## Roadmap

- Custom domain
- App icon and branding polish
- Reminders/notifications
