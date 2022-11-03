import React, { ChangeEvent, MouseEventHandler, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.scss';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Home from './containers/Home/Home';
import NavBar from './containers/NavBar/NavBar';
import { isReturnStatement, reduceEachTrailingCommentRange } from 'typescript';
import LoginModal from './components/LoginModal/LoginModal';
import subredditArray from './utils/subredditArray';
import SubredditPage from './containers/SubredditPage/SubredditPage';
import { Subreddits, Subreddit, Post, Comment, UserData, baseCustomPost, Draft } from "./types/types";
import postArray from './utils/postArray';
import IndividualPost from './containers/individualPost/individualPost';
import SubmitPage from './containers/SubmitPage/SubmitPage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentlyRenderedPosts, setCurrentlyRenderedPosts] = useState(8);
  const [subreddits, setSubreddits] = useState(subredditArray);
  const [currentEditedComment, setCurrentEditedComment] = useState("");
  const [notificationNum, setNotificationNum] = useState(0);
  const [topSubreddits, setTopSubreddits] = useState(subreddits.slice(0, 5));
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [searchDropdown, setSearchDropdown] = useState(false);
  const [currentAnchor, setCurrentAnchor] = useState(Number);
  const [selectedAnchor, setSelectedAnchor] = useState("");
  const [cachedPosts, setCachedPosts] = useState<Post[]>();
  const [cachedUserData, setCachedUserData] = useState<UserData>();
  const [currentSub, setCurrentSub] = useState<Subreddit>();
  const [currentPost, setCurrentPost] = useState<Post>();
  const [subDropdownIsOpen, setSubDropdownIsOpen] = useState(false);
  const [showAuthAlert, setShowAuthAlert] = useState({
    username: false,
    password: false
  });
  const [imageUploaded, setImageUploaded] = useState(false);
  const [submitPage, setSubmitPage] = useState(false);
  const [submitPostType, setSubmitPostType] = useState("");
  const [randomInt, setRandomInt] = useState(Math.floor(Math.random() * 10) + 1)
  const [communityTheme, setCommunityTheme] = useState(true);
  const [communityOptions, setCommunityOptions] = useState(false);
  const [randomIntToString, setRandomIntToString] = useState(randomInt.toString());
  const [currentSort, setCurrentSort] = useState("best");
  const [loginModalState, setLoginModalState] = useState("closed");
  const [userName, setUserName] = useState("");
  const [submitDropdownState, setSubmitDropdownState] = useState(false);
  const [password, setPassword] = useState("");
  const [imageUploadCount, setImageUploadCount] = useState(0);
  const [mainComment, setMainComment] = useState("");
  const [index, setIndex] = useState<number | undefined>(undefined);
  const [loginStatus, setLoginStatus] = useState(false);
  const [searchItemDisplay, setSearchItemDisplay] = useState([
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
  ]);
  const [dropdownState, setDropdownState] = useState({
    erkunden: false,
    gaming: false,
    sports: false,
    television: false,
    celebrity: false,
    business: false,
    crypto: false,
    mehr: false,
    weitereinfos: false,
    richtlinien: true
  });
  const [hoverState, setHoverState] = useState({
    username: false,
    password: false
  });
  const [joinedCommunities, setJoinedCommunities] = useState([
    subreddits[5],
    subreddits[6],
    subreddits[1],
    subreddits[7],
    subreddits[8],
    subreddits[9],
  ]);

  const baseSearchArray = [
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true
  ];

  const [posts, setPosts] = useState<Post[]>(postArray);
  const [customPost, setCustomPost] = useState<Post>(baseCustomPost);

  useEffect(() => {
    if (searchTerm.length === 0) {
      setSearchDropdown(false);
      setSearchItemDisplay(baseSearchArray);
      return;
    }

    if (searchTerm.length >= 1) {
        setSearchDropdown(true);
    }
  }, [searchTerm]);

  useEffect(() => {
    if (imageUploaded) {
      setImageUploadCount(imageUploadCount + 1);

      if (imageUploadCount >= 1) {
        setImageUploaded(false);
        setImageUploadCount(0);
      }
    }
  }, [customPost.src])

  useEffect(() => {
    if (location.pathname.substring(1) === "submit") {
      setSubmitPage(true);
    } else {
      setSubmitPage(false);
    }

    const endsWithNumber = /[0-9]+$/.test(location.pathname);
    if (endsWithNumber === false) {
      setCurrentPost(undefined);
    }
  }, [location.pathname])

  useEffect(() => {
    if (submitPage) {
      if (currentSub !== undefined) {
        const subNum = subreddits.findIndex(sub => sub.title === currentSub.title);
        setCurrentPost(posts[subNum * 5 + 1]);
      }
    }
  }, [submitPage])

  const handleNotifications = (e: React.MouseEvent) => {
    const target = e.currentTarget;
    if (target.classList.contains('noti')) {
      setNotificationNum(0);
    } 
  }

  const handleLoginInput = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target.id === "username") {
      setUserName(target.value);
      if (target.value.length >= 4) {
        setShowAuthAlert({
          username: false,
          password: showAuthAlert.password
        });
      }
    } else if (target.id === "password") {
      setPassword(target.value);
      if (target.value.length >= 6) {
        setShowAuthAlert({
          username: showAuthAlert.username,
          password: false
        });
      }
    }
  }

  const writeComment = (e: any) => {
    const target = e.target;
    setMainComment(target.value);
  }

  const writeNestedComment = (e: any) => {
    let target = e.target;
    setCurrentEditedComment(target.value);
  }

  const editComment = (e: any) => {
    let target = e.target;
    let commentId = e.target.id;

    if (currentPost === undefined) {
      return;
    }

    let updatedPost = {...currentPost};
    updatedPost.comments![commentId].content = target.value;
    setCurrentPost(updatedPost);
  }

  const removeUploadedImg = (e: React.MouseEvent) => {
    setImageUploadCount(0);
    setImageUploaded(false);

    let updatedCustomPost = {...customPost};
    updatedCustomPost.src = "";
    setCustomPost(updatedCustomPost);
  }

  const addPostsToRender = (e: React.MouseEvent) => {
    setCurrentlyRenderedPosts(currentlyRenderedPosts + 8);
  }

  const editNestedComment = (e: any) => {
    let target = e.target;
    let commentId = e.target.id;

    if (currentPost === undefined) {
      return;
    }

    let updatedPost = {...currentPost};
    updatedPost.comments![commentId].nested_comments[0].content = target.value;
    setCurrentPost(updatedPost);
  }

  const submitNestedComment = (e: React.MouseEvent) => {
    if (currentPost === undefined) {
      return;
    }

    commentNotification(e);
    const target = e.currentTarget;
    const commentId = parseInt(target.id);
    let comment = {...currentPost?.comments[commentId]};
    comment.nested_comments![0].hasBeenSubmittedYet = true;
    comment.nested_comments[0].lastSubmitContent = comment.nested_comments[0].content;
    comment.nesting = "posted";
    setCurrentPost({...currentPost, ...currentPost.comments[commentId] = comment});
    setNotificationNum(notificationNum + 1);
  }

  const selectSubmitDropdown = (e: React.MouseEvent) => {
    setSubmitDropdownState(true);
  }

  const selectSubmitSubreddit = (e: React.MouseEvent) => {
    const target = e.currentTarget;

    if (target.id === "none") {
      setCurrentSub(undefined);
      setSubmitDropdownState(false);
    }

    const subId = subreddits.findIndex(sub => sub.title === target.id);
    if (subId === -1) {
      return;
    } else {
      setCurrentSub(subreddits[subId]);
      setCurrentPost(posts[subId * 5 + 1]);
      setSubmitDropdownState(false);
    }
  }

  const submitCustomPost = (e: React.MouseEvent) => {
    if (currentSub === undefined) {
      return;
    }


    setSubmitLoading(true);
    setTimeout((e: any) => {
      let submittedCustomPost = {...customPost};
      submittedCustomPost.author = userName;
      submittedCustomPost.id = posts.length.toString();
      submittedCustomPost.subreddit = currentSub.title;
  
      if (submitPostType === "text" || submitPostType === "link") {
        submittedCustomPost.type = "text";
      } else if (submitPostType === "image") {
        submittedCustomPost.type = "img";
      }
  
      setCurrentPost(submittedCustomPost);
      let updatedPosts = [...posts];
      let postId = parseInt(submittedCustomPost.id);
      updatedPosts.push(submittedCustomPost);
      setPosts(updatedPosts);
      setNotificationNum(notificationNum + 1);
      navigate(`/r/${currentSub.title}/${postId}`);
      setCustomPost(baseCustomPost);
      setSubmitLoading(false);
      submitPostNotification(e);
    }, 2150);
  }

  const submitComment = (e: React.MouseEvent) => {
    commentNotification(e);
    const target = e.currentTarget as HTMLButtonElement;

    if (loginStatus === false) {
      setLoginModalState("login");
      return;
    }

    let commentId = parseInt(target.id);
    for (let i = 0; i < 10; i++) {
      if (commentId === i) {
        let postRef = currentPost;
        let newComment = {
          author: userName,
          nesting: "none",
          vote: 0,
          time: "Just now",
          upvotes: "1",
          hasBeenSubmittedYet: true,
          lastSubmitContent: postRef?.comments[commentId].content,
          content: postRef!.comments[commentId].content,
          nested_lvl: 0,
          nested_comments: [
            
          ]
        };
        postRef!.comments[commentId] = newComment;
        setCurrentPost(postRef);
      }
    }
    if (isNaN(commentId)) {
      let postRef = currentPost;
      let newComment = {
        author: userName,
        nesting: "none",
        vote: 0,
        time: "Just now",
        upvotes: "1",
        hasBeenSubmittedYet: true,
        lastSubmitContent: mainComment,
        content: mainComment,
        nested_lvl: 0,
        nested_comments: [
          
        ]
      };
      postRef?.comments?.unshift(newComment);
      setCurrentPost(postRef);
      setMainComment("");
      setNotificationNum(notificationNum + 1);
      setMainComment("");
    }
  }

  const removeCurrentSub = (e: React.MouseEvent) => {
    setCurrentSub(undefined);
    navigate("/");
  }

  const identifyCurrentSub = (e: any) => {
    if (location.pathname === "/") {
      setCurrentSub(undefined);
      return;
    }

    if (location.pathname.substring(1, 2) === "r") {
      const newSub = location.pathname.substring(3)
      const subIndex = subreddits.findIndex(element => element.title === newSub);
      if (subIndex !== -1) {
        let newSub = {...subreddits[subIndex]};
        let newRules = newSub.rules;
        newRules.map((rule, i) => {
          rule.expanded = false;
          return rule;
        });
        newSub = {...newSub, rules: newRules};
        setCurrentSub(newSub);
      } else {
        return;
      }
    }  
  }

  const expandRule = (e: React.MouseEvent) => {
    if (currentSub == undefined) {
      return;
    }

    const target = e.currentTarget;
    const numString = target.id;
    const ruleNum = parseInt(numString) + 1;
    let newRules = [...currentSub.rules]
    newRules.map((rule, i) => {
      if (rule?.number === ruleNum) {
        rule.expanded = !rule.expanded;
        return rule;
      } else {
        return rule;
      }
    });

    setCurrentSub({...currentSub, rules: newRules});
  }

  useEffect(() => {
    identifyCurrentSub(location.pathname);
    setMainComment("");
    window.scrollTo(0, 0);
  }, [location.pathname])

  useEffect(() => {
    if (loginModalState === "closed") {
      return;
    }

    window.scrollTo(0, 0);
  }, [loginModalState])

  const handleSubMembership = (e: React.MouseEvent) => {
    if (loginStatus === false) {
      setLoginModalState("login");
      return;
    }

    membershipNotification(e);
    const target = e.currentTarget as HTMLButtonElement;
    const subIndex = subreddits.findIndex(element => element.title === target.id);
    const targetedSubreddit = subreddits[subIndex];

    if (targetedSubreddit.joined) {
      const joinedCommunitiesEdited = [...joinedCommunities];
      const subIndex = joinedCommunitiesEdited.findIndex(element => element === targetedSubreddit);
      joinedCommunitiesEdited.splice(subIndex, 1);
      setJoinedCommunities(joinedCommunitiesEdited);
      setNotificationNum(notificationNum + 1);
      const newCurrentSub = currentSub;
      if (newCurrentSub !== undefined) {
        newCurrentSub.joined = false;
        setCurrentSub(newCurrentSub);
      }
    } else if (targetedSubreddit.joined === false) {
      setJoinedCommunities([...joinedCommunities, targetedSubreddit]);
      setNotificationNum(notificationNum + 1);
      const newCurrentSub = currentSub;
      if (newCurrentSub !== undefined) {
        newCurrentSub.joined = true;
        setCurrentSub(newCurrentSub);
      }
    }

    const newSubredditArray = subreddits.map((sub, i) => {
      if (i === subIndex) {
        sub.joined = !sub.joined;
        return sub;
      } else {
        return sub;
      }
    });
    setSubreddits(newSubredditArray);
  }

  const enablePremium = (e: React.MouseEvent) => {
    if (loginStatus === false) {
      setLoginModalState("login");
      return;
    }

    toast.error('Premium is currently unavailable!', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }

  const submitPostNotification = (e: React.MouseEvent) => {
    toast.success('Thanks for submitting a post! 💘', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }

  const setSort = (e: React.MouseEvent) => {
    const target = e.currentTarget as HTMLButtonElement;
    setCurrentSort(target.id);
  }

  const changeSearchItemDisplay = (e: React.MouseEvent) => {
    const target = e.currentTarget as HTMLImageElement;
    const targetedId = parseInt(target.id) - 1;
    const newArray = [...searchItemDisplay];
    newArray.splice(targetedId, 1, false);
    setSearchItemDisplay(newArray);
  }

  const handleFavorite = (e: React.MouseEvent) => {
    favoriteNotification(e);

    const target = e.currentTarget;
    const targetedIndex = joinedCommunities.findIndex(sub => sub.title === target.id);
    const newJoinedCommunities = joinedCommunities.map((community, index) => {
      if (index === targetedIndex) {
        community.favorite = !community.favorite;
        return community;
      } else {
        return community;
      }
    });
    setJoinedCommunities(newJoinedCommunities);
    setNotificationNum(notificationNum + 1);
  }

  const handleHover = (e: React.MouseEvent) => {
    const target = e.currentTarget;
    setHoverState({...hoverState, [target.id]: !hoverState[target.id as keyof typeof hoverState]});
  }

  const handleExpand = (e: React.MouseEvent) => {
    const changedState = e.currentTarget.id;
    if (changedState === "erkunden") {
      setDropdownState({
        erkunden: !dropdownState.erkunden,
        gaming: false,
        sports: false,
        television: false,
        celebrity: false,
        business: false,
        crypto: false,
        mehr: false,
        weitereinfos: dropdownState.weitereinfos,
        richtlinien: dropdownState.richtlinien
      })} else {
        setDropdownState({...dropdownState, [changedState]: !dropdownState[changedState as keyof typeof dropdownState]});
      }
  }

  const openPost = (e: React.MouseEvent) => {
    let target = e.target as HTMLElement | null;
    if (target!.classList.contains("dontOpenPost") || target!.classList.contains("upvote-btn") || target!.classList.contains("downvote-btn")) {
      return;
    }

    while (target!.classList.contains("gridPost") === false) {
      if (target!.classList.contains("upvote-btn") || target!.classList.contains("downvote-btn")) {
        return;
      }
      target = target!.parentElement;
    }

    const idString = target!.id;
    const id = parseInt(idString);
    const post = posts[id];
    const subreddit = subreddits.find(sub => sub.title === post.subreddit);
    setCurrentPost(post);
    setCurrentSub(subreddit);
    navigate(`/r/${subreddit?.title}/${post.id}`);
  }

  const handleNavigate = (e: React.MouseEvent) => {
    const target = e.target as HTMLDivElement;
    const subIndex = subreddits.findIndex(element => element.title === target.id);
    if (target.classList.contains('join') || target.classList.contains('leave') || target.classList.contains('close')) {
      return;
    }
    if (subIndex !== -1) {
      setCurrentSub(subreddits[subIndex]);
    }

    if (target.classList.contains('favorite')) {
      return;
    } else if (target.classList.contains('gaming') || (target.parentElement?.classList.contains("gaming"))) {
      setCurrentSub(subreddits[11]);
      navigate("/r/gaming");
      return;
    } else if (target.classList.contains('apexlegends') || (target.parentElement?.classList.contains("apexlegends"))) {
      setCurrentSub(subreddits[11]);
      navigate("/r/apexlegends");
      return;
    } else if (target.classList.contains('genshinimpact') || (target.parentElement?.classList.contains("genshinimpact"))) {
      setCurrentSub(subreddits[2]);
      navigate("/r/genshinimpact");
      return;
    } else if (target.classList.contains('sports') || (target.parentElement?.classList.contains("sports"))) {
      setCurrentSub(subreddits[15]);
      navigate("/r/sports");
      return;
    } else if (target.classList.contains('movies') || (target.parentElement?.classList.contains("television"))) {
      setCurrentSub(subreddits[0]);
      navigate("/r/movies");
      return;
    } else if (target.classList.contains('finance') || (target.parentElement?.classList.contains("business"))) {
      setCurrentSub(subreddits[4]);
      navigate("/r/finance");
      return;
    } else if (target.classList.contains('crypto') || (target.parentElement?.classList.contains("crypto"))) {
      setCurrentSub(subreddits[16]);
      navigate("/r/crypto");
      return;
    } else if (target.classList.contains('returnHome')) {
      setCurrentSub(undefined);
      navigate("/");
      return;
    } else if (target.classList.contains('books')) {
      setCurrentSub(subreddits[10]);
      navigate("/r/books");
      return;
    } else if (target.classList.contains('join')) {
      return;
    }

    navigate(`r/${target.id}`);
    setSearchDropdown(false);
    setSearchTerm("");
  }

  const handleExpandSub = (e: React.MouseEvent) => {
    setSubDropdownIsOpen(!subDropdownIsOpen);
  }

  const closePost = (e: React.MouseEvent) => {
    navigate("/");
    setCurrentPost(undefined);
    setCurrentSub(undefined);
    setMainComment("");
  }

  const handleDropdown = (e: React.MouseEvent) => {
    const target = e.target as HTMLDivElement;
    if (target.id === "link") {
      setDropdownIsOpen(!dropdownIsOpen);
      setDropdownState({
        erkunden: false,
        gaming: false,
        sports: false,
        television: false,
        celebrity: false,
        business: false,
        crypto: false,
        mehr: false,
        weitereinfos: false,
        richtlinien: true
      });
    }
  }

  const checkDropdown = (e: any) => {
    const dropdownMenu = document.getElementById('dropdownMenu');
    const searchDropdown = document.getElementById('searchDropdown');
    const subredditDropdown = document.getElementById('subredditDropdown');
    const communitySelector = document.getElementById('community-selector');

    if (e.target.classList.contains('closeSelector') === false) {
      setSubmitDropdownState(false);
    }

    if (e.target.id === "link") {
      setSearchDropdown(false);
      return;
    } else {
      let node = e.target;
      if (node.id === "register") {
        setDropdownIsOpen(false);
        setSearchDropdown(false);
        return;
      } else if (node.parentNode.id === "register") {
        setDropdownIsOpen(false);
        setSearchDropdown(false);
        return;
      }

      while (node) {
        if (node === dropdownMenu) {
          setDropdownIsOpen(true);
          return;
        }

        if (node === searchDropdown) {
          setSearchDropdown(true);
          return;
        }
    
        node = node.parentNode;
      }
    setDropdownIsOpen(false);
    setSearchDropdown(false);
    }

    let node2 = e.target;
    if (node2.classList.contains('sub')) {
      setSubDropdownIsOpen(false);
      return;
    } else if (node2 === subredditDropdown) {
      setSubDropdownIsOpen(true);
      return
    } else if (node2.classList.contains('communityList') || node2.classList.contains('favorite')) {
      setSubDropdownIsOpen(true);
      return
    } else if (node2.id === "subredditContainer" || node2.classList.contains('return')) {
      return;
    } else {
      setSubDropdownIsOpen(false);
      return;
    }
  }

  const handleLoginModal = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    setDropdownIsOpen(false);
    setLoginModalState(target.id);
  }

  const handleLike = (e: React.MouseEvent) => {
    if (loginStatus === false) {
      setLoginModalState("login");
      return;
    }

    const target = e.currentTarget;
    const targetParent = target.parentElement;
    const ancestor = targetParent?.parentElement;
    const idString = ancestor!.parentElement!.id
    const id = parseInt(idString);
    let post = posts[id];

    if (target.id === "upvote") {
      if (post.vote === 1) {
        post.vote = 0;

        if (!post.upvotes.includes('k')) {
          let currentUpvotesString = post.upvotes;
          let currentUpvotes = parseInt(currentUpvotesString);
          currentUpvotes -= 1;
          let newUpvotes = currentUpvotes.toString();
          post.upvotes = newUpvotes;
        }
      } else {
        if (!post.upvotes.includes('k')) {
          const oldVotes = post.vote;
          const newVotes = 1;
          let currentUpvotesString = post.upvotes;
          let currentUpvotes = parseInt(currentUpvotesString);
          currentUpvotes = currentUpvotes + (newVotes - oldVotes);
          let newUpvotes = currentUpvotes.toString();
          post.upvotes = newUpvotes;
        }

        post.vote = 1;
      }

    } else if (target.id === "downvote") {
      if (post.vote === -1) {
        post.vote = 0;

        if (!post.upvotes.includes('k')) {
          let currentUpvotesString = post.upvotes;
          let currentUpvotes = parseInt(currentUpvotesString);
          currentUpvotes += 1;
          let newUpvotes = currentUpvotes.toString();
          post.upvotes = newUpvotes;
        }
      } else {
        if (!post.upvotes.includes('k')) {
          const oldVotes = post.vote;
          const newVotes = -1;
          let currentUpvotesString = post.upvotes;
          let currentUpvotes = parseInt(currentUpvotesString);
          currentUpvotes = currentUpvotes + (newVotes - oldVotes);
          let newUpvotes = currentUpvotes.toString();
          post.upvotes = newUpvotes;
        }
        
        post.vote = -1;
      }
    }

    setPosts([...posts, posts[id] = post]);
  }

  const commentNotification = (e: React.MouseEvent) => {
    toast.success('You submitted a comment. Thanks!', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }

  const favoriteNotification = (e: React.MouseEvent) => {
    const target = e.currentTarget;

    toast.info(`You ${target.classList.contains('leave') ? "removed" : "added"} r/${target.id} ${target.classList.contains('leave') ? "from" : "to"} your favorites`, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }

  const membershipNotification = (e: React.MouseEvent) => {
    const target = e.currentTarget;

    toast.info(`You just ${target.classList[0] === "join" ? "joined" : "left"} r/${target.id}.`, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }

  const onImgUpload = (e: any) => {
    setImageUploaded(true);
    const target = e.target as HTMLInputElement;
    const imgElement = document.getElementById('blah') as HTMLImageElement;
    const file = target.files;
    if (file) {
      let updatedCustomPost = {...customPost};
      updatedCustomPost.src = URL.createObjectURL(file[0]);
      setCustomPost(updatedCustomPost);
    }
  }

  const handleLikeComment = (e: React.MouseEvent) => {
    if (currentPost === undefined) {
      return;
    }

    if (loginStatus === false) {
      setLoginModalState("login");
      return;
    }

    const target = e.target as HTMLButtonElement;
    const commentId = parseInt(target.classList[0]);
    const postId = parseInt(currentPost?.id);
    const updatedPost = currentPost;
    if (target.id === "upvote") {
      console.log(target.classList);
      if (target.classList.contains('nested')) {
        console.log("upvote nest");
        const oldVotes = updatedPost.comments[commentId].nested_comments[0].vote;
        const newVotes = oldVotes === 1 ? 0 : 1;
        let currentUpvotesString = updatedPost.comments[commentId].nested_comments[0].upvotes;
        let currentUpvotes = parseInt(currentUpvotesString);
        currentUpvotes = currentUpvotes + (newVotes - oldVotes);
        let newUpvotes = currentUpvotes.toString();
        const updatedCommentArray = updatedPost.comments.map((comment, i) => {
          if (i === commentId) {
            console.log("upvote nest 2");
            comment.nested_comments[0].vote = newVotes;
            comment.nested_comments[0].upvotes = newUpvotes;
            return comment;
          } else {
            return comment;
          }
        });
        updatedPost.comments = updatedCommentArray;
        setPosts([...posts, posts[postId] = updatedPost]);
      } else {
        const oldVotes = updatedPost.comments[commentId].vote;
        const newVotes = oldVotes === 1 ? 0 : 1;
        let currentUpvotesString = updatedPost.comments[commentId].upvotes;
        let currentUpvotes = parseInt(currentUpvotesString);
        currentUpvotes = currentUpvotes + (newVotes - oldVotes);
        let newUpvotes = currentUpvotes.toString();
        const updatedCommentArray = updatedPost.comments.map((comment, i) => {
          if (i === commentId) {
            comment.vote = newVotes;
            if (comment.upvotes.includes('k')) {
              return comment;
            }
            comment.upvotes = newUpvotes;
            return comment;
          } else {
            return comment;
          }
        });
        updatedPost.comments = updatedCommentArray;
        setPosts([...posts, posts[postId] = updatedPost]);
      }
    } else if (target.id === "downvote") {
      if (target.classList.contains('nested')) {
        const oldVotes = updatedPost.comments[commentId].nested_comments[0].vote;
        const newVotes = oldVotes === -1 ? 0 : -1;
        let currentUpvotesString = updatedPost.comments[commentId].nested_comments[0].upvotes;
        let currentUpvotes = parseInt(currentUpvotesString);
        currentUpvotes = currentUpvotes + (newVotes - oldVotes);
        let newUpvotes = currentUpvotes.toString();
        const updatedCommentArray = updatedPost.comments.map((comment, i) => {
          if (i === commentId) {
            comment.nested_comments[0].vote = newVotes;
            comment.nested_comments[0].upvotes = newUpvotes;
            return comment;
          } else {
            return comment;
          }
        });
        updatedPost.comments = updatedCommentArray;
        setPosts([...posts, posts[postId] = updatedPost]);
      } else {
        const oldVotes = updatedPost.comments[commentId].vote;
        const newVotes = oldVotes === -1 ? 0 : -1;
        let currentUpvotesString = updatedPost.comments[commentId].upvotes;
        let currentUpvotes = parseInt(currentUpvotesString);
        currentUpvotes = currentUpvotes + (newVotes - oldVotes);
        let newUpvotes = currentUpvotes.toString();
        const updatedCommentArray = updatedPost.comments.map((comment, i) => {
          if (i === commentId) {
            comment.vote = newVotes;
            if (comment.upvotes.includes('k')) {
              return comment;
            }
            comment.upvotes = newUpvotes;
            return comment;
          } else {
            return comment;
          }
        });
        updatedPost.comments = updatedCommentArray;
        setPosts([...posts, posts[postId] = updatedPost]);
      }
    }
  }

  const selectAnchor = (e: React.MouseEvent) => {
    const target = e.target as HTMLDivElement;
    const index = Number(target.id);
    console.log(index);
    const newAnchorArray = currentSub?.anchors?.map((anchor, i) => {
      if (anchor && i === index) {
        setCurrentAnchor(i);
        return anchor;
      } else {
        return anchor;
      }
    });
  }

  const handleSelectSort = (e: React.MouseEvent) => {
    const target = e.currentTarget;
    navigate("/");
    setCurrentSort(target.id);
  }

  const navToSubmit = (e: React.MouseEvent) => {
    if (loginStatus === false) {
      setLoginModalState("login");
      return;
    }
    navigate("/submit");
    setSubmitPostType("text");
  }

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.currentTarget as HTMLInputElement;
    setSearchTerm(target.value);
  }

  const editPostTitle = (e: any) => {
    const target = e.target;
    let updatedCustomPost = {...customPost};
    updatedCustomPost.title = target.value;
    setCustomPost(updatedCustomPost);
  }

  const editPostSrc = (e: any) => {
    const target = e.target;
    let updatedCustomPost = {...customPost};
    updatedCustomPost.src = target.value;
    setCustomPost(updatedCustomPost);
  }

  const savePost = (e: React.MouseEvent) => {
    if (loginStatus === false) {
      setLoginModalState('login');
      return;
    }

    const target = e.currentTarget;
    let node = target;

    while (node.classList.contains('gridPost') === false) {
      if (node === null ||  node.parentElement === null) {
        return;
      }
      node = node.parentElement;
    }
    const postIdString = node.id;
    const postId = parseInt(postIdString);

    let updatedPosts = [...posts];
    updatedPosts = updatedPosts.map((post, i) => {
      if (i === postId) {
        post.saved = !post.saved;
        return post;
      } else {
        return post;
      }
    });
    setPosts(updatedPosts);
    saveNotification(e);
  }

  const saveNotification = (e: React.MouseEvent) => {
    const target = e.currentTarget;

    toast.success(`Post ${target.id === "save" ? "saved" : "unsaved"} successfully`, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }

  const handleLogin = (e: React.MouseEvent) => {
    if (userName.length < 4 || password.length < 6) {
      if (userName.length < 4 && password.length < 6) {
        setShowAuthAlert({
          username: true,
          password: true
        });
      } else if (userName.length < 4 && password.length >= 6) {
        setShowAuthAlert({
          username: true,
          password: false
        });
      } else if (userName.length >= 4 && password.length < 6) {
        setShowAuthAlert({
          username: false,
          password: true
        });
      }

      return;
    }

    const target = e.target as HTMLButtonElement | HTMLDivElement;
    if (target.id === "login") {
      setLoginStatus(true);
      setLoginModalState("closed");
    } else if (target.id === "demo") {
      setLoginStatus(true);
      setUserName("Nikola Tesla");
      setPassword("electricity");
      setLoginModalState("closed");
    } else if (target.id === "logout") {
      setDropdownIsOpen(false);
      setLoginStatus(false);
    }
  }

  const switchCommunityOptions = (e: React.MouseEvent) => {
    setCommunityOptions(!communityOptions);
  }

  const switchCommunityTheme = (e: React.MouseEvent) => {
    setCommunityTheme(!communityTheme);
  }

  const quickNavigate = (e: React.MouseEvent) => {
    navigate(`r/${currentSub}`);
  }

  const handleNestedComment = (e: React.MouseEvent) => {
    if (loginStatus === false) {
      setLoginModalState("login");
      return;
    }

    const target = e.currentTarget;
    setCurrentEditedComment("");
    
    if (target.classList.contains("nested") === false) {
      target.classList.add("nested");
    }

    const commentIdString = target.id;
    if (currentPost !== undefined) {
      const targetedPost = {...currentPost};
      targetedPost.comments = targetedPost.comments?.map((comment, i) => {
        const commentId = parseInt(commentIdString);
        if (i === commentId && target.classList.contains("replyable") === false) {
          comment.nesting = "edit";

          if (comment.nested_comments.length == 0) {
            comment.nested_comments.unshift({
              author: userName,
              time: "Just Now",
              upvotes: "1",
              content: "",
              vote: 0,
              nesting: "none",
              nested_lvl: 1,
              hasBeenSubmittedYet: false,
              lastSubmitContent: "",
              nested_comments: [
                  
              ]
            });
          }

          return comment;
        } else {
          if (target.classList.contains("cancel")) {
            comment.nesting === "edit" ? comment.nesting = "none" : comment.nesting = comment.nesting;
            if (comment.nesting === "edit") {
              comment.nested_comments.splice(0, 1);
            }
          }
          return comment;
        }
      });
      setCurrentPost(targetedPost);
    }
  }

  useEffect(() => {
    if (loginStatus === false) {
      if (location.pathname === "/submit") {
        navigate("/");
      }
    }

    if (loginStatus === false) {
      

      setCachedPosts([...posts]);
      setCachedUserData({
        username: userName,
        password: password
      });
      setUserName("");
      setPassword("");

      let updatedPosts = [...posts];
      let postsAfterVoteReset = posts.map((post, i) => {
        post.vote = 0;
        let updatedComments = post.comments.map((comment, i) => {
          comment.vote = 0;
          let updatedNestedComments = comment.nested_comments.map((nestedComment, i) => {
            nestedComment.vote = 0;
            return nestedComment;
          });
          comment.nested_comments = updatedNestedComments;
          return comment;
        });
        post.comments = updatedComments;
        return post;
      });
      setPosts(postsAfterVoteReset);

      if (currentPost !== undefined) {
        let postId = postsAfterVoteReset.findIndex(post => post.title === currentPost.title);
        setCurrentPost(postsAfterVoteReset[postId]);
      }
    }
  }, [loginStatus])

  const standardTheme = {
    buttonColor: "#0079d3",
    headerColor: "#0079d3",
    banner: "../../resources/images/Communities/todayilearned/banner.jpg",
  }

  return (
    <div onClick={checkDropdown} style={{ maxHeight: loginModalState === "closed" ? "" : "100vh !important", overflow: loginModalState === "closed" ? "" : "hidden" }} id="app">
      {loginModalState !== "closed" ? 
      <LoginModal 
        loginModalState={loginModalState}
        handleLoginModal={handleLoginModal}
        handleLoginInput={handleLoginInput}
        handleHover={handleHover}
        hoverState={hoverState}
        userName={userName}
        password={password}
        loginStatus={loginStatus}
        handleLogin={handleLogin}
        showAuthAlert={showAuthAlert}
      /> : null}
      <NavBar 
        dropdownIsOpen={dropdownIsOpen}
        handleSelectSort={handleSelectSort}
        dropdownState={dropdownState}
        handleDropdown={handleDropdown}
        handleExpand={handleExpand}
        handleLoginModal={handleLoginModal}
        submitPage={submitPage}
        userName={userName}
        loginStatus={loginStatus}
        handleLogin={handleLogin}
        joinedCommunities={joinedCommunities}
        handleFavorite={handleFavorite}
        subDropdownIsOpen={subDropdownIsOpen}
        handleExpandSub={handleExpandSub}
        handleNavigate={handleNavigate}
        randomIntToString={randomIntToString}
        currentSub={currentSub}
        navToSubmit={navToSubmit}
        subreddits={subreddits}
        removeCurrentSub={removeCurrentSub}
        handleInputChange={handleInputChange}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchDropdown={searchDropdown}
        searchItemDisplay={searchItemDisplay}
        changeSearchItemDisplay={changeSearchItemDisplay}
        handleNotifications={handleNotifications}
        notificationNum={notificationNum}
        quickNavigate={quickNavigate}
      />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        style={{ width: "350px" }}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes key={location.pathname} location={location}>
        <Route path='/' element={<Home 
          randomIntToString={randomIntToString}
          userName={userName}
          currentSort={currentSort}
          setSort={setSort}
          subreddits={subreddits}
          topSubreddits={topSubreddits}
          handleSubMembership={handleSubMembership}
          loginStatus={loginStatus}
          setLoginModalState={setLoginModalState}
          handleNavigate={handleNavigate}
          navToSubmit={navToSubmit}
          loginModalState={loginModalState}
          currentSub={currentSub}
          posts={posts}
          handleLike={handleLike}
          currentPost={currentPost}
          openPost={openPost}
          mainComment={mainComment}
          writeComment={writeComment}
          submitComment={submitComment}
          handleLikeComment={handleLikeComment}
          handleNestedComment={handleNestedComment}
          setIndex={setIndex}
          writeNestedComment={writeNestedComment}
          submitNestedComment={submitNestedComment}
          currentEditedComment={currentEditedComment}
          editComment={editComment}
          editNestedComment={editNestedComment}
          enablePremium={enablePremium}
          savePost={savePost}
        />} />
        <Route path='/r/:subredditId' element={<SubredditPage
          randomIntToString={randomIntToString}
          userName={userName}
          currentSort={currentSort}
          setSort={setSort}
          subreddits={subreddits}
          topSubreddits={topSubreddits}
          handleSubMembership={handleSubMembership}
          loginStatus={loginStatus}
          setLoginModalState={setLoginModalState}
          handleNavigate={handleNavigate}
          navToSubmit={navToSubmit}
          identifyCurrentSub={identifyCurrentSub}
          currentSub={currentSub}
          selectAnchor={selectAnchor}
          currentAnchor={currentAnchor}
          expandRule={expandRule}
          loginModalState={loginModalState}
          posts={posts}
          handleLike={handleLike}
          currentPost={currentPost}
          openPost={openPost}
          communityOptions={communityOptions}
          communityTheme={communityTheme}
          switchCommunityOptions={switchCommunityOptions}
          switchCommunityTheme={switchCommunityTheme}
          standardTheme={standardTheme}
          mainComment={mainComment}
          writeComment={writeComment}
          submitComment={submitComment}
          handleLikeComment={handleLikeComment}
          handleNestedComment={handleNestedComment}
          setIndex={setIndex}
          writeNestedComment={writeNestedComment}
          submitNestedComment={submitNestedComment}
          currentEditedComment={currentEditedComment}
          editComment={editComment}
          editNestedComment={editNestedComment}
          submitPage={submitPage}
          savePost={savePost}
        />} />
        <Route path='/profile' element={<Home
          randomIntToString={randomIntToString}
          userName={userName}
          currentSort={currentSort}
          setSort={setSort}
          subreddits={subreddits}
          topSubreddits={topSubreddits}
          handleSubMembership={handleSubMembership}
          loginStatus={loginStatus}
          setLoginModalState={setLoginModalState}
          handleNavigate={handleNavigate}
          navToSubmit={navToSubmit}
          loginModalState={loginModalState}
          currentSub={currentSub}
          posts={posts}
          handleLike={handleLike}
          currentPost={currentPost}
          openPost={openPost}
          mainComment={mainComment}
          writeComment={writeComment}
          submitComment={submitComment}
          handleLikeComment={handleLikeComment}
          handleNestedComment={handleNestedComment}
          setIndex={setIndex}
          writeNestedComment={writeNestedComment}
          submitNestedComment={submitNestedComment}
          currentEditedComment={currentEditedComment}
          editComment={editComment}
          editNestedComment={editNestedComment}
          enablePremium={enablePremium}
          savePost={savePost}
        />} />
        <Route path='/submit' element={<SubmitPage
          randomIntToString={randomIntToString}
          submitPostType={submitPostType}
          setSubmitPostType={setSubmitPostType}
          userName={userName}
          subreddits={subreddits}
          loginStatus={loginStatus}
          setLoginModalState={setLoginModalState}
          handleNavigate={handleNavigate}
          navToSubmit={navToSubmit}
          loginModalState={loginModalState}
          currentSub={currentSub}
          posts={posts}
          currentPost={currentPost}
          openPost={openPost}
          setIndex={setIndex}
          standardTheme={standardTheme}
          customPost={customPost}
          editPostTitle={editPostTitle}
          editPostSrc={editPostSrc}
          switchCommunityTheme={switchCommunityTheme}
          switchCommunityOptions={switchCommunityOptions}
          expandRule={expandRule}
          communityOptions={communityOptions}
          submitPage={submitPage}
          communityTheme={communityTheme}
          selectSubmitDropdown={selectSubmitDropdown}
          submitDropdownState={submitDropdownState}
          selectSubmitSubreddit={selectSubmitSubreddit}
          onImgUpload={onImgUpload}
          imageUploaded={imageUploaded}
          removeUploadedImg={removeUploadedImg}
          submitCustomPost={submitCustomPost}
          submitLoading={submitLoading}
        />} />
        <Route path='/r/:subredditId/:postId' element={<IndividualPost
          randomIntToString={randomIntToString}
          userName={userName}
          currentSort={currentSort}
          setSort={setSort}
          subreddits={subreddits}
          topSubreddits={topSubreddits}
          handleSubMembership={handleSubMembership}
          loginStatus={loginStatus}
          setLoginModalState={setLoginModalState}
          handleNavigate={handleNavigate}
          navToSubmit={navToSubmit}
          loginModalState={loginModalState}
          currentSub={currentSub}
          posts={posts}
          handleLike={handleLike}
          currentPost={currentPost}
          openPost={openPost}
          communityOptions={communityOptions}
          communityTheme={communityTheme}
          switchCommunityOptions={switchCommunityOptions}
          switchCommunityTheme={switchCommunityTheme}
          standardTheme={standardTheme}
          expandRule={expandRule}
          mainComment={mainComment}
          writeComment={writeComment}
          submitComment={submitComment}
          handleLikeComment={handleLikeComment}
          closePost={closePost}
          handleNestedComment={handleNestedComment}
          setIndex={setIndex}
          writeNestedComment={writeNestedComment}
          submitNestedComment={submitNestedComment}
          currentEditedComment={currentEditedComment}
          editComment={editComment}
          editNestedComment={editNestedComment}
          submitPage={submitPage}
          savePost={savePost}
        />} />
      </Routes>
    </div>
  );
}

export default App;
