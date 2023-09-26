export default function CleanLinks(content) {
    var cleanElement = content.replace(/\n/g, '')
    cleanElement = cleanElement.replace(/href='https:\/\/tagberegneren\.ditsmartehjem\.dk/g, "href='");
    cleanElement = cleanElement.replace(/href="https:\/\/tagberegneren\.ditsmartehjem\.dk/g, 'href="');
    cleanElement = cleanElement.replace(/\/uncategorized/g, '');
    cleanElement = cleanElement.replace(/<h3>Lignende Indhold<\/h3>/g, '<h2>Lignende Indhold</h2>');
    return cleanElement;
}
