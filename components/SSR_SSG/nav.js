import Link from 'next/link'

const Nav = () => {
  return (
    <nav>
      <Link href="/ssr">
        <a>SSR</a>
      </Link>
      <Link href="/ssg">
        <a>SSG</a>
      </Link>
      <style jsx>
        {`
          a {
            margin-right: 25px;
          }
        `}
      </style>
    </nav>
  )
}

export default Nav
