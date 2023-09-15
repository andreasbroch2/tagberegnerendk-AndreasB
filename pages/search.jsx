import { useEffect } from 'react';
import Head from 'next/head';
import Posts from '../components/posts';
import useSearch from '../lib/use-search';

export default function Search() {
    const { query, results, search } = useSearch();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        search({
            query: params.get('s'),
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            <Head>
                <title>Søgeresultater - Tagberegneren.dk</title>
            </Head>
            <section>
                <h1 className='text-center'>Søgeresultater for: {query}</h1>
                <Posts posts={results} />
            </section>
        </>
    );
}

// Next.js method to ensure a static page gets rendered
export async function getStaticProps() {
    return {
        props: {},
    };
}
