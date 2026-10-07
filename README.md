# Ciao Vietnam

A pocket guide for visitors. English and Vietnamese. Pages are built when the site is built. There is no login and no database.

Photos are already WebP files in `public/images`. The site does not ask Vercel to resize them.

Node 22 is pinned in `package.json` (`engines.node` is `22.x`) and in `.nvmrc`.

To try it on a computer that has Node 22:

```bash
npm ci
npm run dev
```

Then open the address the terminal prints.
