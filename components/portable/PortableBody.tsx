import { PortableText, type PortableTextComponents } from '@portabletext/react';
import Image from 'next/image';
import { urlFor } from '../../lib/sanity/image';
import clsx from 'clsx';

interface Props { value: any; className?: string }

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2 className="mt-12 mb-4 text-3xl font-bold tracking-tight" id={slugify(children)}>{children}</h2>,
    h3: ({ children }) => <h3 className="mt-10 mb-3 text-2xl font-semibold tracking-tight" id={slugify(children)}>{children}</h3>,
    normal: ({ children }) => <p className="leading-relaxed mb-4 text-foreground/80 first:mt-0">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 border-primary pl-4 italic text-foreground/70">{children}</blockquote>
    )
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc ml-6 space-y-2 mb-6">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal ml-6 space-y-2 mb-6">{children}</ol>
  },
  listItem: {
    bullet: ({ children }) => <li className="pl-1 marker:text-primary">{children}</li>,
    number: ({ children }) => <li className="pl-1 marker:text-primary">{children}</li>
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => {
      const href = (value?.href || '') as string;
      const isExternal = href.startsWith('http');
      return <a href={href} target={isExternal? '_blank': undefined} rel={isExternal? 'noopener noreferrer': undefined} className="underline decoration-primary/40 hover:decoration-primary transition-colors">{children}</a>;
    }
  },
  types: {
    image: ({ value }) => {
      const url = urlFor(value)?.width(1200).quality(80).url();
      if(!url) return null;
      const alt = value?.alt || value?.caption || '';
      return (
        <figure className="my-8">
          <Image src={url} alt={alt} width={1200} height={675} className="rounded-xl border bg-muted object-cover w-full h-auto" />
          {alt && <figcaption className="mt-2 text-xs text-foreground/60">{alt}</figcaption>}
        </figure>
      );
    },
    callout: ({ value }) => (
      <div className={clsx('my-6 rounded-2xl border px-4 py-3 text-sm flex gap-3 items-start', calloutTone(value.tone))}>
        <span className="font-semibold mt-0.5">{value.title || 'Hinweis'}</span>
        <div className="leading-relaxed flex-1">{value.body}</div>
      </div>
    )
  }
};

function calloutTone(t?: string){
  switch(t){
    case 'info': return 'bg-blue-50 border-blue-200 text-blue-900';
    case 'warn': return 'bg-amber-50 border-amber-200 text-amber-900';
    case 'success': return 'bg-emerald-50 border-emerald-200 text-emerald-900';
    default: return 'bg-primary/5 border-primary/20';
  }
}

function slugify(children: any): string | undefined {
  try {
    const text = Array.isArray(children) ? children.join(' ') : String(children);
    return text.toLowerCase().replace(/[^a-z0-9\u00C0-\u017F]+/g,'-').replace(/^-+|-+$/g,'');
  } catch { return undefined; }
}

export function PortableBody({ value, className }: Props){
  if(!value || !Array.isArray(value) || value.length === 0) return null;
  return <div className={clsx('portable-body', className)}><PortableText value={value} components={components} /></div>;
}
