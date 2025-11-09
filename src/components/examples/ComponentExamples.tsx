/**
 * Component Examples - Примеры использования shadcn/ui компонентов
 * Этот файл содержит примеры использования всех установленных компонентов
 * для быстрой справки при разработке интерфейса.
 */

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Slider,
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Badge,
  Progress,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  useToast,
  Separator,
  Skeleton,
  ScrollArea,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  RadioGroup,
  RadioGroupItem,
  Label,
} from "@/components/ui"
import { useState } from "react"

export function ButtonExamples() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Button size="sm">Small</Button>
      <Button size="lg">Large</Button>
      <Button disabled>Disabled</Button>
    </div>
  )
}

export function CardExample() {
  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content with some text</p>
      </CardContent>
    </Card>
  )
}

export function SliderExample() {
  const [value, setValue] = useState([3])

  return (
    <div className="w-96">
      <p className="mb-2">Score: {value[0]}/5</p>
      <Slider
        min={0}
        max={5}
        step={1}
        value={value}
        onValueChange={setValue}
      />
    </div>
  )
}

export function AccordionExample() {
  return (
    <Accordion type="single" collapsible className="w-96">
      <AccordionItem value="item-1">
        <AccordionTrigger>Раздел 1</AccordionTrigger>
        <AccordionContent>
          Содержимое раздела 1. Здесь может быть список вопросов.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Раздел 2</AccordionTrigger>
        <AccordionContent>
          Содержимое раздела 2.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export function DialogExample() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Открыть диалог</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Заголовок диалога</DialogTitle>
          <DialogDescription>
            Это описание диалога.
          </DialogDescription>
        </DialogHeader>
        <p>Содержимое диалога</p>
      </DialogContent>
    </Dialog>
  )
}

export function DropdownMenuExample() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Меню</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Опция 1</DropdownMenuItem>
        <DropdownMenuItem>Опция 2</DropdownMenuItem>
        <DropdownMenuItem>Опция 3</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function BadgeExample() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  )
}

export function ProgressExample() {
  const [progress, setProgress] = useState(45)

  return (
    <div className="w-96">
      <p className="mb-2">Progress: {progress}%</p>
      <Progress value={progress} className="w-full" />
      <Button
        onClick={() => setProgress(Math.min(progress + 10, 100))}
        className="mt-4"
      >
        Increase
      </Button>
    </div>
  )
}

export function SelectExample() {
  return (
    <Select>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Выберите главу" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="chapter1">Глава 1</SelectItem>
        <SelectItem value="chapter2">Глава 2</SelectItem>
        <SelectItem value="chapter3">Глава 3</SelectItem>
      </SelectContent>
    </Select>
  )
}

export function AlertDialogExample() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Удалить</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
          <AlertDialogDescription>
            Это действие нельзя отменить. Это будет окончательно удалить вашу статистику.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogAction>Да, удалить</AlertDialogAction>
        <AlertDialogCancel>Отмена</AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export function ToastExample() {
  const { toast } = useToast()

  return (
    <Button
      onClick={() => {
        toast({
          title: "Успех!",
          description: "Ваш ответ был сохранен",
        })
      }}
    >
      Показать Toast
    </Button>
  )
}

export function SeparatorExample() {
  return (
    <div className="w-96">
      <div>Раздел 1</div>
      <Separator className="my-4" />
      <div>Раздел 2</div>
    </div>
  )
}

export function SkeletonExample() {
  return (
    <div className="w-96">
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-12 w-full" />
      </div>
    </div>
  )
}

export function ScrollAreaExample() {
  return (
    <ScrollArea className="h-48 w-96 rounded border p-4">
      <div>
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="py-2">
            Item {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}

export function TooltipExample() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Наведи на меня</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Это подсказка</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export function RadioGroupExample() {
  const [value, setValue] = useState("option1")

  return (
    <RadioGroup value={value} onValueChange={setValue}>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option1" id="option1" />
        <Label htmlFor="option1">Опция 1</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option2" id="option2" />
        <Label htmlFor="option2">Опция 2</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option3" id="option3" />
        <Label htmlFor="option3">Опция 3</Label>
      </div>
      <p className="mt-4">Selected: {value}</p>
    </RadioGroup>
  )
}

export function AllComponentsShowcase() {
  return (
    <div className="space-y-8 p-8">
      <section>
        <h2 className="text-2xl font-bold mb-4">Button Examples</h2>
        <ButtonExamples />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Card Example</h2>
        <CardExample />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Slider Example</h2>
        <SliderExample />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Accordion Example</h2>
        <AccordionExample />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Dialog Example</h2>
        <DialogExample />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Dropdown Menu Example</h2>
        <DropdownMenuExample />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Badge Example</h2>
        <BadgeExample />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Progress Example</h2>
        <ProgressExample />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Select Example</h2>
        <SelectExample />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Alert Dialog Example</h2>
        <AlertDialogExample />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Toast Example</h2>
        <ToastExample />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Separator Example</h2>
        <SeparatorExample />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Skeleton Example</h2>
        <SkeletonExample />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Scroll Area Example</h2>
        <ScrollAreaExample />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Tooltip Example</h2>
        <TooltipExample />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Radio Group Example</h2>
        <RadioGroupExample />
      </section>
    </div>
  )
}
