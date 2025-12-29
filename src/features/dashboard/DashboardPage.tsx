import Navbar from "../../shared/components/Navbar.tsx";
import DashboardCard from "./components/DashboardCard.tsx";

type DashboardPageProps = {
  onOpenBooks: () => void;
};

export default function DashboardPage({ onOpenBooks }: DashboardPageProps) {
  return (
    <main className="page">
      <Navbar title="Library Dashboard" />
      <header className="page__header">
        <div>
          <p className="eyebrow">Admin Panel</p>
          <h2 className="page__subtitle">Kelola koleksi dan layanan perpustakaan.</h2>
        </div>
      </header>

      <section className="dashboard-grid">
        <DashboardCard
          title="Books"
          description="Kelola data buku: tambah, edit, hapus, dan perbarui stok."
          ctaLabel="Buka Books Page"
          onClick={onOpenBooks}
        />
      </section>
    </main>
  );
}
