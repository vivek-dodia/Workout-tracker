type Props = {
  embedId: string
}

const YoutubeEmbed = ({ embedId }: Props) => {
  return (
    <iframe
      className="aspect-video w-full flex-1 mt-2 rounded-md" 
      src={`https://www.youtube-nocookie.com/embed/${embedId}`}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    />
  )
}

export default YoutubeEmbed
