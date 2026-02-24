import Navbar from "../../shared/components/Navbar.tsx";
import DashboardCard from "./components/DashboardCard.tsx";

type DashboardPageProps = {
  onOpenBooks: () => void;
  onOpenMembers: () => void;
  onOpenEmployees: () => void;
  onOpenLoans: () => void;
};

export default function DashboardPage({
  onOpenBooks,
  onOpenMembers,
  onOpenEmployees,
  onOpenLoans,
}: DashboardPageProps) {
  return (
    <main className="relative z-10 mx-auto grid w-full max-w-[1080px] gap-6 px-4 pb-16 pt-9 sm:px-6 sm:pb-20 sm:pt-12">
      <Navbar title="Library Dashboard" />
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#8d7aa5]">Admin Panel</p>
          <h2 className="mt-2 text-base text-[#5e4f73]">
            Kelola koleksi dan layanan perpustakaan.
          </h2>
        </div>
      </header>

      <section className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        <DashboardCard
          title="Books"
          description="Kelola data buku: tambah, edit, hapus, dan perbarui stok."
          ctaLabel="Buka Books Page"
          onClick={onOpenBooks}
        />
        <DashboardCard
          title="Members"
          description="Kelola data member: kontak, status, dan informasi layanan."
          ctaLabel="Buka Members Page"
          onClick={onOpenMembers}
        />
        <DashboardCard
          title="Employees"
          description="Kelola data pegawai: role, kontak, dan status kerja."
          ctaLabel="Buka Employees Page"
          onClick={onOpenEmployees}
        />

        <div className="col-span-full">
          <DashboardCard
            title="Loans"
            description="Kelola data peminjaman: tanggal pinjam, jatuh tempo, pengembalian."
            ctaLabel="Buka Loans Page"
            onClick={onOpenLoans}
          />
        </div>
      </section>
    </main>
  );
}
