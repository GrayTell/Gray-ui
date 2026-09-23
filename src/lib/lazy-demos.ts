/**
 * Lazy wrappers for the demo batches.
 *
 * The /components explorer renders ONE demo at a time, but statically
 * importing every demo file pulls all 54 components into the page graph.
 * Code-splitting keeps /, /docs and /components light — each batch chunk
 * compiles on demand when a component is selected.
 */
import type { ComponentType } from 'react'

import dynamic from 'next/dynamic'

const load = (file: string) => () => import(`@/components/site/demos/${file}`)

function lazyFrom(file: string, key: string): ComponentType {
  return dynamic(() =>
    load(file)().then(
      (m) => m[key as keyof Awaited<ReturnType<ReturnType<typeof load>>>] as ComponentType
    )
  )
}

/* Controls */
export const ButtonDemo = lazyFrom('controls', 'ButtonDemo')
export const CheckboxDemo = lazyFrom('controls', 'CheckboxDemo')
export const RadioGroupDemo = lazyFrom('controls', 'RadioGroupDemo')
export const SliderDemo = lazyFrom('controls', 'SliderDemo')
export const SwitchDemo = lazyFrom('controls', 'SwitchDemo')
export const ToggleDemo = lazyFrom('controls', 'ToggleDemo')

/* Inputs */
export const CalendarDemo = lazyFrom('inputs', 'CalendarDemo')
export const ComboboxDemo = lazyFrom('inputs', 'ComboboxDemo')
export const FormDemo = lazyFrom('inputs', 'FormDemo')
export const InputDemo = lazyFrom('inputs', 'InputDemo')
export const OTPDemo = lazyFrom('inputs', 'OTPDemo')
export const SelectDemo = lazyFrom('inputs', 'SelectDemo')
export const TextareaDemo = lazyFrom('inputs', 'TextareaDemo')

/* Overlays */
export const AlertDialogDemo = lazyFrom('overlays', 'AlertDialogDemo')
export const CommandDemo = lazyFrom('overlays', 'CommandDemo')
export const ContextMenuDemo = lazyFrom('overlays', 'ContextMenuDemo')
export const DialogDemo = lazyFrom('overlays', 'DialogDemo')
export const DrawerDemo = lazyFrom('overlays', 'DrawerDemo')
export const DropdownMenuDemo = lazyFrom('overlays', 'DropdownMenuDemo')
export const HoverCardDemo = lazyFrom('overlays', 'HoverCardDemo')
export const MenubarDemo = lazyFrom('overlays', 'MenubarDemo')
export const PopoverDemo = lazyFrom('overlays', 'PopoverDemo')
export const SheetDemo = lazyFrom('overlays', 'SheetDemo')
export const TooltipDemo = lazyFrom('overlays', 'TooltipDemo')

/* Extra */
export const ButtonGroupDemo = lazyFrom('extra', 'ButtonGroupDemo')
export const EmptyDemo = lazyFrom('extra', 'EmptyDemo')
export const FieldDemo = lazyFrom('extra', 'FieldDemo')
export const ItemDemo = lazyFrom('extra', 'ItemDemo')
export const KbdDemo = lazyFrom('extra', 'KbdDemo')
export const LabelDemo = lazyFrom('extra', 'LabelDemo')
export const SidebarDemo = lazyFrom('extra', 'SidebarDemo')
export const SonnerDemo = lazyFrom('extra', 'SonnerDemo')
export const SpinnerDemo = lazyFrom('extra', 'SpinnerDemo')
export const ToggleGroupDemo = lazyFrom('extra', 'ToggleGroupDemo')

/* Display */
export const AccordionDemo = lazyFrom('display', 'AccordionDemo')
export const AlertDemo = lazyFrom('display', 'AlertDemo')
export const AspectRatioDemo = lazyFrom('display', 'AspectRatioDemo')
export const AvatarDemo = lazyFrom('display', 'AvatarDemo')
export const BadgeDemo = lazyFrom('display', 'BadgeDemo')
export const CardDemo = lazyFrom('display', 'CardDemo')
export const CarouselDemo = lazyFrom('display', 'CarouselDemo')
export const CollapsibleDemo = lazyFrom('display', 'CollapsibleDemo')
export const SeparatorDemo = lazyFrom('display', 'SeparatorDemo')
export const SkeletonDemo = lazyFrom('display', 'SkeletonDemo')
export const TabsDemo = lazyFrom('display', 'TabsDemo')

/* Data */
export const BreadcrumbDemo = lazyFrom('data', 'BreadcrumbDemo')
export const ChartDemo = lazyFrom('data', 'ChartDemo')
export const NavigationMenuDemo = lazyFrom('data', 'NavigationMenuDemo')
export const PaginationDemo = lazyFrom('data', 'PaginationDemo')
export const ProgressDemo = lazyFrom('data', 'ProgressDemo')
export const ResizableDemo = lazyFrom('data', 'ResizableDemo')
export const ScrollAreaDemo = lazyFrom('data', 'ScrollAreaDemo')
export const TableDemo = lazyFrom('data', 'TableDemo')
export const ToastDemo = lazyFrom('data', 'ToastDemo')

/* Loaders */
export const ArcSweepDemo = lazyFrom('loaders', 'ArcSweepDemo')
export const BinaryOrbitDemo = lazyFrom('loaders', 'BinaryOrbitDemo')
export const BlinkDotsDemo = lazyFrom('loaders', 'BlinkDotsDemo')
export const BlockCornersDemo = lazyFrom('loaders', 'BlockCornersDemo')
export const BlockMarchDemo = lazyFrom('loaders', 'BlockMarchDemo')
export const BlockOrbitDemo = lazyFrom('loaders', 'BlockOrbitDemo')
export const BlockSlideDemo = lazyFrom('loaders', 'BlockSlideDemo')
export const BlockSnakeDemo = lazyFrom('loaders', 'BlockSnakeDemo')
export const BlockTrackDemo = lazyFrom('loaders', 'BlockTrackDemo')
export const BreatheDotsDemo = lazyFrom('loaders', 'BreatheDotsDemo')
export const ChatTypingDemo = lazyFrom('loaders', 'ChatTypingDemo')
export const ClockworkDemo = lazyFrom('loaders', 'ClockworkDemo')
export const DashBloomDemo = lazyFrom('loaders', 'DashBloomDemo')
export const DashOrbitDemo = lazyFrom('loaders', 'DashOrbitDemo')
export const DotHaloDemo = lazyFrom('loaders', 'DotHaloDemo')
export const EchoRingDemo = lazyFrom('loaders', 'EchoRingDemo')
export const EllipsisDemo = lazyFrom('loaders', 'EllipsisDemo')
export const FadeTextDemo = lazyFrom('loaders', 'FadeTextDemo')
export const FanBladeDemo = lazyFrom('loaders', 'FanBladeDemo')
export const FigureEightDemo = lazyFrom('loaders', 'FigureEightDemo')
export const FloatDotsDemo = lazyFrom('loaders', 'FloatDotsDemo')
export const FrameScanDemo = lazyFrom('loaders', 'FrameScanDemo')
export const GlossSweepDemo = lazyFrom('loaders', 'GlossSweepDemo')
export const GooglyEyesDemo = lazyFrom('loaders', 'GooglyEyesDemo')
export const GradientArcDemo = lazyFrom('loaders', 'GradientArcDemo')
export const HaloDemo = lazyFrom('loaders', 'HaloDemo')
export const HeartbeatDemo = lazyFrom('loaders', 'HeartbeatDemo')
export const JumpDotsDemo = lazyFrom('loaders', 'JumpDotsDemo')
export const LemniscateDemo = lazyFrom('loaders', 'LemniscateDemo')
export const OrbitDotDemo = lazyFrom('loaders', 'OrbitDotDemo')
export const PixelDiamondDemo = lazyFrom('loaders', 'PixelDiamondDemo')
export const PixelPatrolDemo = lazyFrom('loaders', 'PixelPatrolDemo')
export const PromptCaretDemo = lazyFrom('loaders', 'PromptCaretDemo')
export const PulseBarsDemo = lazyFrom('loaders', 'PulseBarsDemo')
export const ScaffoldDemo = lazyFrom('loaders', 'ScaffoldDemo')
export const ShimmerWaveDemo = lazyFrom('loaders', 'ShimmerWaveDemo')
export const ShootingStarDemo = lazyFrom('loaders', 'ShootingStarDemo')
export const SoftPulseDemo = lazyFrom('loaders', 'SoftPulseDemo')
export const SonarDemo = lazyFrom('loaders', 'SonarDemo')
export const SoundWaveDemo = lazyFrom('loaders', 'SoundWaveDemo')
export const SaturnDemo = lazyFrom('loaders', 'SaturnDemo')
export const TickRingDemo = lazyFrom('loaders', 'TickRingDemo')
export const TideDemo = lazyFrom('loaders', 'TideDemo')
export const TrioOrbitDemo = lazyFrom('loaders', 'TrioOrbitDemo')
export const TurbineDemo = lazyFrom('loaders', 'TurbineDemo')
export const TwinArcDemo = lazyFrom('loaders', 'TwinArcDemo')
export const VortexDemo = lazyFrom('loaders', 'VortexDemo')
