import { useMemo, useState, type FormEvent } from "react";

type LoginPageProps = {
  onLogin: () => void;
};

const demoAccounts = [
  { label: "Head Librarian", email: "librarian@library.local", password: "Welcome123" },
  { label: "Branch Manager", email: "manager@library.local", password: "Books2026" },
];

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const demoAccount = useMemo(() => demoAccounts[0], []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    setError("");
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 700);
  };

  const handleUseDemo = () => {
    setEmail(demoAccount.email);
    setPassword(demoAccount.password);
    setError("");
  };

  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden px-6 pb-16 pt-10 sm:px-8 sm:pb-20">
      <div className="pointer-events-none absolute -right-[120px] -top-[140px] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,_rgba(255,180,210,0.9),_rgba(255,180,210,0))] opacity-85" />
      <div className="pointer-events-none absolute -bottom-[200px] -left-[120px] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,_rgba(210,223,255,0.9),_rgba(210,223,255,0))] opacity-85" />
      <div className="pointer-events-none absolute left-[10%] top-[30%] h-[260px] w-[260px] rounded-full bg-[radial-gradient(circle,_rgba(255,214,150,0.8),_rgba(255,214,150,0))] opacity-85" />

      <div className="relative z-10 grid w-full max-w-[1100px] items-stretch gap-8 tracking-[0.04em] lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <section className="grid content-center gap-4 text-white">
          <p className="text-[clamp(1rem,3vw,1.7rem)] uppercase tracking-[0.3em] text-white/75">
            Library Admin Portal
          </p>
          <h1 className="text-[clamp(2.4rem,3.2vw,3.4rem)] font-semibold text-[#fff5fb]">
            Welcome back to the stacks.
          </h1>
          <p className="max-w-[480px] leading-relaxed text-white/80 text-[clamp(0.85rem,3vw,1.3rem))]">
            Manage catalog health, staff shifts, and member activity in one calm,
            focused workspace.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <article className="rounded-[18px] border border-white/25 bg-white/5 p-4 shadow-[0_20px_40px_rgba(20,18,38,0.18)] backdrop-blur">
              <h3 className="mb-1 text-xl font-semibold text-white/80">Smart queues</h3>
              <p className="text-l leading-relaxed text-white/80">
                Stay ahead of returns, holds, and renewal spikes.
              </p>
            </article>
            <article className="rounded-[18px] border border-white/25 bg-white/5 p-4 shadow-[0_20px_40px_rgba(20,18,38,0.18)] backdrop-blur">
              <h3 className="mb-1 text-xl font-semibold text-white/80">Member pulse</h3>
              <p className="text-l leading-relaxed text-white/80">
                Monitor engagement with quick, human-readable insights.
              </p>
            </article>
          </div>
        </section>

        <form
          className="grid gap-4 rounded-[22px] border border-white/85 bg-white/95 p-7 shadow-[0_25px_50px_rgba(25,22,45,0.2)] animate-floatIn"
          onSubmit={handleSubmit}
        >
          <div className="grid gap-1">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#8d7aa5]">Sign in</p>
            <h2 className="text-xl font-semibold text-[#2f1f3a] tracking-[0.15em]">
              Access your library dashboard
            </h2>
            <p className="text-m text-[#6b5a80] tracking-[0.06em]">Use your staff credentials to continue.</p>
          </div>

          <label className="grid gap-1 text-sm text-[#3e2f56] tracking-[0.04em]">
            Work email
            <input
              className="w-full rounded-xl border border-[#6f5a8c]/20 bg-white/90 px-3 py-2 shadow-[inset_0_1px_2px_rgba(30,18,50,0.06)] focus:border-[#ff91c7]/70 focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-[#ff91c7]/50"
              type="email"
              name="email"
              autoComplete="email"
              placeholder="name@library.org"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>

          <label className="grid gap-1.5 text-sm text-[#3e2f56] tracking-[0.04em]">
            Password
            <input
              className="w-full rounded-xl border border-[#6f5a8c]/20 bg-white/90 px-3 py-2 shadow-[inset_0_1px_2px_rgba(30,18,50,0.06)] focus:border-[#ff91c7]/70 focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-[#ff91c7]/50"
              type="password"
              name="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>

          <div className="flex flex-wrap items-center justify-between gap-3 text-[0.85rem] text-[#4a3a60] tracking-[0.04em]">
            <label className="inline-flex items-center gap-2">
              <input
                className="accent-[#ff93c8]"
                type="checkbox"
                checked={remember}
                onChange={(event) => setRemember(event.target.checked)}
              />
              Keep me signed in
            </label>
            <button type="button" className="p-0 font-semibold text-[#7a4f86] hover:text-[#5a2f6a]">
              Forgot password?
            </button>
          </div>

          {error ? <p className="font-semibold text-[#a73c50]">{error}</p> : null}

          <div className="flex flex-wrap gap-2.5">
            <button className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-br from-[#ffd28b] to-[#ff93c8] px-4 py-2 text-[0.95rem] font-semibold text-[#2f1f3a] shadow-[0_10px_18px_rgba(255,142,196,0.3)] transition duration-150 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60" type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </button>
            <button className="inline-flex items-center justify-center gap-2 rounded-full border border-white/90 bg-white/60 px-4 py-2 text-[0.95rem] font-semibold text-[#3e2f56] transition duration-150 hover:-translate-y-0.5" type="button" onClick={handleUseDemo}>
              Use demo account
            </button>
          </div>

          <div className="grid gap-2 border-t border-[#8468a1]/20 pt-3 text-[0.85rem] text-[#6b5a80]">
            <span>Demo accounts:</span>
            <ul className="ml-4 grid gap-1">
              {demoAccounts.map((account) => (
                <li key={account.email}>
                  {account.label} � {account.email}
                </li>
              ))}
            </ul>
            {remember ? (
              <p className="text-[0.8rem] text-[#7a6b8d]">You will stay signed in on this device.</p>
            ) : (
              <p className="text-[0.8rem] text-[#7a6b8d]">You will be signed out after inactivity.</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
