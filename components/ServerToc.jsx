// Serverside renderet Table of Contents component. Accepts a html string and return a list of links to the headings in the string.
//

const cheerio = require('cheerio');


export default function ServerToc({ html }) {
  const $ = cheerio.load(html);

  const headings = [];
  let currentHeading = null;

  $('h2, h3').each((index, element) => {
    const level = element.tagName === 'h2' ? 2 : 3;
    const id = $(element).attr('id');
    const title = $(element).text();

    const heading = { level, id, title, items: [] };

    if (level === 2) {
      headings.push(heading);
      currentHeading = heading;
    } else if (level === 3 && currentHeading) {
      currentHeading.items.push(heading);
    }
  });
  var count = 0;
  return (

    <nav aria-label="Indholdsfortegnelse" className="text ib-toc-container toc-table">
      <ul>
        {headings.map((heading, index) => {
          count ++;
          return (
          // Remove the first 3 caracters from the id, if they that with a number followed by a full stop
          // This is to remove the numbering from the headings, which is added by the markdown parser
          <li key={index}>
            <a href={`#${count}`}>
              {heading.title}
            </a>
            {heading.items.length > 0 && (
              <ul>
                {heading.items.map((child, index) => {
                  count ++;
                  return (
                  <li key={index}>
                    <a href={`#${count}`}>
                      {child.title}
                    </a>
                  </li>
                )}
                )}
              </ul>
            )}
          </li>
        )}
        )}
      </ul>
    </nav>
  );
}

