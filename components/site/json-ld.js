// Structured data (schema.org) for search engines and AI answers. "<" is escaped so data can never close the tag.
export default function JsonLd({ data }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />
}
