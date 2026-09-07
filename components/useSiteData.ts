'use client'
import {useEffect,useState} from 'react'
import {supabase} from '@/lib/supabase'
import type {Banner,Character,LinkItem,Prompt,SiteSettings,Pair,PairLog} from '@/lib/types'
export const fallback:SiteSettings={title:'YEONU',subtitle:'personal archive',profileName:'여누',profileImage:'',about:'안녕하세요, 여누입니다.\n\n주로 짤뽑, 프롬 공유, 교류를 하고 있으며,\n주로 비계에서 지냈어서 아직 앵챗계가 익숙하지 않기에 틧이 적고 답멘이 느릴 수 있습니다.\n트친 한 분, 한 분 어떻게든 교류하려고 하고 있지만 내향적인 성격이라 그러지 못 할 때도 있습니다.',love:[],hate:[],bgmUrl:'',bgmAutoplay:true,bgmLoop:true}
export function useSiteData(){
 const db=supabase(); const [data,setData]=useState({settings:fallback,characters:[] as Character[],prompts:[] as Prompt[],links:[] as LinkItem[],moving:[] as Banner[],friends:[] as Banner[],pairs:[] as Pair[],logs:[] as PairLog[],isAdmin:false,loading:true})
 useEffect(()=>{let alive=true;(async()=>{const [s,c,p,l,m,f,prs,logs,u]=await Promise.all([
  db.from('site_settings').select('*').single(),db.from('characters').select('*').order('sort_order'),db.from('prompts').select('*').order('sort_order'),db.from('links').select('*').order('sort_order'),db.from('moving_banners').select('*').order('sort_order'),db.from('friend_banners').select('*').order('sort_order'),db.from('pairs').select('*').order('sort_order'),db.from('pair_logs').select('*').order('sort_order'),db.auth.getUser()])
  let admin=false;if(u.data.user){const q=await db.from('profiles').select('role').eq('id',u.data.user.id).single();admin=q.data?.role==='admin'}
  if(alive)setData({settings:{...fallback,...(s.data?.data||{})},characters:c.data||[],prompts:p.data||[],links:l.data||[],moving:m.data||[],friends:f.data||[],pairs:prs.data||[],logs:logs.data||[],isAdmin:admin,loading:false})
 })();return()=>{alive=false}},[])
 return data
}
export function charsForPair(pair:Pair,chars:Character[]){return [chars.find(c=>c.id===pair.character_one_id)?.name,chars.find(c=>c.id===pair.character_two_id)?.name].filter(Boolean).join(' × ')||'PAIR'}
