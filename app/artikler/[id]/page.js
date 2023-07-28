import React from "react";

import { artikler } from "../../utils/artikler";

export default function Page({ params }) {
    function decodeURL(string) {
        return decodeURIComponent(string.replace(/\+/g, " "));
    }

    var encodedString = params.id;
    var decodedString = decodeURL(encodedString);

    console.log(decodedString);

    // Find the article with the matching title
    var article = artikler.find(
        (artikel) => removeSymbols(artikel.title) === removeSymbols(decodedString)
    );

    function removeSymbols(string) {
        return string.replace(/[^\w\s]/g, "");
    }

    const formatteretArtikel = article
        ? article.article.split("<br/>").map((afsnit, index) => (
              <React.Fragment key={index}>
                  {afsnit}
                  <br />
              </React.Fragment>
          ))
        : null;

    return (
        <div className="px-3">
            {article ? (
                <div className="mt-20 mb-20">
                    <section>
                        <div className="container">
                            <div className="w-full lg:mx-auto lg:w-8/12">
                                <h1 className="font-bold leading-tight text-4xl mb-10">
                                    {article.title}
                                </h1>
                                <p className="mt-5">{formatteretArtikel}</p>
                            </div>
                        </div>
                    </section>
                </div>
            ) : (
                <p>No article found.</p>
            )}
        </div>
    );
}
