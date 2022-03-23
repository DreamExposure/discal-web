/////////* Network Objects */////////
export type NetworkStatus = {
    total_calendars: number;
    total_announcements: number;
    api_status: InstanceData;
    website_status: InstanceData;
    cam_status:InstanceData;
    bot_status: BotInstanceData[];
    expected_shard_count: number;
    total_guilds: number;
}

export type BotInstanceData = {
    instance: InstanceData;
    shard_index: number;
    shard_count: number;
    guilds: number;
}

export type InstanceData = {
    instance_id: string;
    version: string;
    d4j_version: string;
    uptime: string;
    last_heartbeat: Date;
    memory: number;
}

/////////* DisCal API Responses */////////
export type LoginResponse = {
    link: string
}
