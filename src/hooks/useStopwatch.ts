import { useState, useEffect } from "react"

const useStopwatch = (startTime: number) => {
  const [time, setTime] = useState<number>(Math.floor(Date.now() - startTime))

  useEffect(() => {
    let interval = -1

    interval = window.setInterval(() => {
      setTime(Math.floor(Date.now() - startTime))
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return { time, timeString: new Date(time).toISOString().slice(11, -5) }
}

export default useStopwatch
