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
    flairs:          Flair[];
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

export type Flair = {
    title: string;
    color: string;
}

export type Rule = {
    number:   number;
    selected: boolean;
    title:    string;
    desc:     string;
}
