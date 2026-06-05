# Rennes School of Business App Prototype

A responsive campus app prototype built with React and Vite. The project simulates a Rennes School of Business digital experience for students, professors, and staff, with role-based dashboards, schedules, notifications, services, settings, and a PWA install flow.

This is a front-end prototype only. Login, schedules, notifications, and profile data are simulated locally for demonstration purposes.

## Features

- Responsive mobile and desktop layouts
- Role-based prototype login for Student, Professor, and Staff
- Naima sample profile for a pre-filled student experience
- Guest preview mode
- Dashboard with role-specific welcome text, news, events, and next schedule bubbles
- Calendar with day, week, and month views
- Custom schedule creation, editing, color coding, deletion, and clear-all actions
- Role-specific schedule labels:
  - Students: courses
  - Professors: classes
  - Staff: tasks
- Studies / Teachings / Department section based on user role
- Help center with expandable support areas and request flow
- Campus map and school services pages
- Notification center with unread and urgent states
- Settings with profile, contact, policies, install app, about prototype, and demo reset sections
- PWA configuration for installable app behavior

## Demo Login

The app uses simulated login rules. No real university authentication is connected.

Available access modes:

- Student: any email ending with `@student.rennes-sb.com`
- Professor: any email ending with `@professor.rennes-sb.com`
- Staff: any email ending with `@staff.rennes-sb.com`
- Naima sample: pre-built sample student profile
- Guest preview: limited preview experience

The password field is visual only for the prototype.

## PWA Install Notes

The app is configured as a Progressive Web App.

- On Chrome / Edge desktop and Android, the install button can trigger the browser install prompt when the browser marks the PWA as eligible.
- On iPhone and iPad, Safari does not allow websites to trigger one-tap PWA installation. Users must use Safari's Share menu, then choose `Add to Home Screen`.

## Tech Stack

- React
- Vite
- React Router
- vite-plugin-pwa
- ESLint

## Getting Started

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Run linting:

```bash
npm run lint
```

## Local Phone Testing

To test on a phone connected to the same Wi-Fi network:

```bash
npm run dev -- --host 0.0.0.0
```

Then open the network URL printed by Vite on the phone, for example:

```text
http://192.168.x.x:5173
```

For PWA install testing, use the deployed HTTPS version rather than localhost.

## Project Structure

```text
src/
  components/       Reusable layout, icon, and schedule form components
  pages/            App screens such as dashboard, calendar, settings, help, news
  utils/            Role, calendar, and schedule helper logic
public/images/      App logos, avatars, and visual assets
```

## Prototype Scope

This project is intended for demonstration and presentation. It does not include:

- Real backend authentication
- Real university account validation
- Database persistence
- Live Rennes School of Business data feeds
- Real notification delivery

Data is stored in the browser using local storage where needed.

## Deployment

The project can be deployed on Vercel or any static hosting platform that supports Vite builds.

Recommended build command:

```bash
npm run build
```

Recommended output directory:

```text
dist
```
