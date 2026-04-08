import { redirect } from 'next/navigation'
import { todayStr } from '@/lib/date'

export default function DayIndexPage() {
  redirect(`/day/${todayStr()}`)
}
