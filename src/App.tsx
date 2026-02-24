import { useEffect, useMemo, useState } from "react";
import BooksPage from "./features/books/booksPage.tsx";
import DashboardPage from "./features/dashboard/DashboardPage.tsx";
import MembersPage from "./features/members/MembersPage.tsx";
import EmployeesPage from "./features/employees/EmployeesPage.tsx";
import LoansPage from "./features/loans/LoansPage.tsx";

type View = "dashboard" | "books" | "members" | "employees" | "loans";

const routeMap: Record<string, View> = {
  "/": "dashboard",
  "/dashboard": "dashboard",
  "/books": "books",
  "/members": "members",
  "/employees": "employees",
  "/loans": "loans",
};

function viewFromPath(pathname: string): View {
  return routeMap[pathname.toLowerCase()] ?? "dashboard";
}

function pathFromView(view: View): string {
  return view === "dashboard" ? "/" : `/${view}`;
}

export default function App() {
  const [view, setView] = useState<View>(() => viewFromPath(window.location.pathname));

  const navigate = useMemo(
    () => (nextView: View) => {
      const nextPath = pathFromView(nextView);
      window.history.pushState({}, "", nextPath);
      setView(nextView);
    },
    [],
  );

  useEffect(() => {
    const handlePopState = () => {
      setView(viewFromPath(window.location.pathname));
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  if (view === "books") {
    return <BooksPage onBack={() => navigate("dashboard")} />;
  }

  if (view === "members") {
    return <MembersPage onBack={() => navigate("dashboard")} />;
  }

  if (view === "employees") {
    return <EmployeesPage onBack={() => navigate("dashboard")} />;
  }

  if (view === "loans") {
    return <LoansPage onBack={() => navigate("dashboard")} />;
  }

  return (
    <DashboardPage
      onOpenBooks={() => navigate("books")}
      onOpenMembers={() => navigate("members")}
      onOpenEmployees={() => navigate("employees")}
      onOpenLoans={() => navigate("loans")}
    />
  );
}
