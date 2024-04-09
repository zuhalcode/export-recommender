import { Layout } from "@/components";
import Input from "@/components/Input";

export default function Home() {
  return (
    <Layout>
      <div className="relative h-screen w-full bg-neutral">
        <div className="bg-export relative left-0 top-0 z-0 h-full w-full items-center justify-center bg-center ">
          <div className="absolute left-0 top-0 z-10 h-full w-full bg-black bg-opacity-40" />
          <div className="relative top-[20%] z-30 mx-auto flex flex-col items-center justify-center gap-12">
            <div className="max-w-2xl text-center text-6xl font-bold text-white">
              Rekomendasi Produk Ekspor Untuk Anda
            </div>

            <div className="w-full">
              <Input />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
