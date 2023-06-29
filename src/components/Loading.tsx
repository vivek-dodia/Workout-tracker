const Loading = ({ loadingText = "Loading" }: { loadingText?: string }) => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div className="flex gap-4 items-center px-4">
        <img src="/logo.png" className="h-6 w-6" alt="logo" />
        <h1 className="text-lg font-semibold">Workout Tracker</h1>
      </div>
      <div className="mt-4 flex gap-2">
        <svg
          data-testid="loading-spinner"
          className="animate-spin h-5 w-5 text-blue-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <h3>{loadingText}...</h3>
      </div>
    </div>
  )
}

export default Loading
