'use client'
import SiteChrome from '@/components/SiteChrome';import {useSiteData} from '@/components/useSiteData'
export default function Links(){const d=useSiteData();return <SiteChrome settings={d.settings} moving={d.moving} isAdmin={d.isAdmin}><section className="section pageintro"><div className="eyebrow">LINKS</div><h1>elsewhere</h1><p>여누의 다른 공간들</p></section><div className="links">{d.links.map(l=><a className="linkrow" key={l.id} href={l.url} target="_blank" rel="noreferrer"><span><b>{l.title}</b><br/><small>{l.description}</small></span><span>↗</span></a>)}</div></SiteChrome>}
