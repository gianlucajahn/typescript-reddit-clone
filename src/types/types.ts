export type Subreddits = Subreddit[]

export type Subreddit = {
    title:           string;
    officialTitle:   string;
    logo:            string;
    category:        string;
    favorite:        boolean;
    joined:          boolean;
    about:           string;
    members:         string;
    online:          string;
    creationDate:    string;
    rules:           Rule[];
    flairs:          FlairSub[];
    anchors:         Anchor[] | undefined;
    buttonColor:     string;
    headerColor:     string;
    blackText:       boolean;
    backgroundColor: string;
    bannerUrl:       string;
    bySize:          string | undefined;
}

export type Anchor = {
    title: string,
    selected: boolean
} | undefined

export type FlairSub = {
    title: string;
    color: string;
}

export type Rule = {
    number:   number;
    expanded: boolean;
    title:    string;
    desc:     string;
} | undefined

export type Post = {
    title:     string;
    id:        string;
    type:      string;
    pinned:    boolean;
    vote:      number;
    src:       string;
    author:    string;
    time:      string;
    subreddit: string;
    upvotes:   string;
    awards:    string[];
    comments:  Comment[];
    flair:     Flair;
    saved:     boolean;
} 

export interface Comment {
    author:  string;
    nesting: string;
    vote:    number;
    time:    string;
    upvotes: string;
    content: string;
    hasBeenSubmittedYet?: boolean,
    lastSubmitContent?: string,
    avatar?: string,
    nested_lvl: number;
    nested_comments: Comment[];
}

export interface UserData {
    username: string;
    password: string;
}

export type Flair = {
    title: string;
    color: string;
}

export type Draft = {
    title: string;
    type: string;
    src: string;
    time: string;
    subreddit: string;
}

export const baseCustomPost = {
    id: "86",
    src: "",
    author: "",
    subreddit: "",
    pinned: false,
    title: "",
    type: "text",
    vote: 1,
    saved: false,
    time: "Just Now",
    upvotes: "1",
    awards: [
        "helpful"
    ],
    comments: [
        {
            author: "AutoModerator",
            avatar: "15",
            nested_lvl: 0,
            nested_comments: [

            ],
            nesting: "none",
            vote: 0,
            time: "Just Now",
            upvotes: "0",
            content: "Thanks for submitting a post! Check back later to see if anyone commented on it! You will also be sent a notification if that happens, so don't worry, you won't miss out."
        },
    ],
    flair: {
      title: "none",
      color: "#edeff1"
    }
}