// Component for using next-seo

import { NextSeo } from "next-seo";

export default function Seo(props) {
    return (
        <NextSeo
            title={props.title}
            description={props.description}
            canonical={props.canonical}
        />
    );
}
