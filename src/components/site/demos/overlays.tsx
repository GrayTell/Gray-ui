'use client'

import * as React from 'react'
import { ChevronDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from '@/components/ui/menubar'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { GrayMark } from '@/components/site/logo'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'

/* --------------------------------- Dialog --------------------------------- */

export function DialogDemo() {
  const { toast } = useToast()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[340px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>Make changes, then save when you are done.</DialogDescription>
        </DialogHeader>
        <div className="space-y-3 py-1">
          <div className="space-y-1.5">
            <Label htmlFor="dialog-name">Name</Label>
            <Input id="dialog-name" defaultValue="Letsvan" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="dialog-handle">Handle</Label>
            <Input id="dialog-handle" defaultValue="@letsvan" />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={() => toast({ title: 'Profile saved', description: 'Your changes are live.' })}>
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

/* ------------------------------ Alert dialog ------------------------------ */

export function AlertDialogDemo() {
  const { toast } = useToast()

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="border-destructive/40 text-destructive hover:bg-destructive/10 hover:text-destructive"
        >
          Delete project
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete “aurora-site”?</AlertDialogTitle>
          <AlertDialogDescription>
            This permanently removes the project and all of its deploys. This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-white hover:bg-destructive/90"
            onClick={() =>
              toast({ title: 'Project deleted', description: '“aurora-site” is gone for good.' })
            }
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

/* ---------------------------------- Sheet --------------------------------- */

const SHEET_LINKS = ['Dashboard', 'Deployments', 'Analytics', 'Settings']

export function SheetDemo() {
  const [open, setOpen] = React.useState(false)
  const { toast } = useToast()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">Open menu sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
          <SheetDescription>Pick a section to visit.</SheetDescription>
        </SheetHeader>
        <nav className="mt-2 grid gap-1 px-4" aria-label="Sheet navigation">
          {SHEET_LINKS.map((link) => (
            <SheetClose asChild key={link}>
              <button
                type="button"
                onClick={() => toast({ title: link, description: 'In the real app this navigates.' })}
                className="rounded-md px-3 py-2 text-left text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                {link}
              </button>
            </SheetClose>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}

/* ---------------------------------- Drawer -------------------------------- */

export function DrawerDemo() {
  const { toast } = useToast()

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open bottom drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm pb-6">
          <DrawerHeader>
            <DrawerTitle>Invite collaborators</DrawerTitle>
            <DrawerDescription>Share the canvas with your team.</DrawerDescription>
          </DrawerHeader>
          <div className="grid gap-2 p-4">
            <DrawerClose asChild>
              <Button
                onClick={() =>
                  toast({ title: 'Link copied', description: 'Anyone with the link can join.' })
                }
              >
                Copy invite link
              </Button>
            </DrawerClose>
            <DrawerClose asChild>
              <Button variant="ghost">Not now</Button>
            </DrawerClose>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

/* --------------------------------- Popover -------------------------------- */

export function PopoverDemo() {
  const [width, setWidth] = React.useState(960)
  const [height, setHeight] = React.useState(540)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Canvas size</Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="grid gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="canvas-width">Width — {width}px</Label>
            <Slider
              id="canvas-width"
              value={[width]}
              onValueChange={(v) => setWidth(v[0] ?? width)}
              min={320}
              max={1600}
              step={20}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="canvas-height">Height — {height}px</Label>
            <Slider
              id="canvas-height"
              value={[height]}
              onValueChange={(v) => setHeight(v[0] ?? height)}
              min={240}
              max={1200}
              step={20}
            />
          </div>
          <p className="text-xs text-muted-foreground">Aspect ratio {(width / height).toFixed(2)} : 1</p>
        </div>
      </PopoverContent>
    </Popover>
  )
}

/* --------------------------------- Tooltip -------------------------------- */

export function TooltipDemo() {
  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover me</Button>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p>Yes — it works. Keyboard focus triggers it too.</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

/* -------------------------------- Hover card ------------------------------ */

export function HoverCardDemo() {
  return (
    <HoverCard openDelay={100} closeDelay={80}>
      <HoverCardTrigger asChild>
        <button
          type="button"
          className="font-medium underline decoration-dotted underline-offset-4 outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          @letsvan
        </button>
      </HoverCardTrigger>
      <HoverCardContent className="w-72">
        <div className="flex gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-foreground text-background">
            <GrayMark className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-semibold">
              Letsvan <span className="font-normal text-muted-foreground">@letsvan</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Building Gray UI at Graytell. Components with taste.
            </p>
            <p className="text-xs text-muted-foreground">Joined March 2024 · 12.4k followers</p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}

/* ------------------------------ Dropdown menu ----------------------------- */

export function DropdownMenuDemo() {
  const { toast } = useToast()
  const [slack, setSlack] = React.useState(true)
  const notify = (title: string) => toast({ title, description: 'Menu action triggered.' })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          Team options
          <ChevronDown className="ml-1 h-4 w-4" aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52">
        <DropdownMenuLabel>Graytell Studio</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => notify('Invite members')}>Invite members</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => notify('Billing')}>Billing & plans</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => notify('API keys')}>API keys</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem checked={slack} onCheckedChange={(v) => setSlack(v === true)}>
          Slack alerts
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={() => notify('Left the team')}
          className="text-destructive focus:text-destructive"
        >
          Leave team
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/* ------------------------------ Context menu ------------------------------ */

export function ContextMenuDemo() {
  const { toast } = useToast()
  const [grid, setGrid] = React.useState(false)

  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-32 w-full select-none items-center justify-center rounded-lg border border-dashed bg-muted/40 text-sm text-muted-foreground">
        Right-click anywhere in this box
      </ContextMenuTrigger>
      <ContextMenuContent className="w-48">
        <ContextMenuItem onSelect={() => toast({ title: 'Refreshed' })}>Refresh</ContextMenuItem>
        <ContextMenuItem onSelect={() => toast({ title: 'Duplicated' })}>Duplicate</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem checked={grid} onCheckedChange={(v) => setGrid(v === true)}>
          Show grid
        </ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuItem
          onSelect={() => toast({ title: 'Deleted', description: 'Nothing actually happened.' })}
          className="text-destructive focus:text-destructive"
        >
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

/* --------------------------------- Menubar -------------------------------- */

export function MenubarDemo() {
  const { toast } = useToast()
  const [zoom, setZoom] = React.useState(true)
  const [rulers, setRulers] = React.useState(false)

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onSelect={() => toast({ title: 'New canvas created' })}>
            New canvas
            <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarItem onSelect={() => toast({ title: 'Saved' })}>
            Save
            <MenubarShortcut>⌘S</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem onSelect={() => toast({ title: 'Exported as PNG' })}>Export PNG…</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onSelect={() => toast({ title: 'Undo' })}>Undo</MenubarItem>
          <MenubarItem onSelect={() => toast({ title: 'Redo' })}>Redo</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem checked={zoom} onCheckedChange={(v) => setZoom(v === true)}>
            Zoom controls
          </MenubarCheckboxItem>
          <MenubarCheckboxItem checked={rulers} onCheckedChange={(v) => setRulers(v === true)}>
            Rulers
          </MenubarCheckboxItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}

/* --------------------------------- Command -------------------------------- */

const SUGGESTIONS = ['Calendar', 'Search emoji', 'Calculator']

export function CommandDemo() {
  const { toast } = useToast()

  return (
    <Command className="w-full max-w-[300px] rounded-lg border shadow-sm">
      <CommandInput placeholder="Type a command or search…" />
      <CommandList className="max-h-52">
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          {SUGGESTIONS.map((s) => (
            <CommandItem
              key={s}
              value={s}
              onSelect={() => toast({ title: s, description: 'Command selected.' })}
            >
              <span>{s}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
