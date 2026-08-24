# Ringtoons — Simple Ringtone Website

Ek chota, halka Next.js project: admin ringtones upload karta hai, users category
ke hisab se sun kar download kar sakte hain. Koi database setup nahi — sirf
Vercel Blob Storage istemal hoti hai jo ek click mein enable ho jaati hai.

## Structure

```
app/
  page.js                 → homepage (categories)
  category/[slug]/page.js → ek category ke ringtones
  admin/page.js            → admin login + dashboard
  api/admin/...            → login, upload, delete routes
components/                → Header, Footer, RingtoneRow, AdminLogin, AdminDashboard
lib/
  data.js                  → Vercel Blob se read/write
  auth.js                  → admin cookie check
```

## GitHub + Vercel par deploy karna (bina code change kiye)

1. Ye poora folder ek naye GitHub repo mein push kar dein.
2. [vercel.com](https://vercel.com) par jaein → **Add New Project** → apna repo
   select karein → **Deploy** dabayein (framework khud "Next.js" detect ho
   jayega, koi setting badalne ki zaroorat nahi).
3. Deploy hone ke baad, Vercel project ke **Storage** tab mein jaein →
   **Create Database** → **Blob** select karein → project se connect kar dein.
   Isse `BLOB_READ_WRITE_TOKEN` khud-ba-khud environment variable mein add ho
   jayega.
4. Project ke **Settings → Environment Variables** mein ek naya variable add
   karein:
   - `ADMIN_PASSWORD` = koi bhi mazboot password jo sirf aap jaanein.
5. **Deployments** tab se latest deployment ko **Redeploy** kar dein (taake
   naye environment variables load ho jayein).

Bas — site live ho jayegi. `/admin` par jaake apna password daal kar ringtones
upload karna shuru kar dein.

## Local par chalana (optional)

```bash
npm install
cp .env.example .env.local   # phir ADMIN_PASSWORD aur BLOB_READ_WRITE_TOKEN bhar dein
npm run dev
```

`BLOB_READ_WRITE_TOKEN` local par lene ke liye Vercel dashboard → Storage →
Blob → `.env.local` tab se copy kar lein.

## Notes

- Har audio file max **15MB** honi chahiye (`lib` mein se limit change kar
  sakte hain: `app/api/admin/upload/route.js`).
- Categories khud-ba-khud ban jaati hain — jo bhi category name aap upload
  ke waqt likhenge, wahi homepage par card ban kar aa jayega.
- Design tokens (colors/fonts) `tailwind.config.js` aur `app/layout.js` mein
  hain agar look change karna ho.
