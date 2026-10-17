/////////* Session Objects */////////
export type User = {
    id: string,
    username: string,
    discriminator: string,
    avatar: string,
    guilds: any[]
}

export type Session = {
    token: string | null,
    expires: Date | null,
    user: User | null,
}


/////////* Network Objects */////////
export type NetworkStatus = {
    totalCalendars: number;
    totalAnnouncements: number;
    apiStatus: InstanceData[];
    websiteStatus: InstanceData | null;
    camStatus:InstanceData[];
    botStatus: BotInstanceData[];
    expectedShardCount: number;
    totalGuildsCount: number;
}

export type BotInstanceData = {
    instanceData: InstanceData;
    shardIndex: number;
    shardCount: number;
    guilds: number;
}

export type InstanceData = {
    instanceId: string;
    version: string;
    d4jVersion: string;
    uptime: string;
    lastHeartbeat: string;
    memory: number;
    humanUptime: string;
}

/////////* Calendar Objects */////////
export enum CalendarHost {
    GOOGLE = "Google"
}

export type CalendarV3Model = {
    number: number,
    guildId: string,
    name: string,
    description: string,
    timezone: string,
    link: string,
    host: CalendarHost,
    hostLink: string,
    external: boolean,
}

export enum EventColor {
    MELROSE,
    RIPTIDE,
    MAUVE,
    TANGERINE,
    DANDELION,
    MAC_AND_CHEESE,
    TURQUOISE,
    MERCURY,
    BLUE,
    GREEN,
    RED,
    NONE,
}

export enum Frequency {
    DAILY,
    WEEKLY,
    MONTHLY,
    YEARLY,
}

export enum SetPos {
    FIRST,
    SECOND,
    THIRD,
    FOURTH,
    LAST,
}

export enum Day {
    SUNDAY,
    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    SATURDAY,
}

export enum Month {
    JANUARY,
    FEBRUARY,
    MARCH,
    APRIL,
    MAY,
    JUNE,
    JULY,
    AUGUST,
    SEPTEMBER,
    OCTOBER,
    NOVEMBER,
    DECEMBER,
}

export type EventRecurrence = {
    frequency: Frequency,
    interval: number,
    count: number | null,
    bySetPos: SetPos | null,
    byDay: Day[],
    byMonthDay:  number | null,
    byMonth: Month | null,

}

export type Event = {
    id: string,
    guildId: string,
    calendarNumber: number,
    name: string,
    description: string,
    location: string,
    link: string,
    color: EventColor,
    start: Date,
    end: Date,
    recur: boolean,
    recurrence: EventRecurrence,
    image: string,
    timezone: string,

    allDay: boolean,
    multiDay: boolean,
    ongoing: boolean,
    started: boolean,
    over: boolean,
}

/////////* DisCal API Responses */////////
export type LoginResponse = {
    link: string
}

export type TemporaryTokenResponse = {
    token: string,
    guildId: string,
    expiresAt: Date,
    scopes: string[],
}

/////////* Various objects typed for maintainability */////////
export type Service = {
    name: string;
    icon: any,
    version: string,
    d4jVersion: string,
    memory: string,
    uptime: string,
    lastHeartbeat: string,
}

export type Plan = {
    title: string,
    featured: boolean,
    description: string,
    priceMonthly: number,
    priceYearly: number,
    buyButtonText: string,
    buyButtonLink: string,
    mainFeatures: PlanFeature[],
}

export type PlanFeature = {
    id: number,
    value: string,
}

export type Feature = {
    title: string,
    tiers: FeatureTier[],
}

export type FeatureTier = {
    title: string,
    featured?: boolean,
    value: string | boolean,
}

export type Faq = {
    question: string,
    answer: string,
}

export type CommandTableData = {
    title: string,
    commands: CommandData[],
}

export type CommandData = {
    command: string,
    description: string,
    usage: string,
    access: CommandAccessData,
}

export type CommandAccessData = {
    renderedAccessLevel: CommandAccessLevel,
    alternateText?: string,
}

export enum CommandAccessLevel {
    Elevated   = "Elevated",
    Privileged = "Privileged",
    Everyone   = "Everyone",
    PatronOnly = "Patron-only",
    DevOnly    = "Developer-Only",
}