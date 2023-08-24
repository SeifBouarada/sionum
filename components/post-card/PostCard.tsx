'use client';

import Image from "next/image";
import Link from "next/link";
import { Post } from "../../interfaces";
import moment from 'moment';

export default function PostCard({ post }: { post: Post }) {
    const setRandomCategory = () => {
        const categories = ['business', 'entertainment', 'health', 'science', 'sports', 'technology'];

        return categories[Math.floor(Math.random() * categories.length)];
    }

    const link = `/category/${setRandomCategory()}/${post.slug}`;
    return (
        <Link href={link} className="link-underline link-underline-opacity-0" >
            <div className="card shadow rounded border border-0">
                {
                    post.thumbnail ? <Image src={post.thumbnail} className="card-img-top" width={350} height={350} alt={post.title} style={{
                        width: 'auto',
                        height: 'auto',
                    }} /> : <Image src="/img/default.jpeg" className="card-img-top" width={350} height={350} alt={post.title} />
                }
                <div className="card-body">
                    <h5 className="card-title">{post.title}</h5>
                    <p className="card-text" dangerouslySetInnerHTML={{ __html: post.description }}></p>
                    <div className="row">
                        <div className="col">
                            <Image src="/logo-sionum.png" alt="Sionum" width={40} height={40} style={{ position: 'relative', float: 'left', marginRight: '10px' }} />
                            <div className="ml-2" style={{ fontSize: '12px' }}>{post.author || 'Sionum'} . {post.source}</div>
                            <div className="ml-2" style={{ fontSize: '12px', fontWeight: 700 }}>{moment(post.createdAt).format('MMMM Do YYYY, h:mm a')}</div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}