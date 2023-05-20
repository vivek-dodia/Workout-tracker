const Minimized = () => {
  return (
    <div className="fixed bottom-0 right-0 left-0 lg:left-64 z-30">
      <div className="relative bg-slate-200">
        <div className="flex gap-4 justify-center">
          <button className="px-4 py-2 bg-green-500 text-white">resume</button>
          <button className="px-4 py-2 bg-red-500 text-white">discard</button>
        </div>
      </div>
    </div>
  )
}

export default Minimized
