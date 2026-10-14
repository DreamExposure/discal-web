import {useRouter} from 'next/router'















export default function CalendarEmbedPage() {
    const router = useRouter()
    const guildId = router.query.guildId
    const calendarNumber = router.query.calendarNumber






    return <h1 className='text-xl text-discal-red'>Guild ID: {guildId} | Calendar Number: {calendarNumber}</h1>
}