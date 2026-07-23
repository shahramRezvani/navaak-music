# نواک 🎵 — اپ پخش موسیقی (Next.js + داده ماک)

یک اپ موسیقی تمیز و کاربرمحور با **Next.js 14 (App Router)**، **TypeScript**، **Tailwind CSS** و **Zustand**. کاملاً با داده‌های نمونه (mock) کار می‌کند و به هیچ API واقعی نیاز ندارد.

## امکانات
- 🔍 جستجوی آهنگ / آلبوم / آرتیست (لحظه‌ای)
- 📃 پلی‌لیست و صفحه آلبوم با «پخش همه»
- ▶️ پخش‌کننده با کنترل play / pause / next / prev و نوار پیشرفت
- ➕ صف پخش (افزودن آهنگ به صف)
- 🌙 حالت تاریک / روشن (ذخیره در localStorage)
- ↔️ رابط کاربری RTL فارسی با فونت وزیرمتن

> نکته: چون فایل صوتی واقعی وجود ندارد، پیشرفت پخش با یک تایمر **شبیه‌سازی** می‌شود تا کنترل‌ها و صف به‌صورت واقعی رفتار کنند.

## اجرا
```bash
npm install
npm run dev
```
سپس http://localhost:3000 را باز کن.

## ساخت نسخه پروداکشن
```bash
npm run build
npm start
```

## ساختار پروژه
```
app/
  layout.tsx            چیدمان اصلی (RTL، سایدبار، پلیر)
  page.tsx              صفحه خانه
  search/page.tsx       صفحه جستجو
  playlist/[id]/page.tsx صفحه پلی‌لیست
  album/[id]/page.tsx   صفحه آلبوم
components/
  Sidebar.tsx           ناوبری + تغییر تم
  SearchBar.tsx         جستجوی زنده
  Player.tsx            نوار پخش پایین صفحه
  PlaylistView.tsx      هدر + لیست آهنگ (مشترک آلبوم/پلی‌لیست)
  TrackList.tsx         لیست آهنگ‌ها
  ThemeInit.tsx         اعمال تم ذخیره‌شده
lib/
  types.ts              تایپ‌ها
  mock-data.ts          داده نمونه + توابع جستجو/کمکی
  player-store.ts       استور Zustand پلیر
  theme-store.ts        استور Zustand تم
```

## داده ماک
همه داده‌ها در `lib/mock-data.ts` هستند — آرتیست، آلبوم، آهنگ و پلی‌لیست. تصاویر از picsum.photos گرفته می‌شوند.
