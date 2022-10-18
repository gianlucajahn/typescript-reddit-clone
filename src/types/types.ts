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
} 

export interface Comment {
    author:  string;
    nesting: string;
    vote:    number;
    time:    string;
    upvotes: string;
    content: string;
    nested_lvl: number;
    nested_comments: Comment[];
}

export type Flair = {
    title: string;
    color: string;
}