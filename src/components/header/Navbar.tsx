import Link from 'next/link';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
export default function Navbar() {
    const links = [
        { name: 'Business', href: '/category/business', current: true },
        { name: 'Entertainment', href: '/category/entertainment', current: true },
        { name: 'Health', href: '/category/health', current: true },
        { name: 'Science', href: '/category/science', current: true },
        { name: 'Sports', href: '/category/sports', current: true },
        { name: 'Technology', href: '/category/technology', current: true },
    ];

    return (
        <nav className="navbar navbar-expand-lg fixed-top bg-white">
            <div className="container">
                <Link className='navbar-brand' href="/">
                    <Image src="/logo-sionum.svg" alt="Sionum" width={32} height={32} />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {links.map((link) => (
                            <li className="nav-item" key={uuidv4()}>
                                <Link className={`nav-link ${link.current ? 'active' : ''}`} key={uuidv4()} href={link.href}>
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    )
}