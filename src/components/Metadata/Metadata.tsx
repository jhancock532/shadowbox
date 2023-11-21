import Head from 'next/head';

type MetadataProps = {
    title: string;
    description: string;
};

const Metadata = ({ title, description }: MetadataProps) => {
    return (
        <Head>
            {/* Basic Page Needs */}
            <meta charSet="utf-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

            {/* Mobile Specific Metatags */}
            <meta name="HandheldFriendly" content="True" />
            <meta name="MobileOptimized" content="320" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
            />

            {/* Title and Meta Description */}
            <title>{title}</title>
            {title && <meta name="title" content={title} />}
            {description && <meta name="description" content={description} />}

            {/* OpenGraph Metadata */}
            <meta property="og:type" content="website" />
            {/* {pageUrl && <meta property="og:url" content={pageUrl} />} */}
            {title && <meta property="og:title" content={title} />}
            {description && (
                <meta property="og:description" content={description} />
            )}
            {/* {imageUrl && <meta property="og:image" content={imageUrl} />} */}

            {/* Twitter Metadata */}
            <meta property="twitter:card" content="summary_large_image" />
            {/* {pageUrl && <meta property="twitter:url" content={pageUrl} />} */}
            {title && <meta property="twitter:title" content={title} />}
            {description && (
                <meta property="twitter:description" content={description} />
            )}
            {/* {imageUrl && <meta property="twitter:image" content={imageUrl} />} */}

            {/* Favicons */}
            <link rel="icon" href="/favicon.ico" />
            <link
                rel="icon"
                type="image/png"
                sizes="32x32"
                href="/favicon-32x32.png"
            />
            <link
                rel="icon"
                type="image/png"
                sizes="16x16"
                href="/favicon-16x16.png"
            />

            {/* Copyright Declaration */}
            <link
                // eslint-disable-next-line react/no-invalid-html-attribute
                rel="schema.dcterms"
                href="https://dublincore.org/specifications/dublin-core/dcmi-terms/"
            />
            <meta
                name="dcterms.dateCopyrighted"
                content={new Date().getFullYear().toString()}
            />
            <meta name="dcterms.rightsHolder" content="Torchbox" />
        </Head>
    );
};

export default Metadata;
