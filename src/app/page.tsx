import Image from "next/image";
import PostCard from "../../components/post-card/PostCard";
import { Post } from "../../interfaces";
import moment from 'moment';
import Link from "next/link";

async function getPosts(date?: string) {
  let res = await fetch(`http://localhost:3000/api/posts?date=${date}`, { cache: 'force-cache' });
  if (res.status !== 200) {
    return []
  }
  return res.json();
}

export default async function Home({searchParams}: {searchParams: any}) {

  let invisible = false;
  let current = searchParams.page || 0;
  let posts: any = await getPosts(moment().subtract(current, 'days').format('YYYY-MM-DD'));

  return (
    <>
      <div className="row">
        <div className="col mt-5 border-bottom border-black">
          <h1>
            The latest trends
          </h1>
        </div>
      </div>
      <div className="row mt-3">
        {posts && posts.length ? posts.map((post: Post) => (
          <div className="col-md-4 col-sm-6 p-1" key={post.slug}>
            <PostCard post={post} />
          </div>
        )) : <div className="col d-flex justify-content-center text-center">
          <Image src="/undraw_no_data_re_kwbl.svg" alt="no posts found" width={300} height={300} className="mt-5" />
        </div>}
      </div>
      <div className="row mt-3 mb-5">
        <div className="col d-flex justify-content-center">
          <Link href={`/?page=${Number(current) + 1}`}>
            <button className={`btn btn btn-light text-blod ${invisible ? 'invisible' : ''}`}>Show More</button>
          </Link>
        </div>
      </div>
    </>
  )
}
