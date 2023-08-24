import Image from "next/image";
import PostCard from "@/components/post-card/PostCard";
import { Post } from "@/interfaces";
import moment from 'moment';
import Link from "next/link";
import Head from "next/head";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: 'Sionum.org - Your Source for Trending News and Blogs',
  description: 'Discover the latest trends and news on Sionum.org. Stay informed about the most relevant and innovative topics in fashion, technology, culture, and more.',
  keywords: 'Trending news, blog, fashion, technology, culture, trends, innovation, news articles',
  authors: {
    name: 'SIONUM Inc.',
    url: 'https://sionum.org',
  },
}

async function getPosts(date?: string) {
  let res = await fetch(`http://localhost:3000/api/posts?date=${date}`, { cache: 'force-cache' });
  if (res.status !== 200) {
    return []
  }
  return res.json();
}

export default async function Home({ searchParams }: { searchParams: any }) {

  let current = searchParams.page || 0;
  let posts: any = await getPosts(moment().subtract(current, 'days').format('YYYY-MM-DD'));
  let invisible = posts && posts.length === 0 ? true : false;

  function addHomeJsonLd() {
    return {
      __html: `
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Sionum",
        "url": "${process.env.BASE_URL}",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "${process.env.BASE_URL}/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      }
      `
    }
  }
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={addHomeJsonLd()}
          key="product-jsonld"
        />
      </Head>
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
          <Image src="/undraw-no-data-re-kwbl.svg" alt="no posts found" width={300} height={300} className="mt-5" />
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
