# Daily Tracker starter project

This is a polished mobile-first starter for your weight loss tracker.

## Included pages

- `index.html` - profile picker with Chloe and Isa starter profiles
- `dashboard.html` - home glance page
- `entry.html` - add meals, weights, and workouts
- `calendar.html` - click a date and view that day
- `progress.html` - trends and summary
- `settings.html` - goals, reminders, theme, and adding more profiles

## Built-in starter profiles

- Chloe / 5629
- Isa / 2525

## What it tracks

- meals and calories
- optional protein, carbs, fats, and notes
- weight on any date
- multiple workouts per day
- calories burned and workout minutes
- calories left based on daily target
- reminder banner when weight is overdue
- browser notification request button
- light and dark themes inspired by your palette images

## Before Firebase is configured

The app works in local-only mode first, so you can open it immediately and test the layout.

## Turn on Firebase later

1. Create a Firebase project.
2. Enable Firestore.
3. Enable Firebase Hosting.
4. Copy your web app config into `js/firebase-config.js`.
5. Change `enabled: false` to `enabled: true`.
6. Install Firebase CLI.
7. In this folder, run:

```bash
firebase login
firebase init hosting firestore
firebase deploy
```

## Firestore rules included

This project includes `firestore.rules` already.

### Important honesty note

Because you asked for a profile-name picker with a 4-digit PIN and no real account login, Firestore cannot strongly protect private data. The included rules are a **starter rule set** so you do not get blocked during setup, but they are **not secure for sensitive private data**.

If you ever want true privacy later, the next upgrade is:

- keep the same profile-picker design on screen
- add Firebase Authentication underneath
- replace the open starter rules with user-based rules

## Suggested next improvement

After you get this live, the best next step is adding:

- edit/delete buttons on every saved meal and workout row
- charts on the progress page
- app icons for home screen install
- stronger authentication
