# Photography

**No photographs are vendored in this repo, and that is deliberate.**

Every image on Express properties is licensed stock or commissioned work that Express Employment International and its franchise subsidiaries hold rights to use. Those rights are theirs, not ours, and they do not extend to redistributing the files from a third-party repository. So this document describes the direction precisely enough to brief, select, or commission correctly, and points at where the approved images actually live.

If you need images for a piece of work, pull them from Express's own image library on expresspros.com.au, or request them from Marketing@ExpressPros.com. Do not lift them out of this repo, because they are not in it.

## The direction, in one line

Real people, doing the actual job, in the actual place, looking like they are good at it.

## Job representation photography

This is Express's own term and it is the whole photography system. Every image shows someone in their work environment, so the viewer can place the job at a glance without reading a word.

What makes a shot right:

- **The environment does the explaining.** A warehouse aisle, a reception desk, a workshop, a hospital corridor. The background is not wallpaper, it is the job description.
- **One or two people, mid-task.** Holding a clipboard, checking stock, at the counter. Not posed with folded arms in front of a white wall.
- **Direct eye contact or genuine focus on the work.** Both work. A staged laugh does not.
- **Range across the network.** Express recruits across Office Services, Light Industrial, Skilled Trades and Professional roles, and the photography has to show all four or the "any position, any industry" claim reads hollow.
- **Real diversity in age, gender, and background**, because the associate base is genuinely broad and the images should look like the people walking into an office.
- **Professional quality.** The brand guide is explicit that every image is high quality and professionally produced. No phone snaps in client-facing material.

Some environments are chosen to read as one specific job, others to suggest a wider category. Pick deliberately: a service page wants the specific one, a homepage hero wants the broad one.

## Photography by service line

Brief to the environment, not the emotion.

| Service line | What the image shows |
| --- | --- |
| Office Services | Reception desk, open-plan office, someone at a counter or on a headset |
| Light Industrial | Warehouse racking, pick-and-pack, forklift, loading dock, production line |
| Skilled Trades | Workshop, machine tool, plant room, someone with the actual equipment |
| Professional | Meeting room, one-on-one conversation, a desk that belongs to a person with a title |
| Franchise | An Express office exterior or interior, an owner in their own space |

## How photography is used

Express does not run photographs bare. Two treatments carry almost everything.

- **Hero photograph with a colour overlay.** The live site opens with a split hero: a job seeker panel under a blue overlay, an employer panel under a purple one. The overlay is what makes a stock photograph read as Express, and it is also what makes white headline type legible over it. `components/Hero.tsx` implements all three overlays.
- **Photograph beside a gradient field.** The brand guide's page layout runs one of the four gradients down an edge, with the photograph occupying the opposite block. The vibrant colour accentuates the work environment rather than competing with it.

## Rules

- **Never place white type on an un-overlaid photograph.** Contrast is not checkable against an image, so the overlay is a requirement, not a style.
- **Never place the logo on a photograph without an overlay behind it.** The brand guide bans logo placement on patterns and low-contrast grounds outright. Use the white lock-up over a dark overlay.
- **Never illustrate a job with a photograph of a different job.** The environment is the point.
- **Never use an image where someone appears to be struggling, failing, or unhappy at work.** Express sells hope through employment; the imagery has to hold that.
- **Attribute nothing that is not attributable.** If an image shows a real Express office or a real associate, you need their permission before it goes anywhere public.

## Composition order for a page

The rhythm Express's own pages use:

1. Open on the job or the problem, under a colour overlay.
2. Introduce the people, real Express faces, once the offer has been established.
3. Close on a metaphor or an environment shot, with the local-office ask over it.

Do not open a page on a team photograph. The reader has not been given a reason to care who they are yet.

## What is missing here, and what to ask for

If Express wants this repo to carry a real image library, these are the assets to request from Marketing:

- Team headshots for the 14 ANZ corporate team members in [team.md](./team.md), plus regional managers.
- Office exteriors and interiors for each ANZ location, which double as franchise proof.
- One licensed hero image per service line, cleared for our use, at 1920px wide and above.

When they arrive, ship each one as an AVIF master with a JPG fallback, kebab-cased and named for the job it represents, under `imagery/team/` and `imagery/editorial/by-service/<service>/`. Then replace this section with the real index.
