# Assets

Every image the site shows lives in this folder. Naming rule:

```
<type>-<section>-<subject>.<ext>      e.g. img-project-panditstudio.jpg
```

| File | Where it appears |
|---|---|
| `images/profile/img-profile-portrait.jpg` | Home hero photo, About page photo, AI chat |
| `images/projects/img-project-panditstudio.jpg` | Pandit Studio card (Home "Selected work", Work page) |
| `images/projects/img-project-0xstudio.jpg` | 0xStudio card |
| `images/brand/img-brand-mark.png` | AI chat avatar |
| `images/brand/img-legacy-hero-bg.png` | Old hero background (unused, safe to delete) |

Files served by URL (not imported) live in `/public`:

| File | Purpose |
|---|---|
| `public/resume-fullstack.pdf` | Full-stack resume (Resume page download) |
| `public/resume-video-editing.pdf` | Video-editing resume |
| `public/og-image.jpg` | 1200×630 social share preview |
| `public/favicon.png` | Browser tab icon |

**To swap an image:** replace the file keeping the exact same name. To add a new one, follow the naming rule and import it in `src/content/site.ts`.

Tech-stack logos are not stored here — they load from `cdn.simpleicons.org/<slug>` (set the `slug` in `STACK` inside `src/content/site.ts`).
