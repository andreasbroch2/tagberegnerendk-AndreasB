import { NextSeo } from "next-seo";

export default function Seo(props) {
    return (
        <>
            <NextSeo
            // If props.props.data.title is undefined, use props.title
                title={props.props?.seo.title || props.title}
                description={props.props?.seo.metaDesc || props.description}
                canonical={props.canonical}
                openGraph={{
                    type: props.type,
                    locale: 'da_DK',
                    url: props.canonical,
                    // If props.props.data.title is undefined, use props.title
                    title: props.props?.seo.title || props.title,
                    description: props.props?.seo.metaDesc || props.description,
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
