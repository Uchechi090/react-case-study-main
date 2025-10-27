````markdown
# Senior Frontend Developer - Take-Home Challenge

## 🎯 Overview

Welcome to the ProductsUp take-home challenge! This exercise is designed to evaluate your React architecture skills, Tailwind CSS proficiency, and ability to build scalable, maintainable features.

**Time Allocation:** 3-4 hours

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd react-takehome-case

# Install dependencies
npm install

# Start development server
npm run dev
```
````

The app will be available at `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📋 Challenge Requirements

### 1. Sorting Functionality ✅

Enhance the Products table with sorting capabilities:

- [ ] Add sorting by **Product Name** (A-Z, Z-A)
- [ ] Add sorting by **Price** (Low to High, High to Low)
- [ ] Make column headers clickable with visual indicators (arrows/icons)
- [ ] Ensure sorting works seamlessly with the existing category filter
- [ ] Maintain sort state when switching between categories

**Bonus:** Consider multi-column sorting or using lucide-react icons for visual feedback

---

### 2. Pagination 📄

Implement client-side pagination for the product list:

- [ ] Display **10 products per page**
- [ ] Add Previous/Next navigation buttons
- [ ] Show page numbers with current page highlighted
- [ ] Display items range (e.g., "Showing 1-10 of 15 products")
- [ ] Reset to page 1 when filters or sorting changes
- [ ] Structure code to allow easy transition to **server-side pagination** later

**Architecture Note:** Consider creating a reusable `usePagination` hook

---

### 3. Responsive Layout 📱

Make the product table responsive across all devices:

- [ ] **Desktop (1024px+)**: Full table layout (current implementation)
- [ ] **Tablet (768px-1023px)**: Optimized table with adjusted spacing
- [ ] **Mobile (<768px)**: Convert to **card or grid layout**
- [ ] Maintain all functionality (filter, sort, pagination) across breakpoints
- [ ] Ensure touch-friendly tap targets on mobile

**Tailwind Tip:** Use responsive utilities like `hidden`, `block`, `md:table`, `grid`, etc.

---

## 💎 Evaluation Criteria

Your submission will be evaluated on:

### Code Quality (30%)

- Clean, readable component structure
- Proper separation of concerns
- Consistent naming conventions
- Well-organized file structure

### Scalability (25%)

- Easy to extend and maintain
- Reusable components and hooks
- Future-proof architecture
- Clear abstractions

### Performance (20%)

- Efficient rendering patterns
- Proper React optimization (useMemo, useCallback if needed)
- Consideration for large datasets
- Minimal unnecessary re-renders

### UI/UX Polish (25%)

- Thoughtful Tailwind class usage
- Smooth transitions and interactions
- Accessible markup (semantic HTML, ARIA labels)
- Intuitive user experience

---

## 🌟 Bonus Points (Optional)

Impress us with:

- ⭐ **Custom Hooks** - Extract reusable logic (e.g., `usePagination`, `useSort`, `useFilter`)
- ⭐ **TypeScript** - Add types/interfaces for better type safety
- ⭐ **Loading States** - Implement skeleton screens or loading indicators
- ⭐ **Accessibility** - Keyboard navigation, screen reader support
- ⭐ **Animations** - Subtle transitions using Tailwind or CSS
- ⭐ **Error Boundaries** - Graceful error handling
- ⭐ **URL State** - Persist filter/sort/page state in URL params

---

## 📁 Project Structure

```
src/
├── App.jsx              # Main application component
├── main.jsx             # Application entry point
├── index.css            # Tailwind imports
└── components/          # (You may create this)
    ├── Header.jsx
    ├── Sidebar.jsx
    ├── Footer.jsx
    ├── ProductsPage.jsx
    └── ...
```

**Note:** Feel free to restructure as you see fit. We want to see YOUR architectural decisions.

---

## 🛠️ Tech Stack

- **React 19** - UI framework
- **Tailwind CSS v4** - Styling (using @tailwindcss/vite)
- **Vite** - Build tool
- **Lucide React** - Icon library (optional)
- **React Router** - Available if needed (currently using state-based routing)

---

## 📝 Submission Guidelines

### What to Submit

1. **GitHub Repository**

   - Push your completed code to a public GitHub repo
   - Include this README with any updates/notes

2. **README Updates** (Add a section below)

   - Document your architectural decisions
   - Explain any trade-offs you made
   - List what you'd improve with more time
   - Note any assumptions you made

3. **Code Comments**
   - Add comments for complex logic
   - Explain non-obvious decisions

### Example README Section to Add:

```markdown
## 🏗️ My Implementation Notes

### Architecture Decisions

- reated four specialized hooks (`usePagination`, `useSort`, `useUrlState`, `useProductsData`) following the Single Responsibility Principle. Each hook handles one concern, making them independently testable and reusable.
- Implemented bidirectional URL state binding for sort, filter, and pagination parameters. This would enable shareable/bookmarkable URLs and maintains state during browser back/forward navigation
- Organized components by feature with co-located tests (e.g., `Pagination/Pagination.tsx` + `Pagination.test.tsx`) rather than by type. This makes features easier to locate and refactor as atomic units.

### Trade-offs

- Implemented client-side pagination given the current dataset size (~20 products). However, the architecture is designed for easy migration to server-side - the `usePagination` hook can remain unchanged while moving the slicing logic to an API call.
- Implemented single-select dropdown instead of multi-select checkboxes to meet core requirements within time constraints. Multi-select would require `Set` state management and more complex URL serialization.
- Category filter and sort respond immediately without debouncing since operations are in-memory. I would add 300ms debounce if search or network requests were involved.
- Wrote unit tests focusing on hook logic and component behavior rather than integration tests. I prioritized testing the business logic over UI interactions to maximize ROI within time constraints.

### What I'd Improve

- **Virtual Scrolling**: Add `react-window` or `@tanstack/react-virtual` for datasets >1000 items. This would render only visible rows, keeping DOM nodes constant regardless of list size.
- **Search Functionality**: Add debounced search input (300ms delay) filtering across name, category, and description fields, while integrating it into the `useProductsData` hook and sync with URL params.
- **Enhanced Error Handling**:
   - Add error boundaries at feature level (not just root)
   - Implement retry logic with exponential backoff for data fetching
   - Add toast notifications for user actions (filter applied, sort changed)
- **Advanced Filtering**: Add price range slider, stock level filters, and date filters with a collapsible filter panel.


### Bonus Features Implemented

- **Custom Hooks** - 4 reusable hooks with comprehensive tests
- **TypeScript** - Full type safety with interfaces for Product, Sort, and Pagination states
- **Loading States** - Skeleton screens for both table and card views
- **Accessibility** - ARIA labels, semantic HTML, keyboard navigation support
- **URL State** - All filters/sort/pagination persist in URL for sharing
- **Error Boundaries** - Graceful error handling with retry functionality
- **Test Coverage** - 27 test files covering hooks,components, and integration scenarios
- **Mobile-First Responsive** - Adaptive UI with cards on mobile, table on desktop

### Agentic AI Tools Used
Claude code was used throughout this project to generate utility hooks, unit tests, optimize Tailwind classes, refactor and debug code


### Time Breakdown

- Sorting: 35 minutes
- Pagination: 45 minutes
- Responsive layout: 1 hour
- Polish & refactoring: 2 hours
```

---

## ❓ FAQ

**Q: Can I use additional libraries?**  
A: Stick to what's provided. We want to see your core React and Tailwind skills.

**Q: Should I add TypeScript?**  
A: Optional but appreciated. The codebase is JavaScript by default.

**Q: Can I refactor the existing code?**  
A: Absolutely! We want to see your architectural decisions.

**Q: What if I don't finish everything?**  
A: Focus on quality over quantity. It's better to have 2 well-implemented features than 3 rushed ones.

**Q: Can I use React Router for navigation?**  
A: It's available in package.json, but the current state-based approach is fine for this challenge.

**Q: Can I use agentic AI tools (e.g., GitHub Copilot, ChatGPT, Cursor, etc.)?**  
A: Yes — you’re allowed (and even encouraged) to use agentic AI tools if they help you move faster or structure your work more effectively.
However, please be transparent:

- Clearly note **where** and **why** you used AI assistance (e.g., to refactor code, generate utility hooks, or optimize Tailwind classes).
- We’re not grading whether you used AI — we’re assessing your **ability to understand, adapt, and explain** the code you produce.

---

## 🙏 Thank You!

We appreciate you taking the time to complete this challenge. We're excited to see your approach and discuss it with you in the follow-up round.

Good luck! 🚀
