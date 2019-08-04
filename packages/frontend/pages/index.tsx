import * as React from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';

const IndexPage: React.FunctionComponent = () => {
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <h1>hello Next.js 👋</h1>
      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
      </p>
      <Link href="/post/[id]" as={`/post/test`}>
        <a>testing page</a>
      </Link>
    </Layout>
  );
};

export default IndexPage;
