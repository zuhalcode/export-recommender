import Input from "@/components/Input";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      <div className="relative h-screen w-full bg-neutral">
        <div className="relative left-0 top-0 z-0 h-full w-full items-center justify-center bg-[url('/img/export-bg.jpg')] bg-center ">
          <div className="absolute left-0 top-0 z-10 h-full w-full bg-black bg-opacity-30" />
          <div className="relative top-[25%] z-30 mx-auto flex  flex-col items-center justify-center gap-12">
            <div className="text-center text-7xl font-bold text-white">
              {/* Temukan Produk Ekspor Terbaik Anda */}
              Get Your Export Product Recommendation
            </div>

            <div className="relative flex w-full max-w-xl gap-3 rounded-xl border bg-white px-3 py-2">
              <Input />

              <button className="w-1/3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-base font-bold uppercase text-white">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
