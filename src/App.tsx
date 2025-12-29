import { useState } from "react";
import "./styles/global.css";
import BooksPage from "./features/books/booksPage.tsx";
import DashboardPage from "./features/dashboard/DashboardPage.tsx";

type View = "dashboard" | "books";

export default function App() {
  const [view, setView] = useState<View>("dashboard");

  if (view === "books") {
    return <BooksPage onBack={() => setView("dashboard")} />;
  }

  return <DashboardPage onOpenBooks={() => setView("books")} />;
}
