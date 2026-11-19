export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2A1A1D] flex flex-col items-center justify-center p-6 text-center font-sans">
      <h2 className="font-serif text-3xl mb-2 text-[#5E1224]">Page Not Found</h2>
      <p className="text-sm text-[#665457] mb-6">The requested garment could not be found.</p>
      <a
        href="/"
        className="text-xs uppercase tracking-widest text-[#5E1224] underline underline-offset-4"
      >
        Return to Lookbook &rarr;
      </a>
    </div>
  );
}
