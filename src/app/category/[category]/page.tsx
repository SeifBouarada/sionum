import Image from "next/image";
import PostCard from "@/components/post-card/PostCard";
import { Post } from "@/interfaces";
import Link from "next/link";
import moment from 'moment';

async function getPosts(date?: string, category?: string) {
    let res = await fetch(`http://localhost:3000/api/posts?date=${date}&category=${category}`, { cache: 'force-cache' });
    if (res.status !== 200) {
        return []
    }
    return res.json();
}

export default async function Category({ params, searchParams }: { params: { category: string }, searchParams: any }) {
    let current = searchParams.page || 0;
    let posts: any = await getPosts(moment().subtract(current, 'days').format('YYYY-MM-DD'), params.category);
    let invisible = posts && posts.length === 0 ? true : false;

    return (
        <>
            <div className="row">
                <div className="col mt-5 border-bottom border-black">
                    <h1>{params.category.charAt(0).toUpperCase() + params.category.slice(1)}</h1>
                </div>
            </div>
            <div className="row mt-3">
                {posts && posts.length ? posts.map((post: Post) => (
                    <div className="col-md-4 col-sm-6 p-1" key={post.slug}>
                        <PostCard post={post} category={params.category} />
                    </div>
                )) : <div className="col d-flex justify-content-center text-center">
                    <Image src="/undraw-no-data-re-kwbl.svg" alt="no posts found" width={300} height={300} className="mt-5" />
                </div>}
            </div>
            <div className="row mt-3">
                <div className="col d-flex justify-content-center">
                    <Link href={`/category/${params.category}?page=${Number(current) + 1}`}>
                        <button className={`btn btn btn-light text-blod ${invisible ? 'invisible' : ''}`}>Show More</button>
                    </Link>
                </div>
            </div>
            <div className={`row ${!posts || posts.length === 0 ? 'visible mt-3 mb-5' : 'invisible'}`}>
                <div className="col text-center">
                    <Link href={`/category/${params.category}?page=${current > 0 ? Number(current) - 1 : 0}`}>
                        <button className="btn btn-light">
                            Previous page
                        </button>
                    </Link>
                </div>
            </div>
        </>
    )
}