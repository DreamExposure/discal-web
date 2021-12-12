import {TSAnyKeyword} from "@babel/types";

export default class User {

    id: string;
    username: string;
    discrim: number;
    avatar: string = '/defaults/profile.png';
    guilds: Array<TSAnyKeyword> = [];


    constructor(id: string, username: string, discrim: number) {
        this.id = id;
        this.username = username;
        this.discrim = discrim;
    }
}
