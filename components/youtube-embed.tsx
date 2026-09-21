import { getYouTubeEmbedUrl } from "@/lib/utils";

type YoutubeEmbedProps = {
  url?: string | null;
  title: string;
  className?: string;
};

/** Responsive 16:9 YouTube embed. Renders nothing if `url` isn't a valid YouTube link. */
export function YoutubeEmbed({ url, title, className }: YoutubeEmbedProps) {
  const embedUrl = getYouTubeEmbedUrl(url);
  if (!embedUrl) return null;

  return (
    <div className={`relative aspect-video w-full overflow-hidden rounded-2xl bg-secondary ${className ?? ""}`}>
      <iframe
        src={embedUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="absolute inset-0 size-full"
      />
    </div>
  );
}
