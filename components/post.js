export default function Post({children}) {
  return (
    <div className="relative w-full px-6 bg-slate-100 dark:bg-zinc-800 mx-auto max-w-4xl pt-12 pb-20">
      <div className='prose prose-slate dark:prose-invert mx-auto'>
        {children}
      </div>
    </div>
  );
}