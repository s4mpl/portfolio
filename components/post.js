export default function Post({children}) {
  return (
    <div class="relative w-full px-6 bg-slate-100 dark:bg-zinc-800 md:max-w-3xl md:mx-auto lg:max-w-4xl lg:pt-16 lg:pb-28">
      <div class='prose prose-slate dark:prose-invert mx-auto'>
        {children}
      </div>
    </div>
  );
}