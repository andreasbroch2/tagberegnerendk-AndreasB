import { NextSeo } from "next-seo";

export default function Seo(props) {
    return (
        <>
            <NextSeo
                title={props.title}
                description={props.description}
                canonical={props.canonical}
                openGraph={{
                    type: props.type,
                    locale: 'da_DK',
                    url: props.canonical,
                    title: props.title,
                    description: props.description,
                    images: [
                        {
                            url: props.props?.featuredImage.node.sourceUrl,
                            width: 1280,
                            height: 720
                        }
                    ],
                    /* eslint-disable */
                    site_name: 'Tagberegneren.dk',
                    /* eslint-enable */
                    // If type is article, add article specific properties
                }}
            />
        </>
    );
}
