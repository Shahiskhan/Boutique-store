<div align="center">

# Elegance Boutique

### A polished boutique shopping experience, from storefront to order management.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-7-CA4245?logo=reactrouter&logoColor=white)
![Status](https://img.shields.io/badge/status-learning%20%2F%20portfolio-gold)

**Learning project · Portfolio project · Customer storefront + admin portal**

[🌐 View the live store](https://boutique-store-tau.vercel.app/)

[Features](#-features) · [Setup](#-installation--setup) · [Demo accounts](#-demo-credentials) · [Roadmap](#-roadmap)

</div>

> **Version note:** This README reflects the dependency versions currently declared in `package.json` (React 19, Vite 8, and React Router DOM 7). These differ from the originally planned React 18, Vite 5, and React Router 6 versions.

## 📖 Overview

Elegance Boutique is a responsive fashion e-commerce learning project with a customer-facing storefront and a role-protected admin area. Visitors can browse a catalog of 200+ sample products, save items, build a cart, and place and track demo orders. Administrators can manage products and update order statuses.

The application uses React Context for shared state and browser `localStorage` for demo persistence. Product, account, and order data are currently client-side demo data; there is no production backend or payment processor.

## 📸 Screenshots

### Storefront preview

![Elegance Boutique storefront](https://github.com/Shahiskhan/Boutique-store/blob/main/public/boutique-store.png?raw=true)

Additional screenshots can be added to `docs/screenshots/`:

| Page | Preview |
| --- | --- |
| Storefront | Add `docs/screenshots/storefront.png` |
| Product catalog | Add `docs/screenshots/shop.png` |
| Shopping cart | Add `docs/screenshots/cart.png` |
| Admin dashboard | Add `docs/screenshots/admin-dashboard.png` |
| Product management | Add `docs/screenshots/admin-products.png` |

## ✨ Features

### Customer storefront

| Feature | Description |
| --- | --- |
| Product discovery | Browse 200+ generated sample products across clothing, bags, accessories, and footwear |
| Search and filters | Search by product name or category and filter by category |
| Product presentation | Product cards show ratings, badges, and sale pricing when available |
| Shopping cart | Add items, change quantities, and remove items |
| Wishlist | Save products for later |
| Demo authentication | Sign in with the supplied customer demo account |
| Welcome offer | Apply a 10% first-order coupon in the demo checkout |
| Checkout | Enter shipping details and select Cash on Delivery or demo card payment |
| Order confirmation | Place demo orders and view the confirmation page |
| Order tracking | View order status and its timeline |
| Order history | Review previous orders |

> **Registration note:** A sign-up link is displayed on the login screen, but a registration route/page is not currently implemented.

### Admin portal

| Feature | Description |
| --- | --- |
| Protected admin area | Admin-role users can access `/admin`; customers are redirected away |
| Dashboard | View product count, order count, pending orders, and revenue |
| Product management | Add, edit, search, and delete catalog products |
| Order management | Review orders, customer and delivery details, and status history |
| Status updates | Update orders through Pending, Processing, Shipped, Delivered, and Cancelled |

> Customer analytics are not currently shown on the dashboard. Online card checkout is a UI/demo flow only; it does not process real payments.

## 🧰 Tech stack

The versions below are the package ranges declared in the current project manifest.

| Area | Technology | Declared version |
| --- | --- | --- |
| UI | React | `^19.2.8` |
| DOM renderer | React DOM | `^19.2.8` |
| Build tool / dev server | Vite | `^8.3.0` |
| Styling | Tailwind CSS | `^4.3.3` |
| Tailwind integration | `@tailwindcss/vite` | `^4.3.3` |
| Routing | React Router DOM | `^7.18.4` |
| Icons | React Icons | `^5.7.0` |
| Shared state | React Context API | Built in |
| Persistence | Browser `localStorage` | Browser API |

### Design

- **Palette:** warm gold, cream, and brown tones.
- **Typography:** Playfair Display for serif headings and Inter for sans-serif text.
- **Interactions:** transitions, hover states, and responsive interactive components.
- **Layouts:** designed to adapt to mobile, tablet, and desktop screens.

## 🗂️ Project structure

```text
src/
├── admin/                  # Protected admin portal
│   ├── components/         # Sidebar, stat cards, product form
│   └── pages/              # Dashboard, product and order management
├── assets/                 # Images, video, and static assets
├── components/             # Shared/customer-facing UI components
├── context/                # Auth, cart, wishlist, order, and product contexts
├── data/                   # Generated demo products and categories
├── pages/                  # Customer storefront pages
├── App.jsx                 # Customer and admin route definitions
├── App.css                 # Application styles
├── index.css               # Tailwind import and theme tokens
└── main.jsx                # React entry point and context providers
```

## 🚀 Installation & setup

### Prerequisites

- Node.js and npm
- Git (optional, for cloning the repository)

### Run locally

```bash
# Clone the repository if you have its Git URL
git clone <repository-url>
cd boutique-store

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

## 🔐 Demo credentials

| Role | Email | Password |
| --- | --- | --- |
| Customer | `ayesha@example.com` | `123456` |
| Admin | `admin@boutique.com` | `admin123` |

These credentials are for local demonstration only. Authentication uses client-side sample users and is **not suitable for production**.

## 📜 Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local Vite development server |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the project |

## 🎨 Theme customization

The global Tailwind import and design tokens are defined in [`src/index.css`](src/index.css). Edit the theme variables there to adjust the boutique palette, fonts, spacing, shadows, and animation timings.

The current visual system uses:

- Gold and cream as the primary boutique colors, with brown/charcoal text.
- Playfair Display for headings and Inter for body text.
- Tailwind utility classes for responsive layouts and component styling.

## 🧠 Context API architecture

Five providers are composed in `src/main.jsx` and expose shared state through custom hooks:

| Context | Hook | Responsibility |
| --- | --- | --- |
| `AuthContext` | `useAuth` | Demo user session, role, login/logout, and welcome coupon state |
| `CartContext` | `useCart` | Cart items, quantity changes, and totals |
| `WishlistContext` | `useWishlist` | Saved products and wishlist actions |
| `OrderContext` | `useOrders` | Place orders, customer order history, and status changes |
| `ProductContext` | `useProducts` | Product catalog CRUD and categories |

The contexts persist demo state in `localStorage`, so it can remain in the same browser between visits. Clearing site storage resets that data. This client-side persistence is not a substitute for server-side storage or access control.

## 🧭 Routes

### Customer routes

| Path | Page |
| --- | --- |
| `/` | Home |
| `/shop` | Product catalog, search, category filter, and sorting |
| `/collections` | Collections |
| `/about` | About |
| `/contact` | Contact |
| `/cart` | Shopping cart |
| `/wishlist` | Wishlist |
| `/login` | Login |
| `/checkout` | Checkout |
| `/order-success` | Order confirmation |
| `/order-success/:orderId` | Order-specific confirmation |
| `/orders` | Order history |
| `/orders/:orderId` | Customer order details and tracking |

### Admin routes

All admin routes require a signed-in user with the `admin` role.

| Path | Page |
| --- | --- |
| `/admin` | Dashboard |
| `/admin/products` | Product list and management |
| `/admin/products/new` | Add product |
| `/admin/products/:productId/edit` | Edit product |
| `/admin/orders` | Order list |
| `/admin/orders/:orderId` | Order detail and status management |

## 🛣️ Roadmap

- [ ] Implement a real registration flow and customer account management.
- [ ] Add a backend API and database for users, products, and orders.
- [ ] Replace demo authentication with secure server-side authentication and authorization.
- [ ] Integrate a payment provider and server-side payment verification.
- [ ] Add inventory tracking and product image uploads.
- [ ] Add customer analytics and reporting to the admin dashboard.
- [ ] Add automated tests and improve lint coverage.
- [ ] Add real project screenshots to this README.

## 🤝 Contributing

Contributions, bug reports, and suggestions are welcome.

1. Fork the repository and create a focused branch.
2. Make your changes and keep the scope clear.
3. Run `npm run build` and `npm run lint` before opening a pull request.
4. Describe the change and include screenshots for user-facing updates where possible.

For larger changes, open an issue first to discuss the proposed approach.

## 📄 License

No license is currently specified for this project. Unless the repository owner adds a license, all rights are reserved; please ask the owner before reusing or distributing the code.

## 👤 Author & contact

**Author:** Project owner / maintainer  
**Contact:** Add your preferred email, portfolio, or social profile here.

## 🙏 Acknowledgments

- [React](https://react.dev/) and [Vite](https://vite.dev/) for the UI and development tooling.
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling.
- [React Router](https://reactrouter.com/) for client-side routing.
- [React Icons](https://react-icons.github.io/react-icons/) for the icon library.
- [Unsplash](https://unsplash.com/) for the product imagery URLs used in the demo catalog.

---

<div align="center">

**If you find this project useful, please ⭐ star the repository!**

*Last updated: 2026-10-08*

</div>
