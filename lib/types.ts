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
    lastHeartbeat: bigint;
    memory: number;
    humanUptime: string;
}

/////////* DisCal API Responses */////////
export type LoginResponse = {
    link: string
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