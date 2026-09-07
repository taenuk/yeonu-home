'use client'
import Link from 'next/link'
import type {ReactNode} from 'react'
import {usePathname} from 'next/navigation'
import type {Banner,SiteSettings} from '@/lib/types'
import BgmPlayer from './BgmPlayer'

const items=[
 {href:'/',label:'HOME'},
 {href:'/chars',label:'CHARACTERS'},
 {href:'/rels',label:'PAIRS'},
 {href:'/prompts',label:'PROMPTS'},
 {href:'/links',label:'LINKS'},
 {href:'/friends',label:'FRIENDS'},
]
export default function SiteChrome({children,settings,moving,isAdmin=false}:{children:ReactNode;settings:SiteSettings;moving:Banner[];isAdmin?:boolean}){
 const pathname=usePathname()
 return <div className="shell">
  <aside className="side">
   <Link className="brand brandlink" href="/"><span>{settings.title||'YEONU'}</span><small>{settings.subtitle||'personal archive'}</small></Link>
   <nav className="nav">{items.map(i=><Link key={i.href} className={(pathname===i.href||pathname.startsWith(i.href+'/'))?'active':''} href={i.href}>{i.label}</Link>)}</nav>
   <div className="sidebottom"><span>archive · 2026</span>{isAdmin&&<Link href="/admin">ADMIN ↗</Link>}</div>
  </aside>
  <main className="main">
   <BgmPlayer src={settings.bgmUrl} autoplay={settings.bgmAutoplay} loop={settings.bgmLoop}/>
   <section className="ticker">{moving.length?<div className="track">{[...moving,...moving].map((b,i)=><a key={b.id+'-'+i} href={b.link_url||undefined} target={b.link_url?'_blank':undefined} rel="noreferrer"><img src={b.image_url} alt={b.alt||''}/></a>)}</div>:<div className="ticker-empty">WELCOME TO YEONU'S ARCHIVE · ADMIN에서 움직이는 이미지를 추가하세요</div>}</section>
   {children}
   <footer className="footer">YEONU · personal archive</footer>
  </main>
 </div>
}
