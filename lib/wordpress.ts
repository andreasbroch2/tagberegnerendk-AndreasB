const API_URL = process.env.WORDPRESS_API_URL

export async function fetchAPI(query = '', { variables }: Record<string, any> = {}) {
  const headers = { 'Content-Type': 'application/json' }
  if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers[
      'Authorization'
    ] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`
  }
  // WPGraphQL Plugin must be enabled
  const res = await fetch('https://tagberegneren.ditsmartehjem.dk/graphql', {
    headers,
    method: 'POST',
    body: JSON.stringify({
      query,
      variables,
    }),
  })
  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }
  return json.data
}
export async function getSinglePost(slug) {
  const data = await fetchAPI(`
      query GET_POST{
        page: postBy(uri: "${slug}") {
          id
          title
          content
          slug
          uri
          modified
          date
          featuredImage { 
            node {
              altText
              sourceUrl
              mediaDetails {
                height
                width
              }
            }
          }
          seo {
            breadcrumbs {
              text
              url
            }
            title
            canonical
            metaDesc
            metaRobotsNoindex
            metaRobotsNofollow
            opengraphAuthor
            opengraphDescription
            opengraphTitle
            opengraphImage {
              sourceUrl
            }
            opengraphSiteName
            opengraphPublishedTime
            opengraphModifiedTime
            schema {
              raw
            }
            twitterTitle
            twitterDescription
            twitterImage {
              sourceUrl
            }
          }
        }
      }
    `,
    {
      variables: {
        slug: slug,
      },
    })
  return data?.page
}

export async function getAllPosts() {
  const data = await fetchAPI(`
  {
    posts(first: 10000) { 
      edges {
        node {
          title
          excerpt
          slug
          date
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          categories {
            edges {
              node {
                name
              }
            }
          }
        }
      }
    }
  }
  `);
  return data?.posts;
}