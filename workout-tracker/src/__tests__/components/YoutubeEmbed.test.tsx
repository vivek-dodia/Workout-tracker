import { render } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import YoutubeEmbed from "../../components/YoutubeEmbed"

describe("YoutubeEmbed component", () => {
  it("renders an iframe element with the correct src", () => {
    const embedId = "abcd1234"
    const { getByTitle } = render(<YoutubeEmbed embedId={embedId} />)
    const iframeElement = getByTitle(
      "YouTube video player"
    ) as HTMLIFrameElement

    expect(iframeElement).toBeInTheDocument()
    expect(iframeElement).toHaveAttribute(
      "src",
      `https://www.youtube-nocookie.com/embed/${embedId}`
    )
  })

  it("renders with the specified embedId", () => {
    const embedId = "abcd1234"
    const { getByTitle } = render(<YoutubeEmbed embedId={embedId} />)
    const iframeElement = getByTitle(
      "YouTube video player"
    ) as HTMLIFrameElement

    expect(iframeElement).toBeInTheDocument()
    expect(iframeElement).toHaveAttribute("src")
    expect(iframeElement.src).toContain(embedId)
  })

  it("renders with the necessary allow attributes", () => {
    const embedId = "abcd1234"
    const { getByTitle } = render(<YoutubeEmbed embedId={embedId} />)
    const iframeElement = getByTitle(
      "YouTube video player"
    ) as HTMLIFrameElement

    expect(iframeElement).toBeInTheDocument()
    expect(iframeElement).toHaveAttribute(
        "allow",
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      );
  })

  it("renders with the allowFullScreen attribute", () => {
    const embedId = "abcd1234"
    const { getByTitle } = render(<YoutubeEmbed embedId={embedId} />)
    const iframeElement = getByTitle(
      "YouTube video player"
    ) as HTMLIFrameElement

    expect(iframeElement).toBeInTheDocument()
    expect(iframeElement).toHaveAttribute("allowFullScreen")
  })
})
