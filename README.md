# fire

Wildfire land-management data platform. First feature: a treatment-deficit
map for Calaveras and Tuolumne counties, layering fuels, fire history, and
treatment records to show where fuel treatment hasn't kept pace with risk.

## Stack

- `apps/web` — Next.js (App Router) frontend, MapLibre GL for maps
- `apps/api` — FastAPI backend
- PostGIS — spatial database

Local dev runs on [DDEV](https://ddev.com) (Docker via Colima).

## Running locally

```
ddev start
```

- App: https://fire.ddev.site
- API: https://api.fire.ddev.site
- Postgres: `db:5432` inside the project network (user/pass `db`/`db`)

`ddev stop` to stop, `ddev describe` for full connection details.
