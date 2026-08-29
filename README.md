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
  api/admin/...            → login, upload (server-proxied to Blob), delete
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

- Har audio file max **4MB** honi chahiye (limit `app/api/admin/upload/route.js`
  mein `MAX_SIZE` se change ho sakti hai). Upload admin ke apne server route
  se ho ker Blob storage tak jaata hai, is liye Vercel Functions ki ~4.5MB
  request-size limit yahan apply hoti hai — yehi wajah hai ke limit 4MB par
  rakhi gayi hai (thoda margin ke sath). Direct browser-to-Blob upload
  (jisse bade files bhi allow hote) filhaal Vercel ke apne ek platform-side
  CORS bug ki wajah se kaam nahi kar raha — jab Vercel usay fix kar dega,
  limit dobara barhayi ja sakti hai.
- Categories khud-ba-khud ban jaati hain — jo bhi category name aap upload
  ke waqt likhenge, wahi homepage par card ban kar aa jayega.
- Design tokens (colors/fonts) `tailwind.config.js` aur `app/layout.js` mein
  hain agar look change karna ho.
