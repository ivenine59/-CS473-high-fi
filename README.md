# Healthy Discussion Room (HDR)

## Project Execution Steps

1. Clone the project repository: `git clone https://github.com/ivenine59/-CS473-high-fi.git`
2. Install dependencies: `npm install`
3. Start the project: `npm start`

## Project Description

Discussing online is difficult in today's internet-connected society due to lack of motivation and malicious behavior such as personal attacks. We introduce HDR, a discussion platform that enables active and focused discussion through a rating system evaluated by users. HDR stands out from other discussion platforms with its user-driven relative tier system, where the ratings given by fellow users directly impact the author's tier.

## Code Description

### App.js

- Represents the main page and specifies paths for sub-pages.

### Header.js

- Appears on all pages, allowing users to navigate to different pages using buttons.
- Activates a button to update user ranks only for administrator accounts.

### components

functions are implemented by dividing them into functional parts

- #### Auth.js

  - Implements user registration and login functionality.

- #### Post.js

  - Manages the posting functionality.

- #### Comment.js

  Handles comment-related functions.

  - Creates and displays comments.
  - Performs rating on comments.
  - Stores relevant information in the database when a rating occurs.

- #### Display_post.js

  - Displays postings and comments together on the screen.
  - Shows postings and comments when a posting is selected.

- #### Giverank.js

  - Provides functionality to retrieve and display ranks stored in the database.

- #### Rank.js

  - Updates the user's rank.

### pages

Contains design information for each webpage.

- #### Home.js, Mypage.js

  - respective pages.

- #### buttonTheme.js

- contains information about buttons used on webpages.

- #### Login.js

  - page for conducting login.

- #### SignUp.js

  - page for conducting user registration.

- #### Post.js

  - page displaying the list of postings.

- #### PostCreate.js

- page displayed when creating a new post.

- #### PostDetail.js

  page containing information about comments and ratings.

  - Tier display functionality
  - Visualization of ratings
  - Measures to prevent abnormal usage

## Team Members

- Minhan Bae([GitHub Profile](https://github.com/ErdaNova))
- Jonghyeok Shin ([GitHub Profile](https://github.com/ShinJonghyeok))
- Jeongwon Kim ([GitHub Profile](https://github.com/ivenine59))

