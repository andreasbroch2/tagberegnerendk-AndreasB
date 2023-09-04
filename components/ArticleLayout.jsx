import Image from 'next/image';
import { BreadcrumbJsonLd } from 'next-seo';
import ServerToc from './ServerToc';
import Link from 'next/link';

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
                    },
                ]}
            />
            <article className='single-post my-4 md:my-8'>
                <div className="entry-content md:px-4 flex">
                    <div className="md:basis-2/3">
                        <div className="max-w-3xl mx-auto">
                            <div id="breadcrumbs" className='mb-4 text-xs'>
                                <span><Link href={'/blog/'}>Blog</Link></span>
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
                                    src={props.props.featuredImage?.node.sourceUrl}
                                    alt={props.props.featuredImage?.node.altText}
                                    width={props.props.featuredImage?.node.mediaDetails.width}
                                    height={props.props.featuredImage?.node.mediaDetails.height}
                                    priority
                                    sizes="
                      (max-width: 768px) 100vw,
                      50vw"
                                />
                            </div>
                            <div id="article-text" dangerouslySetInnerHTML={{ __html: children }}>
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:basis-1/3 md:block">
                        <div className='ad-container flex place-content-center items-center flex-col relative'>
                            <h3 className='text-center mb-4'>Få 3 tilbud på din opgave</h3>
                            <a href="https://www.partner-ads.com/dk/klikbanner.php?partnerid=44511&bannerid=25692&htmlurl=https://www.3byggetilbud.dk/tilbud/tagrenovering/" target="_blank" rel="nofollow noopener">
                                <Image
                                    src="https://www.partner-ads.com/dk/visbanner.php?partnerid=44511&bannerid=26601"
                                    alt="Få 3 tilbud på din opgave"
                                    width={300}
                                    height={250}

                                />
                            </a>
                        </div>
                        <div className='sticky top-0 max-h-[95vh] overflow-y-auto'>
                            <div className="toc-container mt-6 w-fit mx-auto">
                                <div className="info">
                                    <p className="headlines">Indholdsfortegnelse</p>
                                    <div className="ib-toc-separator" style={{ height: "2px" }}></div>
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