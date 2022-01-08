import {TSAnyKeyword} from "@babel/types";

export default class User {

    id: string;
    username: string;
    discriminator: string;
    avatar: string = '/defaults/profile.png';
    guilds: Array<TSAnyKeyword> = [];


    constructor(id: string, username: string, discrim: string) {
        this.id = id;
        this.username = username;
        this.discriminator = discrim;
    }
}
