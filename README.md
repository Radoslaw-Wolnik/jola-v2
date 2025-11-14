# Psychologist Website for Jolanta Dominiak-Konderak

This is a professional one-page portfolio and business website developed for **Jolanta Dominiak-Konderak**, a licensed psychologist. The site is intended **solely for commercial use by the client** and is shared here **only with the owner's permission for educational and portfolio purposes**.

For more details, see [License](#-license-and-usage) and the included `License`.

---

## 🧠 About the Project

This is a **clean, responsive, and minimalist single-page website**, structured into distinct sections navigated via internal links.

The site was developed with a **modular approach**, where each section (e.g. `HeroSection`, `ServicesSection`, `ContactSection`) is treated as a self-contained component.

---

## 🛠️ Stack

* [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
* [Vite](https://vitejs.dev/)
* [Tailwind CSS](https://tailwindcss.com/)

---

## 💡 Highlights & Notes

This project marks several personal firsts and learning experiences:

* 🔹 **First project using Tailwind CSS in React**:
  The experience was positive overall, although setting up Tailwind v4.1 presented some challenges due to outdated tutorials. Notably, the newer **"CSS-first" approach** (no `tailwind.config.ts`) meant managing styles in `index.css` directly.

* 🔹 **Responsive design** with Tailwind's breakpoint utilities (e.g. `text-lg sm:text-xl lg:text-2xl`) was intuitive and enjoyable—much easier than using traditional `@media` queries.

* 🔹 **Basic SEO implementation**:
  Meta tags such as `description`, Open Graph, and Twitter cards are added to `index.html`. A `<script type="application/ld+json">` block is also included to improve Google search preview (structured data for rich results).

* 🔹 **Strict TypeScript configuration** (`tsconfig.json`) enforces strong typing and clean code, which made deployment easier by reducing runtime and build-time errors.

> 💬 *Note:* In earlier projects with relaxed rules, deployment (especially to [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/)) became problematic due to issues like unused imports and inconsistent typing. This stricter setup helps avoid those headaches.

---

## 🚀 Deployment

To run the project locally:

```bash
git clone https://github.com/Radoslaw-Wolnik/jola-psycholog-react.git
cd jola-psycholog-react
npm install
npm run dev
```

> ⚠️ Please **do not use this project** for commercial purposes or without explicit authorization.

---

## 📄 License and Usage

This website was developed by [Radosław Wolnik](https://github.com/Radoslaw-Wolnik) as a commissioned project for **Jolanta Dominiak-Konderak**, a licensed psychologist.

* 🔒 **Not for commercial reuse.**
* 👨‍💻 **Educational and portfolio use only.**
* ✅ You may review or reference the code for learning purposes.

Please respect the ownership rights of the client.