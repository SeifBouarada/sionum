import { Post } from "@/interfaces";
import Head from "next/head";
import dotenv from "dotenv";
dotenv.config();

async function getPosts(slug?: string) {
    let res = await fetch(`${process.env.BASE_URL}/api/posts?slug=${slug}`, { cache: 'force-cache' });
    if (res.status !== 200) {
        return []
    }
    return res.json();
}
export default async function PostDetail({ params }: { params: { slug: string } }) {
    const post: Post = await getPosts(params.slug);

    function addPostJsonLd() {
        return {
            __html: `
            {
                "@context": "https://schema.org",
                "@type": "Article",
                "mainEntityOfPage": {
                    "@type": "WebPage",
                    "@id": "${process.env.BASE_URL}"
                },
                "headline": "${post.title}",
                "description": "${post.description}",
                "image": "${post.thumbnail || '/assets/img/default.jpeg'}",
                "author": {
                    "@type": "Person",
                    "name": "${post.author || 'Sionum'}"
                },
                "publisher": {
                    "@type": "Organization",
                    "name": "Sionum",
                    "logo": {
                        "@type": "ImageObject",
                        "url": "${process.env.BASE_URL}/logo-sionum.svg"
                    }
                },
                "datePublished": "${post.createdAt}",
                "dateModified": "${post.createdAt}"
            }
            `
        }
    }

    return (
        <>
            <Head>
                <title>{post.title}</title>
                <meta name="description" content={post.description} />
                <meta property="og:title" content={post.title} />
                <meta property="og:description" content={post.description} />
                <meta property="og:image" content={post.thumbnail || '/assets/img/default.jpeg'} />
                <meta property="og:url" content={`${process.env.BASE_URL}`} />
                <meta property="og:site_name" content="Sionum" />
                <meta property="og:type" content="article" />
                <meta property="article:published_time" content={post.createdAt} />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={addPostJsonLd()}
                    key="product-jsonld"
                />
            </Head>
            <div className="row">
                <div className="col mt-5 border-bottom border-black">
                    <h1>{post.title}</h1>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col d-flex justify-content-center">
                    <img src={post.thumbnail || '/assets/img/default.jpeg'} className="img-fluid" alt={post.title} />
                </div>
            </div>
            <div className="row mt-3">
                <div className="col">
                    <div dangerouslySetInnerHTML={{ __html: post.content ? post.content.replace(/(?:\r\n|\r|\n)/g, '<br>').replace(/\[\+(\d+)\schars\]/g, `<a class="btn btn-link" href="${post.url}" target="_blank" title="${post.title}">Read more </a>`) : '' }}></div>
                </div>
            </div>
        </>
    )
}