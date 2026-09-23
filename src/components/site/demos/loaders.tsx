'use client'

import * as React from 'react'

import { ArcSweep } from '@/registry/items/arc-sweep'
import { BinaryOrbit } from '@/registry/items/binary-orbit'
import { BlinkDots } from '@/registry/items/blink-dots'
import { BlockCorners } from '@/registry/items/block-corners'
import { BlockMarch } from '@/registry/items/block-march'
import { BlockOrbit } from '@/registry/items/block-orbit'
import { BlockSlide } from '@/registry/items/block-slide'
import { BlockSnake } from '@/registry/items/block-snake'
import { BlockTrack } from '@/registry/items/block-track'
import { BreatheDots } from '@/registry/items/breathe-dots'
import { ChatTyping } from '@/registry/items/chat-typing'
import { Clockwork } from '@/registry/items/clockwork'
import { DashBloom } from '@/registry/items/dash-bloom'
import { DashOrbit } from '@/registry/items/dash-orbit'
import { DotHalo } from '@/registry/items/dot-halo'
import { EchoRing } from '@/registry/items/echo-ring'
import { Ellipsis } from '@/registry/items/ellipsis'
import { FadeText } from '@/registry/items/fade-text'
import { FanBlade } from '@/registry/items/fan-blade'
import { FigureEight } from '@/registry/items/figure-eight'
import { FloatDots } from '@/registry/items/float-dots'
import { FrameScan } from '@/registry/items/frame-scan'
import { GlossSweep } from '@/registry/items/gloss-sweep'
import { GooglyEyes } from '@/registry/items/googly-eyes'
import { GradientArc } from '@/registry/items/gradient-arc'
import { Halo } from '@/registry/items/halo'
import { Heartbeat } from '@/registry/items/heartbeat'
import { JumpDots } from '@/registry/items/jump-dots'
import { Lemniscate } from '@/registry/items/lemniscate'
import { OrbitDot } from '@/registry/items/orbit-dot'
import { PixelDiamond } from '@/registry/items/pixel-diamond'
import { PixelPatrol } from '@/registry/items/pixel-patrol'
import { PromptCaret } from '@/registry/items/prompt-caret'
import { PulseBars } from '@/registry/items/pulse-bars'
import { Scaffold } from '@/registry/items/scaffold'
import { ShimmerWave } from '@/registry/items/shimmer-wave'
import { ShootingStar } from '@/registry/items/shooting-star'
import { SoftPulse } from '@/registry/items/soft-pulse'
import { Sonar } from '@/registry/items/sonar'
import { SoundWave } from '@/registry/items/sound-wave'
import { Saturn } from '@/registry/items/saturn'
import { TickRing } from '@/registry/items/tick-ring'
import { Tide } from '@/registry/items/tide'
import { TrioOrbit } from '@/registry/items/trio-orbit'
import { Turbine } from '@/registry/items/turbine'
import { TwinArc } from '@/registry/items/twin-arc'
import { Vortex } from '@/registry/items/vortex'

/* Shared centering stage for the loader previews. */
function Stage({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center justify-center py-10">{children}</div>
}

export function HaloDemo() {
  return (
    <Stage>
      <Halo className="size-8" />
    </Stage>
  )
}

export function ArcSweepDemo() {
  return (
    <Stage>
      <ArcSweep className="size-8" />
    </Stage>
  )
}

export function TwinArcDemo() {
  return (
    <Stage>
      <TwinArc className="size-8" />
    </Stage>
  )
}

export function FanBladeDemo() {
  return (
    <Stage>
      <FanBlade className="size-8" />
    </Stage>
  )
}

export function SaturnDemo() {
  return (
    <Stage>
      <Saturn className="size-8" />
    </Stage>
  )
}

export function EchoRingDemo() {
  return (
    <Stage>
      <EchoRing className="size-8" />
    </Stage>
  )
}

export function OrbitDotDemo() {
  return (
    <Stage>
      <OrbitDot className="size-8" />
    </Stage>
  )
}

export function ClockworkDemo() {
  return (
    <Stage>
      <Clockwork className="size-8" />
    </Stage>
  )
}

export function TickRingDemo() {
  return (
    <Stage>
      <TickRing className="size-8" />
    </Stage>
  )
}

export function TurbineDemo() {
  return (
    <Stage>
      <Turbine className="size-8" />
    </Stage>
  )
}

export function DashOrbitDemo() {
  return (
    <Stage>
      <DashOrbit className="size-8" />
    </Stage>
  )
}

export function DashBloomDemo() {
  return (
    <Stage>
      <DashBloom className="size-8" />
    </Stage>
  )
}

export function GradientArcDemo() {
  return (
    <Stage>
      <GradientArc className="size-8" />
    </Stage>
  )
}

export function ShootingStarDemo() {
  return (
    <Stage>
      <ShootingStar className="size-8" />
    </Stage>
  )
}

export function LemniscateDemo() {
  return (
    <Stage>
      <Lemniscate className="size-10" />
    </Stage>
  )
}

export function FigureEightDemo() {
  return (
    <Stage>
      <FigureEight className="size-8" />
    </Stage>
  )
}

export function PixelDiamondDemo() {
  return (
    <Stage>
      <PixelDiamond className="size-8" />
    </Stage>
  )
}

export function BlinkDotsDemo() {
  return (
    <Stage>
      <BlinkDots className="text-2xl" />
    </Stage>
  )
}

export function FloatDotsDemo() {
  return (
    <Stage>
      <FloatDots className="text-2xl" />
    </Stage>
  )
}

export function JumpDotsDemo() {
  return (
    <Stage>
      <JumpDots className="text-2xl" />
    </Stage>
  )
}

export function BreatheDotsDemo() {
  return (
    <Stage>
      <BreatheDots className="text-2xl" />
    </Stage>
  )
}

export function ChatTypingDemo() {
  return (
    <Stage>
      <ChatTyping className="text-2xl" />
    </Stage>
  )
}

export function HeartbeatDemo() {
  return (
    <Stage>
      <Heartbeat className="size-3" />
    </Stage>
  )
}

export function SoftPulseDemo() {
  return (
    <Stage>
      <SoftPulse className="size-9" />
    </Stage>
  )
}

export function SonarDemo() {
  return (
    <Stage>
      <Sonar className="size-9" />
    </Stage>
  )
}

export function DotHaloDemo() {
  return (
    <Stage>
      <DotHalo className="size-8" />
    </Stage>
  )
}

export function VortexDemo() {
  return (
    <Stage>
      <Vortex className="size-8" />
    </Stage>
  )
}

export function TrioOrbitDemo() {
  return (
    <Stage>
      <TrioOrbit className="size-8" />
    </Stage>
  )
}

export function BinaryOrbitDemo() {
  return (
    <Stage>
      <BinaryOrbit className="size-8" />
    </Stage>
  )
}

export function PulseBarsDemo() {
  return (
    <Stage>
      <PulseBars className="text-3xl" />
    </Stage>
  )
}

export function SoundWaveDemo() {
  return (
    <Stage>
      <SoundWave className="text-3xl" />
    </Stage>
  )
}

export function ScaffoldDemo() {
  return (
    <Stage>
      <div className="w-48 space-y-2">
        <Scaffold className="h-3" />
        <Scaffold className="h-3 w-3/4" />
        <Scaffold className="h-3 w-1/2" />
      </div>
    </Stage>
  )
}

export function FrameScanDemo() {
  return (
    <Stage>
      <FrameScan />
    </Stage>
  )
}

export function GooglyEyesDemo() {
  return (
    <Stage>
      <GooglyEyes className="text-5xl" />
    </Stage>
  )
}

export function BlockSlideDemo() {
  return (
    <Stage>
      <BlockSlide />
    </Stage>
  )
}

export function BlockMarchDemo() {
  return (
    <Stage>
      <BlockMarch />
    </Stage>
  )
}

export function PixelPatrolDemo() {
  return (
    <Stage>
      <PixelPatrol />
    </Stage>
  )
}

export function BlockTrackDemo() {
  return (
    <Stage>
      <BlockTrack />
    </Stage>
  )
}

export function BlockCornersDemo() {
  return (
    <Stage>
      <BlockCorners />
    </Stage>
  )
}

export function BlockOrbitDemo() {
  return (
    <Stage>
      <BlockOrbit />
    </Stage>
  )
}

export function BlockSnakeDemo() {
  return (
    <Stage>
      <BlockSnake />
    </Stage>
  )
}

export function TideDemo() {
  return (
    <Stage>
      <Tide />
    </Stage>
  )
}

export function PromptCaretDemo() {
  return (
    <Stage>
      <PromptCaret />
    </Stage>
  )
}

export function FadeTextDemo() {
  return (
    <Stage>
      <FadeText className="text-lg">Loading content</FadeText>
    </Stage>
  )
}

export function EllipsisDemo() {
  return (
    <Stage>
      <Ellipsis className="text-lg">Fetching results</Ellipsis>
    </Stage>
  )
}

export function ShimmerWaveDemo() {
  return (
    <Stage>
      <ShimmerWave className="text-lg">Generating response</ShimmerWave>
    </Stage>
  )
}

export function GlossSweepDemo() {
  return (
    <Stage>
      <GlossSweep className="text-lg">Polishing details</GlossSweep>
    </Stage>
  )
}
