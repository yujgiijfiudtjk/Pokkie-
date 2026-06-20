═══════════════════════════════════════════════════════════
💖 3D LOVE GROUP INTRO — 🔥 FIREBASE EDITION (Online)
═══════════════════════════════════════════════════════════

📂 ফাইলগুলো:
   ├── index.html          ← মূল ইন্ট্রো পেজ (যেটা সবাই দেখবে)
   ├── admin.html          ← এডমিন প্যানেল (Firebase এ সেভ করে)
   ├── firebase-config.js  ← 🔥 Firebase connection (নতুন)
   ├── script.js           ← সব animation + member rendering
   ├── style.css           ← স্টাইল
   ├── music.mp3           ← ব্যাকগ্রাউন্ড মিউজিক
   └── README.txt          ← এই ফাইল

───────────────────────────────────────────────────────────
🆕 কী পরিবর্তন হয়েছে (localStorage → Firebase):
───────────────────────────────────────────────────────────

✅ এখন data Firebase Realtime Database এ সেভ হয়
✅ যেকোনো ডিভাইস/ব্রাউজার থেকে একই data দেখা যায়
✅ Admin একবার change করলে সাথে সাথে সবার পেজে আপডেট হয় (real-time)
✅ Browser cache clear করলেও data যায় না
✅ কোনো server বা backend আলাদা চালাতে হয় না — Firebase ফ্রি

───────────────────────────────────────────────────────────
🔥 Firebase Project Info:
───────────────────────────────────────────────────────────

   Project ID    : mysmm-bd
   Database URL  : https://mysmm-bd-default-rtdb.firebaseio.com
   Data path     : /3dlove_config

───────────────────────────────────────────────────────────
🚀 যেভাবে চালাবেন:
───────────────────────────────────────────────────────────

⚠️ গুরুত্বপূর্ণ: Firebase SDK ব্রাউজারে ES modules দিয়ে load হয়।
   এজন্য সরাসরি file:// দিয়ে double-click করে চালালে কাজ নাও করতে
   পারে। নিচের যে কোন একটা পদ্ধতি ব্যবহার করুন:

   ✅ পদ্ধতি ১: Local Web Server (testing এর জন্য)
      ১. Folder এ গিয়ে terminal খুলুন
      ২. Python থাকলে চালান:
            python -m http.server 8080
         অথবা Node থাকলে:
            npx serve .
      ৩. ব্রাউজারে যান: http://localhost:8080/admin.html

   ✅ পদ্ধতি ২: অনলাইনে আপলোড (সবচেয়ে ভালো — recommended)
      নিচের যেকোনো ফ্রি hosting এ সব ফাইল আপলোড করুন:
         • netlify.com         → Drag & drop, instant URL
         • vercel.com          → Github এর সাথে integrate
         • firebase hosting    → firebase deploy
         • github pages        → github.com থেকে
         • cloudflare pages    → Fast, free

      আপলোডের পর:
         মূল পেজ:    https://yoursite.com/index.html
         এডমিন:      https://yoursite.com/admin.html

───────────────────────────────────────────────────────────
🔒 Firebase Database Rules (গুরুত্বপূর্ণ!):
───────────────────────────────────────────────────────────

Firebase Console এ গিয়ে Realtime Database → Rules এ এই rules
সেট করুন (যেহেতু auth ব্যবহার করছি না):

  {
    "rules": {
      "3dlove_config": {
        ".read": true,
        ".write": true
      }
    }
  }

⚠️ সতর্কতা: এই rules সবার জন্য read/write খোলা। যদি চান
   শুধু admin সেভ করতে পারবে, তাহলে Firebase Authentication
   বা admin password protection যোগ করতে হবে।

   👉 আপনি যদি future এ admin panel এ password lock দিতে
      চান, আমাকে বলবেন — admin.html এ password gate যোগ
      করে দিব।

───────────────────────────────────────────────────────────
👨‍💼 Admin Panel ব্যবহার:
───────────────────────────────────────────────────────────

১. admin.html ব্রাউজারে খুলুন
২. উপরে দেখবেন: "🟢 Firebase Connected" — মানে কানেকশন OK
৩. গ্রুপের নাম, ট্যাগলাইন, লোগো URL বসান
৪. প্রতিটা মেম্বারের নাম এবং ছবির URL বসান
৫. নতুন মেম্বার যোগ করতে "＋ নতুন মেম্বার যোগ করুন"
৬. মেম্বার ডিলিট করতে 🗑️ আইকনে ক্লিক করুন
৭. সব ঠিকঠাক করে "☁️ Save to Firebase" বাটনে ক্লিক করুন
৮. "👁️ Preview" দিয়ে কেমন দেখাচ্ছে দেখুন

───────────────────────────────────────────────────────────
🖼️ ছবি কোথায় হোস্ট করবেন (ফ্রি):
───────────────────────────────────────────────────────────

১. imgbb.com         — সবচেয়ে সহজ, ১০-২০ MB পর্যন্ত
২. postimages.org    — Direct link দেয়
৩. ibb.co            — Bangladesh এ fast
৪. cloudinary.com    — Professional level
৫. imgur.com         — জনপ্রিয়

⚠️ গুরুত্বপূর্ণ:
   • ছবির URL সবসময় "https://..." দিয়ে শুরু হতে হবে
   • Direct image link দিতে হবে (page link না)
   • URL টা ".jpg", ".png", ".webp" তে শেষ হলে best

───────────────────────────────────────────────────────────
⌨️ Shortcut Keys (Admin panel এ):
───────────────────────────────────────────────────────────

   Ctrl + S    →  Save to Firebase

───────────────────────────────────────────────────────────
🆘 সমস্যা হলে:
───────────────────────────────────────────────────────────

❓ "Firebase Connecting..." দেখাচ্ছে, কানেক্ট হচ্ছে না
   → Internet check করুন
   → Firebase Console এ গিয়ে Database rules ঠিক আছে দেখুন
   → Browser console (F12) এ error দেখুন

❓ "Save করছি কিন্তু সবার পেজে দেখা যাচ্ছে না"
   → Index.html refresh করুন
   → Browser console এ Firebase error আছে কিনা দেখুন
   → Database rules এ ".write": true আছে কিনা দেখুন

❓ "Module না পারে এমন error"
   → File:// দিয়ে চালালে এমন হয় — local server দিয়ে চালান
   → অথবা সরাসরি Netlify/Vercel এ আপলোড করে চালান

❓ "ছবি দেখা যাচ্ছে না"
   → URL টা ব্রাউজারে আলাদা করে খুলে দেখুন, ছবি load হচ্ছে কিনা
   → Direct image link কিনা চেক করুন

═══════════════════════════════════════════════════════════
Made with 💖 — Now powered by 🔥 Firebase!
═══════════════════════════════════════════════════════════
