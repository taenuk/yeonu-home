export type SiteSettings = {
  title: string; subtitle: string; profileName: string; profileImage: string; about: string; love: string[]; hate: string[]; bgmUrl: string; bgmAutoplay: boolean; bgmLoop: boolean;
}
export type Character = { id:string; name:string; image_url:string; summary:string; details:string; sort_order:number }
export type Prompt = { id:string; title:string; category:string; tags:string[]; body:string; sort_order:number }
export type LinkItem = { id:string; title:string; description:string; url:string; sort_order:number }
export type Banner = { id:string; image_url:string; link_url:string; alt:string; sort_order:number }
export type Pair = { id:string; name:string; character_one_id:string|null; character_two_id:string|null; image_url:string; description:string; tags:string[]; sort_order:number }
export type PairLog = { id:string; pair_id:string; title:string; body:string; log_date:string|null; sort_order:number }
