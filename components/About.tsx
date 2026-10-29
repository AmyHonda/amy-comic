// components/About.tsx

// サイトの紹介文。News と同じ「白いボックス」のデザインにそろえている。
export default function About({ className = "" }: { className?: string }) {
  return (
    <section className={`bg-amy-yellow-light px-4 pb-10 font-zenmaru ${className}`}>
      <div className="mx-auto max-w-md md:max-w-xl lg:max-w-none">
        <h2 className="mb-5 text-center font-mochiy text-2xl text-amy-gold">
          About
        </h2>

        <div className="rounded-[2rem] bg-white px-6 py-7 text-center">
          <p className="m-0 text-balance text-sm font-bold leading-7 text-zinc-700">
            一次創作メインのサイトです。<br />
            高校生男女のラブコメ漫画「好きって言わせてやる！」を連載しています。
          </p>
        </div>
      </div>
    </section>
  );
}
