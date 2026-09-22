import { createElement, type ComponentType } from 'react'

import { ClaimableBalance } from '@/registry/items/claimable-balance'
import { ContributionChart } from '@/registry/items/contribution-chart'
import { SavingsTargets } from '@/registry/items/savings-targets'
import { DividendCard } from '@/registry/items/dividend'
import { PaymentsCard } from '@/registry/items/payments'
import { SettingsNav } from '@/registry/items/settings-nav'
import { DatePicker } from '@/registry/items/date-picker'
import { AI_ENTRIES_SORTED } from '@/lib/component-registry-ai'
import {
  AccordionDemo,
  AlertDialogDemo,
  AlertDemo,
  AspectRatioDemo,
  AvatarDemo,
  BadgeDemo,
  BreadcrumbDemo,
  ButtonDemo,
  ButtonGroupDemo,
  CalendarDemo,
  CardDemo,
  CarouselDemo,
  ChartDemo,
  CheckboxDemo,
  CollapsibleDemo,
  ComboboxDemo,
  CommandDemo,
  ContextMenuDemo,
  DialogDemo,
  DrawerDemo,
  DropdownMenuDemo,
  EmptyDemo,
  FieldDemo,
  FormDemo,
  HoverCardDemo,
  InputDemo,
  ItemDemo,
  KbdDemo,
  LabelDemo,
  MenubarDemo,
  NavigationMenuDemo,
  OTPDemo,
  PaginationDemo,
  PopoverDemo,
  ProgressDemo,
  RadioGroupDemo,
  ResizableDemo,
  ScrollAreaDemo,
  SelectDemo,
  SeparatorDemo,
  SheetDemo,
  SidebarDemo,
  SkeletonDemo,
  SliderDemo,
  SonnerDemo,
  SpinnerDemo,
  SwitchDemo,
  TableDemo,
  TabsDemo,
  TextareaDemo,
  ToastDemo,
  ToggleDemo,
  ToggleGroupDemo,
  TooltipDemo,
} from '@/lib/lazy-demos'

export type ComponentCategory =
  | 'AI'
  | 'Controls'
  | 'Inputs'
  | 'Overlays'
  | 'Navigation'
  | 'Display'
  | 'Data'

export interface ComponentEntry {
  /** kebab-case slug used in URLs and install commands */
  slug: string
  /** human readable name */
  name: string
  category: ComponentCategory
  description: string
  /** live interactive demo component */
  Demo: ComponentType
  /** usage snippet shown in the Code tab */
  code: string
}

export const CATEGORY_ORDER: ComponentCategory[] = [
  'AI',
  'Controls',
  'Inputs',
  'Overlays',
  'Navigation',
  'Display',
  'Data',
]

/** Recently added components — surfaced in the "New Components" grid. */
export const NEW_COMPONENTS = [
  'shimmer',
  'chain-of-thought',
  'conversation',
  'prompt-input',
  'date-picker',
]

/* --------------------------- Signature cards ---------------------------- */

/**
 * Demo wrapper: centers the self-contained card at a sensible max-width so
 * it sits nicely in the preview grid.
 * (Uses createElement — this module is a .ts file, no JSX.)
 */
function centeredDemo(Comp: ComponentType, width: string, name: string): ComponentType {
  const Demo = () =>
    createElement(
      'div',
      { className: 'flex w-full justify-center' },
      createElement('div', { className: width }, createElement(Comp))
    )
  Demo.displayName = `${name}Demo`
  return Demo
}

const FEATURED: ComponentEntry[] = [
  {
    slug: 'claimable-balance',
    name: 'Claimable Balance',
    category: 'Data',
    description:
      'A payout summary card with balance, fees and a full line-by-line report behind one click. Built on Card-style layout, Badge and Dialog.',
    Demo: centeredDemo(ClaimableBalance, 'max-w-sm', 'ClaimableBalance'),
    code: `import { ClaimableBalance } from "@/components/gray/claimable-balance"

export function Demo() {
  return <ClaimableBalance />
}`,
  },
  {
    slug: 'contribution-chart',
    name: 'Contribution Chart',
    category: 'Data',
    description:
      'GitHub-style contribution bar chart with 6-month and 1-year periods. Hover or focus any bar for a tooltip with the exact count.',
    Demo: centeredDemo(ContributionChart, 'max-w-xl', 'ContributionChart'),
    code: `import { ContributionChart } from "@/components/gray/contribution-chart"

export function Demo() {
  return <ContributionChart />
}`,
  },
  {
    slug: 'savings-targets',
    name: 'Savings Targets',
    category: 'Data',
    description:
      'Savings goals with draggable sliders and live progress math — percentages, remaining amounts and currency formatting update in real time.',
    Demo: centeredDemo(SavingsTargets, 'max-w-md', 'SavingsTargets'),
    code: `import { SavingsTargets } from "@/components/gray/savings-targets"

export function Demo() {
  return <SavingsTargets />
}`,
  },
  {
    slug: 'dividend',
    name: 'Dividend',
    category: 'Data',
    description:
      'Dividend income estimator with multi-select holdings. Toggle positions to watch the estimated quarterly payout update instantly.',
    Demo: centeredDemo(DividendCard, 'max-w-md', 'DividendCard'),
    code: `import { DividendCard } from "@/components/gray/dividend"

export function Demo() {
  return <DividendCard />
}`,
  },
  {
    slug: 'payments',
    name: 'Payments',
    category: 'Data',
    description:
      'Payment settings panel with collapsible action rows and working switches, plus a breadcrumb header for nested-page contexts.',
    Demo: centeredDemo(PaymentsCard, 'max-w-xl', 'PaymentsCard'),
    code: `import { PaymentsCard } from "@/components/gray/payments"

export function Demo() {
  return <PaymentsCard />
}`,
  },
  {
    slug: 'settings-nav',
    name: 'Settings Nav',
    category: 'Navigation',
    description:
      'Two independent settings navigation lists with selectable rows. A drop-in, keyboard-accessible pattern for settings pages.',
    Demo: centeredDemo(SettingsNav, 'max-w-md', 'SettingsNav'),
    code: `import { SettingsNav } from "@/components/gray/settings-nav"

export function Demo() {
  return <SettingsNav />
}`,
  },
  {
    slug: 'date-picker',
    name: 'Date Picker',
    category: 'Inputs',
    description:
      'A date picker composed from Popover and Calendar with an outline trigger. The selected date renders as MMM d, yyyy and the popover closes on selection.',
    Demo: centeredDemo(DatePicker, 'max-w-xs', 'DatePicker'),
    code: `import { DatePicker } from "@/components/gray/date-picker"

export function Demo() {
  return <DatePicker />
}`,
  },
]

export const COMPONENTS: ComponentEntry[] = [
  /* --------------------------------- AI ---------------------------------- */
  ...AI_ENTRIES_SORTED,

  ...FEATURED,

  /* ------------------------------- Controls ------------------------------ */
  {
    slug: 'button',
    name: 'Button',
    category: 'Controls',
    description: 'Trigger actions and navigation with a single tap. Ships with variants, sizes and asChild.',
    Demo: ButtonDemo,
    code: `import { Button } from "@/components/ui/button"

export function Demo() {
  return <Button variant="outline">Click me</Button>
}`,
  },
  {
    slug: 'toggle',
    name: 'Toggle',
    category: 'Controls',
    description: 'A two-state button that can be pressed or released — perfect for formatting bars.',
    Demo: ToggleDemo,
    code: `import { Toggle } from "@/components/ui/toggle"
import { Bold } from "lucide-react"

export function Demo() {
  return (
    <Toggle aria-label="Toggle bold">
      <Bold className="size-4" />
    </Toggle>
  )
}`,
  },
  {
    slug: 'toggle-group',
    name: 'Toggle Group',
    category: 'Controls',
    description: 'A set of two-state buttons that can toggle single or multiple values together.',
    Demo: ToggleGroupDemo,
    code: `import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export function Demo() {
  return (
    <ToggleGroup type="multiple" variant="outline">
      <ToggleGroupItem value="bold">B</ToggleGroupItem>
      <ToggleGroupItem value="italic">I</ToggleGroupItem>
    </ToggleGroup>
  )
}`,
  },
  {
    slug: 'switch',
    name: 'Switch',
    category: 'Controls',
    description: 'A boolean control users flip on and off. The classic settings-page staple.',
    Demo: SwitchDemo,
    code: `import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function Demo() {
  return (
    <div className="flex items-center gap-2">
      <Switch id="airplane" />
      <Label htmlFor="airplane">Airplane Mode</Label>
    </div>
  )
}`,
  },
  {
    slug: 'checkbox',
    name: 'Checkbox',
    category: 'Controls',
    description: 'A control that lets the user select one or more options from a set.',
    Demo: CheckboxDemo,
    code: `import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export function Demo() {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms</Label>
    </div>
  )
}`,
  },
  {
    slug: 'radio-group',
    name: 'Radio Group',
    category: 'Controls',
    description: 'Pick exactly one option from a set. Built on the accessible Radix primitive.',
    Demo: RadioGroupDemo,
    code: `import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export function Demo() {
  return (
    <RadioGroup defaultValue="comfortable">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="default" id="r1" />
        <Label htmlFor="r1">Default</Label>
      </div>
    </RadioGroup>
  )
}`,
  },
  {
    slug: 'slider',
    name: 'Slider',
    category: 'Controls',
    description: 'Drag to pick a value from a range. Supports single values, ranges and steps.',
    Demo: SliderDemo,
    code: `import { Slider } from "@/components/ui/slider"

export function Demo() {
  return (
    <Slider defaultValue={[33]} max={100} step={1} className="w-64" />
  )
}`,
  },
  {
    slug: 'button-group',
    name: 'Button Group',
    category: 'Controls',
    description: 'Group related buttons into a joined segmented control or split button.',
    Demo: ButtonGroupDemo,
    code: `import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"

export function Demo() {
  return (
    <ButtonGroup>
      <Button variant="outline">Day</Button>
      <Button variant="outline">Week</Button>
      <Button variant="outline">Month</Button>
    </ButtonGroup>
  )
}`,
  },

  /* -------------------------------- Inputs ------------------------------- */
  {
    slug: 'input',
    name: 'Input',
    category: 'Inputs',
    description: 'A styled text field with focus rings, disabled and invalid states baked in.',
    Demo: InputDemo,
    code: `import { Input } from "@/components/ui/input"

export function Demo() {
  return <Input type="email" placeholder="Email" />
}`,
  },
  {
    slug: 'textarea',
    name: 'Textarea',
    category: 'Inputs',
    description: 'A multi-line text field that grows with your content and validation states.',
    Demo: TextareaDemo,
    code: `import { Textarea } from "@/components/ui/textarea"

export function Demo() {
  return <Textarea placeholder="Leave a comment" rows={4} />
}`,
  },
  {
    slug: 'label',
    name: 'Label',
    category: 'Inputs',
    description: 'An accessible caption for form controls — clicks pass through to the input.',
    Demo: LabelDemo,
    code: `import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export function Demo() {
  return (
    <div className="grid gap-2">
      <Label htmlFor="name">Name</Label>
      <Input id="name" />
    </div>
  )
}`,
  },
  {
    slug: 'input-otp',
    name: 'Input OTP',
    category: 'Inputs',
    description: 'One-time-password input with per-cell focus movement and auto-advance.',
    Demo: OTPDemo,
    code: `import {
  InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot,
} from "@/components/ui/input-otp"

export function Demo() {
  return (
    <InputOTP maxLength={6}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  )
}`,
  },
  {
    slug: 'select',
    name: 'Select',
    category: 'Inputs',
    description: 'A native-feeling dropdown for picking one value out of many.',
    Demo: SelectDemo,
    code: `import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"

export function Demo() {
  return (
    <Select>
      <SelectTrigger className="w-44">
        <SelectValue placeholder="Framework" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="next">Next.js</SelectItem>
        <SelectItem value="astro">Astro</SelectItem>
      </SelectContent>
    </Select>
  )
}`,
  },
  {
    slug: 'calendar',
    name: 'Calendar',
    category: 'Inputs',
    description: 'A full month-view calendar for picking dates and ranges.',
    Demo: CalendarDemo,
    code: `import { Calendar } from "@/components/ui/calendar"

export function Demo() {
  const [date, setDate] = React.useState<Date>(new Date())
  return <Calendar mode="single" selected={date} onSelect={setDate} />
}`,
  },
  {
    slug: 'combobox',
    name: 'Combobox',
    category: 'Inputs',
    description: 'Searchable select — type to filter options inside a popover.',
    Demo: ComboboxDemo,
    code: `import {
  Command, CommandEmpty, CommandGroup, CommandInput, CommandItem,
} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export function Demo() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline">{value || "Select framework…"}</Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command>
          <CommandInput placeholder="Search…" />
          <CommandEmpty>Nothing found.</CommandEmpty>
          <CommandGroup>
            <CommandItem onSelect={() => setValue("Next.js")}>Next.js</CommandItem>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}`,
  },
  {
    slug: 'form',
    name: 'Form',
    category: 'Inputs',
    description: 'React Hook Form + Zod wired into accessible labels, descriptions and errors.',
    Demo: FormDemo,
    code: `import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form, FormControl, FormField, FormItem, FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const schema = z.object({ username: z.string().min(2) })

export function Demo() {
  const form = useForm({ resolver: zodResolver(schema) })
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(console.log)}>
        <FormField name="username" render={({ field }) => (
          <FormItem>
            <FormControl><Input placeholder="username" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}`,
  },
  {
    slug: 'field',
    name: 'Field',
    category: 'Inputs',
    description: 'Label + control + description + error composed into one flexible field primitive.',
    Demo: FieldDemo,
    code: `import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function Demo() {
  return (
    <Field>
      <FieldLabel htmlFor="email">Work email</FieldLabel>
      <Input id="email" type="email" />
      <FieldDescription>Used for receipts only.</FieldDescription>
    </Field>
  )
}`,
  },

  /* ------------------------------- Overlays ------------------------------ */
  {
    slug: 'dialog',
    name: 'Dialog',
    category: 'Overlays',
    description: 'A modal window that traps focus and stacks on top of the page. Try the save flow.',
    Demo: DialogDemo,
    code: `import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function Demo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit profile</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>Save to apply your changes.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}`,
  },
  {
    slug: 'alert-dialog',
    name: 'Alert Dialog',
    category: 'Overlays',
    description: 'A focused confirmation modal for destructive or irreversible actions.',
    Demo: AlertDialogDemo,
    code: `import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

export function Demo() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}`,
  },
  {
    slug: 'sheet',
    name: 'Sheet',
    category: 'Overlays',
    description: 'A dialog that slides in from the edge — great for side panels on any screen.',
    Demo: SheetDemo,
    code: `import {
  Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

export function Demo() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open sheet</Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Panel</SheetTitle>
          <SheetDescription>Slides in from the edge.</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}`,
  },
  {
    slug: 'drawer',
    name: 'Drawer',
    category: 'Overlays',
    description: 'A bottom sheet built on Vaul — draggable, dismissible, mobile-native feel.',
    Demo: DrawerDemo,
    code: `import {
  Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"

export function Demo() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Open drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Bottom drawer</DrawerTitle>
          <DrawerDescription>Drag or tap outside to dismiss.</DrawerDescription>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  )
}`,
  },
  {
    slug: 'popover',
    name: 'Popover',
    category: 'Overlays',
    description: 'Anchored floating content for rich interactions — forms, pickers, previews.',
    Demo: PopoverDemo,
    code: `import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

export function Demo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent>Place content here.</PopoverContent>
    </Popover>
  )
}`,
  },
  {
    slug: 'tooltip',
    name: 'Tooltip',
    category: 'Overlays',
    description: 'A small hint that appears on hover or keyboard focus. Instant clarity.',
    Demo: TooltipDemo,
    code: `import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"

export function Demo() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>Helpful hint</TooltipContent>
    </Tooltip>
  )
}`,
  },
  {
    slug: 'hover-card',
    name: 'Hover Card',
    category: 'Overlays',
    description: 'A rich preview card that appears while hovering a link or avatar.',
    Demo: HoverCardDemo,
    code: `import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"

export function Demo() {
  return (
    <HoverCard>
      <HoverCardTrigger href="@graytell">@graytell</HoverCardTrigger>
      <HoverCardContent>Preview content here.</HoverCardContent>
    </HoverCard>
  )
}`,
  },
  {
    slug: 'dropdown-menu',
    name: 'Dropdown Menu',
    category: 'Overlays',
    description: 'A menu of actions with submenus, checkboxes, radio items and keyboard nav.',
    Demo: DropdownMenuDemo,
    code: `import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export function Demo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Copy</DropdownMenuItem>
        <DropdownMenuItem>Paste</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}`,
  },
  {
    slug: 'context-menu',
    name: 'Context Menu',
    category: 'Overlays',
    description: 'Right-click anywhere on the demo card to open a fully native-feeling menu.',
    Demo: ContextMenuDemo,
    code: `import {
  ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger,
} from "@/components/ui/context-menu"

export function Demo() {
  return (
    <ContextMenu>
      <ContextMenuTrigger>Right click me</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Cut</ContextMenuItem>
        <ContextMenuItem>Copy</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}`,
  },
  {
    slug: 'menubar',
    name: 'Menubar',
    category: 'Overlays',
    description: 'A horizontal row of dropdowns — the classic desktop app menu bar.',
    Demo: MenubarDemo,
    code: `import {
  Menubar, MenubarContent, MenubarMenu, MenubarTrigger,
} from "@/components/ui/menubar"

export function Demo() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>New tab</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}`,
  },
  {
    slug: 'command',
    name: 'Command',
    category: 'Overlays',
    description: 'A searchable command palette — press ⌘K on this site to see the real thing.',
    Demo: CommandDemo,
    code: `import {
  CommandDialog, CommandEmpty, CommandGroup,
  CommandInput, CommandItem, CommandList,
} from "@/components/ui/command"

export function Demo() {
  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command…" />
      <CommandList>
        <CommandEmpty>No results.</CommandEmpty>
        <CommandGroup heading="Actions">
          <CommandItem>Copy link</CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}`,
  },
  {
    slug: 'toast',
    name: 'Toast',
    category: 'Overlays',
    description: 'Brief, unobtrusive notifications with actions and swipe-to-dismiss.',
    Demo: ToastDemo,
    code: `import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { ToastAction } from "@/components/ui/toast"

export function Demo() {
  const { toast } = useToast()
  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          title: "Scheduled: catch up",
          action: <ToastAction altText="Undo">Undo</ToastAction>,
        })
      }}
    >
      Show toast
    </Button>
  )
}`,
  },
  {
    slug: 'sonner',
    name: 'Sonner',
    category: 'Overlays',
    description: 'The beloved toast library — stacked, animated and theme-aware out of the box.',
    Demo: SonnerDemo,
    code: `import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"

export function Demo() {
  return (
    <>
      <Button onClick={() => toast.success("Event scheduled")}>
        Give me a toast
      </Button>
      <Toaster position="bottom-right" />
    </>
  )
}`,
  },

  /* ------------------------------ Navigation ----------------------------- */
  {
    slug: 'tabs',
    name: 'Tabs',
    category: 'Navigation',
    description: 'Switch between panels of content. Keyboard navigation included.',
    Demo: TabsDemo,
    code: `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function Demo() {
  return (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">Account settings…</TabsContent>
      <TabsContent value="password">Password settings…</TabsContent>
    </Tabs>
  )
}`,
  },
  {
    slug: 'breadcrumb',
    name: 'Breadcrumb',
    category: 'Navigation',
    description: 'Show where the user is in the hierarchy, with collapsed trails and dropdowns.',
    Demo: BreadcrumbDemo,
    code: `import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList,
  BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export function Demo() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Components</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}`,
  },
  {
    slug: 'pagination',
    name: 'Pagination',
    category: 'Navigation',
    description: 'Page navigation with prev/next and ellipsis truncation. Try clicking through.',
    Demo: PaginationDemo,
    code: `import {
  Pagination, PaginationContent, PaginationItem,
  PaginationLink, PaginationNext, PaginationPrevious,
} from "@/components/ui/pagination"

export function Demo() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
        <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
        <PaginationItem><PaginationNext href="#" /></PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}`,
  },
  {
    slug: 'navigation-menu',
    name: 'Navigation Menu',
    category: 'Navigation',
    description: 'A top-level menu with hover panels — the pattern behind mega-nav headers.',
    Demo: NavigationMenuDemo,
    code: `import {
  NavigationMenu, NavigationMenuContent, NavigationMenuItem,
  NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

export function Demo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Learn</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink href="/docs">Documentation</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}`,
  },
  {
    slug: 'sidebar',
    name: 'Sidebar',
    category: 'Navigation',
    description: 'The composable app shell — collapsible menus, active states, mobile sheet.',
    Demo: SidebarDemo,
    code: `import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel,
  SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar"

export function Demo() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>{/* logo */}</SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
            <SidebarMenu>{/* items */}</SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      {/* main content */}
    </SidebarProvider>
  )
}`,
  },

  /* ------------------------------- Display ------------------------------- */
  {
    slug: 'accordion',
    name: 'Accordion',
    category: 'Display',
    description: 'Vertically stacked, expandable sections. Single or multiple open at once.',
    Demo: AccordionDemo,
    code: `import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion"

export function Demo() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>Yes. Fully keyboard navigable.</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}`,
  },
  {
    slug: 'collapsible',
    name: 'Collapsible',
    category: 'Display',
    description: 'Show and hide a block of content with an animated toggle.',
    Demo: CollapsibleDemo,
    code: `import {
  Collapsible, CollapsibleContent, CollapsibleTrigger,
} from "@/components/ui/collapsible"

export function Demo() {
  return (
    <Collapsible>
      <CollapsibleTrigger>Toggle</CollapsibleTrigger>
      <CollapsibleContent>Hidden content</CollapsibleContent>
    </Collapsible>
  )
}`,
  },
  {
    slug: 'alert',
    name: 'Alert',
    category: 'Display',
    description: 'A callout for user attention — default and destructive tones, with icons.',
    Demo: AlertDemo,
    code: `import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react"

export function Demo() {
  return (
    <Alert>
      <Terminal className="size-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>You can add components to your app.</AlertDescription>
    </Alert>
  )
}`,
  },
  {
    slug: 'avatar',
    name: 'Avatar',
    category: 'Display',
    description: 'Profile images with graceful fallbacks to initials when loading fails.',
    Demo: AvatarDemo,
    code: `import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Demo() {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/graytell.png" />
      <AvatarFallback>GL</AvatarFallback>
    </Avatar>
  )
}`,
  },
  {
    slug: 'badge',
    name: 'Badge',
    category: 'Display',
    description: 'Tiny status descriptors for counting, labelling and flagging UI.',
    Demo: BadgeDemo,
    code: `import { Badge } from "@/components/ui/badge"

export function Demo() {
  return <Badge>Default</Badge>
}`,
  },
  {
    slug: 'card',
    name: 'Card',
    category: 'Display',
    description: 'Header, content and footer slots for grouping related info on a surface.',
    Demo: CardDemo,
    code: `import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card"

export function Demo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one click.</CardDescription>
      </CardHeader>
      <CardContent>{/* content */}</CardContent>
    </Card>
  )
}`,
  },
  {
    slug: 'kbd',
    name: 'Kbd',
    category: 'Display',
    description: 'Render keyboard shortcuts the way they look on the user\u2019s machine.',
    Demo: KbdDemo,
    code: `import { Kbd, KbdGroup } from "@/components/ui/kbd"

export function Demo() {
  return (
    <p>
      Press <Kbd>⌘</Kbd> <Kbd>K</Kbd> to search
    </p>
  )
}`,
  },
  {
    slug: 'item',
    name: 'Item',
    category: 'Display',
    description: 'Media, content and actions composed into clean settings rows and lists.',
    Demo: ItemDemo,
    code: `import {
  Item, ItemActions, ItemContent, ItemDescription,
  ItemMedia, ItemTitle,
} from "@/components/ui/item"
import { Switch } from "@/components/ui/switch"

export function Demo() {
  return (
    <Item variant="outline">
      <ItemMedia variant="icon">{/* icon */}</ItemMedia>
      <ItemContent>
        <ItemTitle>Usage analytics</ItemTitle>
        <ItemDescription>Weekly reports.</ItemDescription>
      </ItemContent>
      <ItemActions><Switch /></ItemActions>
    </Item>
  )
}`,
  },
  {
    slug: 'empty',
    name: 'Empty',
    category: 'Display',
    description: 'A beautiful zero-state: icon, title, description and calls to action.',
    Demo: EmptyDemo,
    code: `import {
  Empty, EmptyContent, EmptyDescription, EmptyHeader,
  EmptyMedia, EmptyTitle,
} from "@/components/ui/empty"

export function Demo() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">{/* icon */}</EmptyMedia>
        <EmptyTitle>No projects found</EmptyTitle>
        <EmptyDescription>Start something new.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>{/* buttons */}</EmptyContent>
    </Empty>
  )
}`,
  },
  {
    slug: 'separator',
    name: 'Separator',
    category: 'Display',
    description: 'A thin rule that visually or semantically divides content, horizontal or vertical.',
    Demo: SeparatorDemo,
    code: `import { Separator } from "@/components/ui/separator"

export function Demo() {
  return <Separator className="my-4" />
}`,
  },
  {
    slug: 'skeleton',
    name: 'Skeleton',
    category: 'Display',
    description: 'A pulse placeholder that keeps layout stable while real content loads.',
    Demo: SkeletonDemo,
    code: `import { Skeleton } from "@/components/ui/skeleton"

export function Demo() {
  return <Skeleton className="h-4 w-full" />
}`,
  },
  {
    slug: 'aspect-ratio',
    name: 'Aspect Ratio',
    category: 'Display',
    description: 'Locks media to a ratio so images and videos never cause layout shift.',
    Demo: AspectRatioDemo,
    code: `import { AspectRatio } from "@/components/ui/aspect-ratio"

export function Demo() {
  return (
    <AspectRatio ratio={16 / 9}>
      <img src="…" className="size-full rounded-md object-cover" />
    </AspectRatio>
  )
}`,
  },
  {
    slug: 'carousel',
    name: 'Carousel',
    category: 'Display',
    description: 'Embla-powered sliding carousel with arrows, dots and infinite loops.',
    Demo: CarouselDemo,
    code: `import {
  Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,
} from "@/components/ui/carousel"

export function Demo() {
  return (
    <Carousel>
      <CarouselContent>{/* slides */}</CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}`,
  },
  {
    slug: 'spinner',
    name: 'Spinner',
    category: 'Display',
    description: 'An animated loading indicator you can drop inline into buttons or text.',
    Demo: SpinnerDemo,
    code: `import { Spinner } from "@/components/ui/spinner"
import { Button } from "@/components/ui/button"

export function Demo() {
  return (
    <Button disabled>
      <Spinner /> Deploying…
    </Button>
  )
}`,
  },

  /* --------------------------------- Data -------------------------------- */
  {
    slug: 'progress',
    name: 'Progress',
    category: 'Data',
    description: 'An animated bar that shows completion — determinate or indeterminate.',
    Demo: ProgressDemo,
    code: `import { Progress } from "@/components/ui/progress"

export function Demo() {
  return <Progress value={66} className="w-64" />
}`,
  },
  {
    slug: 'resizable',
    name: 'Resizable',
    category: 'Data',
    description: 'Drag the handle to resize panels. Great for IDE-style layouts.',
    Demo: ResizableDemo,
    code: `import {
  ResizableHandle, ResizablePanel, ResizablePanelGroup,
} from "@/components/ui/resizable"

export function Demo() {
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel>One</ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel>Two</ResizablePanel>
    </ResizablePanelGroup>
  )
}`,
  },
  {
    slug: 'table',
    name: 'Table',
    category: 'Data',
    description: 'Styled table primitives with sticky headers — sort the demo by clicking.',
    Demo: TableDemo,
    code: `import {
  Table, TableBody, TableCell, TableHead,
  TableHeader, TableRow,
} from "@/components/ui/table"

export function Demo() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>{/* rows */}</TableBody>
    </Table>
  )
}`,
  },
  {
    slug: 'chart',
    name: 'Chart',
    category: 'Data',
    description: 'Recharts wrapped in theme-aware containers with tooltips and legends. Hover the bars.',
    Demo: ChartDemo,
    code: `import { Bar, BarChart, CartesianGrid } from "recharts"
import {
  ChartContainer, ChartTooltip, ChartTooltipContent,
} from "@/components/ui/chart"

const data = [
  { month: "Jan", desktop: 186 },
  { month: "Feb", desktop: 305 },
]

export function Demo() {
  return (
    <ChartContainer config={{}}>
      <BarChart data={data}>
        <CartesianGrid vertical={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}`,
  },
  {
    slug: 'scroll-area',
    name: 'Scroll Area',
    category: 'Data',
    description: 'Custom-styled scrollbars that match the design system on every platform.',
    Demo: ScrollAreaDemo,
    code: `import { ScrollArea } from "@/components/ui/scroll-area"

export function Demo() {
  return (
    <ScrollArea className="h-48 w-64 rounded-md border p-4">
      Long content scrolls here.
    </ScrollArea>
  )
}`,
  },
]

export const COMPONENT_COUNT = COMPONENTS.length

/** Number of AI components in the catalog. */
export const AI_COUNT = COMPONENTS.filter((c) => c.category === 'AI').length

export function getComponent(slug: string): ComponentEntry | undefined {
  return COMPONENTS.find((c) => c.slug === slug)
}

export function getNeighbours(slug: string): {
  prev: ComponentEntry | null
  next: ComponentEntry | null
} {
  const index = COMPONENTS.findIndex((c) => c.slug === slug)
  return {
    prev: index > 0 ? COMPONENTS[index - 1] : null,
    next: index >= 0 && index < COMPONENTS.length - 1 ? COMPONENTS[index + 1] : null,
  }
}
