import Link from "next/link";
import Image from "next/image";
import jornalist from "../assets/jornalist.jpg";

export default function Artikel(props) {
    //Show only the first 50 characters of the article
    const article = props.article.substring(0, 80) + "...";

    return (
        <Link href={`/artikler/${props.title}`}>
            <div className={`p-10 mt-10 border rounded-xl artikel w-full h-fit mx-auto`}>
                {/* Render overskrift */}
                <h4 className="text-3xl font-semibold leading-normal">{props.title}</h4>
                {/* Render artiklens visning */}
                <div className="mt-10 font-light artikelTekst">{article}</div>
                {/* Render forfatterinformation */}
                <div className="font-light mt-7 flex gap-5 align-middle">
                    <Image
                        className="rounded-full object-cover forfatterBillede my-auto"
                        alt="forfatter"
                        src={jornalist}                    />
                    <div>
                        <p className="font-semibold text-xl mt-2">Mads Møller</p>
                        <p className="font-light text-md">Byggeekspert</p>
                    </div>
                </div>
            </div>
        </Link>
    );
}
