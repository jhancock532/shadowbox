import Image from 'next/image';

export const EmbedReport = ({ metadata }: any) => {
    if (!metadata.youtubeEmbeds || metadata.youtubeEmbeds.length < 1) {
        return null;
    }

    return (
        <div>
            <h2>Embedded Content</h2>
            <p>
                <strong>{metadata.youtubeEmbeds.length}</strong> youtube embed
                {metadata.youtubeEmbeds.length > 1 ? 's were' : ' was'} found on
                this page. Consider replacing these with lazy loaded YouTube
                videos.
            </p>
            <div>
                {metadata.youtubeEmbeds.map((embed: any, index: number) => {
                    return (
                        <div key={index}>
                            <Image
                                width="266"
                                height="150"
                                src={embed.thumbnail}
                                alt={embed.title}
                            />
                            <p>{embed.title}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
