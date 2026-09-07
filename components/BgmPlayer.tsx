'use client'
import {useEffect, useRef, useState} from 'react'

type Props = { src?: string; autoplay?: boolean; loop?: boolean }

export default function BgmPlayer({src='', autoplay=true, loop=true}:Props){
  const ref=useRef<HTMLAudioElement>(null)
  const [playing,setPlaying]=useState(false)
  const [needsGesture,setNeedsGesture]=useState(false)

  useEffect(()=>{
    const audio=ref.current
    if(!audio || !src || !autoplay) return
    audio.volume=.45
    const tryPlay=async()=>{
      try{ await audio.play(); setPlaying(true); setNeedsGesture(false) }
      catch{ setNeedsGesture(true) }
    }
    void tryPlay()
  },[src,autoplay])

  const start=async()=>{
    const audio=ref.current
    if(!audio) return
    try{ await audio.play(); setPlaying(true); setNeedsGesture(false) }catch{}
  }

  const toggle=async()=>{
    const audio=ref.current
    if(!audio) return
    if(audio.paused){ await start() }else{ audio.pause(); setPlaying(false) }
  }

  if(!src) return null
  return <>
    <audio ref={ref} src={src} autoPlay={autoplay} loop={loop} preload="auto" onPlay={()=>setPlaying(true)} onPause={()=>setPlaying(false)} />
    <div className="bgmbar">
      <button className="bgmbtn" onClick={toggle}>{playing?'♫ BGM ON':'♫ BGM OFF'}</button>
      {needsGesture && <button className="bgmstart" onClick={start}>CLICK TO PLAY</button>}
    </div>
  </>
}
