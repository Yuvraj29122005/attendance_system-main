import { readFileSync } from 'fs';
import { join } from 'path';

let cachedHtml = null;

export async function getServerSideProps({ res }) {
  if (!cachedHtml) {
    cachedHtml = readFileSync(join(process.cwd(), 'views', 'index.html'), 'utf-8');
  }
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
  res.end(cachedHtml);
  return { props: {} };
}

export default function Page() {
  return null;
}
