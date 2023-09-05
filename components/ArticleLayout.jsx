import Image from 'next/image';
import { BreadcrumbJsonLd, ArticleJsonLd } from 'next-seo';
import ServerToc from './ServerToc';
import Link from 'next/link';
import byggetilbudAd from '../public/images/3byggetilbud_336x280.jpg';
import FAQComponent from './FAQComponent';

export default function TagTyperLayout({ children, ...props }) {
    return (
        <>
            <BreadcrumbJsonLd
                itemListElements={[
                    {
                        position: 1,
                        name: 'Tagtyper',
                        item: 'https://www.tagberegneren.dk/tagtyper/',
                    },
                    {
                        position: 2,
                        name: props.props.title,
                        item: props.canonical,
                    },
                ]}
            />
            <ArticleJsonLd
                useAppDir={false}
                url={props.canonical}
                title={props.props.title}
                images={[
                    props.props?.featuredImage.node.sourceUrl
                ]}
                datePublished={props.props.date}
                dateModified={props.props.modified}
                authorName={[
                    {
                        name: 'Tagberegneren',
                        url: 'https://wwwtagberegneren.dk',
                    },
                ]}
                description={props.props.seo.metaDesc}
                isAccessibleForFree={true}
            />
            <article className='single-post my-4 md:my-8'>
                <div className="entry-content md:px-4 flex">
                    <div className="md:basis-2/3">
                        <div className="max-w-3xl mx-auto">
                            <div id="breadcrumbs" className='mb-4 text-xs'>
                                <span><Link href={'/tagtyper'}>Tagtyper</Link></span>
                                <span className="separator">  /  </span>
                                <span>{props.props.title}</span>
                            </div>
                            <h1>{`${props.props.title}`}</h1>
                            {/* Add author and modified date */}
                            <div className="post-meta flex my-4 items-center gap-2 text-sm">
                                <div className="post-meta__date">
                                    <span>Opdateret </span>
                                    {/** print modified date to this format: Jan 20, 2023 */}
                                    <span>{new Date(props.props.modified).toLocaleDateString('da-DK', { year: 'numeric', month: 'long', day: 'numeric' })}</span>

                                </div>
                            </div>
                            <div className="relative">
                                <Image
                                    className="object-cover"
                                    src={props.image}
                                    alt={props.props.title}
                                    placeholder='blur'
                                />
                            </div>
                            <div id="article-text" dangerouslySetInnerHTML={{ __html: children }}>
                            </div>
                            {props.mainEntity && (
                                <FAQComponent mainEntity={props.mainEntity} />
                            )
                            }
                        </div>
                    </div>
                    <div className="hidden md:basis-1/3 md:block sticky top-0 max-h-[95vh] overflow-y-auto">
                        <div className='ad-container flex place-content-center items-center flex-col relative'>
                            <h3 className='text-center mb-4'>Få 3 tilbud på din opgave</h3>
                            <a href="/3byggetilbud" target="_blank" rel="nofollow noopener">
                                <Image
                                    src={byggetilbudAd}
                                    alt="Få 3 tilbud på din opgave"
                                    placeholder='blur'
                                />
                            </a>
                        </div>
                        <div className=''>
                            <div className="toc-container mt-6 w-fit mx-auto">
                                <div className="info">
                                    <ServerToc html={children} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </>
    );
}

export function ArticleLayout({ children, ...props }) {
    return (
        <>
            <BreadcrumbJsonLd
                itemListElements={[
                    {
                        position: 1,
                        name: props.props.title,
                        item: props.canonical,
                    },
                ]}
            />
            <ArticleJsonLd
                useAppDir={false}
                url={props.canonical}
                title={props.props.title}
                images={[
                    props.props?.featuredImage.node.sourceUrl
                ]}
                datePublished={props.props.date}
                dateModified={props.props.modified}
                authorName={[
                    {
                        name: 'Tagberegneren',
                        url: 'https://wwwtagberegneren.dk',
                    },
                ]}
                description={props.props.seo.metaDesc}
                isAccessibleForFree={true}
            />
            <article className='single-post my-4 md:my-8'>
                <div className="entry-content md:px-4 flex">
                    <div className="md:basis-2/3">
                        <div className="max-w-3xl mx-auto">
                            <h1>{`${props.props.title}`}</h1>
                            {/* Add author and modified date */}
                            <div className="post-meta flex my-4 items-center gap-2 text-sm">
                                <div className="post-meta__date">
                                    <span>Opdateret </span>
                                    {/** print modified date to this format: Jan 20, 2023 */}
                                    <span>{new Date(props.props.modified).toLocaleDateString('da-DK', { year: 'numeric', month: 'long', day: 'numeric' })}</span>

                                </div>
                            </div>
                            <div className="relative">
                                <Image
                                    className="object-cover"
                                    src={props.image}
                                    alt={props.props.title}
                                    placeholder='blur'
                                />
                            </div>
                            <div id="article-text" dangerouslySetInnerHTML={{ __html: children }}>
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:basis-1/3 md:block sticky top-0 max-h-[95vh] overflow-y-auto">
                        <div className='ad-container flex place-content-center items-center flex-col relative'>
                            <h3 className='text-center mb-4'>Få 3 tilbud på din opgave</h3>
                            <a href="/3byggetilbud" target="_blank" rel="nofollow noopener">
                                <Image
                                    src={byggetilbudAd}
                                    alt="Få 3 tilbud på din opgave"
                                    placeholder='blur'
                                />
                            </a>
                        </div>
                        <div className=''>
                            <div className="toc-container mt-6 w-fit mx-auto">
                                <div className="info">
                                    <ServerToc html={children} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </>
    );
}