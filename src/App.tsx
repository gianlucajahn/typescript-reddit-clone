// Imports
// Component Imports
import IndividualPost from './containers/individualPost/individualPost';
import SubmitPage from './containers/SubmitPage/SubmitPage';
import Home from './containers/Home/Home';
import NavBar from './containers/NavBar/NavBar';
import LoginModal from './components/LoginModal/LoginModal';
import ProfilePage from './containers/ProfilePage/ProfilePage';
// Utility Imports
import SubredditPage from './containers/SubredditPage/SubredditPage';
import subredditArray from './utils/subredditArray';
import postArray from './utils/postArray';
import userArray from './utils/userArray';
// Object & Method imports
import React, { ChangeEvent, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { Subreddits, Subreddit, Post, Comment, UserData, baseCustomPost, Draft, Notifications, userObjectArray, userObject } from "./types/types";
import { ToastContainer, toast } from 'react-toastify';
// CSS Imports
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';

function App() {

  // define variables to use useLocation() and useNavigate() hooks with
  const location = useLocation();
  const navigate = useNavigate();

  // Application's global state
  const [currentlyRenderedPosts, setCurrentlyRenderedPosts] = useState(8);
  const [subreddits, setSubreddits] = useState(subredditArray);
  const [currentEditedComment, setCurrentEditedComment] = useState("");
  const [posts, setPosts] = useState<Post[]>(postArray);
  const [customPost, setCustomPost] = useState<Post>(baseCustomPost);
  const [notificationNum, setNotificationNum] = useState(0);
  const [notificationDropdown, setNotificiationDropdown] = useState(false);
  const [topSubreddits, setTopSubreddits] = useState(subreddits.slice(0, 5));
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [userData, setUserData] = useState<userObjectArray>(userArray);
  const [currentUserData, setCurrentUserData] = useState<userObject>();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [searchDropdown, setSearchDropdown] = useState(false);
  const [notificationArray, setNotificationArray] = useState<Notifications>([]);
  const [currentAnchor, setCurrentAnchor] = useState(Number);
  const [currentlyInspectedUser, setCurrentlyInspectedUser] = useState("");
  const [selectedAnchor, setSelectedAnchor] = useState("");
  const [cachedPosts, setCachedPosts] = useState<Post[]>();
  const [cachedUserData, setCachedUserData] = useState<UserData>();
  const [currentSub, setCurrentSub] = useState<Subreddit>();
  const [addedConfetti, setAddedConfetti] = useState(false);
  const [currentPost, setCurrentPost] = useState<Post>();
  const [subDropdownIsOpen, setSubDropdownIsOpen] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [submitPage, setSubmitPage] = useState(false);
  const [renderNum, setRenderNum] = useState(5);
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

  // login modal authentication / alerts
  // Used in: LoginModal.tsx
  const [showAuthAlert, setShowAuthAlert] = useState({
    username: false,
    password: false,
    wrongPassword: false,
    usernameDoesNotExist: false,
    usernameTaken: false
  });

  // base state for search bar 
  // Used in: NavBar.tsx
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

  // base state for navbar dropdown menu
  // Used in: NavBar.tsx
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

  // base state for hoverable elements
  // Used in: NavBar.tsx
  const [hoverState, setHoverState] = useState({
    username: false,
    password: false
  });

  // base state for 'joinedCommunities' array
  // Used in: NavBar.tsx
  const [joinedCommunities, setJoinedCommunities] = useState([
    subreddits[5],
    subreddits[6],
    subreddits[1],
    subreddits[7],
    subreddits[8],
    subreddits[9],
  ]);

  // base state for search array
  // Used in: NavBar.tsx
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

  // enable/disable search dropdown menu depending on search term length
  // Used in: NavBar.tsx
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

  // enable picture display on image upload via state
  // Used in: SubmitPage.tsx
  useEffect(() => {
    if (imageUploaded) {
      setImageUploadCount(imageUploadCount + 1);

      if (imageUploadCount >= 1) {
        setImageUploaded(false);
        setImageUploadCount(0);
      }
    }
  }, [customPost.src])

  // check if current location is the submit page
  // Used in: SubmitPage.tsx
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

  // assign one post from the desired subreddit to currentPost to be able to post to the correct sub on submit page
  // Used in: SubmitPage.tsx
  useEffect(() => {
    if (submitPage) {
      if (currentSub !== undefined) {
        const subNum = subreddits.findIndex(sub => sub.title === currentSub.title);
        setCurrentPost(posts[subNum * 5 + 1]);
      }
    }
  }, [submitPage])

  // reset amount of rendered posts on sorter switch
  // Used in: Grid.tsx
  useEffect(() => {
    setRenderNum(5);
  }, [currentSort])

  // reset notification count upon opening notification dropdown menu
  // Used in: NavBar.tsx
  const handleNotifications = (e: React.MouseEvent) => {
    const target = e.currentTarget;
    if (target.classList.contains('noti')) {
      setNotificationNum(0);
    } 
  }

  // handle user input in the login modal, put out alerts if username/password don't fit requirements
  // Used in: LoginModal.tsx
  const handleLoginInput = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target.id === "username") {
      setUserName(target.value);
      if (target.value.length >= 4) {
        setShowAuthAlert({
          username: false,
          password: showAuthAlert.password,
          usernameDoesNotExist: false,
          wrongPassword: false,
          usernameTaken: false
        });
      }
    } else if (target.id === "password") {
      setPassword(target.value);
      if (target.value.length >= 6) {
        setShowAuthAlert({
          username: showAuthAlert.username,
          password: false,
          usernameDoesNotExist: false,
          wrongPassword: false,
          usernameTaken: false
        });
      }
    }
  }

  // handle user input on EditComment textarea element
  // Used in: EditComment.tsx
  const writeComment = (e: any) => {
    const target = e.target;
    setMainComment(target.value);
  }

  // handle user input on nested EditComment textarea element
  // Used in: EditComment.tsx
  const writeNestedComment = (e: any) => {
    let target = e.target;
    setCurrentEditedComment(target.value);
  }

  // submit edited comment
  // Used in: EditComment.tsx
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

  // remove image that has previously been uploaded in SubmitPost component's input element
  // Used in: SubmitPage.tsx
  const removeUploadedImg = (e: React.MouseEvent) => {
    setImageUploadCount(0);
    setImageUploaded(false);

    let updatedCustomPost = {...customPost};
    updatedCustomPost.src = "";
    setCustomPost(updatedCustomPost);
  }

  // increase amount of currently rendered posts on scroll (infinite scrolling)
  // Used in: Grid.tsx
  const addPostsToRender = (e: React.MouseEvent) => {
    setCurrentlyRenderedPosts(currentlyRenderedPosts + 8);
  }

  // submit nested edited comment
  // Used in: EditComment.tsx
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

  // submit nested comment (who would've thought)
  // Used in: EditComment.tsx
  const submitNestedComment = (e: React.MouseEvent) => {
    if (currentPost === undefined) {
      return;
    }

    // Add "commenter" tropy to user trophy case
    let updatedUserData = [...userData];
    let userId = userData.findIndex(user => user.username === userName);
    let userObject = {...userData[userId]};

    // Don't add second commenter trophy if user already has one
    if (userObject.trophies.includes("commenter")) {
      
    } else {
      userObject.trophies.push("commenter");
      updatedUserData = updatedUserData.map((user, i) => {
        if (i === userId) {
          user = userObject;
          return user;
        } else {
          return user;
        }
      });
      setUserData(updatedUserData);
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

    const newNotification = {
      number: notificationArray.length,
      type: "comment",
      subreddit: currentSub!.title,
      time: "Just Now",
      title: `Thanks for submitting a comment in r/${currentSub!.title}!`,
      content: `We'll let you know if someone replies to your comment. Thanks for using our service!`
    };
    let newNotificationArray = [...notificationArray];
    newNotificationArray.push(newNotification);
    setNotificationArray(newNotificationArray);
  }

  // display subreddit selection dropdown menu in SubmitPage component
  // Used in: SubmitPage.tsx
  const selectSubmitDropdown = (e: React.MouseEvent) => {
    setSubmitDropdownState(true);
  }

  // hide subreddit selection dropdown menu in SubmitPage component, navigate to newly created post
  // Used in: SubmitPage.tsx
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

  // submit newly created post
  // Used in: SubmitPage.tsx
  const submitCustomPost = (e: React.MouseEvent) => {
    if (currentSub === undefined) {
      return;
    }

    // Add "poster" tropy to user trophy case
    let updatedUserData = [...userData];
    let userId = userData.findIndex(user => user.username === userName);
    let userObject = {...userData[userId]};

    // Don't add second poster trophy if user already has one
    if (userObject.trophies.includes("poster")) {
      
    } else {
      userObject.trophies.push("poster");
      updatedUserData = updatedUserData.map((user, i) => {
        if (i === userId) {
          user = userObject;
          return user;
        } else {
          return user;
        }
      });
      setUserData(updatedUserData);
    }

    // Initiate loading, add post to posts array and navigate to new post page
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
      const newNotification = {
        number: notificationArray.length,
        type: "post",
        subreddit: currentSub!.title,
        time: "Just Now",
        title: `Thanks for creating your post in r/${currentSub!.title}!`,
        content: `You just created your very own post! Come back later to see if anyone talks about it.`
      };
      let newNotificationArray = [...notificationArray];
      newNotificationArray.push(newNotification);
      setNotificationArray(newNotificationArray);

      navigate(`/r/${currentSub.title}/${postId}`);
      setCustomPost(baseCustomPost);
      setSubmitLoading(false);
      submitPostNotification(e);
    }, 2150);
  }

  // submit comment
  // Used in: EditComment.tsx
  const submitComment = (e: React.MouseEvent) => {
    commentNotification(e);
    const target = e.currentTarget as HTMLButtonElement;

    // Add "commenter" tropy to user trophy case
    let updatedUserData = [...userData];
    let userId = userData.findIndex(user => user.username === userName);
    let userObject = {...userData[userId]};

    // Don't add second commenter trophy if user already has one
    if (userObject.trophies.includes("commenter")) {
      
    } else {
      userObject.trophies.push("commenter");
      updatedUserData = updatedUserData.map((user, i) => {
        if (i === userId) {
          user = userObject;
          return user;
        } else {
          return user;
        }
      });
      setUserData(updatedUserData);
    }

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
      const newNotification = {
        number: notificationArray.length,
        type: "comment",
        subreddit: currentSub!.title,
        time: "Just Now",
        title: `Thanks for submitting a comment in r/${currentSub!.title}!`,
        content: `We'll let you know if someone replies to your comment. Thanks for using our service!`
      };
      let newNotificationArray = [...notificationArray];
      newNotificationArray.push(newNotification);
      setNotificationArray(newNotificationArray);

      setMainComment("");
    }
  }

  // Reset currentSub state and navigate back to home page on click
  // Used in: NavBar.tsx, search bar
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

  // disable scrolling on opening of LoginModal
  // Used in: LoginModal.tsx
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

  // Used in: Join/Leave subreddits
  // Used in: NavBar.tsx
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
      const newNotification = {
        number: notificationArray.length,
        type: "subreddit",
        subreddit: targetedSubreddit.title,
        time: "Just Now",
        title: `You just left r/${targetedSubreddit.title}!`,
        content: `Sorry to see you go! We hope you'll be having fun in other communities.`
      };
      let newNotificationArray = [...notificationArray];
      newNotificationArray.push(newNotification);
      setNotificationArray(newNotificationArray);

      const newCurrentSub = currentSub;
      if (newCurrentSub !== undefined) {
        newCurrentSub.joined = false;
        setCurrentSub(newCurrentSub);
      }
    } else if (targetedSubreddit.joined === false) {
      setJoinedCommunities([...joinedCommunities, targetedSubreddit]);

      setNotificationNum(notificationNum + 1);
      const newNotification = {
        number: notificationArray.length,
        type: "comment",
        subreddit: targetedSubreddit.title,
        time: "Just Now",
        title: `You just joined r/${targetedSubreddit.title}!`,
        content: `Welcome to the sub! Make sure to checkout r/${targetedSubreddit.title}'s newest posts.`
      };
      let newNotificationArray = [...notificationArray];
      newNotificationArray.push(newNotification);
      setNotificationArray(newNotificationArray);

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

  // Navigate to the targeted sub when notifications in the notification dropdown menu are clicked
  // Used in: NavBar.tsx
  const clickNotification = (e: React.MouseEvent) => {
    const target = e.currentTarget;
    const subId = subreddits.findIndex(sub => sub.title === target.id);
    if (subId !== -1) {
      setCurrentSub(subreddits[subId]);
      navigate(`/r/${subreddits[subId].title}`);
    }
  }

  // Fired when premium button is clicked
  // Used in: Home.tsx
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

  // Send notification when custom post is submitted
  // Used in: SubmitPage.tsx
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

  // Switch sorting algorithm 
  // Used in: SortBar.tsx
  const setSort = (e: React.MouseEvent) => {
    const target = e.currentTarget as HTMLButtonElement;
    setCurrentSort(target.id);
  }

  // delete targeted search item from search dropdown menu
  // Used in: NavBar.tsx, search bar
  const changeSearchItemDisplay = (e: React.MouseEvent) => {
    const target = e.currentTarget as HTMLImageElement;
    const targetedId = parseInt(target.id) - 1;
    const newArray = [...searchItemDisplay];
    newArray.splice(targetedId, 1, false);
    setSearchItemDisplay(newArray);
  }

  // (un-)favorite targeted subreddit
  // Used in: NavBar.tsx
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
    const newNotification = {
      number: notificationArray.length,
      type: "favorite",
      subreddit: joinedCommunities[targetedIndex].title,
      time: "Just Now",
      title: `You just ${target.classList.contains("leave") ? "left" : "joined"} r/${joinedCommunities[targetedIndex].title}!`,
      content: `${target.classList.contains("leave") ? "Sad to see you're removing this sub from your favorites. Feel free to leave us some constructive criticism if you like!" : "Great to see you're loving this community. We'll make sure to provide you with the best of content!"}`
    };
    let newNotificationArray = [...notificationArray];
    newNotificationArray.push(newNotification);
    setNotificationArray(newNotificationArray);
  }

  // Handle hover events in NavBar
  // Used in: NavBar.tsx
  const handleHover = (e: React.MouseEvent) => {
    const target = e.currentTarget;
    setHoverState({...hoverState, [target.id]: !hoverState[target.id as keyof typeof hoverState]});
  }

  // expand/close dropdown menu's for subreddit categories
  // Used in: NavBar.tsx
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

  // navigate to current user's profile
  // Used in: NavBar.tsx
  const navToProfile = (e: React.MouseEvent) => {
    setCurrentSub(undefined);
    setCurrentlyInspectedUser(userName);
    let userId = userData.findIndex(user => user.username === userName);
    setCurrentUserData(userData[userId]);
    navigate(`/user/${userName}`);
  }

  // navigate to targeted user's profile
  // Used in: NavBar.tsx
  const navToUserProfile = (e: React.MouseEvent) => {
    const target = e.currentTarget;

    if (loginStatus === false) {
      setLoginModalState("login");
      return;
    }
    setCurrentSub(undefined);
    setCurrentlyInspectedUser(target.id);
    let userId = userData.findIndex(user => user.username === target.id);

    if (userId === -1) {
      return;
    }

    setCurrentUserData(userData[userId]);
    navigate(`/user/${target.id}`);
  }

  // switch from current page to individual post page
  // Used in: Grid.tsx
  const openPost = (e: React.MouseEvent) => {
    let target = e.target as HTMLElement | null;
    if (target!.classList.contains("dontOpenPost") || target!.classList.contains("upvote-btn") || target!.classList.contains("downvote-btn") || target!.classList.contains("span") || target!.classList.contains("comment-author")) {
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

  // navigate to targeted subreddit 
  // Used in: NavBar.tsx / GridPost.tsx
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

  // expand/close subreddit dropdown menu
  // Used in: NavBar.tsx
  const handleExpandSub = (e: React.MouseEvent) => {
    setSubDropdownIsOpen(!subDropdownIsOpen);
  }

  // close current individual post page and navigate back to home page
  // Used in: individualPost.tsx
  const closePost = (e: React.MouseEvent) => {
    navigate("/");
    setCurrentPost(undefined);
    setCurrentSub(undefined);
    setMainComment("");
  }

  // reset dropdown menu state
  // Used in: NavBar.tsx
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

  // open targeted dropdown menu &/or close all other ones on window click event
  // Used in: App.tsx
  const checkDropdown = (e: any) => {
    const dropdownMenu = document.getElementById('dropdownMenu');
    const searchDropdown = document.getElementById('searchDropdown');
    const subredditDropdown = document.getElementById('subredditDropdown');
    const communitySelector = document.getElementById('community-selector');

    if (e.target.classList.contains('closeSelector') === false) {
      setSubmitDropdownState(false);
    }

    if (e.target.classList.contains('profil')) {
      setDropdownIsOpen(false);
      return;
    }

    if (e.target.classList.contains("dd") === false) {
      setNotificiationDropdown(false);
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

  // Switch login modal state from login to register & vice versa
  // Used in: LoginModal.tsx
  const handleLoginModal = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    setDropdownIsOpen(false);
    setLoginModalState(target.id);
    setShowAuthAlert({
      username: false,
      password: false,
      wrongPassword: false,
      usernameDoesNotExist: false,
      usernameTaken: false
    });
  }

  // handle click events on upvote/downvote buttons 
  // Used in: GridPost.tsx
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
        // remove 1 karma from author
        let userId = userData.findIndex(user => user.username === post.author);
        let newUserData = userData.map((user, i) => {
          if (i === userId) {
            let karmaNum = parseInt(user.karma);
            karmaNum = karmaNum - 1;
            let karmaString = karmaNum.toString();
            user.karma = karmaString;
            return user;
          } else {
            return user;
          }
        });
        setUserData(newUserData);
        post.vote = 0;

        if (!post.upvotes.includes('k')) {
          let currentUpvotesString = post.upvotes;
          let currentUpvotes = parseInt(currentUpvotesString);
          currentUpvotes -= 1;
          let newUpvotes = currentUpvotes.toString();
          post.upvotes = newUpvotes;
        }
      } else {
        // add 1/2 karma to author
        let userId = userData.findIndex(user => user.username === post.author);
        let newUserData = userData.map((user, i) => {
          if (i === userId) {
            let karmaNum = parseInt(user.karma);
            post.vote === 0 ? karmaNum = karmaNum + 1 : karmaNum = karmaNum + 2;
            let karmaString = karmaNum.toString();
            user.karma = karmaString;
            return user;
          } else {
            return user;
          }
        });
        setUserData(newUserData);
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
        // add 1 karma to author
        let userId = userData.findIndex(user => user.username === post.author);
        let newUserData = userData.map((user, i) => {
          if (i === userId) {
            let karmaNum = parseInt(user.karma);
            karmaNum = karmaNum + 1;
            let karmaString = karmaNum.toString();
            user.karma = karmaString;
            return user;
          } else {
            return user;
          }
        });
        setUserData(newUserData);
        post.vote = 0;

        if (!post.upvotes.includes('k')) {
          let currentUpvotesString = post.upvotes;
          let currentUpvotes = parseInt(currentUpvotesString);
          currentUpvotes += 1;
          let newUpvotes = currentUpvotes.toString();
          post.upvotes = newUpvotes;
        }
      } else {
        // remove 1/2 karma from author
        let userId = userData.findIndex(user => user.username === post.author);
        let newUserData = userData.map((user, i) => {
          if (i === userId) {
            let karmaNum = parseInt(user.karma);
            post.vote === 0 ? karmaNum = karmaNum - 1 : karmaNum = karmaNum - 2;
            let karmaString = karmaNum.toString();
            user.karma = karmaString;
            return user;
          } else {
            return user;
          }
        });
        setUserData(newUserData);
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
    let copiedPosts = [...posts];
    let newPosts = copiedPosts.map((posting, i) => {
      if (posting.id !== post.id) {
        return posting;
      } else {
        posting = post;
        return posting;
      }
    })
    setPosts(newPosts);
  }

  // define comment notification
  // Used in: EditComment.tsx
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

  // define favorization notification
  // Used in: NavBar.tsx
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

  // define membership notification
  // Used in: SubredditHeadline.tsx / HomeSideBar.tsx
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

  // handle image upload on input type="file" elements
  // Used in: SubmitPage.tsx
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

  // handle click events on upvote/downvote buttons in PostedComment components
  // Used in: PostedComment.tsx
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
      if (target.classList.contains('nested')) {
        const oldVotes = updatedPost.comments[commentId].nested_comments[0].vote;
        const newVotes = oldVotes === 1 ? 0 : 1;
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
        let updatedPosts = posts.map((post, i) => {
          if (i === postId) {
            post = updatedPost;
            return post;
          } else {
            return post;
          }
        });
        setPosts(updatedPosts);
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
        let updatedPosts = posts.map((post, i) => {
          if (i === postId) {
            post = updatedPost;
            return post;
          } else {
            return post;
          }
        });
        setPosts(updatedPosts);
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
        let updatedPosts = posts.map((post, i) => {
          if (i === postId) {
            post = updatedPost;
            return post;
          } else {
            return post;
          }
        });
        setPosts(updatedPosts);
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
        let updatedPosts = posts.map((post, i) => {
          if (i === postId) {
            post = updatedPost;
            return post;
          } else {
            return post;
          }
        });
        setPosts(updatedPosts);
      }
    }
  }

  // switch to specificed anchor on page
  // Used in: -
  const selectAnchor = (e: React.MouseEvent) => {
    const target = e.target as HTMLDivElement;
    const index = Number(target.id);
    const newAnchorArray = currentSub?.anchors?.map((anchor, i) => {
      if (anchor && i === index) {
        setCurrentAnchor(i);
        return anchor;
      } else {
        return anchor;
      }
    });
  }

  // Switch currently used sorting algorithm
  // Used in: SortBar.tsx
  const handleSelectSort = (e: React.MouseEvent) => {
    const target = e.currentTarget;
    navigate("/");
    setCurrentSort(target.id);
  }

  // navigate to submit page
  // Used in: HomeSideBar.tsx / SubredditSideBar.tsx / ProfilePage.tsx / NavBar.tsx
  const navToSubmit = (e: React.MouseEvent) => {
    const target = e.currentTarget;

    if (loginStatus === false) {
      setLoginModalState("login");
      return;
    }

    if (target.classList.contains('image')) {
      setSubmitPostType("image");
    } else if (target.classList.contains("link")) {
      setSubmitPostType("link");
    } else {
      setSubmitPostType("text");
    }
    navigate("/submit");
  }

  // handle search bar input change
  // Used in: NavBar.tsx
  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.currentTarget as HTMLInputElement;
    setSearchTerm(target.value);
  }

  // handle input changes on submit post page's title element
  // Used in: SubmitPage.tsx
  const editPostTitle = (e: any) => {
    const target = e.target;
    let updatedCustomPost = {...customPost};
    updatedCustomPost.title = target.value;
    setCustomPost(updatedCustomPost);
  }

  // handle input changes on submit post page's input element
  // Used in: SubmitPage.tsx
  const editPostSrc = (e: any) => {
    const target = e.target;
    let updatedCustomPost = {...customPost};
    updatedCustomPost.src = target.value;
    setCustomPost(updatedCustomPost);
  }

  // add targeted post to user's saved posts
  // Used in: GridPost.tsx
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

  // define saving notification
  // Used in: GridPost.tsx
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

  // handle click events on Login/Register/Demo Account buttons in Login Modal
  // Used in: LoginModal.tsx
  const handleLogin = (e: React.MouseEvent) => {
    const target = e.target as HTMLButtonElement | HTMLDivElement;

    if (userName.length < 4 || password.length < 6) {
      if (target.id !== "demo") {
        if (userName.length < 4 && password.length < 6) {
          setShowAuthAlert({
            username: true,
            password: true,
            usernameDoesNotExist: showAuthAlert.usernameDoesNotExist,
            wrongPassword: showAuthAlert.wrongPassword,
            usernameTaken: showAuthAlert.usernameTaken
          });
        } else if (userName.length < 4 && password.length >= 6) {
          setShowAuthAlert({
            username: true,
            password: false,
            usernameDoesNotExist: showAuthAlert.usernameDoesNotExist,
            wrongPassword: showAuthAlert.wrongPassword,
            usernameTaken: showAuthAlert.usernameTaken
          });
        } else if (userName.length >= 4 && password.length < 6) {
          setShowAuthAlert({
            username: false,
            password: true,
            usernameDoesNotExist: showAuthAlert.usernameDoesNotExist,
            wrongPassword: showAuthAlert.wrongPassword,
            usernameTaken: showAuthAlert.usernameTaken
          });
        }
  
        return;
      }
    }

    if (target.id === "login") {

      if (loginModalState === "login") {
        let userId = userData.findIndex(user => user.username === userName);
        if (userId !== -1) {
            // login successfully
            if (password === userData[userId].password) {
              setLoginModalState("closed");
              setLoginStatus(true);
              return;
            } else {
              // tell user the entered password is incorrect
              setShowAuthAlert({
                username: false,
                password: false,
                usernameDoesNotExist: false,
                wrongPassword: true,
                usernameTaken: false
              });
              return;
            }
        } else {
          // tell user the username does not exist
          setShowAuthAlert({
            username: false,
            password: false,
            usernameDoesNotExist: true,
            wrongPassword: false,
            usernameTaken: false
          });
        }
      }

      if (loginModalState === "register") {
        let userId = userData.findIndex(user => user.username === userName);
        if (userId !== -1) {
          // tell user the username is already taken
          setShowAuthAlert({
            username: false,
            password: false,
            usernameDoesNotExist: false,
            wrongPassword: false,
            usernameTaken: true
          });
          return;
        }

        let demoUserData = {
          username: userName,
          password: password,
          avatar: "",
          trophies: [
            "betauser",
            "newuser",
          ],
          following: [

          ],
          reported: false,
          added: false,
          karma: "1",
          age: "1d",
          color: "",
          cakeday: ""
        };
        let updatedUserData = [...userData];
        updatedUserData.push(demoUserData);
        setUserData(updatedUserData);
        setLoginStatus(true);
        setLoginModalState("closed");
      }
    } else if (target.id === "demo") {
      setLoginStatus(true);
      setUserName("Nikola Tesla");
      setPassword("electricity");
      setLoginModalState("closed");
      if (userData.findIndex(user => user.username === "Nikola Tesla") === -1) {
        let demoUserData = {
          username: "Nikola Tesla",
          password: "electricity",
          avatar: "",
          trophies: [
            "betauser",
            "newuser",
          ],
          following: [

          ],
          reported: false,
          added: false,
          karma: "1",
          age: "1d",
          color: "#7193ff",
          cakeday: ""
        };
        let updatedUserData = [...userData];
        updatedUserData.push(demoUserData);
        setUserData(updatedUserData);
      }
    } else if (target.id === "logout") {
      setDropdownIsOpen(false);
      setLoginStatus(false);
    }
  }

  // open/close community options for targeted subreddit
  // Used in: SubredditSideBar.tsx
  const switchCommunityOptions = (e: React.MouseEvent) => {
    setCommunityOptions(!communityOptions);
  }

  // enable/disable community theme for targeted subreddit
  // Used in: SubredditSideBar.tsx
  const switchCommunityTheme = (e: React.MouseEvent) => {
    setCommunityTheme(!communityTheme);
  }

  // navigate back to subreddit's main page
  // Used in: NavBar.tsx
  const quickNavigate = (e: React.MouseEvent) => {
    navigate(`r/${currentSub}`);
  }

  // add targeted user to current user's "following" array
  // Used in: ProfilePage.tsx
  const followUser = (e: React.MouseEvent) => {
    let userId = userData.findIndex(user => user.username === userName);
    if (userId === -1) {
      return;
    }

    let userObject = {...userData[userId]};
    
    if (userObject.following.includes(currentlyInspectedUser)) {
      let followId = userObject.following.findIndex(user => user === currentlyInspectedUser);
      let newFollowing = [...userObject.following];
      newFollowing.splice(followId, 1);
      userObject.following = newFollowing;
      let newUserData = userData.map((user, i) => {
        if (user.username !== userName) {
          return user;
        } else {
          user = userObject;
          return user;
        }
      });
      setUserData(newUserData);
      return;
    }
    userObject.following.push(currentlyInspectedUser);
    let newUserData = userData.map((user, i) => {
      if (user.username !== userName) {
        return user;
      } else {
        user = userObject;
        return user;
      }
    });
    setUserData(newUserData);
  }

  // add targeted user as a friend
  // Used in: ProfilePage.tsx
  const addFriend = (e: React.MouseEvent) => {
    const friendName = currentlyInspectedUser;
    let friendId = userData.findIndex(user => user.username === friendName);
    let updatedUserData = [...userData];
    updatedUserData[friendId].added = !updatedUserData[friendId].added;
    setUserData(updatedUserData);
  }

  // report targeted user
  // Used in: ProfilePage.tsx
  const reportUser = (e: React.MouseEvent) => {
    const reportName = currentlyInspectedUser;
    let reportId = userData.findIndex(user => user.username === reportName);
    let updatedUserData = [...userData];
    updatedUserData[reportId].reported = !updatedUserData[reportId].reported;
    setUserData(updatedUserData);
  }

  // add nesting to targeted comment
  // Used in: PostedComment.tsx
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

  // cache current user's data on logout
  // Used in: App.tsx
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

  // define standard theme for subreddit pages
  // Used in: SubredditSideBar.tsx
  const standardTheme = {
    buttonColor: "#0079d3",
    headerColor: "#0079d3",
    banner: "../../resources/images/Communities/todayilearned/banner.jpg",
  }

  // return 
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
        clickNotification={clickNotification}
        setSearchTerm={setSearchTerm}
        searchDropdown={searchDropdown}
        searchItemDisplay={searchItemDisplay}
        changeSearchItemDisplay={changeSearchItemDisplay}
        handleNotifications={handleNotifications}
        navToProfile={navToProfile}
        notificationNum={notificationNum}
        quickNavigate={quickNavigate}
        notificationArray={notificationArray}
        notificationDropdown={notificationDropdown}
        setNotificationDropdown={setNotificiationDropdown}
        userData={userData}
        currentUserData={currentUserData}
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
          renderNum={renderNum}
          setRenderNum={setRenderNum}
          navToUserProfile={navToUserProfile}
          navToProfile={navToProfile}
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
          navToUserProfile={navToUserProfile}
          navToProfile={navToProfile}
        />} />
        <Route path='/user/:userId' element={<ProfilePage
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
          renderNum={renderNum}
          setRenderNum={setRenderNum}
          currentlyInspectedUser={currentlyInspectedUser}
          navToProfile={navToProfile}
          navToUserProfile={navToUserProfile}
          userData={userData}
          currentUserData={currentUserData}
          reportUser={reportUser}
          addFriend={addFriend}
          followUser={followUser}
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
          navToProfile={navToProfile}
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
          navToUserProfile={navToUserProfile}
          navToProfile={navToProfile}
          addedConfetti={addedConfetti}
          setAddedConfetti={setAddedConfetti}
          setCurrentPost={setCurrentPost}
          setCurrentSub={setCurrentSub}
        />} />
      </Routes>
    </div>
  );
}

export default App;
