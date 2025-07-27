# 💸 Finance App

Welcome to **Finance App** — a clean, modern personal finance manager that helps you track your money like a pro. Built with a focus on simplicity, responsiveness, and global accessibility, this app allows users to securely log in, manage transactions, switch between currencies, and use the interface in multiple languages.

🌐 **Live Demo**: [https://finance-app-ten-inky.vercel.app](https://finance-app-ten-inky.vercel.app)

---

## 🚀 Features

- 🔐 **Authentication** – Secure login/signup flow
- 📊 **Dashboard** – Overview of balance, income, expenses, and recent activity
- 💰 **Add Transactions** – Easily log income or expenses with categories
- 🔁 **Recurring Bills** – Automatically track fixed monthly or weekly bills
- 🎯 **Budgeting** – Set spending limits by category
- 🏦 **Savings Pots** – Create savings goals and move money into them
- 🌍 **Dynamic Currency Switching** – Change your default currency (₹, $, €, etc.)
- 🈯 **Language Switching** – Switch the app’s language for a more native experience
- 📱 **Responsive Design** – Optimized for both desktop and mobile
- ⚡ **Fast & Intuitive UX** – Smooth animations and real-time updates

---

## 🛠️ Tech Stack

| Layer        | Tech Used                      |
|--------------|-------------------------------|
| **Frontend** | Next.js / React                |
| **Styling**  | Tailwind CSS + shadcn/ui       |
| **Auth**     | Supabase (email/password)      |
| **Database** | Supabase PostgreSQL            |
| **State Mgmt**| React Query / Context API     |
| **i18n**     | next-i18next (or similar lib)  |
| **Deployment**| Vercel                         |

---

## 📦 Installation

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
npm install
```

Create a `.env.local` file in the root and add your environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXTAUTH_SECRET=your_auth_secret
NEXT_PUBLIC_BASE_CURRENCY=INR
```

Then run the app locally:

```bash
npm run dev
```

Visit: `http://localhost:3000/auth`

---

## 🌐 Deployment

- Hosted on **Vercel**
- Auto-deployment via GitHub integration
- Add all required environment variables in Vercel project settings

---

## 📊 Roadmap

- [ ] Weekly/monthly analytics charts
- [ ] Export/import CSV for bank statements
- [ ] Dark mode toggle
- [ ] Mobile PWA support
- [ ] Email notifications & reminders
- [ ] Budget threshold alerts

---

## 🤝 Contributing

Contributions are welcome!

1. Fork this repo
2. Create a new branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push to your branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**.  
Feel free to use it, remix it, and improve it — just give credit.

---

## 🙋‍♂️ About Me

Made with <3 by **Vartul Chanana**  
A CS student who builds cool stuff and likes being the center of attraction 😄  
https://vartul-visions.vercel.app/
