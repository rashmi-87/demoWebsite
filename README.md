# DSA — learn data structures & algorithms, pattern-wise

A mobile-friendly MERN app that teaches DSA the fun way: each pattern opens with a
desi *mohalla* story, then real pattern-wise questions (LeetCode-linked), recall
quizzes, interview-style revision, and progress tracking with a weak-spot callout.

- **Frontend:** React + Vite (mobile-first)
- **Backend:** Node + Express
- **Data:** JSON seed to start (no database needed). MongoDB-ready — the progress
  object in `server/index.js` can be swapped for Mongo without changing the API shape.

## Run it

Open two terminals (or use the root `dev` script).

```bash
# 1. install everything
cd server && npm install
cd ../client && npm install

# 2a. start the API (terminal 1)
cd server && npm start        # http://localhost:4000

# 2b. start the app (terminal 2)
cd client && npm run dev      # http://localhost:5173
```

Or from the project root, after installing in both folders:

```bash
npm install            # installs 'concurrently'
npm run dev            # runs server + client together
```

Open **http://localhost:5173** on your phone-sized browser window.

## Loading all 385 questions

The app ships with the **Array** topic fully built (stories, questions, quizzes).
The other 16 topics are listed as "upcoming". To load every question:

1. Put the downloaded dataset at `server/data/dsa_questions_385.json`
2. Run:

   ```bash
   cd server && npm run import
   ```

That unlocks all 17 topics with their real questions and LeetCode links. Stories and
quizzes for the newer topics get added over time.

## Structure

```
server/
  index.js            Express API (topics, patterns, questions, quiz, revise, progress)
  import.js           Converts the full 385 dataset into questions.json
  data/
    questions.json    Seed data (Array fully populated)
    content.js        Stories, templates, explainers, quizzes
client/
  src/
    screens/          Mohalla map, Learn, Topic, Pattern, Question, Quiz, Random, Revise, Progress
    components/        TopBar, BottomTabs
    theme.css          Warm mohalla theme, mobile-first
```

Code solutions/templates are in JavaScript (matches the stack). A Java/C++ toggle
can be added later per question.
