// import Image from "next/image";

import Image from "next/image";
import { Post } from "../../../../../interfaces";

// import Link from "next/link";
async function getPosts(slug?: string) {
    let res = await fetch(`http://localhost:3000/api/posts?slug=${slug}`, { cache: 'force-cache' });
    if (res.status !== 200) {
        return []
    }
    return res.json();
}
export default async function PostDetail({ params }: { params: { slug: string } }) {
    const post: Post = await getPosts(params.slug);
    return (
        <>
            <div className="row">
                <div className="col mt-5 border-bottom border-black">
                    <h1>{post.title}</h1>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col d-flex justify-content-center">
                    <img src={post.thumbnail} className="img-fluid" alt={post.title} />
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