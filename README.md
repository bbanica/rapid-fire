# Rapid Fire

A mobile-friendly design voting tool. Upload designs, share a link, get ranked results back.

---

## How to Create a Poll (Step by Step)

### Step 1: Create a folder for your poll

Inside the `polls` folder, create a new folder. Name it something simple with dashes (no spaces):

```
polls/
└── time-off-cards/      ← create this folder
```

### Step 2: Drop your images in

Put all your design images in that folder:

```
polls/
└── time-off-cards/
    ├── version-a.png
    ├── version-b.png
    ├── version-c.png
    └── version-d.png
```

Any image format works: PNG, JPG, SVG, GIF, WebP.

### Step 3: Edit manifest.json

Open `polls/manifest.json` in any text editor. It looks like this:

```json
{
  "polls": [
    {
      "id": "time-off-cards",
      "name": "Time Off Request Cards",
      "thumbnail": "./polls/time-off-cards/version-a.png",
      "images": [
        "./polls/time-off-cards/version-a.png",
        "./polls/time-off-cards/version-b.png",
        "./polls/time-off-cards/version-c.png",
        "./polls/time-off-cards/version-d.png"
      ]
    }
  ]
}
```

**What each field means:**

| Field | What it is |
|-------|-----------|
| `id` | Must match your folder name exactly |
| `name` | The title your boss sees (can have spaces) |
| `thumbnail` | Path to the preview image shown in the library |
| `images` | List of all images to vote on |

**Important:** Every path starts with `./polls/` then your folder name, then the filename.

### Step 4: Add more polls (optional)

To add multiple polls, separate them with commas:

```json
{
  "polls": [
    {
      "id": "time-off-cards",
      "name": "Time Off Request Cards",
      "thumbnail": "./polls/time-off-cards/version-a.png",
      "images": [
        "./polls/time-off-cards/version-a.png",
        "./polls/time-off-cards/version-b.png"
      ]
    },
    {
      "id": "dashboard-icons",
      "name": "Dashboard Icon Options",
      "thumbnail": "./polls/dashboard-icons/icon-1.png",
      "images": [
        "./polls/dashboard-icons/icon-1.png",
        "./polls/dashboard-icons/icon-2.png",
        "./polls/dashboard-icons/icon-3.png"
      ]
    }
  ]
}
```

### Step 5: Deploy to GitHub Pages

1. Create a new repo on GitHub (or use an existing one)
2. Upload all the files (index.html, polls folder, etc.)
3. Go to **Settings** → **Pages**
4. Under "Source", select **main** branch and **/ (root)**
5. Click Save
6. Wait ~1 minute, then your site is live at: `https://YOUR-USERNAME.github.io/REPO-NAME/`

### Step 6: Share with your boss

Send her the link. She'll:
1. Tap your poll
2. Swipe right to keep, left to pass
3. Go through multiple rounds
4. Copy the results link and text it back to you

---

## Common Mistakes

**"My images don't show up"**
- Check that the paths in manifest.json match your actual file names exactly (case-sensitive)
- Make sure paths start with `./polls/`

**"JSON error" or blank page**
- You probably have a typo in manifest.json
- Check for missing commas between polls
- Check for missing quotes around strings
- Use a JSON validator: https://jsonlint.com

**"Poll shows 0 designs"**
- The `images` array is empty or paths are wrong

**Local server shows "No Polls Yet" but GitHub Pages works**
- Make sure your URL has a trailing slash: `http://localhost:3000/rapid-fire/` not `http://localhost:3000/rapid-fire`
- Or run your server directly from inside the rapid-fire folder: `cd rapid-fire && npx serve .`
- GitHub Pages handles this automatically, so it's only a local dev issue

---

## Quick Reference

Your folder structure should look like:

```
rapid-fire/
├── index.html
├── polls/
│   ├── manifest.json
│   └── your-poll-name/
│       ├── design-1.png
│       ├── design-2.png
│       └── design-3.png
```

And manifest.json should look like:

```json
{
  "polls": [
    {
      "id": "your-poll-name",
      "name": "Your Poll Name",
      "thumbnail": "./polls/your-poll-name/design-1.png",
      "images": [
        "./polls/your-poll-name/design-1.png",
        "./polls/your-poll-name/design-2.png",
        "./polls/your-poll-name/design-3.png"
      ]
    }
  ]
}
```

That's it. No build step, no dependencies, just static files.
