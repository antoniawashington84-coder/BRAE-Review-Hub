# BRAE Review Hub

A static administrative interface for reviewing BRAE submissions stored in Google Sheets.

## Structure

- `index.html` — application shell and login screen
- `styles.css` — responsive BRAE interface styles
- `app.js` — live data views, review actions, and drag-and-drop catalog ordering
- `api.js` — Supabase authentication and Google Apps Script API connection
- `.openai/hosting.json` — Sites deployment identity

## Local development

Serve the project directory with any static web server. ES modules will not run correctly by opening `index.html` directly from the filesystem.

## Authentication integration

Supabase Auth handles email/password login. Apps Script validates every access token and checks the matching email and permissions in the workbook's `Users` tab.

## Google Apps Script integration

Google Form responses stay immutable. The hub reads and updates the separate operational tabs through the deployed Apps Script web API configured in `api.js`.

Apps Script must authenticate every request, enforce roles server-side, use locking for claims/order updates, and write audit records. CORS should allow only the deployed administrative origin.

## Production deployment

Run `npm run build` to create the static `dist` output. The prototype can be moved to GitHub and deployed on any conventional static host. A live system will also require the authenticated API layer and a CDN/object-storage workflow for approved covers.

## Public catalog architecture

Publishing should produce a small public JSON file containing only title, author, genre, cover URL, destination URL, and display order. Upload it and optimized covers to CDN-backed object storage. The Squarespace Code Block should load that static file; it must never query Google Sheets or the review API per visitor.
