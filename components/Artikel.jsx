import { useState } from "react";
import Link from "next/link";
// Eksporter Artikel-funktionen som standard eksport
export default function Artikel(props) {
    //Show only the first 50 characters of the article
    const [article, setArticle] = useState(props.article.substring(0, 80) + "...");

    return (
        <Link href={`/artikler/${props.title}`}>
            <div className={`p-10 mt-10 border rounded-xl artikel w-full h-fit mx-auto`}>
                {/* Render overskrift */}
                <h4 className="text-3xl font-semibold leading-normal">{props.title}</h4>
                {/* Render artiklens visning */}
                <div className="mt-10 font-light artikelTekst">{article}</div>
                {/* Render forfatterinformation */}
                <div className="font-light mt-7 flex gap-5 align-middle">
                    <img
                        className="rounded-full object-cover forfatterBillede my-auto"
                        alt="forfatter"
                        src="https://asset.dr.dk/imagescaler01/https%3A%2F%2Fwww.dr.dk%2Fimages%2Fother%2F2015%2F04%2F18%2Fa236298c-17fa-4447-b907-0d955c327895_20140307-120447-a-1000x667-we.jpg&w=620"
                    />
                    <div>
                        <p className="font-semibold text-xl mt-2">Mads Møller</p>
                        <p className="font-light text-md">Byggeekspert</p>
                    </div>
                </div>
            </div>
        </Link>
    );
}
