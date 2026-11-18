// Learning content for DSA.
//
// LANGUAGE RULES:
//   - Problem descriptions, examples, and ALL quizzes: professional English only.
//   - Pattern stories (and their takeaway): friendly "mohalla" voice (light Hinglish ok).
// Problem statements are written originally (not copied from LeetCode); we link out
// to LeetCode for the official text.
//
// Structure:
//   patternContent[patternSlug] = { story, moral, triggers[], template, patternQuiz[] }
//   questionContent[questionSlug] = { description, example{input,output,why}, quizzes[] }
// A quiz item = { q, options[], answer (index), explain }  -- professional English.

const patternContent = {
  "array-two-pointer": {
    story:
      "Do gossip aunties ki kahani. Sharmila aunty lane ke pehle flat se shuru karti hai, Kamla aunty sabse aakhri flat se. Dono ek-doosre ki taraf chalti hain, raaste ki saari khabar lete hue. Jaise hi beech mein milti hain, poori gali cover ho jaati hai — ek hi round mein, bina kisi flat ko do baar visit kiye. Yahi hai two-pointer.",
    moral: "When the array is sorted and you need a pair or a condition, move two indices inward from both ends — no nested loop required.",
    triggers: ["pair with target", "sorted array", "from both ends", "triplet / three numbers", "move inward until they meet"],
    template:
      "let l = 0, r = n - 1;\nwhile (l < r) {\n  const sum = a[l] + a[r];\n  if (sum === target) return [l, r];\n  if (sum < target) l++;   // need a larger sum -> move the left pointer right\n  else r--;                // need a smaller sum -> move the right pointer left\n}",
    patternQuiz: [
      { q: "What is the strongest signal that two-pointer applies?", options: ["The array is sorted and you need a pair or triplet", "The array is tiny and unsorted", "You need every subset"], answer: 0, explain: "Sorted input plus a pair/sum target is the classic two-pointer setup." },
      { q: "Time complexity of a two-pointer scan on a sorted array?", options: ["O(n log n)", "O(n)", "O(n^2)"], answer: 1, explain: "Both pointers together traverse the array once." },
      { q: "If the current sum is smaller than the target, what do you do?", options: ["Decrement the right pointer", "Increment the left pointer", "Move both pointers"], answer: 1, explain: "You need a larger value, so advance the left pointer." },
      { q: "Typical extra space for two-pointer?", options: ["O(n)", "O(1)", "O(log n)"], answer: 1, explain: "Only two index variables are needed." },
      { q: "Which problem is NOT a natural two-pointer problem?", options: ["Container With Most Water", "Trapping Rain Water", "Top K Frequent Elements"], answer: 2, explain: "Top-K frequency is a heap / hash-map problem." }
    ]
  },
  "array-sliding-window": {
    story:
      "Socho tum bus ki khidki se bahar dekh rahe ho. Khidki ka size fix hai (k), aur jaise bus aage badhti hai, ek naya ghar andar aata hai aur ek purana peeche chhoot jaata hai. Tumhe har baar poora road dobara nahi dekhna — bas naya add karo, purana minus karo. Yahi sliding window hai.",
    moral: "When you see a contiguous subarray or substring with a condition, slide a window instead of recomputing from scratch.",
    triggers: ["window of size k", "longest / shortest subarray", "contiguous subarray", "at most / exactly k", "substring with a condition"],
    template:
      "let left = 0, sum = 0, best = 0;\nfor (let right = 0; right < n; right++) {\n  sum += a[right];            // include the new element\n  while (/* window is invalid */) {\n    sum -= a[left];           // drop the old element\n    left++;\n  }\n  best = Math.max(best, right - left + 1);\n}",
    patternQuiz: [
      { q: "When is a sliding window the right fit?", options: ["A contiguous subarray/substring with a condition", "Finding a pair in a sorted array", "Traversing a tree"], answer: 0, explain: "A window models a contiguous range." },
      { q: "Typical time complexity of a variable-size window?", options: ["O(n^2)", "O(n)", "O(n log n)"], answer: 1, explain: "Each element enters and leaves the window at most once." },
      { q: "A fixed-size window of size k keeps its sum updated how?", options: ["Recompute the whole window each step", "Add the entering element, subtract the leaving one", "Sort the window"], answer: 1, explain: "That incremental update is what makes it O(n)." }
    ]
  },
  "array-prefix-sum": {
    story:
      "Mohalle ki committee har mahine ka chanda likhti hai. Koi poochhe 'March se July tak kitna jama hua?' — har mahine ko dobara jodne ke bajaye, committee ke paas 'ab tak ka total' likha hota hai. July tak ka total minus February tak ka total = answer, turant. Yahi prefix sum hai.",
    moral: "When range sums are asked repeatedly, precompute cumulative sums so each query is O(1).",
    triggers: ["range sum", "subarray sum equals k", "sum between i and j", "count subarrays with sum"],
    template:
      "const pre = [0];\nfor (let i = 0; i < n; i++) pre[i+1] = pre[i] + a[i];\n// sum of a[i..j] = pre[j+1] - pre[i]\n// to count subarrays summing to k, store prefix counts in a hash map",
    patternQuiz: [
      { q: "Main advantage of prefix sums?", options: ["Range sums in O(1)", "Free sorting", "Zero memory"], answer: 0, explain: "After one O(n) build, any range sum is constant time." },
      { q: "Counting subarrays with a given sum uses what alongside prefix sums?", options: ["A hash map of prefix counts", "A stack", "A heap"], answer: 0, explain: "Store how many times each prefix sum appeared." },
      { q: "sum of a[i..j] equals:", options: ["pre[j+1] - pre[i]", "pre[j] - pre[i]", "pre[i] - pre[j]"], answer: 0, explain: "Using a 1-indexed prefix array." }
    ]
  },
  "array-kadane-s-algorithm": {
    story:
      "Sabzi bechne wale Kadane bhaiya ka rule simple hai: har naye customer pe wo sochte hain — 'is customer ko purane ghaate ke saath jodun, ya yahin se fresh shuru karun?' Agar ab tak ka running total negative ho gaya, to usse chipakne ka koi faayda nahi. Aur sabse best din yaad rakhte hain. Yahi Kadane's algorithm hai.",
    moral: "For maximum subarray sum, reset the running sum whenever it turns negative, and keep the best seen so far.",
    triggers: ["maximum subarray sum", "largest contiguous sum", "best contiguous range"],
    template:
      "let cur = a[0], best = a[0];\nfor (let i = 1; i < n; i++) {\n  cur = Math.max(a[i], cur + a[i]); // start fresh or extend\n  best = Math.max(best, cur);\n}\nreturn best;",
    patternQuiz: [
      { q: "When does 'cur' reset in Kadane's algorithm?", options: ["When cur + a[i] < a[i]", "At every index", "Never"], answer: 0, explain: "If a[i] alone beats the running sum, start fresh from a[i]." },
      { q: "Complexity of Kadane's algorithm?", options: ["O(n)", "O(n^2)", "O(n log n)"], answer: 0, explain: "A single pass, O(1) space." },
      { q: "For maximum PRODUCT subarray, what extra value must you track?", options: ["The running minimum too", "Nothing extra", "A prefix array"], answer: 0, explain: "A negative times a small negative can become the new maximum." }
    ]
  },
  "strings-two-pointer-palindrome": {
    story:
      "Mohalle ka naam-board dono taraf se padho — 'MALAYALAM'. Ek aadmi left se akshar padhta hai, ek right se. Beech mein milne tak har jodi match honi chahiye. Ek bhi mismatch, to palindrome nahi. Yahi two-pointer palindrome check hai.",
    moral: "To test a palindrome, compare characters from both ends moving inward; to find palindromic substrings, expand around each center.",
    triggers: ["palindrome", "reads the same both ways", "compare from both ends", "expand around center"],
    template: "let l = 0, r = s.length - 1;\nwhile (l < r) {\n  if (s[l] !== s[r]) return false;\n  l++; r--;\n}\nreturn true;",
    patternQuiz: [
      { q: "How do you check a palindrome with two pointers?", options: ["Compare ends moving inward", "Sort the string", "Use a stack of all characters"], answer: 0, explain: "Match s[l] with s[r] until they meet." },
      { q: "Time complexity of the two-pointer palindrome check?", options: ["O(n)", "O(n^2)", "O(n log n)"], answer: 0, explain: "A single inward pass." },
      { q: "To find the longest palindromic substring, a common technique is?", options: ["Expand around each center", "Binary search", "Prefix sums"], answer: 0, explain: "Each center grows outward while characters match." },
      { q: "How many centers does 'expand around center' consider?", options: ["2n - 1 (odd and even)", "n", "n^2"], answer: 0, explain: "n single centers plus n-1 gaps between characters." },
      { q: "Space used by the basic two-pointer check?", options: ["O(1)", "O(n)", "O(log n)"], answer: 0, explain: "Only two indices." }
    ]
  },
  "strings-sliding-window-string": {
    story:
      "Khidki phir se, lekin ab akshar ke mohalle mein. Window ke andar har akshar ka hisaab ek register (frequency map) mein rehta hai. Naya akshar andar aaya to +1, purana bahar gaya to -1. Jab register target se match kare, to anagram ya permutation mil gaya.",
    moral: "For substring problems with character constraints, slide a window and keep a frequency map; compare what you 'have' against what you 'need'.",
    triggers: ["anagram", "permutation of", "longest substring without repeating", "minimum window containing", "substring with a character constraint"],
    template: "const need = {}, win = {};\nlet left = 0;\nfor (let right = 0; right < s.length; right++) {\n  win[s[right]] = (win[s[right]] || 0) + 1;\n  while (/* window invalid */) { win[s[left]]--; left++; }\n  // record the answer here\n}",
    patternQuiz: [
      { q: "Anagram / permutation substring problems use what window?", options: ["Fixed size equal to the pattern length", "Variable size only", "No window"], answer: 0, explain: "The window matches the pattern's length." },
      { q: "What structure compares window contents to the target?", options: ["A character frequency map/array", "A stack", "A heap"], answer: 0, explain: "Counts of each character." },
      { q: "Longest substring without repeating characters uses?", options: ["A variable window + last-seen map", "A fixed window", "Sorting"], answer: 0, explain: "Shrink when a repeat enters the window." },
      { q: "Typical time complexity of these window scans?", options: ["O(n)", "O(n^2)", "O(n log n)"], answer: 0, explain: "Each character enters and leaves once." },
      { q: "For lowercase-only inputs, the frequency space is?", options: ["O(1) (26 letters)", "O(n)", "O(n^2)"], answer: 0, explain: "A fixed 26-size array." }
    ]
  },

  // ================= Binary Search =================
  "binary-search-classic-binary-search": {
    story: "Dictionary mein shabd dhoondhne ki trick — seedha beech mein kholo. Agar shabd aage hai to right half dekho, peeche hai to left half. Har baar aadha hissa gayab. Sorted cheez mein target dhoondhna ho to beech se cheero.",
    moral: "On a sorted array, check the middle and discard half each step — O(log n).",
    triggers: ["sorted array", "find target", "O(log n) search", "rotated sorted array"],
    template: "let lo = 0, hi = n - 1;\nwhile (lo <= hi) {\n  const mid = lo + ((hi - lo) >> 1);\n  if (a[mid] === target) return mid;\n  if (a[mid] < target) lo = mid + 1;\n  else hi = mid - 1;\n}\nreturn -1;",
    patternQuiz: [
      { q: "Time complexity of binary search?", options: ["O(log n)", "O(n)", "O(n log n)"], answer: 0, explain: "Each step halves the search space." },
      { q: "Required precondition?", options: ["The array is sorted", "The array is small", "No duplicates"], answer: 0, explain: "Binary search needs sorted order." },
      { q: "Why compute mid as lo + (hi - lo) / 2?", options: ["Avoids integer overflow", "It is faster", "Required by syntax"], answer: 0, explain: "lo + hi could overflow in fixed-width integers." },
      { q: "When a[mid] < target, you set?", options: ["lo = mid + 1", "hi = mid - 1", "return mid"], answer: 0, explain: "The target is in the right half." },
      { q: "Iterative binary search space complexity?", options: ["O(1)", "O(log n)", "O(n)"], answer: 0, explain: "Only a few index variables." },
      { q: "Searching a rotated sorted array is?", options: ["Still O(log n) with a modified check", "O(n)", "Impossible"], answer: 0, explain: "Decide which half is sorted, then search it." },
      { q: "The loop continues while?", options: ["lo <= hi", "lo < n", "hi > 0"], answer: 0, explain: "The range is non-empty while lo <= hi." }
    ]
  },
  "binary-search-lower-upper-bound": {
    story: "Ek hi naam ke kai log line mein khade hain. Pehla kaun aur aakhri kaun? Normal binary search pehle match pe ruk jaati hai. Lower/upper bound thoda aur khiskata hai taaki first ya last occurrence mile.",
    moral: "To find the first/last occurrence or an insertion point, keep searching one side even after a match.",
    triggers: ["first/last occurrence", "count of a value", "insertion position", "lower / upper bound"],
    template: "// lower bound: first index with a[i] >= x\nlet lo = 0, hi = n;\nwhile (lo < hi) {\n  const mid = (lo + hi) >> 1;\n  if (a[mid] < x) lo = mid + 1;\n  else hi = mid;\n}\nreturn lo;",
    patternQuiz: [
      { q: "Lower bound returns?", options: ["First index with a[i] >= x", "Last index with a[i] <= x", "Any match"], answer: 0, explain: "The leftmost position where x could be inserted." },
      { q: "Count of a value equals?", options: ["upperBound - lowerBound", "upperBound + lowerBound", "n - lowerBound"], answer: 0, explain: "The span between the two bounds." },
      { q: "On a[mid] == x in a lower-bound search, you?", options: ["Keep the left half (hi = mid)", "Return mid", "Move right"], answer: 0, explain: "There may be an earlier occurrence." },
      { q: "The insertion position of x equals?", options: ["Its lower bound", "Its upper bound", "n"], answer: 0, explain: "Where x would go to keep the array sorted." },
      { q: "Upper bound returns?", options: ["First index with a[i] > x", "First index with a[i] >= x", "Last index"], answer: 0, explain: "The position just past the last x." },
      { q: "Complexity?", options: ["O(log n)", "O(n)", "O(n log n)"], answer: 0, explain: "Still a halving search." },
      { q: "This loop uses?", options: ["lo < hi with hi = n", "lo <= hi with hi = n-1", "a while(true)"], answer: 0, explain: "The half-open form is standard for bounds." }
    ]
  },
  "binary-search-binary-search-on-answers": {
    story: "Jawaab khud ek range mein hota hai — jaise 'minimum speed'. Seedha jawaab guess karo (beech wala), check karo 'itne mein kaam ho jaayega?', phir aadha range kaat do. Feasibility monotonic ho to answer par hi binary search.",
    moral: "When the answer lies in a numeric range and feasibility is monotonic, binary search the answer itself.",
    triggers: ["minimum/maximum feasible value", "can we do it with X?", "koko / ship / pages / cows", "monotonic predicate"],
    template: "let lo = minPossible, hi = maxPossible;\nwhile (lo < hi) {\n  const mid = lo + ((hi - lo) >> 1);\n  if (feasible(mid)) hi = mid;   // minimizing\n  else lo = mid + 1;\n}\nreturn lo;",
    patternQuiz: [
      { q: "When does 'binary search on answers' apply?", options: ["Answer in a range with a monotonic feasibility check", "Only on sorted arrays", "When n is tiny"], answer: 0, explain: "You search values, not indices." },
      { q: "What is searched here?", options: ["The space of possible answers", "Array indices", "Prefix sums"], answer: 0, explain: "E.g. possible speeds, capacities, or page limits." },
      { q: "feasible(mid) typically costs?", options: ["O(n)", "O(1)", "O(log n)"], answer: 0, explain: "You scan the input to test a candidate." },
      { q: "Overall complexity?", options: ["O(n log(range))", "O(n)", "O(log n)"], answer: 0, explain: "log(range) iterations, each O(n)." },
      { q: "To minimize, on feasible(mid) you?", options: ["hi = mid", "lo = mid + 1", "return mid"], answer: 0, explain: "Try to do even better (smaller)." },
      { q: "A requirement for correctness?", options: ["The predicate is monotonic", "The array is sorted", "No duplicates"], answer: 0, explain: "Feasibility must flip once as the candidate grows." },
      { q: "Koko Eating Bananas searches over?", options: ["Eating speed", "Banana indices", "Pile sizes sorted"], answer: 0, explain: "The answer is a speed value." }
    ]
  },
  "binary-search-search-in-2d-matrix": {
    story: "Matrix mein number dhoondhna — agar poora matrix sorted ho to usse ek lambi line maano aur binary search. Agar sirf rows aur columns sorted hain to top-right corner se chalo: bada hai to left, chhota hai to neeche.",
    moral: "Treat a fully-sorted matrix as one flat sorted array, or walk from a corner using the row/column ordering.",
    triggers: ["sorted 2D matrix", "search in matrix", "row and column sorted"],
    template: "// fully sorted matrix -> binary search on a virtual index\nlet lo = 0, hi = m * n - 1;\nwhile (lo <= hi) {\n  const mid = (lo + hi) >> 1;\n  const v = mat[Math.floor(mid / n)][mid % n];\n  if (v === target) return true;\n  if (v < target) lo = mid + 1; else hi = mid - 1;\n}\nreturn false;",
    patternQuiz: [
      { q: "A fully sorted matrix can be searched in?", options: ["O(log(m*n))", "O(m*n)", "O(m+n) only"], answer: 0, explain: "Map a 1D index onto the 2D grid." },
      { q: "Index mapping for a virtual index idx?", options: ["row = idx / n, col = idx % n", "row = idx % n", "row = idx * n"], answer: 0, explain: "n is the number of columns." },
      { q: "If only rows and columns are sorted (not fully), use?", options: ["Staircase search from a corner", "A heap", "Sorting again"], answer: 0, explain: "Search a 2D Matrix II pattern." },
      { q: "Staircase search complexity?", options: ["O(m + n)", "O(log(mn))", "O(mn)"], answer: 0, explain: "Each step eliminates a row or a column." },
      { q: "Starting at the top-right, if value > target you?", options: ["Move left", "Move down", "Stop"], answer: 0, explain: "Smaller values are to the left." },
      { q: "Binary search here needs the matrix to be?", options: ["Sorted", "Square", "Small"], answer: 0, explain: "Ordering is what enables halving." },
      { q: "Space complexity?", options: ["O(1)", "O(mn)", "O(m+n)"], answer: 0, explain: "Only index variables." }
    ]
  },

  // ================= Stack =================
  "stack-monotonic-stack": {
    story: "Line mein log apni height ke hisaab se khade hain. 'Mere aage pehla lamba kaun?' Ek monotonic stack rakho jahan chhote log naye bade ke aane par nikal jaate hain. Next greater/smaller turant mil jaata hai.",
    moral: "Keep a monotonic (increasing/decreasing) stack of indices to find next/previous greater or smaller elements in O(n).",
    triggers: ["next greater / smaller element", "daily temperatures", "stock span", "largest rectangle in histogram"],
    template: "const st = []; // decreasing stack of indices\nfor (let i = 0; i < n; i++) {\n  while (st.length && a[st[st.length - 1]] < a[i]) {\n    const j = st.pop();\n    res[j] = i; // next greater of j is i\n  }\n  st.push(i);\n}",
    patternQuiz: [
      { q: "A monotonic stack efficiently finds?", options: ["Next/previous greater or smaller element", "The median", "All subsets"], answer: 0, explain: "Classic use of this structure." },
      { q: "Overall complexity?", options: ["O(n)", "O(n^2)", "O(n log n)"], answer: 0, explain: "Each index is pushed and popped at most once." },
      { q: "The stack usually stores?", options: ["Indices", "Only values", "Sorted values"], answer: 0, explain: "Indices let you compute distances/spans." },
      { q: "A decreasing stack helps find the?", options: ["Next greater element", "Next smaller element", "Average"], answer: 0, explain: "A new larger value pops smaller ones." },
      { q: "Largest Rectangle in Histogram uses?", options: ["A monotonic stack", "A heap", "Binary search"], answer: 0, explain: "Stack of bar indices to find spans." },
      { q: "You pop from the stack when?", options: ["The monotonic condition breaks", "The stack is empty", "Always"], answer: 0, explain: "Pop while the invariant would be violated." },
      { q: "Space complexity?", options: ["O(n)", "O(1)", "O(log n)"], answer: 0, explain: "The stack can hold up to n indices." }
    ]
  },
  "stack-expression-evaluation": {
    story: "Calculator banana — numbers ek stack mein, operators precedence se lagao. Postfix (RPN) mein to aur bhi simple: number aaye to push, operator aaye to do nikaalo aur result wapas push.",
    moral: "Evaluate expressions with a stack: push operands, apply operators by precedence, and handle parentheses by saving/restoring state.",
    triggers: ["evaluate expression", "basic calculator", "reverse polish notation", "decode string"],
    template: "// postfix / RPN\nconst st = [];\nfor (const tok of tokens) {\n  if (isNumber(tok)) st.push(+tok);\n  else { const b = st.pop(), a = st.pop(); st.push(apply(a, b, tok)); }\n}\nreturn st.pop();",
    patternQuiz: [
      { q: "Core structure for expression evaluation?", options: ["A stack", "A queue", "A heap"], answer: 0, explain: "Operands (and sometimes operators) live on a stack." },
      { q: "Evaluating Reverse Polish Notation uses?", options: ["One operand stack", "Two queues", "Recursion only"], answer: 0, explain: "Push numbers, pop two on each operator." },
      { q: "For infix with + - * /, you must respect?", options: ["Operator precedence", "Input length", "Sorting"], answer: 0, explain: "Higher-precedence operators apply first." },
      { q: "Parentheses are handled by?", options: ["Pushing/restoring the current state", "Ignoring them", "Sorting"], answer: 0, explain: "Save sign/result on '(' and restore on ')'." },
      { q: "Complexity of evaluation?", options: ["O(n)", "O(n^2)", "O(n log n)"], answer: 0, explain: "A single pass over the tokens." },
      { q: "Decode String ('3[ab]') uses?", options: ["Stacks of counts and partial strings", "A heap", "Two pointers"], answer: 0, explain: "Push state on '[', pop and repeat on ']'." },
      { q: "Pop order for a binary operator matters because?", options: ["The second popped is the left operand", "It doesn't matter", "Both are equal"], answer: 0, explain: "Subtraction/division are not commutative." }
    ]
  },
  "stack-stack-simulation-undo-operation": {
    story: "Backspace waali typing — har akshar stack mein, backspace aaye to pop. Adjacent duplicate aaye to top se collapse ho jaata hai. Undo matlab pop.",
    moral: "Simulate operations with a stack: push normal items, pop to undo, and collapse adjacent duplicates.",
    triggers: ["backspace string compare", "remove adjacent duplicates", "collapse characters", "undo"],
    template: "const st = [];\nfor (const c of s) {\n  if (c === '#') st.pop();                     // undo\n  else if (st.length && st[st.length - 1] === c) st.pop(); // collapse pair\n  else st.push(c);\n}",
    patternQuiz: [
      { q: "A backspace character maps to?", options: ["A pop", "A push", "A sort"], answer: 0, explain: "It undoes the last kept character." },
      { q: "Removing adjacent duplicates uses?", options: ["A stack", "A heap", "Binary search"], answer: 0, explain: "Pop when the top equals the current character." },
      { q: "Complexity?", options: ["O(n)", "O(n^2)", "O(n log n)"], answer: 0, explain: "One pass building the stack." },
      { q: "Space complexity?", options: ["O(n)", "O(1)", "O(log n)"], answer: 0, explain: "The stack can grow to n." },
      { q: "To compare two backspaced strings, you?", options: ["Build both via stacks and compare", "Sort both", "Reverse both"], answer: 0, explain: "Or walk from the back with pointers." },
      { q: "You pop a 'pair' when?", options: ["The top equals the current element", "The stack is empty", "Always"], answer: 0, explain: "Adjacent equal characters cancel." },
      { q: "The stack top represents?", options: ["The most recent kept item", "The oldest item", "The minimum"], answer: 0, explain: "LIFO ordering." }
    ]
  },
  "stack-parenthesis-scoring": {
    story: "Brackets ka hisaab — har khulne wala bracket stack mein daalo, band hone par match karo. Match na ho to invalid. Score ya depth bhi stack se nikal aata hai.",
    moral: "Push opening brackets and match on closing; track a count or score as you pop.",
    triggers: ["valid parentheses", "balanced brackets", "longest valid parentheses", "score of parentheses"],
    template: "const st = [];\nfor (const c of s) {\n  if (c === '(') st.push(c);\n  else { if (!st.length) return false; st.pop(); }\n}\nreturn st.length === 0;",
    patternQuiz: [
      { q: "Validating parentheses uses?", options: ["A stack", "A heap", "Two pointers"], answer: 0, explain: "Push openers, match closers." },
      { q: "An unmatched closing bracket means?", options: ["Invalid", "Valid", "Ignore it"], answer: 0, explain: "There is nothing to match it with." },
      { q: "At the end, a valid string leaves the stack?", options: ["Empty", "With one element", "Full"], answer: 0, explain: "Every opener was closed." },
      { q: "Complexity?", options: ["O(n)", "O(n^2)", "O(n log n)"], answer: 0, explain: "One pass." },
      { q: "With multiple bracket types, a closer must match?", options: ["The exact matching opener on top", "Any opener", "The first opener"], answer: 0, explain: "Types must correspond." },
      { q: "Minimum add to make valid counts?", options: ["Unmatched openers and closers", "Total brackets", "Pairs"], answer: 0, explain: "Each unmatched bracket needs one addition." },
      { q: "Longest Valid Parentheses often uses?", options: ["A stack of indices", "A heap", "Sorting"], answer: 0, explain: "Indices give valid-substring lengths." }
    ]
  },
  "stack-stack-based-design": {
    story: "Min Stack — har push ke saath current minimum bhi yaad rakho, taaki getMin O(1) ho. Do stacks milkar ek nayi cheez bana dete hain: queue, ya extra info waala stack.",
    moral: "Use an auxiliary stack (or stored extra info) to support O(1) operations like getMin, or to build one structure from another.",
    triggers: ["min stack / max stack", "getMin in O(1)", "queue using stacks", "stack using queues"],
    template: "class MinStack {\n  st = []; mins = [];\n  push(x) { this.st.push(x); this.mins.push(Math.min(x, this.mins.at(-1) ?? x)); }\n  pop() { this.st.pop(); this.mins.pop(); }\n  getMin() { return this.mins.at(-1); }\n}",
    patternQuiz: [
      { q: "MinStack.getMin() runs in?", options: ["O(1)", "O(n)", "O(log n)"], answer: 0, explain: "The current min is stored alongside each element." },
      { q: "How does MinStack achieve O(1) getMin?", options: ["Track the min with each pushed value", "Sort on push", "Scan on getMin"], answer: 0, explain: "A parallel stack of running minima." },
      { q: "A queue built from two stacks has?", options: ["Amortized O(1) per operation", "O(n) per operation always", "O(log n)"], answer: 0, explain: "Elements move between stacks at most twice." },
      { q: "Space complexity of these designs?", options: ["O(n)", "O(1)", "O(log n)"], answer: 0, explain: "Extra structures scale with the data." },
      { q: "In a two-stack queue, the 'out' stack is refilled when?", options: ["It becomes empty", "On every push", "Never"], answer: 0, explain: "Transfer from 'in' only when 'out' is empty." },
      { q: "The key idea of stack-based design is?", options: ["Keep extra info to answer queries fast", "Sort everything", "Use recursion"], answer: 0, explain: "Auxiliary state powers O(1) answers." },
      { q: "Implement Stack using Queues reverses order by?", options: ["Rotating the queue on push (or pop)", "Sorting", "A heap"], answer: 0, explain: "One operation is made costly to keep the other cheap." }
    ]
  },
  "stack-stack-greedy": {
    story: "Digits hatakar sabse chhota number banana hai. Monotonic stack + greedy: jab naya chhota digit aaye to pichhle bade digits pop karo, jab tak budget (k) bacha ho. Stack aur greedy dono ek saath.",
    moral: "Combine a monotonic stack with greedy popping to build the smallest/largest result under a budget.",
    triggers: ["remove k digits", "remove duplicate letters", "smallest subsequence", "make it smallest / largest"],
    template: "const st = []; let toRemove = k;\nfor (const d of num) {\n  while (toRemove > 0 && st.length && st[st.length - 1] > d) {\n    st.pop(); toRemove--;\n  }\n  st.push(d);\n}\n// drop any remaining from the end",
    patternQuiz: [
      { q: "The technique here is?", options: ["Monotonic stack + greedy", "Heap + sort", "Two pointers"], answer: 0, explain: "Greedily pop to improve the result." },
      { q: "Remove K Digits pops when?", options: ["A previous digit is larger than the current", "The stack is empty", "Always"], answer: 0, explain: "Removing a larger earlier digit makes the number smaller." },
      { q: "Complexity?", options: ["O(n)", "O(n^2)", "O(n log n)"], answer: 0, explain: "Each digit is pushed/popped once." },
      { q: "Leftover budget after one pass is removed from?", options: ["The end of the stack", "The front", "Nowhere"], answer: 0, explain: "Trailing digits are dropped." },
      { q: "Remove Duplicate Letters produces the?", options: ["Lexicographically smallest result with each letter once", "Longest result", "Sorted result"], answer: 0, explain: "Greedy with a seen-set and last-occurrence." },
      { q: "The greedy choice is to pop when?", options: ["It improves the result and budget allows", "The element is even", "Randomly"], answer: 0, explain: "Only beneficial, affordable pops are made." },
      { q: "The stack holds?", options: ["The result being built", "All inputs sorted", "Only the minimum"], answer: 0, explain: "It is the answer under construction." }
    ]
  },
  "stack-recursive-stack": {
    story: "Stack ko bina extra array ke ulta karo — recursion ki apni call stack use karke. Top nikaalo, baaki ko ulto, phir usse bottom mein insert karo.",
    moral: "Process the top element, recurse on the rest, then combine — using the call stack instead of an explicit one.",
    triggers: ["reverse a stack recursively", "insert at bottom of stack", "delete middle of stack"],
    template: "function insertBottom(st, x) {\n  if (!st.length) return st.push(x);\n  const top = st.pop();\n  insertBottom(st, x);\n  st.push(top);\n}\nfunction reverse(st) {\n  if (!st.length) return;\n  const t = st.pop();\n  reverse(st);\n  insertBottom(st, t);\n}",
    patternQuiz: [
      { q: "Recursive stack solutions use?", options: ["The call stack instead of an explicit one", "A heap", "A queue"], answer: 0, explain: "Recursion holds elements implicitly." },
      { q: "Reversing a stack recursively does?", options: ["Pop all, insert each at the bottom", "Sort it", "Copy to an array"], answer: 0, explain: "insertBottom places each popped element under the rest." },
      { q: "Complexity of the recursive reverse?", options: ["O(n^2)", "O(n)", "O(log n)"], answer: 0, explain: "insertBottom is O(n), called n times." },
      { q: "The helper used is?", options: ["insert-at-bottom", "merge", "partition"], answer: 0, explain: "It pushes under the current contents." },
      { q: "Base case for these recursions?", options: ["Empty stack", "One element", "Full stack"], answer: 0, explain: "Stop when nothing is left." },
      { q: "Delete Middle of Stack recurses to?", options: ["The middle index, then removes it", "The top", "The bottom"], answer: 0, explain: "Count down to size/2." },
      { q: "Space complexity?", options: ["O(n) recursion depth", "O(1)", "O(log n)"], answer: 0, explain: "Each pending call holds one element." }
    ]
  },

  // ================= Queue =================
  "queue-queue-implementation-circular-queue": {
    story: "Ration line ek gol dabbe mein — front aur rear ghoomte rehte hain. End par pahunch gaye to wrap around (modulo). Fixed-size queue bina jagah barbaad kiye.",
    moral: "A circular queue reuses a fixed array with front/rear indices and wrap-around via modulo.",
    triggers: ["design circular queue", "circular deque", "fixed-size FIFO", "ring buffer"],
    template: "// enqueue\nif (count === cap) return false;           // full\nq[rear] = x; rear = (rear + 1) % cap; count++;\n// dequeue\nif (count === 0) return false;             // empty\nconst x = q[front]; front = (front + 1) % cap; count--;",
    patternQuiz: [
      { q: "A queue serves elements in?", options: ["FIFO order", "LIFO order", "Sorted order"], answer: 0, explain: "First in, first out." },
      { q: "Wrap-around in a circular queue uses?", options: ["Modulo arithmetic", "Sorting", "A second array"], answer: 0, explain: "Indices roll over with % capacity." },
      { q: "enqueue and dequeue cost?", options: ["O(1)", "O(n)", "O(log n)"], answer: 0, explain: "Just index updates." },
      { q: "Distinguishing full from empty often uses?", options: ["A count (or one empty slot)", "Sorting", "A heap"], answer: 0, explain: "Both have front == rear otherwise." },
      { q: "On enqueue, which pointer advances?", options: ["rear", "front", "both"], answer: 0, explain: "New items go at the rear." },
      { q: "A deque allows insertion/removal at?", options: ["Both ends", "Only the front", "Only the rear"], answer: 0, explain: "Double-ended queue." },
      { q: "Capacity of a circular queue is?", options: ["Fixed", "Unbounded", "Prime"], answer: 0, explain: "It reuses a fixed-size array." }
    ]
  },
  "queue-queue-simulation-fifo-processing": {
    story: "Ticket window — sab line mein, front waala serve hota hai; kaam baaki ho to wapas peeche lag jaata hai. Josephus jaise games bhi isi FIFO simulation se hal hote hain.",
    moral: "Process elements in arrival order: repeatedly take the front and either finish it or push it back.",
    triggers: ["time to buy tickets", "Josephus problem", "circular game", "process in arrival order"],
    template: "const q = [...people];\nwhile (q.length) {\n  const p = q.shift();      // front\n  if (stillNeedsWork(p)) q.push(p); // back of the line\n}",
    patternQuiz: [
      { q: "This pattern processes elements in?", options: ["Arrival (FIFO) order", "Reverse order", "Sorted order"], answer: 0, explain: "The front is always handled first." },
      { q: "When an element is not finished, you?", options: ["Push it back to the rear", "Discard it", "Sort the queue"], answer: 0, explain: "It rejoins the end of the line." },
      { q: "The Josephus problem eliminates?", options: ["Every k-th person in a circle", "The smallest", "The front only"], answer: 0, explain: "A rotating elimination simulation." },
      { q: "The structure used is a?", options: ["Queue (or deque)", "Stack", "Heap"], answer: 0, explain: "FIFO fits arrival-order processing." },
      { q: "Which end is served first?", options: ["The front", "The rear", "The middle"], answer: 0, explain: "FIFO." },
      { q: "Complexity depends on?", options: ["Total work across all elements", "Only n", "Only k"], answer: 0, explain: "Each unit of remaining work costs a step." },
      { q: "A circular game is naturally modeled by?", options: ["A queue rotated each round", "A binary tree", "A trie"], answer: 0, explain: "Rotating the front to the back simulates the circle." }
    ]
  },

  // ================= Recursion =================
  "recursion-linear-recursion": {
    story: "Ek hi raasta — har call ek chhota sawaal banata hai. factorial(n) = n * factorial(n-1). Base case par ruk jao, warna recursion kabhi nahi rukegi.",
    moral: "Reduce a problem to a single smaller instance, and always define a base case.",
    triggers: ["factorial", "sum 1..n", "single recursive call", "linear recursion"],
    template: "function f(n) {\n  if (n <= 1) return 1;   // base case\n  return n * f(n - 1);    // one smaller instance\n}",
    patternQuiz: [
      { q: "What stops a recursion?", options: ["The base case", "The return type", "The loop"], answer: 0, explain: "Without it, recursion never ends." },
      { q: "Linear recursion makes how many calls per step?", options: ["One", "Two", "n"], answer: 0, explain: "A single smaller subproblem." },
      { q: "Recursion depth of factorial(n)?", options: ["O(n)", "O(log n)", "O(1)"], answer: 0, explain: "n nested calls." },
      { q: "Stack space used?", options: ["O(n)", "O(1)", "O(log n)"], answer: 0, explain: "One frame per pending call." },
      { q: "A missing base case causes?", options: ["Stack overflow", "Wrong type", "Faster code"], answer: 0, explain: "Infinite recursion exhausts the stack." },
      { q: "Tail recursion places the recursive call?", options: ["Last in the function", "First", "In a loop"], answer: 0, explain: "Enabling tail-call optimization where supported." },
      { q: "pow(x, n) can be done in?", options: ["O(log n) via fast exponentiation", "Only O(n)", "O(n^2)"], answer: 0, explain: "Square and halve the exponent." }
    ]
  },
  "recursion-non-linear-recursion": {
    story: "Do raaste — har call do (ya zyada) calls banata hai. fib(n) = fib(n-1) + fib(n-2). Tree jaisa phailta hai, isliye memoization chahiye warna exponential ho jaata hai.",
    moral: "When each call branches into several, the recursion tree can explode — memoize to avoid recomputation.",
    triggers: ["fibonacci", "climbing stairs", "two recursive calls", "overlapping subproblems"],
    template: "function fib(n, memo = {}) {\n  if (n < 2) return n;\n  if (memo[n] !== undefined) return memo[n];\n  return memo[n] = fib(n - 1, memo) + fib(n - 2, memo);\n}",
    patternQuiz: [
      { q: "Naive Fibonacci recursion is?", options: ["O(2^n)", "O(n)", "O(log n)"], answer: 0, explain: "The call tree roughly doubles each level." },
      { q: "Memoization changes it to?", options: ["O(n)", "O(2^n)", "O(n^2)"], answer: 0, explain: "Each value is computed once." },
      { q: "Non-linear recursion makes how many calls per step?", options: ["Two or more", "One", "Zero"], answer: 0, explain: "The tree branches." },
      { q: "Repeated identical subproblems signal?", options: ["Dynamic programming", "Sorting", "Binary search"], answer: 0, explain: "Overlap means memoize / tabulate." },
      { q: "Base cases for Fibonacci?", options: ["fib(0)=0, fib(1)=1", "fib(0)=1 only", "none"], answer: 0, explain: "Two base values are needed." },
      { q: "Climbing Stairs is essentially?", options: ["Fibonacci", "Binary search", "Sorting"], answer: 0, explain: "ways(n) = ways(n-1) + ways(n-2)." },
      { q: "The memo stores?", options: ["Already-computed results", "The call count", "The depth"], answer: 0, explain: "Keyed by subproblem input." }
    ]
  },
  "recursion-divide-conquer": {
    story: "Baanto aur jeeto — problem ko aadha karo, dono halves recursively solve karo, phir jodo. Merge sort iska classic: split, sort, merge.",
    moral: "Split the problem, solve each half recursively, then combine the results.",
    triggers: ["merge sort", "quick sort", "median of two sorted arrays", "divide and conquer"],
    template: "function mergeSort(a) {\n  if (a.length < 2) return a;\n  const m = a.length >> 1;\n  return merge(mergeSort(a.slice(0, m)), mergeSort(a.slice(m)));\n}",
    patternQuiz: [
      { q: "Merge sort runs in?", options: ["O(n log n)", "O(n)", "O(n^2)"], answer: 0, explain: "log n levels, O(n) merge each." },
      { q: "Merge sort extra space?", options: ["O(n)", "O(1)", "O(log n)"], answer: 0, explain: "Temporary arrays for merging." },
      { q: "Quick sort average vs worst case?", options: ["O(n log n) avg, O(n^2) worst", "Always O(n)", "Always O(n^2)"], answer: 0, explain: "Worst case on bad pivots." },
      { q: "In merge sort the 'combine' step is?", options: ["Merging two sorted halves", "Partitioning", "Hashing"], answer: 0, explain: "Merge produces the sorted whole." },
      { q: "Recursion depth of divide and conquer on n?", options: ["O(log n)", "O(n)", "O(1)"], answer: 0, explain: "The problem halves each level." },
      { q: "Median of Two Sorted Arrays can be done in?", options: ["O(log(m+n))", "O(m+n)", "O(mn)"], answer: 0, explain: "Binary-search partition approach." },
      { q: "'Divide' refers to?", options: ["Splitting the input into subproblems", "Combining results", "Sorting output"], answer: 0, explain: "Break down, then conquer, then combine." }
    ]
  },
  "recursion-recursion-on-linkedlist-stack": {
    story: "List ya stack ko recursively handle karo — pehla node sambhaalo, baaki par recurse, phir jodo. Reverse list, merge two lists sab isi tarah.",
    moral: "Handle the first/last element, recurse on the rest, then stitch the result back together.",
    triggers: ["reverse linked list recursively", "merge two sorted lists", "process a list/stack recursively"],
    template: "function reverse(head) {\n  if (!head || !head.next) return head;\n  const newHead = reverse(head.next);\n  head.next.next = head;\n  head.next = null;\n  return newHead;\n}",
    patternQuiz: [
      { q: "Recursion depth when reversing a list of n nodes?", options: ["O(n)", "O(log n)", "O(1)"], answer: 0, explain: "One frame per node." },
      { q: "Recursive reverse returns?", options: ["The new head (old tail)", "The old head", "null"], answer: 0, explain: "It bubbles up from the end." },
      { q: "Merging two sorted lists recursively does?", options: ["Pick the smaller head, recurse on the rest", "Sort both first", "Use a heap"], answer: 0, explain: "Classic recursive merge." },
      { q: "Base case for list recursion?", options: ["null (or single node)", "A full list", "Length 2"], answer: 0, explain: "Empty or one-node lists stop recursion." },
      { q: "Stack space used?", options: ["O(n)", "O(1)", "O(log n)"], answer: 0, explain: "Pending frames stack up to n." },
      { q: "In recursive reverse, pointers are fixed?", options: ["After the recursive call returns", "Before recursing", "Never"], answer: 0, explain: "head.next.next = head on the way back up." },
      { q: "The 'combine' step here?", options: ["Reconnects nodes", "Sorts values", "Hashes nodes"], answer: 0, explain: "It rewires the links." }
    ]
  },
  "recursion-subsequences": {
    story: "Har element ke do raaste — lo ya chhodo. Isse saare subsets ban jaate hain, ek decision tree ki tarah. Pick / not-pick recursion.",
    moral: "For each element, choose include or exclude; this generates all subsets/subsequences.",
    triggers: ["generate all subsets", "subset sum", "pick / not pick", "count subsequences"],
    template: "function go(i, cur) {\n  if (i === n) { out.push([...cur]); return; }\n  go(i + 1, cur);              // exclude a[i]\n  cur.push(a[i]);\n  go(i + 1, cur);              // include a[i]\n  cur.pop();                   // backtrack\n}",
    patternQuiz: [
      { q: "How many subsets does an n-element set have?", options: ["2^n", "n^2", "n!"], answer: 0, explain: "Each element is in or out." },
      { q: "The two branches at each step are?", options: ["Include and exclude", "Sort and merge", "Left and right child"], answer: 0, explain: "Pick / not-pick." },
      { q: "Time complexity to generate all subsequences?", options: ["O(2^n)", "O(n^2)", "O(n log n)"], answer: 0, explain: "There are 2^n of them." },
      { q: "Base case of the recursion?", options: ["Index reaches n", "cur is empty", "Index is 0"], answer: 0, explain: "All elements have been decided." },
      { q: "Subset Sum uses this to?", options: ["Check/count subsets hitting a target", "Sort the array", "Find a median"], answer: 0, explain: "Explore include/exclude toward the target." },
      { q: "After the 'include' branch you?", options: ["Pop to undo the choice (backtrack)", "Return", "Sort"], answer: 0, explain: "Restore state for the next option." },
      { q: "Recursion depth?", options: ["O(n)", "O(2^n)", "O(log n)"], answer: 0, explain: "One frame per element decision." }
    ]
  },

  // ================= Linked List =================
  "linked-list-basic-operations": {
    story: "Linked list ek treasure hunt — har node agle ka address rakhta hai. Insert/delete matlab pointers ko sahi se jodna-todna. Ek dummy head rakho to head waale edge cases aasaan ho jaate hain.",
    moral: "Manipulate next pointers carefully to insert, delete, and traverse; a dummy head simplifies edge cases.",
    triggers: ["insert / delete node", "traverse list", "design linked list", "dummy head"],
    template: "const dummy = { next: head };\nlet prev = dummy;\nwhile (prev.next) {\n  if (shouldDelete(prev.next)) prev.next = prev.next.next;\n  else prev = prev.next;\n}\nreturn dummy.next;",
    patternQuiz: [
      { q: "Accessing the k-th element of a linked list is?", options: ["O(n)", "O(1)", "O(log n)"], answer: 0, explain: "You must walk from the head." },
      { q: "Insert/delete at a known node is?", options: ["O(1)", "O(n)", "O(log n)"], answer: 0, explain: "Just relink a couple of pointers." },
      { q: "A dummy head is used to?", options: ["Simplify head/empty edge cases", "Sort the list", "Save memory"], answer: 0, explain: "It removes special-casing the real head." },
      { q: "Traversing the whole list is?", options: ["O(n)", "O(1)", "O(log n)"], answer: 0, explain: "Visit each node once." },
      { q: "Extra space for these operations?", options: ["O(1)", "O(n)", "O(log n)"], answer: 0, explain: "Pointer rewiring only." },
      { q: "Compared with arrays, linked lists lack?", options: ["Random access", "Dynamic size", "Pointers"], answer: 0, explain: "No O(1) indexing." },
      { q: "To delete a node you typically need?", options: ["The previous node", "The next node", "The tail"], answer: 0, explain: "So you can relink prev.next." }
    ]
  },
  "linked-list-fast-and-slow-pointers": {
    story: "Do runners ek hi track par — ek tez (2 step), ek dheema (1 step). Agar cycle ho to tez dheeme ko pakad leta hai. Middle node bhi tez-dheeme se ek pass mein mil jaata hai.",
    moral: "Two pointers at different speeds detect cycles, find the middle, or locate a cycle's start.",
    triggers: ["cycle detection", "find the middle", "Floyd's tortoise and hare", "nth node from end"],
    template: "let slow = head, fast = head;\nwhile (fast && fast.next) {\n  slow = slow.next;\n  fast = fast.next.next;\n  if (slow === fast) return true; // cycle found\n}\nreturn false;",
    patternQuiz: [
      { q: "Cycle detection with two pointers is called?", options: ["Floyd's algorithm", "Kadane's algorithm", "Dijkstra"], answer: 0, explain: "Tortoise and hare." },
      { q: "The pointers move at?", options: ["Fast = 2 steps, slow = 1 step", "Both 1 step", "Both 2 steps"], answer: 0, explain: "The speed gap closes any cycle." },
      { q: "When fast reaches the end, slow is at?", options: ["The middle", "The head", "The tail"], answer: 0, explain: "Half the distance covered." },
      { q: "Complexity?", options: ["O(n)", "O(n^2)", "O(log n)"], answer: 0, explain: "Each pointer traverses once." },
      { q: "Space complexity?", options: ["O(1)", "O(n)", "O(log n)"], answer: 0, explain: "Only two pointers." },
      { q: "To find a cycle's start, after they meet you?", options: ["Reset one pointer to head, move both at speed 1", "Sort", "Use a heap"], answer: 0, explain: "They meet again at the cycle entry." },
      { q: "Nth node from the end uses?", options: ["Two pointers with a gap of n", "A stack", "Sorting"], answer: 0, explain: "Advance one n steps first." }
    ]
  },
  "linked-list-reversal-pattern": {
    story: "List ko ulto — teen pointers (prev, cur, next) se har link ki direction palat do. Poori list, beech ka hissa, ya k ke groups — sab isi tarah reverse hote hain.",
    moral: "Reverse links with prev/cur/next pointers; apply to the whole list, a sublist, or k-groups.",
    triggers: ["reverse a linked list", "reverse between m and n", "reverse in k-groups", "palindrome linked list"],
    template: "let prev = null, cur = head;\nwhile (cur) {\n  const next = cur.next;\n  cur.next = prev;\n  prev = cur;\n  cur = next;\n}\nreturn prev; // new head",
    patternQuiz: [
      { q: "Iterative reversal uses how many pointers?", options: ["Three (prev, cur, next)", "One", "Two"], answer: 0, explain: "You must remember the next node before relinking." },
      { q: "Complexity?", options: ["O(n)", "O(n^2)", "O(log n)"], answer: 0, explain: "One pass." },
      { q: "Iterative reversal space?", options: ["O(1)", "O(n)", "O(log n)"], answer: 0, explain: "Just a few pointers." },
      { q: "Reversal returns?", options: ["The new head (old tail)", "The old head", "null"], answer: 0, explain: "prev ends on the last node." },
      { q: "Reverse in k-groups processes?", options: ["k nodes at a time", "Two nodes", "The whole list at once"], answer: 0, explain: "Reverse each block of k." },
      { q: "Palindrome linked list is checked by?", options: ["Reversing the second half and comparing", "Sorting", "A heap"], answer: 0, explain: "Compare halves after reversing one." },
      { q: "Recursive reversal uses?", options: ["O(n) stack space", "O(1) space", "O(log n) space"], answer: 0, explain: "One frame per node." }
    ]
  },
  "linked-list-merge-sort": {
    story: "Do sorted lists ko zip karo — chhota head pehle, phir aage badho. Poori list sort karne ke liye middle nikalo, dono halves sort karo, phir merge. Dummy node sab aasaan kar deta hai.",
    moral: "Merge sorted lists by always taking the smaller head; sort a list via middle-split + merge.",
    triggers: ["merge two sorted lists", "merge k sorted lists", "sort list", "reorder list"],
    template: "const dummy = {}; let tail = dummy;\nwhile (a && b) {\n  if (a.val <= b.val) { tail.next = a; a = a.next; }\n  else { tail.next = b; b = b.next; }\n  tail = tail.next;\n}\ntail.next = a || b;\nreturn dummy.next;",
    patternQuiz: [
      { q: "Merging two sorted lists of sizes n and m is?", options: ["O(n + m)", "O(nm)", "O(n log m)"], answer: 0, explain: "One pass over both." },
      { q: "Sorting a linked list (merge sort) is?", options: ["O(n log n)", "O(n)", "O(n^2)"], answer: 0, explain: "Split-merge like array merge sort." },
      { q: "Merging k sorted lists efficiently uses?", options: ["A min-heap, O(N log k)", "Sorting all values", "Two pointers"], answer: 0, explain: "Always pull the smallest head." },
      { q: "A dummy node in merging helps?", options: ["Avoid special-casing the head", "Save memory", "Sort faster"], answer: 0, explain: "Build from a placeholder start." },
      { q: "Reorder List combines?", options: ["Find middle + reverse + merge", "Only sorting", "A heap"], answer: 0, explain: "Three sub-techniques together." },
      { q: "Two-list merge extra space?", options: ["O(1)", "O(n)", "O(log n)"], answer: 0, explain: "Pointer relinking only." },
      { q: "A stable merge preserves?", options: ["Relative order of equal values", "Sorting direction", "Length"], answer: 0, explain: "Use <= when comparing heads." }
    ]
  },
  "linked-list-linkedlist-with-stack-hashmap": {
    story: "Numbers ko lists ki tarah jodna — digits reverse order mein ho to seedha add karo carry ke saath. Forward order ho to stack use karo. Random pointer waali list copy karne ke liye hashmap.",
    moral: "Use a stack for backward processing/carry, or a hash map to clone nodes that carry extra pointers.",
    triggers: ["add two numbers", "next greater node in list", "copy list with random pointer", "stack / hashmap on a list"],
    template: "// add two numbers (digits in reverse)\nlet carry = 0, dummy = {}, tail = dummy;\nwhile (a || b || carry) {\n  const s = (a ? a.val : 0) + (b ? b.val : 0) + carry;\n  carry = Math.floor(s / 10);\n  tail.next = { val: s % 10 }; tail = tail.next;\n  a = a && a.next; b = b && b.next;\n}",
    patternQuiz: [
      { q: "Add Two Numbers (reverse-order digits) runs in?", options: ["O(n)", "O(n^2)", "O(n log n)"], answer: 0, explain: "One pass with a carry." },
      { q: "If digits are in forward order, a clean approach uses?", options: ["Two stacks", "A heap", "Binary search"], answer: 0, explain: "Pop to add from the least-significant end." },
      { q: "Copy List with Random Pointer uses?", options: ["A hash map from node to its clone", "A stack", "Sorting"], answer: 0, explain: "Or interleaved-node trick for O(1) space." },
      { q: "Next Greater Node in a list uses?", options: ["A monotonic stack", "A heap", "Two pointers on sorted"], answer: 0, explain: "Same idea as array next-greater." },
      { q: "Complexity of these list+map/stack problems?", options: ["O(n)", "O(n^2)", "O(n log n)"], answer: 0, explain: "Linear passes." },
      { q: "The hash map maps?", options: ["Original node to its copy", "Value to index", "Index to node"], answer: 0, explain: "So random pointers can be rewired." },
      { q: "Space used by the map/stack approach?", options: ["O(n)", "O(1)", "O(log n)"], answer: 0, explain: "Proportional to the list length." }
    ]
  },

  // ================= Double Linked List =================
  "double-linked-list-basic-dll-operations": {
    story: "DLL mein har node aage aur peeche dono ka address rakhta hai. Isse kisi bhi known node ko O(1) mein hata sakte ho. DLL + hashmap milkar LRU cache banate hain.",
    moral: "A doubly linked list lets you remove a known node in O(1); pair it with a hash map for an LRU cache.",
    triggers: ["doubly linked list", "LRU cache", "LFU cache", "O(1) remove with prev/next"],
    template: "function remove(node) {\n  node.prev.next = node.next;\n  node.next.prev = node.prev;\n}\n// LRU: map key -> node; on get/put move node to front; evict the tail",
    patternQuiz: [
      { q: "A DLL node stores?", options: ["prev and next pointers", "only next", "only prev"], answer: 0, explain: "Links in both directions." },
      { q: "Removing a known node from a DLL is?", options: ["O(1)", "O(n)", "O(log n)"], answer: 0, explain: "Relink its neighbours directly." },
      { q: "An LRU cache is built from?", options: ["A DLL plus a hash map", "A heap", "A BST"], answer: 0, explain: "Map for lookup, DLL for recency order." },
      { q: "LRU get and put run in?", options: ["O(1)", "O(n)", "O(log n)"], answer: 0, explain: "Hash lookup plus O(1) DLL moves." },
      { q: "LRU eviction removes?", options: ["The least recently used (tail)", "The newest", "The middle"], answer: 0, explain: "Tail is the stalest entry." },
      { q: "Sentinel head/tail nodes help?", options: ["Avoid null edge cases", "Sort the list", "Save memory"], answer: 0, explain: "Every real node has real neighbours." },
      { q: "Space complexity of an LRU cache?", options: ["O(capacity)", "O(1)", "O(n^2)"], answer: 0, explain: "It stores up to capacity entries." }
    ]
  },
  "double-linked-list-merge-sort-reorder": {
    story: "DLL ko merge, sort ya reorder karna — prev aur next dono ka faida uthao. Multilevel list ko flatten karna bhi inhi pointers se hota hai.",
    moral: "Use both prev and next pointers to merge, sort, reorder, or flatten doubly linked structures.",
    triggers: ["merge two sorted DLLs", "flatten a multilevel DLL", "reorder a DLL"],
    template: "// flatten a multilevel DLL: splice each child list in,\n// repair prev/next, then continue to the end",
    patternQuiz: [
      { q: "DLL operations must maintain?", options: ["Both prev and next", "Only next", "A heap"], answer: 0, explain: "Backward links must stay consistent." },
      { q: "Flatten Multilevel DLL does?", options: ["Splice child lists into the main list", "Sort nodes", "Reverse the list"], answer: 0, explain: "Depth-first splicing." },
      { q: "Complexity of flattening?", options: ["O(n)", "O(n^2)", "O(n log n)"], answer: 0, explain: "Each node is visited once." },
      { q: "Merging two sorted DLLs differs from singly by?", options: ["Also fixing prev pointers", "Using a heap", "Sorting first"], answer: 0, explain: "Backward links need repair." },
      { q: "Iterative flatten space?", options: ["O(1)", "O(n)", "O(log n)"], answer: 0, explain: "Relinking in place." },
      { q: "After splicing a child list, you must repair?", options: ["prev pointers at the join points", "Nothing", "The whole list"], answer: 0, explain: "Both directions must stay valid." },
      { q: "A helper structure for iterative flatten is often a?", options: ["Stack", "Queue", "Heap"], answer: 0, explain: "Push the next pointer while diving into a child." }
    ]
  },

  // ================= HashMap =================
  "hashmap-frequency-map-counting": {
    story: "Ek register mein har cheez ki ginti — kitni baar aayi. Isse majority element, top-k frequent, ya frequency se sorting sab aasaan ho jaata hai.",
    moral: "Count occurrences in a hash map to find the majority, top-k frequent, or sort by frequency.",
    triggers: ["majority element", "top k frequent", "sort by frequency", "task scheduler"],
    template: "const freq = new Map();\nfor (const x of a) freq.set(x, (freq.get(x) || 0) + 1);\n// then use counts: bucket sort, a heap, or Boyer-Moore",
    patternQuiz: [
      { q: "Counting frequencies takes?", options: ["O(n)", "O(n^2)", "O(n log n)"], answer: 0, explain: "One pass with O(1) map updates." },
      { q: "Majority element in O(1) space uses?", options: ["Boyer-Moore voting", "A heap", "Sorting"], answer: 0, explain: "Cancel out minority votes." },
      { q: "Top-K Frequent Elements can be done in?", options: ["O(n) with bucket sort", "O(n^2)", "Only O(n log n)"], answer: 0, explain: "Or a heap in O(n log k)." },
      { q: "Space for the frequency map?", options: ["O(n)", "O(1)", "O(log n)"], answer: 0, explain: "Up to n distinct keys." },
      { q: "Sort Characters by Frequency groups?", options: ["Equal-count characters", "Sorted characters", "Vowels"], answer: 0, explain: "Order by descending count." },
      { q: "Average hash map lookup is?", options: ["O(1)", "O(n)", "O(log n)"], answer: 0, explain: "Amortized constant time." },
      { q: "Bucket sort by frequency runs in?", options: ["O(n)", "O(n log n)", "O(n^2)"], answer: 0, explain: "Index buckets by count." }
    ]
  },
  "hashmap-prefix-sum-with-map": {
    story: "Running total ke saath ek map — kaunsa prefix sum kitni baar dikha. Subarray-sum waale sawaal ismein hal hote hain, negatives ke saath bhi (jahan sliding window fail ho jaati hai).",
    moral: "Track running prefix sums in a hash map to count subarrays meeting a sum condition, even with negatives.",
    triggers: ["count subarrays with sum k", "prefix sum + map", "subarray sum with negatives"],
    template: "const seen = new Map([[0, 1]]);\nlet sum = 0, count = 0;\nfor (const x of a) {\n  sum += x;\n  count += seen.get(sum - k) || 0;\n  seen.set(sum, (seen.get(sum) || 0) + 1);\n}",
    patternQuiz: [
      { q: "This pattern combines?", options: ["Prefix sums with a hash map", "Sorting with a heap", "Two pointers"], answer: 0, explain: "Counts of prefix sums answer subarray queries." },
      { q: "Why not a sliding window here?", options: ["Negative numbers break monotonicity", "k is large", "The array is sorted"], answer: 0, explain: "Windows need monotonic sums." },
      { q: "Complexity?", options: ["O(n)", "O(n^2)", "O(n log n)"], answer: 0, explain: "One pass with O(1) lookups." },
      { q: "Space complexity?", options: ["O(n)", "O(1)", "O(log n)"], answer: 0, explain: "The prefix-count map." },
      { q: "The map stores?", options: ["Prefix sum -> number of times seen", "Index -> value", "Value -> index"], answer: 0, explain: "Counts enable combinations." },
      { q: "Initialize the map with?", options: ["{0: 1}", "empty", "{k: 1}"], answer: 0, explain: "The empty prefix has sum 0." },
      { q: "For a subarray summing to k, you add?", options: ["seen.get(sum - k)", "seen.get(sum)", "seen.get(k)"], answer: 0, explain: "A matching earlier prefix exists." }
    ]
  },

  // ================= Binary Tree =================
  "binary-tree-dfs-traversals": {
    story: "Ped ki gehrai mein ghuso — ek branch poori, phir doosri. Inorder/preorder/postorder, depth, path sum sab DFS se. Recursion yahan sabse natural hai.",
    moral: "DFS goes deep along one branch before backtracking; it powers traversals, depth, and path-sum problems.",
    triggers: ["inorder / preorder / postorder", "max depth", "path sum", "diameter"],
    template: "function dfs(node) {\n  if (!node) return;\n  dfs(node.left);\n  // visit(node);   // inorder position\n  dfs(node.right);\n}",
    patternQuiz: [
      { q: "DFS over a tree of n nodes is?", options: ["O(n)", "O(n log n)", "O(n^2)"], answer: 0, explain: "Each node visited once." },
      { q: "Recursive DFS uses stack space of?", options: ["O(h), the tree height", "O(n) always", "O(1)"], answer: 0, explain: "Depth equals the current path length." },
      { q: "Inorder traversal of a BST yields?", options: ["Sorted order", "Reverse order", "Level order"], answer: 0, explain: "left, node, right." },
      { q: "Max depth equals?", options: ["1 + max(leftDepth, rightDepth)", "left + right", "number of leaves"], answer: 0, explain: "Height recurrence." },
      { q: "Diameter is computed using?", options: ["Subtree heights at each node", "Level order", "A heap"], answer: 0, explain: "Longest path may pass through a node." },
      { q: "Path Sum explores?", options: ["Root-to-leaf paths", "Only leaves", "Only the root"], answer: 0, explain: "Subtract values descending." },
      { q: "Iterative DFS uses?", options: ["An explicit stack", "A queue", "A heap"], answer: 0, explain: "Simulates the call stack." }
    ]
  },
  "binary-tree-bfs-level-order": {
    story: "Ped ko level-by-level dekho — queue mein daalo, ek poora level process karo, phir agla. Right side view, averages, zigzag sab BFS se nikalte hain.",
    moral: "BFS visits level by level with a queue — ideal for level-order, side views, and shortest depth.",
    triggers: ["level order traversal", "right side view", "zigzag", "minimum depth"],
    template: "const q = [root];\nwhile (q.length) {\n  const size = q.length;\n  for (let i = 0; i < size; i++) {\n    const node = q.shift();\n    if (node.left) q.push(node.left);\n    if (node.right) q.push(node.right);\n  }\n}",
    patternQuiz: [
      { q: "Level-order traversal uses?", options: ["A queue", "A stack", "A heap"], answer: 0, explain: "FIFO processes nodes level by level." },
      { q: "Complexity?", options: ["O(n)", "O(n log n)", "O(n^2)"], answer: 0, explain: "Each node enqueued once." },
      { q: "To separate levels you?", options: ["Record the queue size at each level", "Sort", "Use recursion depth"], answer: 0, explain: "Process exactly 'size' nodes." },
      { q: "Right Side View returns?", options: ["The last node of each level", "The root only", "The deepest leaf"], answer: 0, explain: "Rightmost per level." },
      { q: "Minimum depth is found fastest by?", options: ["BFS stopping at the first leaf", "Full DFS", "Sorting"], answer: 0, explain: "The shallowest leaf appears first." },
      { q: "BFS space is proportional to?", options: ["The tree's maximum width", "Its height", "Its leaves"], answer: 0, explain: "The widest level sits in the queue." },
      { q: "Zigzag level order?", options: ["Reverses alternate levels", "Sorts each level", "Skips levels"], answer: 0, explain: "Direction flips each row." }
    ]
  },
  "binary-tree-lowest-common-ancestor": {
    story: "Do cousins ka sabse kareebi common buzurg kaun? DFS se dono ko dhoondho; jis node se dono alag taraf milein wahi LCA. BST mein to values se seedha utro.",
    moral: "Find the lowest node under which both targets lie; in a BST, descend using value comparisons.",
    triggers: ["lowest common ancestor", "LCA in a BST", "common ancestor"],
    template: "function lca(node, p, q) {\n  if (!node || node === p || node === q) return node;\n  const L = lca(node.left, p, q);\n  const R = lca(node.right, p, q);\n  return L && R ? node : (L || R);\n}",
    patternQuiz: [
      { q: "Generic LCA via DFS is?", options: ["O(n)", "O(log n)", "O(1)"], answer: 0, explain: "May visit every node." },
      { q: "A node is the LCA when?", options: ["The two targets lie in different subtrees", "It is the root", "It is a leaf"], answer: 0, explain: "Left and right each find one target." },
      { q: "In a BST, LCA uses?", options: ["Value comparison to go left/right, O(h)", "A heap", "Level order"], answer: 0, explain: "Split point of the two values." },
      { q: "Recursion space?", options: ["O(h)", "O(n) always", "O(1)"], answer: 0, explain: "Depth of the recursion." },
      { q: "If one target is an ancestor of the other, the LCA is?", options: ["The ancestor target itself", "The root", "null"], answer: 0, explain: "It is returned on the way up." },
      { q: "The function returns a node when?", options: ["Both left and right return a target", "Only left returns", "Never"], answer: 0, explain: "That is the meeting point." },
      { q: "BST LCA complexity on a balanced tree?", options: ["O(log n)", "O(n)", "O(n log n)"], answer: 0, explain: "Height is log n." }
    ]
  },
  "binary-tree-serialization-construction": {
    story: "Ped ko string banao aur wapas ped — preorder ya level-order mein encode karo, null ko ek marker se, phir decode karke dobara wahi ped bana lo.",
    moral: "Encode a tree (preorder or level-order with null markers) so it can be rebuilt exactly.",
    triggers: ["serialize / deserialize tree", "construct from traversals", "invert / flatten tree"],
    template: "function ser(node, out) {\n  if (!node) { out.push('#'); return; }\n  out.push(node.val);\n  ser(node.left, out);\n  ser(node.right, out);\n}",
    patternQuiz: [
      { q: "Serialization must record?", options: ["Null markers", "Only values", "Only leaves"], answer: 0, explain: "Otherwise the shape is ambiguous." },
      { q: "Complexity of serialize/deserialize?", options: ["O(n)", "O(n log n)", "O(n^2)"], answer: 0, explain: "Each node handled once." },
      { q: "A unique tree can be built from?", options: ["Inorder + preorder (or postorder)", "Inorder alone", "Preorder alone"], answer: 0, explain: "Two traversals pin down the structure." },
      { q: "Preorder gives which node first?", options: ["The root", "A leaf", "The rightmost node"], answer: 0, explain: "Root, then left, then right." },
      { q: "Deserialize must follow?", options: ["The same order as serialize", "Sorted order", "Level order always"], answer: 0, explain: "Encoder and decoder must agree." },
      { q: "Space complexity?", options: ["O(n)", "O(1)", "O(log n)"], answer: 0, explain: "The serialized output plus recursion." },
      { q: "Inverting a tree?", options: ["Swaps left and right subtrees", "Sorts values", "Deletes leaves"], answer: 0, explain: "Mirror the tree recursively." }
    ]
  },
  "binary-tree-bst": {
    story: "Binary Search Tree — left chhota, right bada. Isse search, insert, floor/ceil sab O(height) mein. Aur inorder traversal seedha sorted order deta hai.",
    moral: "A BST keeps left < node < right, giving O(h) search/insert and a sorted inorder traversal.",
    triggers: ["validate BST", "insert / delete in BST", "kth smallest", "inorder gives sorted order"],
    template: "function search(node, x) {\n  while (node) {\n    if (node.val === x) return node;\n    node = x < node.val ? node.left : node.right;\n  }\n  return null;\n}",
    patternQuiz: [
      { q: "The BST invariant is?", options: ["left < node < right", "left > node > right", "all children equal"], answer: 0, explain: "Ordering holds for whole subtrees." },
      { q: "Inorder traversal of a BST is?", options: ["Sorted ascending", "Random", "Reverse sorted"], answer: 0, explain: "left, node, right." },
      { q: "Search and insert cost?", options: ["O(h)", "O(n) always", "O(1)"], answer: 0, explain: "Follow one root-to-leaf path." },
      { q: "A balanced BST has height?", options: ["O(log n)", "O(n)", "O(sqrt n)"], answer: 0, explain: "Worst case (skewed) is O(n)." },
      { q: "Kth smallest in a BST uses?", options: ["Inorder traversal", "Level order", "A heap"], answer: 0, explain: "Stop at the k-th visited node." },
      { q: "Validating a BST requires?", options: ["Value range bounds per node", "Only child comparisons", "Sorting"], answer: 0, explain: "A node must fit (min, max) from ancestors." },
      { q: "Deleting a node with two children replaces it with?", options: ["Its inorder successor (or predecessor)", "Its parent", "A leaf at random"], answer: 0, explain: "Keeps the BST property." }
    ]
  },

  // ================= Graph =================
  "graph-bfs-pattern": {
    story: "Shahar ke raaste — ek jagah se shuru, saare paados (neighbors) pehle, phir unke paados. Unweighted graph mein shortest path BFS se. Queue + visited set bas.",
    moral: "BFS explores a graph level by level with a queue; it finds shortest paths in unweighted graphs.",
    triggers: ["shortest path (unweighted)", "level-by-level spread", "grid BFS / flood fill", "rotting oranges"],
    template: "const q = [start], seen = new Set([start]);\nwhile (q.length) {\n  const u = q.shift();\n  for (const v of adj[u]) if (!seen.has(v)) { seen.add(v); q.push(v); }\n}",
    patternQuiz: [
      { q: "BFS on a graph uses?", options: ["A queue", "A stack", "A heap"], answer: 0, explain: "FIFO gives level order." },
      { q: "BFS finds shortest paths in?", options: ["Unweighted graphs", "Negative-weight graphs", "Any weighted graph"], answer: 0, explain: "Each edge counts as one step." },
      { q: "Complexity of BFS?", options: ["O(V + E)", "O(V^2)", "O(E log V)"], answer: 0, explain: "Each vertex and edge once." },
      { q: "A visited set is needed to?", options: ["Avoid revisiting nodes", "Sort nodes", "Save memory"], answer: 0, explain: "Prevents infinite loops in cyclic graphs." },
      { q: "Multi-source BFS starts by?", options: ["Enqueuing all sources initially", "Picking one source", "Sorting"], answer: 0, explain: "E.g. Rotting Oranges." },
      { q: "Grid BFS neighbors are usually?", options: ["Up, down, left, right", "Diagonals only", "All 8 always"], answer: 0, explain: "4-directional by default." },
      { q: "BFS space complexity?", options: ["O(V)", "O(1)", "O(E^2)"], answer: 0, explain: "The queue and visited set." }
    ]
  },
  "graph-dfs-connectivity": {
    story: "Gehrai mein ghuso — ek raasta poora, phir peeche. Connected components, islands, cycle detection sab DFS se. Recursion ya explicit stack dono chalein.",
    moral: "DFS explores deep first; it finds connected components, detects cycles, and marks reachable nodes.",
    triggers: ["connected components", "number of islands", "cycle detection", "flood fill"],
    template: "function dfs(u) {\n  seen.add(u);\n  for (const v of adj[u]) if (!seen.has(v)) dfs(v);\n}",
    patternQuiz: [
      { q: "DFS complexity on a graph?", options: ["O(V + E)", "O(V^2)", "O(E log V)"], answer: 0, explain: "Each vertex/edge visited once." },
      { q: "Counting connected components does?", options: ["A DFS/BFS from each unvisited node", "One DFS", "Sorting"], answer: 0, explain: "Each launch covers one component." },
      { q: "Number of Islands uses?", options: ["Grid DFS/BFS flooding each island", "A heap", "Binary search"], answer: 0, explain: "Sink visited land cells." },
      { q: "Cycle detection in an undirected graph uses?", options: ["Visited set + parent tracking", "Indegrees", "A heap"], answer: 0, explain: "A visited non-parent neighbor is a cycle." },
      { q: "Directed-cycle detection often uses?", options: ["Recursion-stack / coloring", "Union-Find only", "BFS levels"], answer: 0, explain: "A back edge to an in-progress node." },
      { q: "Recursive DFS space?", options: ["O(V)", "O(1)", "O(E^2)"], answer: 0, explain: "Call stack up to V deep." },
      { q: "Flood fill is essentially?", options: ["Grid DFS/BFS from a cell", "Sorting", "A heap"], answer: 0, explain: "Spread to matching neighbors." }
    ]
  },
  "graph-topological-sort": {
    story: "Kaam ka order — kuch kaam pehle, kuch baad (dependencies). Topological sort DAG ka aisa order deta hai jahan har edge aage ki taraf ho. Kahn's (indegree) ya DFS post-order.",
    moral: "Topological sort orders a DAG so every edge points forward; use Kahn's (indegrees) or DFS post-order.",
    triggers: ["course schedule", "build / dependency order", "DAG ordering", "prerequisites"],
    template: "const q = nodes.filter(u => indeg[u] === 0);\nwhile (q.length) {\n  const u = q.shift(); order.push(u);\n  for (const v of adj[u]) if (--indeg[v] === 0) q.push(v);\n}",
    patternQuiz: [
      { q: "Topological sort applies to?", options: ["A DAG (directed acyclic graph)", "Any graph", "Undirected graphs"], answer: 0, explain: "Cycles make an ordering impossible." },
      { q: "Kahn's algorithm uses?", options: ["Indegrees and a queue", "A heap", "DFS only"], answer: 0, explain: "Repeatedly remove zero-indegree nodes." },
      { q: "If the graph has a cycle, topo sort?", options: ["Is impossible", "Still works", "Reverses"], answer: 0, explain: "Not all nodes can be ordered." },
      { q: "Complexity?", options: ["O(V + E)", "O(V^2)", "O(E log V)"], answer: 0, explain: "Each edge decremented once." },
      { q: "DFS-based topo sort uses?", options: ["Reverse post-order", "Preorder", "Level order"], answer: 0, explain: "Finish times reversed." },
      { q: "Course Schedule asks whether?", options: ["All courses can be finished (no cycle)", "The shortest path", "The MST"], answer: 0, explain: "Feasibility = acyclic." },
      { q: "Nodes left with indegree > 0 indicate?", options: ["A cycle", "A valid order", "Disconnected nodes only"], answer: 0, explain: "They were never freed." }
    ]
  },
  "graph-mst-union-find": {
    story: "Sabse sasta network jodna — saare shehar connect, kam se kam laagat. Kruskal edges ko sasti se mehngi sort karke jodta hai; cycle Union-Find se rok di jaati hai.",
    moral: "A Minimum Spanning Tree connects all nodes at least cost; Kruskal sorts edges and uses Union-Find to avoid cycles.",
    triggers: ["minimum spanning tree", "connect all points", "union-find / disjoint set", "detect cycle by union"],
    template: "function find(x) { return parent[x] === x ? x : (parent[x] = find(parent[x])); }\nfunction union(a, b) {\n  const ra = find(a), rb = find(b);\n  if (ra === rb) return false; // cycle\n  parent[ra] = rb; return true;\n}",
    patternQuiz: [
      { q: "An MST connects all nodes with?", options: ["Minimum total edge weight", "Maximum weight", "The fewest nodes"], answer: 0, explain: "A spanning tree of least cost." },
      { q: "Kruskal's algorithm?", options: ["Sorts edges, adds one if it joins two components", "Uses BFS levels", "Needs a DAG"], answer: 0, explain: "Union-Find rejects cycle edges." },
      { q: "Union-Find (Disjoint Set) is used to?", options: ["Merge sets and detect cycles", "Sort edges", "Find shortest paths"], answer: 0, explain: "Track connectivity efficiently." },
      { q: "Path compression improves?", options: ["find() toward near O(1) amortized", "Sorting", "Memory only"], answer: 0, explain: "Flattens the tree on lookup." },
      { q: "Kruskal complexity?", options: ["O(E log E)", "O(V^3)", "O(V + E)"], answer: 0, explain: "Dominated by sorting edges." },
      { q: "Prim's algorithm instead uses?", options: ["A min-heap growing one tree", "Edge sorting", "Indegrees"], answer: 0, explain: "Expand the cheapest frontier edge." },
      { q: "Union by rank/size keeps the trees?", options: ["Shallow / balanced", "Sorted", "Complete"], answer: 0, explain: "Attach smaller under larger." }
    ]
  },
  "graph-dijkstra-weighted": {
    story: "Sabse chhota raasta non-negative weights ke saath — har baar sabse kareebi unvisited node pick karo (min-heap), uske paados ki doori update karo. Yahi Dijkstra.",
    moral: "Dijkstra finds shortest paths from a source in graphs with non-negative weights, using a min-heap.",
    triggers: ["shortest path (weighted)", "non-negative weights", "min-heap / priority queue", "network delay time"],
    template: "const pq = new MinHeap([[0, src]]); dist[src] = 0;\nwhile (pq.size) {\n  const [d, u] = pq.pop();\n  if (d > dist[u]) continue;\n  for (const [v, w] of adj[u])\n    if (d + w < dist[v]) { dist[v] = d + w; pq.push([dist[v], v]); }\n}",
    patternQuiz: [
      { q: "Dijkstra requires?", options: ["Non-negative edge weights", "A DAG", "Unit weights"], answer: 0, explain: "Negative edges break the greedy invariant." },
      { q: "The core data structure is?", options: ["A min-heap / priority queue", "A stack", "A plain queue"], answer: 0, explain: "Always expand the closest node." },
      { q: "Complexity with a binary heap?", options: ["O(E log V)", "O(V^3)", "O(V + E)"], answer: 0, explain: "Each edge may push to the heap." },
      { q: "Dijkstra finalizes which node each step?", options: ["The closest unvisited one", "The farthest", "A random one"], answer: 0, explain: "Its distance is then settled." },
      { q: "With a negative edge, Dijkstra?", options: ["May give a wrong answer", "Still works", "Runs faster"], answer: 0, explain: "Use Bellman-Ford instead." },
      { q: "dist[] holds?", options: ["Best-known distance from the source", "Edge weights", "Node degrees"], answer: 0, explain: "Updated via relaxation." },
      { q: "Relaxation updates dist[v] when?", options: ["dist[u] + w < dist[v]", "Always", "Never"], answer: 0, explain: "A shorter path through u is found." }
    ]
  },
  "graph-bellman-ford": {
    story: "Negative edges bhi chalein — har edge ko V-1 baar relax karo. Agar phir bhi doori kam ho rahi hai to negative cycle hai. Dheema par general.",
    moral: "Bellman-Ford handles negative edges by relaxing all edges V-1 times, and it detects negative cycles.",
    triggers: ["negative edge weights", "detect negative cycle", "shortest path with negatives"],
    template: "for (let i = 0; i < V - 1; i++)\n  for (const [u, v, w] of edges)\n    if (dist[u] + w < dist[v]) dist[v] = dist[u] + w;\n// one more relaxing pass that still improves => negative cycle",
    patternQuiz: [
      { q: "Bellman-Ford can handle?", options: ["Negative edge weights", "Only non-negative weights", "Only unweighted graphs"], answer: 0, explain: "Unlike Dijkstra." },
      { q: "How many times are all edges relaxed?", options: ["V - 1 times", "V times exactly", "Once"], answer: 0, explain: "A shortest path has at most V-1 edges." },
      { q: "Complexity?", options: ["O(V * E)", "O(E log V)", "O(V + E)"], answer: 0, explain: "V-1 passes over E edges." },
      { q: "A negative cycle is detected when?", options: ["A V-th pass still relaxes an edge", "Any edge is negative", "The graph is dense"], answer: 0, explain: "Distances would improve forever." },
      { q: "Compared to Dijkstra, Bellman-Ford is?", options: ["Slower but more general", "Faster", "Equivalent"], answer: 0, explain: "Handles negatives at a cost." },
      { q: "dist[] is initialized to?", options: ["Infinity, except 0 at the source", "All zeros", "Node indices"], answer: 0, explain: "Unknown distances start infinite." },
      { q: "It works on?", options: ["Directed (and undirected) graphs", "Only trees", "Only DAGs"], answer: 0, explain: "Edge list based." }
    ]
  },
  "graph-floyd-warshall": {
    story: "Sab se sab tak ki doori — har node ko 'beech waala' maano aur raaste chhote karo. Teen nested loops, saari pairs ki shortest path ek saath.",
    moral: "Floyd-Warshall computes all-pairs shortest paths by trying each node as an intermediate.",
    triggers: ["all pairs shortest path", "distance between every pair", "transitive closure"],
    template: "for (let k = 0; k < V; k++)\n  for (let i = 0; i < V; i++)\n    for (let j = 0; j < V; j++)\n      dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);",
    patternQuiz: [
      { q: "Floyd-Warshall computes?", options: ["All-pairs shortest paths", "Single-source paths", "The MST"], answer: 0, explain: "Distance between every pair." },
      { q: "Complexity?", options: ["O(V^3)", "O(E log V)", "O(V + E)"], answer: 0, explain: "Three nested loops over V." },
      { q: "Space complexity?", options: ["O(V^2)", "O(V)", "O(E)"], answer: 0, explain: "A full distance matrix." },
      { q: "The outer loop variable k is?", options: ["The intermediate node", "The source", "The destination"], answer: 0, explain: "Allow paths through nodes 0..k." },
      { q: "It handles negative edges when?", options: ["There is no negative cycle", "Never", "Always, even with negative cycles"], answer: 0, explain: "A negative cycle makes distances undefined." },
      { q: "A boolean variant computes?", options: ["Transitive closure (reachability)", "The MST", "Topological order"], answer: 0, explain: "Replace min/add with or/and." },
      { q: "Floyd-Warshall is best for?", options: ["Small / dense graphs", "Huge sparse graphs", "Trees only"], answer: 0, explain: "V^3 is fine when V is small." }
    ]
  },

  // ================= Heap =================
  "heap-implementation-of-heap": {
    story: "Heap ek array mein chhupa hua tree — min-heap mein parent apne bachchon se chhota. Insert/extract par element upar ya neeche sarakta hai (sift). Top hamesha min ya max.",
    moral: "A binary heap is a complete tree stored in an array; sift up/down keeps the min (or max) at the root.",
    triggers: ["implement a heap", "priority queue", "sift up / sift down", "heapify"],
    template: "// parent(i) = (i-1) >> 1; children = 2i+1, 2i+2\n// push: append, then sift up\n// pop:  swap root with last, remove, then sift down",
    patternQuiz: [
      { q: "push and pop on a heap cost?", options: ["O(log n)", "O(1)", "O(n)"], answer: 0, explain: "An element sifts up/down the height." },
      { q: "Peeking the min/max is?", options: ["O(1)", "O(log n)", "O(n)"], answer: 0, explain: "It sits at the root." },
      { q: "Parent index of node i (0-based array) is?", options: ["(i - 1) / 2", "i / 2", "2i"], answer: 0, explain: "Children are 2i+1 and 2i+2." },
      { q: "Building a heap from n items (heapify) is?", options: ["O(n)", "O(n log n)", "O(n^2)"], answer: 0, explain: "Bottom-up sift-down." },
      { q: "A binary heap is structurally a?", options: ["Complete binary tree", "BST", "Balanced AVL tree"], answer: 0, explain: "Filled left-to-right." },
      { q: "A heap is usually stored in?", options: ["An array", "A linked list", "A hash map"], answer: 0, explain: "Index math gives parent/children." },
      { q: "After removing the root you?", options: ["Move the last element up and sift down", "Sort", "Rebuild from scratch"], answer: 0, explain: "Restore the heap property." }
    ]
  },
  "heap-top-k-elements": {
    story: "Top K cheezein chahiye — ek size-K heap rakho. K sabse bade ke liye min-heap: naya element top (sabse chhote kept) se bada ho to swap. Heap kabhi K se bada nahi hota.",
    moral: "Maintain a size-k heap to get the k largest/smallest efficiently in O(n log k).",
    triggers: ["kth largest / smallest", "top k frequent", "k closest points", "size-k heap"],
    template: "const heap = new MinHeap();\nfor (const x of a) {\n  heap.push(x);\n  if (heap.size > k) heap.pop(); // keep the k largest\n}\nreturn heap.peek(); // the kth largest",
    patternQuiz: [
      { q: "Kth largest element uses?", options: ["A size-k min-heap", "A size-k max-heap", "A stack"], answer: 0, explain: "The root is the kth largest among kept." },
      { q: "Complexity of the heap approach?", options: ["O(n log k)", "O(n log n)", "O(n^2)"], answer: 0, explain: "n pushes, each O(log k)." },
      { q: "Space complexity?", options: ["O(k)", "O(n)", "O(1)"], answer: 0, explain: "The heap holds only k items." },
      { q: "For kth LARGEST you keep a?", options: ["Min-heap of size k", "Max-heap of size k", "Sorted array"], answer: 0, explain: "Pop the smallest when size exceeds k." },
      { q: "An average O(n) alternative is?", options: ["Quickselect", "Merge sort", "BFS"], answer: 0, explain: "Partition around a pivot." },
      { q: "K Closest Points keeps a size-k heap by?", options: ["Distance", "Index", "Value only"], answer: 0, explain: "Keep the k nearest." },
      { q: "You pop when?", options: ["The heap size exceeds k", "The heap is empty", "Every push"], answer: 0, explain: "Maintain exactly k elements." }
    ]
  },
  "heap-merge-k-sorted": {
    story: "K sorted lists ko ek mein milao — har list ka current head ek min-heap mein. Sabse chhota nikaalo, output mein daalo, phir uski list ka agla push karo.",
    moral: "Merge k sorted lists/arrays by keeping the current heads in a min-heap and popping the smallest.",
    triggers: ["merge k sorted lists", "smallest range covering lists", "k-way merge"],
    template: "const pq = new MinHeap(heads); // one head per list\nwhile (pq.size) {\n  const node = pq.pop();\n  out.push(node);\n  if (node.next) pq.push(node.next);\n}",
    patternQuiz: [
      { q: "Merging k sorted lists of N total elements is?", options: ["O(N log k)", "O(N log N)", "O(N^2)"], answer: 0, explain: "Each pop/push is O(log k)." },
      { q: "The heap holds at most?", options: ["One element per list (k)", "All N elements", "Two elements"], answer: 0, explain: "The current frontier." },
      { q: "After popping the smallest you?", options: ["Push its successor from the same list", "Stop", "Sort"], answer: 0, explain: "Advance that list." },
      { q: "Space complexity?", options: ["O(k)", "O(N)", "O(1)"], answer: 0, explain: "The heap of heads." },
      { q: "Versus concatenate-then-sort O(N log N), the heap is?", options: ["Better when k << N", "Always worse", "The same"], answer: 0, explain: "log k < log N." },
      { q: "A k-way merge generalizes?", options: ["The 2-way merge", "Quick sort", "BFS"], answer: 0, explain: "Merge sort's merge step." },
      { q: "The heap is keyed by?", options: ["Element value", "List index only", "Insertion time"], answer: 0, explain: "Smallest value pops first." }
    ]
  },
  "heap-huffman-pattern": {
    story: "Sabse chhoti encoding — baar-baar do sabse kam frequency waale jodo (min-heap se), naya combined node banao. Greedy + heap = optimal prefix code. Ropes jodne waali problem bhi yahi hai.",
    moral: "Huffman coding repeatedly merges the two lowest-frequency items via a min-heap to build an optimal prefix code.",
    triggers: ["huffman coding", "minimum cost to connect ropes", "repeatedly combine two smallest"],
    template: "const pq = new MinHeap(freqs);\nlet cost = 0;\nwhile (pq.size > 1) {\n  const a = pq.pop(), b = pq.pop();\n  cost += a + b;\n  pq.push(a + b);\n}",
    patternQuiz: [
      { q: "Huffman repeatedly merges?", options: ["The two smallest items", "The two largest", "Random pairs"], answer: 0, explain: "Least-frequent first." },
      { q: "The structure used is?", options: ["A min-heap", "A stack", "A BST"], answer: 0, explain: "Always pull the two minima." },
      { q: "Complexity?", options: ["O(n log n)", "O(n)", "O(n^2)"], answer: 0, explain: "n merges, each O(log n)." },
      { q: "It is a?", options: ["Greedy algorithm", "Divide and conquer", "DP algorithm"], answer: 0, explain: "Local merge choices are optimal." },
      { q: "Huffman produces an optimal?", options: ["Prefix code", "Sort", "Spanning tree"], answer: 0, explain: "No code is a prefix of another." },
      { q: "'Minimum cost to connect ropes' is?", options: ["The same pattern", "Dijkstra", "Topological sort"], answer: 0, explain: "Merge two shortest ropes repeatedly." },
      { q: "Each merge adds to the total?", options: ["Cost (sum of the two merged)", "Nothing", "The product"], answer: 0, explain: "Accumulate merge costs." }
    ]
  },

  // ================= Backtracking =================
  "backtracking-choice-based-backtracking": {
    story: "Har kadam par ek choice — ek option lo, aage recurse, kaam na bane to wapas aao (backtrack) aur agla option lo. Permutations, combinations, subsets sab aise bante hain.",
    moral: "Try a choice, recurse, then undo it and try the next — generating permutations, combinations, and subsets.",
    triggers: ["permutations", "combinations", "subsets", "combination sum"],
    template: "function backtrack(start, cur) {\n  res.push([...cur]);\n  for (let i = start; i < n; i++) {\n    cur.push(a[i]);\n    backtrack(i + 1, cur);\n    cur.pop();              // undo the choice\n  }\n}",
    patternQuiz: [
      { q: "The defining step of backtracking is?", options: ["Undo a choice and try the next", "Sorting", "Hashing"], answer: 0, explain: "Explore then restore state." },
      { q: "Number of subsets of n elements?", options: ["2^n", "n!", "n^2"], answer: 0, explain: "Include/exclude each." },
      { q: "Number of permutations of n elements?", options: ["n!", "2^n", "n^2"], answer: 0, explain: "Order matters." },
      { q: "Permutations avoid reuse with?", options: ["A used/visited marker", "A start index", "Sorting"], answer: 0, explain: "Track which elements are placed." },
      { q: "Backtracking's time complexity is generally?", options: ["Exponential", "Linear", "Logarithmic"], answer: 0, explain: "It explores a large search tree." },
      { q: "A start index in combinations prevents?", options: ["Duplicate combinations", "Cycles", "Overflow"], answer: 0, explain: "Only move forward." },
      { q: "Recursion depth?", options: ["O(n)", "O(2^n)", "O(log n)"], answer: 0, explain: "At most one frame per element." }
    ]
  },
  "backtracking-constraint-based-backtracking": {
    story: "Rules ke saath placement — jaise N-Queens ya Sudoku. Har jagah rakhne se pehle validity check karo; galat ho to peeche hato. Jaldi prune karo to tezi aati hai.",
    moral: "Place items while respecting constraints; check validity before recursing and prune invalid branches early.",
    triggers: ["N-Queens", "Sudoku solver", "constraint satisfaction", "valid placement"],
    template: "function solve(r) {\n  if (r === n) return true;\n  for (let c = 0; c < n; c++) if (isValid(r, c)) {\n    place(r, c);\n    if (solve(r + 1)) return true;\n    unplace(r, c);          // backtrack\n  }\n  return false;\n}",
    patternQuiz: [
      { q: "Validity is checked?", options: ["Before recursing into a placement", "After finishing", "Never"], answer: 0, explain: "Prune invalid states early." },
      { q: "Pruning does what?", options: ["Cuts off invalid branches early", "Sorts the board", "Adds memory"], answer: 0, explain: "Fewer states to explore." },
      { q: "N-Queens places?", options: ["One queen per row", "All queens in one column", "Queens randomly"], answer: 0, explain: "Then checks columns/diagonals." },
      { q: "Backtracking here means?", options: ["Undo a placement and try another", "Restart", "Sort"], answer: 0, explain: "Remove the item and continue." },
      { q: "Worst-case complexity?", options: ["Exponential", "Linear", "Logarithmic"], answer: 0, explain: "Constraint search trees are large." },
      { q: "Constraints primarily?", options: ["Shrink the search space", "Slow it down", "Add nodes"], answer: 0, explain: "Fewer valid branches to explore." },
      { q: "Sudoku tries, per empty cell?", options: ["Digits 1..9 that are valid", "Only 1", "Random digits"], answer: 0, explain: "Recurse on each valid digit." }
    ]
  },
  "backtracking-grid-path-backtracking": {
    story: "Grid mein raasta dhoondho — har cell se chaar directions try karo, visited mark karo, dead end par wapas aao aur unmark. Word Search is pattern ka poster child hai.",
    moral: "Explore a grid by trying each direction, marking cells visited, and un-marking on backtrack.",
    triggers: ["word search", "path in a grid", "rat in a maze", "grid DFS with backtracking"],
    template: "function dfs(r, c, i) {\n  if (i === word.length) return true;\n  if (outOfBounds(r, c) || grid[r][c] !== word[i]) return false;\n  const tmp = grid[r][c]; grid[r][c] = '#';\n  const ok = dfs(r+1,c,i+1) || dfs(r-1,c,i+1) || dfs(r,c+1,i+1) || dfs(r,c-1,i+1);\n  grid[r][c] = tmp;         // restore (backtrack)\n  return ok;\n}",
    patternQuiz: [
      { q: "During a grid path you mark cells?", options: ["Visited, then restore on backtrack", "Permanently", "Never"], answer: 0, explain: "Temporary marking prevents reuse in one path." },
      { q: "How many directions per cell (typical)?", options: ["Four", "Eight", "Two"], answer: 0, explain: "Up/down/left/right." },
      { q: "Word Search is a classic of?", options: ["Grid backtracking", "Dijkstra", "Topological sort"], answer: 0, explain: "DFS with backtracking." },
      { q: "On backtrack you must?", options: ["Un-mark the cell", "Sort the grid", "Delete it"], answer: 0, explain: "Restore it for other paths." },
      { q: "Worst-case complexity is?", options: ["Exponential", "O(mn)", "O(log mn)"], answer: 0, explain: "Many path branches." },
      { q: "A branch is pruned when?", options: ["Out of bounds or character mismatch", "The grid is square", "Randomly"], answer: 0, explain: "Stop exploring dead ends." },
      { q: "Temporary marking avoids?", options: ["Revisiting a cell within the same path", "Sorting", "Memory use"], answer: 0, explain: "A cell is used once per path." }
    ]
  },
  "backtracking-decision-tree-sequence-generation": {
    story: "Ek-ek karke sequence banao — har position par valid options try karo. Generate Parentheses, phone letter combinations, restore IP addresses sab decision tree se bante hain.",
    moral: "Build sequences step by step, trying each valid option at every position (a decision tree).",
    triggers: ["generate parentheses", "letter combinations (phone keypad)", "restore IP addresses", "sequence generation"],
    template: "function gen(open, close, cur) {\n  if (cur.length === 2 * n) { res.push(cur); return; }\n  if (open < n) gen(open + 1, close, cur + '(');\n  if (close < open) gen(open, close + 1, cur + ')');\n}",
    patternQuiz: [
      { q: "At each position you?", options: ["Branch over the valid options", "Sort", "Pop a stack"], answer: 0, explain: "A decision tree of choices." },
      { q: "Generate Parentheses prunes using?", options: ["Open/close counts", "A heap", "Sorting"], answer: 0, explain: "Never close more than opened." },
      { q: "Complexity of these generators?", options: ["Exponential (e.g. Catalan)", "Linear", "Logarithmic"], answer: 0, explain: "Many valid sequences." },
      { q: "A complete sequence is recorded?", options: ["At the leaves of the recursion", "At the root", "Midway always"], answer: 0, explain: "When the length condition is met." },
      { q: "Phone letter combinations branch?", options: ["Over the letters of each digit", "Over indices", "Randomly"], answer: 0, explain: "Cartesian product of digit letters." },
      { q: "Pruning here avoids?", options: ["Building invalid prefixes", "Sorting", "Recursion"], answer: 0, explain: "Cut branches that can't be valid." },
      { q: "Recursion depth equals?", options: ["The sequence length", "2^n", "n!"], answer: 0, explain: "One frame per position." }
    ]
  },

  // ================= Greedy =================
  "greedy-intervals-reach": {
    story: "Intervals ka khel — start ya end par sort karke lalchi (greedy) choice lo. Overlap merge karo, meeting rooms ginno, ya sabse door tak pahuncho (Jump Game).",
    moral: "Sort intervals and make greedy local choices to merge, schedule, or maximize reach.",
    triggers: ["merge intervals", "non-overlapping intervals", "meeting rooms", "jump game"],
    template: "intervals.sort((a, b) => a[0] - b[0]);\nlet [start, end] = intervals[0];\nfor (const [s, e] of intervals.slice(1)) {\n  if (s <= end) end = Math.max(end, e);  // overlap -> merge\n  else { result.push([start, end]); [start, end] = [s, e]; }\n}",
    patternQuiz: [
      { q: "Interval problems usually begin by?", options: ["Sorting (by start or end)", "Hashing", "Reversing"], answer: 0, explain: "Order enables greedy decisions." },
      { q: "Merge Intervals merges when?", options: ["The next start <= current end", "They are equal", "Never"], answer: 0, explain: "Overlapping ranges combine." },
      { q: "Non-overlapping Intervals is easiest if you sort by?", options: ["End time, keep earliest finishers", "Start time descending", "Length"], answer: 0, explain: "Classic activity-selection greedy." },
      { q: "Jump Game tracks?", options: ["The farthest reachable index", "The shortest path", "A heap"], answer: 0, explain: "Greedy reachability." },
      { q: "Complexity (dominated by the sort)?", options: ["O(n log n)", "O(n)", "O(n^2)"], answer: 0, explain: "Sorting then a linear sweep." },
      { q: "Greedy means?", options: ["Take the best local choice each step", "Try all options", "Memoize"], answer: 0, explain: "No backtracking." },
      { q: "Meeting Rooms (minimum rooms) often uses?", options: ["A min-heap of end times", "A stack", "Union-Find"], answer: 0, explain: "Reuse a room when one frees up." }
    ]
  },
  "greedy-sorting-local-choice": {
    story: "Sort karo, phir har kadam par sabse accha turant chuno — bina poore future ki parwah kiye. Assign Cookies, Gas Station, activity selection sab isi tarah.",
    moral: "Sort, then repeatedly take the best immediate option; make sure the greedy choice is provably safe.",
    triggers: ["assign cookies", "gas station", "candy distribution", "activity selection"],
    template: "a.sort((x, y) => x - y);\nlet taken = 0;\nfor (const item of a) {\n  if (greedyCondition(item)) taken++;   // take the locally best option\n}",
    patternQuiz: [
      { q: "Greedy algorithms usually start by?", options: ["Sorting", "Hashing", "Recursing"], answer: 0, explain: "Order exposes the best local choice." },
      { q: "A greedy step takes?", options: ["The locally optimal option", "A random option", "All options"], answer: 0, explain: "No reconsideration later." },
      { q: "Gas Station has a solution when?", options: ["Total gas >= total cost", "Any tank is full", "The array is sorted"], answer: 0, explain: "Then a valid start exists." },
      { q: "Typical complexity?", options: ["O(n log n) due to sorting", "O(n^2)", "O(2^n)"], answer: 0, explain: "Sort then one pass." },
      { q: "Greedy correctness needs?", options: ["A proof (e.g. exchange argument)", "Nothing", "Memoization"], answer: 0, explain: "Greedy isn't always correct." },
      { q: "Activity Selection picks by?", options: ["Earliest finish time", "Longest activity", "Random"], answer: 0, explain: "Maximizes remaining room." },
      { q: "When greedy fails, you usually switch to?", options: ["Dynamic programming", "BFS", "A heap"], answer: 0, explain: "DP explores combinations." }
    ]
  },

  // ================= Dynamic Programming =================
  "dynamic-programming-1d-linear-dp": {
    story: "Ek line mein chalo — har step ka answer pichhle ek-do steps se banta hai. House Robber, Climbing Stairs jaise. dp[i] = relation(dp[i-1], dp[i-2]).",
    moral: "Build each index's answer from a few previous indices; store results to avoid recomputation.",
    triggers: ["house robber", "climbing stairs", "dp[i] from dp[i-1] / dp[i-2]", "1D DP"],
    template: "dp[0] = base0; dp[1] = base1;\nfor (let i = 2; i <= n; i++) dp[i] = combine(dp[i-1], dp[i-2]);\nreturn dp[n];",
    patternQuiz: [
      { q: "1D DP builds dp[i] from?", options: ["A few previous states", "All future states", "A heap"], answer: 0, explain: "Local recurrence." },
      { q: "House Robber's recurrence?", options: ["dp[i] = max(dp[i-1], dp[i-2] + a[i])", "dp[i] = dp[i-1] + a[i]", "dp[i] = a[i]"], answer: 0, explain: "Skip or rob the current house." },
      { q: "Complexity?", options: ["O(n)", "O(n^2)", "O(2^n)"], answer: 0, explain: "One pass filling the table." },
      { q: "Space can often be reduced to?", options: ["O(1) with two variables", "O(n^2)", "O(log n)"], answer: 0, explain: "Only the last states matter." },
      { q: "DP applies when subproblems?", options: ["Overlap and have optimal substructure", "Are all distinct", "Are sorted"], answer: 0, explain: "Reuse via memo/table." },
      { q: "Base cases must be?", options: ["Set before the loop", "Ignored", "Computed last"], answer: 0, explain: "The recurrence needs seeds." },
      { q: "Climbing Stairs is essentially?", options: ["Fibonacci", "Binary search", "A heap"], answer: 0, explain: "ways(n)=ways(n-1)+ways(n-2)." }
    ]
  },
  "dynamic-programming-2d-grid-dp": {
    story: "Grid par chalo — har cell ka answer upar aur baayen cell se banta hai. Unique Paths, Min Path Sum jaise. dp[i][j] = f(dp[i-1][j], dp[i][j-1]).",
    moral: "Each grid cell's answer comes from its top/left neighbors; fill the table row by row.",
    triggers: ["unique paths", "minimum path sum", "dp[i][j] from top/left", "grid DP"],
    template: "for (let i = 0; i < m; i++)\n  for (let j = 0; j < n; j++) {\n    const top = i ? dp[i-1][j] : BASE;\n    const left = j ? dp[i][j-1] : BASE;\n    dp[i][j] = combine(grid[i][j], top, left);\n  }",
    patternQuiz: [
      { q: "dp[i][j] typically depends on?", options: ["Top and left cells", "The whole grid", "Diagonals only"], answer: 0, explain: "Neighbors already computed." },
      { q: "Unique Paths sets dp[i][j] to?", options: ["dp[i-1][j] + dp[i][j-1]", "max of neighbors", "1 always"], answer: 0, explain: "Count paths from top and left." },
      { q: "Complexity?", options: ["O(m*n)", "O((mn)^2)", "O(2^(mn))"], answer: 0, explain: "Fill each cell once." },
      { q: "Space can drop to?", options: ["O(n) with a rolling row", "O(1) always", "O(mn log mn)"], answer: 0, explain: "Keep only the previous row." },
      { q: "Minimum Path Sum adds?", options: ["The current cell's cost", "Nothing", "The row index"], answer: 0, explain: "Cost plus the cheaper neighbor." },
      { q: "Base cases are?", options: ["The first row and column", "The center", "The last cell"], answer: 0, explain: "They have one path/edge." },
      { q: "An obstacle cell is handled by?", options: ["Setting it to 0 / blocked", "Ignoring it", "Sorting"], answer: 0, explain: "No path passes through it." }
    ]
  },
  "dynamic-programming-dp-on-strings": {
    story: "Do strings ki tulna — characters match hon to diagonal se, na match hon to padosi se best. LCS, Edit Distance jaise. dp[i][j] = f(dp[i-1][j-1], ...).",
    moral: "Compare two strings cell by cell: a match extends the diagonal, a mismatch takes the best neighbor.",
    triggers: ["longest common subsequence", "edit distance", "distinct subsequences", "DP on strings"],
    template: "for (let i = 1; i <= m; i++)\n  for (let j = 1; j <= n; j++)\n    dp[i][j] = s1[i-1] === s2[j-1]\n      ? dp[i-1][j-1] + 1\n      : Math.max(dp[i-1][j], dp[i][j-1]);",
    patternQuiz: [
      { q: "In LCS, a character match extends?", options: ["The diagonal (dp[i-1][j-1])", "The row", "The column"], answer: 0, explain: "Both strings advance." },
      { q: "Complexity of LCS / Edit Distance?", options: ["O(m*n)", "O(m+n)", "O(2^n)"], answer: 0, explain: "Fill an m x n table." },
      { q: "Space can be reduced to?", options: ["O(n) with two rows", "O(1)", "O(mn log n)"], answer: 0, explain: "Each cell uses the previous row." },
      { q: "Edit Distance's three operations are?", options: ["Insert, delete, replace", "Push, pop, peek", "Sort, merge, split"], answer: 0, explain: "Each costs one step." },
      { q: "Base cases use?", options: ["Empty-string row and column", "The middle", "Diagonal only"], answer: 0, explain: "Distance to/from empty string." },
      { q: "On a mismatch, LCS takes?", options: ["The best neighbor (up or left)", "The diagonal + 1", "Zero"], answer: 0, explain: "Drop one character from either." },
      { q: "Longest Palindromic Subsequence equals?", options: ["LCS of s and reverse(s)", "LCS of s and s", "Edit distance"], answer: 0, explain: "A known reduction." }
    ]
  },
  "dynamic-programming-knapsack-subset-sum": {
    story: "Bag mein kya daalein — har item ko lo ya chhodo, capacity ke andar. 0/1 Knapsack, Subset Sum, Partition sab isi family mein. dp[capacity] include/exclude.",
    moral: "Decide include/exclude for each item under a capacity; a 1D DP over capacity suffices for 0/1 knapsack.",
    triggers: ["0/1 knapsack", "subset sum", "partition equal subset", "target sum"],
    template: "for (const w of weights)\n  for (let c = cap; c >= w; c--)   // backward: each item used once\n    dp[c] = Math.max(dp[c], dp[c - w] + value(w));",
    patternQuiz: [
      { q: "0/1 knapsack decides, per item?", options: ["Include or exclude it", "How many copies", "Its order"], answer: 0, explain: "Each item used at most once." },
      { q: "For 0/1 with a 1D array, iterate capacity?", options: ["Backward", "Forward", "Randomly"], answer: 0, explain: "Backward prevents reusing an item." },
      { q: "Complexity?", options: ["O(n * capacity)", "O(n^2)", "O(2^n)"], answer: 0, explain: "Pseudo-polynomial." },
      { q: "Subset Sum is a?", options: ["Boolean knapsack (reachable sums)", "Sorting problem", "Graph problem"], answer: 0, explain: "Can we hit the target?" },
      { q: "Partition Equal Subset targets?", options: ["Total / 2", "The max element", "n"], answer: 0, explain: "Split into two equal halves." },
      { q: "Unbounded knapsack iterates capacity?", options: ["Forward (items reused)", "Backward", "Not at all"], answer: 0, explain: "Allows multiple copies." },
      { q: "Space with 1D DP?", options: ["O(capacity)", "O(n * capacity)", "O(1)"], answer: 0, explain: "A single capacity array." }
    ]
  },
  "dynamic-programming-dp-on-trees-dags": {
    story: "Ped ya DAG par DP — bachchon ke answers jodkar parent ka banao (post-order). House Robber III, tree diameter jaise. DAG ke shared subpaths ke liye memoization.",
    moral: "Combine children's results into a parent's (post-order DFS); memoize on a DAG to reuse shared subpaths.",
    triggers: ["house robber III", "tree DP", "longest path in a DAG", "rob / skip on a tree"],
    template: "function dfs(node) {\n  if (!node) return [0, 0];           // [rob, skip]\n  const [lr, ls] = dfs(node.left);\n  const [rr, rs] = dfs(node.right);\n  const rob = node.val + ls + rs;\n  const skip = Math.max(lr, ls) + Math.max(rr, rs);\n  return [rob, skip];\n}",
    patternQuiz: [
      { q: "Tree DP combines results?", options: ["Bottom-up (post-order)", "Top-down only", "Level by level"], answer: 0, explain: "Children feed the parent." },
      { q: "House Robber III returns, per node?", options: ["[rob, skip] values", "A single number only", "The height"], answer: 0, explain: "Two states avoid adjacency." },
      { q: "Complexity?", options: ["O(n)", "O(n^2)", "O(2^n)"], answer: 0, explain: "Each node processed once." },
      { q: "On a DAG, DP uses?", options: ["Memoization on shared subproblems", "Sorting edges", "A heap"], answer: 0, explain: "Reuse overlapping subpaths." },
      { q: "Base case for tree DP?", options: ["A null node", "The root", "A leaf's parent"], answer: 0, explain: "Return neutral values." },
      { q: "A parent's answer uses?", options: ["Its children's answers", "Its siblings", "The root only"], answer: 0, explain: "Compose from below." },
      { q: "Longest path in a DAG uses?", options: ["Topological order + DP", "BFS levels", "Union-Find"], answer: 0, explain: "Relax in topo order." }
    ]
  },
  "dynamic-programming-dp-on-intervals": {
    story: "Range par DP — ek interval ka answer chhote intervals se banta hai, ek split point choose karke. Matrix Chain, Burst Balloons, Palindrome Partition jaise.",
    moral: "Compute an interval's answer from smaller sub-intervals by trying each split point.",
    triggers: ["matrix chain multiplication", "burst balloons", "palindrome partitioning", "interval DP"],
    template: "for (let len = 2; len <= n; len++)\n  for (let i = 0; i + len <= n; i++) {\n    const j = i + len;\n    for (let k = i + 1; k < j; k++)\n      dp[i][j] = Math.min(dp[i][j], dp[i][k] + dp[k][j] + cost(i, k, j));\n  }",
    patternQuiz: [
      { q: "Interval DP tries?", options: ["Each split point k inside [i, j]", "Only the midpoint", "The endpoints"], answer: 0, explain: "Combine left and right sub-intervals." },
      { q: "Typical complexity?", options: ["O(n^3)", "O(n)", "O(n log n)"], answer: 0, explain: "Two endpoints and a split." },
      { q: "The classic example is?", options: ["Matrix Chain Multiplication", "Dijkstra", "Merge Intervals"], answer: 0, explain: "Optimal parenthesization." },
      { q: "Burst Balloons reasons about?", options: ["The last balloon burst in a range", "The first burst", "Sorting"], answer: 0, explain: "Decouples left/right subproblems." },
      { q: "The table is filled by?", options: ["Increasing interval length", "Random order", "Columns first"], answer: 0, explain: "Smaller intervals before larger." },
      { q: "dp[i][j] combines?", options: ["dp[i][k] + dp[k][j] + cost", "dp[i-1] + dp[j-1]", "a[i] + a[j]"], answer: 0, explain: "Split at k." },
      { q: "Space complexity?", options: ["O(n^2)", "O(n)", "O(1)"], answer: 0, explain: "A 2D interval table." }
    ]
  },
  "dynamic-programming-dp-on-stocks": {
    story: "Share bazaar — har din ka state (share hold kar rahe ho ya nahi, kitni transactions hui) track karo. Best Time to Buy/Sell ke saare variants ek state-machine DP hain.",
    moral: "Model each day as states (holding or not, transactions used) and transition — a state-machine DP.",
    triggers: ["best time to buy and sell stock", "with cooldown / fee / k transactions", "stock DP"],
    template: "let hold = -Infinity, cash = 0;\nfor (const p of prices) {\n  cash = Math.max(cash, hold + p);   // sell today\n  hold = Math.max(hold, cash - p);   // buy today\n}\nreturn cash;",
    patternQuiz: [
      { q: "Stock DP tracks which states?", options: ["Holding a share vs holding cash", "Sorted prices", "A heap"], answer: 0, explain: "Transition buy/sell each day." },
      { q: "A single transaction means?", options: ["One buy then one sell", "Unlimited trades", "No trades"], answer: 0, explain: "Max profit with one deal." },
      { q: "Complexity for unlimited transactions?", options: ["O(n)", "O(n^2)", "O(2^n)"], answer: 0, explain: "One pass over prices." },
      { q: "Cooldown adds a?", options: ["Rest state after selling", "Second heap", "Sort"], answer: 0, explain: "Can't buy the day after a sell." },
      { q: "A transaction fee is applied?", options: ["On each sell", "On each buy twice", "Never"], answer: 0, explain: "Subtract fee from proceeds." },
      { q: "'hold' represents?", options: ["Best profit while currently holding a share", "Cash only", "The price"], answer: 0, explain: "A running state value." },
      { q: "k transactions gives complexity?", options: ["O(n * k)", "O(n)", "O(k^2)"], answer: 0, explain: "DP over day and transaction count." }
    ]
  },

  // ================= Trie =================
  "trie-basic-trie-operations": {
    story: "Shabdon ka ped — har akshar ek edge hai. Common prefixes share hote hain, isliye insert/search O(word length). Autocomplete aur prefix search Trie ki jaan hain.",
    moral: "A trie stores strings by shared character edges; insert/search are O(word length) and ideal for prefixes.",
    triggers: ["implement trie", "prefix search", "autocomplete", "startsWith"],
    template: "class Node { children = {}; end = false; }\nfunction insert(root, word) {\n  let cur = root;\n  for (const c of word) cur = (cur.children[c] ??= new Node());\n  cur.end = true;\n}",
    patternQuiz: [
      { q: "Insert and search in a trie cost?", options: ["O(word length)", "O(n)", "O(log n)"], answer: 0, explain: "One step per character." },
      { q: "A trie saves space/time by sharing?", options: ["Common prefixes", "Suffixes only", "Nothing"], answer: 0, explain: "Branches diverge at differences." },
      { q: "startsWith checks?", options: ["Whether a prefix path exists", "An exact word", "A suffix"], answer: 0, explain: "No end flag needed." },
      { q: "Trie space can be?", options: ["Large (many nodes)", "Always O(1)", "O(log n)"], answer: 0, explain: "Up to total characters stored." },
      { q: "Each node has up to how many children?", options: ["Alphabet size", "Two", "One"], answer: 0, explain: "E.g. 26 for lowercase." },
      { q: "A complete word is marked by?", options: ["An 'end' flag", "A null child", "The root"], answer: 0, explain: "Distinguishes words from prefixes." },
      { q: "Tries are great for?", options: ["Autocomplete / dictionaries", "Sorting numbers", "Shortest paths"], answer: 0, explain: "Prefix-based lookups." }
    ]
  },
  "trie-word-break-segmentation": {
    story: "Ek lambi string ko dictionary words mein todo — Trie ya DP se dekho kaun sa prefix valid word hai, phir baaki par aage badho. Word Break iska poster child hai.",
    moral: "Segment a string into dictionary words with a trie/DP: check which prefixes are valid, then solve the rest.",
    triggers: ["word break", "segment a string", "concatenated words", "dictionary segmentation"],
    template: "const ok = Array(n + 1).fill(false); ok[0] = true;\nfor (let i = 1; i <= n; i++)\n  for (let j = 0; j < i; j++)\n    if (ok[j] && dict.has(s.slice(j, i))) { ok[i] = true; break; }\nreturn ok[n];",
    patternQuiz: [
      { q: "Word Break is naturally solved with?", options: ["DP over prefixes", "A heap", "Two pointers"], answer: 0, explain: "ok[i] from earlier ok[j]." },
      { q: "ok[i] is true when?", options: ["Some ok[j] and s[j..i] is in the dictionary", "s[0..i] is sorted", "i is even"], answer: 0, explain: "A valid split exists." },
      { q: "Complexity (roughly)?", options: ["O(n^2) (times word length for substring)", "O(n)", "O(2^n) always"], answer: 0, explain: "Try each split point." },
      { q: "A trie helps by?", options: ["Speeding up prefix/word checks", "Sorting", "Reducing memory to O(1)"], answer: 0, explain: "Walk characters as you extend." },
      { q: "Base case?", options: ["ok[0] = true (empty prefix)", "ok[n] = true", "none"], answer: 0, explain: "The empty string is segmentable." },
      { q: "Plain recursion is sped up by?", options: ["Memoization", "A heap", "Sorting"], answer: 0, explain: "Cache results per start index." },
      { q: "The problem explores?", options: ["Split points of the string", "Graph edges", "Tree levels"], answer: 0, explain: "Where one word ends and the next begins." }
    ]
  },
  "trie-bitwise-trie-xor": {
    story: "Numbers ko binary bits ki tarah Trie mein daalo (MSB se LSB). Maximum XOR dhoondhna ho to har bit par opposite bit choose karo. Yahi Bitwise Trie ka jaadu.",
    moral: "Store numbers as bit paths in a trie; to maximize XOR, greedily follow the opposite bit at each level.",
    triggers: ["maximum XOR of two numbers", "bitwise trie", "XOR with a trie"],
    template: "// insert each number bit-by-bit, MSB first\n// to maximize x's XOR, at each bit prefer the opposite-bit child\nfor (let b = 31; b >= 0; b--) {\n  const bit = (x >> b) & 1;\n  node = node.children[bit ^ 1] || node.children[bit];\n}",
    patternQuiz: [
      { q: "A bitwise trie stores numbers as?", options: ["Paths of their bits", "Their decimal digits", "Sorted values"], answer: 0, explain: "Each level is one bit." },
      { q: "To maximize XOR, at each bit you prefer?", options: ["The opposite bit", "The same bit", "A random bit"], answer: 0, explain: "Opposite bits set the XOR bit to 1." },
      { q: "Bits are inserted?", options: ["Most-significant first", "Least-significant first", "In random order"], answer: 0, explain: "So greedy choices matter most up top." },
      { q: "Complexity to build/query?", options: ["O(n * bits)", "O(n^2)", "O(n log n)"], answer: 0, explain: "Fixed bit-width per number." },
      { q: "Each trie node has how many children?", options: ["Two (0 and 1)", "26", "Ten"], answer: 0, explain: "Binary digits." },
      { q: "Choosing the opposite bit maximizes?", options: ["That XOR bit", "The sum", "The AND"], answer: 0, explain: "1 XOR 0 = 1." },
      { q: "This structure is ideal for?", options: ["Maximum XOR pair queries", "Shortest paths", "Sorting"], answer: 0, explain: "Fast XOR optimization." }
    ]
  },

  // ================= Bit Manipulation =================
  "bit-manipulation-basic-bit-operations": {
    story: "Bits ke saath khel — AND, OR, XOR, shift. Kisi bit ko check, set ya clear karna; power of two pehchanna. x & (x-1) se lowest set bit hat jaata hai.",
    moral: "Use AND/OR/XOR/shifts to check, set, or clear bits; x & (x-1) clears the lowest set bit.",
    triggers: ["single number (XOR)", "count set bits", "power of two", "bit tricks"],
    template: "// check bit i:  (x >> i) & 1\n// set bit i:    x | (1 << i)\n// clear bit i:  x & ~(1 << i)\n// clear lowest set bit: x & (x - 1)",
    patternQuiz: [
      { q: "x & (x - 1) does what?", options: ["Clears the lowest set bit", "Sets the lowest bit", "Negates x"], answer: 0, explain: "Used to count set bits quickly." },
      { q: "a XOR a equals?", options: ["0", "a", "1"], answer: 0, explain: "A value cancels itself." },
      { q: "Single Number (every element twice but one) uses?", options: ["XOR of all elements", "Sorting", "A hash map only"], answer: 0, explain: "Pairs cancel, the unique remains." },
      { q: "Power of two check?", options: ["x > 0 && (x & (x - 1)) === 0", "x % 2 === 0", "x > 0"], answer: 0, explain: "Exactly one set bit." },
      { q: "Counting set bits with Brian Kernighan is?", options: ["O(number of set bits)", "O(32) always", "O(n)"], answer: 0, explain: "Clear one set bit per step." },
      { q: "Checking bit i uses?", options: ["(x >> i) & 1", "x | i", "x ^ i"], answer: 0, explain: "Shift then mask." },
      { q: "XOR is?", options: ["Associative and commutative", "Only associative", "Neither"], answer: 0, explain: "Order doesn't matter." }
    ]
  },
  "bit-manipulation-subsets-bitmask": {
    story: "n items ke saare subsets — ek number 0 se 2^n-1 tak har subset ko represent karta hai, jahan bit=1 matlab item included. Bitmask se saare subsets iterate karo.",
    moral: "Represent subsets as bitmasks (0..2^n - 1); bit i set means item i is included.",
    triggers: ["subsets via bitmask", "iterate all subsets", "bitmask DP", "traveling salesman (bitmask)"],
    template: "for (let mask = 0; mask < (1 << n); mask++)\n  for (let i = 0; i < n; i++)\n    if (mask & (1 << i)) { /* item i is in this subset */ }",
    patternQuiz: [
      { q: "A subset of n items is represented by?", options: ["An n-bit bitmask", "A sorted array", "A heap"], answer: 0, explain: "Each bit = include/exclude." },
      { q: "How many subsets of n items?", options: ["2^n", "n!", "n^2"], answer: 0, explain: "Each masks runs 0..2^n-1." },
      { q: "Bit i set in the mask means?", options: ["Item i is included", "Item i is excluded", "Item i is first"], answer: 0, explain: "Membership test." },
      { q: "To enumerate all subsets you iterate?", options: ["mask from 0 to 2^n - 1", "0 to n", "the primes"], answer: 0, explain: "Every bit pattern." },
      { q: "Bitmask DP is common for?", options: ["Traveling Salesman, O(2^n * n)", "Sorting", "BFS"], answer: 0, explain: "State = visited set." },
      { q: "Testing membership uses?", options: ["mask & (1 << i)", "mask | i", "mask ^ i"], answer: 0, explain: "Non-zero means present." },
      { q: "Iterating submasks of a mask is?", options: ["A known bit trick (sub = (sub-1) & mask)", "Impossible", "Sorting"], answer: 0, explain: "Enumerate sub-bitmasks efficiently." }
    ]
  },
  "bit-manipulation-advanced-xor": {
    story: "XOR ke jaadu — do single numbers ko alag karna, missing number dhoondhna, prefix XOR se subarray XOR. Sab XOR cancellation ka khel hai.",
    moral: "Exploit XOR cancellation: split two uniques by a differing bit, find a missing number, or use prefix XOR for ranges.",
    triggers: ["single number II / III", "missing number", "subarray XOR", "prefix XOR"],
    template: "// prefix XOR: xor(i..j) = pre[j+1] ^ pre[i]\n// two uniques: xor everything, isolate a differing bit, partition by it\nconst lowestSetBit = diff & (-diff);",
    patternQuiz: [
      { q: "Prefix XOR gives a subarray's XOR in?", options: ["O(1) after an O(n) build", "O(n) per query", "O(log n)"], answer: 0, explain: "pre[j+1] ^ pre[i]." },
      { q: "Single Number III (two uniques) partitions numbers by?", options: ["A bit where the two uniques differ", "Their index", "Their sign"], answer: 0, explain: "XOR-all isolates that bit." },
      { q: "Missing Number can be found by?", options: ["XOR of indices and values", "Sorting only", "A heap"], answer: 0, explain: "Pairs cancel, the gap remains." },
      { q: "x & (-x) isolates?", options: ["The lowest set bit", "The highest bit", "All bits"], answer: 0, explain: "Two's complement trick." },
      { q: "XOR cancels?", options: ["Equal pairs to 0", "Nothing", "Everything"], answer: 0, explain: "a ^ a = 0." },
      { q: "Single Number II (every element three times) uses?", options: ["Bit counts mod 3", "XOR alone", "Sorting"], answer: 0, explain: "The unique bit count isn't a multiple of 3." },
      { q: "Complexity of these XOR tricks?", options: ["O(n)", "O(n log n)", "O(n^2)"], answer: 0, explain: "A single pass." }
    ]
  }
};

// Reusable quiz builders keep sets consistent and professional.
const Q = (q, options, answer, explain) => ({ q, options, answer, explain });

const questionContent = {
  // ---------------- Two-Pointer ----------------
  "problem_0001": {
    description: "You are given a sorted array `numbers` and a `target`. Find two distinct positions whose values add up to the target and return their 1-based indices. Exactly one valid solution is guaranteed.",
    example: { input: "numbers = [2,7,11,15], target = 9", output: "[1, 2]", why: "2 + 7 = 9, at positions 1 and 2" },
    quizzes: [
      Q("Best time complexity for Two Sum II on a sorted array?", ["O(n log n)", "O(n)", "O(n^2)"], 1, "Two pointers traverse the array once."),
      Q("Which pattern fits this problem?", ["Sliding window", "Two-pointer", "Backtracking"], 1, "A sorted array with a pair-sum target is a textbook two-pointer problem."),
      Q("If the current sum is less than the target, which pointer moves?", ["Left pointer right", "Right pointer left", "Return immediately"], 0, "A larger sum is needed, so advance the left pointer."),
      Q("Extra space used by the optimal solution?", ["O(1)", "O(n)", "O(log n)"], 0, "Only two pointers are required."),
      Q("If the array were NOT sorted, the better approach is?", ["Hash map (Two Sum I)", "Heap", "Trie"], 0, "A hash map gives an O(n) single pass on unsorted input."),
      Q("Why not use binary search for the second number here?", ["Two pointers are already O(n); binary search would be O(n log n)", "Binary search doesn't work on arrays", "It uses more memory than a heap"], 0, "The two-pointer scan is strictly better here."),
      Q("The pointers stop when?", ["left >= right", "left > n", "right < 0"], 0, "They meet in the middle; left < right is the loop condition.")
    ]
  },
  "problem_0002": {
    description: "Given an integer array `nums`, return all unique triplets (a, b, c) such that a + b + c = 0. The result must not contain duplicate triplets.",
    example: { input: "nums = [-1,0,1,2,-1,-4]", output: "[[-1,-1,2],[-1,0,1]]", why: "Both triplets sum to 0; duplicates are skipped" },
    quizzes: [
      Q("Typical time complexity of 3Sum?", ["O(n)", "O(n^2)", "O(n^3)"], 1, "Sort, then a two-pointer scan for each fixed element."),
      Q("What is done first to handle duplicates cleanly?", ["Sort the array", "Reverse it", "Shuffle it"], 0, "Sorting makes equal values adjacent so they can be skipped."),
      Q("How are the inner two numbers found for a fixed element?", ["Two-pointer", "Binary search everywhere", "Recursion"], 0, "Fix one element, two-pointer the remaining range."),
      Q("The target for the inner two-pointer, given fixed element x, is?", ["-x", "x", "0"], 0, "We need a + b + c = 0, so b + c = -x."),
      Q("After finding a valid triplet, why advance both pointers past duplicates?", ["To avoid repeating the same triplet", "To speed up sorting", "To save memory"], 0, "Skipping equal neighbours prevents duplicate triplets."),
      Q("Space complexity ignoring the output?", ["O(1) or O(sort)", "O(n^2)", "O(n^3)"], 0, "Only the sort and a few pointers are used."),
      Q("Brute force for 3Sum would be?", ["O(n^3)", "O(n^2)", "O(n)"], 0, "Three nested loops over all triples.")
    ]
  },
  "problem_0003": {
    description: "Given an array containing only 0s, 1s, and 2s (red, white, blue), sort it in-place so identical values are grouped. This is the Dutch National Flag problem.",
    example: { input: "nums = [2,0,2,1,1,0]", output: "[0,0,1,1,2,2]", why: "0s first, then 1s, then 2s" },
    quizzes: [
      Q("Optimal approach for Sort Colors?", ["Three pointers (low, mid, high)", "Merge sort", "Counting sort only"], 0, "The Dutch National Flag algorithm."),
      Q("Complexity of the three-pointer approach?", ["O(n), O(1)", "O(n log n), O(1)", "O(n), O(n)"], 0, "One pass, constant extra space."),
      Q("When nums[mid] == 0, you?", ["Swap mid with low, advance both", "Swap mid with high", "Only advance mid"], 0, "Send 0 to the low region and move both forward."),
      Q("When nums[mid] == 2, you?", ["Swap mid with high, decrement high only", "Advance mid", "Swap with low"], 0, "The swapped-in value still needs checking, so mid stays."),
      Q("When nums[mid] == 1, you?", ["Just advance mid", "Swap with low", "Swap with high"], 0, "1 belongs in the middle region."),
      Q("How many passes does the optimal solution need?", ["One", "Two", "Three"], 0, "A single pass with three pointers."),
      Q("A simpler but two-pass method is?", ["Count 0s/1s/2s then overwrite", "Quick sort", "Binary search"], 0, "Counting sort does it in two passes.")
    ]
  },
  "problem_0004": {
    description: "Move all 0s to the end while keeping the relative order of the non-zero elements. Do it in-place.",
    example: { input: "nums = [0,1,0,3,12]", output: "[1,3,12,0,0]", why: "Non-zero order preserved, zeros pushed back" },
    quizzes: [
      Q("Clean technique for Move Zeroes?", ["A write pointer for non-zero values", "Sorting", "Reversing"], 0, "Place non-zeros in order, then fill the rest with zeros."),
      Q("Time complexity?", ["O(n)", "O(n^2)", "O(n log n)"], 0, "A single pass."),
      Q("Space complexity?", ["O(1)", "O(n)", "O(log n)"], 0, "Done in-place."),
      Q("Is relative order of non-zeros preserved?", ["Yes", "No", "Only if sorted"], 0, "The write pointer keeps their order."),
      Q("What does the write pointer track?", ["The next slot for a non-zero value", "The last zero", "The array length"], 0, "It marks where the next non-zero goes."),
      Q("A swap-based variant swaps when?", ["Current element is non-zero", "Current element is zero", "Always"], 0, "Swap the non-zero into the write slot."),
      Q("Which pattern does this belong to?", ["Two-pointer", "Prefix sum", "Kadane"], 0, "Fast/slow write pointers over the array.")
    ]
  },
  "problem_0005": {
    description: "Given an array of heights, pick two lines that with the x-axis hold the most water. Area = min(height[l], height[r]) * (r - l). Return the maximum area.",
    example: { input: "height = [1,8,6,2,5,4,8,3,7]", output: "49", why: "Indices 1 and 8: min(8,7) * 7 = 49" },
    quizzes: [
      Q("Which pointer should move?", ["The one at the shorter line", "The one at the taller line", "Always both"], 0, "The shorter line caps the area, so moving it is the only chance to grow."),
      Q("Time complexity?", ["O(n)", "O(n^2)", "O(n log n)"], 0, "A single two-pointer pass."),
      Q("Space complexity?", ["O(1)", "O(n)", "O(log n)"], 0, "Only two pointers."),
      Q("Area between l and r is?", ["min(h[l],h[r]) * (r-l)", "max(h[l],h[r]) * (r-l)", "h[l]+h[r]"], 0, "Water height is the shorter line; width is the gap."),
      Q("Why does moving the taller line never help?", ["Width shrinks and height is still capped by the shorter line", "It always increases area", "It breaks sorting"], 0, "The shorter line still limits height, so area can only drop."),
      Q("Brute force complexity?", ["O(n^2)", "O(n)", "O(n log n)"], 0, "Checking every pair of lines."),
      Q("Start the pointers where?", ["Both ends of the array", "Both at index 0", "The middle"], 0, "Widest container first, then shrink.")
    ]
  },
  "problem_0006": {
    description: "Given an elevation map as a height array, compute how much rainwater is trapped after it rains. Water above an index = min(left max, right max) - height[index].",
    example: { input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]", output: "6", why: "Summing trapped water across all dips gives 6 units" },
    quizzes: [
      Q("Complexity of the two-pointer version?", ["O(n) time, O(1) space", "O(n^2)", "O(n log n)"], 0, "Left/right pointers with running maxima."),
      Q("Water trapped above an index depends on?", ["min(leftMax, rightMax) - height", "max(left, right)", "height alone"], 0, "The shorter of the two tallest walls sets the level."),
      Q("Which side's pointer do you move in the two-pointer method?", ["The side with the smaller running max", "The larger side", "Always left"], 0, "The smaller max bounds the water, so process that side."),
      Q("A prefix-array solution uses how much space?", ["O(n)", "O(1)", "O(log n)"], 0, "It stores leftMax[] and rightMax[]."),
      Q("If height[i] >= leftMax so far, water at i is?", ["0 (it becomes the new wall)", "leftMax", "height[i]"], 0, "No water sits on a new peak."),
      Q("Which approach also solves it in O(n)?", ["Monotonic stack", "Sorting", "Binary search"], 0, "A stack can accumulate trapped water between bars."),
      Q("Brute force per index scans?", ["Left and right for the max walls -> O(n^2)", "Nothing", "Only neighbours"], 0, "Recomputing both maxima each time is quadratic.")
    ]
  },

  // ---------------- Sliding Window ----------------
  "problem_0007": {
    description: "Given an array and an integer k, find the maximum sum of any contiguous subarray of exactly size k.",
    example: { input: "nums = [2,1,5,1,3,2], k = 3", output: "9", why: "[5,1,3] has the largest sum, 9" },
    quizzes: [
      Q("Which pattern solves this best?", ["Fixed-size sliding window", "Two-pointer on sorted", "Backtracking"], 0, "The window size is fixed at k."),
      Q("Time complexity?", ["O(n)", "O(n*k)", "O(n^2)"], 0, "Slide the window, updating the sum incrementally."),
      Q("How is the window sum updated each step?", ["Add entering, subtract leaving element", "Recompute from scratch", "Sort the window"], 0, "That keeps it O(n)."),
      Q("Space complexity?", ["O(1)", "O(k)", "O(n)"], 0, "Only a running sum and best value."),
      Q("The naive approach that recomputes each window is?", ["O(n*k)", "O(n)", "O(log n)"], 0, "Summing k elements for each start."),
      Q("The window always contains how many elements?", ["Exactly k", "At most k", "At least k"], 0, "It is a fixed-size window."),
      Q("When do you start tracking the max sum?", ["After the first full window of size k", "From index 0", "At the end"], 0, "The first k elements form the initial window.")
    ]
  },
  "problem_0008": {
    description: "Given a binary array, return the maximum number of consecutive 1s.",
    example: { input: "nums = [1,1,0,1,1,1]", output: "3", why: "The last three 1s are the longest run" },
    quizzes: [
      Q("Approach?", ["Single pass counting the current run", "Sorting", "Two-pointer on sorted"], 0, "Track a running count, reset on 0."),
      Q("Time complexity?", ["O(n)", "O(n^2)", "O(n log n)"], 0, "One pass."),
      Q("Space complexity?", ["O(1)", "O(n)", "O(log n)"], 0, "Just two counters."),
      Q("What happens to the counter on a 0?", ["Reset to 0", "Increment", "Double"], 0, "The run of 1s is broken."),
      Q("What do you update on a 1?", ["Increment count, update best", "Reset count", "Nothing"], 0, "Extend the current run and record the max."),
      Q("Is this a windowing problem strictly?", ["It's a simple linear scan", "Yes, fixed window", "No, it's two-pointer"], 0, "A single counter suffices."),
      Q("Max consecutive ones in [0,0,0] is?", ["0", "1", "3"], 0, "There are no 1s.")
    ]
  },
  "problem_0009": {
    description: "Given a binary array and an integer k, return the longest subarray of 1s you can get if you may flip at most k zeros.",
    example: { input: "nums = [1,1,0,0,1,1,1,0,1], k = 2", output: "6", why: "Flipping two 0s yields a run of six 1s" },
    quizzes: [
      Q("Which pattern fits?", ["Variable-size sliding window", "Fixed window", "Prefix sum"], 0, "Grow the window; shrink when zeros exceed k."),
      Q("The window is valid while?", ["zeros in window <= k", "sum <= k", "length <= k"], 0, "At most k zeros may be flipped."),
      Q("When zeros exceed k, you?", ["Shrink from the left until valid", "Reset the window", "Stop"], 0, "Move left forward, removing zeros."),
      Q("Time complexity?", ["O(n)", "O(n*k)", "O(n^2)"], 0, "Each index enters and leaves once."),
      Q("Space complexity?", ["O(1)", "O(k)", "O(n)"], 0, "Only counters and pointers."),
      Q("The answer is the maximum of?", ["right - left + 1 over valid windows", "number of zeros", "k"], 0, "The longest valid window length."),
      Q("If k >= number of zeros, the answer is?", ["The whole array length", "k", "0"], 0, "Every zero can be flipped.")
    ]
  },
  "problem_0010": {
    description: "Given an array of positive integers and an integer k, count the number of contiguous subarrays whose product is strictly less than k.",
    example: { input: "nums = [10,5,2,6], k = 100", output: "8", why: "Eight subarrays have product < 100" },
    quizzes: [
      Q("Which pattern fits?", ["Sliding window with running product", "Two-pointer on sorted", "Kadane"], 0, "Expand right; shrink left while product >= k."),
      Q("Counting trick: a valid window [left..right] adds how many subarrays?", ["right - left + 1", "1", "right * left"], 0, "All subarrays ending at right within the window."),
      Q("Why must the values be positive for this to work?", ["Product is monotonic as the window grows", "To allow sorting", "To use a heap"], 0, "Positivity keeps the shrink/grow logic valid."),
      Q("Time complexity?", ["O(n)", "O(n^2)", "O(n log n)"], 0, "Each pointer moves forward at most n times."),
      Q("Space complexity?", ["O(1)", "O(n)", "O(k)"], 0, "A running product and two pointers."),
      Q("When product >= k, you?", ["Divide out nums[left] and move left", "Stop", "Reset to 1"], 0, "Shrink from the left to restore validity."),
      Q("If k <= 1, the answer is?", ["0", "n", "1"], 0, "No subarray of positives has product < 1.")
    ]
  },
  "problem_0011": {
    description: "Given an array and a window size k, return the maximum of each contiguous window of size k as the window slides across the array.",
    example: { input: "nums = [1,3,-1,-3,5,3,6,7], k = 3", output: "[3,3,5,5,6,7]", why: "Max of each size-3 window" },
    quizzes: [
      Q("Optimal data structure here?", ["A monotonic deque", "A min-heap", "A stack of sums"], 0, "A decreasing deque keeps the current max at the front."),
      Q("Time complexity of the deque approach?", ["O(n)", "O(n*k)", "O(n log n)"], 0, "Each index is pushed and popped once."),
      Q("The deque stores?", ["Indices, not values", "Only the max", "Sorted values"], 0, "Indices let you drop ones that fall out of the window."),
      Q("A heap-based solution costs?", ["O(n log n)", "O(n)", "O(n*k)"], 0, "Each push/pop is logarithmic."),
      Q("Front of the deque is removed when?", ["Its index is outside the window", "It is the smallest", "Always"], 0, "Expired indices leave the front."),
      Q("Before pushing a new index, you pop from the back while?", ["deque back value <= current value", "back value >= current", "deque is empty"], 0, "Smaller values can never be the max again."),
      Q("Space complexity?", ["O(k)", "O(1)", "O(n^2)"], 0, "The deque holds at most k indices.")
    ]
  },
  "problem_0012": {
    description: "Given an array and an integer k, count the number of contiguous subarrays that contain exactly k distinct integers.",
    example: { input: "nums = [1,2,1,2,3], k = 2", output: "7", why: "Seven subarrays have exactly two distinct values" },
    quizzes: [
      Q("Clever reduction used here?", ["exactly(k) = atMost(k) - atMost(k-1)", "exactly(k) = atMost(k) + atMost(k-1)", "exactly(k) = 2*atMost(k)"], 0, "Two 'at most' windows give the exact count."),
      Q("atMost(k) is computed with?", ["A sliding window + frequency map", "Sorting", "A heap"], 0, "Count subarrays with at most k distinct values."),
      Q("Overall time complexity?", ["O(n)", "O(n^2)", "O(n log n)"], 0, "Two linear window passes."),
      Q("Space complexity?", ["O(k)", "O(1)", "O(n^2)"], 0, "A frequency map of window contents."),
      Q("A valid 'at most k' window adds how many subarrays?", ["right - left + 1", "1", "k"], 0, "All subarrays ending at right."),
      Q("When distinct count exceeds k, you?", ["Shrink left, decrementing frequencies", "Reset the map", "Stop"], 0, "Remove from the left until valid."),
      Q("Why is direct 'exactly k' hard with one window?", ["Window monotonicity breaks for exact counts", "It needs sorting", "It needs a heap"], 0, "'At most' is monotonic; 'exactly' is not.")
    ]
  },
  "problem_0013": {
    description: "You can carry two baskets, each holding one type of fruit. Walking a row of trees, pick the longest contiguous run using at most two fruit types. Return its length.",
    example: { input: "fruits = [1,2,1,2,3]", output: "4", why: "[1,2,1,2] uses only two types" },
    quizzes: [
      Q("This reduces to which classic problem?", ["Longest subarray with at most 2 distinct values", "Maximum subarray sum", "Two Sum"], 0, "Two baskets = at most two distinct types."),
      Q("Which pattern solves it?", ["Variable-size sliding window", "Fixed window", "Kadane"], 0, "Grow the window; shrink when types exceed 2."),
      Q("Time complexity?", ["O(n)", "O(n^2)", "O(n log n)"], 0, "Each index enters and leaves once."),
      Q("Space complexity?", ["O(1) (at most 3 keys)", "O(n)", "O(n^2)"], 0, "The map holds at most a few fruit types."),
      Q("When a third type appears, you?", ["Shrink from the left until two remain", "Reset", "Stop"], 0, "Remove left fruits until only two types remain."),
      Q("The answer tracks?", ["Max window length seen", "Number of types", "Sum of fruits"], 0, "The longest valid run."),
      Q("Generalized, 'at most 2' becomes?", ["at most k distinct", "exactly 2", "all distinct"], 0, "The same window generalizes to k types.")
    ]
  },
  "problem_0014": {
    description: "Given an array of positive integers and a target, return the minimal length of a contiguous subarray whose sum is >= target, or 0 if none exists.",
    example: { input: "target = 7, nums = [2,3,1,2,4,3]", output: "2", why: "[4,3] sums to 7 with length 2" },
    quizzes: [
      Q("Which pattern fits?", ["Variable-size sliding window", "Fixed window", "Prefix sum only"], 0, "Grow to reach the target, shrink to minimize length."),
      Q("When the window sum >= target, you?", ["Record length and shrink from the left", "Stop", "Reset"], 0, "Try to make it shorter while still valid."),
      Q("Time complexity?", ["O(n)", "O(n^2)", "O(n log n)"], 0, "Each pointer advances at most n times."),
      Q("Space complexity?", ["O(1)", "O(n)", "O(log n)"], 0, "A running sum and two pointers."),
      Q("Why does the window approach rely on positivity?", ["Sum grows as you add, shrinks as you remove", "To allow sorting", "To use a heap"], 0, "Monotonic behaviour makes shrinking valid."),
      Q("If no subarray reaches the target, return?", ["0", "-1", "n"], 0, "Convention is 0 for impossible."),
      Q("An O(n log n) alternative uses?", ["Prefix sums + binary search", "A heap", "Backtracking"], 0, "Binary search the prefix array for each start.")
    ]
  },

  // ---------------- Prefix Sum ----------------
  "problem_0015": {
    description: "Given an integer array and an integer k, count the number of contiguous subarrays whose sum equals k. Values may be negative.",
    example: { input: "nums = [1,1,1], k = 2", output: "2", why: "[1,1] appears twice" },
    quizzes: [
      Q("Optimal approach?", ["Prefix sums + hash map of counts", "Sliding window", "Sorting"], 0, "Window fails with negatives; use prefix counts."),
      Q("For prefix P, a subarray sums to k when?", ["A previous prefix equals P - k", "P equals k", "P is even"], 0, "P[right] - P[left] = k."),
      Q("Why can't a sliding window be used here?", ["Negative numbers break monotonicity", "k is too large", "The array is sorted"], 0, "Sums aren't monotonic with negatives."),
      Q("Time complexity?", ["O(n)", "O(n^2)", "O(n log n)"], 0, "One pass with O(1) map lookups."),
      Q("Space complexity?", ["O(n)", "O(1)", "O(k)"], 0, "The hash map of prefix counts."),
      Q("The map should be initialized with?", ["{0: 1}", "{} empty", "{k: 1}"], 0, "An empty prefix (sum 0) occurs once."),
      Q("The map stores?", ["Prefix sum -> how many times seen", "Index -> value", "Value -> index"], 0, "Counts of each prefix sum.")
    ]
  },
  "problem_0016": {
    description: "Given an m x n matrix and a value k, return a matrix where each cell is the sum of all elements within k steps (a (2k+1) x (2k+1) block) around it, clamped to the matrix bounds.",
    example: { input: "mat = [[1,2,3],[4,5,6],[7,8,9]], k = 1", output: "[[12,21,16],[27,45,33],[24,39,28]]", why: "Each cell sums its clamped neighbourhood" },
    quizzes: [
      Q("Core technique?", ["2D prefix sum", "Sliding window per row only", "Sorting"], 0, "A 2D prefix array gives any rectangle sum in O(1)."),
      Q("Time complexity to build + answer?", ["O(m*n)", "O(m*n*k)", "O((m*n)^2)"], 0, "Linear in the number of cells."),
      Q("A rectangle sum via 2D prefix uses how many lookups?", ["Four (inclusion-exclusion)", "One", "k"], 0, "P[D] - P[B] - P[C] + P[A]."),
      Q("Space complexity?", ["O(m*n)", "O(1)", "O(k)"], 0, "The prefix matrix."),
      Q("Why clamp indices?", ["Blocks near edges extend past the matrix", "To sort", "To save memory"], 0, "Bounds must stay within the matrix."),
      Q("Without prefix sums, the brute force is?", ["O(m*n*k^2)", "O(m*n)", "O(log n)"], 0, "Summing each block directly."),
      Q("Inclusion-exclusion adds back which corner?", ["The doubly-subtracted top-left region", "The center", "Nothing"], 0, "It was removed twice, so add it once.")
    ]
  },
  "problem_0017": {
    description: "Given an array, return an array where each position holds the product of all other elements, without using division.",
    example: { input: "nums = [1,2,3,4]", output: "[24,12,8,6]", why: "Each entry is the product of the rest" },
    quizzes: [
      Q("Technique (no division)?", ["Prefix products and suffix products", "Sorting", "Two-pointer"], 0, "Left-of-i product times right-of-i product."),
      Q("Time complexity?", ["O(n)", "O(n^2)", "O(n log n)"], 0, "Two linear passes."),
      Q("Extra space beyond the output?", ["O(1)", "O(n)", "O(log n)"], 0, "Build the suffix product on the fly."),
      Q("Why avoid division?", ["Zeros make division invalid", "It's slower", "It uses more memory"], 0, "A single zero breaks the divide trick."),
      Q("answer[i] equals?", ["prefix[i] * suffix[i]", "prefix[i] + suffix[i]", "nums[i] * prefix[i]"], 0, "Product of everything left and right of i."),
      Q("With one zero in the array, all outputs are zero except?", ["The zero's own position", "None", "All of them"], 0, "Only that index gets the product of the others."),
      Q("With two or more zeros, the output is?", ["All zeros", "Unchanged", "Error"], 0, "Every position has at least one zero factor.")
    ]
  },
  "problem_0018": {
    description: "Given an array and an integer k, determine if there is a contiguous subarray of length at least 2 whose sum is a multiple of k.",
    example: { input: "nums = [23,2,4,6,7], k = 6", output: "true", why: "[2,4] sums to 6, a multiple of 6" },
    quizzes: [
      Q("Key idea?", ["Equal prefix-sum remainders mod k", "Sliding window", "Sorting"], 0, "Two prefixes with the same remainder bound a multiple of k."),
      Q("You store in the map?", ["remainder -> earliest index", "sum -> count", "index -> value"], 0, "First index where each remainder appeared."),
      Q("Why require length >= 2?", ["Same remainder must be at least two indices apart", "To sort", "To save memory"], 0, "Otherwise a single element could falsely qualify."),
      Q("Time complexity?", ["O(n)", "O(n^2)", "O(n log n)"], 0, "One pass with remainder lookups."),
      Q("Space complexity?", ["O(min(n,k))", "O(1)", "O(n^2)"], 0, "At most k distinct remainders."),
      Q("Initialize the map with?", ["{0: -1}", "{} empty", "{k: 0}"], 0, "Remainder 0 before the array (index -1)."),
      Q("Two indices i<j with equal remainder mean sum(i+1..j) is?", ["Divisible by k", "Equal to k", "Odd"], 0, "The remainders cancel out.")
    ]
  },
  "problem_0019": {
    description: "Given an array and an integer k, count the number of contiguous subarrays whose sum is divisible by k.",
    example: { input: "nums = [4,5,0,-2,-3,1], k = 5", output: "7", why: "Seven subarrays have sums divisible by 5" },
    quizzes: [
      Q("Technique?", ["Prefix-sum remainders + count map", "Sliding window", "Sorting"], 0, "Count pairs of prefixes sharing a remainder."),
      Q("Two prefixes with equal remainder give a subarray that is?", ["Divisible by k", "Equal to k", "Positive"], 0, "Their difference is a multiple of k."),
      Q("Handle negative remainders by?", ["((r % k) + k) % k", "Math.abs", "Ignoring them"], 0, "Normalize into [0, k)."),
      Q("Time complexity?", ["O(n)", "O(n^2)", "O(n log n)"], 0, "One pass with a remainder map."),
      Q("Space complexity?", ["O(k)", "O(1)", "O(n^2)"], 0, "At most k remainder buckets."),
      Q("If a remainder has appeared c times, it contributes?", ["c pairs with the new index", "1", "c^2"], 0, "Each earlier occurrence forms a valid subarray."),
      Q("Initialize remainder-0 count as?", ["1", "0", "k"], 0, "The empty prefix has remainder 0.")
    ]
  },
  "problem_0020": {
    description: "Given an array, return the leftmost index where the sum of the numbers to its left equals the sum to its right. Return -1 if none.",
    example: { input: "nums = [1,7,3,6,5,6]", output: "3", why: "Left sum 11 equals right sum 11 at index 3" },
    quizzes: [
      Q("Technique?", ["Total sum, then track a running left sum", "Sorting", "Two-pointer on sorted"], 0, "right = total - left - nums[i]."),
      Q("Time complexity?", ["O(n)", "O(n^2)", "O(n log n)"], 0, "Compute total, then one scan."),
      Q("Space complexity?", ["O(1)", "O(n)", "O(log n)"], 0, "Just running sums."),
      Q("At index i, right sum equals?", ["total - leftSum - nums[i]", "total - leftSum", "leftSum"], 0, "Everything except the left part and nums[i]."),
      Q("Return which index on ties?", ["The leftmost", "The rightmost", "Any"], 0, "Scan left to right and return the first match."),
      Q("The pivot condition is?", ["leftSum == total - leftSum - nums[i]", "leftSum == total", "nums[i] == 0"], 0, "Left equals right."),
      Q("If no pivot exists, return?", ["-1", "0", "n"], 0, "Convention for 'not found'.")
    ]
  },

  // ---------------- Kadane ----------------
  "problem_0021": {
    description: "Given an integer array, find the contiguous subarray with the largest sum and return that sum.",
    example: { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6", why: "[4,-1,2,1] sums to 6" },
    quizzes: [
      Q("Algorithm name?", ["Kadane's algorithm", "Dijkstra", "Floyd-Warshall"], 0, "Running max ending at each index."),
      Q("Time complexity?", ["O(n)", "O(n^2)", "O(n log n)"], 0, "A single pass."),
      Q("Space complexity?", ["O(1)", "O(n)", "O(log n)"], 0, "Two variables."),
      Q("cur is updated as?", ["max(nums[i], cur + nums[i])", "cur + nums[i]", "max(cur, nums[i])"], 0, "Extend or restart at i."),
      Q("When is cur restarted?", ["When cur + nums[i] < nums[i]", "Every index", "Never"], 0, "A negative running sum is dropped."),
      Q("For an all-negative array, the answer is?", ["The largest single element", "0", "The sum of all"], 0, "Best subarray is one element."),
      Q("A divide-and-conquer solution costs?", ["O(n log n)", "O(n)", "O(n^2)"], 0, "Combining across the midpoint each level.")
    ]
  },
  "problem_0022": {
    description: "Given an integer array, find the contiguous subarray with the largest product and return that product.",
    example: { input: "nums = [2,3,-2,4]", output: "6", why: "[2,3] gives the largest product, 6" },
    quizzes: [
      Q("What extra value must you track vs. max subarray SUM?", ["The running minimum product too", "Nothing", "A prefix array"], 0, "A negative times the current min can become the new max."),
      Q("Time complexity?", ["O(n)", "O(n^2)", "O(n log n)"], 0, "A single pass tracking max and min."),
      Q("On a negative number you?", ["Swap the running max and min", "Reset to 1", "Stop"], 0, "Negatives flip which bound is largest."),
      Q("Space complexity?", ["O(1)", "O(n)", "O(log n)"], 0, "A few running variables."),
      Q("Why track the minimum at all?", ["It can flip to the maximum after a negative", "To sort", "For prefix sums"], 0, "Two negatives make a large positive."),
      Q("A zero in the array does what?", ["Resets both running products", "Is ignored", "Causes an error"], 0, "Start fresh after a zero."),
      Q("The answer is the max of?", ["All running max values", "The last cur", "The sum"], 0, "Track the best product seen.")
    ]
  },
  "problem_0023": {
    description: "Given a circular integer array, find the maximum possible sum of a non-empty contiguous subarray (the subarray may wrap around the ends).",
    example: { input: "nums = [5,-3,5]", output: "10", why: "Wrapping: 5 + 5 = 10" },
    quizzes: [
      Q("Key insight for the wrapping case?", ["total - minSubarray gives the wrapped max", "Just run Kadane once", "Sort first"], 0, "The best wrap excludes the minimum middle subarray."),
      Q("The answer is the max of?", ["normal Kadane max and (total - Kadane min)", "only Kadane max", "total"], 0, "Compare non-wrapping and wrapping cases."),
      Q("Special case to guard against?", ["All elements negative", "All zero", "Sorted input"], 0, "Then total - min would be empty; use the plain max."),
      Q("Time complexity?", ["O(n)", "O(n^2)", "O(n log n)"], 0, "A couple of linear Kadane passes."),
      Q("Space complexity?", ["O(1)", "O(n)", "O(log n)"], 0, "Running sums only."),
      Q("To get the wrapped max you compute?", ["Minimum subarray sum", "Maximum product", "Median"], 0, "total minus the smallest middle part."),
      Q("If all numbers are negative, the wrapped formula gives?", ["An empty subarray (invalid)", "The correct answer", "Zero"], 0, "So fall back to the normal Kadane max.")
    ]
  },
  "problem_0024": {
    description: "Given an integer array, return the maximum absolute value of the sum of any contiguous subarray (the empty subarray counts as sum 0).",
    example: { input: "nums = [1,-3,2,3,-4]", output: "5", why: "[2,3] sums to 5; its absolute value is largest" },
    quizzes: [
      Q("The answer equals?", ["max subarray sum and |min subarray sum|, whichever is larger", "only the max sum", "the total"], 0, "The largest magnitude is either the most positive or most negative sum."),
      Q("Which algorithm is run (twice)?", ["Kadane for max and for min", "Dijkstra", "Merge sort"], 0, "One pass for the maximum, one for the minimum."),
      Q("Time complexity?", ["O(n)", "O(n^2)", "O(n log n)"], 0, "Two linear passes."),
      Q("Space complexity?", ["O(1)", "O(n)", "O(log n)"], 0, "Running variables only."),
      Q("A prefix-sum view: the answer is?", ["max(prefix) - min(prefix)", "sum of prefixes", "max(prefix)"], 0, "Largest spread between any two prefix sums."),
      Q("The empty subarray contributes a candidate of?", ["0", "nums[0]", "the total"], 0, "Absolute sum of nothing is 0."),
      Q("Why consider the minimum subarray sum?", ["Its absolute value may exceed the max sum", "To sort", "For memory"], 0, "A very negative sum has large magnitude.")
    ]
  },

  // ---------------- Strings: Two-Pointer (Palindrome) ----------------
  "problem_0026": {
    description: "Reverse the given character array in place, using O(1) extra memory.",
    example: { input: "s = ['h','e','l','l','o']", output: "['o','l','l','e','h']", why: "Characters swapped from both ends inward" },
    quizzes: [
      Q("Which pattern reverses a char array in place?", ["Two-pointer swap from both ends", "Sorting", "Recursion with a new array"], 0, "Swap s[l] and s[r], moving inward."),
      Q("Time complexity?", ["O(n)", "O(n log n)", "O(n^2)"], 0, "Each character is touched once."),
      Q("Extra space for the in-place method?", ["O(1)", "O(n)", "O(log n)"], 0, "Only indices and a temp swap."),
      Q("The loop runs while?", ["l < r", "l < n", "r > 0"], 0, "Stop when the pointers meet."),
      Q("What does 'in place' mean here?", ["Modify the input array directly", "Return a new array", "Use a stack"], 0, "No extra array is allocated."),
      Q("After one swap you?", ["l++ and r--", "l++ only", "r-- only"], 0, "Both pointers move inward."),
      Q("A middle character (odd length) is?", ["Left untouched", "Swapped twice", "Removed"], 0, "It stays in place.")
    ]
  },
  "problem_0027": {
    description: "Return true if the string reads the same forwards and backwards, considering only alphanumeric characters and ignoring case.",
    example: { input: 's = "A man, a plan, a canal: Panama"', output: "true", why: "Ignoring punctuation and case, it reads the same both ways" },
    quizzes: [
      Q("Which pattern fits?", ["Two-pointer from both ends", "Sliding window", "Backtracking"], 0, "Compare ends while skipping non-alphanumerics."),
      Q("Non-alphanumeric characters are?", ["Skipped", "Counted", "Reversed"], 0, "Only letters and digits matter."),
      Q("The comparison is case-?", ["Insensitive", "Sensitive", "Locale-dependent"], 0, "Normalize case before comparing."),
      Q("Time complexity?", ["O(n)", "O(n^2)", "O(n log n)"], 0, "One inward pass."),
      Q("Space complexity (in place)?", ["O(1)", "O(n)", "O(log n)"], 0, "Just two pointers."),
      Q("On a character mismatch you?", ["Return false", "Skip it", "Restart"], 0, "It is not a palindrome."),
      Q("An empty string is?", ["A palindrome (true)", "false", "undefined"], 0, "It trivially reads the same both ways.")
    ]
  },
  "problem_0028": {
    description: "Return true if the string can be made a palindrome by deleting at most one character.",
    example: { input: 's = "abca"', output: "true", why: "Removing 'c' (or 'b') leaves a palindrome" },
    quizzes: [
      Q("On the first mismatch, what do you try?", ["Skip the left OR the right character and recheck", "Return false", "Delete both"], 0, "One deletion is allowed, so test both skips."),
      Q("Time complexity?", ["O(n)", "O(n^2)", "O(n log n)"], 0, "At most one extra linear check."),
      Q("Space complexity?", ["O(1)", "O(n)", "O(log n)"], 0, "Two-pointer, in place."),
      Q("How many deletions are permitted?", ["At most one", "Exactly one", "Unlimited"], 0, "Zero or one."),
      Q("The helper function checks?", ["Whether a range l..r is a palindrome", "The length", "The sum"], 0, "A plain palindrome check on a sub-range."),
      Q("Which pattern underlies this?", ["Two-pointer", "Prefix sum", "Heap"], 0, "Ends moving inward with a branch on mismatch."),
      Q("If there are no mismatches at all, the answer is?", ["true", "false", "depends"], 0, "It is already a palindrome.")
    ]
  },
  "problem_0029": {
    description: "Return the longest contiguous substring of s that is a palindrome.",
    example: { input: 's = "babad"', output: '"bab"', why: '"aba" is also a valid answer of the same length' },
    quizzes: [
      Q("Common O(n^2) technique?", ["Expand around each center", "Binary search", "Prefix sums"], 0, "Grow outward from every center."),
      Q("How many centers are checked?", ["2n - 1", "n", "n^2"], 0, "Odd centers and even gaps."),
      Q("Time complexity of expand-around-center?", ["O(n^2)", "O(n)", "O(n log n)"], 0, "Each of ~2n centers can expand O(n)."),
      Q("A DP solution uses how much space?", ["O(n^2)", "O(1)", "O(n)"], 0, "A boolean table over substrings."),
      Q("The optimal O(n) algorithm is?", ["Manacher's algorithm", "Kadane", "Dijkstra"], 0, "A specialized linear palindrome algorithm."),
      Q("An even-length palindrome center is?", ["Between two characters", "A single character", "The first character"], 0, "Expand from the gap (i, i+1)."),
      Q("Expansion stops when?", ["Characters differ or bounds are exceeded", "Always after one step", "Never"], 0, "A mismatch or edge ends it.")
    ]
  },
  "problem_0030": {
    description: "Count how many contiguous substrings of s are palindromes (each occurrence counts separately).",
    example: { input: 's = "aaa"', output: "6", why: '"a" x3, "aa" x2, "aaa" x1' },
    quizzes: [
      Q("Technique to count them?", ["Expand around each center, counting each palindrome", "Sort", "Two Sum"], 0, "Every successful expansion is one palindrome."),
      Q("Number of centers?", ["2n - 1", "n", "n^2"], 0, "Odd and even centers."),
      Q("Time complexity?", ["O(n^2)", "O(n)", "O(n log n)"], 0, "Expand from each center."),
      Q("Each expansion step that still matches adds?", ["One to the count", "Zero", "Two"], 0, "That range is a palindrome."),
      Q("Do single characters count as palindromes?", ["Yes", "No", "Only vowels"], 0, "Length-1 substrings are palindromes."),
      Q("Space complexity of expand-around-center?", ["O(1)", "O(n)", "O(n^2)"], 0, "Just counters and indices."),
      Q("An O(n) solution uses?", ["Manacher's algorithm", "A heap", "Backtracking"], 0, "Linear palindrome counting.")
    ]
  },

  // ---------------- Strings: Sliding Window ----------------
  "problem_0031": {
    description: "Given strings s and p, return the start indices of every substring of s that is an anagram of p.",
    example: { input: 's = "cbaebabacd", p = "abc"', output: "[0, 6]", why: '"cba" at index 0 and "bac" at index 6 are anagrams of "abc"' },
    quizzes: [
      Q("Window type?", ["Fixed size equal to p.length", "Variable", "None"], 0, "An anagram has the same length as p."),
      Q("How is a match detected?", ["Window frequency equals p's frequency", "Sorting each window", "Hashing the whole string"], 0, "Compare character counts."),
      Q("Time complexity?", ["O(n)", "O(n*m)", "O(n log n)"], 0, "Slide the window, updating counts incrementally."),
      Q("Frequency space for lowercase letters?", ["O(1) (26)", "O(n)", "O(n^2)"], 0, "Fixed 26-size arrays."),
      Q("When the window grows past p.length you?", ["Remove the leftmost character", "Reset", "Stop"], 0, "Keep the window exactly p.length wide."),
      Q("Does character order within an anagram matter?", ["No", "Yes", "Only the first character"], 0, "Anagrams ignore order."),
      Q("Which pattern is this?", ["Fixed sliding window", "Two-pointer on sorted", "Kadane"], 0, "A constant-width window over s.")
    ]
  },
  "problem_0032": {
    description: "Return the length of the longest substring of s that contains no repeated characters.",
    example: { input: 's = "abcabcbb"', output: "3", why: '"abc" is the longest substring without a repeat' },
    quizzes: [
      Q("Pattern?", ["Variable sliding window", "Fixed window", "Prefix sum"], 0, "Grow right, shrink on a repeat."),
      Q("What do you store to jump the left pointer?", ["Last-seen index of each character", "The sum", "A stack"], 0, "Move left past the previous occurrence."),
      Q("Time complexity?", ["O(n)", "O(n^2)", "O(n log n)"], 0, "Each index is visited at most twice."),
      Q("Space complexity?", ["O(min(n, charset))", "O(n^2)", "Always O(1)"], 0, "A map of seen characters."),
      Q("When a repeat enters the window you?", ["Shrink from the left until it's unique", "Reset to empty", "Stop"], 0, "Remove characters until no duplicate."),
      Q("The answer tracks?", ["Max window length", "Number of distinct characters", "Sum"], 0, "The longest valid window."),
      Q("For an all-unique string, the answer is?", ["Its length", "1", "0"], 0, "The whole string qualifies.")
    ]
  },
  "problem_0034": {
    description: "Return the length of the longest substring that contains exactly k distinct characters, or -1 if no such substring exists.",
    example: { input: 's = "aabacbebebe", k = 3', output: "7", why: '"cbebebe" has exactly 3 distinct characters' },
    quizzes: [
      Q("Pattern?", ["Sliding window + frequency map", "Two-pointer on sorted", "Heap"], 0, "Track the distinct count in a window."),
      Q("The window is shrunk when?", ["Distinct count exceeds k", "Length exceeds k", "Sum exceeds k"], 0, "More than k distinct is invalid."),
      Q("Time complexity?", ["O(n)", "O(n*k)", "O(n^2)"], 0, "Each character enters and leaves once."),
      Q("Space complexity?", ["O(k)", "O(1)", "O(n^2)"], 0, "A map of up to k+1 characters."),
      Q("You record the answer when?", ["Distinct count equals exactly k", "Always", "The window is empty"], 0, "Only exactly-k windows count."),
      Q("If no window ever has k distinct, return?", ["-1", "0", "k"], 0, "Convention for impossible."),
      Q("Which count tells you to move left?", ["Number of map keys with count > 0", "The sum", "The length"], 0, "That is the distinct-character count.")
    ]
  },
  "problem_0035": {
    description: "Return true if s2 contains a permutation of s1 as a contiguous substring.",
    example: { input: 's1 = "ab", s2 = "eidbaooo"', output: "true", why: '"ba" is a permutation of "ab"' },
    quizzes: [
      Q("Window type?", ["Fixed size equal to s1.length", "Variable", "None"], 0, "A permutation has s1's length."),
      Q("Match condition?", ["Window frequency equals s1's frequency", "Sorted equality each step", "Hash match"], 0, "Compare character counts."),
      Q("Time complexity?", ["O(n)", "O(n*m)", "O(n log n)"], 0, "Incremental window updates."),
      Q("Frequency space (lowercase)?", ["O(1) (26)", "O(n)", "O(n^2)"], 0, "Fixed-size arrays."),
      Q("Does character order matter for a permutation?", ["No", "Yes", "Only the first character"], 0, "Permutations ignore order."),
      Q("When the window exceeds s1.length you?", ["Drop the leftmost character", "Reset", "Stop"], 0, "Keep the width fixed."),
      Q("Which pattern?", ["Fixed sliding window", "Backtracking", "Prefix sum"], 0, "A constant-width window over s2.")
    ]
  },
  "problem_0033": {
    description: "Return the shortest substring of s that contains all characters of t (including duplicates), or an empty string if none exists.",
    example: { input: 's = "ADOBECODEBANC", t = "ABC"', output: '"BANC"', why: "Smallest window containing A, B, and C" },
    quizzes: [
      Q("Pattern?", ["Variable sliding window with need/have counts", "Fixed window", "Sorting"], 0, "Expand to satisfy, shrink to minimize."),
      Q("You expand the window until?", ["All required characters are covered", "It reaches length t", "The end"], 0, "Then try to shrink."),
      Q("Then you shrink from the left while?", ["The window still covers t", "It is non-empty", "Always"], 0, "Minimize length while valid."),
      Q("Time complexity?", ["O(n + m)", "O(n*m)", "O(n^2)"], 0, "Each pointer moves forward once."),
      Q("Space complexity?", ["O(charset)", "O(n^2)", "Always O(1)"], 0, "Frequency maps for t and the window."),
      Q("A 'formed' counter tracks?", ["How many required characters are fully satisfied", "Window length", "The sum"], 0, "When formed == required, the window is valid."),
      Q("If no valid window exists, return?", ['""', "null", "-1"], 0, "An empty string by convention.")
    ]
  },
  "problem_0036": {
    description: "Given s and an array words of equal-length strings, return all starting indices where a concatenation of every word (each used exactly once, in any order) begins.",
    example: { input: 's = "barfoothefoobarman", words = ["foo","bar"]', output: "[0, 9]", why: '"barfoo" at 0 and "foobar" at 9 use both words once' },
    quizzes: [
      Q("Each candidate substring has length?", ["words.length * wordLength", "wordLength", "s.length"], 0, "All words concatenated."),
      Q("What do you compare against?", ["A frequency map of the words", "A sorted list", "A single hash"], 0, "Each word must appear the right number of times."),
      Q("The window advances in steps of?", ["One word length", "One character", "The whole window"], 0, "Equal word lengths enable this."),
      Q("Time complexity (sliding variant)?", ["O(n * wordLength)", "O(n^2)", "O(n log n)"], 0, "Each of wordLength offsets scans s once."),
      Q("Space complexity?", ["O(words * wordLength)", "O(1)", "O(n^2)"], 0, "The word frequency and window maps."),
      Q("Can words repeat in the array?", ["Yes, counts must match", "No", "Only distinct"], 0, "Use a multiset / frequency map."),
      Q("Which pattern underlies it?", ["Sliding window over fixed-length tokens", "Backtracking", "Kadane"], 0, "A windowed frequency match on word tokens.")
    ]
  },

  // ================= Binary Search: Classic =================
  "problem_0038": {
    description: "Given a sorted array and a target, return the index of the target, or -1 if it is not present.",
    example: { input: "nums = [-1,0,3,5,9,12], target = 9", output: "4", why: "nums[4] == 9" },
    quizzes: [
      Q("Time complexity?", ["O(log n)", "O(n)", "O(n log n)"], 0, "Each step halves the range."),
      Q("Required precondition?", ["The array is sorted", "No duplicates", "Small size"], 0, "Binary search needs order."),
      Q("Why mid = lo + (hi - lo) / 2?", ["Avoids integer overflow", "It's faster", "Syntax"], 0, "lo + hi could overflow."),
      Q("If a[mid] < target you set?", ["lo = mid + 1", "hi = mid - 1", "return"], 0, "Target is on the right."),
      Q("Space complexity (iterative)?", ["O(1)", "O(log n)", "O(n)"], 0, "A few variables."),
      Q("If the target is absent you return?", ["-1", "0", "n"], 0, "Not-found convention."),
      Q("The loop continues while?", ["lo <= hi", "lo < n", "hi > 0"], 0, "Range is non-empty.")
    ]
  },
  "problem_0039": {
    description: "Given a non-negative integer x, return the integer part (floor) of its square root, without using a built-in sqrt.",
    example: { input: "x = 8", output: "2", why: "sqrt(8) is 2.82..., floored to 2" },
    quizzes: [
      Q("Approach?", ["Binary search on the answer in [0, x]", "Linear scan", "Sorting"], 0, "The answer space is monotonic."),
      Q("Time complexity?", ["O(log x)", "O(x)", "O(sqrt x)"], 0, "Halving the candidate range."),
      Q("The feasibility check compares?", ["mid*mid vs x", "mid vs x", "mid+1 vs x"], 0, "Is mid a valid root?"),
      Q("To avoid overflow, compare?", ["mid vs x / mid", "mid*mid*mid", "mid << 2"], 0, "Division avoids big products."),
      Q("'Floor' means?", ["Round down", "Round up", "Round to nearest"], 0, "Integer part only."),
      Q("The answer is?", ["The largest mid with mid*mid <= x", "The first mid", "x/2"], 0, "Last feasible candidate."),
      Q("Space complexity?", ["O(1)", "O(log x)", "O(x)"], 0, "Only counters.")
    ]
  },
  "problem_0040": {
    description: "Given a sorted array and a target, return the index of the target, or the index where it would be inserted to keep the array sorted.",
    example: { input: "nums = [1,3,5,6], target = 5", output: "2", why: "5 is already at index 2" },
    quizzes: [
      Q("The answer equals?", ["The lower bound of the target", "The upper bound", "n"], 0, "First index with value >= target."),
      Q("Time complexity?", ["O(log n)", "O(n)", "O(n log n)"], 0, "A halving search."),
      Q("If the target is present you return?", ["Its index", "-1", "n"], 0, "The exact position."),
      Q("If the target is absent you return?", ["The insertion point", "-1", "0 always"], 0, "Where it would go."),
      Q("Lower bound is defined as?", ["First index with a[i] >= target", "Last index <= target", "Any match"], 0, "Leftmost valid spot."),
      Q("Space complexity?", ["O(1)", "O(n)", "O(log n)"], 0, "In place."),
      Q("The array must be?", ["Sorted", "Distinct", "Even length"], 0, "Order is required.")
    ]
  },
  "problem_0041": {
    description: "A sorted array of distinct values was rotated at an unknown pivot. Given the array and a target, return the target's index, or -1.",
    example: { input: "nums = [4,5,6,7,0,1,2], target = 0", output: "4", why: "0 sits at index 4" },
    quizzes: [
      Q("Time complexity?", ["O(log n)", "O(n)", "O(n log n)"], 0, "Modified binary search."),
      Q("At each step, which half is guaranteed sorted?", ["At least one of the two halves", "Neither", "Always the left"], 0, "Compare a[lo] with a[mid]."),
      Q("How do you pick the half to search?", ["Check if the target lies in the sorted half", "Always go left", "Randomly"], 0, "Then search that half."),
      Q("This approach assumes values are?", ["Distinct", "Positive", "Even"], 0, "Duplicates complicate it."),
      Q("Space complexity?", ["O(1)", "O(n)", "O(log n)"], 0, "A few pointers."),
      Q("With duplicates it can degrade to?", ["O(n)", "O(log n)", "O(1)"], 0, "Ambiguous halves."),
      Q("The core idea is to?", ["Identify the sorted half each step", "Sort first", "Use a heap"], 0, "Then apply ordinary binary search.")
    ]
  },
  "problem_0042": {
    description: "A sorted array of distinct values was rotated at an unknown pivot. Return its minimum element.",
    example: { input: "nums = [3,4,5,1,2]", output: "1", why: "the rotation point holds the minimum" },
    quizzes: [
      Q("Time complexity?", ["O(log n)", "O(n)", "O(n log n)"], 0, "Binary search for the pivot."),
      Q("You compare a[mid] with?", ["a[hi]", "a[0]", "the target"], 0, "To locate the unsorted side."),
      Q("If a[mid] > a[hi], the minimum is?", ["In the right half", "In the left half", "At mid"], 0, "The rotation lies right."),
      Q("If a[mid] < a[hi], the minimum is?", ["In the left half including mid", "Strictly right", "At hi"], 0, "Left side (mid may be it)."),
      Q("The minimum is also?", ["The rotation point", "The median", "The first element"], 0, "Where order wraps."),
      Q("Space complexity?", ["O(1)", "O(n)", "O(log n)"], 0, "Constant."),
      Q("A non-rotated array's minimum is?", ["a[0]", "a[n-1]", "the middle"], 0, "Already sorted.")
    ]
  },
  "problem_0043": {
    description: "Return the index of any peak element — a value strictly greater than its neighbors. Treat out-of-bounds neighbors as negative infinity.",
    example: { input: "nums = [1,2,3,1]", output: "2", why: "nums[2]=3 is greater than both neighbors" },
    quizzes: [
      Q("Time complexity?", ["O(log n)", "O(n)", "O(n log n)"], 0, "Binary search toward higher ground."),
      Q("You move toward?", ["The larger neighbor", "The smaller neighbor", "The middle"], 0, "A peak must exist that way."),
      Q("If a[mid] < a[mid+1], a peak is?", ["To the right", "To the left", "At mid"], 0, "Climb the slope."),
      Q("Why is a peak guaranteed?", ["Boundaries are treated as -infinity", "The array is sorted", "n is even"], 0, "The slope must turn."),
      Q("Which peak may you return?", ["Any peak", "The global maximum only", "The leftmost"], 0, "Any valid peak."),
      Q("Space complexity?", ["O(1)", "O(n)", "O(log n)"], 0, "Constant."),
      Q("Does the array need to be fully sorted?", ["No", "Yes", "Only descending"], 0, "Binary search still applies via slopes.")
    ]
  },

  // ================= Binary Search: Lower / Upper Bound =================
  "problem_0044": {
    description: "Given a sorted array and a target, return the first and last indices of the target, or [-1, -1] if it is absent.",
    example: { input: "nums = [5,7,7,8,8,10], target = 8", output: "[3, 4]", why: "8 spans indices 3 to 4" },
    quizzes: [
      Q("This uses?", ["Lower and upper bound searches", "One linear scan", "A heap"], 0, "Two binary searches."),
      Q("Time complexity?", ["O(log n)", "O(n)", "O(n log n)"], 0, "Two halving searches."),
      Q("The first index equals?", ["The lower bound", "The upper bound", "0"], 0, "First occurrence."),
      Q("The last index equals?", ["upperBound - 1", "lowerBound + 1", "n - 1"], 0, "Just before the first greater value."),
      Q("If the target is absent?", ["Return [-1, -1]", "Return [0, 0]", "Throw"], 0, "Not-found convention."),
      Q("Space complexity?", ["O(1)", "O(n)", "O(log n)"], 0, "Constant."),
      Q("How many binary searches are run?", ["Two", "One", "Three"], 0, "First and last positions.")
    ]
  },
  "problem_0046": {
    description: "A sorted array was rotated some number of times. Return how many rotations occurred — equivalently, the index of the minimum element.",
    example: { input: "nums = [4,5,1,2,3]", output: "2", why: "the minimum (1) is at index 2" },
    quizzes: [
      Q("The number of rotations equals?", ["The index of the minimum", "n minus the max index", "The median index"], 0, "The wrap point."),
      Q("Time complexity?", ["O(log n)", "O(n)", "O(n log n)"], 0, "Find the pivot by binary search."),
      Q("You locate the rotation point by?", ["Comparing a[mid] with a[hi]", "Sorting", "Scanning linearly"], 0, "Same as find-minimum."),
      Q("A non-rotated array returns?", ["0", "n", "-1"], 0, "No rotation."),
      Q("The minimum is at?", ["The rotation index", "Index 0 always", "The end"], 0, "Order wraps there."),
      Q("Space complexity?", ["O(1)", "O(n)", "O(log n)"], 0, "Constant."),
      Q("This shares its core with?", ["Find Minimum in Rotated Array", "Two Sum", "Merge Sort"], 0, "Same pivot search.")
    ]
  },
  "problem_1001": {
    description: "Given a sorted array and a target, return how many times the target occurs.",
    example: { input: "nums = [1,2,2,2,3], target = 2", output: "3", why: "2 appears three times" },
    quizzes: [
      Q("The count equals?", ["upperBound - lowerBound", "upperBound + lowerBound", "n - lowerBound"], 0, "The span of the value."),
      Q("Time complexity?", ["O(log n)", "O(n)", "O(n log n)"], 0, "Two bound searches."),
      Q("This requires the array to be?", ["Sorted", "Distinct", "Even length"], 0, "So equal values are contiguous."),
      Q("Lower bound is?", ["First index with value >= target", "Last index <= target", "Any match"], 0, "Leftmost occurrence."),
      Q("Upper bound is?", ["First index with value > target", "First index >= target", "n"], 0, "Just past the last occurrence."),
      Q("If the target is absent?", ["Count is 0", "Count is -1", "Throw"], 0, "Bounds coincide."),
      Q("Space complexity?", ["O(1)", "O(n)", "O(log n)"], 0, "Constant.")
    ]
  },
  "problem_0048": {
    description: "Given a sorted array and a value x, return the ceiling of x — the smallest element that is >= x — or -1 if none exists.",
    example: { input: "nums = [1,2,8,10,10,12,19], x = 5", output: "8", why: "8 is the smallest value >= 5" },
    quizzes: [
      Q("The ceiling equals?", ["The lower-bound value", "The upper-bound value", "The max"], 0, "First element >= x."),
      Q("Time complexity?", ["O(log n)", "O(n)", "O(n log n)"], 0, "Binary search."),
      Q("Ceiling is the smallest element that is?", [">= x", "<= x", "== x"], 0, "At or above x."),
      Q("If no element is >= x, return?", ["-1", "0", "the max"], 0, "x exceeds all values."),
      Q("The array must be?", ["Sorted", "Distinct", "Positive"], 0, "Order is required."),
      Q("Space complexity?", ["O(1)", "O(n)", "O(log n)"], 0, "Constant."),
      Q("Ceiling relates to?", ["Lower/upper bound", "Kadane", "Prefix sum"], 0, "A bound query.")
    ]
  },
  "problem_0049": {
    description: "Given a sorted array and a value x, return the floor of x — the largest element that is <= x — or -1 if none exists.",
    example: { input: "nums = [1,2,8,10,10,12,19], x = 5", output: "2", why: "2 is the largest value <= 5" },
    quizzes: [
      Q("Floor is the largest element that is?", ["<= x", ">= x", "== x"], 0, "At or below x."),
      Q("Time complexity?", ["O(log n)", "O(n)", "O(n log n)"], 0, "Binary search."),
      Q("You record a candidate while?", ["a[mid] <= x, then search right", "a[mid] > x, search right", "always"], 0, "Keep the best so far."),
      Q("If no element is <= x, return?", ["-1", "0", "the min"], 0, "x is below all values."),
      Q("The array must be?", ["Sorted", "Distinct", "Even"], 0, "Order is required."),
      Q("Space complexity?", ["O(1)", "O(n)", "O(log n)"], 0, "Constant."),
      Q("Floor and ceiling are?", ["Complementary bound queries", "Unrelated", "The same"], 0, "Below vs above x.")
    ]
  },

  // ================= Binary Search on Answers =================
  "problem_0051": {
    description: "Koko eats bananas at a chosen speed s per hour, taking ceil(pile / s) hours for each pile. Given the piles and h hours, return the minimum integer speed that finishes all piles within h hours.",
    example: { input: "piles = [3,6,7,11], h = 8", output: "4", why: "at speed 4 the hours are 1+2+2+3 = 8" },
    quizzes: [
      Q("What do you binary search over?", ["The eating speed", "Pile indices", "Sorted piles"], 0, "The answer is a speed."),
      Q("The feasibility check is?", ["Hours needed at speed mid <= h", "mid <= h", "sum <= h"], 0, "And it is monotonic."),
      Q("The search range is?", ["[1, max pile]", "[0, h]", "[1, n]"], 0, "Speed can't exceed the largest pile."),
      Q("Overall complexity?", ["O(n log(maxPile))", "O(n^2)", "O(n)"], 0, "log(range) feasibility checks."),
      Q("Each feasibility check costs?", ["O(n)", "O(1)", "O(log n)"], 0, "Sum hours over all piles."),
      Q("To minimize, on feasible(mid) you?", ["Move hi = mid", "Move lo = mid + 1", "Return"], 0, "Try a slower speed."),
      Q("A lower speed means?", ["More hours needed", "Fewer hours", "No change"], 0, "Inversely related.")
    ]
  },
  "problem_0052": {
    description: "Packages must ship in their given order within D days; each day's total load cannot exceed the ship's capacity. Return the minimum capacity that ships everything within D days.",
    example: { input: "weights = [1,2,3,4,5,6,7,8,9,10], D = 5", output: "15", why: "capacity 15 splits the load across 5 days" },
    quizzes: [
      Q("Binary search over?", ["The ship capacity", "Package indices", "Days"], 0, "The answer is a capacity."),
      Q("The search range is?", ["[max weight, sum of weights]", "[0, D]", "[1, n]"], 0, "Lower bound is the heaviest package."),
      Q("The feasibility check is?", ["Days needed at capacity mid <= D", "mid <= D", "sum <= D"], 0, "Greedily fill days."),
      Q("Complexity?", ["O(n log(sum))", "O(n^2)", "O(n)"], 0, "log(range) checks, each O(n)."),
      Q("The minimum possible capacity is at least?", ["The heaviest package", "The average", "1"], 0, "It must fit any single item."),
      Q("You are minimizing?", ["The capacity", "The number of days", "The total weight"], 0, "Smallest feasible capacity."),
      Q("Feasibility is?", ["Monotonic in capacity", "Random", "Decreasing only"], 0, "Bigger capacity => fewer days.")
    ]
  },
  "problem_0053": {
    description: "A train journey has several legs of given distances and an hour limit. At integer speed s, every leg except the last takes ceil(dist/s) hours. Return the minimum speed to arrive within the limit, or -1 if impossible.",
    example: { input: "dist = [1,3,2], hour = 6", output: "1", why: "speed 1 gives 1 + 3 + 2 = 6 hours" },
    quizzes: [
      Q("Binary search over?", ["The speed", "Leg indices", "Hours"], 0, "The answer is a speed."),
      Q("Which legs round up to whole hours?", ["All legs except the last", "All legs", "None"], 0, "You wait for each train."),
      Q("Feasibility check?", ["Total time at speed mid <= hour", "mid <= hour", "sum <= hour"], 0, "Monotonic in speed."),
      Q("When is it impossible?", ["When hour <= n - 1", "When hour < 1", "Never"], 0, "Even infinite speed needs n-1 whole hours."),
      Q("Complexity?", ["O(n log(maxSpeed))", "O(n^2)", "O(n)"], 0, "log(range) checks."),
      Q("You minimize?", ["The speed", "The distance", "The legs"], 0, "Smallest feasible speed."),
      Q("Higher speed means?", ["Less total time", "More time", "No change"], 0, "Inverse relationship.")
    ]
  },
  "problem_0055": {
    description: "Place C cows into stalls at given positions on a line so that the minimum distance between any two cows is as large as possible. Return that largest minimum distance.",
    example: { input: "stalls = [1,2,4,8,9], C = 3", output: "3", why: "placing cows at 1, 4, 8 gives a minimum gap of 3" },
    quizzes: [
      Q("Binary search over?", ["The minimum distance (answer)", "Stall indices", "Cow count"], 0, "Maximize the min gap."),
      Q("feasible(d) checks?", ["Whether all cows can be placed at least d apart", "d <= C", "sum <= d"], 0, "Greedy placement."),
      Q("First you must?", ["Sort the stalls", "Reverse them", "Hash them"], 0, "Greedy needs order."),
      Q("This is a maximize problem, so on feasible you?", ["Move lo = mid + 1 and record mid", "Move hi = mid", "Return"], 0, "Try a larger gap."),
      Q("The search range is?", ["[1, maxPos - minPos]", "[0, C]", "[1, n]"], 0, "Possible distances."),
      Q("Complexity (after sorting)?", ["O(n log(range))", "O(n^2)", "O(n)"], 0, "Each check is O(n)."),
      Q("Feasibility is monotonic because?", ["Larger d is harder to satisfy", "It is random", "d has no effect"], 0, "Fewer placements fit.")
    ]
  },
  "problem_0056": {
    description: "Each flower blooms on a given day. You need m bouquets, each made of k adjacent bloomed flowers. Return the minimum number of days to wait, or -1 if it is impossible.",
    example: { input: "bloomDay = [1,10,3,10,2], m = 3, k = 1", output: "3", why: "by day 3, flowers blooming on days 1, 3, 2 give 3 single-flower bouquets" },
    quizzes: [
      Q("Binary search over?", ["The day (answer)", "Flower indices", "Bouquet count"], 0, "Minimum feasible day."),
      Q("feasible(day) checks?", ["Enough adjacent bloomed runs for m bouquets", "day <= m", "sum <= day"], 0, "Scan the bloomed flowers."),
      Q("It is impossible when?", ["m * k > n", "m > k", "Never"], 0, "Not enough flowers exist."),
      Q("You are minimizing?", ["The number of days", "Bouquets", "Flowers"], 0, "Earliest feasible day."),
      Q("The search range is?", ["[min bloomDay, max bloomDay]", "[1, m]", "[0, k]"], 0, "Possible wait times."),
      Q("Complexity?", ["O(n log(maxDay))", "O(n^2)", "O(n)"], 0, "log(range) O(n) checks."),
      Q("Feasibility is monotonic because?", ["More days => more flowers bloomed", "Fewer days help", "No effect"], 0, "Waiting only adds blooms.")
    ]
  },
  "problem_0057": {
    description: "Place a number of balls into baskets at given positions so the minimum distance (force) between any two balls is maximized. Return that maximum possible minimum force.",
    example: { input: "positions = [1,2,3,4,7], balls = 3", output: "3", why: "placing balls at 1, 4, 7 gives a minimum gap of 3" },
    quizzes: [
      Q("This is essentially?", ["Aggressive Cows (maximize the min distance)", "Two Sum", "Merge Sort"], 0, "Same binary-search-on-answer idea."),
      Q("feasible(d) checks?", ["Whether all balls fit at least d apart", "d <= balls", "sum <= d"], 0, "Greedy placement."),
      Q("First you must?", ["Sort the positions", "Reverse them", "Square them"], 0, "Greedy needs order."),
      Q("You maximize?", ["The minimum gap", "The total distance", "The ball count"], 0, "Largest safe spacing."),
      Q("Search range?", ["[1, maxPos - minPos]", "[0, balls]", "[1, n]"], 0, "Possible forces."),
      Q("Complexity?", ["O(n log(range))", "O(n^2)", "O(n)"], 0, "O(n) feasibility per step."),
      Q("On feasible(mid) (maximize) you?", ["Record mid and move lo = mid + 1", "Move hi = mid", "Return"], 0, "Try for larger.")
    ]
  },
  "problem_0058": {
    description: "Allocate books (each with a page count) to students so that each student gets a contiguous block and the maximum pages any student reads is minimized. Return that minimum possible maximum.",
    example: { input: "pages = [12,34,67,90], students = 2", output: "113", why: "split [12,34,67] and [90]: max(113, 90) = 113" },
    quizzes: [
      Q("Binary search over?", ["The maximum pages value", "Book indices", "Students"], 0, "Minimize the largest load."),
      Q("feasible(limit) checks?", ["Students needed with each <= limit is <= k", "limit <= k", "sum <= limit"], 0, "Greedy allocation."),
      Q("Search range?", ["[max single book, sum of pages]", "[0, k]", "[1, n]"], 0, "Lower bound is the biggest book."),
      Q("Allocation must be?", ["Contiguous", "Any subset", "Sorted"], 0, "Blocks in order."),
      Q("Complexity?", ["O(n log(sum))", "O(n^2)", "O(n)"], 0, "log(range) O(n) checks."),
      Q("You minimize?", ["The maximum pages per student", "The number of books", "The students"], 0, "Smallest feasible maximum."),
      Q("This is the same family as?", ["Split Array Largest Sum", "Two Sum", "LRU Cache"], 0, "Identical structure.")
    ]
  },
  "problem_0050": {
    description: "Split an array into k contiguous subarrays to minimize the largest subarray sum. Return that minimized largest sum.",
    example: { input: "nums = [7,2,5,10,8], k = 2", output: "18", why: "split [7,2,5] and [10,8]: max(14, 18) = 18" },
    quizzes: [
      Q("Binary search over?", ["The largest-sum value", "Array indices", "k"], 0, "Minimize the maximum subarray sum."),
      Q("feasible(limit) checks?", ["Subarrays needed with sum <= limit is <= k", "limit <= k", "sum <= limit"], 0, "Greedy counting."),
      Q("Search range?", ["[max element, total sum]", "[0, k]", "[1, n]"], 0, "Lower bound is the largest element."),
      Q("This is identical to?", ["Allocate Minimum Pages", "Two Sum", "Merge K Lists"], 0, "Same pattern."),
      Q("Complexity?", ["O(n log(sum))", "O(n^2)", "O(n)"], 0, "log(range) O(n) checks."),
      Q("You minimize?", ["The maximum subarray sum", "The number of splits", "The total"], 0, "Smallest feasible maximum."),
      Q("The feasibility check greedily?", ["Counts subarrays under the limit", "Sorts the array", "Uses a heap"], 0, "Fill until exceeding limit, then cut.")
    ]
  },

  // ================= Search in 2D Matrix =================
  "problem_0059": {
    description: "Given an m x n matrix where each row is sorted and each row's first value is greater than the previous row's last value, determine whether a target exists.",
    example: { input: "matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3", output: "true", why: "3 appears in the first row" },
    quizzes: [
      Q("Because the matrix is fully sorted, you can?", ["Binary search it as one flat array", "Only scan rows", "Sort it"], 0, "Treat it as length m*n."),
      Q("Complexity?", ["O(log(m*n))", "O(m*n)", "O(m+n)"], 0, "A single binary search."),
      Q("Index mapping for a virtual index idx?", ["row = idx / n, col = idx % n", "row = idx % n", "row = idx * n"], 0, "n = number of columns."),
      Q("Space complexity?", ["O(1)", "O(m*n)", "O(m+n)"], 0, "Only indices."),
      Q("This relies on which property?", ["Each row starts above the previous row's end", "Columns sorted only", "Square matrix"], 0, "Makes it globally sorted."),
      Q("If the value at mid < target you?", ["Move to a higher index", "Move lower", "Stop"], 0, "Right half."),
      Q("The approach treats the matrix as?", ["A 1D sorted array", "A graph", "A heap"], 0, "Flattened view.")
    ]
  },
  "problem_0060": {
    description: "Given a matrix where each row and each column is sorted in ascending order, determine whether a target exists.",
    example: { input: "matrix = [[1,4,7,11],[2,5,8,12],[3,6,9,16]], target = 5", output: "true", why: "5 is at row 1, column 1" },
    quizzes: [
      Q("Optimal approach?", ["Staircase search from a corner", "Flat binary search", "Sorting"], 0, "Row/column order, not fully sorted."),
      Q("Complexity?", ["O(m + n)", "O(log(mn))", "O(mn)"], 0, "Each step drops a row or column."),
      Q("Why can't you flat-binary-search it?", ["It isn't globally sorted", "It is too big", "It has duplicates"], 0, "Only rows/columns are sorted."),
      Q("Starting at the top-right, if value > target you?", ["Move left", "Move down", "Stop"], 0, "Smaller values are left."),
      Q("If value < target you?", ["Move down", "Move left", "Move up"], 0, "Larger values are below."),
      Q("Space complexity?", ["O(1)", "O(mn)", "O(m+n)"], 0, "Two indices."),
      Q("Each comparison eliminates?", ["A whole row or column", "One cell", "Nothing"], 0, "That's why it's O(m+n).")
    ]
  },
  "problem_0061": {
    description: "Given an n x n matrix with rows and columns sorted in ascending order, return the k-th smallest element in the whole matrix.",
    example: { input: "matrix = [[1,5,9],[10,11,13],[12,13,15]], k = 8", output: "13", why: "the 8th smallest value overall is 13" },
    quizzes: [
      Q("Efficient approach?", ["Binary search on the value range", "Sort all n*n values", "A stack"], 0, "Search values, not indices."),
      Q("For a candidate mid, you count?", ["Elements <= mid in O(n)", "Elements == mid", "Rows"], 0, "Using the sorted structure."),
      Q("You adjust the range based on?", ["Whether the count is < k or >= k", "The median", "The sum"], 0, "Shrink toward the kth value."),
      Q("Complexity?", ["O(n log(range))", "O(n^2 log n)", "O(1)"], 0, "log(value range) counting passes."),
      Q("A heap-based alternative costs?", ["O(k log n)", "O(n)", "O(1)"], 0, "Pop k times from a min-heap."),
      Q("The answer is?", ["A value in the matrix", "An index", "A row"], 0, "The kth smallest value."),
      Q("The count step walks?", ["A staircase from a corner", "Every cell", "Only the diagonal"], 0, "O(n) counting of <= mid.")
    ]
  },
  "problem_0063": {
    description: "Given a row-wise sorted matrix with an odd total number of elements, return the median — the middle value when all elements are sorted.",
    example: { input: "matrix = [[1,3,5],[2,6,9],[3,6,9]]", output: "5", why: "the middle of all nine sorted values is 5" },
    quizzes: [
      Q("Approach?", ["Binary search on the value range", "Fully sort all elements", "A heap of size n"], 0, "Count-based value search."),
      Q("For a candidate, you count elements <= it using?", ["A per-row upper bound (binary search)", "A linear scan of all cells", "Sorting"], 0, "Rows are sorted."),
      Q("The median is the value with count?", [">= (m*n + 1) / 2", "== m", "== n"], 0, "At least half the elements below it."),
      Q("Complexity?", ["About O(m log n * log(range))", "O((mn)^2)", "O(1)"], 0, "Counting passes over the range."),
      Q("Do you materialize the full sorted list?", ["No", "Yes", "Only half"], 0, "Counting avoids it."),
      Q("Rows being sorted lets you?", ["Binary search within each row", "Skip rows", "Sort columns"], 0, "Fast per-row counts."),
      Q("The answer is?", ["The smallest value whose count reaches half", "The mean", "The max"], 0, "The median value.")
    ]
  },

  // ================= HashMap =================
  "problem_0130": {
    description: "Return the element that appears more than ⌊n/2⌋ times in the array. A majority element is guaranteed to exist.",
    example: { input: "nums = [2,2,1,1,1,2,2]", output: "2", why: "2 appears 4 times out of 7" },
    quizzes: [
      Q("Boyer-Moore voting uses how much space?", ["O(1)", "O(n)", "O(log n)"], 0, "A single candidate and counter."),
      Q("Time complexity?", ["O(n)", "O(n log n)", "O(n^2)"], 0, "One pass."),
      Q("A majority element appears?", ["More than n/2 times", "Exactly n/2 times", "At least twice"], 0, "Strict majority."),
      Q("In voting, the counter resets when?", ["It reaches 0", "On every element", "Never"], 0, "Then a new candidate is chosen."),
      Q("A hash-map count approach costs?", ["O(n) time, O(n) space", "O(1) space", "O(n^2)"], 0, "Store each frequency."),
      Q("Sorting also finds it by taking?", ["The middle element", "The first", "The max"], 0, "Majority occupies the center."),
      Q("Is a majority guaranteed here?", ["Yes", "No", "Only if sorted"], 0, "The problem states so.")
    ]
  },
  "problem_0131": {
    description: "Return the k most frequent elements in the array, in any order.",
    example: { input: "nums = [1,1,1,2,2,3], k = 2", output: "[1, 2]", why: "1 (x3) and 2 (x2) are most frequent" },
    quizzes: [
      Q("First step?", ["Count frequencies with a hash map", "Sort the array", "Use a stack"], 0, "Tally occurrences."),
      Q("A size-k heap gives?", ["O(n log k)", "O(n^2)", "O(1)"], 0, "Keep the k most frequent."),
      Q("Bucket sort by frequency gives?", ["O(n)", "O(n log n)", "O(n^2)"], 0, "Index buckets by count."),
      Q("Buckets are indexed by?", ["Frequency (count)", "Value", "Insertion order"], 0, "Count buckets."),
      Q("Space complexity?", ["O(n)", "O(1)", "O(k)"], 0, "The frequency map."),
      Q("Quickselect on frequencies is?", ["Average O(n)", "Always O(n log n)", "O(n^2)"], 0, "Partition by count."),
      Q("The answer contains?", ["Exactly k elements", "All elements", "One element"], 0, "The top k.")
    ]
  },
  "problem_0132": {
    description: "Rearrange the characters of a string so they appear in order of decreasing frequency.",
    example: { input: 's = "tree"', output: '"eert"', why: "e appears twice, then r and t once ('eetr' is also valid)" },
    quizzes: [
      Q("First step?", ["Count character frequencies", "Sort characters", "Reverse the string"], 0, "A frequency map."),
      Q("Then order characters by?", ["Descending frequency", "Alphabetical", "Length"], 0, "Most frequent first."),
      Q("Bucket sort by frequency is?", ["O(n)", "O(n log n)", "O(n^2)"], 0, "Buckets indexed by count."),
      Q("Sorting unique characters by count is?", ["O(k log k)", "O(n^2)", "O(1)"], 0, "k distinct characters."),
      Q("Space complexity?", ["O(n)", "O(1)", "O(log n)"], 0, "The counts."),
      Q("Ties between equal counts?", ["Can be in any order", "Must be alphabetical", "Are invalid"], 0, "Order among equals is free."),
      Q("The string is rebuilt from?", ["The counts (repeat each char)", "The original order", "A stack"], 0, "Emit each char count times.")
    ]
  },
  "problem_0133": {
    description: "Given task labels and a cooldown n, identical tasks must be at least n intervals apart (idle slots allowed). Return the minimum number of intervals to finish all tasks.",
    example: { input: 'tasks = ["A","A","A","B","B","B"], n = 2', output: "8", why: "A B idle A B idle A B = 8 intervals" },
    quizzes: [
      Q("Approach?", ["Frequency-based greedy", "Sorting the tasks", "A stack"], 0, "The busiest task sets the frame."),
      Q("What dominates the schedule?", ["The most frequent task", "The least frequent", "Idle time only"], 0, "It needs the most spacing."),
      Q("A common formula is?", ["max(len, (maxFreq-1)*(n+1) + countOfMax)", "len * n", "maxFreq * n"], 0, "Frame plus the final group."),
      Q("Idle slots are used to?", ["Fill gaps between identical tasks", "Add tasks", "Sort"], 0, "Respect the cooldown."),
      Q("You must count?", ["The max frequency and how many share it", "Only the length", "The alphabet"], 0, "Both feed the formula."),
      Q("Time complexity?", ["O(n)", "O(n^2)", "O(n log n)"], 0, "Count then compute."),
      Q("The cooldown forces?", ["Spacing between identical tasks", "Sorting", "Extra tasks"], 0, "At least n apart.")
    ]
  },
  "problem_0137": {
    description: "Count the number of contiguous subarrays whose sum equals k. Values may be negative.",
    example: { input: "nums = [1,1,1], k = 2", output: "2", why: "[1,1] occurs twice" },
    quizzes: [
      Q("Optimal approach?", ["Prefix sums + a hash map of counts", "Sliding window", "Sorting"], 0, "Windows fail with negatives."),
      Q("For prefix P, a subarray sums to k when?", ["A previous prefix equals P - k", "P equals k", "P is even"], 0, "Difference equals k."),
      Q("Why not a sliding window?", ["Negative numbers break monotonicity", "k is large", "It is sorted"], 0, "Sums aren't monotonic."),
      Q("Time complexity?", ["O(n)", "O(n^2)", "O(n log n)"], 0, "One pass."),
      Q("Space complexity?", ["O(n)", "O(1)", "O(k)"], 0, "The prefix-count map."),
      Q("Initialize the map with?", ["{0: 1}", "empty", "{k: 1}"], 0, "Empty prefix has sum 0."),
      Q("The map stores?", ["Prefix sum -> count", "Index -> value", "Value -> index"], 0, "Counts of prefixes.")
    ]
  },

  // ================= Double Linked List =================
  "problem_0121": {
    description: "Implement a doubly linked list supporting insertion, deletion, and traversal, where each node links to both its previous and next node.",
    example: { input: "insert 1, 2, 3 at tail, then traverse", output: "1 <-> 2 <-> 3", why: "each node links both ways" },
    quizzes: [
      Q("Each DLL node stores?", ["prev and next pointers", "only next", "a value only"], 0, "Links in both directions."),
      Q("Traversal is possible?", ["In both directions", "Forward only", "Backward only"], 0, "Thanks to prev links."),
      Q("Insert/delete at a known node is?", ["O(1)", "O(n)", "O(log n)"], 0, "Relink neighbours."),
      Q("Sentinel head/tail nodes?", ["Simplify edge cases", "Sort the list", "Save memory"], 0, "Avoid null checks."),
      Q("Access by index is?", ["O(n)", "O(1)", "O(log n)"], 0, "Walk from an end."),
      Q("Space complexity?", ["O(n)", "O(1)", "O(log n)"], 0, "One node per element."),
      Q("Deleting a node requires?", ["Relinking its neighbours", "The whole list", "Sorting"], 0, "prev.next and next.prev.")
    ]
  },
  "problem_0122": {
    description: "Insert a new node at a given position in a doubly linked list, correctly fixing the prev and next pointers of the neighbours.",
    example: { input: "list 1 <-> 3, insert 2 after 1", output: "1 <-> 2 <-> 3", why: "pointers updated on both sides" },
    quizzes: [
      Q("How many pointer links change on an insert?", ["Four (two per neighbour)", "One", "Two always"], 0, "Both directions on both sides."),
      Q("Inserting at a known position is?", ["O(1)", "O(n)", "O(log n)"], 0, "Direct relinking."),
      Q("You must set?", ["Both prev and next", "Only next", "Only prev"], 0, "Keep both directions valid."),
      Q("Finding the position is?", ["O(n)", "O(1)", "O(log n)"], 0, "Traverse to it."),
      Q("A dummy head helps with?", ["Head insertions", "Sorting", "Memory"], 0, "No special head case."),
      Q("Extra space per insert?", ["O(1)", "O(n)", "O(log n)"], 0, "One node."),
      Q("Relative order is?", ["Preserved", "Reversed", "Randomized"], 0, "Only the new node is added.")
    ]
  },
  "problem_0123": {
    description: "Delete a given node from a doubly linked list by relinking its previous and next neighbours.",
    example: { input: "list 1 <-> 2 <-> 3, delete 2", output: "1 <-> 3", why: "neighbours relinked directly" },
    quizzes: [
      Q("With the node reference, deletion is?", ["O(1)", "O(n)", "O(log n)"], 0, "Relink neighbours directly."),
      Q("You update?", ["node.prev.next and node.next.prev", "only next", "only prev"], 0, "Both directions."),
      Q("Head/tail deletions need?", ["Edge-case handling (or sentinels)", "Sorting", "A heap"], 0, "Null neighbours."),
      Q("Compared to a singly list, you?", ["Don't need to find the previous node", "Need the whole list", "Must sort"], 0, "prev is already stored."),
      Q("Sentinel nodes help by?", ["Avoiding null checks", "Sorting", "Saving memory"], 0, "Every node has neighbours."),
      Q("Space complexity?", ["O(1)", "O(n)", "O(log n)"], 0, "Pointer updates only."),
      Q("The deleted node is?", ["Unlinked from both sides", "Kept", "Moved to the tail"], 0, "Fully removed.")
    ]
  },
  "problem_0124": {
    description: "Reverse a doubly linked list in place by swapping each node's prev and next pointers.",
    example: { input: "1 <-> 2 <-> 3", output: "3 <-> 2 <-> 1", why: "prev and next swapped per node" },
    quizzes: [
      Q("The core operation is?", ["Swap prev and next for each node", "Sort nodes", "Copy to an array"], 0, "Flip both links."),
      Q("Time complexity?", ["O(n)", "O(n^2)", "O(log n)"], 0, "One pass."),
      Q("Space complexity?", ["O(1)", "O(n)", "O(log n)"], 0, "In place."),
      Q("The old head becomes?", ["The new tail", "The new head", "The middle"], 0, "Ends swap roles."),
      Q("How many passes are needed?", ["One", "Two", "n"], 0, "Swap as you walk."),
      Q("Both link directions are?", ["Updated", "Ignored", "Deleted"], 0, "prev and next both flip."),
      Q("You return?", ["The new head (old tail)", "The old head", "null"], 0, "The reversed list's head.")
    ]
  },
  "problem_0125": {
    description: "Design a cache with a fixed capacity supporting get and put in O(1), evicting the least recently used entry when full.",
    example: { input: "capacity 2; put(1,1); put(2,2); get(1); put(3,3)", output: "key 2 is evicted", why: "2 was least recently used" },
    quizzes: [
      Q("An LRU cache combines?", ["A DLL and a hash map", "A heap and an array", "Two stacks"], 0, "Order + O(1) lookup."),
      Q("get and put run in?", ["O(1)", "O(n)", "O(log n)"], 0, "Hash lookup plus O(1) moves."),
      Q("Eviction removes?", ["The least recently used (tail)", "The newest", "The middle"], 0, "Stalest entry."),
      Q("Accessing an entry?", ["Moves its node to the front", "Deletes it", "Sorts the list"], 0, "Marks it most recent."),
      Q("The hash map maps?", ["Key -> DLL node", "Value -> key", "Index -> node"], 0, "For O(1) access."),
      Q("Space complexity?", ["O(capacity)", "O(1)", "O(n^2)"], 0, "Up to capacity entries."),
      Q("Sentinel head/tail nodes?", ["Simplify moves/evictions", "Sort entries", "Save memory"], 0, "No null edge cases.")
    ]
  },
  "problem_0126": {
    description: "Design a cache that evicts the least frequently used entry (ties broken by least recently used), with O(1) get and put.",
    example: { input: "capacity 2; usage counts tracked per key", output: "evict least frequent, then LRU", why: "frequency decides eviction" },
    quizzes: [
      Q("LFU evicts by?", ["Least usage frequency", "Insertion order only", "Largest key"], 0, "Frequency first."),
      Q("Ties in frequency are broken by?", ["Least recently used", "Largest value", "Random"], 0, "LRU within a frequency."),
      Q("A common design uses?", ["Hash maps plus per-frequency DLLs", "A single array", "A BST only"], 0, "Buckets by frequency."),
      Q("Target complexity for get/put?", ["O(1)", "O(n)", "O(log n)"], 0, "With a min-frequency pointer."),
      Q("A min-frequency pointer helps?", ["Find the eviction bucket fast", "Sort keys", "Save memory"], 0, "O(1) eviction."),
      Q("Space complexity?", ["O(capacity)", "O(1)", "O(n^2)"], 0, "Bounded by capacity."),
      Q("Compared to LRU, LFU is?", ["Harder (tracks frequencies too)", "Easier", "Identical"], 0, "Extra bucketing.")
    ]
  },
  "problem_0127": {
    description: "Merge two sorted doubly linked lists into one sorted doubly linked list, maintaining both prev and next pointers.",
    example: { input: "1 <-> 3 and 2 <-> 4", output: "1 <-> 2 <-> 3 <-> 4", why: "merged in sorted order" },
    quizzes: [
      Q("Compared with merging singly lists, you also?", ["Fix prev pointers", "Use a heap", "Sort first"], 0, "Keep both directions valid."),
      Q("Time complexity?", ["O(n + m)", "O(nm)", "O(n log m)"], 0, "One pass over both."),
      Q("Extra space?", ["O(1)", "O(n)", "O(log n)"], 0, "Relink in place."),
      Q("Each step attaches?", ["The smaller current head", "The larger head", "A random node"], 0, "Stable sorted merge."),
      Q("prev pointers are?", ["Repaired on each link", "Ignored", "Deleted"], 0, "Both directions consistent."),
      Q("A dummy node?", ["Simplifies building the result", "Sorts", "Saves memory"], 0, "Placeholder start."),
      Q("Both input lists must be?", ["Sorted", "Equal length", "Distinct"], 0, "Merging assumes order.")
    ]
  },
  "problem_0128": {
    description: "A doubly linked list where nodes may have a child list. Flatten it into a single-level list in depth-first order, fixing prev and next pointers.",
    example: { input: "1 <-> 2(child: 3 <-> 4) <-> 5", output: "1 <-> 2 <-> 3 <-> 4 <-> 5", why: "the child list is spliced in after its parent" },
    quizzes: [
      Q("Flattening order is?", ["Depth-first", "Breadth-first", "Reverse"], 0, "Dive into children first."),
      Q("Time complexity?", ["O(n)", "O(n^2)", "O(n log n)"], 0, "Each node visited once."),
      Q("An iterative version often uses?", ["A stack for next pointers", "A heap", "A queue"], 0, "Push next while diving into a child."),
      Q("At each splice you repair?", ["prev pointers at the join points", "Nothing", "The whole list"], 0, "Keep both directions valid."),
      Q("After flattening, child pointers are?", ["Cleared (set to null)", "Kept", "Reversed"], 0, "Single level only."),
      Q("Space complexity?", ["O(depth) or O(1) iterative", "O(n^2)", "Always O(n)"], 0, "Depends on approach."),
      Q("The resulting list is?", ["Single-level", "Still multilevel", "A tree"], 0, "Fully flattened.")
    ]
  },
  "problem_0129": {
    description: "Convert a sorted doubly linked list (treated as in-order) into a height-balanced binary tree, reusing prev/next as child links.",
    example: { input: "sorted DLL 1 <-> 2 <-> 3", output: "balanced BST rooted at 2", why: "the middle node becomes the root recursively" },
    quizzes: [
      Q("For balance, which node becomes the root?", ["The middle node", "The head", "The tail"], 0, "Then recurse on halves."),
      Q("You recurse on?", ["The left and right halves", "Only the right", "The whole list"], 0, "Divide and conquer."),
      Q("Time complexity?", ["O(n)", "O(n^2)", "O(n log n)"], 0, "Each node placed once."),
      Q("The in-order sequence corresponds to?", ["A sorted order", "Reverse order", "Level order"], 0, "DLL order is in-order."),
      Q("prev/next are reused as?", ["Child links", "Sibling links", "Nothing"], 0, "Left/right pointers."),
      Q("A balanced tree has height?", ["O(log n)", "O(n)", "O(sqrt n)"], 0, "From midpoint splitting."),
      Q("The overall technique is?", ["Divide and conquer", "Greedy", "Sorting"], 0, "Split at the middle.")
    ]
  },

  // ================= Queue =================
  "new-problem-7": {
    description: "Design a circular queue with a fixed capacity supporting enqueue, dequeue, front, rear, isEmpty, and isFull, reusing freed slots via wrap-around.",
    example: { input: "capacity 3; enqueue 1,2,3; enqueue 4", output: "enqueue 4 fails (full)", why: "capacity is reached" },
    quizzes: [
      Q("A circular queue reuses space via?", ["Wrap-around (modulo)", "Resizing", "Sorting"], 0, "Indices roll over."),
      Q("enqueue/dequeue cost?", ["O(1)", "O(n)", "O(log n)"], 0, "Index updates only."),
      Q("The ordering is?", ["FIFO", "LIFO", "Sorted"], 0, "First in, first out."),
      Q("Full vs empty is distinguished by?", ["A count or a spare slot", "Sorting", "A heap"], 0, "Both can have front==rear."),
      Q("On enqueue, which index advances?", ["rear", "front", "both"], 0, "New items at the rear."),
      Q("On dequeue, which index advances?", ["front", "rear", "both"], 0, "Oldest removed."),
      Q("Freed slots are?", ["Reused", "Discarded", "Sorted"], 0, "That's the point of circularity.")
    ]
  },
  "new-problem-8": {
    description: "Design a double-ended circular queue (deque) supporting insertion and deletion at both front and rear, with a fixed capacity.",
    example: { input: "insertFront(1); insertLast(2); deleteFront()", output: "operations at both ends succeed", why: "a deque allows both ends" },
    quizzes: [
      Q("A deque supports operations at?", ["Both ends", "Only the front", "Only the rear"], 0, "Double-ended."),
      Q("All deque operations cost?", ["O(1)", "O(n)", "O(log n)"], 0, "Index math."),
      Q("Wrap-around uses?", ["Modulo arithmetic", "Sorting", "A second array"], 0, "Circular indices."),
      Q("Capacity is?", ["Fixed", "Unbounded", "Prime"], 0, "A ring buffer."),
      Q("Which pointers move?", ["Both front and rear", "Only front", "Only rear"], 0, "Insertions at both ends."),
      Q("isFull/isEmpty are checked using?", ["A count or spare slot", "Sorting", "A heap"], 0, "Same as a circular queue."),
      Q("A deque generalizes?", ["Both a queue and a stack", "Only a queue", "A tree"], 0, "Both ends usable.")
    ]
  },
  "new-problem-9": {
    description: "Implement a queue using a fixed array with front and rear indices, ideally circular to reuse freed space.",
    example: { input: "enqueue 1,2; dequeue", output: "returns 1", why: "FIFO order" },
    quizzes: [
      Q("The ordering is?", ["FIFO", "LIFO", "Sorted"], 0, "First in, first out."),
      Q("It tracks?", ["front and rear indices", "Only a size", "A heap"], 0, "Positions of both ends."),
      Q("Circular reuse avoids?", ["Wasted space at the front", "Sorting", "Recursion"], 0, "Reclaim dequeued slots."),
      Q("enqueue/dequeue cost?", ["O(1)", "O(n)", "O(log n)"], 0, "Index updates."),
      Q("Enqueue on a full array causes?", ["Overflow", "Resize always", "Nothing"], 0, "Fixed capacity."),
      Q("Dequeue on an empty queue causes?", ["Underflow", "Overflow", "A sort"], 0, "Nothing to remove."),
      Q("Storage is?", ["An array", "A linked list", "A heap"], 0, "Array-backed.")
    ]
  },
  "new-problem-10": {
    description: "People queue to buy tickets; each needs a given count, buys one per turn, then rejoins the back until done. Return the seconds for the person at index k to finish.",
    example: { input: "tickets = [2,3,2], k = 2", output: "6", why: "person 2 needs 2 tickets; counting everyone's buys up to that gives 6" },
    quizzes: [
      Q("This can be solved by?", ["A queue simulation or a direct formula", "Sorting", "A heap"], 0, "FIFO buying."),
      Q("Each turn, a person buys?", ["One ticket", "All their tickets", "None"], 0, "Then rejoins the back."),
      Q("The formula runs in?", ["O(n)", "O(n^2)", "O(total tickets)"], 0, "One pass with min logic."),
      Q("Person k finishes when?", ["Their ticket count reaches 0", "The queue empties", "The first round ends"], 0, "Their last purchase."),
      Q("People ahead of k buy up to?", ["min(theirs, tickets[k])", "all of theirs", "zero"], 0, "They stop once k is done."),
      Q("People behind k buy up to?", ["min(theirs, tickets[k] - 1)", "all of theirs", "tickets[k]"], 0, "k finishes before their last turn."),
      Q("Pure simulation costs?", ["O(total tickets)", "O(1)", "O(log n)"], 0, "Each purchase is a step.")
    ]
  },
  "new-problem-11": {
    description: "n people stand in a circle; every k-th person is eliminated repeatedly. Return the 1-based position of the last person remaining.",
    example: { input: "n = 5, k = 2", output: "3", why: "eliminations leave person 3" },
    quizzes: [
      Q("This is the?", ["Josephus problem", "Knapsack problem", "LRU problem"], 0, "Circular elimination."),
      Q("A queue simulation does?", ["Rotate k-1, then remove the k-th", "Sort then remove", "Use a heap"], 0, "Model the circle with a queue."),
      Q("The recurrence is?", ["J(n) = (J(n-1) + k) % n", "J(n) = n - k", "J(n) = n/2"], 0, "Build up from one person."),
      Q("Recurrence time vs simulation?", ["O(n) vs O(n*k)", "Both O(1)", "Both O(n^2)"], 0, "Recurrence is faster."),
      Q("The circle is modeled by?", ["A queue", "A stack", "A tree"], 0, "Rotate the front to the back."),
      Q("A common pitfall is?", ["0-based vs 1-based indexing", "Overflow", "Sorting order"], 0, "Convert at the end."),
      Q("The answer is?", ["The last survivor's position", "The first eliminated", "The middle"], 0, "Who remains.")
    ]
  },
  "new-problem-12": {
    description: "n people numbered 1..n stand in a circle; counting starts at 1 and every k-th person is eliminated. Return the survivor's position.",
    example: { input: "n = 7, k = 3", output: "4", why: "the Josephus recurrence yields position 4" },
    quizzes: [
      Q("This classic problem is?", ["Josephus", "Dijkstra", "Kadane"], 0, "Elimination in a circle."),
      Q("The recurrence (0-based)?", ["J(1)=0; J(i)=(J(i-1)+k)%i", "J(i)=i-k", "J(i)=k%i"], 0, "Iterate up to n."),
      Q("The final answer is?", ["0-based result + 1", "The raw result", "n - result"], 0, "Convert to 1-based."),
      Q("Recurrence time?", ["O(n)", "O(n*k)", "O(n^2)"], 0, "One loop to n."),
      Q("Recurrence space?", ["O(1)", "O(n)", "O(k)"], 0, "Iterative, one variable."),
      Q("Queue simulation costs?", ["O(n*k)", "O(1)", "O(log n)"], 0, "Rotate k each round."),
      Q("Every which person is removed?", ["The k-th counted", "The first", "The last"], 0, "Counting of k.")
    ]
  },

  // ================= Recursion =================
  "prob_rec_lin_1": {
    description: "Compute n! = n × (n-1) × ... × 1 recursively, with 0! defined as 1.",
    example: { input: "n = 5", output: "120", why: "5*4*3*2*1 = 120" },
    quizzes: [
      Q("The base case is?", ["n <= 1 returns 1", "n == 0 returns 0", "none"], 0, "Stops recursion."),
      Q("Calls per step?", ["One", "Two", "n"], 0, "Linear recursion."),
      Q("Recursion depth?", ["O(n)", "O(log n)", "O(1)"], 0, "n nested calls."),
      Q("Stack space?", ["O(n)", "O(1)", "O(log n)"], 0, "One frame per call."),
      Q("Time complexity?", ["O(n)", "O(n^2)", "O(2^n)"], 0, "n multiplications."),
      Q("A missing base case causes?", ["Stack overflow", "Wrong type", "Faster code"], 0, "Infinite recursion."),
      Q("An iterative version uses?", ["O(1) space", "O(n) space", "A stack"], 0, "A simple loop.")
    ]
  },
  "prob_rec_lin_3": {
    description: "Print the numbers 1 to N (or N to 1) using recursion; the order depends on whether you print before or after the recursive call.",
    example: { input: "n = 3 (ascending)", output: "1 2 3", why: "print before recursing deeper" },
    quizzes: [
      Q("The print order depends on?", ["Print before vs after the recursive call", "The base case", "Sorting"], 0, "Pre- vs post-order."),
      Q("The base case stops at?", ["0", "1", "n"], 0, "No more numbers."),
      Q("Time complexity?", ["O(n)", "O(n^2)", "O(log n)"], 0, "One print per number."),
      Q("Stack space?", ["O(n)", "O(1)", "O(log n)"], 0, "n frames."),
      Q("For ascending output you?", ["Print, then recurse", "Recurse, then print", "Sort"], 0, "Pre-order print."),
      Q("For descending output you?", ["Recurse, then print", "Print, then recurse", "Reverse at the end"], 0, "Post-order print."),
      Q("Extra data structure needed?", ["None", "A stack", "A queue"], 0, "The call stack suffices.")
    ]
  },
  "prob_rec_lin_4": {
    description: "Check whether a string is a palindrome by recursively comparing the outermost characters and moving inward.",
    example: { input: 's = "madam"', output: "true", why: "outer characters match while moving inward" },
    quizzes: [
      Q("Each call compares?", ["s[l] and s[r], then recurses inward", "adjacent characters", "the whole string"], 0, "Two-pointer via recursion."),
      Q("The base case is?", ["l >= r returns true", "l == 0", "r == n"], 0, "Pointers crossed."),
      Q("Time complexity?", ["O(n)", "O(n^2)", "O(log n)"], 0, "n/2 comparisons."),
      Q("Stack space?", ["O(n)", "O(1)", "O(log n)"], 0, "Recursion depth."),
      Q("A mismatch returns?", ["false", "true", "the index"], 0, "Not a palindrome."),
      Q("This mirrors which iterative idea?", ["Two pointers from both ends", "Sliding window", "Sorting"], 0, "Ends moving inward."),
      Q("Single or empty strings are?", ["Palindromes (true)", "Not palindromes", "Undefined"], 0, "Trivially symmetric.")
    ]
  },
  "prob_pow_x_n": {
    description: "Compute x raised to the power n (n may be negative) efficiently using fast exponentiation (exponentiation by squaring).",
    example: { input: "x = 2, n = 10", output: "1024", why: "2^10 = 1024" },
    quizzes: [
      Q("Fast exponentiation runs in?", ["O(log n)", "O(n)", "O(n^2)"], 0, "Halve the exponent."),
      Q("The key step is?", ["Square the result, halve the exponent", "Multiply n times", "Sort"], 0, "Exponentiation by squaring."),
      Q("Negative n is handled by?", ["1 / pow(x, -n)", "Returning 0", "Ignoring the sign"], 0, "Reciprocal."),
      Q("For even n?", ["(x^(n/2))^2", "x * x^(n-1)", "x^n directly"], 0, "Square the half power."),
      Q("For odd n?", ["x * x^(n-1)", "(x^(n/2))^2", "x/2"], 0, "Peel one factor."),
      Q("Naive repeated multiplication is?", ["O(n)", "O(log n)", "O(1)"], 0, "Multiply n times."),
      Q("The base case is?", ["n = 0 -> 1", "n = 1 -> 0", "n = -1"], 0, "Anything to the 0 is 1.")
    ]
  },
  "prob_fibonacci_number": {
    description: "Return the n-th Fibonacci number, where F(0)=0, F(1)=1, and F(n)=F(n-1)+F(n-2).",
    example: { input: "n = 6", output: "8", why: "0,1,1,2,3,5,8" },
    quizzes: [
      Q("Naive recursion is?", ["O(2^n)", "O(n)", "O(log n)"], 0, "The call tree doubles."),
      Q("Memoization makes it?", ["O(n)", "O(2^n)", "O(n^2)"], 0, "Each value once."),
      Q("Calls per step (naive)?", ["Two", "One", "Zero"], 0, "F(n-1) and F(n-2)."),
      Q("Base cases?", ["F(0)=0, F(1)=1", "F(0)=1 only", "none"], 0, "Two seeds."),
      Q("Iterative DP uses?", ["O(1) space", "O(n) space always", "A heap"], 0, "Two running variables."),
      Q("Repeated subproblems indicate?", ["Dynamic programming", "Sorting", "A heap"], 0, "Overlap."),
      Q("Tabulation builds?", ["Bottom-up from F(0)", "Top-down only", "Randomly"], 0, "Fill an array upward.")
    ]
  },
  "prob_climbing_stairs": {
    description: "You can climb 1 or 2 steps at a time. Return the number of distinct ways to reach the top of n steps.",
    example: { input: "n = 3", output: "3", why: "1+1+1, 1+2, 2+1" },
    quizzes: [
      Q("The recurrence is?", ["ways(n) = ways(n-1) + ways(n-2)", "ways(n) = 2*ways(n-1)", "ways(n) = n"], 0, "Last step is 1 or 2."),
      Q("It is equivalent to?", ["Fibonacci", "Binary search", "Merge sort"], 0, "Same recurrence."),
      Q("To avoid O(2^n) you?", ["Memoize or tabulate", "Sort", "Use a heap"], 0, "Overlapping subproblems."),
      Q("DP time complexity?", ["O(n)", "O(n^2)", "O(log n)"], 0, "One pass."),
      Q("Space can be?", ["O(1)", "O(n^2)", "O(log n)"], 0, "Two variables."),
      Q("Base cases?", ["ways(1)=1, ways(2)=2", "ways(0)=0", "none"], 0, "Small step counts."),
      Q("Each state comes from?", ["One or two steps below", "The top", "The middle"], 0, "n-1 and n-2.")
    ]
  },
  "prob_unique_paths": {
    description: "Count the distinct paths from the top-left to the bottom-right of an m x n grid, moving only right or down.",
    example: { input: "m = 3, n = 2", output: "3", why: "three monotone right/down paths" },
    quizzes: [
      Q("The recurrence is?", ["paths(i,j) = paths(i-1,j) + paths(i,j-1)", "paths(i,j) = i*j", "paths(i,j) = 1"], 0, "Arrive from top or left."),
      Q("To avoid recomputation you?", ["Memoize or use DP", "Sort", "Use a heap"], 0, "Overlapping subproblems."),
      Q("DP time complexity?", ["O(m*n)", "O((mn)^2)", "O(2^(mn))"], 0, "Fill each cell once."),
      Q("A closed-form is?", ["C(m+n-2, m-1)", "m*n", "m+n"], 0, "Combinatorics."),
      Q("Base cases?", ["First row/column have one path", "The center", "The last cell"], 0, "Single way along an edge."),
      Q("Allowed moves are?", ["Right and down only", "All four directions", "Diagonal"], 0, "Monotone paths."),
      Q("Space can drop to?", ["O(n) with a rolling row", "O(1)", "O(mn log mn)"], 0, "Keep one row.")
    ]
  },
  "prob_house_robber": {
    description: "Given house values along a street, maximize the sum you can rob without robbing two adjacent houses.",
    example: { input: "nums = [2,7,9,3,1]", output: "12", why: "rob houses 0, 2, 4: 2 + 9 + 1 = 12" },
    quizzes: [
      Q("The recurrence is?", ["dp[i] = max(dp[i-1], dp[i-2] + nums[i])", "dp[i] = dp[i-1] + nums[i]", "dp[i] = nums[i]"], 0, "Skip or rob house i."),
      Q("The constraint is?", ["No two adjacent houses", "No more than k houses", "All houses"], 0, "Adjacency forbidden."),
      Q("Time complexity?", ["O(n)", "O(n^2)", "O(2^n)"], 0, "One pass."),
      Q("Space can be?", ["O(1) with two variables", "O(n^2)", "O(log n)"], 0, "Only the last two states."),
      Q("At each house you choose to?", ["Rob it or skip it", "Always rob", "Always skip"], 0, "The decision."),
      Q("Repeated subproblems mean?", ["Use DP", "Sort", "Use a heap"], 0, "Overlap."),
      Q("Base cases cover?", ["The first one or two houses", "The last house", "The middle"], 0, "Seed the recurrence.")
    ]
  },
  "prob_rec_dc_1": {
    description: "Sort an array by recursively splitting it in half, sorting each half, and merging the two sorted halves.",
    example: { input: "[5,2,4,1]", output: "[1,2,4,5]", why: "split, sort each half, merge" },
    quizzes: [
      Q("Time complexity?", ["O(n log n)", "O(n)", "O(n^2)"], 0, "log n levels, O(n) merge."),
      Q("Extra space?", ["O(n)", "O(1)", "O(log n)"], 0, "Temporary merge arrays."),
      Q("Merge sort is?", ["Stable", "Unstable", "In-place only"], 0, "Equal keys keep order."),
      Q("The combine step is?", ["Merging two sorted halves", "Partitioning", "Hashing"], 0, "Produces the sorted whole."),
      Q("Recursion depth?", ["O(log n)", "O(n)", "O(1)"], 0, "Halving each level."),
      Q("It is an example of?", ["Divide and conquer", "Greedy", "DP"], 0, "Split, solve, combine."),
      Q("Worst-case time?", ["O(n log n)", "O(n^2)", "O(n)"], 0, "No bad case, unlike quicksort.")
    ]
  },
  "prob_rec_dc_2": {
    description: "Sort an array by choosing a pivot, partitioning elements around it, and recursively sorting each partition.",
    example: { input: "[5,2,4,1]", output: "[1,2,4,5]", why: "partition around pivots recursively" },
    quizzes: [
      Q("Average vs worst-case time?", ["O(n log n) avg, O(n^2) worst", "Always O(n)", "Always O(n^2)"], 0, "Depends on pivots."),
      Q("In-place quicksort stack space?", ["O(log n)", "O(n) always", "O(1)"], 0, "Recursion depth (balanced)."),
      Q("The partition step?", ["Places the pivot in its final position", "Merges halves", "Hashes elements"], 0, "Splits around the pivot."),
      Q("The worst case comes from?", ["Bad pivot choices", "Too few elements", "Sorted merges"], 0, "Highly unbalanced splits."),
      Q("To avoid the worst case you?", ["Use randomized/median pivots", "Sort first", "Use a heap"], 0, "Balanced partitions."),
      Q("Quicksort is (typically)?", ["Not stable", "Always stable", "In-order only"], 0, "Swaps reorder equals."),
      Q("It is an example of?", ["Divide and conquer", "DP", "Greedy"], 0, "Partition then recurse.")
    ]
  },
  "prob_rec_dc_3": {
    description: "Search a sorted array for a target recursively, halving the search range on each call.",
    example: { input: "[1,3,5,7], target = 5", output: "2", why: "found at index 2" },
    quizzes: [
      Q("Time complexity?", ["O(log n)", "O(n)", "O(n log n)"], 0, "Halve each step."),
      Q("Recursion depth?", ["O(log n)", "O(n)", "O(1)"], 0, "log n calls."),
      Q("Precondition?", ["The array is sorted", "No duplicates", "Even length"], 0, "Order required."),
      Q("The base case is?", ["An empty range -> not found", "mid == 0", "n == 1"], 0, "lo > hi."),
      Q("Each call recurses into?", ["The half containing the target", "Both halves", "The whole array"], 0, "One side."),
      Q("Stack space?", ["O(log n) (O(1) iterative)", "O(n)", "O(n log n)"], 0, "Recursion frames."),
      Q("You compare the target with?", ["The middle element", "The first", "The last"], 0, "Decide the half.")
    ]
  },
  "prob_rec_dc_4": {
    description: "Compute x raised to the power n using recursive fast exponentiation (exponentiation by squaring).",
    example: { input: "x = 3, n = 4", output: "81", why: "(3^2)^2 = 81" },
    quizzes: [
      Q("Time complexity?", ["O(log n)", "O(n)", "O(n^2)"], 0, "Halve the exponent."),
      Q("The key operation is?", ["Square and halve the exponent", "Multiply n times", "Sort"], 0, "Squaring."),
      Q("For even n?", ["(x^(n/2))^2", "x * x^(n-1)", "x^n directly"], 0, "Reuse the half power."),
      Q("For odd n?", ["x * x^(n-1)", "(x^(n/2))^2", "x/2"], 0, "Peel one factor."),
      Q("Naive multiplication is?", ["O(n)", "O(log n)", "O(1)"], 0, "n multiplications."),
      Q("Negative exponents?", ["Use the reciprocal", "Return 0", "Are invalid"], 0, "1 / x^(-n)."),
      Q("Base case?", ["n = 0 -> 1", "n = 1 -> 0", "n = -1"], 0, "x^0 is 1.")
    ]
  },
  "prob_median_two_sorted_arrays": {
    description: "Given two sorted arrays, return the median of their combined elements in logarithmic time.",
    example: { input: "[1,3] and [2]", output: "2.0", why: "merged [1,2,3] has median 2" },
    quizzes: [
      Q("The optimal complexity is?", ["O(log(min(m,n)))", "O(m+n)", "O(mn)"], 0, "Binary search a partition."),
      Q("The approach partitions so that?", ["Left halves hold the lower half of all elements", "Both arrays are merged", "Arrays are sorted again"], 0, "Correct split point."),
      Q("The median comes from?", ["The boundary (partition) values", "The first elements", "The sums"], 0, "Around the cut."),
      Q("A simpler merge approach is?", ["O(m+n)", "O(log n)", "O(1)"], 0, "Slower but easy."),
      Q("You binary search on?", ["The smaller array", "The larger array", "Both"], 0, "Fewer partitions."),
      Q("You must handle?", ["Odd vs even total length", "Negative numbers only", "Duplicates only"], 0, "One vs two middle values."),
      Q("This problem is?", ["Binary search / divide and conquer", "Greedy", "Backtracking"], 0, "Partition search.")
    ]
  },
  "prob_rec_struct_3": {
    description: "Reverse a singly linked list recursively, returning the new head.",
    example: { input: "1 -> 2 -> 3", output: "3 -> 2 -> 1", why: "links reversed from the end" },
    quizzes: [
      Q("Recursion depth?", ["O(n)", "O(log n)", "O(1)"], 0, "One frame per node."),
      Q("The call returns?", ["The new head (old tail)", "The old head", "null"], 0, "It bubbles up."),
      Q("The relinking step is?", ["head.next.next = head on the way back", "sorting", "swapping values"], 0, "Reverse the link."),
      Q("The base case is?", ["null or a single node", "length 2", "the middle"], 0, "Nothing to reverse."),
      Q("Time complexity?", ["O(n)", "O(n^2)", "O(log n)"], 0, "Each node once."),
      Q("Stack space?", ["O(n)", "O(1)", "O(log n)"], 0, "Recursive frames."),
      Q("The iterative version uses?", ["O(1) space", "O(n) space", "A heap"], 0, "Three pointers.")
    ]
  },
  "prob_rec_struct_4": {
    description: "Merge two sorted linked lists into one sorted list, recursively picking the smaller head.",
    example: { input: "1 -> 3 and 2 -> 4", output: "1 -> 2 -> 3 -> 4", why: "smaller head chosen each step" },
    quizzes: [
      Q("Each step picks?", ["The smaller head, then recurses on the rest", "The larger head", "A random node"], 0, "Keeps it sorted."),
      Q("Time complexity?", ["O(n + m)", "O(nm)", "O(n log m)"], 0, "Each node once."),
      Q("The base case is?", ["One list is empty", "Both full", "Length 2"], 0, "Return the other list."),
      Q("Recursion depth?", ["O(n + m)", "O(log n)", "O(1)"], 0, "One frame per node."),
      Q("The result is?", ["Sorted", "Reversed", "Unsorted"], 0, "Merged in order."),
      Q("Recursive stack space?", ["O(n + m)", "O(1)", "O(log n)"], 0, "Pending frames."),
      Q("The iterative merge uses?", ["O(1) space", "O(n) space", "A heap"], 0, "A dummy node and a tail.")
    ]
  },
  "prob_rec_struct_5": {
    description: "Delete the middle element of a stack using recursion, keeping the remaining elements in order.",
    example: { input: "stack [1,2,3,4,5]", output: "[1,2,4,5]", why: "the middle element (3) is removed" },
    quizzes: [
      Q("The approach is?", ["Recurse to the middle, then remove it", "Sort", "Use a heap"], 0, "Pop down to the middle."),
      Q("Time complexity?", ["O(n)", "O(n^2)", "O(log n)"], 0, "Pop and push each once."),
      Q("Stack (recursion) space?", ["O(n)", "O(1)", "O(log n)"], 0, "Frames hold popped items."),
      Q("The base case is?", ["Reaching the middle index", "Empty stack", "Size 1"], 0, "Remove there."),
      Q("The pattern is?", ["Pop, recurse, push back (except middle)", "Sort then remove", "Merge"], 0, "Rebuild around the middle."),
      Q("The middle index is?", ["size / 2", "0", "size - 1"], 0, "Half the size."),
      Q("Other elements' order is?", ["Preserved", "Reversed", "Sorted"], 0, "Only the middle changes.")
    ]
  },
  "prob_rec_struct_6": {
    description: "Reverse a stack using only recursion, without an auxiliary data structure.",
    example: { input: "[1,2,3]", output: "[3,2,1]", why: "reversed via an insert-at-bottom helper" },
    quizzes: [
      Q("The method is?", ["Pop all, insert each at the bottom", "Sort", "Use a second stack"], 0, "Recursion-only reverse."),
      Q("Time complexity?", ["O(n^2)", "O(n)", "O(log n)"], 0, "insert-at-bottom is O(n)."),
      Q("It relies on?", ["The call stack only", "A queue", "A heap"], 0, "No explicit structure."),
      Q("The helper function is?", ["insert-at-bottom", "merge", "partition"], 0, "Puts an item under the rest."),
      Q("The base case is?", ["An empty stack", "One element", "A full stack"], 0, "Nothing left."),
      Q("Recursion depth?", ["O(n)", "O(log n)", "O(1)"], 0, "One frame per element."),
      Q("Auxiliary structures used?", ["None", "A stack", "An array"], 0, "Only recursion.")
    ]
  },
  "prob_rec_sub_1": {
    description: "Generate all subsets (the power set) of a set of distinct integers.",
    example: { input: "[1,2]", output: "[[], [1], [2], [1,2]]", why: "each element is either in or out" },
    quizzes: [
      Q("How many subsets for n elements?", ["2^n", "n!", "n^2"], 0, "Include/exclude each."),
      Q("The recursion is?", ["Pick / not-pick each element", "Sort then split", "Merge"], 0, "Two branches."),
      Q("Time complexity?", ["O(2^n)", "O(n^2)", "O(n log n)"], 0, "2^n subsets."),
      Q("After including an element you?", ["Pop it (backtrack)", "Return", "Sort"], 0, "Restore for the next option."),
      Q("The base case is?", ["Index reaches n", "cur is empty", "Index 0"], 0, "All decided."),
      Q("Recursion depth?", ["O(n)", "O(2^n)", "O(log n)"], 0, "One frame per element."),
      Q("Subset order in the output?", ["Can vary", "Must be sorted", "Must be reversed"], 0, "Any order is fine.")
    ]
  },
  "prob_rec_sub_2": {
    description: "Determine whether any subset of the array sums exactly to a given target.",
    example: { input: "nums = [3,34,4,12,5,2], target = 9", output: "true", why: "4 + 5 = 9" },
    quizzes: [
      Q("The recursion decides, per element?", ["Include or exclude it", "Its position", "Its sign"], 0, "Two branches."),
      Q("Naive recursion is?", ["O(2^n)", "O(n)", "O(log n)"], 0, "All subsets."),
      Q("DP (knapsack) makes it?", ["O(n * target)", "O(n^2)", "O(1)"], 0, "Pseudo-polynomial."),
      Q("The base case includes?", ["target == 0 -> true", "index 0", "target < 0 only"], 0, "Target met."),
      Q("Pruning happens when?", ["The remaining sum overshoots/undershoots", "Always", "Never"], 0, "Cut dead branches."),
      Q("This is a?", ["Decision problem (true/false)", "Counting problem", "Sorting problem"], 0, "Reachability of a sum."),
      Q("Memoization keys on?", ["(index, remaining target)", "Only index", "Only target"], 0, "Cache subproblems.")
    ]
  },
  "prob_rec_sub_3": {
    description: "Count the number of subsequences (subsets) whose elements sum to a given target.",
    example: { input: "nums = [1,2,1], target = 2", output: "2", why: "[2] and [1,1] both sum to 2" },
    quizzes: [
      Q("The recursion?", ["Include/exclude each element, counting hits", "Sorts", "Merges"], 0, "Sum the branch counts."),
      Q("Naive vs DP complexity?", ["O(2^n) vs O(n * target)", "Both O(n)", "Both O(n^2)"], 0, "DP via tabulation."),
      Q("The base case checks?", ["At the end, sum == target", "Index 0", "target < 0"], 0, "A full subset."),
      Q("The result combines?", ["Counts from include and exclude", "Only include", "Only exclude"], 0, "Add both branches."),
      Q("Memoization keys on?", ["(index, remaining)", "Only index", "Only remaining"], 0, "Overlapping subproblems."),
      Q("It is related to?", ["Subset-sum counting", "Shortest path", "Sorting"], 0, "Counting variant."),
      Q("The search explores?", ["A decision tree of choices", "A graph", "A heap"], 0, "Pick / not-pick.")
    ]
  },

  // ================= Stack =================
  "problem_0064": {
    description: "For each element in nums1 (a subset of nums2), find its next greater element to the right in nums2, or -1 if none exists.",
    example: { input: "nums1 = [4,1,2], nums2 = [1,3,4,2]", output: "[-1, 3, -1]", why: "4 has none, 1's next greater is 3, 2 has none" },
    quizzes: [
      Q("Core technique?", ["A monotonic stack over nums2", "Sorting", "Binary search"], 0, "Find next-greater once, then map."),
      Q("Time complexity?", ["O(n)", "O(n^2)", "O(n log n)"], 0, "Each element pushed/popped once."),
      Q("A hash map is used to?", ["Map value -> its next greater", "Sort nums1", "Count"], 0, "Then answer nums1 queries."),
      Q("When none exists, the answer is?", ["-1", "0", "the value itself"], 0, "No greater element."),
      Q("The stack is kept?", ["Decreasing", "Increasing", "Sorted ascending"], 0, "Pop when a greater value arrives."),
      Q("You search for the next greater to the?", ["Right", "Left", "Both sides"], 0, "To the right in nums2."),
      Q("Space complexity?", ["O(n)", "O(1)", "O(log n)"], 0, "The stack and map.")
    ]
  },
  "problem_0065": {
    description: "Find the next greater element for each item in a circular array (the search wraps around), or -1 if none exists.",
    example: { input: "nums = [1,2,1]", output: "[2, -1, 2]", why: "wrapping gives 2 for the last element" },
    quizzes: [
      Q("Circularity is handled by?", ["Iterating 2n times with modulo indices", "Sorting", "Reversing"], 0, "Two passes over the array."),
      Q("Core technique?", ["Monotonic stack of indices", "A heap", "Binary search"], 0, "Same next-greater idea."),
      Q("Time complexity?", ["O(n)", "O(n^2)", "O(n log n)"], 0, "Each index processed O(1) amortized."),
      Q("Index wrap uses?", ["i % n", "i / n", "i * n"], 0, "Modulo for the circle."),
      Q("When none exists?", ["-1", "0", "the max"], 0, "No greater element even after wrapping."),
      Q("The stack holds?", ["Indices", "Only values", "Sorted values"], 0, "To write results by position."),
      Q("The traversal length is?", ["2n", "n", "n^2"], 0, "To simulate the wrap.")
    ]
  },
  "problem_0066": {
    description: "For each day's temperature, find how many days you must wait for a warmer temperature; 0 if there is no future warmer day.",
    example: { input: "[73,74,75,71,69,72,76,73]", output: "[1,1,4,2,1,1,0,0]", why: "days until a warmer temperature" },
    quizzes: [
      Q("Technique?", ["Monotonic stack of indices", "Sorting", "Binary search"], 0, "Pop when a warmer day arrives."),
      Q("Time complexity?", ["O(n)", "O(n^2)", "O(n log n)"], 0, "Each index pushed/popped once."),
      Q("The answer represents?", ["A day count (distance)", "A temperature", "An index"], 0, "Wait in days."),
      Q("You pop from the stack when?", ["A warmer temperature appears", "The stack is empty", "Always"], 0, "Resolve waiting days."),
      Q("If no warmer day exists, the value is?", ["0", "-1", "the index"], 0, "Stays unresolved -> 0."),
      Q("The stack is?", ["Decreasing by temperature", "Increasing", "Sorted ascending"], 0, "Cooler-or-equal indices wait."),
      Q("Space complexity?", ["O(n)", "O(1)", "O(log n)"], 0, "The index stack.")
    ]
  },
  "problem_0067": {
    description: "For a stream of daily prices, return each day's span: the number of consecutive days up to and including today whose price is <= today's price.",
    example: { input: "prices 100,80,60,70,60,75,85", output: "spans 1,1,1,2,1,4,6", why: "consecutive days with price <= today" },
    quizzes: [
      Q("Technique?", ["A monotonic stack of (price, span)", "Sorting", "A heap"], 0, "Accumulate spans on pop."),
      Q("Amortized cost per day?", ["O(1)", "O(n)", "O(log n)"], 0, "Each price pushed/popped once."),
      Q("On a new price you?", ["Pop smaller-or-equal prices, adding their spans", "Sort", "Reset"], 0, "Combine consecutive days."),
      Q("The problem is?", ["Online / streaming", "Offline only", "Batch sorted"], 0, "Prices arrive one by one."),
      Q("The stack is?", ["Decreasing by price", "Increasing", "Sorted ascending"], 0, "Pop while price <= current."),
      Q("The span counts days?", ["Backward from today", "Forward", "Both ways"], 0, "Consecutive <= today."),
      Q("Space complexity?", ["O(n)", "O(1)", "O(log n)"], 0, "The stack.")
    ]
  },
  "problem_0068": {
    description: "Given bar heights of a histogram, find the area of the largest rectangle that fits entirely within it.",
    example: { input: "[2,1,5,6,2,3]", output: "10", why: "bars of height 5 and 6 form a 5 x 2 = 10 rectangle" },
    quizzes: [
      Q("Technique?", ["A monotonic increasing stack of indices", "Sorting", "Binary search"], 0, "Pop to compute widths."),
      Q("Time complexity?", ["O(n)", "O(n^2)", "O(n log n)"], 0, "Each bar pushed/popped once."),
      Q("On popping a bar, its width is?", ["right - left - 1 (between smaller bars)", "its height", "the whole array"], 0, "Bounded by smaller neighbours."),
      Q("The stack keeps indices in?", ["Increasing height order", "Decreasing order", "Random order"], 0, "Pop when a shorter bar arrives."),
      Q("A sentinel of height 0 is used to?", ["Flush the stack at the end", "Sort", "Save memory"], 0, "Resolve remaining bars."),
      Q("Area is computed as?", ["height * width", "height + width", "width^2"], 0, "Rectangle area."),
      Q("Space complexity?", ["O(n)", "O(1)", "O(log n)"], 0, "The index stack.")
    ]
  },
  "problem_0069": {
    description: "Given a binary matrix of 0s and 1s, find the area of the largest rectangle containing only 1s.",
    example: { input: "a 0/1 matrix", output: "the largest all-ones rectangle area", why: "treat each row as a histogram base" },
    quizzes: [
      Q("Core reduction?", ["Each row becomes a histogram of consecutive 1s", "Sort rows", "BFS"], 0, "Then largest-rectangle per row."),
      Q("Per row you apply?", ["Largest Rectangle in Histogram", "Binary search", "A heap"], 0, "On accumulated heights."),
      Q("Time complexity?", ["O(m * n)", "O((mn)^2)", "O(mn log mn)"], 0, "A linear histogram pass per row."),
      Q("Heights accumulate by?", ["Adding 1 for each consecutive 1 in a column", "Summing rows", "Sorting"], 0, "Build up over rows."),
      Q("A 0 in a column?", ["Resets that column's height to 0", "Adds 1", "Is ignored"], 0, "The rectangle breaks."),
      Q("Underlying structure?", ["A monotonic stack", "A heap", "A trie"], 0, "From the histogram step."),
      Q("Space complexity?", ["O(n)", "O(mn)", "O(1)"], 0, "The heights row + stack.")
    ]
  },
  "problem_0070": {
    description: "Asteroids move left or right (sign = direction, absolute value = size). When two moving toward each other collide, the smaller explodes; equal sizes both explode. Return the asteroids that survive.",
    example: { input: "[5,10,-5]", output: "[5, 10]", why: "-5 is destroyed by 10" },
    quizzes: [
      Q("Technique?", ["Stack simulation", "Sorting", "A heap"], 0, "Resolve collisions with a stack."),
      Q("A collision happens when?", ["The stack top is positive and current is negative", "Both positive", "Both negative"], 0, "Moving toward each other."),
      Q("On a collision, the smaller asteroid?", ["Is destroyed", "Grows", "Reverses"], 0, "Larger survives."),
      Q("Equal sizes colliding?", ["Both are destroyed", "Both survive", "Merge"], 0, "They cancel."),
      Q("Time complexity?", ["O(n)", "O(n^2)", "O(n log n)"], 0, "Each asteroid pushed/popped once."),
      Q("Survivors end up?", ["On the stack", "Sorted", "In a queue"], 0, "The stack is the result."),
      Q("Space complexity?", ["O(n)", "O(1)", "O(log n)"], 0, "The stack.")
    ]
  },
  "problem_0071": {
    description: "Evaluate a string expression containing +, -, parentheses, spaces, and non-negative integers.",
    example: { input: '"(1+(4+5+2)-3)+(6+8)"', output: "23", why: "respecting parentheses and signs" },
    quizzes: [
      Q("Technique?", ["A stack to save results and signs", "Sorting", "A heap"], 0, "Handle parentheses by saving state."),
      Q("On '(' you?", ["Push the current result and sign", "Pop", "Sort"], 0, "Start a new sub-expression."),
      Q("Time complexity?", ["O(n)", "O(n^2)", "O(n log n)"], 0, "One pass over characters."),
      Q("This calculator handles precedence?", ["No, only + and -", "Yes, with * and /", "Only *"], 0, "Basic Calculator I has no * or /."),
      Q("On ')' you?", ["Restore the saved result and sign", "Reset to 0", "Sort"], 0, "Close the sub-expression."),
      Q("Numbers may be?", ["Multi-digit", "Single-digit only", "Negative only"], 0, "Accumulate digits."),
      Q("Space complexity?", ["O(n)", "O(1)", "O(log n)"], 0, "The stack for nesting.")
    ]
  },
  "problem_0072": {
    description: "Evaluate an expression with +, -, *, / and non-negative integers, respecting operator precedence. There are no parentheses; integer division truncates toward zero.",
    example: { input: '"3+2*2"', output: "7", why: "2*2 is evaluated first, then + 3" },
    quizzes: [
      Q("Technique?", ["A stack of terms", "Sorting", "A heap"], 0, "Combine * and / immediately."),
      Q("For * and / you?", ["Pop the last term and combine right away", "Push and defer", "Ignore"], 0, "Higher precedence."),
      Q("For + you?", ["Push the number", "Combine immediately", "Sort"], 0, "Defer additive terms."),
      Q("For - you?", ["Push the negative number", "Subtract from the top", "Sort"], 0, "A negative term."),
      Q("The final answer is?", ["The sum of the stack", "The top of the stack", "The max"], 0, "Add all terms."),
      Q("Integer division?", ["Truncates toward zero", "Rounds up", "Stays a float"], 0, "As specified."),
      Q("Time complexity?", ["O(n)", "O(n^2)", "O(n log n)"], 0, "One pass.")
    ]
  },
  "problem_0073": {
    description: "Evaluate an arithmetic expression given in Reverse Polish (postfix) notation.",
    example: { input: '["2","1","+","3","*"]', output: "9", why: "(2 + 1) * 3 = 9" },
    quizzes: [
      Q("Technique?", ["An operand stack", "Two queues", "Recursion only"], 0, "Push operands, apply operators."),
      Q("On an operator you?", ["Pop two operands and push the result", "Push it", "Sort"], 0, "Binary operation."),
      Q("Time complexity?", ["O(n)", "O(n^2)", "O(n log n)"], 0, "One pass over tokens."),
      Q("The second popped operand is?", ["The left operand", "The right operand", "Ignored"], 0, "Order matters for - and /."),
      Q("Does postfix need precedence rules?", ["No", "Yes", "Only for *"], 0, "Order is explicit."),
      Q("After computing, you?", ["Push the result back", "Discard it", "Sort"], 0, "Continue evaluating."),
      Q("Space complexity?", ["O(n)", "O(1)", "O(log n)"], 0, "The operand stack.")
    ]
  },
  "problem_0074": {
    description: "Decode a string like '3[a2[c]]' where a pattern k[substring] means the substring repeated k times, with possible nesting.",
    example: { input: '"3[a2[c]]"', output: '"accaccacc"', why: "2[c]=cc, a2[c]=acc, 3[...]=accaccacc" },
    quizzes: [
      Q("Technique?", ["Two stacks: repeat counts and partial strings", "Sorting", "A heap"], 0, "Handle nesting with stacks."),
      Q("On '[' you?", ["Push the current count and string, then reset", "Pop", "Sort"], 0, "Begin a nested segment."),
      Q("On ']' you?", ["Pop and repeat the segment", "Push", "Reset to empty"], 0, "Expand k times."),
      Q("Time complexity?", ["O(output length)", "O(n^2)", "O(n log n)"], 0, "Build the decoded string."),
      Q("Nested brackets are handled by?", ["The stack of states", "Recursion only", "Sorting"], 0, "Each level saved."),
      Q("Between brackets you?", ["Build the current string / number", "Sort", "Skip"], 0, "Accumulate characters/digits."),
      Q("Space complexity?", ["O(n)", "O(1)", "O(log n)"], 0, "The two stacks.")
    ]
  },
  "problem_0081": {
    description: "Given two strings where '#' means a backspace, return whether they are equal after all backspaces are applied.",
    example: { input: 's = "ab#c", t = "ad#c"', output: "true", why: 'both reduce to "ac"' },
    quizzes: [
      Q("One approach builds each string with?", ["A stack", "A heap", "Sorting"], 0, "'#' pops the top."),
      Q("A '#' character causes?", ["A pop (delete the last char)", "A push", "A sort"], 0, "Backspace."),
      Q("Time complexity?", ["O(n)", "O(n^2)", "O(n log n)"], 0, "One pass each."),
      Q("You compare?", ["The two resulting strings", "Their lengths only", "Their sorts"], 0, "After backspaces."),
      Q("A space-optimal method uses?", ["Two pointers from the back", "A heap", "Sorting"], 0, "O(1) extra space."),
      Q("A backspace on an empty result?", ["Is a no-op", "Errors", "Adds a space"], 0, "Nothing to delete."),
      Q("Stack-version space?", ["O(n)", "O(1)", "O(log n)"], 0, "Two built strings.")
    ]
  },
  "problem_0082": {
    description: "Repeatedly remove adjacent pairs of equal characters until no more can be removed; return the final string.",
    example: { input: '"abbaca"', output: '"ca"', why: '"bb" then "aa" collapse' },
    quizzes: [
      Q("Technique?", ["A stack", "Sorting", "A heap"], 0, "Collapse adjacent equals."),
      Q("You pop when?", ["The top equals the current character", "The stack is empty", "Always"], 0, "Adjacent duplicates cancel."),
      Q("Time complexity?", ["O(n)", "O(n^2)", "O(n log n)"], 0, "One pass."),
      Q("Otherwise you?", ["Push the character", "Sort", "Reset"], 0, "Keep non-matching chars."),
      Q("The final string is?", ["The stack contents", "Sorted", "Reversed"], 0, "What remains."),
      Q("Space complexity?", ["O(n)", "O(1)", "O(log n)"], 0, "The stack."),
      Q("How many passes are needed?", ["One", "Two", "n"], 0, "A single stack pass.")
    ]
  },
  "problem_0083": {
    description: "A string is 'great' if it has no adjacent pair of the same letter in opposite cases (like 'aA' or 'Aa'). Remove such pairs until the string is great.",
    example: { input: '"leEeetcode"', output: '"leetcode"', why: '"eE" is removed' },
    quizzes: [
      Q("Technique?", ["A stack", "Sorting", "A heap"], 0, "Cancel opposite-case pairs."),
      Q("You pop when?", ["Top and current are the same letter, different case", "They are identical", "Always"], 0, "E.g. 'a' and 'A'."),
      Q("Checking same-letter-different-case uses?", ["Case toggling / ASCII diff of 32", "Sorting", "A map"], 0, "Compare lower-cases, differ in case."),
      Q("Time complexity?", ["O(n)", "O(n^2)", "O(n log n)"], 0, "One pass."),
      Q("Otherwise you?", ["Push the character", "Sort", "Reset"], 0, "Keep it."),
      Q("The result is?", ["The stack", "Sorted", "Reversed"], 0, "Remaining characters."),
      Q("Space complexity?", ["O(n)", "O(1)", "O(log n)"], 0, "The stack.")
    ]
  },
  "problem_0084": {
    description: "Repeatedly remove the substrings 'AB' and 'CD' (removals may create new removable pairs). Return the minimum possible length of the final string.",
    example: { input: '"ABFCACDB"', output: "0", why: "all characters cancel in sequence" },
    quizzes: [
      Q("Technique?", ["A stack", "Sorting", "A heap"], 0, "Cancel removable pairs."),
      Q("You pop when?", ["Top + current forms 'AB' or 'CD'", "They are equal", "Always"], 0, "Matching removable pair."),
      Q("Time complexity?", ["O(n)", "O(n^2)", "O(n log n)"], 0, "One pass."),
      Q("Otherwise you?", ["Push the character", "Sort", "Reset"], 0, "Keep it."),
      Q("The answer is?", ["The remaining stack size", "The original length", "Zero always"], 0, "Minimum length."),
      Q("Cascading removals are handled because?", ["The stack exposes new adjacent pairs", "You re-scan", "You sort"], 0, "Top can match the next char."),
      Q("Space complexity?", ["O(n)", "O(1)", "O(log n)"], 0, "The stack.")
    ]
  },
  "problem_0085": {
    description: "Given a string of brackets ()[]{}, determine whether they are correctly matched and properly nested.",
    example: { input: '"()[]{}"', output: "true", why: "every bracket is matched" },
    quizzes: [
      Q("Technique?", ["A stack of opening brackets", "Sorting", "A heap"], 0, "Match each closer with the top."),
      Q("A closing bracket must match?", ["The exact opener on top", "Any opener", "The first opener"], 0, "Types correspond."),
      Q("Time complexity?", ["O(n)", "O(n^2)", "O(n log n)"], 0, "One pass."),
      Q("The string is valid if, at the end?", ["The stack is empty", "The stack has one item", "The stack is full"], 0, "All matched."),
      Q("An unmatched closer means?", ["Invalid", "Valid", "Ignore it"], 0, "Nothing to match."),
      Q("Space complexity?", ["O(n)", "O(1)", "O(log n)"], 0, "The stack."),
      Q("Different bracket types are?", ["Matched to their own kind", "Interchangeable", "Ignored"], 0, "( with ), [ with ], etc.")
    ]
  },
  "problem_0086": {
    description: "Return the minimum number of parentheses that must be added to make the string valid.",
    example: { input: '"())"', output: "1", why: "add one '(' to balance the extra ')'" },
    quizzes: [
      Q("You count?", ["Unmatched openers and closers", "Total brackets", "Pairs"], 0, "Each needs one addition."),
      Q("Time complexity?", ["O(n)", "O(n^2)", "O(n log n)"], 0, "One pass."),
      Q("This can use?", ["A stack or two counters", "A heap", "Sorting"], 0, "Track balance."),
      Q("A ')' with no matching '(' contributes?", ["One needed addition", "Zero", "Removes one"], 0, "Unmatched closer."),
      Q("Leftover '(' at the end contribute?", ["One addition each", "Nothing", "Removals"], 0, "Unmatched openers."),
      Q("With counters, space is?", ["O(1)", "O(n)", "O(log n)"], 0, "Two integers."),
      Q("The answer equals?", ["Unmatched openers + unmatched closers", "The length", "Zero"], 0, "Total additions.")
    ]
  },
  "problem_0087": {
    description: "Return the length of the longest valid (well-formed) parentheses substring.",
    example: { input: '")()())"', output: "4", why: '"()()" has length 4' },
    quizzes: [
      Q("A stack approach stores?", ["Indices (seeded with -1)", "Characters", "Counts only"], 0, "Compute lengths from positions."),
      Q("After popping on ')', the length is?", ["i - stack.top()", "i - 1", "stack size"], 0, "Distance to the last unmatched."),
      Q("Time complexity?", ["O(n)", "O(n^2)", "O(n log n)"], 0, "One pass."),
      Q("An alternative is?", ["Two-pass left/right counting", "A heap", "Sorting"], 0, "O(1) space."),
      Q("Another approach is?", ["Dynamic programming", "Binary search", "BFS"], 0, "dp over indices."),
      Q("Space complexity (stack version)?", ["O(n)", "O(1)", "O(log n)"], 0, "The index stack."),
      Q("An invalid position?", ["Becomes the new base index", "Is ignored", "Is sorted"], 0, "Reset the reference.")
    ]
  },
  "problem_0088": {
    description: "Compute the score of a balanced parentheses string where '()' scores 1, 'AB' scores A+B, and '(A)' scores 2*A.",
    example: { input: '"(()(()))"', output: "6", why: "nested groups double, siblings add" },
    quizzes: [
      Q("Technique?", ["A stack of running scores", "Sorting", "A heap"], 0, "Combine on closing."),
      Q("On '(' you?", ["Push 0 (a new frame)", "Pop", "Sort"], 0, "Start a nested score."),
      Q("'()' scores?", ["1", "0", "2"], 0, "The base case."),
      Q("Nesting '(A)' scores?", ["2 * A", "A + 1", "A"], 0, "Doubling."),
      Q("Adjacent groups 'AB' score?", ["A + B", "A * B", "max(A, B)"], 0, "Sibling scores add."),
      Q("Time complexity?", ["O(n)", "O(n^2)", "O(n log n)"], 0, "One pass."),
      Q("Space complexity?", ["O(n)", "O(1)", "O(log n)"], 0, "The score stack.")
    ]
  },
  "problem_0089": {
    description: "Design a stack supporting push, pop, top, and retrieving the minimum (getMin), all in O(1) time.",
    example: { input: "push 3, push 1; getMin", output: "1", why: "the minimum is tracked alongside" },
    quizzes: [
      Q("getMin runs in?", ["O(1)", "O(n)", "O(log n)"], 0, "The min is stored, not scanned."),
      Q("The standard design uses?", ["An auxiliary min stack", "A heap", "Sorting"], 0, "Parallel minima."),
      Q("All operations are?", ["O(1)", "O(n)", "O(log n)"], 0, "Including getMin."),
      Q("Each push also stores?", ["The current minimum", "The maximum", "The index"], 0, "Running min."),
      Q("On pop, the min stack?", ["Pops too, staying consistent", "Is rebuilt", "Is sorted"], 0, "Kept in sync."),
      Q("Space complexity?", ["O(n)", "O(1)", "O(log n)"], 0, "Two stacks."),
      Q("An alternative stores?", ["The min encoded with each value", "A heap of all values", "A sorted list"], 0, "Still O(1) getMin.")
    ]
  },
  "problem_0090": {
    description: "Design a stack supporting push, pop, top, peekMax (view the maximum), and popMax (remove the maximum).",
    example: { input: "push 5, push 1; popMax", output: "removes 5", why: "the maximum element is removed" },
    quizzes: [
      Q("peekMax runs in?", ["O(1)", "O(n)", "O(log n)"], 0, "Track the max like MinStack."),
      Q("popMax is harder because?", ["The max may be buried in the stack", "It is the top always", "It is random"], 0, "Needs extra work."),
      Q("A simple popMax uses?", ["A second (buffer) stack to dig it out", "Sorting", "A queue"], 0, "O(n) in the basic design."),
      Q("push/top cost?", ["O(1)", "O(n)", "O(log n)"], 0, "Standard stack ops."),
      Q("Space complexity?", ["O(n)", "O(1)", "O(log n)"], 0, "Auxiliary structure."),
      Q("It resembles?", ["Min Stack, with an added popMax", "A plain queue", "A trie"], 0, "Extended design."),
      Q("An advanced design gives popMax in?", ["O(log n) with a balanced structure", "O(1) always", "O(n^2)"], 0, "Tree map + doubly linked list.")
    ]
  },
  "problem_0091": {
    description: "Implement a FIFO queue using two stacks, supporting push, pop, peek, and empty.",
    example: { input: "push 1, push 2; pop", output: "1", why: "FIFO order via two stacks" },
    quizzes: [
      Q("How many stacks are used?", ["Two (an 'in' and an 'out')", "One", "Three"], 0, "Transfer between them."),
      Q("Amortized cost per operation?", ["O(1)", "O(n) always", "O(log n)"], 0, "Each element moves at most twice."),
      Q("You transfer elements when?", ["The 'out' stack is empty", "On every push", "Never"], 0, "Lazy transfer."),
      Q("The ordering achieved is?", ["FIFO", "LIFO", "Sorted"], 0, "Queue behavior."),
      Q("Reversing happens via?", ["Moving items to the second stack", "Sorting", "A heap"], 0, "Reverses LIFO to FIFO."),
      Q("peek uses?", ["The top of the 'out' stack", "The 'in' stack top", "The min"], 0, "Front of the queue."),
      Q("Space complexity?", ["O(n)", "O(1)", "O(log n)"], 0, "Two stacks.")
    ]
  },
  "problem_0092": {
    description: "Implement a LIFO stack using queues, supporting push, pop, top, and empty.",
    example: { input: "push 1, push 2; pop", output: "2", why: "LIFO via queue rotation" },
    quizzes: [
      Q("A common design makes which op costly?", ["push (rotate the queue)", "Neither", "Both equally"], 0, "So pop stays O(1)."),
      Q("Rotating the queue on push achieves?", ["LIFO order", "FIFO order", "Sorted order"], 0, "Newest at the front."),
      Q("How many queues are needed?", ["One is enough (or two)", "Three", "None"], 0, "Single-queue works."),
      Q("The costly operation is?", ["O(n)", "O(1)", "O(log n)"], 0, "The rotation."),
      Q("top returns?", ["The front after rotation", "The rear", "The min"], 0, "Most recently pushed."),
      Q("Space complexity?", ["O(n)", "O(1)", "O(log n)"], 0, "The queue(s)."),
      Q("The other operation is?", ["O(1)", "O(n)", "O(log n)"], 0, "Only one op is costly.")
    ]
  },
  "problem_0093": {
    description: "Design a stack with a fixed maximum size plus an increment(k, val) operation that adds val to the bottom-most k elements.",
    example: { input: "push 1, push 2; increment(2, 100)", output: "stack becomes [101, 102]", why: "the bottom 2 elements increase by 100" },
    quizzes: [
      Q("Efficient increment uses?", ["A lazy increments array", "Re-adding to each element", "Sorting"], 0, "Defer the work to pop."),
      Q("push and pop cost?", ["O(1)", "O(n)", "O(log n)"], 0, "Constant time."),
      Q("increment cost with the lazy trick?", ["O(1)", "O(k)", "O(n)"], 0, "Record it at index k-1."),
      Q("The increment is applied?", ["On pop (and carried down)", "Immediately to all", "Never"], 0, "Lazy propagation."),
      Q("A fixed max size is?", ["Enforced on push", "Ignored", "Dynamic"], 0, "Bounded capacity."),
      Q("Space complexity?", ["O(n)", "O(1)", "O(log n)"], 0, "Stack + lazy array."),
      Q("The lazy trick avoids?", ["O(k) work per increment", "Using a stack", "Sorting"], 0, "Constant-time increments.")
    ]
  },
  "prob_sg_1": {
    description: "Remove k digits from a number string so the resulting number is the smallest possible (no leading zeros in the output, except '0').",
    example: { input: 'num = "1432219", k = 3', output: '"1219"', why: "greedily drop larger earlier digits" },
    quizzes: [
      Q("Technique?", ["Monotonic stack + greedy", "Sorting", "Binary search"], 0, "Pop larger previous digits."),
      Q("You pop a previous digit when?", ["It is larger than the current and budget remains", "It is smaller", "Always"], 0, "Smaller number results."),
      Q("Time complexity?", ["O(n)", "O(n^2)", "O(n log n)"], 0, "Each digit pushed/popped once."),
      Q("Leftover removals are taken from?", ["The end of the stack", "The front", "Nowhere"], 0, "Drop trailing digits."),
      Q("Leading zeros are?", ["Stripped", "Kept", "Doubled"], 0, "Clean the result."),
      Q("Space complexity?", ["O(n)", "O(1)", "O(log n)"], 0, "The stack."),
      Q("Greedy here is?", ["Optimal", "Approximate", "Wrong"], 0, "Produces the smallest number.")
    ]
  },
  "prob_sg_2": {
    description: "Remove duplicate letters so that every letter appears exactly once and the result is the lexicographically smallest possible.",
    example: { input: '"bcabc"', output: '"abc"', why: "smallest arrangement with each letter once" },
    quizzes: [
      Q("Technique?", ["Monotonic stack + greedy with last-occurrence", "Sorting", "A heap"], 0, "Pop if it appears later."),
      Q("You pop the top when?", ["It is larger and occurs again later", "It is smaller", "Always"], 0, "Can re-add it later."),
      Q("A 'seen' set prevents?", ["Adding a letter already in the result", "Sorting", "Overflow"], 0, "Each letter once."),
      Q("Time complexity?", ["O(n)", "O(n^2)", "O(n log n)"], 0, "Linear with 26 letters."),
      Q("Each letter appears?", ["Exactly once", "At most twice", "Any number of times"], 0, "Deduplicated."),
      Q("The result is?", ["Lexicographically smallest", "Sorted", "Reversed"], 0, "The greedy goal."),
      Q("Space complexity?", ["O(1) (26 letters)", "O(n)", "O(n^2)"], 0, "Fixed alphabet.")
    ]
  },
  "prob_sg_3": {
    description: "Return the lexicographically smallest subsequence that contains every distinct character of the string exactly once.",
    example: { input: '"cdadabcc"', output: '"adbc"', why: "smallest distinct-character subsequence" },
    quizzes: [
      Q("This is essentially?", ["Remove Duplicate Letters", "Two Sum", "Merge Sort"], 0, "Same greedy stack problem."),
      Q("Technique?", ["Monotonic stack + greedy", "Sorting", "A heap"], 0, "Pop larger letters seen later."),
      Q("Time complexity?", ["O(n)", "O(n^2)", "O(n log n)"], 0, "Linear with a fixed alphabet."),
      Q("Last-occurrence info guides?", ["Whether it is safe to pop a letter", "Sorting", "Counting"], 0, "Can we re-add it later?"),
      Q("Each distinct character appears?", ["Exactly once", "Twice", "Any number of times"], 0, "A subsequence of distincts."),
      Q("The result is?", ["Lexicographically smallest", "Sorted", "Reversed"], 0, "Greedy objective."),
      Q("Space complexity?", ["O(1) (fixed alphabet)", "O(n)", "O(n^2)"], 0, "26 letters.")
    ]
  },
  "prob_sg_4": {
    description: "Given two digit arrays, build the maximum number of a given length k by preserving relative order within each array and merging them.",
    example: { input: "nums1 = [3,4,6,5], nums2 = [9,1,2,5,8,3], k = 5", output: "[9,8,6,5,3]", why: "best split and merge of maximal subsequences" },
    quizzes: [
      Q("The split idea is?", ["Take i digits from one, k-i from the other", "All from one", "Random split"], 0, "Try each split."),
      Q("The best subsequence of a given length uses?", ["A monotonic stack", "Sorting", "A heap"], 0, "Maximal subsequence."),
      Q("Merging two candidate sequences is?", ["Greedy by lexicographic comparison", "Random", "Sorting"], 0, "Pick the better front."),
      Q("Relative order within each array is?", ["Preserved", "Reversed", "Sorted"], 0, "A subsequence constraint."),
      Q("You try how many splits?", ["All valid i values", "Only one", "Two"], 0, "Then keep the best merge."),
      Q("The problem combines?", ["Monotonic stack + greedy merge", "DP + BFS", "A heap only"], 0, "Two subproblems."),
      Q("Comparisons are?", ["Lexicographic between candidates", "By length", "By sum"], 0, "Pick the larger number.")
    ]
  },
  "prob_sg_5": {
    description: "Remove the minimum number of parentheses so the string becomes valid, returning any valid result.",
    example: { input: '"a)b(c)d"', output: '"ab(c)d"', why: "remove the stray ')'" },
    quizzes: [
      Q("Technique?", ["A stack of open-bracket indices", "Sorting", "A heap"], 0, "Mark unmatched ones."),
      Q("An unmatched ')' is?", ["Marked for removal", "Kept", "Doubled"], 0, "No opener to match."),
      Q("Leftover '(' indices are?", ["Removed at the end", "Kept", "Sorted"], 0, "Unmatched openers."),
      Q("Time complexity?", ["O(n)", "O(n^2)", "O(n log n)"], 0, "A couple of passes."),
      Q("The result is built by?", ["Skipping the marked indices", "Sorting", "Reversing"], 0, "Keep the rest."),
      Q("The number removed is?", ["Minimum", "Maximum", "Fixed"], 0, "Only the unmatched ones."),
      Q("Space complexity?", ["O(n)", "O(1)", "O(log n)"], 0, "Index tracking.")
    ]
  },
  "problem_0094": {
    description: "Reverse a stack using recursion and an insert-at-bottom helper, without using another explicit stack.",
    example: { input: "[1,2,3]", output: "[3,2,1]", why: "each popped element is inserted at the bottom" },
    quizzes: [
      Q("The method is?", ["Pop all, insert each at the bottom", "Sort", "Use a second stack"], 0, "Recursion only."),
      Q("Time complexity?", ["O(n^2)", "O(n)", "O(log n)"], 0, "insert-at-bottom is O(n), done n times."),
      Q("It relies on?", ["The call stack", "A queue", "A heap"], 0, "No explicit structure."),
      Q("The helper is?", ["insert-at-bottom", "merge", "partition"], 0, "Places an item under the rest."),
      Q("Base case?", ["Empty stack", "One element", "Full stack"], 0, "Stop recursion."),
      Q("Recursion depth?", ["O(n)", "O(log n)", "O(1)"], 0, "One frame per element."),
      Q("Auxiliary data structures?", ["None", "A stack", "An array"], 0, "Only recursion.")
    ]
  },
  "problem_0095": {
    description: "Insert an element at the bottom of a stack using recursion.",
    example: { input: "stack [1,2], insert 0 at the bottom", output: "[0,1,2]", why: "recurse to the bottom, then push" },
    quizzes: [
      Q("The approach is?", ["Recurse until empty, then push, then restore", "Sort", "Use a queue"], 0, "Reach the bottom first."),
      Q("Time complexity?", ["O(n)", "O(n^2)", "O(log n)"], 0, "Pop and push each once."),
      Q("Recursion depth?", ["O(n)", "O(log n)", "O(1)"], 0, "Frames hold popped items."),
      Q("Base case?", ["Empty stack -> push the element", "One element", "Full stack"], 0, "Bottom reached."),
      Q("After recursing, you?", ["Push the saved elements back", "Sort", "Discard them"], 0, "Restore the stack."),
      Q("This is a building block for?", ["Reversing a stack recursively", "Merge sort", "Dijkstra"], 0, "Used by reverse-stack."),
      Q("Auxiliary structures?", ["None (recursion only)", "A stack", "A heap"], 0, "The call stack suffices.")
    ]
  },
  "problem_0096": {
    description: "Delete the middle element of a stack using recursion, preserving the order of the remaining elements.",
    example: { input: "[1,2,3,4,5]", output: "[1,2,4,5]", why: "the middle element is removed" },
    quizzes: [
      Q("The approach is?", ["Recurse to the middle, then remove it", "Sort", "Use a heap"], 0, "Pop down to the middle."),
      Q("The middle index is?", ["size / 2", "0", "size - 1"], 0, "Half the size."),
      Q("Time complexity?", ["O(n)", "O(n^2)", "O(log n)"], 0, "Each element handled once."),
      Q("Recursion depth?", ["O(n)", "O(log n)", "O(1)"], 0, "Frames hold popped items."),
      Q("The pattern is?", ["Pop, recurse, push back (except the middle)", "Sort then remove", "Merge"], 0, "Rebuild around the middle."),
      Q("The base case is?", ["Reaching the middle index", "Empty stack", "Size 1"], 0, "Remove there."),
      Q("Other elements' order is?", ["Preserved", "Reversed", "Sorted"], 0, "Only the middle changes.")
    ]
  },

  // ================= Linked List =================
  "problem_0097": {
    description: "Given the head of a linked list and a value, return whether the value exists in the list.",
    example: { input: "1 -> 2 -> 3, value = 2", output: "true", why: "2 is present" },
    quizzes: [
      Q("How do you search a linked list?", ["Traverse node by node", "Binary search", "Hashing the indices"], 0, "No random access."),
      Q("Time complexity?", ["O(n)", "O(log n)", "O(1)"], 0, "Linear scan."),
      Q("Space complexity?", ["O(1)", "O(n)", "O(log n)"], 0, "Just a pointer."),
      Q("You compare?", ["node.val with the value", "indices", "lengths"], 0, "Value match."),
      Q("The traversal ends at?", ["A null next pointer", "The middle", "Index 0"], 0, "End of list."),
      Q("Random access by index is?", ["Not available (O(n))", "O(1)", "O(log n)"], 0, "Unlike arrays."),
      Q("Found vs not found returns?", ["true / false", "an index / -1", "the node always"], 0, "A boolean here.")
    ]
  },
  "problem_0098": {
    description: "Insert a new node at the head, tail, or a given position in a singly linked list, updating the next pointers.",
    example: { input: "1 -> 3, insert 2 at position 1", output: "1 -> 2 -> 3", why: "linked after the head" },
    quizzes: [
      Q("Insert at head is?", ["O(1)", "O(n)", "O(log n)"], 0, "Just repoint the head."),
      Q("Insert at tail without a tail pointer is?", ["O(n)", "O(1)", "O(log n)"], 0, "Walk to the end."),
      Q("Insert at the n-th position requires?", ["Reaching node n-1", "Sorting", "A heap"], 0, "Relink there."),
      Q("A dummy head helps with?", ["Head insertions / edge cases", "Sorting", "Memory"], 0, "Uniform handling."),
      Q("The key operation is?", ["Relinking next pointers", "Copying values", "Sorting"], 0, "Pointer surgery."),
      Q("Extra space per insert?", ["O(1)", "O(n)", "O(log n)"], 0, "One node."),
      Q("Relative order is?", ["Preserved", "Reversed", "Sorted"], 0, "Only one node added.")
    ]
  },
  "problem_0099": {
    description: "Delete the head, tail, or n-th node of a singly linked list by relinking the preceding node's next pointer.",
    example: { input: "1 -> 2 -> 3, delete tail", output: "1 -> 2", why: "the last node is removed" },
    quizzes: [
      Q("Delete head is?", ["O(1)", "O(n)", "O(log n)"], 0, "Advance the head."),
      Q("Delete tail (singly list) is?", ["O(n)", "O(1)", "O(log n)"], 0, "Need the node before it."),
      Q("Deleting the n-th node needs?", ["The previous node", "The next node", "The tail"], 0, "To relink around it."),
      Q("A dummy head helps when?", ["Deleting the head", "Sorting", "Counting"], 0, "No head special case."),
      Q("The core step is?", ["prev.next = node.next", "swap values", "sort"], 0, "Skip the node."),
      Q("Space complexity?", ["O(1)", "O(n)", "O(log n)"], 0, "Pointer update."),
      Q("Empty-list deletion needs?", ["A null check", "Sorting", "A heap"], 0, "Guard against null.")
    ]
  },
  "problem_0100": {
    description: "Design a linked list supporting get(index), addAtHead, addAtTail, addAtIndex, and deleteAtIndex.",
    example: { input: "addAtHead(1); addAtTail(3); get(1)", output: "3", why: "index 1 is the tail" },
    quizzes: [
      Q("get(index) costs?", ["O(n)", "O(1)", "O(log n)"], 0, "Walk to the index."),
      Q("addAtHead costs?", ["O(1)", "O(n)", "O(log n)"], 0, "Repoint the head."),
      Q("addAtTail is O(1) when?", ["You keep a tail pointer", "Never", "Always"], 0, "Otherwise O(n)."),
      Q("A dummy head simplifies?", ["Index and head edge cases", "Sorting", "Memory"], 0, "Uniform insert/delete."),
      Q("It can be implemented as?", ["Singly or doubly linked", "A heap", "A trie"], 0, "Either design."),
      Q("Invalid indices should be?", ["Bounds-checked", "Ignored silently", "Sorted"], 0, "Guard the range."),
      Q("Space complexity?", ["O(n)", "O(1)", "O(log n)"], 0, "One node per element.")
    ]
  },
  "problem_0101": {
    description: "Group all nodes at odd positions together, followed by the nodes at even positions, preserving their relative order. Position is by index, not value.",
    example: { input: "1 -> 2 -> 3 -> 4 -> 5", output: "1 -> 3 -> 5 -> 2 -> 4", why: "odd-indexed nodes then even-indexed" },
    quizzes: [
      Q("Technique?", ["Two chains (odd and even) spliced together", "Sorting", "A heap"], 0, "Separate then join."),
      Q("Time complexity?", ["O(n)", "O(n^2)", "O(n log n)"], 0, "One pass."),
      Q("Space complexity?", ["O(1)", "O(n)", "O(log n)"], 0, "In place."),
      Q("Grouping is by?", ["Position (index)", "Value", "Parity of value"], 0, "Not the node values."),
      Q("You connect?", ["The odd tail to the even head", "The heads", "Nothing"], 0, "Join the two chains."),
      Q("Relative order within each group is?", ["Preserved", "Reversed", "Sorted"], 0, "Stable."),
      Q("Two running pointers track?", ["The odd and even chain ends", "Min and max", "Prev and next only"], 0, "Build both chains.")
    ]
  },
  "problem_1002": {
    description: "Return the node where two singly linked lists intersect, or null if they do not. Intersection is by reference, not value.",
    example: { input: "two lists sharing a tail", output: "the shared node", why: "they merge there" },
    quizzes: [
      Q("The two-pointer trick switches?", ["Each pointer to the other list's head at the end", "Values", "Directions"], 0, "They align after switching."),
      Q("Time complexity?", ["O(n + m)", "O(nm)", "O(n log m)"], 0, "A couple of passes."),
      Q("Space complexity?", ["O(1)", "O(n)", "O(log n)"], 0, "Two pointers."),
      Q("An alternative aligns by?", ["The length difference", "Sorting", "A heap"], 0, "Advance the longer list first."),
      Q("No intersection yields?", ["null", "the last node", "the head"], 0, "They meet at null."),
      Q("Intersection is determined by?", ["Reference (same node)", "Equal values", "Equal length"], 0, "The actual shared node."),
      Q("After exhausting one list, a pointer?", ["Jumps to the other head", "Stops", "Reverses"], 0, "Equalizes traversal length.")
    ]
  },
  "problem_0102": {
    description: "Return the middle node of a linked list. For an even length, return the second of the two middle nodes.",
    example: { input: "1 -> 2 -> 3 -> 4 -> 5", output: "node 3", why: "the middle node" },
    quizzes: [
      Q("Technique?", ["Fast and slow pointers", "Sorting", "A heap"], 0, "Slow lands in the middle."),
      Q("Time complexity?", ["O(n)", "O(n^2)", "O(log n)"], 0, "One pass."),
      Q("Space complexity?", ["O(1)", "O(n)", "O(log n)"], 0, "Two pointers."),
      Q("The fast pointer moves?", ["Two steps per iteration", "One step", "Three steps"], 0, "Double speed."),
      Q("When fast reaches the end, slow is at?", ["The middle", "The head", "The tail"], 0, "Half the distance."),
      Q("For even length, which middle is returned?", ["The second", "The first", "Either"], 0, "By convention here."),
      Q("Number of passes?", ["One", "Two", "n"], 0, "Single traversal.")
    ]
  },
  "problem_0103": {
    description: "Determine whether a linked list contains a cycle.",
    example: { input: "a list whose tail points back into it", output: "true", why: "a cycle exists" },
    quizzes: [
      Q("Technique?", ["Floyd's fast/slow pointers", "Sorting", "Binary search"], 0, "They meet inside a cycle."),
      Q("Time complexity?", ["O(n)", "O(n^2)", "O(log n)"], 0, "Linear."),
      Q("Space complexity?", ["O(1)", "O(n)", "O(log n)"], 0, "Two pointers."),
      Q("If there is no cycle, the fast pointer?", ["Reaches null", "Loops forever", "Stops at the middle"], 0, "Ends the traversal."),
      Q("A hash-set approach uses?", ["O(n) space", "O(1) space", "O(log n)"], 0, "Store visited nodes."),
      Q("The pointers meet because?", ["The speed gap closes the loop", "The list is sorted", "n is even"], 0, "Fast laps slow."),
      Q("Fast moves how many steps?", ["Two", "One", "Three"], 0, "Slow moves one.")
    ]
  },
  "problem_0104": {
    description: "Return the node where the cycle begins, or null if there is no cycle.",
    example: { input: "a list with a cycle", output: "the cycle's entry node", why: "where it loops back" },
    quizzes: [
      Q("After the fast/slow meeting, you?", ["Reset one pointer to head, move both at speed 1", "Sort", "Use a heap"], 0, "They meet at the entry."),
      Q("The entry is found because?", ["Distance math aligns the pointers", "The list is sorted", "n is even"], 0, "Floyd's result."),
      Q("Time complexity?", ["O(n)", "O(n^2)", "O(log n)"], 0, "Linear."),
      Q("Space complexity?", ["O(1)", "O(n)", "O(log n)"], 0, "Two pointers."),
      Q("If there is no cycle, return?", ["null", "the head", "the tail"], 0, "No entry exists."),
      Q("This builds on?", ["Floyd's cycle detection", "Merge sort", "Dijkstra"], 0, "Same meeting point."),
      Q("Both pointers in the second phase move?", ["One step each", "At different speeds", "Backward"], 0, "Equal speed to the entry.")
    ]
  },
  "problem_0105": {
    description: "Remove the n-th node from the end of the list and return its head.",
    example: { input: "1 -> 2 -> 3 -> 4 -> 5, n = 2", output: "1 -> 2 -> 3 -> 5", why: "the 4th node is removed" },
    quizzes: [
      Q("Technique?", ["Two pointers with a gap of n", "Sorting", "A heap"], 0, "Then move both together."),
      Q("Time complexity?", ["O(n) (one pass)", "O(n^2)", "O(log n)"], 0, "Single traversal."),
      Q("A dummy head helps when?", ["Removing the head node", "Sorting", "Counting"], 0, "Uniform removal."),
      Q("You first advance the fast pointer?", ["n steps ahead", "to the middle", "to the end"], 0, "Create the gap."),
      Q("Then move both until?", ["Fast reaches the end", "They meet", "Slow reaches n"], 0, "Slow lands before the target."),
      Q("Space complexity?", ["O(1)", "O(n)", "O(log n)"], 0, "Two pointers."),
      Q("The removal step is?", ["prev.next = prev.next.next", "swap values", "sort"], 0, "Skip the node.")
    ]
  },
  "problem_0106": {
    description: "Reverse a singly linked list and return the new head.",
    example: { input: "1 -> 2 -> 3", output: "3 -> 2 -> 1", why: "links reversed" },
    quizzes: [
      Q("Iterative reversal uses?", ["Three pointers (prev, cur, next)", "One pointer", "A heap"], 0, "Remember next before relinking."),
      Q("Time complexity?", ["O(n)", "O(n^2)", "O(log n)"], 0, "One pass."),
      Q("Iterative space complexity?", ["O(1)", "O(n)", "O(log n)"], 0, "A few pointers."),
      Q("It returns?", ["The new head (old tail)", "The old head", "null"], 0, "prev ends on the last node."),
      Q("The recursive version uses?", ["O(n) stack space", "O(1) space", "A heap"], 0, "One frame per node."),
      Q("Each step flips?", ["cur.next to point to prev", "the value", "nothing"], 0, "Reverse the link."),
      Q("Number of passes?", ["One", "Two", "n"], 0, "Single traversal.")
    ]
  },
  "problem_0107": {
    description: "Reverse the nodes of the list from position m to position n (1-based), in a single pass.",
    example: { input: "1 -> 2 -> 3 -> 4 -> 5, m = 2, n = 4", output: "1 -> 4 -> 3 -> 2 -> 5", why: "the middle segment is reversed" },
    quizzes: [
      Q("You reverse only?", ["The segment between m and n", "The whole list", "The first half"], 0, "A sublist."),
      Q("Time complexity?", ["O(n)", "O(n^2)", "O(log n)"], 0, "One pass."),
      Q("Space complexity?", ["O(1)", "O(n)", "O(log n)"], 0, "Pointer surgery."),
      Q("A dummy head helps when?", ["m = 1 (reversing from the head)", "Sorting", "Counting"], 0, "Edge case."),
      Q("After reversing you must?", ["Reconnect the segment boundaries", "Sort", "Nothing"], 0, "Stitch it back."),
      Q("Number of passes?", ["One", "Two", "n"], 0, "Single traversal."),
      Q("The tricky part is?", ["Careful pointer reconnection", "Sorting", "Hashing"], 0, "Boundary links.")
    ]
  },
  "problem_0108": {
    description: "Determine whether a singly linked list reads the same forwards and backwards.",
    example: { input: "1 -> 2 -> 2 -> 1", output: "true", why: "it is a palindrome" },
    quizzes: [
      Q("An O(1)-space approach?", ["Find middle, reverse the second half, compare", "Sort", "A heap"], 0, "Compare the two halves."),
      Q("Time complexity?", ["O(n)", "O(n^2)", "O(log n)"], 0, "Linear."),
      Q("The middle is found with?", ["Fast/slow pointers", "Binary search", "Sorting"], 0, "Two-speed traversal."),
      Q("A simpler (O(n) space) method uses?", ["A stack or array of values", "A heap", "A trie"], 0, "Then compare."),
      Q("After comparing, you may?", ["Restore the reversed half", "Delete it", "Sort it"], 0, "Leave the list intact."),
      Q("Space of the optimal method?", ["O(1)", "O(n)", "O(log n)"], 0, "In-place reversal."),
      Q("You compare?", ["First half vs reversed second half", "Values with indices", "Lengths"], 0, "Symmetric check.")
    ]
  },
  "problem_1010": {
    description: "In an even-length list, the i-th node and the (n-1-i)-th node are twins. Return the maximum twin sum.",
    example: { input: "5 -> 4 -> 2 -> 1", output: "6", why: "twin sums 5+1 and 4+2; the max is 6" },
    quizzes: [
      Q("Technique?", ["Find middle, reverse the second half, pair up", "Sorting", "A heap"], 0, "Pair symmetric nodes."),
      Q("Twins are?", ["Symmetric nodes (i and n-1-i)", "Adjacent nodes", "Equal-value nodes"], 0, "Mirror positions."),
      Q("Time complexity?", ["O(n)", "O(n^2)", "O(log n)"], 0, "One pass after reversal."),
      Q("Space complexity?", ["O(1)", "O(n)", "O(log n)"], 0, "In place."),
      Q("The answer is?", ["The maximum paired sum", "The total sum", "The median"], 0, "Over all twins."),
      Q("The list length is?", ["Even (guaranteed)", "Odd", "Prime"], 0, "Every node has a twin."),
      Q("Pairing walks?", ["Both halves inward/together", "Only forward", "Randomly"], 0, "After reversing one half.")
    ]
  },
  "problem_0109": {
    description: "Reverse the nodes of the list k at a time. Nodes that are left over (fewer than k) remain in their original order.",
    example: { input: "1 -> 2 -> 3 -> 4 -> 5, k = 2", output: "2 -> 1 -> 4 -> 3 -> 5", why: "pairs reversed, last node kept" },
    quizzes: [
      Q("You reverse the list in blocks of?", ["k nodes", "2 nodes always", "n nodes"], 0, "Group by k."),
      Q("Before reversing a block you?", ["Check that k nodes remain", "Sort", "Count the whole list"], 0, "Leftover stays as is."),
      Q("Time complexity?", ["O(n)", "O(n^2)", "O(n log n)"], 0, "Each node handled once."),
      Q("Iterative space complexity?", ["O(1)", "O(n)", "O(log n)"], 0, "Pointer relinking."),
      Q("Leftover nodes (< k) are?", ["Left unchanged", "Reversed anyway", "Dropped"], 0, "As specified."),
      Q("Between blocks you must?", ["Reconnect the boundaries", "Sort", "Nothing"], 0, "Careful linking."),
      Q("With k = 2 this becomes?", ["Swap Nodes in Pairs", "Merge Two Lists", "Sort List"], 0, "A special case.")
    ]
  },
  "problem_0110": {
    description: "Swap every two adjacent nodes and return the head, without modifying node values.",
    example: { input: "1 -> 2 -> 3 -> 4", output: "2 -> 1 -> 4 -> 3", why: "adjacent pairs swapped" },
    quizzes: [
      Q("You swap?", ["The nodes themselves (pointers)", "The values", "Nothing"], 0, "Value-swap is disallowed."),
      Q("Time complexity?", ["O(n)", "O(n^2)", "O(log n)"], 0, "One pass."),
      Q("Space complexity?", ["O(1)", "O(n)", "O(log n)"], 0, "Pointer relinking."),
      Q("A dummy head helps because?", ["The head changes", "Sorting", "Counting"], 0, "First pair swap."),
      Q("Per pair you relink?", ["Three pointers", "One pointer", "Five pointers"], 0, "prev, first, second."),
      Q("This is a special case of?", ["Reverse Nodes in k-Group (k=2)", "Merge Lists", "Sort List"], 0, "Blocks of 2."),
      Q("Number of passes?", ["One", "Two", "n"], 0, "Single traversal.")
    ]
  },
  "problem_0111": {
    description: "Rotate the list to the right by k places.",
    example: { input: "1 -> 2 -> 3 -> 4 -> 5, k = 2", output: "4 -> 5 -> 1 -> 2 -> 3", why: "the last two nodes move to the front" },
    quizzes: [
      Q("A clean approach is to?", ["Form a ring, then break at the right point", "Sort", "Use a heap"], 0, "Connect tail to head, then cut."),
      Q("k is reduced using?", ["k mod length", "k * length", "k - 1"], 0, "Rotations repeat every length."),
      Q("Time complexity?", ["O(n)", "O(n^2)", "O(log n)"], 0, "One pass to find length, then rotate."),
      Q("The new tail is at index?", ["length - k%length - 1", "0", "k"], 0, "Cut after it."),
      Q("Space complexity?", ["O(1)", "O(n)", "O(log n)"], 0, "Pointer relinking."),
      Q("If k > length you?", ["Take k mod length", "Return the list unchanged", "Error"], 0, "Avoid redundant rotations."),
      Q("Rotating right by k means?", ["The last k nodes come to the front", "The first k go to the back", "Reverse"], 0, "Right rotation.")
    ]
  },
  "problem_0112": {
    description: "Merge two sorted linked lists into one sorted list by splicing their nodes.",
    example: { input: "1 -> 3 and 2 -> 4", output: "1 -> 2 -> 3 -> 4", why: "sorted merge" },
    quizzes: [
      Q("A dummy node helps by?", ["Simplifying the build of the result", "Sorting", "Saving memory"], 0, "Placeholder start."),
      Q("Each step attaches?", ["The smaller current head", "The larger head", "A random node"], 0, "Keeps it sorted."),
      Q("Time complexity?", ["O(n + m)", "O(nm)", "O(n log m)"], 0, "One pass."),
      Q("Space complexity?", ["O(1)", "O(n)", "O(log n)"], 0, "Relink nodes."),
      Q("The leftover list is?", ["Attached at the end", "Discarded", "Sorted"], 0, "One list exhausts first."),
      Q("Using <= makes the merge?", ["Stable", "Unstable", "Faster"], 0, "Equal values keep order."),
      Q("The technique is?", ["Two pointers", "A heap", "Recursion only"], 0, "Walk both lists.")
    ]
  },
  "problem_0113": {
    description: "Merge k sorted linked lists into one sorted list.",
    example: { input: "[1->4, 2->6, 0->3]", output: "0 -> 1 -> 2 -> 3 -> 4 -> 6", why: "all merged in order" },
    quizzes: [
      Q("An efficient approach uses?", ["A min-heap of the current heads", "Sorting all values", "Two pointers"], 0, "Pull the smallest each time."),
      Q("Time complexity (N total nodes)?", ["O(N log k)", "O(N log N)", "O(N^2)"], 0, "Heap ops are O(log k)."),
      Q("The heap holds at most?", ["k nodes", "N nodes", "2 nodes"], 0, "One per list."),
      Q("After popping the smallest you?", ["Push its next node", "Stop", "Sort"], 0, "Advance that list."),
      Q("An alternative is?", ["Divide-and-conquer pairwise merging", "A single pointer", "A trie"], 0, "Also O(N log k)."),
      Q("Space complexity?", ["O(k)", "O(N)", "O(1)"], 0, "The heap of heads."),
      Q("Versus concatenate-then-sort O(N log N), it is?", ["Better when k << N", "Always worse", "The same"], 0, "log k < log N.")
    ]
  },
  "problem_0114": {
    description: "Sort a linked list in O(n log n) time, ideally with O(1) extra space.",
    example: { input: "4 -> 2 -> 1 -> 3", output: "1 -> 2 -> 3 -> 4", why: "merge sort on a list" },
    quizzes: [
      Q("The standard algorithm is?", ["Merge sort", "Quick sort", "Heap sort"], 0, "Natural for lists."),
      Q("Time complexity?", ["O(n log n)", "O(n)", "O(n^2)"], 0, "Guaranteed."),
      Q("The middle is found with?", ["Fast/slow pointers", "Binary search", "A heap"], 0, "Split the list."),
      Q("The combine step is?", ["Merging two sorted halves", "Partitioning", "Hashing"], 0, "Merge."),
      Q("Top-down merge sort uses?", ["O(log n) stack space", "O(n) space", "O(1) space"], 0, "Recursion depth."),
      Q("Bottom-up merge sort uses?", ["O(1) space", "O(n) space", "O(n log n) space"], 0, "Iterative merging."),
      Q("Merge sort here is?", ["Stable", "Unstable", "In-order only"], 0, "Preserves equal-value order.")
    ]
  },
  "problem_0115": {
    description: "Reorder the list in place so it becomes L0 -> Ln -> L1 -> Ln-1 -> L2 -> ..., modifying node links only.",
    example: { input: "1 -> 2 -> 3 -> 4", output: "1 -> 4 -> 2 -> 3", why: "interleave from both ends" },
    quizzes: [
      Q("The three sub-steps are?", ["Find middle, reverse second half, merge alternately", "Sort, reverse, merge", "Hash, sort, merge"], 0, "Combine three techniques."),
      Q("Time complexity?", ["O(n)", "O(n^2)", "O(n log n)"], 0, "Linear."),
      Q("Space complexity?", ["O(1)", "O(n)", "O(log n)"], 0, "In place."),
      Q("The middle is found via?", ["Fast/slow pointers", "Binary search", "Sorting"], 0, "Two-speed traversal."),
      Q("The merge step interleaves?", ["One node from each half alternately", "All of one then the other", "Sorted order"], 0, "Front and reversed-back."),
      Q("Node values are?", ["Unchanged (only links move)", "Swapped", "Sorted"], 0, "Pointer reorder."),
      Q("The second half is?", ["Reversed before merging", "Sorted", "Deleted"], 0, "To pull from the end.")
    ]
  },
  "problem_0116": {
    description: "Remove duplicate values from a sorted linked list so that each value appears only once.",
    example: { input: "1 -> 1 -> 2 -> 3 -> 3", output: "1 -> 2 -> 3", why: "duplicates removed, one copy kept" },
    quizzes: [
      Q("Because the list is sorted, duplicates are?", ["Adjacent", "Spread out", "At the end"], 0, "Easy to skip."),
      Q("The technique is?", ["A single pass skipping equal next nodes", "Sorting", "A hash set"], 0, "Relink past duplicates."),
      Q("Time complexity?", ["O(n)", "O(n^2)", "O(n log n)"], 0, "One pass."),
      Q("Space complexity?", ["O(1)", "O(n)", "O(log n)"], 0, "In place."),
      Q("You keep?", ["One copy of each value", "No copies", "All copies"], 0, "Distinct values remain."),
      Q("The comparison is?", ["node.val vs node.next.val", "indices", "lengths"], 0, "Adjacent equality."),
      Q("The relink step is?", ["node.next = node.next.next", "swap", "sort"], 0, "Skip the duplicate.")
    ]
  },
  "problem_1003": {
    description: "From a sorted linked list, remove all nodes that have duplicate values, leaving only the values that appear exactly once.",
    example: { input: "1 -> 2 -> 3 -> 3 -> 4", output: "1 -> 2 -> 4", why: "the duplicated 3s are removed entirely" },
    quizzes: [
      Q("Unlike the 'keep one' version, this?", ["Removes every node of a duplicated value", "Keeps one copy", "Sorts"], 0, "Delete the whole run."),
      Q("A dummy head is useful because?", ["The head itself may be a duplicate", "Sorting", "Counting"], 0, "Handle head runs."),
      Q("Time complexity?", ["O(n)", "O(n^2)", "O(n log n)"], 0, "One pass."),
      Q("Space complexity?", ["O(1)", "O(n)", "O(log n)"], 0, "In place."),
      Q("You skip?", ["Entire runs of equal values", "Only the second copy", "Nothing"], 0, "Remove all of them."),
      Q("The result contains?", ["Only values appearing once", "One copy of each", "All values"], 0, "Strictly unique."),
      Q("prev is advanced only when?", ["The current value is not duplicated", "Always", "Never"], 0, "Keep distinct nodes.")
    ]
  },
  "problem_1004": {
    description: "Partition the list so that all nodes with value less than x come before nodes with value >= x, preserving the original relative order within each part.",
    example: { input: "1 -> 4 -> 3 -> 2 -> 5 -> 2, x = 3", output: "1 -> 2 -> 2 -> 4 -> 3 -> 5", why: "smaller values first, order kept" },
    quizzes: [
      Q("Technique?", ["Build two lists (less and greater), then join", "Sorting", "A heap"], 0, "Two chains."),
      Q("Time complexity?", ["O(n)", "O(n^2)", "O(n log n)"], 0, "One pass."),
      Q("Space complexity?", ["O(1)", "O(n)", "O(log n)"], 0, "Relink, no copies."),
      Q("Relative order within each part is?", ["Preserved", "Reversed", "Sorted"], 0, "Stable partition."),
      Q("You then?", ["Concatenate the 'less' list before the 'greater' list", "Sort both", "Reverse"], 0, "Join the chains."),
      Q("Two dummy heads are used for?", ["The two partitions", "Sorting", "Counting"], 0, "Easy appends."),
      Q("The split condition is?", ["value < x goes to the first list", "value <= x", "value > x"], 0, "Strictly less than x.")
    ]
  },
  "problem_0117": {
    description: "Two numbers are stored as linked lists with digits in reverse order. Return their sum as a linked list, also in reverse order.",
    example: { input: "2 -> 4 -> 3 and 5 -> 6 -> 4", output: "7 -> 0 -> 8", why: "342 + 465 = 807" },
    quizzes: [
      Q("You add digits with?", ["A running carry", "Sorting", "A heap"], 0, "Column addition."),
      Q("Reverse-order storage makes it?", ["Easy (start from least significant)", "Harder", "Impossible"], 0, "Aligns the ones place first."),
      Q("Time complexity?", ["O(max(n, m))", "O(nm)", "O(n log m)"], 0, "One pass."),
      Q("A final carry?", ["Adds an extra node", "Is dropped", "Is an error"], 0, "E.g. 9+9 -> carry."),
      Q("A dummy head helps by?", ["Building the result cleanly", "Sorting", "Counting"], 0, "Placeholder start."),
      Q("The carry is?", ["sum / 10 (integer)", "sum % 10", "always 1"], 0, "Carried to the next digit."),
      Q("Space complexity?", ["O(max(n, m))", "O(1)", "O(log n)"], 0, "The result list.")
    ]
  },
  "problem_0118": {
    description: "Two numbers are stored with digits in forward (most-significant-first) order. Return their sum as a linked list in the same order.",
    example: { input: "7 -> 2 -> 4 -> 3 and 5 -> 6 -> 4", output: "7 -> 8 -> 0 -> 7", why: "7243 + 564 = 7807" },
    quizzes: [
      Q("To add from the least-significant end you?", ["Use two stacks (or reverse the lists)", "Sort", "Use a heap"], 0, "Reverse the order."),
      Q("Time complexity?", ["O(n + m)", "O(nm)", "O(n log m)"], 0, "Linear."),
      Q("You build the result by?", ["Prepending nodes (most significant last)", "Appending", "Sorting"], 0, "Reverse-build."),
      Q("The carry is handled?", ["As usual, across digits", "Ignored", "Only at the end"], 0, "Column addition."),
      Q("Stacks are used to?", ["Reverse the traversal order", "Sort", "Deduplicate"], 0, "Access least significant first."),
      Q("Space complexity?", ["O(n + m)", "O(1)", "O(log n)"], 0, "Stacks / result."),
      Q("Compared with Add Two Numbers I, this differs by?", ["Digit order (forward)", "The operation", "The base"], 0, "Most significant first.")
    ]
  },
  "problem_0119": {
    description: "For each node, return the value of the first node to its right that is strictly greater, or 0 if none exists.",
    example: { input: "2 -> 1 -> 5", output: "[5, 5, 0]", why: "next greater values" },
    quizzes: [
      Q("Technique?", ["A monotonic stack", "Sorting", "Binary search"], 0, "Same as array next-greater."),
      Q("Time complexity?", ["O(n)", "O(n^2)", "O(n log n)"], 0, "Each index pushed/popped once."),
      Q("It helps to first?", ["Convert the list to an array (or use index stack)", "Sort", "Reverse values"], 0, "For indexed access."),
      Q("When none exists, the value is?", ["0", "-1", "the node's value"], 0, "As specified."),
      Q("The stack is?", ["Decreasing", "Increasing", "Sorted ascending"], 0, "Pop on a greater value."),
      Q("You look for the next greater to the?", ["Right", "Left", "Both"], 0, "Forward in the list."),
      Q("Space complexity?", ["O(n)", "O(1)", "O(log n)"], 0, "Stack / array.")
    ]
  },
  "problem_0120": {
    description: "Remove every node that has a node with a strictly greater value anywhere to its right.",
    example: { input: "5 -> 2 -> 13 -> 3 -> 8", output: "13 -> 8", why: "nodes smaller than some later node are removed" },
    quizzes: [
      Q("A clean approach reverses the list and?", ["Keeps a running maximum", "Sorts", "Uses a heap"], 0, "Keep nodes >= all to the right."),
      Q("Equivalently you can use?", ["A monotonic (decreasing) stack", "Binary search", "A queue"], 0, "From the right."),
      Q("A node is kept if?", ["No later node is greater", "It is the smallest", "It is even"], 0, "It dominates its right side."),
      Q("Time complexity?", ["O(n)", "O(n^2)", "O(n log n)"], 0, "One pass."),
      Q("The resulting list is?", ["Non-increasing", "Sorted ascending", "Random"], 0, "Each node >= those after it."),
      Q("Space (stack version)?", ["O(n)", "O(1)", "O(log n)"], 0, "The stack."),
      Q("Reversing lets you?", ["Track the max seen so far from the right", "Sort faster", "Save memory"], 0, "Simple comparison.")
    ]
  },
  "problem_1005": {
    description: "Deep-copy a linked list where each node has a next pointer and an extra random pointer to any node in the list or null.",
    example: { input: "a list with random pointers", output: "an independent deep copy", why: "all next and random links are cloned" },
    quizzes: [
      Q("A straightforward approach uses?", ["A hash map from original node to its copy", "Sorting", "A heap"], 0, "Then wire the pointers."),
      Q("Time complexity?", ["O(n)", "O(n^2)", "O(n log n)"], 0, "A couple of passes."),
      Q("The hash-map approach space is?", ["O(n)", "O(1)", "O(log n)"], 0, "Stores the mapping."),
      Q("An O(1)-space trick?", ["Interleave cloned nodes, then split", "Sort", "Use a heap"], 0, "Weave copies into the list."),
      Q("Random pointers are set using?", ["The map (original.random -> copy)", "Sorting", "Indices"], 0, "Translate references."),
      Q("This produces a?", ["Deep copy (independent)", "Shallow copy", "The same list"], 0, "No shared nodes."),
      Q("Number of passes (map version)?", ["Two", "One", "n"], 0, "Create, then link.")
    ]
  },

  // ================= Heap / Priority Queue =================
  "problem_0155": {
    description: "Implement a priority queue that returns the highest- (or lowest-) priority element first, typically backed by a binary heap.",
    example: { input: "insert 3, 1, 2; poll (min-priority)", output: "1", why: "the smallest priority is served first" },
    quizzes: [
      Q("A priority queue is usually backed by?", ["A binary heap", "A sorted array always", "A hash map"], 0, "Heap gives log-time ops."),
      Q("Insert and poll cost?", ["O(log n)", "O(1)", "O(n)"], 0, "Sift up/down."),
      Q("Peek (top element) costs?", ["O(1)", "O(log n)", "O(n)"], 0, "The root."),
      Q("The ordering can be?", ["Min-priority or max-priority", "Only min", "Only max"], 0, "Depends on the comparator."),
      Q("A binary heap is stored as?", ["An array", "A linked list", "A BST"], 0, "Implicit tree."),
      Q("Restoring the heap property uses?", ["Sift up / sift down", "Sorting", "Hashing"], 0, "Bubble the element."),
      Q("Space complexity?", ["O(n)", "O(1)", "O(log n)"], 0, "Stores all elements.")
    ]
  },
  "problem_0156": {
    description: "Implement a min-heap supporting insert, getMin, and extractMin, keeping the smallest element at the root.",
    example: { input: "insert 5, 2, 8; extractMin", output: "2", why: "the minimum is at the root" },
    quizzes: [
      Q("In a min-heap, every parent is?", ["<= its children", ">= its children", "Equal to its children"], 0, "Heap order."),
      Q("getMin costs?", ["O(1)", "O(log n)", "O(n)"], 0, "The root."),
      Q("insert / extractMin cost?", ["O(log n)", "O(1)", "O(n)"], 0, "Sift operations."),
      Q("On insert you?", ["Add at the end, then sift up", "Sort", "Add at the root"], 0, "Bubble up."),
      Q("On extractMin you?", ["Swap root with last, remove, sift down", "Sort", "Remove the last"], 0, "Restore the heap."),
      Q("For node i, the parent index is?", ["(i - 1) / 2", "2i", "i / 2 - 1"], 0, "Array arithmetic."),
      Q("Building a heap from an array (heapify) is?", ["O(n)", "O(n log n)", "O(n^2)"], 0, "Bottom-up.")
    ]
  },
  "problem_0157": {
    description: "Implement a max-heap supporting insert, getMax, and extractMax, keeping the largest element at the root.",
    example: { input: "insert 5, 2, 8; extractMax", output: "8", why: "the maximum is at the root" },
    quizzes: [
      Q("In a max-heap, every parent is?", [">= its children", "<= its children", "Equal to its children"], 0, "Heap order."),
      Q("getMax costs?", ["O(1)", "O(log n)", "O(n)"], 0, "The root."),
      Q("insert / extractMax cost?", ["O(log n)", "O(1)", "O(n)"], 0, "Sift operations."),
      Q("Children of node i are at?", ["2i+1 and 2i+2", "i-1 and i+1", "i/2"], 0, "Array layout."),
      Q("A max-heap is stored as?", ["An array", "A linked list", "A trie"], 0, "Implicit complete tree."),
      Q("On extractMax you sift?", ["Down from the root", "Up from a leaf", "Nowhere"], 0, "Restore order."),
      Q("heapify cost?", ["O(n)", "O(n log n)", "O(log n)"], 0, "Bottom-up build.")
    ]
  },
  "problem_0143": {
    description: "Return the k most frequent words, sorted by descending frequency with ties broken alphabetically.",
    example: { input: '["i","love","code","i","love"], k = 2', output: '["i","love"]', why: "both appear twice; alphabetical tie-break" },
    quizzes: [
      Q("The core steps are?", ["Count frequencies, then select top k with a heap", "Sort letters", "A trie only"], 0, "Count then rank."),
      Q("Time complexity with a size-k heap?", ["O(n log k)", "O(n)", "O(n^2)"], 0, "Heap of k words."),
      Q("Ties are broken?", ["Alphabetically", "By length", "Randomly"], 0, "Lexicographic order."),
      Q("The heap comparator uses?", ["Frequency, then lexicographic order", "Only frequency", "Only the word"], 0, "Two-level ordering."),
      Q("An alternative to the heap is?", ["Bucket sort by frequency", "Binary search", "A stack"], 0, "O(n) buckets."),
      Q("Space complexity?", ["O(n)", "O(1)", "O(log n)"], 0, "The frequency map."),
      Q("The result length is?", ["k", "n", "unbounded"], 0, "Top k words.")
    ]
  },
  "problem_0145": {
    description: "Return the k-th largest element in an unsorted array.",
    example: { input: "[3,2,1,5,6,4], k = 2", output: "5", why: "the 2nd largest value" },
    quizzes: [
      Q("A heap approach uses?", ["A size-k min-heap", "A size-k max-heap", "A sorted set only"], 0, "Root is the kth largest."),
      Q("Heap time complexity?", ["O(n log k)", "O(n log n)", "O(n^2)"], 0, "Keep k elements."),
      Q("Quickselect averages?", ["O(n)", "O(n log n)", "O(n^2)"], 0, "Partition-based."),
      Q("The min-heap root holds?", ["The kth largest so far", "The maximum", "The median"], 0, "After processing all."),
      Q("This asks for the kth largest, not the?", ["kth distinct", "kth smallest", "median"], 0, "Duplicates count."),
      Q("Heap space complexity?", ["O(k)", "O(n)", "O(1)"], 0, "Size-k heap."),
      Q("You pop when?", ["The heap size exceeds k", "Every insert", "Never"], 0, "Keep only k.")
    ]
  },
  "problem_0146": {
    description: "Return the k most frequent elements in the array, in any order.",
    example: { input: "[1,1,1,2,2,3], k = 2", output: "[1, 2]", why: "the two most frequent values" },
    quizzes: [
      Q("The steps are?", ["Count, then pick top k with a heap", "Sort the array", "A trie"], 0, "Frequency selection."),
      Q("Heap time complexity?", ["O(n log k)", "O(n log n)", "O(n^2)"], 0, "Size-k heap."),
      Q("An O(n) alternative is?", ["Bucket sort by count", "Binary search", "A stack"], 0, "Buckets index by frequency."),
      Q("The heap is keyed by?", ["Frequency", "Value", "Index"], 0, "Most frequent wins."),
      Q("Space complexity?", ["O(n)", "O(1)", "O(log n)"], 0, "Count map."),
      Q("Quickselect can be applied to?", ["The (value, count) pairs", "The raw array only", "Nothing"], 0, "Select by count."),
      Q("The output has?", ["k elements", "n elements", "1 element"], 0, "Top k.")
    ]
  },
  "problem_0144": {
    description: "Rearrange a string so its characters appear in order of decreasing frequency.",
    example: { input: '"tree"', output: '"eert"', why: "e appears twice, then r and t" },
    quizzes: [
      Q("The steps are?", ["Count characters, then output by descending frequency", "Sort alphabetically", "Reverse"], 0, "Frequency order."),
      Q("Using buckets, time is?", ["O(n)", "O(n log n)", "O(n^2)"], 0, "Bucket by count."),
      Q("A max-heap approach costs?", ["O(k log k) for k distinct chars", "O(1)", "O(n^2)"], 0, "Heap of characters."),
      Q("You rebuild the string from?", ["The counts", "The indices", "The original order"], 0, "Repeat each char."),
      Q("Ties (equal frequency) can be?", ["In any order", "Alphabetical only", "Reverse only"], 0, "Unspecified order."),
      Q("Space complexity?", ["O(n)", "O(1)", "O(log n)"], 0, "Count map / output."),
      Q("The output orders characters by?", ["Descending frequency", "Ascending frequency", "ASCII value"], 0, "Most frequent first.")
    ]
  },
  "new-problem-13": {
    description: "Design a class that, as integers stream in, returns the k-th largest element seen so far.",
    example: { input: "k = 3; add 4, 5, 8, 2; then add 3", output: "4", why: "the 3rd largest after the adds" },
    quizzes: [
      Q("Maintain a?", ["Size-k min-heap", "Max-heap of all values", "Sorted array of all values"], 0, "The root is the answer."),
      Q("add() costs?", ["O(log k)", "O(n)", "O(1)"], 0, "Heap push/pop."),
      Q("The kth largest is?", ["The heap's root (minimum of the k)", "The maximum", "The median"], 0, "Smallest of the top k."),
      Q("After adding, if size > k you?", ["Pop the smallest", "Pop the largest", "Do nothing"], 0, "Keep exactly k."),
      Q("This is a?", ["Streaming problem", "Offline-only problem", "Sorting problem"], 0, "Values arrive over time."),
      Q("Space complexity?", ["O(k)", "O(n)", "O(1)"], 0, "Size-k heap."),
      Q("Peeking the root is?", ["O(1)", "O(log k)", "O(k)"], 0, "Top of the heap.")
    ]
  },
  "problem_0147": {
    description: "Design a data structure that supports adding numbers from a stream and finding the median of all numbers so far.",
    example: { input: "add 1; add 2; findMedian", output: "1.5", why: "median of [1, 2]" },
    quizzes: [
      Q("The classic design uses?", ["Two heaps (max-heap low half, min-heap high half)", "One heap", "A sorted list"], 0, "Balance the halves."),
      Q("addNum costs?", ["O(log n)", "O(1)", "O(n)"], 0, "Heap insertion."),
      Q("findMedian costs?", ["O(1)", "O(log n)", "O(n)"], 0, "Read the tops."),
      Q("The two heaps must stay?", ["Balanced in size (within one)", "Equal always", "Unbalanced"], 0, "For a correct median."),
      Q("The median comes from?", ["The heap tops", "The middle index", "A sort"], 0, "One or both roots."),
      Q("The max-heap holds the?", ["Lower half", "Upper half", "All values"], 0, "Low-half largest at top."),
      Q("Space complexity?", ["O(n)", "O(1)", "O(log n)"], 0, "Stores all numbers.")
    ]
  },
  "problem_0149": {
    description: "Merge k sorted linked lists into one sorted list.",
    example: { input: "[1->4, 2->6]", output: "1 -> 2 -> 4 -> 6", why: "all merged in order" },
    quizzes: [
      Q("A heap approach keeps?", ["A min-heap of the current list heads", "All values", "Two pointers"], 0, "Pull the smallest."),
      Q("Time complexity (N total nodes)?", ["O(N log k)", "O(N log N)", "O(N^2)"], 0, "Heap ops are log k."),
      Q("After popping the smallest you?", ["Push its next node", "Stop", "Sort"], 0, "Advance that list."),
      Q("The heap holds at most?", ["k nodes", "N nodes", "2 nodes"], 0, "One per list."),
      Q("An alternative is?", ["Divide-and-conquer pairwise merge", "A single pointer", "A trie"], 0, "Also O(N log k)."),
      Q("Space complexity?", ["O(k)", "O(N)", "O(1)"], 0, "The heap."),
      Q("Compared with concatenate+sort it is?", ["Better when k << N", "Always worse", "Identical"], 0, "log k < log N.")
    ]
  },
  "problem_0150": {
    description: "Given two sorted arrays, return the k pairs (one element from each) with the smallest sums.",
    example: { input: "nums1 = [1,7], nums2 = [2,3], k = 2", output: "[[1,2],[1,3]]", why: "the two smallest sums" },
    quizzes: [
      Q("A heap approach seeds the heap with?", ["The smallest candidate pairs", "All pairs", "Random pairs"], 0, "Expand greedily."),
      Q("The heap is ordered by?", ["Pair sum", "First element", "Index"], 0, "Smallest sum first."),
      Q("After popping a pair you?", ["Push the next candidate(s)", "Stop", "Sort"], 0, "Advance an index."),
      Q("Time complexity?", ["O(k log k)", "O(nm)", "O(k^2)"], 0, "k pops, each log k."),
      Q("This resembles?", ["A k-way merge", "Binary search", "DFS"], 0, "Frontier expansion."),
      Q("To avoid duplicates you track?", ["Visited index pairs", "Values only", "Nothing"], 0, "Index bookkeeping."),
      Q("Space complexity?", ["O(k)", "O(nm)", "O(1)"], 0, "The heap.")
    ]
  },
  "problem_0151": {
    description: "Find the smallest range [a, b] that includes at least one number from each of the k sorted lists.",
    example: { input: "[[4,10,15],[1,9],[5,18]]", output: "[9, 10]", why: "the tightest range covering all three lists" },
    quizzes: [
      Q("The approach keeps?", ["A min-heap of one element per list plus the current max", "All elements", "Two pointers only"], 0, "Advance the min's list."),
      Q("You advance?", ["The list whose element is the current minimum", "The longest list", "A random list"], 0, "Shrink from the low end."),
      Q("The current range width is?", ["max - heap-min", "heap-min - max", "k"], 0, "Track and minimize it."),
      Q("Time complexity (N total)?", ["O(N log k)", "O(N^2)", "O(N)"], 0, "Heap ops."),
      Q("The heap size is?", ["k", "N", "2"], 0, "One per list."),
      Q("You stop when?", ["A list is exhausted (its element can't advance)", "The heap is empty at start", "Never"], 0, "Range can't improve."),
      Q("Space complexity?", ["O(k)", "O(N)", "O(1)"], 0, "The heap.")
    ]
  },
  "problem_0158": {
    description: "Combine sticks two at a time, where each combine costs the sum of the two sticks, until one stick remains. Minimize the total cost.",
    example: { input: "[2, 4, 3]", output: "14", why: "(2+3)=5, then (5+4)=9; total 14" },
    quizzes: [
      Q("The greedy strategy is?", ["Always combine the two smallest", "Combine the two largest", "Combine in input order"], 0, "Huffman-style."),
      Q("Which structure fits?", ["A min-heap", "A max-heap", "A stack"], 0, "Pull the two smallest."),
      Q("After combining you?", ["Push the sum back into the heap", "Discard it", "Sort"], 0, "It may combine again."),
      Q("Time complexity?", ["O(n log n)", "O(n)", "O(n^2)"], 0, "Heap operations."),
      Q("The total cost is?", ["Accumulated over all combines", "Just the final sum", "The max stick"], 0, "Sum of each step's cost."),
      Q("This is the same pattern as?", ["Huffman coding", "Quicksort", "Binary search"], 0, "Optimal merging."),
      Q("Space complexity?", ["O(n)", "O(1)", "O(log n)"], 0, "The heap.")
    ]
  },
  "problem_0159": {
    description: "Connect ropes of given lengths two at a time (cost = sum of the two) to minimize the total connection cost.",
    example: { input: "[4, 3, 2, 6]", output: "29", why: "repeatedly merge the two shortest ropes" },
    quizzes: [
      Q("This is identical to?", ["Minimum cost to connect sticks", "Sorting", "Binary search"], 0, "Same Huffman pattern."),
      Q("The structure used is?", ["A min-heap", "A max-heap", "A queue"], 0, "Two smallest each step."),
      Q("The strategy is?", ["Greedy (combine two smallest)", "Combine two largest", "Random"], 0, "Huffman merging."),
      Q("Time complexity?", ["O(n log n)", "O(n)", "O(n^2)"], 0, "Heap ops."),
      Q("After each merge you?", ["Push the combined rope back", "Discard it", "Sort"], 0, "Reuse it."),
      Q("The cost accumulates?", ["At every merge", "Only at the end", "Never"], 0, "Sum of sums."),
      Q("Space complexity?", ["O(n)", "O(1)", "O(log n)"], 0, "The heap.")
    ]
  },
  "problem_0160": {
    description: "Merge files of given sizes two at a time, where each merge costs the sum of the two sizes, to minimize the total merge cost.",
    example: { input: "[20, 30, 10, 5]", output: "the minimum total using Huffman merging", why: "merge the smallest files first" },
    quizzes: [
      Q("The optimal strategy is?", ["Merge the two smallest files each step", "Merge the two largest", "Merge in order"], 0, "Huffman pattern."),
      Q("The data structure is?", ["A min-heap", "A max-heap", "A stack"], 0, "Smallest two each time."),
      Q("Time complexity?", ["O(n log n)", "O(n)", "O(n^2)"], 0, "Heap operations."),
      Q("After merging you?", ["Push the combined file back", "Discard it", "Sort the array"], 0, "It merges again later."),
      Q("The approach is?", ["Greedy", "Dynamic programming", "Backtracking"], 0, "Locally optimal = globally optimal."),
      Q("The total cost is?", ["Sum of all merge costs", "The largest file", "The final size only"], 0, "Accumulated."),
      Q("Space complexity?", ["O(n)", "O(1)", "O(log n)"], 0, "The heap.")
    ]
  },
  "problem_0161": {
    description: "Repeatedly combine two numbers, where each combine costs their sum, until one number remains. Minimize the total cost.",
    example: { input: "[1, 2, 3, 4]", output: "19", why: "merge the smallest pairs first" },
    quizzes: [
      Q("This is another instance of?", ["The Huffman / optimal-merge pattern", "Sorting", "Binary search"], 0, "Same idea."),
      Q("Use a?", ["Min-heap", "Max-heap", "Queue"], 0, "Two smallest each step."),
      Q("Each step combines?", ["The two smallest numbers", "The two largest", "Adjacent numbers"], 0, "Greedy choice."),
      Q("Time complexity?", ["O(n log n)", "O(n)", "O(n^2)"], 0, "Heap ops."),
      Q("The combined value is?", ["Pushed back into the heap", "Discarded", "Ignored"], 0, "May combine again."),
      Q("The greedy choice is?", ["Provably optimal here", "A heuristic only", "Wrong"], 0, "Huffman optimality."),
      Q("Total cost accumulates?", ["Across all combines", "At the end only", "Never"], 0, "Sum of step costs.")
    ]
  },

  // ================= Trie =================
  "problem_0348": {
    description: "Implement a trie (prefix tree) supporting insert(word), search(word) for an exact match, and startsWith(prefix).",
    example: { input: 'insert "apple"; search "app"', output: "false", why: '"app" is a prefix but was not inserted as a word' },
    quizzes: [
      Q("A trie stores words as?", ["Paths of characters from the root", "A flat array", "Hash buckets"], 0, "Shared prefixes merge."),
      Q("insert and search cost?", ["O(word length)", "O(n)", "O(log n)"], 0, "One step per character."),
      Q("A node marks a complete word with?", ["An 'end of word' flag", "A count only", "Nothing"], 0, "Distinguishes words from prefixes."),
      Q("startsWith differs from search by?", ["Ignoring the end-of-word flag", "Using a hash", "Sorting"], 0, "Any path suffices."),
      Q("Each node has up to?", ["Alphabet-size children", "Two children", "One child"], 0, "E.g. 26 for lowercase."),
      Q("A key strength of tries is?", ["Fast prefix queries / autocomplete", "Sorting", "Low memory"], 0, "Prefix sharing."),
      Q("Space complexity?", ["O(total characters inserted)", "O(1)", "O(log n)"], 0, "Can be large.")
    ]
  },
  "problem_0349": {
    description: "Design a structure to add words and search them, where '.' in a query can match any single character.",
    example: { input: 'addWord "bad"; search "b.d"', output: "true", why: "'.' matches 'a'" },
    quizzes: [
      Q("The base structure is?", ["A trie", "A hash map only", "A heap"], 0, "Plus wildcard handling."),
      Q("A '.' in the query means?", ["Try all children at that node", "Skip a character", "Match nothing"], 0, "Branch on every child."),
      Q("Searching with wildcards uses?", ["DFS / backtracking", "Binary search", "Sorting"], 0, "Explore branches."),
      Q("A full word match requires?", ["Reaching an end-of-word node", "Any node", "The root"], 0, "End flag set."),
      Q("Without any '.', search is?", ["O(word length)", "O(n^2)", "O(2^n)"], 0, "A single path."),
      Q("Many '.' can make search?", ["Branch across many nodes", "Instant", "Impossible"], 0, "Exponential in the worst case."),
      Q("Space complexity?", ["O(total characters)", "O(1)", "O(log n)"], 0, "Trie storage.")
    ]
  },
  "problem_0350": {
    description: "Return the longest common prefix shared by all strings in an array, or an empty string if there is none.",
    example: { input: '["flower","flow","flight"]', output: '"fl"', why: "the common leading characters" },
    quizzes: [
      Q("One approach builds a trie and?", ["Walks the single-child path from the root", "Sorts", "Hashes"], 0, "Stop at a branch or word end."),
      Q("A simple scan compares?", ["Characters column by column across all strings", "Only the first two", "Lengths"], 0, "Vertical scanning."),
      Q("Time complexity (S total characters)?", ["O(S)", "O(S^2)", "O(S log S)"], 0, "Each char examined a constant number of times."),
      Q("If the first characters differ, the answer is?", ["An empty string", "The first string", "An error"], 0, "No common prefix."),
      Q("The prefix ends at?", ["The first mismatch (or a word end)", "The array's end", "A random point"], 0, "Shortest word bounds it."),
      Q("Horizontal scanning compares?", ["Pairs of strings, shrinking the prefix", "Only lengths", "Nothing"], 0, "Alternative method."),
      Q("The answer length is at most?", ["The shortest string's length", "The longest string's length", "Unbounded"], 0, "Bounded by the shortest.")
    ]
  },
  "problem_0351": {
    description: "Return the longest word that can be built one character at a time, where every prefix of it is also a word in the list. Break ties by the lexicographically smallest.",
    example: { input: '["w","wo","wor","worl","world"]', output: '"world"', why: "each prefix is itself a word" },
    quizzes: [
      Q("A trie approach keeps words where?", ["Every prefix node is also an end-of-word", "Any node exists", "The root only"], 0, "Buildable step by step."),
      Q("You search for?", ["The longest such word", "The shortest", "Any word"], 0, "Then tie-break."),
      Q("Ties are broken by?", ["Lexicographically smallest", "Insertion order", "Length only"], 0, "As specified."),
      Q("The traversal is a?", ["DFS over word-nodes only", "BFS over all nodes", "Binary search"], 0, "Extend through end-flags."),
      Q("Time complexity (S total characters)?", ["O(S)", "O(S^2)", "O(2^S)"], 0, "Build + traverse."),
      Q("You only extend a path when?", ["The current node is an end-of-word", "Always", "Never"], 0, "Prefix must be a word."),
      Q("Space complexity?", ["O(S)", "O(1)", "O(log S)"], 0, "The trie.")
    ]
  },
  "problem_0352": {
    description: "Given a list of products and a search word typed character by character, return up to 3 lexicographically smallest product names matching each prefix.",
    example: { input: 'products, searchWord "mou"', output: "up to 3 suggestions per prefix", why: "prefix-based autocomplete" },
    quizzes: [
      Q("One approach stores at each trie node?", ["Up to 3 smallest matching products", "All products", "A count only"], 0, "Precomputed suggestions."),
      Q("Another approach uses?", ["Sorting + binary search per prefix", "A heap only", "DFS over graphs"], 0, "Find the prefix window."),
      Q("Up to how many suggestions per prefix?", ["3", "1", "unlimited"], 0, "As specified."),
      Q("Suggestions are ordered?", ["Lexicographically", "By length", "Randomly"], 0, "Smallest first."),
      Q("The feature implemented is?", ["Autocomplete / search suggestions", "Spell check", "Sorting"], 0, "Typed prefixes."),
      Q("Trie build time (S total chars)?", ["O(S)", "O(S^2)", "O(2^S)"], 0, "Insert all products."),
      Q("Space complexity?", ["O(S)", "O(1)", "O(log S)"], 0, "The trie.")
    ]
  },
  "problem_0353": {
    description: "Given a string and a dictionary of words, determine whether the string can be segmented into a space-separated sequence of dictionary words.",
    example: { input: 's = "leetcode", dict = ["leet","code"]', output: "true", why: '"leet" + "code"' },
    quizzes: [
      Q("The standard solution uses?", ["DP over prefixes (or a trie with memoized DFS)", "A heap", "Sorting"], 0, "ok[i] from earlier splits."),
      Q("ok[i] is true when?", ["ok[j] is true and s[j..i] is a word", "s[i] is a letter", "i is even"], 0, "A valid split point."),
      Q("Time complexity?", ["O(n^2) (times word checks)", "O(n)", "O(2^n)"], 0, "Pairs of split points."),
      Q("The base case is?", ["ok[0] = true (empty prefix)", "ok[n] = true", "ok[1] = false"], 0, "Nothing to segment."),
      Q("A trie can speed up?", ["Checking word prefixes during DFS", "Sorting", "Hashing indices"], 0, "Walk characters."),
      Q("Memoization prevents?", ["Recomputing the same suffix", "Sorting", "Overflow"], 0, "Cache subproblems."),
      Q("The decision variable is at?", ["Each possible split point", "Each character only", "The ends only"], 0, "Where to cut.")
    ]
  },
  "problem_0355": {
    description: "Return all words formed entirely by concatenating two or more shorter words from the same list.",
    example: { input: '["cat","dog","catdog"]', output: '["catdog"]', why: '"cat" + "dog"' },
    quizzes: [
      Q("Each word is tested with?", ["Word Break against the other words", "Sorting", "A single hash"], 0, "Can it be built from others?"),
      Q("The dictionary is stored in?", ["A trie or hash set", "A heap", "A queue"], 0, "Fast membership."),
      Q("Each check is essentially?", ["DP / DFS segmentation", "Binary search", "BFS"], 0, "Like Word Break."),
      Q("A concatenated word needs?", ["At least two pieces", "Exactly one piece", "A prefix only"], 0, "Two or more words."),
      Q("When testing a word you?", ["Exclude the word itself", "Include it", "Ignore length"], 0, "Avoid trivial matches."),
      Q("Memoization helps by?", ["Caching segmentation results", "Sorting faster", "Reducing memory to O(1)"], 0, "Reuse subproblems."),
      Q("Time complexity is roughly?", ["O(sum of word_length^2)", "O(n)", "O(1)"], 0, "Segmentation per word.")
    ]
  },
  "problem_0356": {
    description: "Given a dictionary of roots and a sentence, replace each word by the shortest root that is a prefix of it (if any).",
    example: { input: 'roots = ["cat","bat"], "the cattle was rattled"', output: '"the cat was rattled"', why: '"cat" is a root of "cattle"' },
    quizzes: [
      Q("Build a trie of?", ["The roots", "The sentence words", "All substrings"], 0, "For prefix lookup."),
      Q("For each word you?", ["Walk the trie to the first root end-node", "Sort", "Hash the whole word"], 0, "Shortest root wins."),
      Q("If a word has no root prefix you?", ["Keep the word unchanged", "Delete it", "Replace with empty"], 0, "No match."),
      Q("The shortest root is chosen because?", ["You stop at the first end-of-word along the path", "Roots are sorted", "It is random"], 0, "Earliest match."),
      Q("Time complexity (total characters)?", ["O(total characters)", "O(n^2)", "O(2^n)"], 0, "Trie walk per word."),
      Q("The operation is?", ["Prefix replacement", "Suffix replacement", "Substring search"], 0, "Roots are prefixes."),
      Q("Space complexity?", ["O(total root characters)", "O(1)", "O(log n)"], 0, "The trie.")
    ]
  },
  "problem_0357": {
    description: "Find the maximum XOR of any two numbers in the array.",
    example: { input: "[3,10,5,25,2,8]", output: "28", why: "5 XOR 25 = 28" },
    quizzes: [
      Q("The efficient approach uses?", ["A bitwise trie (bits from MSB to LSB)", "Sorting", "A hash map of sums"], 0, "Greedy bit choices."),
      Q("At each bit you greedily pick?", ["The opposite bit if available", "The same bit", "A random branch"], 0, "Maximize that XOR bit."),
      Q("Time complexity?", ["O(n * bits)", "O(n^2)", "O(n log n)"], 0, "Insert + query per number."),
      Q("Each trie node has?", ["Two children (0 and 1)", "26 children", "One child"], 0, "Binary branching."),
      Q("You insert then?", ["Query the best partner for each number", "Sort", "Hash"], 0, "Two passes."),
      Q("XOR of a bit is maximized when the bits are?", ["Different", "Equal", "Both zero"], 0, "1 XOR 0 = 1."),
      Q("Space complexity?", ["O(n * bits)", "O(1)", "O(log n)"], 0, "The bitwise trie.")
    ]
  },
  "problem_0358": {
    description: "For each query (x, m), find the maximum XOR of x with any array element that is <= m, or -1 if no such element exists.",
    example: { input: "queries with value and limit", output: "max XOR per query, or -1", why: "respect the <= m constraint" },
    quizzes: [
      Q("An efficient approach processes queries?", ["Offline, sorted by the limit m", "In input order", "Randomly"], 0, "Insert elements incrementally."),
      Q("You insert into a bitwise trie?", ["Elements <= the current query's m", "All elements always", "Nothing"], 0, "Respect the limit."),
      Q("After inserting, each query is a?", ["Maximum-XOR query", "Sum query", "Count query"], 0, "Like problem 0357."),
      Q("If no element is <= m, return?", ["-1", "0", "the maximum"], 0, "As specified."),
      Q("Sorting the array and queries enables?", ["Incremental insertion", "Binary search only", "A heap"], 0, "Process in order of m."),
      Q("Time complexity?", ["O((n + q) log(n + q) + queries * bits)", "O(nq)", "O(1)"], 0, "Sort + trie queries."),
      Q("The core structure is?", ["A bitwise trie", "A hash map", "A segment tree only"], 0, "For max XOR.")
    ]
  },
  "problem_0359": {
    description: "Solve XOR-over-subset problems (such as summing the XORs of all subsets, or finding the maximum subset XOR) using XOR properties and, for the maximum, a linear XOR basis or bitwise trie.",
    example: { input: "an array", output: "e.g. the sum of every subset's XOR", why: "XOR properties simplify the computation" },
    quizzes: [
      Q("For the sum of all subset XORs, each bit?", ["Contributes to exactly half the subsets if any element has it", "Never contributes", "Always contributes fully"], 0, "Counting argument."),
      Q("Maximum subset XOR is found with?", ["A linear (XOR) basis or bitwise trie", "Sorting", "A heap"], 0, "Gaussian-style elimination."),
      Q("XOR is?", ["Associative and commutative", "Only associative", "Neither"], 0, "Order-independent."),
      Q("Building the XOR basis costs?", ["O(n * bits)", "O(n^2)", "O(2^n)"], 0, "Per element, per bit."),
      Q("A bit of the OR of all elements contributes when?", ["At least one element has that bit set", "All elements have it", "No element has it"], 0, "Determines subset coverage."),
      Q("Brute forcing all subsets is?", ["O(2^n) (only for small n)", "O(n)", "O(log n)"], 0, "Exponential."),
      Q("Space for the basis is?", ["O(bits)", "O(n^2)", "O(2^n)"], 0, "One vector per bit.")
    ]
  },

  // ================= Bit Manipulation =================
  "problem_0360": {
    description: "Given an array of n distinct numbers taken from the range 0..n with exactly one missing, return the missing number.",
    example: { input: "[3, 0, 1]", output: "2", why: "2 is absent from 0..3" },
    quizzes: [
      Q("A clean O(1)-space method XORs?", ["All indices 0..n with all array values", "Only the values", "Only the indices"], 0, "Matches cancel."),
      Q("Time complexity?", ["O(n)", "O(n log n)", "O(n^2)"], 0, "One pass."),
      Q("Space complexity?", ["O(1)", "O(n)", "O(log n)"], 0, "No extra array."),
      Q("An alternative uses the formula?", ["n(n+1)/2 minus the actual sum", "n^2", "2^n"], 0, "Arithmetic series."),
      Q("XOR works because?", ["Equal numbers cancel to 0", "It sorts", "It hashes"], 0, "a ^ a = 0."),
      Q("The leftover after all XORs is?", ["The missing number", "The duplicate", "Zero"], 0, "Only it is unpaired."),
      Q("The XOR method avoids?", ["Integer overflow risk of summation", "All computation", "Reading the array"], 0, "No large sums.")
    ]
  },
  "problem_0361": {
    description: "Count the number of set bits (1s) in the binary representation of an integer (the Hamming weight).",
    example: { input: "11 (binary 1011)", output: "3", why: "three bits are set" },
    quizzes: [
      Q("Brian Kernighan's trick uses?", ["x & (x - 1) to clear the lowest set bit", "Division by 2 only", "Sorting"], 0, "One clear per set bit."),
      Q("Its loop runs?", ["Once per set bit", "32 times always", "n times"], 0, "Proportional to 1-bits."),
      Q("A shift-and-mask method runs?", ["About 32 iterations (word size)", "Once", "n^2 times"], 0, "Per bit position."),
      Q("Space complexity?", ["O(1)", "O(n)", "O(log n)"], 0, "A counter."),
      Q("x & (x - 1) does what?", ["Removes the lowest set bit", "Adds a bit", "Negates x"], 0, "Each iteration."),
      Q("This count is also called?", ["Population count (popcount)", "Hash", "Parity only"], 0, "Number of 1s."),
      Q("Checking a single bit uses?", ["(x >> k) & 1", "x * 2", "x + k"], 0, "Shift and mask.")
    ]
  },
  "problem_0362": {
    description: "Determine whether an integer's binary representation has strictly alternating bits (no two adjacent bits are the same).",
    example: { input: "5 (binary 101)", output: "true", why: "the bits alternate" },
    quizzes: [
      Q("A neat trick computes?", ["x XOR (x >> 1), which is all 1s if alternating", "x + 1", "x * 2"], 0, "Adjacent bits differ."),
      Q("After that XOR, you check?", ["n & (n + 1) == 0 (all ones)", "n == 0", "n is even"], 0, "Confirms a run of 1s."),
      Q("Time complexity?", ["O(1)", "O(n)", "O(log n)"], 0, "Constant bit ops."),
      Q("Alternating means?", ["No two adjacent bits are equal", "All bits are 1", "All bits are 0"], 0, "101010... pattern."),
      Q("An alternative compares?", ["Each bit with the previous bit", "The whole number with 0", "Lengths"], 0, "Shift and compare."),
      Q("Space complexity?", ["O(1)", "O(n)", "O(log n)"], 0, "Bit tricks."),
      Q("x XOR (x >> 1) being all 1s indicates?", ["Alternation", "All zeros", "A power of two"], 0, "Every adjacent pair differs.")
    ]
  },
  "problem_0363": {
    description: "Determine whether the k-th bit (0-indexed from the least significant) of a number is set to 1.",
    example: { input: "n = 5, k = 0", output: "true", why: "5 = 101, so bit 0 is 1" },
    quizzes: [
      Q("One test is?", ["(n >> k) & 1", "n / k", "n + k"], 0, "Shift then mask."),
      Q("Another equivalent test is?", ["n & (1 << k)", "n % 2", "n * k"], 0, "Non-zero means set."),
      Q("Bits are indexed from?", ["The least significant (bit 0)", "The most significant", "The middle"], 0, "0-indexed LSB."),
      Q("A non-zero result means?", ["The bit is set", "The bit is clear", "An error"], 0, "The mask matched."),
      Q("Time complexity?", ["O(1)", "O(n)", "O(log n)"], 0, "Constant."),
      Q("Space complexity?", ["O(1)", "O(n)", "O(log n)"], 0, "No extra memory."),
      Q("(1 << k) produces?", ["A mask with only bit k set", "All ones", "Zero"], 0, "Single-bit mask.")
    ]
  },
  "problem_0364": {
    description: "Determine whether a positive integer is a power of two.",
    example: { input: "16", output: "true", why: "16 = 2^4" },
    quizzes: [
      Q("The one-line test is?", ["x > 0 && (x & (x - 1)) == 0", "x % 2 == 0", "x > 1"], 0, "Exactly one set bit."),
      Q("A power of two has?", ["Exactly one set bit", "All bits set", "No set bits"], 0, "e.g. 1000."),
      Q("Non-positive numbers are?", ["Not powers of two", "Always powers of two", "Undefined"], 0, "Guard x > 0."),
      Q("x & (x - 1) for a power of two equals?", ["0", "x", "1"], 0, "Clears the only set bit."),
      Q("Time complexity?", ["O(1)", "O(log n)", "O(n)"], 0, "A couple of ops."),
      Q("Space complexity?", ["O(1)", "O(n)", "O(log n)"], 0, "No extra memory."),
      Q("This is essentially a?", ["Single-set-bit test", "Parity test", "Sorting"], 0, "One bit only.")
    ]
  },
  "problem_0365": {
    description: "In an array where every element appears a fixed number of times except for a few unique ones, find the unique element(s) using bitwise counting (a 'single number' variant).",
    example: { input: "[2, 2, 3, 2]", output: "3", why: "3 appears once while 2 appears three times" },
    quizzes: [
      Q("When elements repeat three times, you?", ["Count each bit modulo 3", "XOR everything", "Sort"], 0, "Triple-repeats cancel mod 3."),
      Q("Time complexity?", ["O(n)", "O(n log n)", "O(n^2)"], 0, "Per bit, per element."),
      Q("Space complexity?", ["O(1)", "O(n)", "O(log n)"], 0, "Fixed bit counters."),
      Q("For pairs (twice each) you would use?", ["Plain XOR", "Bit counts mod 3", "A heap"], 0, "a ^ a = 0."),
      Q("Bits from the repeated elements?", ["Cancel out under the modulus", "Accumulate forever", "Are ignored"], 0, "Leaving the unique's bits."),
      Q("Plain XOR fails for triples because?", ["Odd repetition doesn't cancel", "It's too slow", "It overflows"], 0, "Need mod-3 counting."),
      Q("The remaining bits form?", ["The unique number", "Zero", "The duplicate"], 0, "Reconstructed from counters.")
    ]
  },
  "problem_0366": {
    description: "Every element appears twice except for one element that appears once. Find the single element.",
    example: { input: "[4, 1, 2, 1, 2]", output: "4", why: "4 is the only unpaired value" },
    quizzes: [
      Q("The trick is to?", ["XOR all elements together", "Sort then scan", "Use a hash map"], 0, "Pairs cancel."),
      Q("Time complexity?", ["O(n)", "O(n log n)", "O(n^2)"], 0, "One pass."),
      Q("Space complexity?", ["O(1)", "O(n)", "O(log n)"], 0, "A single accumulator."),
      Q("XOR of a number with itself is?", ["0", "the number", "1"], 0, "a ^ a = 0."),
      Q("XOR with 0 gives?", ["The number unchanged", "0", "1"], 0, "Identity element."),
      Q("XOR is order-independent because it is?", ["Commutative and associative", "Only commutative", "Neither"], 0, "Pairs cancel regardless of order."),
      Q("The final accumulator holds?", ["The single element", "The sum", "Zero"], 0, "All pairs cancelled.")
    ]
  },
  "problem_0367": {
    description: "Every element appears three times except for one element that appears once. Find the single element.",
    example: { input: "[0, 1, 0, 1, 0, 1, 99]", output: "99", why: "99 appears once; the others appear three times" },
    quizzes: [
      Q("The approach counts?", ["Each bit position modulo 3", "Total XOR", "Frequencies in a map"], 0, "Triples cancel mod 3."),
      Q("Time complexity?", ["O(n)", "O(n log n)", "O(n^2)"], 0, "Per bit per element."),
      Q("Space complexity?", ["O(1)", "O(n)", "O(log n)"], 0, "Fixed counters / two variables."),
      Q("Plain XOR fails here because?", ["Three copies don't cancel", "It's too slow", "It overflows"], 0, "Odd repetition survives."),
      Q("An elegant O(1) solution uses?", ["A two-variable (ones/twos) bit state machine", "A heap", "Sorting"], 0, "Tracks counts mod 3."),
      Q("Bits appearing three times contribute?", ["0 under mod 3", "3 to the result", "1"], 0, "They vanish."),
      Q("The remaining set bits form?", ["The unique number", "Zero", "A duplicate"], 0, "Rebuild from counters.")
    ]
  },
  "problem_0368": {
    description: "Exactly two elements appear once and all others appear twice. Find the two single elements.",
    example: { input: "[1, 2, 1, 3, 2, 5]", output: "[3, 5]", why: "3 and 5 are the unpaired values" },
    quizzes: [
      Q("First you XOR everything to get?", ["a XOR b (of the two singles)", "a + b", "a * b"], 0, "Pairs cancel, singles remain."),
      Q("To separate them you isolate?", ["A bit where a and b differ (x & -x)", "The highest value", "The sum"], 0, "Lowest set bit of a^b."),
      Q("That differing bit lets you?", ["Partition all numbers into two groups", "Sort them", "Hash them"], 0, "a and b fall into different groups."),
      Q("Within each group you?", ["XOR to recover one single", "Sum", "Sort"], 0, "Pairs cancel again."),
      Q("Time complexity?", ["O(n)", "O(n log n)", "O(n^2)"], 0, "A couple of passes."),
      Q("Space complexity?", ["O(1)", "O(n)", "O(log n)"], 0, "Few variables."),
      Q("x & -x extracts?", ["The lowest set bit", "The highest set bit", "All bits"], 0, "A single differing bit.")
    ]
  },
  "problem_0369": {
    description: "Return all subsets (the power set) of an array of distinct integers.",
    example: { input: "[1, 2, 3]", output: "8 subsets (2^3)", why: "every element is either in or out" },
    quizzes: [
      Q("A bitmask method iterates masks?", ["0 to 2^n - 1, bit i meaning include element i", "0 to n", "1 to n!"], 0, "Each mask is a subset."),
      Q("The number of subsets is?", ["2^n", "n^2", "n!"], 0, "Each element in or out."),
      Q("Time complexity?", ["O(2^n * n)", "O(n^2)", "O(n)"], 0, "Build each subset."),
      Q("An alternative is?", ["Backtracking / recursion", "A heap", "Binary search"], 0, "Also enumerates subsets."),
      Q("A set bit i in the mask means?", ["Element i is included", "Element i is skipped", "The subset is empty"], 0, "Membership flag."),
      Q("The empty subset corresponds to?", ["Mask 0", "Mask 2^n - 1", "No mask"], 0, "All bits clear."),
      Q("Space (output) complexity?", ["O(2^n * n)", "O(1)", "O(n)"], 0, "All subsets stored.")
    ]
  },
  "problem_0370": {
    description: "Return all unique subsets of an array that may contain duplicate values (no duplicate subsets in the output).",
    example: { input: "[1, 2, 2]", output: "unique subsets only", why: "duplicate values must not produce repeated subsets" },
    quizzes: [
      Q("To avoid duplicate subsets you first?", ["Sort the array", "Reverse it", "Hash it"], 0, "Group equal values."),
      Q("During backtracking you skip?", ["An equal element at the same recursion depth", "Every second element", "Nothing"], 0, "Prevents duplicates."),
      Q("Time complexity?", ["O(2^n * n)", "O(n^2)", "O(n)"], 0, "Enumerate subsets."),
      Q("Sorting helps because?", ["Equal values become adjacent", "It's faster overall", "It removes duplicates"], 0, "Easy to skip."),
      Q("The result contains?", ["Only unique subsets", "All 2^n subsets", "One subset"], 0, "De-duplicated power set."),
      Q("The skip condition triggers when?", ["nums[i] == nums[i-1] at the same level", "i is even", "Always"], 0, "Same-depth duplicate."),
      Q("Space (output) complexity?", ["O(2^n * n)", "O(1)", "O(log n)"], 0, "Stores subsets.")
    ]
  },
  "problem_0371": {
    description: "Determine whether the array can be partitioned into k subsets that all have the same sum.",
    example: { input: "[4,3,2,3,5,2,1], k = 4", output: "true", why: "four subsets each summing to 5" },
    quizzes: [
      Q("A first feasibility check is?", ["total sum must be divisible by k", "the array must be sorted", "n must be even"], 0, "Each subset targets total/k."),
      Q("The target subset sum is?", ["total / k", "total * k", "k"], 0, "Equal shares."),
      Q("A common technique is?", ["Backtracking with a used/visited bitmask", "A heap", "Binary search"], 0, "Try placements."),
      Q("Bitmask DP complexity is?", ["O(2^n * n)", "O(n^2)", "O(n)"], 0, "States over subsets."),
      Q("Infeasible immediately if?", ["Any element > the target sum", "The array is sorted", "k = 1"], 0, "Can't fit it."),
      Q("Sorting descending helps by?", ["Pruning the search earlier", "Guaranteeing O(n)", "Removing duplicates"], 0, "Place big items first."),
      Q("The problem is in general?", ["NP-hard", "Solvable in O(n)", "Always true"], 0, "Partition is hard.")
    ]
  },
  "problem_0372": {
    description: "Find the maximum XOR of any two numbers in the array.",
    example: { input: "[3,10,5,25,2,8]", output: "28", why: "5 XOR 25 = 28" },
    quizzes: [
      Q("The efficient method uses?", ["A bitwise trie, MSB first", "Sorting", "A sum hash map"], 0, "Greedy bit selection."),
      Q("At each bit you try to take?", ["The opposite bit", "The same bit", "A random branch"], 0, "Maximize the XOR bit."),
      Q("Time complexity?", ["O(n * bits)", "O(n^2)", "O(n log n)"], 0, "Insert + query."),
      Q("An alternative builds the answer?", ["Bit by bit using a prefix hash set", "By sorting", "By a heap"], 0, "Check achievable bits."),
      Q("Each trie node branches on?", ["Bit value 0 or 1", "The digit", "The sign"], 0, "Binary trie."),
      Q("A XOR bit is 1 when the two bits are?", ["Different", "Equal", "Both 1"], 0, "1 XOR 0."),
      Q("Space complexity?", ["O(n * bits)", "O(1)", "O(log n)"], 0, "The bitwise trie.")
    ]
  },
  "problem_0373": {
    description: "For each query (x, m), return the maximum XOR of x with any array element that is <= m, or -1 if none exists.",
    example: { input: "queries with a value and a limit", output: "max XOR per query, or -1", why: "respect the <= m limit" },
    quizzes: [
      Q("Process the queries?", ["Offline, sorted by m", "In input order", "Randomly"], 0, "Insert elements incrementally."),
      Q("You insert into the bitwise trie?", ["Elements <= the current m", "All elements upfront", "Nothing"], 0, "Respect the limit."),
      Q("Each query then performs a?", ["Maximum-XOR query", "Sum query", "Range count"], 0, "Like max-XOR."),
      Q("No valid element means the answer is?", ["-1", "0", "the maximum"], 0, "As specified."),
      Q("Sorting array and queries enables?", ["Incremental trie insertion", "Binary search only", "A heap"], 0, "By increasing m."),
      Q("Time complexity?", ["O((n + q) log(n + q) + queries * bits)", "O(nq)", "O(1)"], 0, "Sort + queries."),
      Q("The structure is a?", ["Bitwise trie", "Hash map", "Segment tree only"], 0, "For max XOR.")
    ]
  },
  "problem_0374": {
    description: "Answer subarray XOR queries efficiently using a prefix-XOR array, where the XOR of a[i..j] equals pre[j+1] XOR pre[i].",
    example: { input: "array, query range (1, 3)", output: "the XOR of that range", why: "computed via prefix-XOR differences" },
    quizzes: [
      Q("The prefix-XOR array lets each range query run in?", ["O(1)", "O(n)", "O(log n)"], 0, "A single XOR."),
      Q("Building the prefix-XOR array costs?", ["O(n)", "O(n^2)", "O(n log n)"], 0, "One pass."),
      Q("The XOR of a[i..j] equals?", ["pre[j+1] XOR pre[i]", "pre[j] + pre[i]", "pre[j] - pre[i]"], 0, "Difference via XOR."),
      Q("This works because XOR?", ["Cancels the shared prefix", "Sorts the values", "Adds the range"], 0, "pre[i] cancels itself."),
      Q("Space complexity?", ["O(n)", "O(1)", "O(log n)"], 0, "The prefix array."),
      Q("Each query after preprocessing is?", ["O(1)", "O(n)", "O(log n)"], 0, "Constant time."),
      Q("The key property used is?", ["Associativity/self-inverse of XOR", "Sorting", "Hashing"], 0, "a ^ a = 0.")
    ]
  },
  "problem_0375": {
    description: "Return the sum of the XOR totals of every subset of the array.",
    example: { input: "[1, 3]", output: "6", why: "subset XOR totals 0, 1, 3, 2 sum to 6" },
    quizzes: [
      Q("Each bit set in any element contributes to?", ["Exactly half of all subsets", "No subsets", "All subsets"], 0, "2^(n-1) subsets."),
      Q("A closed-form answer is?", ["(OR of all elements) * 2^(n-1)", "sum * n", "2^n"], 0, "Bit-contribution formula."),
      Q("That formula runs in?", ["O(n)", "O(2^n)", "O(n^2)"], 0, "One pass to OR."),
      Q("Brute force enumerates?", ["All 2^n subsets (small n only)", "n subsets", "n^2 subsets"], 0, "Exponential."),
      Q("A bit appears in the OR when?", ["At least one element has it set", "All elements have it", "None have it"], 0, "Then it contributes."),
      Q("Space complexity of the formula?", ["O(1)", "O(2^n)", "O(n)"], 0, "Just accumulators."),
      Q("The value summed per subset is its?", ["XOR total", "Sum", "Product"], 0, "XOR of its elements.")
    ]
  },

  // ================= Binary Tree =================
  "problem_0178": {
    description: "Return the inorder traversal (left, root, right) of a binary tree's node values.",
    example: { input: "root = [1, null, 2, 3]", output: "[1, 3, 2]", why: "left subtree, then root, then right" },
    quizzes: [
      Q("Inorder visits nodes in the order?", ["Left, root, right", "Root, left, right", "Left, right, root"], 0, "Root is in the middle."),
      Q("For a BST, inorder yields?", ["Sorted order", "Reverse order", "Random order"], 0, "A key BST property."),
      Q("Iterative inorder uses?", ["A stack", "A queue", "A heap"], 0, "Simulate recursion."),
      Q("Time complexity?", ["O(n)", "O(n log n)", "O(n^2)"], 0, "Each node once."),
      Q("Recursive space (worst case) is?", ["O(h) call stack", "O(1)", "O(n^2)"], 0, "Tree height."),
      Q("Morris traversal achieves?", ["O(1) extra space", "O(n) space", "Faster than O(n) time"], 0, "Threaded links."),
      Q("The root is visited?", ["Between its subtrees", "First", "Last"], 0, "In-order position.")
    ]
  },
  "problem_0179": {
    description: "Return the preorder traversal (root, left, right) of a binary tree's node values.",
    example: { input: "root = [1, null, 2, 3]", output: "[1, 2, 3]", why: "root first, then left, then right" },
    quizzes: [
      Q("Preorder visits in the order?", ["Root, left, right", "Left, root, right", "Left, right, root"], 0, "Root first."),
      Q("Preorder is useful for?", ["Copying/serializing a tree", "Sorting a BST", "Finding the median"], 0, "Root-first reconstruction."),
      Q("Iterative preorder uses?", ["A stack", "A queue", "A heap"], 0, "Push right then left."),
      Q("Time complexity?", ["O(n)", "O(n log n)", "O(n^2)"], 0, "Each node once."),
      Q("Recursive space is?", ["O(h)", "O(1)", "O(n^2)"], 0, "Call stack = height."),
      Q("The root is visited?", ["First", "Last", "In the middle"], 0, "Pre-order position."),
      Q("With a stack you push children?", ["Right before left (so left pops first)", "Left before right", "In any order"], 0, "Preserve order.")
    ]
  },
  "problem_0180": {
    description: "Return the postorder traversal (left, right, root) of a binary tree's node values.",
    example: { input: "root = [1, null, 2, 3]", output: "[3, 2, 1]", why: "subtrees before the root" },
    quizzes: [
      Q("Postorder visits in the order?", ["Left, right, root", "Root, left, right", "Left, root, right"], 0, "Root last."),
      Q("Postorder is useful for?", ["Deleting/freeing a tree", "Sorting a BST", "Level order"], 0, "Children before parent."),
      Q("An easy iterative trick is?", ["Reverse of a modified preorder", "A queue", "Two heaps"], 0, "Root-right-left reversed."),
      Q("Time complexity?", ["O(n)", "O(n log n)", "O(n^2)"], 0, "Each node once."),
      Q("Recursive space is?", ["O(h)", "O(1)", "O(n^2)"], 0, "Call stack = height."),
      Q("The root is visited?", ["Last", "First", "In the middle"], 0, "Post-order position."),
      Q("Computing subtree values bottom-up fits?", ["Postorder", "Preorder", "Level order"], 0, "Children first.")
    ]
  },
  "problem_0181": {
    description: "Determine whether two binary trees are identical in both structure and node values.",
    example: { input: "p = [1,2,3], q = [1,2,3]", output: "true", why: "same shape and values" },
    quizzes: [
      Q("The natural approach is?", ["Recursively compare both trees node by node", "Sort both", "Hash the values only"], 0, "Structure and values."),
      Q("Both trees are the same when?", ["Same structure and matching values", "Same size only", "Same values in any order"], 0, "Shape matters."),
      Q("Time complexity?", ["O(n)", "O(n log n)", "O(n^2)"], 0, "Visit each pair once."),
      Q("If one node is null and the other isn't?", ["Return false", "Return true", "Skip"], 0, "Structures differ."),
      Q("Both null at the same spot means?", ["That subtree matches (true)", "false", "Error"], 0, "Base case."),
      Q("Space complexity (recursion)?", ["O(h)", "O(1)", "O(n^2)"], 0, "Call stack."),
      Q("You compare at each step?", ["Values plus both subtrees", "Only values", "Only structure"], 0, "Both must match.")
    ]
  },
  "problem_1100": {
    description: "Determine whether a binary tree is a mirror image of itself (symmetric around its center).",
    example: { input: "root = [1,2,2,3,4,4,3]", output: "true", why: "the left and right subtrees mirror each other" },
    quizzes: [
      Q("You check whether?", ["The left subtree mirrors the right subtree", "The tree is a BST", "All values are equal"], 0, "Mirror symmetry."),
      Q("The recursion compares?", ["left.left with right.right, left.right with right.left", "left with left", "roots only"], 0, "Cross comparison."),
      Q("Time complexity?", ["O(n)", "O(n log n)", "O(n^2)"], 0, "Each node once."),
      Q("Two mirrored nodes must have?", ["Equal values", "Different values", "No children"], 0, "Plus mirrored subtrees."),
      Q("One null and one non-null means?", ["Not symmetric", "Symmetric", "Skip"], 0, "Structure breaks."),
      Q("An iterative version uses?", ["A queue (pairs of nodes)", "A heap", "A trie"], 0, "BFS of mirrored pairs."),
      Q("Space complexity (recursion)?", ["O(h)", "O(1)", "O(n^2)"], 0, "Call stack.")
    ]
  },
  "problem_0182": {
    description: "Return the diameter of a binary tree: the length (in edges) of the longest path between any two nodes.",
    example: { input: "root = [1,2,3,4,5]", output: "3", why: "the path 4 -> 2 -> 1 -> 3 has 3 edges" },
    quizzes: [
      Q("At each node, the candidate diameter is?", ["left height + right height", "max of the heights", "the node's value"], 0, "Path through the node."),
      Q("You compute this with?", ["A postorder DFS returning heights", "BFS", "Sorting"], 0, "Bottom-up."),
      Q("The path may or may not pass through?", ["The root", "A leaf", "The deepest node"], 0, "Any node can be the peak."),
      Q("Time complexity?", ["O(n)", "O(n log n)", "O(n^2)"], 0, "One DFS pass."),
      Q("Diameter is measured in?", ["Edges (here)", "Nodes always", "Levels"], 0, "Edge count."),
      Q("Each DFS call returns?", ["The node's height", "The diameter", "The value"], 0, "Height to the parent."),
      Q("The global answer is updated?", ["At every node", "Only at the root", "Only at leaves"], 0, "Track the maximum.")
    ]
  },
  "problem_1101": {
    description: "Determine whether a binary tree is height-balanced (every node's two subtrees differ in height by at most one).",
    example: { input: "root = [3,9,20,null,null,15,7]", output: "true", why: "all subtree heights differ by at most 1" },
    quizzes: [
      Q("A node is balanced when?", ["Its subtree heights differ by at most 1", "It has two children", "It is a leaf"], 0, "And both subtrees are balanced."),
      Q("An efficient check returns?", ["Height, with a sentinel for imbalance", "The diameter", "The value"], 0, "Bottom-up, short-circuit."),
      Q("Time complexity (optimal)?", ["O(n)", "O(n log n)", "O(n^2)"], 0, "One DFS pass."),
      Q("The naive approach recomputes heights, giving?", ["O(n^2)", "O(n)", "O(log n)"], 0, "Repeated work."),
      Q("Balance must hold?", ["At every node", "Only at the root", "Only at leaves"], 0, "Recursive property."),
      Q("Returning -1 (or similar) signals?", ["An imbalance was found", "Height 1", "A leaf"], 0, "Short-circuit upward."),
      Q("Space complexity?", ["O(h)", "O(1)", "O(n^2)"], 0, "Call stack.")
    ]
  },
  "problem_0183": {
    description: "Return the maximum depth of a binary tree (the number of nodes along the longest path from the root to a leaf).",
    example: { input: "root = [3,9,20,null,null,15,7]", output: "3", why: "root -> 20 -> 15 is the deepest path" },
    quizzes: [
      Q("Max depth equals?", ["1 + max(left depth, right depth)", "left + right depth", "the number of leaves"], 0, "Recursive definition."),
      Q("The recursion is a?", ["Postorder DFS", "Preorder only", "Sort"], 0, "Depths from subtrees."),
      Q("Time complexity?", ["O(n)", "O(n log n)", "O(n^2)"], 0, "Each node once."),
      Q("A null node has depth?", ["0", "1", "-1"], 0, "Base case."),
      Q("A BFS version counts?", ["The number of levels", "The leaves", "The edges only"], 0, "Level-by-level."),
      Q("Space complexity (recursion)?", ["O(h)", "O(1)", "O(n^2)"], 0, "Call stack."),
      Q("Depth here counts?", ["Nodes on the longest root-to-leaf path", "Edges only", "Leaves only"], 0, "Node count.")
    ]
  },
  "problem_0196": {
    description: "Return the minimum depth of a binary tree: the number of nodes on the shortest path from the root to a leaf.",
    example: { input: "root = [3,9,20,null,null,15,7]", output: "2", why: "root -> 9 reaches a leaf in 2 nodes" },
    quizzes: [
      Q("A subtle case: a node with one child?", ["Takes the depth of the existing child", "Counts as a leaf", "Returns 0"], 0, "A leaf needs no children."),
      Q("BFS is efficient here because?", ["It stops at the first leaf found", "It sorts", "It uses a heap"], 0, "Nearest leaf first."),
      Q("A leaf is a node with?", ["No children", "One child", "Two children"], 0, "Path ends there."),
      Q("Time complexity (worst case)?", ["O(n)", "O(log n)", "O(n^2)"], 0, "May scan all nodes."),
      Q("For min depth, naive min of child depths fails when?", ["One child is null", "Both children exist", "The tree is full"], 0, "Null isn't a leaf."),
      Q("BFS space complexity?", ["O(width)", "O(1)", "O(n^2)"], 0, "The queue."),
      Q("Min depth counts to the?", ["Nearest leaf", "Deepest leaf", "Root only"], 0, "Shortest path.")
    ]
  },
  "problem_1102": {
    description: "Determine whether one binary tree is a subtree of another (matching structure and values at some node).",
    example: { input: "root and a smaller subRoot", output: "true if subRoot appears in root", why: "an exact subtree match exists" },
    quizzes: [
      Q("The approach checks?", ["Same-tree at each node of the big tree", "Only the root", "Values in any order"], 0, "Try every anchor."),
      Q("The helper reused is?", ["isSameTree", "level order", "a heap"], 0, "Exact match test."),
      Q("Time complexity (naive)?", ["O(n * m)", "O(n)", "O(log n)"], 0, "Compare at each node."),
      Q("A match requires?", ["Identical structure and values", "Same size", "Same root value only"], 0, "Full subtree equality."),
      Q("A faster method serializes and uses?", ["String matching (e.g. KMP)", "A heap", "Binary search"], 0, "Substring of traversal."),
      Q("Markers are needed in serialization to?", ["Encode nulls / boundaries", "Sort", "Compress"], 0, "Avoid false matches."),
      Q("Space complexity (naive recursion)?", ["O(h)", "O(1)", "O(nm)"], 0, "Call stack.")
    ]
  },
  "problem_0184": {
    description: "Determine whether the tree has a root-to-leaf path whose node values sum to a given target.",
    example: { input: "root, targetSum = 22", output: "true", why: "some root-to-leaf path sums to 22" },
    quizzes: [
      Q("The approach subtracts the value and?", ["Recurses with the reduced target", "Sorts", "Uses a heap"], 0, "Carry remaining sum down."),
      Q("The check succeeds at?", ["A leaf where the remaining target equals the leaf value", "Any node", "The root"], 0, "Path ends at a leaf."),
      Q("Time complexity?", ["O(n)", "O(n log n)", "O(n^2)"], 0, "Each node once."),
      Q("The path must end at a?", ["Leaf", "Any node", "The root"], 0, "Root-to-leaf."),
      Q("At each node you track?", ["The remaining sum needed", "The depth", "The count"], 0, "Target minus value."),
      Q("A null node returns?", ["false (no path)", "true", "0"], 0, "Not a leaf."),
      Q("Space complexity?", ["O(h)", "O(1)", "O(n^2)"], 0, "Recursion stack.")
    ]
  },
  "problem_1104": {
    description: "Return all root-to-leaf paths whose node values sum to a given target.",
    example: { input: "root, targetSum = 22", output: "every qualifying root-to-leaf path", why: "collect all matching paths" },
    quizzes: [
      Q("The technique is?", ["DFS with backtracking, tracking the current path", "BFS only", "Sorting"], 0, "Build and unbuild the path."),
      Q("On reaching a leaf you?", ["Record the path if the sum matches", "Always record", "Stop entirely"], 0, "Check the target."),
      Q("Backtracking means you?", ["Remove the node after exploring it", "Keep all nodes", "Sort"], 0, "Restore the path."),
      Q("Time complexity?", ["O(n^2) worst case (path copies)", "O(n)", "O(log n)"], 0, "Copying paths."),
      Q("Paths must be?", ["Root to leaf", "Any node to any node", "Leaf to leaf"], 0, "Full paths."),
      Q("The current path is stored in?", ["A list you push/pop", "A heap", "A hash map"], 0, "DFS state."),
      Q("Space complexity?", ["O(n) for recursion + output", "O(1)", "O(log n)"], 0, "Path and results.")
    ]
  },
  "problem_1105": {
    description: "Count the number of downward paths (not necessarily root-to-leaf) whose node values sum to a given target.",
    example: { input: "root, targetSum = 8", output: "the count of qualifying paths", why: "paths may start and end at any nodes going downward" },
    quizzes: [
      Q("The efficient approach uses?", ["Prefix sums with a hash map", "Sorting", "A heap"], 0, "Count sums along the path."),
      Q("You look up?", ["currentSum - target in the map", "the target directly", "the depth"], 0, "Paths ending here."),
      Q("Time complexity?", ["O(n)", "O(n^2)", "O(n log n)"], 0, "With prefix sums."),
      Q("Paths go?", ["Downward only (parent to child)", "In any direction", "Root to leaf only"], 0, "Not upward."),
      Q("After visiting a node you must?", ["Remove its prefix sum (backtrack)", "Keep it", "Sort"], 0, "Avoid cross-branch leakage."),
      Q("The map stores?", ["Counts of prefix sums seen", "Node values", "Depths"], 0, "Running-sum frequency."),
      Q("The naive O(n^2) method?", ["Starts a sum from every node", "Sorts", "Uses BFS"], 0, "Recount per start.")
    ]
  },
  "problem_0185": {
    description: "Return the maximum path sum in a binary tree, where a path is any sequence of connected nodes (it need not pass through the root).",
    example: { input: "root = [-10,9,20,null,null,15,7]", output: "42", why: "15 + 20 + 7 = 42" },
    quizzes: [
      Q("At each node the candidate is?", ["node + max(0,left gain) + max(0,right gain)", "node only", "left + right only"], 0, "A path peaking here."),
      Q("Negative subtree contributions are?", ["Clamped to 0 (dropped)", "Always included", "Doubled"], 0, "Skip harmful branches."),
      Q("The value returned upward is?", ["node + max(left gain, right gain)", "the full through-path", "the diameter"], 0, "Only one side extends."),
      Q("Time complexity?", ["O(n)", "O(n log n)", "O(n^2)"], 0, "One DFS."),
      Q("The path can?", ["Start and end at any nodes", "Only be root-to-leaf", "Only be leaf-to-leaf"], 0, "Any connected path."),
      Q("You track the answer?", ["Globally, updated at each node", "Only at the root", "Only at leaves"], 0, "Maximum over all peaks."),
      Q("Space complexity?", ["O(h)", "O(1)", "O(n^2)"], 0, "Recursion stack.")
    ]
  },
  "problem_0188": {
    description: "Return all node values that are exactly distance k from a given target node in the tree.",
    example: { input: "root, target, k = 2", output: "nodes two edges away from the target", why: "distance measured in both directions" },
    quizzes: [
      Q("Distance is measured?", ["In both directions (up and down)", "Downward only", "Upward only"], 0, "Toward parents too."),
      Q("A common approach builds?", ["A parent map, then BFS from the target", "A heap", "A trie"], 0, "Treat it like a graph."),
      Q("With the parent map you do?", ["BFS outward k levels", "Sorting", "Binary search"], 0, "Expand in all directions."),
      Q("You must track?", ["Visited nodes (to avoid going back)", "Values only", "Depths only"], 0, "Prevent revisiting."),
      Q("Time complexity?", ["O(n)", "O(n log n)", "O(n^2)"], 0, "Build map + BFS."),
      Q("An alternative uses?", ["DFS returning the distance to the target", "A single pass sort", "A heap"], 0, "Propagate distances."),
      Q("At exactly distance k you?", ["Collect those nodes", "Stop early", "Sort"], 0, "The answer set.")
    ]
  },
  "problem_0189": {
    description: "Return the boundary of a binary tree in anticlockwise order: the root, the left boundary, all leaves, then the right boundary in reverse.",
    example: { input: "a binary tree", output: "root, left edge, leaves, reversed right edge", why: "the anticlockwise boundary" },
    quizzes: [
      Q("The boundary is composed of?", ["Left boundary + leaves + reversed right boundary", "Just the leaves", "An inorder traversal"], 0, "Three parts, plus root."),
      Q("The right boundary is added?", ["In reverse order", "In forward order", "Not at all"], 0, "For anticlockwise order."),
      Q("Leaves are collected via?", ["A DFS", "A heap", "Binary search"], 0, "Left to right."),
      Q("You must avoid?", ["Double-counting corner nodes", "Sorting", "Recursion"], 0, "Leaves vs boundaries overlap."),
      Q("Time complexity?", ["O(n)", "O(n log n)", "O(n^2)"], 0, "A few passes."),
      Q("The left boundary excludes?", ["Leaves (added separately)", "The root", "Nothing"], 0, "Avoid duplicates."),
      Q("Space complexity?", ["O(n)", "O(1)", "O(log n)"], 0, "Output and recursion.")
    ]
  },
  "problem_1103": {
    description: "Count the number of nodes in a complete binary tree more efficiently than visiting every node.",
    example: { input: "a complete binary tree", output: "the node count", why: "exploit the complete-tree structure" },
    quizzes: [
      Q("Exploiting completeness gives?", ["O(log^2 n)", "O(n)", "O(1)"], 0, "Faster than counting all."),
      Q("You compare?", ["The left-most and right-most depths", "All leaves", "The values"], 0, "Detect a full subtree."),
      Q("If left depth == right depth, the subtree has?", ["2^h - 1 nodes", "n/2 nodes", "unknown"], 0, "A perfect subtree."),
      Q("Otherwise you?", ["Recurse into both subtrees", "Stop", "Sort"], 0, "Count each side."),
      Q("A complete tree fills levels?", ["Left to right, top down", "Randomly", "Right to left"], 0, "By definition."),
      Q("Naively counting is?", ["O(n)", "O(log n)", "O(1)"], 0, "Visit every node."),
      Q("Space complexity?", ["O(log n)", "O(n)", "O(1)"], 0, "Recursion depth.")
    ]
  },
  "problem_0193": {
    description: "Return the level-order traversal of a binary tree: node values grouped level by level from top to bottom.",
    example: { input: "root = [3,9,20,null,null,15,7]", output: "[[3],[9,20],[15,7]]", why: "each level as a separate list" },
    quizzes: [
      Q("Level order is a?", ["BFS using a queue", "DFS using a stack", "Sort"], 0, "Breadth-first."),
      Q("To separate levels you?", ["Process one level's size at a time", "Sort by depth", "Use a heap"], 0, "Snapshot the queue size."),
      Q("Time complexity?", ["O(n)", "O(n log n)", "O(n^2)"], 0, "Each node once."),
      Q("The queue holds?", ["Nodes of the current frontier", "All values sorted", "Only leaves"], 0, "FIFO order."),
      Q("Children are enqueued?", ["Left then right", "Right then left", "Randomly"], 0, "Preserve order."),
      Q("Space complexity?", ["O(width)", "O(1)", "O(n^2)"], 0, "The queue."),
      Q("The output groups nodes by?", ["Level/depth", "Value", "Subtree"], 0, "Per level.")
    ]
  },
  "problem_0194": {
    description: "Return the zigzag (spiral) level-order traversal, alternating left-to-right and right-to-left on successive levels.",
    example: { input: "root = [3,9,20,null,null,15,7]", output: "[[3],[20,9],[15,7]]", why: "every other level is reversed" },
    quizzes: [
      Q("It is level-order with?", ["Alternating direction per level", "Sorting", "A heap"], 0, "Reverse odd levels."),
      Q("You can implement the flip by?", ["Reversing a level or using a deque", "A min-heap", "Binary search"], 0, "Toggle direction."),
      Q("Time complexity?", ["O(n)", "O(n log n)", "O(n^2)"], 0, "Each node once."),
      Q("The underlying traversal is?", ["BFS", "DFS postorder", "Inorder"], 0, "Level by level."),
      Q("A direction flag is?", ["Toggled each level", "Fixed", "Random"], 0, "Alternate order."),
      Q("Space complexity?", ["O(width)", "O(1)", "O(n^2)"], 0, "Queue plus level buffer."),
      Q("The first level is output?", ["Left to right", "Right to left", "Reversed"], 0, "Then it alternates.")
    ]
  },
  "problem_0197": {
    description: "Return the average value of the nodes on each level of a binary tree.",
    example: { input: "root = [3,9,20,null,null,15,7]", output: "[3.0, 14.5, 11.0]", why: "per-level averages" },
    quizzes: [
      Q("The traversal used is?", ["BFS level by level", "Inorder DFS", "A heap"], 0, "Compute per level."),
      Q("For each level you compute?", ["Sum divided by count", "The max", "The median"], 0, "The mean."),
      Q("Time complexity?", ["O(n)", "O(n log n)", "O(n^2)"], 0, "Each node once."),
      Q("You process a level by?", ["Reading the current queue size", "Sorting", "Using a heap"], 0, "Fixed count per level."),
      Q("Watch out for?", ["Integer overflow in the sum (use a wider type)", "Negative depth", "Cycles"], 0, "Large sums."),
      Q("Space complexity?", ["O(width)", "O(1)", "O(n^2)"], 0, "The queue."),
      Q("The result has one value per?", ["Level", "Node", "Leaf"], 0, "Per-level averages.")
    ]
  },
  "problem_0195": {
    description: "Return the values of the nodes visible from the right side of a binary tree, top to bottom.",
    example: { input: "root = [1,2,3,null,5,null,4]", output: "[1, 3, 4]", why: "the rightmost node at each level" },
    quizzes: [
      Q("The right-side view is?", ["The last node of each level", "The rightmost leaf only", "An inorder traversal"], 0, "One node per level."),
      Q("A BFS approach picks?", ["The final node dequeued per level", "The first node", "The max value"], 0, "Rightmost in view."),
      Q("A DFS approach visits?", ["Right child first, recording the first node per depth", "Left first", "Leaves only"], 0, "First seen at each depth."),
      Q("Time complexity?", ["O(n)", "O(n log n)", "O(n^2)"], 0, "Each node once."),
      Q("The result has one value per?", ["Level", "Leaf", "Subtree"], 0, "Per depth."),
      Q("A node can be in the view even if it is a?", ["Left child (when no right sibling exists)", "Only a right child", "Only the root"], 0, "Rightmost visible."),
      Q("Space complexity?", ["O(h) or O(width)", "O(1)", "O(n^2)"], 0, "Stack or queue.")
    ]
  },
  "problem_1007": {
    description: "Determine whether two given nodes in a binary tree are cousins: the same depth but different parents.",
    example: { input: "root, x, y", output: "true if same depth, different parents", why: "cousins share a level but not a parent" },
    quizzes: [
      Q("Cousins have?", ["The same depth but different parents", "The same parent", "Different depths"], 0, "Two conditions."),
      Q("You record each target's?", ["Depth and parent", "Value only", "Subtree size"], 0, "Compare both."),
      Q("The traversal can be?", ["BFS or DFS", "A heap", "Binary search"], 0, "Either works."),
      Q("Siblings (same parent) are?", ["Not cousins", "Cousins", "Always cousins"], 0, "Different-parent rule."),
      Q("Time complexity?", ["O(n)", "O(n log n)", "O(n^2)"], 0, "One pass."),
      Q("Same depth but same parent means?", ["Siblings, so false", "Cousins", "Error"], 0, "Fails the parent test."),
      Q("Space complexity?", ["O(h) or O(width)", "O(1)", "O(n^2)"], 0, "Traversal state.")
    ]
  },
  "problem_1006": {
    description: "Populate each node's next pointer to point to its right neighbor on the same level (null if none).",
    example: { input: "a perfect binary tree", output: "each node's next set to its level-right neighbor", why: "connect nodes across each level" },
    quizzes: [
      Q("Using the established next links, you can connect levels in?", ["O(1) extra space", "O(n) space", "O(log n) extra beyond recursion"], 0, "Level-by-level threading."),
      Q("A node's left child's next is?", ["Its right child", "Null", "The root"], 0, "Same parent."),
      Q("A node's right child's next is?", ["The left child of the parent's next", "Null always", "The root"], 0, "Cross-parent link."),
      Q("A BFS solution uses?", ["O(width) queue space", "O(1)", "O(n^2)"], 0, "Simpler but more space."),
      Q("Time complexity?", ["O(n)", "O(n log n)", "O(n^2)"], 0, "Each node once."),
      Q("For a perfect tree, the O(1) method walks?", ["Level by level via next pointers", "Randomly", "Bottom up only"], 0, "Use the links you set."),
      Q("The rightmost node's next is?", ["Null", "The root", "Itself"], 0, "No right neighbor.")
    ]
  },
  "problem_1108": {
    description: "Return the values of the nodes visible from the left side of a binary tree, top to bottom.",
    example: { input: "root = [1,2,3,null,5,null,4]", output: "[1, 2, 5]", why: "the leftmost node at each level" },
    quizzes: [
      Q("The left-side view is?", ["The first node of each level", "The leftmost leaf only", "An inorder traversal"], 0, "One node per level."),
      Q("A BFS approach picks?", ["The first node dequeued per level", "The last node", "The min value"], 0, "Leftmost in view."),
      Q("A DFS approach visits?", ["Left child first, recording the first node per depth", "Right first", "Leaves only"], 0, "First seen at each depth."),
      Q("Time complexity?", ["O(n)", "O(n log n)", "O(n^2)"], 0, "Each node once."),
      Q("The result has one value per?", ["Level", "Leaf", "Subtree"], 0, "Per depth."),
      Q("A right child can appear if?", ["No left sibling exists at that spot", "Never", "Only at the root"], 0, "Leftmost visible."),
      Q("Space complexity?", ["O(h) or O(width)", "O(1)", "O(n^2)"], 0, "Stack or queue.")
    ]
  },
  "problem_0190": {
    description: "Return the vertical order traversal of a binary tree, grouping nodes by horizontal column (left to right), top to bottom within a column.",
    example: { input: "a binary tree", output: "columns of node values from left to right", why: "group by horizontal distance" },
    quizzes: [
      Q("Nodes are grouped by?", ["Horizontal distance (column index)", "Depth only", "Value"], 0, "Left child -1, right +1."),
      Q("You track for each node its?", ["Column (and row for ordering)", "Only the value", "Only the depth"], 0, "Column key."),
      Q("A BFS keeps vertical order by?", ["Processing top-down", "Sorting values", "A heap of values"], 0, "Rows in order."),
      Q("Ties (same row and column) are typically broken by?", ["Value (in strict variants)", "Random order", "Depth only"], 0, "Deterministic order."),
      Q("Time complexity?", ["O(n) to O(n log n)", "O(n^2)", "O(2^n)"], 0, "Depends on sorting ties."),
      Q("Columns are output?", ["Left to right", "Right to left", "By value"], 0, "Increasing column index."),
      Q("Space complexity?", ["O(n)", "O(1)", "O(log n)"], 0, "Column map.")
    ]
  },
  "problem_0191": {
    description: "Return the top view of a binary tree: the first node seen at each horizontal distance when looking down from above, left to right.",
    example: { input: "a binary tree", output: "one node per column, left to right", why: "the topmost node of each column" },
    quizzes: [
      Q("The top view keeps?", ["The first (topmost) node per horizontal distance", "The last node", "All nodes"], 0, "One per column."),
      Q("The traversal should be?", ["BFS (so the topmost is seen first)", "DFS postorder", "Inorder"], 0, "Level order by column."),
      Q("Horizontal distance changes by?", ["-1 going left, +1 going right", "+1 both ways", "0"], 0, "Column tracking."),
      Q("You record a column only?", ["The first time it appears", "Every time", "Never"], 0, "Topmost wins."),
      Q("Time complexity?", ["O(n)", "O(n log n)", "O(n^2)"], 0, "Each node once."),
      Q("The output is ordered by?", ["Column index (left to right)", "Value", "Depth"], 0, "Horizontal order."),
      Q("Space complexity?", ["O(n)", "O(1)", "O(log n)"], 0, "Column map + queue.")
    ]
  },
  "problem_1106": {
    description: "Return the bottom view of a binary tree: the last node seen at each horizontal distance when looking from below, left to right.",
    example: { input: "a binary tree", output: "one node per column, left to right", why: "the lowest node of each column" },
    quizzes: [
      Q("The bottom view keeps?", ["The last (lowest) node per horizontal distance", "The first node", "All nodes"], 0, "Latest wins."),
      Q("Using BFS, you?", ["Overwrite each column as you go deeper", "Keep only the first", "Sort"], 0, "Bottom-most survives."),
      Q("Horizontal distance changes by?", ["-1 left, +1 right", "0", "+2 right"], 0, "Column tracking."),
      Q("Time complexity?", ["O(n)", "O(n log n)", "O(n^2)"], 0, "Each node once."),
      Q("The difference from top view is?", ["Keep the last node, not the first", "Use DFS inorder", "Sort by value"], 0, "Overwrite per column."),
      Q("The output is ordered by?", ["Column index", "Value", "Depth"], 0, "Left to right."),
      Q("Space complexity?", ["O(n)", "O(1)", "O(log n)"], 0, "Column map + queue.")
    ]
  },
  "problem_1107": {
    description: "Return the maximum width of a binary tree: the largest number of positions between the leftmost and rightmost non-null nodes on any level (nulls in between count).",
    example: { input: "root = [1,3,2,5,3,null,9]", output: "4", why: "the widest level spans 4 index positions" },
    quizzes: [
      Q("Width counts?", ["Positions including gaps (nulls) between ends", "Only non-null nodes", "Leaves only"], 0, "Index span."),
      Q("You assign each node an?", ["Index (child = 2i, 2i+1)", "Depth only", "Value key"], 0, "Heap-style indexing."),
      Q("Per level, width is?", ["rightIndex - leftIndex + 1", "node count", "the depth"], 0, "Index difference."),
      Q("To avoid overflow you?", ["Normalize indices per level", "Sort", "Use a heap"], 0, "Subtract the first index."),
      Q("The traversal is?", ["BFS carrying indices", "Inorder DFS", "A heap"], 0, "Level by level."),
      Q("Time complexity?", ["O(n)", "O(n log n)", "O(n^2)"], 0, "Each node once."),
      Q("Gaps between the ends are?", ["Counted in the width", "Ignored", "Errors"], 0, "Positions matter.")
    ]
  },
  "problem_0198": {
    description: "Find the lowest common ancestor (LCA) of two nodes in a binary tree (both nodes are guaranteed to exist).",
    example: { input: "root, p, q", output: "their lowest common ancestor", why: "the deepest node that has both as descendants" },
    quizzes: [
      Q("The recursive approach returns?", ["The node where p and q split (found in different subtrees)", "The root always", "A leaf"], 0, "Split point."),
      Q("If a node equals p or q, you?", ["Return that node upward", "Continue past it", "Ignore it"], 0, "It may be the LCA."),
      Q("When both subtrees return non-null, the current node is?", ["The LCA", "A leaf", "The root"], 0, "They split here."),
      Q("Time complexity?", ["O(n)", "O(n log n)", "O(n^2)"], 0, "One DFS."),
      Q("This version assumes?", ["Both nodes exist in the tree", "The tree is a BST", "The tree is balanced"], 0, "Guaranteed presence."),
      Q("If only one subtree returns non-null, you?", ["Propagate that result upward", "Return null", "Stop"], 0, "Both are on one side."),
      Q("Space complexity?", ["O(h)", "O(1)", "O(n^2)"], 0, "Recursion stack.")
    ]
  },
  "problem_0214": {
    description: "Find the lowest common ancestor of two nodes in a binary search tree, exploiting the BST ordering.",
    example: { input: "BST root, p, q", output: "their lowest common ancestor", why: "the split point by value comparison" },
    quizzes: [
      Q("You use the BST property to?", ["Walk left or right by comparing values", "Scan all nodes", "Sort"], 0, "Ordered navigation."),
      Q("If both values are smaller than the node, go?", ["Left", "Right", "Stop"], 0, "LCA is on the left."),
      Q("If both are larger, go?", ["Right", "Left", "Stop"], 0, "LCA is on the right."),
      Q("The LCA is the first node where?", ["The values split (one each side, or equal)", "A leaf is reached", "The root is hit"], 0, "Divergence point."),
      Q("Time complexity?", ["O(h)", "O(n)", "O(n log n)"], 0, "A single downward path."),
      Q("Space complexity (iterative)?", ["O(1)", "O(n)", "O(h)"], 0, "No recursion needed."),
      Q("This is faster than the general-tree LCA because?", ["Ordering avoids visiting all nodes", "It sorts", "It uses a heap"], 0, "O(h) vs O(n).")
    ]
  },
  "problem_1123": {
    description: "Find the lowest common ancestor of the set of deepest leaves in a binary tree.",
    example: { input: "a binary tree", output: "the LCA of all deepest leaves", why: "the smallest subtree containing every deepest leaf" },
    quizzes: [
      Q("Each DFS call returns?", ["The subtree depth and its deepest-leaf LCA", "Only the value", "The width"], 0, "Depth plus answer."),
      Q("If left and right depths are equal, the LCA is?", ["The current node", "A leaf", "The root always"], 0, "Deepest leaves on both sides."),
      Q("If one side is deeper, the answer comes from?", ["That deeper subtree", "The shallower side", "The root"], 0, "Follow the depth."),
      Q("Time complexity?", ["O(n)", "O(n log n)", "O(n^2)"], 0, "One DFS."),
      Q("The deepest leaves are those at?", ["The maximum depth", "Depth 0", "The root level"], 0, "Lowest level."),
      Q("The result is the smallest subtree containing?", ["All deepest leaves", "All leaves", "The root"], 0, "Their LCA."),
      Q("Space complexity?", ["O(h)", "O(1)", "O(n^2)"], 0, "Recursion stack.")
    ]
  },
  "problem_0204": {
    description: "Invert a binary tree so that every node's left and right children are swapped.",
    example: { input: "root = [4,2,7,1,3,6,9]", output: "[4,7,2,9,6,3,1]", why: "all left/right children swapped" },
    quizzes: [
      Q("At each node you?", ["Swap the left and right children", "Sort the subtree", "Delete a child"], 0, "Then recurse."),
      Q("The traversal can be?", ["DFS or BFS", "A heap", "Binary search"], 0, "Any full traversal."),
      Q("Time complexity?", ["O(n)", "O(n log n)", "O(n^2)"], 0, "Each node once."),
      Q("A null node is handled by?", ["Returning (base case)", "Swapping anyway", "An error"], 0, "Stop recursion."),
      Q("The result is the tree's?", ["Mirror image", "Sorted order", "In-order list"], 0, "Left-right flipped."),
      Q("Space complexity (recursion)?", ["O(h)", "O(1)", "O(n^2)"], 0, "Call stack."),
      Q("Inverting twice gives?", ["The original tree", "A sorted tree", "An empty tree"], 0, "Swap is its own inverse.")
    ]
  },
  "problem_0202": {
    description: "Flatten a binary tree into a 'linked list' in place, where each node's right pointer leads to the next node in preorder and the left pointer is null.",
    example: { input: "root = [1,2,5,3,4,null,6]", output: "a right-skewed list in preorder", why: "preorder sequence along right pointers" },
    quizzes: [
      Q("The resulting order follows?", ["Preorder", "Inorder", "Postorder"], 0, "Root, left, right."),
      Q("After flattening, each left pointer is?", ["Null", "The next node", "Unchanged"], 0, "Right-only chain."),
      Q("An O(1)-space approach uses?", ["The Morris-like rewiring of pointers", "A queue", "A heap"], 0, "Thread predecessors."),
      Q("In that approach, you attach?", ["The right subtree after the left subtree's rightmost node", "The left after the right", "Nothing"], 0, "Splice subtrees."),
      Q("Time complexity?", ["O(n)", "O(n log n)", "O(n^2)"], 0, "Each node once."),
      Q("The operation is done?", ["In place", "With a new tree", "By sorting"], 0, "Rewire pointers."),
      Q("A recursive version uses?", ["O(h) stack space", "O(1)", "O(n^2)"], 0, "Call stack.")
    ]
  },
  "problem_0205": {
    description: "Construct a binary tree from its preorder and inorder traversal arrays (values are unique).",
    example: { input: "preorder=[3,9,20,15,7], inorder=[9,3,15,20,7]", output: "the reconstructed tree", why: "preorder gives roots, inorder splits subtrees" },
    quizzes: [
      Q("The first preorder value is?", ["The root", "A leaf", "The smallest value"], 0, "Preorder starts at the root."),
      Q("Its position in inorder splits?", ["The left and right subtrees", "Nothing", "The leaves"], 0, "Left part / right part."),
      Q("A hash map of inorder indices gives?", ["O(1) root lookups", "Sorting", "A heap"], 0, "Speeds the split."),
      Q("Time complexity (with the map)?", ["O(n)", "O(n^2)", "O(n log n)"], 0, "Each node once."),
      Q("Values are assumed?", ["Unique", "Sorted", "Positive"], 0, "So indices are unambiguous."),
      Q("You recurse by?", ["Consuming preorder in order, splitting inorder", "Sorting", "BFS"], 0, "Divide and conquer."),
      Q("Space complexity?", ["O(n)", "O(1)", "O(log n)"], 0, "Map + recursion.")
    ]
  },
  "problem_1115": {
    description: "Construct a binary tree from its inorder and postorder traversal arrays (values are unique).",
    example: { input: "inorder=[9,3,15,20,7], postorder=[9,15,7,20,3]", output: "the reconstructed tree", why: "postorder's last value is the root" },
    quizzes: [
      Q("The last postorder value is?", ["The root", "A leaf", "The smallest value"], 0, "Postorder ends at the root."),
      Q("You consume postorder?", ["From the end (right subtree before left)", "From the start", "Randomly"], 0, "Reverse order."),
      Q("Inorder is used to?", ["Split left and right subtrees", "Sort", "Find leaves"], 0, "Root index splits it."),
      Q("A hash map of inorder indices gives?", ["O(1) lookups", "Sorting", "A heap"], 0, "Fast splits."),
      Q("Time complexity?", ["O(n)", "O(n^2)", "O(n log n)"], 0, "Each node once."),
      Q("When building from the end, recurse into?", ["The right subtree first", "The left first", "Neither"], 0, "Matches postorder order."),
      Q("Space complexity?", ["O(n)", "O(1)", "O(log n)"], 0, "Map + recursion.")
    ]
  },
  "problem_1109": {
    description: "Construct a binary tree from its preorder and postorder traversals. The tree is not unique in general; return any valid tree.",
    example: { input: "preorder=[1,2,4,5,3,6,7], postorder=[4,5,2,6,7,3,1]", output: "a valid reconstructed tree", why: "preorder/postorder fix roots and subtree boundaries" },
    quizzes: [
      Q("From preorder, the first value is?", ["The root", "A leaf", "The last node"], 0, "Preorder starts at the root."),
      Q("The next preorder value is?", ["The left subtree's root", "A leaf", "The right root"], 0, "Identify the left subtree."),
      Q("You find the left subtree size using?", ["That root's position in postorder", "Sorting", "A heap"], 0, "Boundary from postorder."),
      Q("The reconstruction is unique?", ["No, not in general", "Always", "Only for BSTs"], 0, "Ambiguous with single children."),
      Q("Time complexity (with index map)?", ["O(n)", "O(n^2)", "O(n log n)"], 0, "Each node once."),
      Q("The ambiguity arises from?", ["Nodes with a single child", "Duplicate values", "Null roots"], 0, "Can't tell left vs right."),
      Q("Space complexity?", ["O(n)", "O(1)", "O(log n)"], 0, "Map + recursion.")
    ]
  },
  "problem_0201": {
    description: "Design algorithms to serialize a binary tree to a string and deserialize that string back into the identical tree.",
    example: { input: "a binary tree", output: "a string, then the rebuilt tree", why: "a reversible encoding" },
    quizzes: [
      Q("A common encoding uses?", ["Preorder with explicit null markers", "Inorder only", "Just the values"], 0, "Markers preserve structure."),
      Q("Null markers are needed to?", ["Reconstruct structure unambiguously", "Sort", "Save space only"], 0, "Distinguish shapes."),
      Q("Deserialization follows the?", ["Same traversal order used to serialize", "Reverse order", "Sorted order"], 0, "Consistent encoding."),
      Q("Serialize/deserialize time is?", ["O(n)", "O(n log n)", "O(n^2)"], 0, "Each node once."),
      Q("Inorder alone is?", ["Insufficient to rebuild uniquely", "Enough", "Only for BSTs"], 0, "Needs another order or markers."),
      Q("BFS-based encoding uses?", ["Level order with nulls", "A heap", "Binary search"], 0, "Alternative scheme."),
      Q("Space complexity?", ["O(n)", "O(1)", "O(log n)"], 0, "The string / recursion.")
    ]
  },
  "problem_0206": {
    description: "Convert a sorted array into a height-balanced binary search tree.",
    example: { input: "[-10,-3,0,5,9]", output: "a balanced BST (e.g. root 0)", why: "the middle element becomes the root" },
    quizzes: [
      Q("The root should be?", ["The middle element", "The first element", "The largest"], 0, "Keeps it balanced."),
      Q("You then recurse on?", ["The left and right halves", "Only the left", "The whole array"], 0, "Build subtrees."),
      Q("The tree is?", ["Height-balanced", "A linked list", "Unbalanced"], 0, "By choosing the middle."),
      Q("Time complexity?", ["O(n)", "O(n log n)", "O(n^2)"], 0, "Each element once."),
      Q("Inorder of the result equals?", ["The original sorted array", "Reverse order", "Random"], 0, "BST property."),
      Q("The array is assumed?", ["Sorted", "Unsorted", "With duplicates only"], 0, "Precondition."),
      Q("Space complexity?", ["O(log n) recursion", "O(n^2)", "O(1)"], 0, "Balanced recursion depth.")
    ]
  },
  "problem_0207": {
    description: "Search a binary search tree for a given value and return the subtree rooted at that node (or null).",
    example: { input: "BST root, value = 2", output: "the subtree rooted at 2", why: "navigate by BST ordering" },
    quizzes: [
      Q("You navigate by?", ["Comparing the target to each node", "Scanning all nodes", "Sorting"], 0, "Go left or right."),
      Q("If the target is smaller, go?", ["Left", "Right", "Stop"], 0, "Smaller values are left."),
      Q("If larger, go?", ["Right", "Left", "Stop"], 0, "Larger values are right."),
      Q("Time complexity?", ["O(h)", "O(n log n)", "O(n^2)"], 0, "One downward path."),
      Q("Not found returns?", ["Null", "The root", "An error"], 0, "Reached a null link."),
      Q("Space complexity (iterative)?", ["O(1)", "O(n)", "O(h)"], 0, "No recursion needed."),
      Q("This is faster than linear search because?", ["The BST ordering prunes half each step", "It sorts", "It uses a heap"], 0, "O(h) path.")
    ]
  },
  "problem_0208": {
    description: "Insert a value into a binary search tree and return the tree's root, keeping the BST property.",
    example: { input: "BST root, value = 5", output: "the BST with 5 inserted at a leaf", why: "insert at the correct empty position" },
    quizzes: [
      Q("The new node is inserted at?", ["A leaf position found by BST navigation", "The root", "A random spot"], 0, "Where the search ends."),
      Q("You compare the value to?", ["Each node, going left or right", "All nodes", "The leaves only"], 0, "Find the empty slot."),
      Q("Time complexity?", ["O(h)", "O(n log n)", "O(n^2)"], 0, "One downward path."),
      Q("The BST property is?", ["Preserved after insertion", "Broken", "Ignored"], 0, "Correct position."),
      Q("Insertion at an empty link creates?", ["The new leaf node", "A rotation", "A deletion"], 0, "Attach there."),
      Q("Space complexity (iterative)?", ["O(1)", "O(n)", "O(h)"], 0, "No recursion needed."),
      Q("Duplicate handling is?", ["Problem-defined (often skipped or to one side)", "Always to the left", "An error"], 0, "By convention.")
    ]
  },
  "problem_0209": {
    description: "Determine whether a binary tree is a valid binary search tree (left subtree < node < right subtree, recursively).",
    example: { input: "root = [2,1,3]", output: "true", why: "ordering holds at every node" },
    quizzes: [
      Q("A correct check passes down?", ["Valid (min, max) bounds for each node", "Only the parent value", "Nothing"], 0, "Range narrows."),
      Q("Comparing only parent and child is?", ["Insufficient (grandchildren can violate)", "Enough", "Only for leaves"], 0, "Needs range bounds."),
      Q("An inorder traversal of a valid BST is?", ["Strictly increasing", "Decreasing", "Unordered"], 0, "Alternative check."),
      Q("Time complexity?", ["O(n)", "O(n log n)", "O(n^2)"], 0, "Each node once."),
      Q("Each node must satisfy?", ["min < node < max for its position", "node > 0", "node is even"], 0, "Range constraint."),
      Q("The inorder method tracks?", ["The previous value", "The depth", "The count"], 0, "Must keep increasing."),
      Q("Space complexity?", ["O(h)", "O(1)", "O(n^2)"], 0, "Recursion stack.")
    ]
  },
  "problem_1111": {
    description: "Implement an iterator over a BST that returns next() in ascending order and supports hasNext(), using controlled inorder traversal.",
    example: { input: "BST root; repeated next()", output: "values in ascending order", why: "inorder yields sorted order" },
    quizzes: [
      Q("The iterator simulates?", ["An inorder traversal using a stack", "Level order", "Postorder"], 0, "Sorted output."),
      Q("next() runs in amortized?", ["O(1)", "O(n)", "O(log n) always"], 0, "Over all calls."),
      Q("The stack holds at most?", ["O(h) nodes", "O(n) nodes", "2 nodes"], 0, "Left spine."),
      Q("On construction you push?", ["The leftmost path", "All nodes", "The root only"], 0, "Smallest first."),
      Q("After popping a node you push?", ["Its right child's left spine", "Its left child", "Nothing"], 0, "Next in order."),
      Q("hasNext() checks?", ["Whether the stack is non-empty", "The tree size", "The depth"], 0, "More to visit."),
      Q("Space complexity?", ["O(h)", "O(n)", "O(1)"], 0, "The stack.")
    ]
  },
  "problem_1113": {
    description: "Given a BST and a target, determine whether two different nodes sum to the target (Two Sum on a tree).",
    example: { input: "BST root, k = 9", output: "true if two nodes sum to 9", why: "a complementary pair exists" },
    quizzes: [
      Q("One approach stores seen values in?", ["A hash set during traversal", "A heap", "A trie"], 0, "Look for the complement."),
      Q("At each node you check for?", ["target - node.value in the set", "the node value only", "the depth"], 0, "Complement lookup."),
      Q("Another approach uses?", ["Two iterators (inorder from both ends)", "Sorting", "A heap"], 0, "Two-pointer on sorted order."),
      Q("Time complexity?", ["O(n)", "O(n^2)", "O(n log n)"], 0, "One traversal."),
      Q("The two nodes must be?", ["Different nodes", "The same node", "Leaves only"], 0, "Distinct values/positions."),
      Q("The hash-set approach space is?", ["O(n)", "O(1)", "O(log n)"], 0, "Stores visited values."),
      Q("Inorder of a BST gives?", ["Sorted order (enables two pointers)", "Random order", "Reverse order"], 0, "Two-pointer basis.")
    ]
  },
  "problem_0216": {
    description: "Find the value in a BST that is closest to a given target value.",
    example: { input: "BST root, target = 3.714", output: "4", why: "4 is the nearest node value" },
    quizzes: [
      Q("You navigate the BST while?", ["Tracking the closest value seen", "Visiting all nodes", "Sorting"], 0, "Update the best."),
      Q("At each node you go?", ["Toward the target (left or right)", "Always left", "Randomly"], 0, "Narrow the search."),
      Q("Time complexity?", ["O(h)", "O(n log n)", "O(n^2)"], 0, "One downward path."),
      Q("You update the closest when?", ["|node - target| is smaller", "node > target", "At every leaf only"], 0, "Minimize the gap."),
      Q("The BST property lets you?", ["Skip half the tree each step", "Sort faster", "Use a heap"], 0, "Prune by comparison."),
      Q("Space complexity (iterative)?", ["O(1)", "O(n)", "O(h)"], 0, "No recursion needed."),
      Q("The target may be?", ["A non-integer (closest node wins)", "Always present", "The root"], 0, "Nearest value.")
    ]
  },
  "problem_0210": {
    description: "Delete a node with a given key from a BST and return the new root, keeping the BST property.",
    example: { input: "BST root, key = 3", output: "the BST with 3 removed", why: "replace or splice to preserve ordering" },
    quizzes: [
      Q("Deleting a leaf is?", ["Simple removal", "A rotation", "Impossible"], 0, "Just detach it."),
      Q("Deleting a node with one child?", ["Replace it with that child", "Delete the child too", "Leave a gap"], 0, "Splice it out."),
      Q("Deleting a node with two children?", ["Replace with the inorder successor (or predecessor)", "Delete both subtrees", "Error"], 0, "Keep ordering."),
      Q("The inorder successor is?", ["The smallest value in the right subtree", "The root", "The largest overall"], 0, "Next larger value."),
      Q("Time complexity?", ["O(h)", "O(n log n)", "O(n^2)"], 0, "Search + splice."),
      Q("After replacing with the successor you?", ["Delete the successor from the right subtree", "Stop", "Sort"], 0, "Remove the duplicate."),
      Q("The BST property must be?", ["Maintained after deletion", "Rebuilt from scratch", "Ignored"], 0, "Correctness.")
    ]
  },
  "problem_0211": {
    description: "A valid BST had exactly two nodes swapped by mistake. Recover the tree by fixing those two nodes without changing its structure.",
    example: { input: "a BST with two values swapped", output: "the corrected BST", why: "swap the two offending nodes back" },
    quizzes: [
      Q("An inorder traversal of the broken BST reveals?", ["Two out-of-order positions", "Nothing", "Three swaps"], 0, "The violations."),
      Q("The two swapped nodes are found at?", ["The first and last inorder dips", "The root", "The leaves"], 0, "Order violations."),
      Q("You fix the tree by?", ["Swapping those two node values", "Restructuring", "Re-inserting all"], 0, "Only values change."),
      Q("An O(1)-space method uses?", ["Morris inorder traversal", "A full array copy", "A heap"], 0, "Threaded links."),
      Q("Time complexity?", ["O(n)", "O(n log n)", "O(n^2)"], 0, "One inorder pass."),
      Q("The tree's structure is?", ["Unchanged", "Rebuilt", "Rotated"], 0, "Only two values swap."),
      Q("If the two dips are adjacent, the swapped nodes are?", ["The two adjacent nodes", "Non-existent", "The root and a leaf"], 0, "A single dip case.")
    ]
  },
  "problem_0212": {
    description: "Merge two binary trees by overlaying them: where both have a node, sum the values; otherwise take whichever node exists.",
    example: { input: "t1 = [1,3,2], t2 = [2,1,3]", output: "[3,4,5]", why: "overlapping nodes are summed" },
    quizzes: [
      Q("Where both nodes exist you?", ["Sum their values", "Keep the first", "Keep the larger"], 0, "Overlay rule."),
      Q("Where only one exists you?", ["Use that node (and its subtree)", "Insert null", "Skip"], 0, "No conflict."),
      Q("The traversal is a?", ["Simultaneous DFS of both trees", "BFS of one", "Sort"], 0, "Walk in lockstep."),
      Q("Time complexity?", ["O(min(n, m))", "O(nm)", "O(n log n)"], 0, "Overlapping region."),
      Q("If both nodes are null you?", ["Return null", "Return 0 node", "Error"], 0, "Base case."),
      Q("The merge can be done?", ["In place on one tree", "Only with a new tree", "By sorting"], 0, "Reuse nodes."),
      Q("Space complexity?", ["O(h)", "O(1)", "O(nm)"], 0, "Recursion stack.")
    ]
  },
  "problem_1117": {
    description: "Merge multiple binary search trees (joined at matching leaf/root values) into a single valid BST, or report that it is not possible.",
    example: { input: "several BSTs", output: "one merged BST, or failure", why: "attach trees at matching leaves and validate" },
    quizzes: [
      Q("You attach a tree where?", ["A leaf value matches another tree's root", "Any node matches", "The depths match"], 0, "Join points."),
      Q("A hash map helps map?", ["Root values to trees", "Depths to nodes", "Values to colors"], 0, "Find attach targets."),
      Q("After merging you must?", ["Validate the result is a single BST", "Sort the values", "Nothing"], 0, "Confirm correctness."),
      Q("Exactly one tree should remain as?", ["The overall root tree", "A leaf", "Unused"], 0, "Single final root."),
      Q("Failure occurs when?", ["The result isn't a valid BST or trees don't join uniquely", "There are duplicates only", "n is odd"], 0, "Invalid merge."),
      Q("Time complexity?", ["O(total nodes)", "O(n^2)", "O(2^n)"], 0, "Linear-ish with maps."),
      Q("Validation checks?", ["BST ordering across the whole tree", "Only leaves", "Only the root"], 0, "Global property.")
    ]
  },
  "problem_0213": {
    description: "Find the maximum sum of all node values in any subtree that is itself a valid binary search tree.",
    example: { input: "a binary tree", output: "the largest valid-BST subtree sum", why: "only valid-BST subtrees qualify" },
    quizzes: [
      Q("Each DFS call returns?", ["Whether the subtree is a BST, plus its min, max, and sum", "Only the sum", "The height"], 0, "Bottom-up info."),
      Q("A node forms a BST when?", ["Both subtrees are BSTs and its value fits between their max and min", "It has two children", "It is a leaf"], 0, "Range condition."),
      Q("The answer tracks?", ["The maximum valid-BST sum seen", "The total sum", "The max depth"], 0, "Global maximum."),
      Q("Time complexity?", ["O(n)", "O(n^2)", "O(n log n)"], 0, "One DFS pass."),
      Q("A single node is?", ["Always a valid BST", "Never a BST", "A BST only if even"], 0, "Base case."),
      Q("The sum can be negative, so a valid subtree might?", ["Still lose to the empty/zero baseline", "Always win", "Be skipped"], 0, "Compare carefully."),
      Q("Space complexity?", ["O(h)", "O(1)", "O(n^2)"], 0, "Recursion stack.")
    ]
  },
  "problem_1009": {
    description: "Find the k-th smallest value in a binary search tree.",
    example: { input: "BST root, k = 1", output: "the smallest value", why: "inorder position k gives the kth smallest" },
    quizzes: [
      Q("Inorder traversal visits values in?", ["Ascending order", "Descending order", "Random order"], 0, "Sorted sequence."),
      Q("The kth node visited inorder is?", ["The kth smallest", "The kth largest", "The median"], 0, "Count as you go."),
      Q("You can stop?", ["Early, once k nodes are counted", "Only at the end", "Never"], 0, "No need to finish."),
      Q("Time complexity?", ["O(h + k)", "O(n log n)", "O(n^2)"], 0, "Partial inorder."),
      Q("An iterative version uses?", ["A stack", "A queue", "A heap"], 0, "Controlled inorder."),
      Q("For frequent queries you can augment nodes with?", ["Subtree sizes", "Colors", "Depths"], 0, "O(log n) per query."),
      Q("Space complexity?", ["O(h)", "O(1)", "O(n^2)"], 0, "Stack / recursion.")
    ]
  },
  "problem_1116": {
    description: "Convert a binary tree (often a BST) into a sorted doubly linked list in place, reusing the left/right pointers as prev/next.",
    example: { input: "a BST", output: "a sorted circular doubly linked list", why: "inorder order with prev/next links" },
    quizzes: [
      Q("The node order follows?", ["Inorder traversal", "Preorder", "Level order"], 0, "Sorted for a BST."),
      Q("left and right pointers become?", ["prev and next", "Unchanged", "Null"], 0, "Reused as list links."),
      Q("You track the?", ["Previously visited node during inorder", "Depth", "Count only"], 0, "Link prev to current."),
      Q("Time complexity?", ["O(n)", "O(n log n)", "O(n^2)"], 0, "One inorder pass."),
      Q("For a circular list you also link?", ["The head and tail together", "Only the head", "Nothing"], 0, "Close the ring."),
      Q("The conversion is done?", ["In place", "With new nodes", "By sorting an array"], 0, "Rewire pointers."),
      Q("Space complexity?", ["O(h)", "O(n)", "O(1) with Morris"], 0, "Recursion stack (or O(1) threaded).")
    ]
  },
  "problem_1110": {
    description: "Convert a BST to a 'greater tree' where each node's value becomes its original value plus the sum of all values greater than it.",
    example: { input: "a BST", output: "each node increased by the sum of larger values", why: "reverse-inorder running sum" },
    quizzes: [
      Q("The traversal order used is?", ["Reverse inorder (right, root, left)", "Inorder", "Preorder"], 0, "Largest first."),
      Q("You maintain a?", ["Running sum of visited (larger) values", "A stack of depths", "A heap"], 0, "Accumulate as you go."),
      Q("Each node's new value is?", ["Original value + running sum", "Running sum only", "The max"], 0, "Add greater values."),
      Q("Time complexity?", ["O(n)", "O(n log n)", "O(n^2)"], 0, "One traversal."),
      Q("The largest node's value is?", ["Unchanged (nothing greater)", "Doubled", "Zero"], 0, "No larger values."),
      Q("Reverse inorder visits?", ["Right subtree before left", "Left before right", "Root first"], 0, "Descending order."),
      Q("Space complexity?", ["O(h)", "O(1)", "O(n^2)"], 0, "Recursion stack.")
    ]
  },
  "problem_1112": {
    description: "Find the inorder successor (or predecessor) of a given node in a BST.",
    example: { input: "BST, a node p", output: "the next larger value's node", why: "the successor in sorted order" },
    quizzes: [
      Q("If the node has a right subtree, the successor is?", ["The leftmost node of that right subtree", "The parent", "The root"], 0, "Smallest larger value."),
      Q("If it has no right subtree, the successor is?", ["The lowest ancestor for which the node is in the left subtree", "A leaf", "Null always"], 0, "Walk up."),
      Q("An efficient iterative method uses?", ["BST navigation tracking a candidate", "A full inorder array", "A heap"], 0, "O(h) search."),
      Q("Time complexity?", ["O(h)", "O(n)", "O(n log n)"], 0, "One path."),
      Q("The successor is the?", ["Next larger value in sorted order", "Previous value", "The maximum"], 0, "Inorder next."),
      Q("The predecessor mirrors this with?", ["The right subtree logic reversed", "A heap", "Sorting"], 0, "Rightmost of left subtree."),
      Q("Space complexity (iterative)?", ["O(1)", "O(n)", "O(h)"], 0, "No recursion needed.")
    ]
  },
  "problem_1114": {
    description: "Construct a binary search tree from its preorder traversal.",
    example: { input: "preorder = [8,5,1,7,10,12]", output: "the reconstructed BST", why: "preorder plus BST ordering fixes the tree" },
    quizzes: [
      Q("The first preorder value is?", ["The root", "A leaf", "The smallest"], 0, "Preorder starts at the root."),
      Q("An efficient method uses?", ["Upper-bound constraints while scanning once", "Sorting then building", "A heap"], 0, "O(n) with bounds."),
      Q("Values smaller than the current root go?", ["Into the left subtree", "Into the right subtree", "Skipped"], 0, "BST rule."),
      Q("Values larger (within bounds) go?", ["Into the right subtree", "Into the left", "Skipped"], 0, "BST rule."),
      Q("Time complexity (bounds method)?", ["O(n)", "O(n^2)", "O(n log n)"], 0, "Single scan."),
      Q("Sorting preorder gives?", ["The inorder (so you could use two-array construction)", "Nothing useful", "Postorder"], 0, "Alternative approach."),
      Q("Space complexity?", ["O(h)", "O(1)", "O(n^2)"], 0, "Recursion stack.")
    ]
  },

  // ================= Graph =================
  "problem_0218": {
    description: "Given a binary matrix, return a matrix of the same size where each cell holds its distance to the nearest 0.",
    example: { input: "[[0,0,0],[0,1,0],[1,1,1]]", output: "distances to the nearest 0", why: "multi-source BFS from all zeros" },
    quizzes: [
      Q("The efficient approach is?", ["Multi-source BFS starting from all 0 cells", "DFS from each 1", "Sorting"], 0, "All zeros at distance 0."),
      Q("You seed the queue with?", ["Every 0 cell", "A single corner", "All 1 cells"], 0, "Simultaneous sources."),
      Q("Time complexity?", ["O(rows * cols)", "O((rc)^2)", "O(rc log rc)"], 0, "Each cell once."),
      Q("Each 1 cell's distance is set when?", ["BFS first reaches it", "At the end", "Randomly"], 0, "Shortest distance."),
      Q("Running single-source BFS from each 1 would be?", ["Much slower", "The same", "Faster"], 0, "Redundant work."),
      Q("Neighbors considered are?", ["The 4 orthogonal cells", "All 8 cells", "Diagonals only"], 0, "Grid adjacency."),
      Q("Space complexity?", ["O(rows * cols)", "O(1)", "O(log rc)"], 0, "The queue / output.")
    ]
  },
  "problem_0222": {
    description: "Find the length of the shortest clear path from the top-left to the bottom-right of a binary matrix, moving in 8 directions through 0 cells.",
    example: { input: "[[0,1],[1,0]]", output: "2", why: "a diagonal clear path of length 2" },
    quizzes: [
      Q("The right algorithm is?", ["BFS (shortest path in an unweighted grid)", "DFS", "Dijkstra"], 0, "Equal edge weights."),
      Q("Movement allows?", ["8 directions", "4 directions", "2 directions"], 0, "Including diagonals."),
      Q("Path length counts?", ["Cells visited", "Edges only", "Turns"], 0, "Number of cells."),
      Q("If start or end is blocked (1), return?", ["-1", "0", "1"], 0, "No path."),
      Q("Time complexity?", ["O(rows * cols)", "O((rc)^2)", "O(rc log rc)"], 0, "Each cell once."),
      Q("BFS guarantees the shortest path because?", ["It expands by distance level", "It sorts", "It uses a heap"], 0, "Unweighted edges."),
      Q("You only step onto cells that are?", ["0 (clear)", "1 (blocked)", "Any value"], 0, "Open cells.")
    ]
  },
  "problem_0221": {
    description: "Given a grid of fresh (1) and rotten (2) oranges, return the minutes until no fresh orange remains, or -1 if impossible.",
    example: { input: "[[2,1,1],[1,1,0],[0,1,1]]", output: "4", why: "rot spreads outward each minute" },
    quizzes: [
      Q("The approach is?", ["Multi-source BFS from all rotten oranges", "DFS", "Sorting"], 0, "Spread in waves."),
      Q("Each BFS level represents?", ["One minute", "One orange", "One row"], 0, "Time steps."),
      Q("You return -1 when?", ["Some fresh orange is never reached", "The grid is empty", "All are rotten"], 0, "Unreachable cells."),
      Q("Time complexity?", ["O(rows * cols)", "O((rc)^2)", "O(rc log rc)"], 0, "Each cell once."),
      Q("The initial queue holds?", ["All rotten oranges", "One rotten orange", "All fresh oranges"], 0, "Simultaneous sources."),
      Q("Neighbors are?", ["4-directional", "8-directional", "Diagonal only"], 0, "Orthogonal spread."),
      Q("The answer is?", ["The number of BFS levels (minutes)", "The orange count", "The grid size"], 0, "Elapsed time.")
    ]
  },
  "new-problem-2": {
    description: "Given rooms where each room contains keys to other rooms, determine whether all rooms can be visited starting from room 0.",
    example: { input: "[[1],[2],[3],[]]", output: "true", why: "keys chain through every room" },
    quizzes: [
      Q("This is a?", ["Graph reachability (DFS/BFS) problem", "Sorting problem", "Heap problem"], 0, "Can you reach all nodes?"),
      Q("You start the traversal from?", ["Room 0", "The last room", "A random room"], 0, "The given entry."),
      Q("You answer true when?", ["Every room is visited", "Room 0 is visited", "Any room is reached"], 0, "Full reachability."),
      Q("Time complexity?", ["O(rooms + keys)", "O(rooms^2)", "O(2^rooms)"], 0, "Linear in the graph."),
      Q("Keys in a room act as?", ["Edges to other rooms", "Weights", "Values"], 0, "Directed edges."),
      Q("You track?", ["Visited rooms", "Depths only", "Nothing"], 0, "Avoid re-visiting."),
      Q("Space complexity?", ["O(rooms)", "O(1)", "O(keys^2)"], 0, "Visited set + stack/queue.")
    ]
  },
  "problem_0219": {
    description: "Find the length of the shortest transformation sequence from a begin word to an end word, changing one letter at a time, with each intermediate word in a given dictionary.",
    example: { input: 'begin "hit", end "cog", wordList', output: "5", why: "hit -> hot -> dot -> dog -> cog" },
    quizzes: [
      Q("The algorithm is?", ["BFS over word states", "DFS", "Dijkstra with weights"], 0, "Shortest unweighted path."),
      Q("Neighbors of a word are?", ["Words differing by exactly one letter (in the set)", "All dictionary words", "Shorter words"], 0, "One-letter edits."),
      Q("Bidirectional BFS can?", ["Speed up the search", "Sort the words", "Guarantee a cycle"], 0, "Search from both ends."),
      Q("If the end word isn't reachable, return?", ["0", "-1 always", "the list size"], 0, "No sequence."),
      Q("Generating neighbors uses?", ["Wildcard patterns (h*t) or per-letter changes", "A heap", "Binary search"], 0, "Find candidates fast."),
      Q("The length counts?", ["Words in the sequence", "Edges only", "Letters changed"], 0, "Including both ends."),
      Q("Time complexity depends on?", ["Word length * dictionary size", "The alphabet only", "n^3 always"], 0, "Neighbor generation.")
    ]
  },
  "new-problem-14": {
    description: "Find the length of the shortest path that visits every node in an undirected connected graph (nodes may be revisited).",
    example: { input: "a small connected graph", output: "the shortest walk covering all nodes", why: "BFS over (node, visited-set) states" },
    quizzes: [
      Q("The state in BFS is?", ["(current node, bitmask of visited nodes)", "Just the node", "The depth"], 0, "Track coverage."),
      Q("The bitmask represents?", ["Which nodes have been visited", "Edge weights", "Colors"], 0, "Visited set."),
      Q("You start BFS from?", ["All nodes simultaneously", "Node 0 only", "A leaf"], 0, "Any start is allowed."),
      Q("The goal state has?", ["All bits set (all nodes visited)", "One bit set", "No bits set"], 0, "Full coverage."),
      Q("Time complexity?", ["O(2^n * n)", "O(n^2)", "O(n!)"], 0, "States over subsets."),
      Q("Nodes may be?", ["Revisited", "Visited once only", "Skipped"], 0, "It's a walk."),
      Q("Space complexity?", ["O(2^n * n)", "O(n)", "O(1)"], 0, "Visited states.")
    ]
  },
  "new-problem-3": {
    description: "On a Snakes and Ladders board, find the least number of dice moves to reach the final square from square 1.",
    example: { input: "a board with snakes and ladders", output: "the minimum number of moves", why: "BFS over board squares" },
    quizzes: [
      Q("The algorithm is?", ["BFS (each move is one edge)", "DFS", "Dijkstra"], 0, "Shortest moves."),
      Q("From a square you can reach?", ["The next 1 to 6 squares", "Any square", "Only ladders"], 0, "A dice roll."),
      Q("Snakes and ladders act as?", ["Immediate jumps after landing", "Weighted edges", "Dead ends"], 0, "Teleports."),
      Q("Each BFS level is?", ["One dice move", "One square", "One snake"], 0, "Move count."),
      Q("The board's boustrophedon layout requires?", ["Careful index-to-coordinate mapping", "Sorting", "A heap"], 0, "Zig-zag numbering."),
      Q("If the end is unreachable, return?", ["-1", "0", "the board size"], 0, "No path."),
      Q("Time complexity?", ["O(n^2) in the number of cells", "O(1)", "O(2^n)"], 0, "Cells and transitions.")
    ]
  },
  "problem_0226": {
    description: "Perform a flood fill on an image grid: starting from a pixel, replace its color and all connected same-colored pixels with a new color.",
    example: { input: "image, sr, sc, newColor", output: "the recolored image", why: "spread to connected same-color pixels" },
    quizzes: [
      Q("The technique is?", ["DFS or BFS from the start pixel", "Sorting", "A heap"], 0, "Spread over a region."),
      Q("You recolor pixels that are?", ["Connected and share the original color", "Any color", "Only neighbors of 0"], 0, "Same-color region."),
      Q("A key edge case is when?", ["The new color equals the original (avoid infinite loop)", "The grid is square", "sr = 0"], 0, "Guard against it."),
      Q("Neighbors are?", ["4-directional", "8-directional", "Diagonal only"], 0, "Orthogonal adjacency."),
      Q("Time complexity?", ["O(rows * cols)", "O((rc)^2)", "O(rc log rc)"], 0, "Each pixel once."),
      Q("The original color is read?", ["Before changing the start pixel", "After", "Never"], 0, "To match the region."),
      Q("Space complexity?", ["O(rows * cols) worst case", "O(1)", "O(log rc)"], 0, "Stack/queue.")
    ]
  },
  "problem_0228": {
    description: "Count the number of connected components in an undirected graph.",
    example: { input: "n = 5, edges = [[0,1],[1,2],[3,4]]", output: "2", why: "{0,1,2} and {3,4}" },
    quizzes: [
      Q("You can count components with?", ["DFS/BFS from each unvisited node, or union-find", "Sorting", "A heap"], 0, "Group connected nodes."),
      Q("Each new traversal start marks?", ["One new component", "One edge", "One leaf"], 0, "Increment the count."),
      Q("With union-find, the count is?", ["The number of distinct roots", "The edge count", "n"], 0, "Disjoint sets."),
      Q("Time complexity (DFS)?", ["O(V + E)", "O(V^2)", "O(E log E)"], 0, "Linear in the graph."),
      Q("A visited set prevents?", ["Recounting nodes", "Sorting", "Cycles only"], 0, "Each node once."),
      Q("Union-find's near-constant ops come from?", ["Path compression + union by rank", "Sorting", "A heap"], 0, "Amortized α(n)."),
      Q("Space complexity?", ["O(V)", "O(1)", "O(E^2)"], 0, "Visited / parent arrays.")
    ]
  },
  "problem_0224": {
    description: "Count the number of islands in a grid of '1' (land) and '0' (water), where islands are connected horizontally or vertically.",
    example: { input: "a grid of land and water", output: "the island count", why: "each connected land region is one island" },
    quizzes: [
      Q("The technique is?", ["DFS/BFS flooding each land region", "Sorting", "A heap"], 0, "Count regions."),
      Q("When you find an unvisited land cell you?", ["Flood the whole island and count 1", "Count every cell", "Skip it"], 0, "One island per region."),
      Q("Flooding marks cells as?", ["Visited (or sinks them to water)", "Sorted", "Deleted"], 0, "Avoid recounting."),
      Q("Neighbors are?", ["4-directional", "8-directional", "Diagonal only"], 0, "Orthogonal."),
      Q("Time complexity?", ["O(rows * cols)", "O((rc)^2)", "O(rc log rc)"], 0, "Each cell once."),
      Q("Union-find is an alternative that?", ["Unions adjacent land cells", "Sorts", "Uses a heap"], 0, "Count components."),
      Q("Space complexity (DFS)?", ["O(rows * cols) worst case", "O(1)", "O(log rc)"], 0, "Recursion/queue.")
    ]
  },
  "problem_0225": {
    description: "In a directed acyclic graph, return all paths from the source node 0 to the target node n-1.",
    example: { input: "graph = [[1,2],[3],[3],[]]", output: "[[0,1,3],[0,2,3]]", why: "all routes from 0 to 3" },
    quizzes: [
      Q("The technique is?", ["DFS with backtracking, collecting paths", "BFS shortest path", "Sorting"], 0, "Enumerate all routes."),
      Q("The graph is a?", ["DAG (no cycles)", "Weighted graph", "Tree only"], 0, "So paths are finite."),
      Q("You record a path when?", ["You reach the target node", "Any node", "The source"], 0, "Complete route."),
      Q("Backtracking means you?", ["Remove a node after exploring it", "Keep all nodes", "Sort"], 0, "Restore the path."),
      Q("Because it's a DAG, you?", ["Don't need a visited set for correctness", "Must sort", "Must use a heap"], 0, "No cycles to avoid."),
      Q("Time complexity is?", ["Exponential in the worst case (many paths)", "O(V + E)", "O(V log V)"], 0, "Output-sensitive."),
      Q("Space complexity?", ["O(path length) plus output", "O(1)", "O(V^2)"], 0, "DFS stack + paths.")
    ]
  },
  "problem_0229": {
    description: "Capture all regions of 'O' that are completely surrounded by 'X' on a board, flipping them to 'X' (border-connected 'O's survive).",
    example: { input: "a board of X and O", output: "surrounded O regions flipped to X", why: "only border-connected O's remain" },
    quizzes: [
      Q("The trick is to first mark?", ["O's connected to the border (safe)", "All O's", "All X's"], 0, "Border regions can't be captured."),
      Q("You start DFS/BFS from?", ["Border O cells", "The center", "All cells"], 0, "Find the safe ones."),
      Q("After marking, remaining O's are?", ["Flipped to X", "Kept", "Deleted"], 0, "They were surrounded."),
      Q("Marked (safe) cells are?", ["Restored to O", "Flipped to X", "Removed"], 0, "Reverse the marker."),
      Q("Time complexity?", ["O(rows * cols)", "O((rc)^2)", "O(rc log rc)"], 0, "A few passes."),
      Q("Border-connected regions are?", ["Never captured", "Always captured", "Sorted"], 0, "They touch the edge."),
      Q("Space complexity?", ["O(rows * cols) worst case", "O(1)", "O(log rc)"], 0, "Traversal stack.")
    ]
  },
  "new-problem-4": {
    description: "Given a grid of heights, find all cells from which water can flow to both the Pacific (top/left edges) and the Atlantic (bottom/right edges).",
    example: { input: "a matrix of heights", output: "cells reaching both oceans", why: "reverse flow from both ocean borders" },
    quizzes: [
      Q("The efficient approach runs DFS/BFS?", ["Inward from each ocean's borders", "From every cell", "From the center"], 0, "Reverse the flow."),
      Q("Water flows from a cell to a neighbor that is?", ["Equal or lower (so reverse: equal or higher)", "Strictly lower only", "Any"], 0, "Reverse direction."),
      Q("The answer is cells reachable from?", ["Both oceans (intersection)", "Either ocean", "Neither"], 0, "Set intersection."),
      Q("Starting from oceans avoids?", ["Re-running a search per cell", "Sorting", "A heap"], 0, "Two sweeps total."),
      Q("Time complexity?", ["O(rows * cols)", "O((rc)^2)", "O(rc log rc)"], 0, "Each cell a constant number of times."),
      Q("You keep two reachability sets, one per?", ["Ocean", "Row", "Column"], 0, "Pacific and Atlantic."),
      Q("Space complexity?", ["O(rows * cols)", "O(1)", "O(log rc)"], 0, "Two visited grids.")
    ]
  },
  "problem_0230": {
    description: "Determine whether an undirected graph is bipartite (its nodes can be 2-colored so that no edge joins same-colored nodes).",
    example: { input: "a graph's adjacency list", output: "true if 2-colorable", why: "no odd-length cycle exists" },
    quizzes: [
      Q("You try to 2-color the graph using?", ["BFS/DFS, coloring neighbors oppositely", "Sorting", "A heap"], 0, "Alternate colors."),
      Q("A conflict (same color on an edge) means?", ["Not bipartite", "Bipartite", "A new component"], 0, "Coloring fails."),
      Q("Bipartite graphs contain no?", ["Odd-length cycles", "Even cycles", "Leaves"], 0, "Key property."),
      Q("You must handle?", ["All components (the graph may be disconnected)", "Only one node", "Only edges"], 0, "Start from each unvisited node."),
      Q("Time complexity?", ["O(V + E)", "O(V^2)", "O(E log E)"], 0, "Linear in the graph."),
      Q("Each node gets?", ["One of two colors", "A weight", "A depth only"], 0, "2-coloring."),
      Q("Space complexity?", ["O(V)", "O(1)", "O(E^2)"], 0, "Color array + stack/queue.")
    ]
  },
  "problem_0231": {
    description: "Detect whether a directed graph contains a cycle.",
    example: { input: "a directed graph", output: "true if a cycle exists", why: "a back edge during DFS indicates a cycle" },
    quizzes: [
      Q("DFS detects a directed cycle via?", ["A node currently in the recursion stack (gray)", "Any visited node", "A leaf"], 0, "Back edge."),
      Q("Three states often used are?", ["Unvisited, in-progress, done", "Red/green only", "Sorted/unsorted"], 0, "White/gray/black."),
      Q("Revisiting a fully-finished node is?", ["Not a cycle", "Always a cycle", "An error"], 0, "Only in-progress counts."),
      Q("An alternative uses?", ["Topological sort (Kahn's) feasibility", "A heap", "Binary search"], 0, "Cycle iff it fails."),
      Q("Time complexity?", ["O(V + E)", "O(V^2)", "O(E log E)"], 0, "Linear in the graph."),
      Q("A back edge points to?", ["An ancestor in the DFS tree", "A sibling", "A leaf"], 0, "Closes a cycle."),
      Q("Space complexity?", ["O(V)", "O(1)", "O(E^2)"], 0, "State arrays + stack.")
    ]
  },
  "problem_0232": {
    description: "Detect whether an undirected graph contains a cycle.",
    example: { input: "an undirected graph", output: "true if a cycle exists", why: "a visited non-parent neighbor indicates a cycle" },
    quizzes: [
      Q("In DFS, a cycle is found when?", ["A visited neighbor is not the parent", "Any neighbor is visited", "A leaf is reached"], 0, "Ignore the edge back to the parent."),
      Q("You must pass down the?", ["Parent node", "Depth only", "Color count"], 0, "To skip the trivial back edge."),
      Q("Union-find detects a cycle when?", ["An edge joins two nodes already in the same set", "Every edge", "No edge"], 0, "Same root."),
      Q("Time complexity (DFS)?", ["O(V + E)", "O(V^2)", "O(E log E)"], 0, "Linear in the graph."),
      Q("You must check?", ["All components", "One node", "Only edges"], 0, "Disconnected graphs."),
      Q("Union-find's efficiency comes from?", ["Path compression + union by rank", "Sorting", "A heap"], 0, "Near-constant ops."),
      Q("Space complexity?", ["O(V)", "O(1)", "O(E^2)"], 0, "Visited / parent arrays.")
    ]
  },
  "problem_0233": {
    description: "Given a functional graph where each node has at most one outgoing edge, find the length of the longest cycle, or -1 if none.",
    example: { input: "edges = [3,3,4,2,3]", output: "3", why: "the longest cycle has length 3" },
    quizzes: [
      Q("Each node has at most?", ["One outgoing edge", "Two edges", "n edges"], 0, "Functional graph."),
      Q("You can find cycles by?", ["Walking forward and timestamping visits", "Sorting", "A heap"], 0, "Detect a revisit."),
      Q("A cycle length is computed from?", ["The difference in visit times when re-entering it", "The node count", "The depth"], 0, "Step counting."),
      Q("If no cycle exists, return?", ["-1", "0", "n"], 0, "As specified."),
      Q("Time complexity?", ["O(n)", "O(n^2)", "O(n log n)"], 0, "Each node once."),
      Q("Already fully-explored chains are?", ["Skipped", "Re-walked", "Sorted"], 0, "Avoid rework."),
      Q("Space complexity?", ["O(n)", "O(1)", "O(n^2)"], 0, "Visit-time array.")
    ]
  },
  "problem_0234": {
    description: "Find all articulation points (cut vertices) in an undirected graph: nodes whose removal increases the number of connected components.",
    example: { input: "an undirected graph", output: "the set of articulation points", why: "removing each disconnects the graph" },
    quizzes: [
      Q("The standard algorithm uses?", ["DFS with discovery and low-link values (Tarjan)", "BFS layers", "Sorting"], 0, "Low-link analysis."),
      Q("low[u] is?", ["The lowest discovery time reachable from u's subtree", "The node's degree", "The depth only"], 0, "Via back edges."),
      Q("A non-root u is an articulation point when?", ["A child v has low[v] >= disc[u]", "It is a leaf", "It has one edge"], 0, "No back edge bypasses u."),
      Q("The root is an articulation point when?", ["It has more than one DFS child", "It has one child", "It is a leaf"], 0, "Special case."),
      Q("Time complexity?", ["O(V + E)", "O(V^2)", "O(VE)"], 0, "One DFS."),
      Q("Back edges update?", ["low-link values", "Discovery times", "Degrees"], 0, "Reach ancestors."),
      Q("Space complexity?", ["O(V)", "O(1)", "O(E^2)"], 0, "Arrays + stack.")
    ]
  },
  "problem_0235": {
    description: "Find all bridges (critical connections) in an undirected graph: edges whose removal increases the number of connected components.",
    example: { input: "an undirected graph", output: "the list of bridge edges", why: "removing each disconnects the graph" },
    quizzes: [
      Q("The algorithm uses?", ["DFS with discovery and low-link values (Tarjan)", "BFS layers", "Sorting"], 0, "Low-link analysis."),
      Q("Edge (u, v) is a bridge when?", ["low[v] > disc[u]", "low[v] >= disc[u]", "u is a leaf"], 0, "No back edge bypasses it."),
      Q("The difference from articulation points is?", ["A strict inequality on edges", "Using BFS", "Sorting"], 0, "> vs >=, edge vs vertex."),
      Q("A bridge lies on?", ["No cycle", "Every cycle", "A self-loop"], 0, "No alternate route."),
      Q("Time complexity?", ["O(V + E)", "O(V^2)", "O(VE)"], 0, "One DFS."),
      Q("low[v] captures?", ["The earliest reachable ancestor from v", "The degree", "The depth only"], 0, "Via back edges."),
      Q("Space complexity?", ["O(V)", "O(1)", "O(E^2)"], 0, "Arrays + stack.")
    ]
  },
  "problem_0237": {
    description: "Given course prerequisites, determine whether all courses can be finished (i.e. the prerequisite graph has no cycle).",
    example: { input: "numCourses = 2, prerequisites = [[1,0]]", output: "true", why: "take 0 then 1; no cycle" },
    quizzes: [
      Q("This reduces to?", ["Cycle detection in a directed graph", "Sorting", "A heap"], 0, "Finishable iff acyclic."),
      Q("Kahn's algorithm repeatedly removes nodes with?", ["In-degree 0", "The highest degree", "Max value"], 0, "Topological peeling."),
      Q("If not all nodes are removed, there is?", ["A cycle (impossible)", "No prerequisites", "A single course"], 0, "Leftover cycle."),
      Q("Time complexity?", ["O(V + E)", "O(V^2)", "O(E log E)"], 0, "Linear in the graph."),
      Q("An edge [a, b] means?", ["b is a prerequisite of a", "a is a prerequisite of b", "They're unrelated"], 0, "Directed dependency."),
      Q("A DFS alternative detects?", ["A back edge (cycle)", "A bridge", "A leaf"], 0, "Recursion-stack revisit."),
      Q("Space complexity?", ["O(V + E)", "O(1)", "O(V^2)"], 0, "Graph + in-degrees.")
    ]
  },
  "problem_0238": {
    description: "Given course prerequisites, return a valid order in which to take all courses, or an empty list if impossible.",
    example: { input: "numCourses = 2, prerequisites = [[1,0]]", output: "[0, 1]", why: "0 before 1" },
    quizzes: [
      Q("The task is a?", ["Topological sort", "Shortest path", "Sort by value"], 0, "Linear ordering of a DAG."),
      Q("Kahn's algorithm outputs nodes as their?", ["In-degree drops to 0", "Value increases", "Depth grows"], 0, "Ready-to-take order."),
      Q("If a cycle exists you return?", ["An empty list", "Any order", "The reverse"], 0, "No valid order."),
      Q("A DFS approach builds the order by?", ["Reversing the postorder finish times", "Preorder", "Sorting values"], 0, "Finish-time reversal."),
      Q("Time complexity?", ["O(V + E)", "O(V^2)", "O(E log E)"], 0, "Linear in the graph."),
      Q("A valid topological order exists iff the graph is?", ["Acyclic", "Connected", "Bipartite"], 0, "A DAG."),
      Q("Space complexity?", ["O(V + E)", "O(1)", "O(V^2)"], 0, "Graph + queue.")
    ]
  },
  "problem_0239": {
    description: "Find all 'safe' nodes in a directed graph: nodes from which every path leads to a terminal node (no path enters a cycle).",
    example: { input: "a directed graph", output: "the sorted list of safe nodes", why: "no path from them reaches a cycle" },
    quizzes: [
      Q("A node is safe when?", ["Every outgoing path avoids cycles", "It has no edges", "It is terminal only"], 0, "All paths terminate."),
      Q("One approach uses?", ["DFS cycle coloring (safe = not in/leading to a cycle)", "A heap", "Binary search"], 0, "White/gray/black."),
      Q("Another reverses the graph and runs?", ["Topological sort from terminal nodes", "Dijkstra", "Sorting values"], 0, "Peel safe nodes."),
      Q("Terminal nodes (out-degree 0) are?", ["Always safe", "Never safe", "Cycles"], 0, "Base case."),
      Q("Time complexity?", ["O(V + E)", "O(V^2)", "O(E log E)"], 0, "Linear in the graph."),
      Q("Nodes on or leading into a cycle are?", ["Unsafe", "Safe", "Terminal"], 0, "Excluded."),
      Q("Space complexity?", ["O(V + E)", "O(1)", "O(V^2)"], 0, "Graph + states.")
    ]
  },
  "problem_0236": {
    description: "Given recipes with their ingredient lists and a set of available supplies, return all recipes that can be created.",
    example: { input: "recipes, ingredients, supplies", output: "the makeable recipes", why: "resolve dependencies topologically" },
    quizzes: [
      Q("This is essentially?", ["Topological resolution of dependencies", "Sorting values", "A heap"], 0, "Ingredients may be other recipes."),
      Q("Base availability comes from?", ["The supplies", "The recipes", "Nothing"], 0, "Starting resources."),
      Q("A recipe becomes makeable when?", ["All its ingredients are available", "One ingredient is available", "It has a name"], 0, "All dependencies met."),
      Q("Kahn's algorithm tracks?", ["In-degree (unmet ingredients) per recipe", "Edge weights", "Depths"], 0, "Decrement as supplies arrive."),
      Q("Cyclic recipe dependencies are?", ["Never makeable", "Always makeable", "Sorted first"], 0, "Can't resolve."),
      Q("Time complexity?", ["O(total ingredients + recipes)", "O(n^2)", "O(2^n)"], 0, "Linear-ish."),
      Q("Space complexity?", ["O(nodes + edges)", "O(1)", "O(n^2)"], 0, "Graph + queue.")
    ]
  },
  "problem_0240": {
    description: "Given a sorted list of words from an alien language, derive a valid ordering of its alphabet, or report that none exists.",
    example: { input: '["wrt","wrf","er","ett","rftt"]', output: 'a valid letter order (e.g. "wertf")', why: "adjacent words imply letter precedence" },
    quizzes: [
      Q("You build edges by comparing?", ["Adjacent words' first differing character", "All character pairs", "Word lengths only"], 0, "Precedence constraints."),
      Q("The letters are then ordered via?", ["Topological sort", "Alphabetical sort", "A heap"], 0, "Respect constraints."),
      Q("A cycle in the constraints means?", ["No valid order exists", "Multiple orders", "An empty alphabet"], 0, "Contradiction."),
      Q("An invalid case is when?", ["A longer word is a prefix of an earlier shorter word", "Words repeat", "Letters repeat"], 0, "e.g. 'abc' before 'ab'."),
      Q("Time complexity?", ["O(total characters)", "O(n^2)", "O(2^n)"], 0, "Build + sort."),
      Q("The first differing character gives?", ["A 'before' edge between two letters", "A weight", "A color"], 0, "Directed constraint."),
      Q("Space complexity?", ["O(unique letters + edges)", "O(1)", "O(n^2)"], 0, "Graph + in-degrees.")
    ]
  },
  "problem_0243": {
    description: "Build a minimum spanning tree of a weighted undirected graph and return its total weight.",
    example: { input: "a weighted connected graph", output: "the minimum total connecting weight", why: "an MST connects all nodes at least cost" },
    quizzes: [
      Q("An MST connects all nodes with?", ["Minimum total edge weight and no cycle", "Maximum weight", "The fewest nodes"], 0, "Spanning + minimal."),
      Q("Two classic algorithms are?", ["Kruskal and Prim", "Dijkstra and BFS", "DFS and sort"], 0, "Greedy MST builders."),
      Q("An MST of n nodes has?", ["n - 1 edges", "n edges", "n^2 edges"], 0, "Tree property."),
      Q("Both algorithms are?", ["Greedy", "Dynamic programming", "Backtracking"], 0, "Locally optimal choices."),
      Q("Kruskal sorts edges and uses?", ["Union-find to avoid cycles", "A heap of nodes", "DFS only"], 0, "Add safe edges."),
      Q("Prim grows the tree using?", ["A min-heap of crossing edges", "Sorting once", "Union-find"], 0, "Nearest node."),
      Q("The MST is unique when?", ["All edge weights are distinct", "The graph is dense", "n is even"], 0, "No weight ties.")
    ]
  },
  "problem_0247": {
    description: "In a graph formed by adding one extra edge to a tree, find the redundant edge that can be removed to restore a tree.",
    example: { input: "edges = [[1,2],[1,3],[2,3]]", output: "[2,3]", why: "removing it breaks the single cycle" },
    quizzes: [
      Q("The clean approach is?", ["Union-find, processing edges in order", "Sorting weights", "A heap"], 0, "Find the cycle-closing edge."),
      Q("The redundant edge is the one that?", ["Connects two nodes already in the same set", "Has the max weight", "Is first"], 0, "Closes a cycle."),
      Q("The input has exactly?", ["One extra edge (one cycle)", "No cycle", "Two cycles"], 0, "Tree + 1 edge."),
      Q("You return?", ["The last edge that forms the cycle", "The first edge", "Any edge"], 0, "Per the problem."),
      Q("Time complexity?", ["O(n α(n))", "O(n^2)", "O(n log n) always"], 0, "Union-find."),
      Q("Union by rank + path compression gives?", ["Near-constant operations", "O(n) each", "O(log n) always"], 0, "Amortized α(n)."),
      Q("Space complexity?", ["O(n)", "O(1)", "O(n^2)"], 0, "Parent / rank arrays.")
    ]
  },
  "problem_0244": {
    description: "Implement Kruskal's algorithm to build a minimum spanning tree by adding edges in increasing weight while avoiding cycles.",
    example: { input: "a weighted graph", output: "the MST edges / total weight", why: "greedily add the cheapest safe edges" },
    quizzes: [
      Q("Kruskal processes edges in?", ["Increasing weight order", "Decreasing order", "Input order"], 0, "Cheapest first."),
      Q("An edge is added if it?", ["Connects two different components", "Has max weight", "Is the first"], 0, "Avoids a cycle."),
      Q("Cycle checks use?", ["Union-find", "A heap of nodes", "DFS each time"], 0, "Same-set detection."),
      Q("Sorting the edges costs?", ["O(E log E)", "O(V)", "O(1)"], 0, "Dominant step."),
      Q("The MST has?", ["V - 1 edges", "V edges", "E edges"], 0, "Tree property."),
      Q("Kruskal is especially good for?", ["Sparse graphs", "Dense graphs only", "Trees only"], 0, "Edge-list driven."),
      Q("Space complexity?", ["O(V + E)", "O(1)", "O(V^2)"], 0, "Union-find + edges.")
    ]
  },
  "new-problem-6": {
    description: "Given n computers and a set of connections, return the minimum number of cable moves needed to connect all computers, or -1 if impossible.",
    example: { input: "n = 4, connections = [[0,1],[0,2],[1,2]]", output: "1", why: "one redundant cable reconnects the isolated computer" },
    quizzes: [
      Q("Connecting n nodes needs at least?", ["n - 1 cables", "n cables", "n^2 cables"], 0, "Spanning tree minimum."),
      Q("If there are fewer than n-1 cables, return?", ["-1 (impossible)", "0", "n"], 0, "Not enough cables."),
      Q("The number of moves equals?", ["components - 1", "the edge count", "n"], 0, "Join the components."),
      Q("Redundant (extra) cables are?", ["Available to move", "Deleted", "Ignored"], 0, "Reused to connect."),
      Q("Union-find counts?", ["Connected components", "Edges", "Depths"], 0, "Distinct groups."),
      Q("Time complexity?", ["O(E α(n))", "O(n^2)", "O(2^n)"], 0, "Union-find."),
      Q("Space complexity?", ["O(n)", "O(1)", "O(n^2)"], 0, "Parent array.")
    ]
  },
  "new-problem-5": {
    description: "Given stones on a 2D plane, find the maximum number of stones that can be removed, where a stone can be removed if it shares a row or column with another remaining stone.",
    example: { input: "stones at various coordinates", output: "the max removals", why: "each connected group leaves one stone" },
    quizzes: [
      Q("Stones sharing a row or column form?", ["A connected component", "A cycle", "A tree only"], 0, "Union them."),
      Q("From each component you can remove?", ["All but one stone", "All stones", "None"], 0, "One remains."),
      Q("So the answer is?", ["total stones - number of components", "the component count", "total stones"], 0, "Keep one per group."),
      Q("Union-find connects stones by?", ["Shared row or column", "Distance", "Value"], 0, "Row/column keys."),
      Q("Treating rows and columns as nodes helps because?", ["It unions stones via common lines", "It sorts", "It uses a heap"], 0, "Efficient grouping."),
      Q("Time complexity?", ["O(n α(n))", "O(n^2)", "O(2^n)"], 0, "Union-find."),
      Q("Space complexity?", ["O(n)", "O(1)", "O(n^2)"], 0, "Union-find maps.")
    ]
  },
  "problem_0248": {
    description: "Given points on a plane, connect all of them at minimum total cost, where the cost between two points is their Manhattan distance.",
    example: { input: "points on a plane", output: "the minimum connection cost", why: "an MST over Manhattan-distance edges" },
    quizzes: [
      Q("This is a?", ["Minimum spanning tree problem", "Shortest path problem", "Sorting problem"], 0, "Connect all at min cost."),
      Q("Edge weights are?", ["Manhattan distances between points", "Euclidean only", "Unit weights"], 0, "|dx| + |dy|."),
      Q("Prim's algorithm uses?", ["A min-heap of candidate edges", "Sorting once", "DFS"], 0, "Grow the tree."),
      Q("The graph is effectively?", ["Complete (all pairs)", "Sparse", "A tree"], 0, "Every pair is an edge."),
      Q("Prim on a dense graph costs?", ["O(n^2) or O(E log V)", "O(n)", "O(1)"], 0, "Depends on implementation."),
      Q("The MST has?", ["n - 1 edges", "n edges", "n^2 edges"], 0, "Tree property."),
      Q("Kruskal here would need?", ["All O(n^2) edges sorted", "No edges", "A heap of nodes"], 0, "Dense edge list.")
    ]
  },
  "problem_0249": {
    description: "Merge accounts that share any email address, grouping all emails under the same owner.",
    example: { input: "accounts with names and emails", output: "merged, de-duplicated accounts", why: "shared emails link accounts together" },
    quizzes: [
      Q("Accounts sharing an email should be?", ["Union-ed into one group", "Kept separate", "Deleted"], 0, "Connected components."),
      Q("Union-find keys on?", ["Emails (mapped to a representative)", "Names only", "Indices only"], 0, "Emails link accounts."),
      Q("Names can repeat, so you key by?", ["Emails, not names", "Names", "Account length"], 0, "Emails are unique identifiers."),
      Q("After union, each group's emails are?", ["Sorted and attached to the name", "Left unordered", "Discarded"], 0, "Output format."),
      Q("An alternative uses?", ["DFS/BFS over an email graph", "Sorting only", "A heap"], 0, "Connected components."),
      Q("Time complexity?", ["Near O(total emails * α)", "O(n^2)", "O(2^n)"], 0, "Union-find + sort."),
      Q("Space complexity?", ["O(total emails)", "O(1)", "O(n^2)"], 0, "Maps + parent array.")
    ]
  },
  "problem_0245": {
    description: "Given pairs of equivalent characters, map a string to its lexicographically smallest equivalent form.",
    example: { input: 's1="parker", s2="morris", baseStr="parser"', output: '"makkek"', why: "equivalence classes collapse to their smallest letter" },
    quizzes: [
      Q("Equivalent characters form?", ["Union-find groups", "A cycle", "A heap"], 0, "Equivalence classes."),
      Q("Each group should be represented by its?", ["Smallest character", "First character", "Largest character"], 0, "Lexicographically smallest."),
      Q("When unioning, the new root is?", ["The smaller letter", "The larger letter", "Random"], 0, "Keep the minimum."),
      Q("For each character in baseStr you output?", ["Its group's smallest letter", "Its original letter", "The first letter"], 0, "Map to the root."),
      Q("There are at most?", ["26 nodes (letters)", "n nodes", "n^2 nodes"], 0, "Fixed alphabet."),
      Q("Time complexity?", ["O(length of inputs)", "O(n^2)", "O(2^n)"], 0, "Union-find on 26 letters."),
      Q("Space complexity?", ["O(1) (26-sized arrays)", "O(n^2)", "O(n log n)"], 0, "Constant alphabet.")
    ]
  },
  "problem_0250": {
    description: "Implement Dijkstra's algorithm to compute shortest-path distances from a source to all nodes in a non-negative weighted graph.",
    example: { input: "a weighted graph, a source", output: "shortest distances from the source", why: "greedy expansion by smallest tentative distance" },
    quizzes: [
      Q("Dijkstra requires edge weights to be?", ["Non-negative", "Negative", "Integers only"], 0, "Else it can be wrong."),
      Q("It uses a?", ["Min-heap (priority queue)", "Max-heap", "Stack"], 0, "Nearest node first."),
      Q("Time complexity with a binary heap?", ["O((V + E) log V)", "O(V^2) always", "O(VE)"], 0, "Heap-based."),
      Q("You finalize a node when?", ["It is popped with the smallest distance", "It is first seen", "At the end"], 0, "Greedy choice."),
      Q("Each node's distance starts at?", ["Infinity (0 for the source)", "0 for all", "-1"], 0, "Initialization."),
      Q("Relaxing an edge means?", ["Updating a neighbor's distance if shorter", "Deleting it", "Sorting"], 0, "dist + weight."),
      Q("Stale heap entries are?", ["Skipped when popped", "Errors", "Re-added"], 0, "Lazy deletion.")
    ]
  },
  "problem_0254": {
    description: "Find the cheapest price from a source to a destination with at most k stops in a weighted flight graph.",
    example: { input: "flights, src, dst, k", output: "the cheapest price within k stops, or -1", why: "shortest cost under a hop limit" },
    quizzes: [
      Q("A clean approach is?", ["Bellman-Ford limited to k+1 relaxations", "Plain Dijkstra", "Sorting"], 0, "Bound the hops."),
      Q("The stop limit means at most?", ["k+1 edges", "k edges", "unlimited edges"], 0, "k stops = k+1 flights."),
      Q("Each relaxation round represents?", ["One additional allowed hop", "One node", "One sort"], 0, "Bounded BFS/Bellman-Ford."),
      Q("You must use a snapshot of distances to?", ["Avoid using more than k hops in one round", "Sort", "Save memory"], 0, "Prevent over-relaxation."),
      Q("Plain Dijkstra can fail here because?", ["The cheapest path may exceed k stops", "Weights are negative", "The graph is a tree"], 0, "Hop constraint."),
      Q("Time complexity (Bellman-Ford variant)?", ["O(k * E)", "O(V^2)", "O(2^V)"], 0, "k rounds of relaxation."),
      Q("If unreachable within k stops, return?", ["-1", "0", "infinity"], 0, "No valid route.")
    ]
  },
  "problem_0253": {
    description: "Given a network with signal travel times, find the time for a signal from a source node to reach all nodes, or -1 if some node is unreachable.",
    example: { input: "times, n, source k", output: "the time to reach all nodes, or -1", why: "the maximum shortest-path distance" },
    quizzes: [
      Q("Compute shortest paths from the source with?", ["Dijkstra", "DFS", "Sorting"], 0, "Non-negative weights."),
      Q("The answer is?", ["The maximum of all shortest distances", "The minimum distance", "The sum"], 0, "The last node to receive."),
      Q("If any node is unreachable, return?", ["-1", "0", "infinity"], 0, "Not fully connected."),
      Q("Edge weights here are?", ["Non-negative travel times", "Negative", "Unit"], 0, "Dijkstra applies."),
      Q("Time complexity (binary heap)?", ["O((V + E) log V)", "O(V^2)", "O(VE)"], 0, "Dijkstra."),
      Q("The signal reaches all nodes in time equal to?", ["The farthest shortest path", "The nearest", "The average"], 0, "Bottleneck node."),
      Q("Space complexity?", ["O(V + E)", "O(1)", "O(V^2)"], 0, "Graph + distances.")
    ]
  },
  "problem_0256": {
    description: "Find a path from the top-left to the bottom-right of a grid that minimizes the maximum absolute height difference between consecutive cells (minimize the effort).",
    example: { input: "a grid of heights", output: "the minimum possible maximum step", why: "minimize the largest climb on the path" },
    quizzes: [
      Q("The cost of a path is?", ["Its maximum single step (not the sum)", "The total of all steps", "The length"], 0, "Bottleneck metric."),
      Q("A Dijkstra-like approach minimizes?", ["The maximum edge along the path", "The sum of edges", "The node count"], 0, "Modified relaxation."),
      Q("An alternative is?", ["Binary search on the effort + BFS/DFS feasibility", "Sorting", "A heap of values"], 0, "Check reachability."),
      Q("Edge weight between cells is?", ["The absolute height difference", "The sum of heights", "1"], 0, "The step size."),
      Q("Dijkstra's priority is?", ["The smallest 'max effort so far'", "The smallest sum", "The depth"], 0, "Minimax path."),
      Q("Time complexity?", ["O(rc log(rc))", "O((rc)^2)", "O(rc)"], 0, "Heap-based."),
      Q("The answer is a?", ["Minimax (smallest possible maximum)", "Total sum", "Count"], 0, "Bottleneck shortest path.")
    ]
  },
  "problem_0255": {
    description: "In a grid where cell values are elevations and water rises over time, find the least time at which you can swim from the top-left to the bottom-right.",
    example: { input: "a grid of elevations", output: "the minimum time to reach the end", why: "minimize the maximum elevation on the path" },
    quizzes: [
      Q("The cost of a path is?", ["Its maximum cell elevation", "The sum of elevations", "The length"], 0, "Water level needed."),
      Q("A Dijkstra-like approach minimizes?", ["The maximum cell on the path", "The sum", "The node count"], 0, "Minimax path."),
      Q("An alternative uses?", ["Binary search on time + flood-fill feasibility", "Sorting values", "A heap of rows"], 0, "Can you reach the end?"),
      Q("Union-find can solve it by?", ["Adding cells in elevation order until start and end connect", "Sorting rows", "DFS only"], 0, "Incremental connectivity."),
      Q("The priority in the heap is?", ["The smallest 'max elevation so far'", "The sum", "The depth"], 0, "Bottleneck metric."),
      Q("Time complexity?", ["O(rc log(rc))", "O((rc)^2)", "O(rc)"], 0, "Heap-based."),
      Q("The answer equals?", ["The minimum possible maximum elevation", "The total", "The path length"], 0, "Least water level.")
    ]
  },
  "problem_0257": {
    description: "Detect whether a weighted directed graph contains a negative-weight cycle.",
    example: { input: "a weighted directed graph", output: "true if a negative cycle exists", why: "Bellman-Ford still relaxes after V-1 rounds" },
    quizzes: [
      Q("The algorithm used is?", ["Bellman-Ford", "Dijkstra", "BFS"], 0, "Handles negative weights."),
      Q("After V-1 relaxation rounds, a further successful relaxation means?", ["A negative cycle exists", "The graph is a tree", "No cycle"], 0, "Distances keep dropping."),
      Q("Dijkstra can't be used because?", ["It assumes non-negative weights", "It's too slow", "It needs a DAG"], 0, "Negative edges break it."),
      Q("Bellman-Ford runs?", ["V-1 rounds of relaxing all edges", "One pass", "log V rounds"], 0, "Then one check round."),
      Q("Time complexity?", ["O(V * E)", "O(V^2)", "O(E log V)"], 0, "Relax all edges each round."),
      Q("To cover disconnected graphs you can?", ["Add a virtual source to all nodes", "Sort", "Use a heap"], 0, "Reach every node."),
      Q("A negative cycle makes shortest paths?", ["Undefined (unboundedly small)", "Zero", "Maximal"], 0, "No finite minimum.")
    ]
  },
  "problem_0258": {
    description: "Find the cheapest price from a source to a destination within at most k stops using a Bellman-Ford-style bounded relaxation.",
    example: { input: "flights, src, dst, k", output: "the cheapest price within k stops, or -1", why: "k+1 rounds of edge relaxation" },
    quizzes: [
      Q("The approach relaxes all edges?", ["k+1 times", "V-1 times", "Once"], 0, "Bounded by stops."),
      Q("A snapshot of previous distances prevents?", ["Using more than the allowed hops in a round", "Sorting", "Overflow"], 0, "Correct hop counting."),
      Q("Each round adds?", ["One more allowed hop", "One node", "One sort"], 0, "Bounded relaxation."),
      Q("k stops corresponds to?", ["k+1 edges", "k edges", "unlimited"], 0, "Flights = stops + 1."),
      Q("Time complexity?", ["O(k * E)", "O(V^2)", "O(2^V)"], 0, "k rounds over edges."),
      Q("Compared with Dijkstra, Bellman-Ford here?", ["Naturally bounds the number of hops", "Is always faster", "Needs a heap"], 0, "Round = hop."),
      Q("If no route within k stops, return?", ["-1", "0", "infinity"], 0, "Unreachable.")
    ]
  },
  "problem_0262": {
    description: "Use the Floyd-Warshall algorithm to detect a negative cycle in a weighted directed graph.",
    example: { input: "a weighted directed graph", output: "true if a negative cycle exists", why: "a negative diagonal entry signals one" },
    quizzes: [
      Q("Floyd-Warshall computes?", ["All-pairs shortest paths", "Single-source paths", "An MST"], 0, "Every pair."),
      Q("A negative cycle shows up as?", ["A negative value on the distance diagonal (dist[i][i] < 0)", "A zero row", "A full matrix"], 0, "Self-distance goes negative."),
      Q("Time complexity?", ["O(V^3)", "O(V^2)", "O(E log V)"], 0, "Triple nested loop."),
      Q("The algorithm considers each node as an?", ["Intermediate point", "Source only", "Sink only"], 0, "k as the pivot."),
      Q("It handles negative edges?", ["Yes (but not with a negative cycle for valid paths)", "No", "Only positive"], 0, "Unlike Dijkstra."),
      Q("Space complexity?", ["O(V^2)", "O(V)", "O(1)"], 0, "The distance matrix."),
      Q("Best suited for?", ["Dense graphs / all-pairs needs", "Very sparse graphs", "Trees only"], 0, "V^3 cost.")
    ]
  },
  "new-problem-15": {
    description: "Find the city with the fewest other cities reachable within a given distance threshold (ties broken by the greatest city number).",
    example: { input: "n, edges, distanceThreshold", output: "the qualifying city number", why: "all-pairs shortest paths, then count neighbors" },
    quizzes: [
      Q("A clean approach computes?", ["All-pairs shortest paths (Floyd-Warshall)", "A single BFS", "An MST"], 0, "Distances between all cities."),
      Q("For each city you count?", ["Reachable cities within the threshold", "All cities", "Only neighbors"], 0, "Within the distance."),
      Q("The answer is the city with?", ["The fewest reachable cities (ties: largest index)", "The most reachable", "The smallest index"], 0, "Per the rule."),
      Q("Floyd-Warshall time complexity?", ["O(V^3)", "O(V^2)", "O(E log V)"], 0, "Triple loop."),
      Q("An alternative runs?", ["Dijkstra from each node", "One DFS", "Sorting"], 0, "V Dijkstra runs."),
      Q("Ties are broken by?", ["The greater city number", "The smaller number", "Random"], 0, "As specified."),
      Q("Space complexity (Floyd-Warshall)?", ["O(V^2)", "O(V)", "O(1)"], 0, "Distance matrix.")
    ]
  },
  "problem_0261": {
    description: "Compute all-pairs shortest paths in a weighted graph using the Floyd-Warshall dynamic-programming algorithm.",
    example: { input: "a weighted graph", output: "shortest distances between every pair", why: "relax through each intermediate node" },
    quizzes: [
      Q("The DP relaxation is?", ["dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])", "dist[i][j] = dist[i][k]", "a sort"], 0, "Through intermediate k."),
      Q("The outermost loop iterates over?", ["The intermediate node k", "The source i", "The sink j"], 0, "k must be outermost."),
      Q("Time complexity?", ["O(V^3)", "O(V^2)", "O(E log V)"], 0, "Triple nested loop."),
      Q("It handles negative edges?", ["Yes (no negative cycle)", "No", "Only positive"], 0, "Unlike Dijkstra."),
      Q("Space complexity?", ["O(V^2)", "O(V)", "O(1)"], 0, "Distance matrix."),
      Q("It is preferable to V Dijkstra runs when?", ["The graph is dense", "The graph is a tree", "n = 1"], 0, "V^3 vs V * E log V."),
      Q("The initial matrix has?", ["Edge weights (infinity for non-edges, 0 on the diagonal)", "All zeros", "All ones"], 0, "Base distances.")
    ]
  },
  "problem_0260": {
    description: "Compute the transitive closure of a directed graph: for every pair (i, j), whether j is reachable from i.",
    example: { input: "a directed graph", output: "a reachability matrix", why: "Floyd-Warshall-style boolean propagation" },
    quizzes: [
      Q("The closure tells you?", ["Whether j is reachable from i for all pairs", "The shortest distance only", "The MST"], 0, "Reachability."),
      Q("A Floyd-Warshall variant uses?", ["reach[i][j] = reach[i][j] OR (reach[i][k] AND reach[k][j])", "min-plus", "sorting"], 0, "Boolean propagation."),
      Q("Time complexity?", ["O(V^3)", "O(V^2)", "O(E log V)"], 0, "Triple loop."),
      Q("An alternative runs?", ["DFS/BFS from each node", "One sort", "A heap"], 0, "Per-source reachability."),
      Q("The intermediate node k is the?", ["Outermost loop", "Innermost loop", "Unused"], 0, "Pivot node."),
      Q("Space complexity?", ["O(V^2)", "O(V)", "O(1)"], 0, "Boolean matrix."),
      Q("Per-source DFS/BFS total cost is?", ["O(V * (V + E))", "O(V^3) always", "O(1)"], 0, "V traversals.")
    ]
  },

  // ================= Dynamic Programming =================
  "problem_0305": {
    description: "Count the number of distinct ways to climb a staircase of n steps, taking 1 or 2 steps at a time.",
    example: { input: "n = 3", output: "3", why: "1+1+1, 1+2, 2+1" },
    quizzes: [
      Q("The recurrence is?", ["ways(n) = ways(n-1) + ways(n-2)", "ways(n) = 2 * ways(n-1)", "ways(n) = n"], 0, "Last step is 1 or 2."),
      Q("The sequence produced is?", ["Fibonacci", "Powers of two", "Factorials"], 0, "Same recurrence."),
      Q("Time complexity (DP)?", ["O(n)", "O(2^n)", "O(n^2)"], 0, "One pass."),
      Q("Space can be reduced to?", ["O(1) (two variables)", "O(n) always", "O(n^2)"], 0, "Only last two states."),
      Q("The base cases are?", ["ways(0)=1, ways(1)=1", "ways(0)=0", "ways(1)=2"], 0, "Starting points."),
      Q("Naive recursion is?", ["O(2^n) (overlapping subproblems)", "O(n)", "O(log n)"], 0, "Needs memoization."),
      Q("This is a classic?", ["1D DP", "Graph problem", "Greedy problem"], 0, "Linear states.")
    ]
  },
  "problem_0306": {
    description: "Given house values along a street, find the maximum amount you can rob without robbing two adjacent houses.",
    example: { input: "[2,7,9,3,1]", output: "12", why: "rob houses 2 + 9 + 1" },
    quizzes: [
      Q("The recurrence is?", ["rob(i) = max(rob(i-1), rob(i-2) + value[i])", "rob(i) = rob(i-1) + value[i]", "rob(i) = value[i]"], 0, "Skip or take."),
      Q("You cannot rob?", ["Two adjacent houses", "The first house", "Any two houses"], 0, "Adjacency constraint."),
      Q("Time complexity?", ["O(n)", "O(2^n)", "O(n^2)"], 0, "One pass."),
      Q("Space can be?", ["O(1)", "O(n) only", "O(n^2)"], 0, "Two running values."),
      Q("At each house you choose to?", ["Rob it (+ value, skip prev) or skip it", "Always rob", "Always skip"], 0, "Take/leave decision."),
      Q("The base cases involve?", ["The first one or two houses", "The last house", "The median"], 0, "Initialize the DP."),
      Q("This is a classic?", ["1D DP", "Greedy problem", "Graph problem"], 0, "Linear decision.")
    ]
  },
  "problem_0309": {
    description: "Count the number of ways to decode a digit string where 'A'=1 ... 'Z'=26.",
    example: { input: '"226"', output: "3", why: '"BZ", "VF", "BBF"' },
    quizzes: [
      Q("At each position you consider?", ["One digit (1-9) and two digits (10-26)", "Only one digit", "Three digits"], 0, "Valid letter mappings."),
      Q("A single '0' is?", ["Invalid on its own (must pair as 10 or 20)", "Always valid", "Equal to 10"], 0, "0 can't map alone."),
      Q("The recurrence adds ways from?", ["i-1 (single) and i-2 (valid pair)", "i-1 only", "i+1"], 0, "Two choices."),
      Q("Time complexity?", ["O(n)", "O(2^n)", "O(n^2)"], 0, "One pass."),
      Q("Space can be?", ["O(1)", "O(n) only", "O(n^2)"], 0, "Last two states."),
      Q("A two-digit value is valid when?", ["It is between 10 and 26", "It is positive", "It is even"], 0, "Maps to A-Z."),
      Q("Leading zeros make the count?", ["0 (invalid decoding)", "1", "unchanged"], 0, "No valid mapping.")
    ]
  },
  "problem_0310": {
    description: "Count the number of unique paths from the top-left to the bottom-right of an m x n grid, moving only right or down.",
    example: { input: "m = 3, n = 7", output: "28", why: "paths via combinatorics or grid DP" },
    quizzes: [
      Q("The recurrence is?", ["paths(i,j) = paths(i-1,j) + paths(i,j-1)", "paths(i,j) = 2 * paths(i-1,j-1)", "paths(i,j) = i*j"], 0, "From above or left."),
      Q("Movement is restricted to?", ["Right and down", "All four directions", "Diagonals"], 0, "Monotone path."),
      Q("The closed-form answer is?", ["C(m+n-2, m-1)", "m*n", "2^(m+n)"], 0, "Combinatorial."),
      Q("Time complexity (DP)?", ["O(m*n)", "O((mn)^2)", "O(2^(mn))"], 0, "Fill the grid."),
      Q("Space can be reduced to?", ["O(n) (one row)", "O(mn) always", "O(1) impossible"], 0, "Rolling row."),
      Q("The first row and column are all?", ["1 (single path)", "0", "m or n"], 0, "Base cases."),
      Q("This is a classic?", ["2D grid DP", "Graph BFS", "Greedy"], 0, "Grid states.")
    ]
  },
  "problem_0311": {
    description: "Count unique top-left to bottom-right paths in a grid where some cells contain obstacles that cannot be entered.",
    example: { input: "[[0,0,0],[0,1,0],[0,0,0]]", output: "2", why: "the obstacle blocks the middle" },
    quizzes: [
      Q("An obstacle cell has?", ["0 paths through it", "Infinite paths", "1 path"], 0, "Blocked."),
      Q("The recurrence applies only when?", ["The current cell is not an obstacle", "Always", "At the border only"], 0, "Skip blocked cells."),
      Q("Time complexity?", ["O(m*n)", "O((mn)^2)", "O(2^(mn))"], 0, "Fill the grid."),
      Q("If the start cell is an obstacle, the answer is?", ["0", "1", "undefined"], 0, "No path can begin."),
      Q("Space can be?", ["O(n) rolling row", "O(mn) only", "O(1)"], 0, "One row at a time."),
      Q("Compared with Unique Paths, this adds?", ["Obstacle checks", "Diagonal moves", "Weights"], 0, "Blocked cells."),
      Q("The first row/column stops being 1 after?", ["The first obstacle", "The middle", "Never"], 0, "Downstream cells become 0.")
    ]
  },
  "problem_0312": {
    description: "Find the path from the top-left to the bottom-right of a grid of non-negative numbers that minimizes the sum of values, moving only right or down.",
    example: { input: "[[1,3,1],[1,5,1],[4,2,1]]", output: "7", why: "1->3->1->1->1 sums to 7" },
    quizzes: [
      Q("The recurrence is?", ["dp(i,j) = grid(i,j) + min(dp(i-1,j), dp(i,j-1))", "dp(i,j) = grid(i,j)", "dp(i,j) = max(...)"], 0, "Cheapest predecessor."),
      Q("Movement is?", ["Right or down", "Any direction", "Diagonal"], 0, "Monotone."),
      Q("Time complexity?", ["O(m*n)", "O((mn)^2)", "O(2^(mn))"], 0, "Fill the grid."),
      Q("The objective is to?", ["Minimize the path sum", "Maximize it", "Count paths"], 0, "Least total."),
      Q("The first row/column accumulate?", ["Prefix sums", "Zeros", "Ones"], 0, "Only one way in."),
      Q("Space can be?", ["O(n) rolling row", "O(mn) only", "O(1)"], 0, "One row."),
      Q("Each cell takes the?", ["Cheaper of top and left", "More expensive", "Sum of both"], 0, "Optimal substructure.")
    ]
  },
  "problem_0313": {
    description: "Find the minimum initial health needed for a knight to travel from the top-left to the bottom-right of a dungeon grid, where cells add or subtract health and health must stay positive.",
    example: { input: "a dungeon grid", output: "the minimum starting health", why: "DP computed from the destination backward" },
    quizzes: [
      Q("The DP must be computed?", ["From the destination backward", "From the start forward", "Randomly"], 0, "Future needs constrain the present."),
      Q("dp(i,j) represents?", ["The minimum health needed entering this cell", "The path sum", "The count"], 0, "Health requirement."),
      Q("Health must always stay?", ["At least 1 (positive)", "Non-negative", "Even"], 0, "Knight can't drop to 0."),
      Q("The recurrence takes?", ["max(1, min(right, down) - grid(i,j))", "min of neighbors + grid", "the sum"], 0, "Clamp to 1."),
      Q("Forward DP fails because?", ["Local max-health choices aren't globally optimal", "It's too slow", "The grid is small"], 0, "Need backward reasoning."),
      Q("Time complexity?", ["O(m*n)", "O((mn)^2)", "O(2^(mn))"], 0, "Fill the grid."),
      Q("The answer is dp at?", ["The start cell", "The end cell", "The center"], 0, "Required initial health.")
    ]
  },
  "problem_0314": {
    description: "Two traversals collect cherries from the top-left to the bottom-right and back (equivalently two simultaneous paths), maximizing cherries picked without double-counting shared cells.",
    example: { input: "a grid with cherries and thorns", output: "the maximum cherries collected", why: "two synchronized DP paths" },
    quizzes: [
      Q("The key insight is to model it as?", ["Two paths moving simultaneously", "One path twice", "A single BFS"], 0, "Synchronized steps."),
      Q("The DP state tracks?", ["Both paths' positions at the same step", "One position", "The depth"], 0, "Four coordinates (reducible)."),
      Q("Shared cells are counted?", ["Once", "Twice", "Never"], 0, "Avoid double-counting."),
      Q("Since both move the same number of steps, you can drop?", ["One coordinate (derive it)", "The grid", "The cherries"], 0, "Reduce dimensions."),
      Q("Time complexity?", ["O(n^3)", "O(n^2)", "O(2^n)"], 0, "Three free indices."),
      Q("A thorn cell is?", ["Impassable (-1)", "A cherry", "Neutral"], 0, "Blocks the path."),
      Q("The answer maximizes?", ["Total cherries over both paths", "The path length", "The minimum"], 0, "Collected sum.")
    ]
  },
  "problem_0315": {
    description: "Find the maximum sum of a path from the top-left to the bottom-right of a grid, moving only right or down.",
    example: { input: "a grid of numbers", output: "the maximum path sum", why: "take the larger predecessor at each cell" },
    quizzes: [
      Q("The recurrence is?", ["dp(i,j) = grid(i,j) + max(dp(i-1,j), dp(i,j-1))", "min of predecessors", "grid(i,j) only"], 0, "Best predecessor."),
      Q("Movement is?", ["Right or down", "Any direction", "Diagonal"], 0, "Monotone."),
      Q("Time complexity?", ["O(m*n)", "O((mn)^2)", "O(2^(mn))"], 0, "Fill the grid."),
      Q("The objective is to?", ["Maximize the path sum", "Minimize it", "Count paths"], 0, "Largest total."),
      Q("The difference from Minimum Path Sum is?", ["max instead of min", "Diagonal moves", "Obstacles"], 0, "Opposite objective."),
      Q("Space can be?", ["O(n) rolling row", "O(mn) only", "O(1)"], 0, "One row."),
      Q("The first row/column accumulate?", ["Prefix sums", "Zeros", "Max only"], 0, "One way in.")
    ]
  },
  "problem_0316": {
    description: "Find the minimum sum of a falling path through a matrix, where each step moves to the cell directly below or diagonally below-left/right.",
    example: { input: "[[2,1,3],[6,5,4],[7,8,9]]", output: "13", why: "1 -> 5 -> 7" },
    quizzes: [
      Q("From cell (i,j) you can go to row i+1 at?", ["j-1, j, or j+1", "j only", "any column"], 0, "Three choices."),
      Q("The recurrence takes?", ["grid(i,j) + min of the three cells above", "the max above", "the sum above"], 0, "Cheapest predecessor."),
      Q("You can start from?", ["Any cell in the first row", "The top-left only", "The center"], 0, "Any column."),
      Q("Time complexity?", ["O(m*n)", "O((mn)^2)", "O(2^(mn))"], 0, "Fill the grid."),
      Q("The answer is?", ["The minimum over the last row", "The last cell", "The first cell"], 0, "Best ending column."),
      Q("Space can be?", ["O(n) (one row)", "O(mn) only", "O(1)"], 0, "Rolling row."),
      Q("Boundary columns have?", ["Fewer predecessors (2 instead of 3)", "More", "The same"], 0, "Edge handling.")
    ]
  },
  "problem_0317": {
    description: "Given a 2D matrix, compute a running (prefix) sum matrix so that the sum of any submatrix can be queried quickly.",
    example: { input: "a matrix and submatrix queries", output: "O(1) region sums after preprocessing", why: "2D prefix sums" },
    quizzes: [
      Q("The 2D prefix sum at (i,j) is?", ["sum of all cells from (0,0) to (i,j)", "the cell value", "the row sum"], 0, "Inclusion-exclusion build."),
      Q("A region query uses?", ["Four prefix values (inclusion-exclusion)", "One value", "A loop over the region"], 0, "Constant-time sum."),
      Q("Preprocessing costs?", ["O(m*n)", "O((mn)^2)", "O(1)"], 0, "Build the table."),
      Q("Each query after that is?", ["O(1)", "O(mn)", "O(log mn)"], 0, "Constant time."),
      Q("The inclusion-exclusion subtracts?", ["The two overlapping strips, adds back the corner", "Nothing", "The whole matrix"], 0, "Avoid double count."),
      Q("Space complexity?", ["O(m*n)", "O(1)", "O(log mn)"], 0, "The prefix matrix."),
      Q("This is useful when?", ["Many submatrix-sum queries are made", "There is one query", "The matrix changes often"], 0, "Amortize preprocessing.")
    ]
  },
  "problem_0318": {
    description: "Find the length of the longest common subsequence of two strings (characters in order but not necessarily contiguous).",
    example: { input: 'text1="abcde", text2="ace"', output: "3", why: '"ace" is common' },
    quizzes: [
      Q("The recurrence when characters match is?", ["1 + dp(i-1, j-1)", "dp(i-1, j-1)", "0"], 0, "Extend the subsequence."),
      Q("When they differ you take?", ["max(dp(i-1,j), dp(i,j-1))", "their sum", "0"], 0, "Skip one character."),
      Q("Time complexity?", ["O(n*m)", "O(nm log)", "O(2^n)"], 0, "Fill the table."),
      Q("A subsequence must preserve?", ["Relative order (not contiguity)", "Contiguity", "Nothing"], 0, "Order matters."),
      Q("Space can be reduced to?", ["O(min(n,m)) (two rows)", "O(nm) only", "O(1)"], 0, "Rolling rows."),
      Q("LCS underlies?", ["Diff tools / edit distance", "Sorting", "Hashing"], 0, "String comparison."),
      Q("The base cases (empty string) give?", ["0", "1", "the length"], 0, "No common subsequence.")
    ]
  },
  "problem_0319": {
    description: "Find the length of the longest palindromic subsequence of a string.",
    example: { input: '"bbbab"', output: "4", why: '"bbbb"' },
    quizzes: [
      Q("A neat reduction is?", ["LCS of the string and its reverse", "Sorting", "A heap"], 0, "Palindrome = reads same reversed."),
      Q("The interval DP matches characters at?", ["Both ends of the substring", "Only the start", "The middle"], 0, "Shrink inward."),
      Q("When the ends match you add?", ["2 + inner result", "1", "0"], 0, "Both contribute."),
      Q("When they differ you take?", ["max of dropping either end", "their sum", "0"], 0, "Best inner."),
      Q("Time complexity?", ["O(n^2)", "O(n)", "O(2^n)"], 0, "All substrings."),
      Q("A single character is a palindrome of length?", ["1", "0", "2"], 0, "Base case."),
      Q("Space complexity?", ["O(n^2)", "O(1)", "O(log n)"], 0, "The DP table.")
    ]
  },
  "problem_0320": {
    description: "Find the minimum number of character insertions needed to make a string a palindrome.",
    example: { input: '"mbadm"', output: "2", why: '"mbdadbm" or similar' },
    quizzes: [
      Q("The answer equals?", ["length - longest palindromic subsequence", "length / 2", "the length"], 0, "Keep the LPS, insert the rest."),
      Q("The longest palindromic subsequence is found via?", ["LCS with the reverse (interval DP)", "Sorting", "A heap"], 0, "Reuse the LPS."),
      Q("Each non-LPS character needs?", ["One matching insertion", "Two", "Zero"], 0, "Mirror it."),
      Q("Time complexity?", ["O(n^2)", "O(n)", "O(2^n)"], 0, "Interval DP."),
      Q("Minimum insertions equals minimum?", ["Deletions to make a palindrome", "Swaps", "Rotations"], 0, "Symmetric result."),
      Q("An already-palindromic string needs?", ["0 insertions", "n insertions", "1"], 0, "LPS = length."),
      Q("Space complexity?", ["O(n^2)", "O(1)", "O(log n)"], 0, "The DP table.")
    ]
  },
  "problem_0321": {
    description: "Find the minimum number of insertions and deletions required to transform one string into another.",
    example: { input: 'word1="heap", word2="pea"', output: "3", why: "delete 'h','a' and insert 'a' (via LCS)" },
    quizzes: [
      Q("The solution is based on?", ["The longest common subsequence", "Sorting", "A heap"], 0, "Keep the LCS."),
      Q("Deletions equal?", ["len(word1) - LCS", "len(word1)", "LCS"], 0, "Remove non-common chars."),
      Q("Insertions equal?", ["len(word2) - LCS", "len(word2)", "LCS"], 0, "Add the missing chars."),
      Q("Time complexity?", ["O(n*m)", "O(n+m)", "O(2^n)"], 0, "LCS DP."),
      Q("The total operations are?", ["deletions + insertions", "max of them", "their product"], 0, "Combined count."),
      Q("This differs from edit distance by?", ["Not allowing substitutions", "Allowing swaps", "Using a heap"], 0, "Insert/delete only."),
      Q("Space complexity?", ["O(n*m)", "O(1)", "O(log n)"], 0, "The LCS table.")
    ]
  },
  "problem_0322": {
    description: "Find the minimum number of single-character insert, delete, or replace operations to convert one string into another (edit distance).",
    example: { input: 'word1="horse", word2="ros"', output: "3", why: "replace, delete, delete" },
    quizzes: [
      Q("When characters match, the cost is?", ["dp(i-1, j-1) (no operation)", "1 + dp(i-1,j-1)", "0 always"], 0, "Carry over."),
      Q("When they differ you take?", ["1 + min(insert, delete, replace)", "their sum", "0"], 0, "Cheapest edit."),
      Q("The three operations map to?", ["dp(i,j-1), dp(i-1,j), dp(i-1,j-1)", "only one of them", "none"], 0, "Insert/delete/replace."),
      Q("Time complexity?", ["O(n*m)", "O(n+m)", "O(2^n)"], 0, "Fill the table."),
      Q("The base cases (one string empty) are?", ["The other string's length", "0", "1"], 0, "All inserts/deletes."),
      Q("Space can be reduced to?", ["O(min(n,m))", "O(nm) only", "O(1)"], 0, "Two rows."),
      Q("Edit distance is also called?", ["Levenshtein distance", "Hamming distance", "Jaccard distance"], 0, "Classic metric.")
    ]
  },
  "problem_0323": {
    description: "Implement regular-expression matching supporting '.' (any single character) and '*' (zero or more of the preceding element) for the full string.",
    example: { input: 's="aab", p="c*a*b"', output: "true", why: "c* matches empty, a* matches aa, b matches b" },
    quizzes: [
      Q("'*' means?", ["Zero or more of the preceding element", "Exactly one", "Any character"], 0, "Kleene star."),
      Q("'.' matches?", ["Any single character", "Zero characters", "A digit only"], 0, "Wildcard."),
      Q("For '*', the DP considers?", ["Zero occurrences or one more occurrence", "Only one", "Only zero"], 0, "Two branches."),
      Q("Time complexity?", ["O(n*m)", "O(n+m)", "O(2^n)"], 0, "Fill the table."),
      Q("The match must cover?", ["The entire string", "A prefix only", "A substring"], 0, "Full match."),
      Q("'a*' can match?", ["An empty string too", "Only non-empty", "Exactly 'a'"], 0, "Zero or more."),
      Q("Space complexity?", ["O(n*m)", "O(1)", "O(log n)"], 0, "The DP table.")
    ]
  },
  "problem_0324": {
    description: "Count the number of distinct subsequences of a string s that equal another string t.",
    example: { input: 's="rabbbit", t="rabbit"', output: "3", why: "three ways to pick the subsequence" },
    quizzes: [
      Q("When s[i] == t[j], you add?", ["dp(i-1,j-1) + dp(i-1,j)", "dp(i-1,j-1) only", "1"], 0, "Use it or skip it."),
      Q("When they differ, you take?", ["dp(i-1, j) (skip s[i])", "0", "their sum"], 0, "Skip the s character."),
      Q("Time complexity?", ["O(n*m)", "O(n+m)", "O(2^n)"], 0, "Fill the table."),
      Q("A subsequence preserves?", ["Order (not contiguity)", "Contiguity", "Nothing"], 0, "Relative order."),
      Q("The base case dp(i, 0) (empty t) is?", ["1 (one way: delete all)", "0", "i"], 0, "Empty match."),
      Q("The answer counts?", ["Distinct ways to form t from s", "The length", "The LCS"], 0, "Number of subsequences."),
      Q("Space can be?", ["O(m) (one row)", "O(nm) only", "O(1)"], 0, "Rolling row.")
    ]
  },
  "problem_0325": {
    description: "Find the minimum number of cuts needed to partition a string so that every resulting substring is a palindrome.",
    example: { input: '"aab"', output: "1", why: '"aa" | "b"' },
    quizzes: [
      Q("The DP tracks?", ["Minimum cuts for each prefix", "The longest palindrome", "The count of palindromes"], 0, "Prefix DP."),
      Q("cuts(i) uses?", ["cuts(j) + 1 when s[j..i] is a palindrome", "cuts(i-1) only", "the length"], 0, "Over valid splits."),
      Q("A palindrome table precomputes?", ["Which substrings are palindromes", "The cuts", "The lengths"], 0, "O(n^2) check."),
      Q("Time complexity?", ["O(n^2)", "O(n)", "O(2^n)"], 0, "Prefix times split."),
      Q("If the whole string is a palindrome, cuts =?", ["0", "1", "n"], 0, "No cut needed."),
      Q("The answer is cuts for?", ["The full string", "The first character", "The middle"], 0, "Whole prefix."),
      Q("Space complexity?", ["O(n^2)", "O(1)", "O(log n)"], 0, "Palindrome table + cuts.")
    ]
  },
  "problem_0326": {
    description: "Find the shortest string that has both given strings as subsequences (shortest common supersequence).",
    example: { input: 'str1="abac", str2="cab"', output: '"cabac" (length 5)', why: "built around the LCS" },
    quizzes: [
      Q("The length equals?", ["len(a) + len(b) - LCS length", "len(a) + len(b)", "LCS length"], 0, "Merge, sharing the LCS."),
      Q("The common parts counted once are?", ["The longest common subsequence", "All characters", "None"], 0, "Shared backbone."),
      Q("To build the string you?", ["Backtrack through the LCS DP table", "Sort", "Use a heap"], 0, "Reconstruct the merge."),
      Q("Time complexity?", ["O(n*m)", "O(n+m)", "O(2^n)"], 0, "LCS DP + build."),
      Q("Both strings must appear as?", ["Subsequences of the result", "Substrings", "Prefixes"], 0, "Supersequence property."),
      Q("Characters unique to each string are?", ["Inserted around the LCS", "Dropped", "Sorted"], 0, "Keep both."),
      Q("Space complexity?", ["O(n*m)", "O(1)", "O(log n)"], 0, "The DP table.")
    ]
  },
  "problem_0327": {
    description: "Determine whether one string is a scrambled version of another, where scrambling recursively swaps the two halves of substrings.",
    example: { input: 's1="great", s2="rgeat"', output: "true", why: "a valid recursive partition and swap" },
    quizzes: [
      Q("The recursion splits both strings at?", ["Every possible partition point", "The middle only", "The end"], 0, "Try all splits."),
      Q("At each split you check?", ["Matched halves, or swapped halves", "Only matched", "Only swapped"], 0, "Two arrangements."),
      Q("A quick prune checks?", ["Equal character counts", "Lengths only", "Sorting once"], 0, "Anagram requirement."),
      Q("Memoization keys on?", ["The pair of substrings (indices + length)", "Just the length", "Nothing"], 0, "Cache subproblems."),
      Q("Time complexity is?", ["Polynomial with memoization (roughly O(n^4))", "O(n)", "O(1)"], 0, "Many subproblems."),
      Q("Without memoization it is?", ["Exponential", "Linear", "Logarithmic"], 0, "Overlapping recursion."),
      Q("The base case is?", ["Equal substrings", "Empty strings only", "Single mismatch"], 0, "Direct match.")
    ]
  },
  "problem_0340": {
    description: "Given item weights and values and a capacity, maximize the total value of items placed in a knapsack (each item used at most once).",
    example: { input: "weights, values, capacity W", output: "the maximum value", why: "classic 0/1 knapsack DP" },
    quizzes: [
      Q("For each item you choose to?", ["Include it or exclude it", "Include it multiple times", "Always include"], 0, "0/1 decision."),
      Q("The recurrence takes?", ["max(exclude, value + include with reduced capacity)", "the sum", "the min"], 0, "Best of two."),
      Q("Time complexity?", ["O(n * W)", "O(n)", "O(2^n)"], 0, "Items times capacity (pseudo-polynomial)."),
      Q("The DP is?", ["Pseudo-polynomial (depends on W)", "Truly polynomial", "Logarithmic"], 0, "Capacity-dependent."),
      Q("Space can be reduced to?", ["O(W) (1D, iterate capacity backward)", "O(nW) only", "O(1)"], 0, "Rolling array."),
      Q("Iterating capacity backward ensures?", ["Each item is used at most once", "Items repeat", "Sorting"], 0, "0/1 constraint."),
      Q("Unbounded knapsack would iterate capacity?", ["Forward", "Backward", "Randomly"], 0, "Allows reuse.")
    ]
  },
  "problem_0341": {
    description: "Determine whether an array can be partitioned into two subsets with equal sum.",
    example: { input: "[1,5,11,5]", output: "true", why: "{1,5,5} and {11}" },
    quizzes: [
      Q("This reduces to?", ["Subset sum for total/2", "Sorting", "A heap"], 0, "Find half the total."),
      Q("If the total sum is odd, the answer is?", ["false", "true", "depends"], 0, "Can't split evenly."),
      Q("The DP tracks?", ["Which sums up to total/2 are achievable", "The max element", "The count"], 0, "Boolean reachability."),
      Q("Time complexity?", ["O(n * sum)", "O(n)", "O(2^n)"], 0, "Pseudo-polynomial."),
      Q("Space can be?", ["O(sum) (1D boolean)", "O(n*sum) only", "O(1)"], 0, "Rolling array."),
      Q("The target is?", ["total / 2", "total", "the max"], 0, "Equal halves."),
      Q("Iterate the sum dimension?", ["Backward (0/1 items)", "Forward", "Randomly"], 0, "Use each number once.")
    ]
  },
  "problem_0342": {
    description: "Count the number of ways to assign + and - signs to array elements so that the difference between the positive and negative subsets equals a given target.",
    example: { input: "nums, difference D", output: "the number of valid partitions", why: "reduces to a subset-sum count" },
    quizzes: [
      Q("The positive subset must sum to?", ["(total + D) / 2", "total", "D"], 0, "Algebraic reduction."),
      Q("If (total + D) is odd or negative, the answer is?", ["0", "1", "total"], 0, "No valid integer subset."),
      Q("The DP counts?", ["Subsets reaching the target sum", "The max subset", "The partitions by size"], 0, "Count, not feasibility."),
      Q("Time complexity?", ["O(n * sum)", "O(n)", "O(2^n)"], 0, "Pseudo-polynomial."),
      Q("This is equivalent to?", ["Target Sum", "Edit distance", "LCS"], 0, "Sign assignment."),
      Q("Zeros in the array?", ["Double the count (either sign)", "Are ignored", "Break the DP"], 0, "Each 0 is +/-."),
      Q("Space can be?", ["O(sum)", "O(n*sum) only", "O(1)"], 0, "1D array.")
    ]
  },
  "problem_0343": {
    description: "Given coin denominations and an amount, find the fewest coins needed to make that amount, or -1 if impossible.",
    example: { input: "coins = [1,2,5], amount = 11", output: "3", why: "5 + 5 + 1" },
    quizzes: [
      Q("The recurrence is?", ["dp(a) = min over coins of dp(a - coin) + 1", "dp(a) = a", "greedy largest coin"], 0, "Unbounded coins."),
      Q("Greedy (largest coin first) is?", ["Not always correct", "Always correct", "Faster and correct"], 0, "DP is needed."),
      Q("Time complexity?", ["O(amount * coins)", "O(amount)", "O(2^coins)"], 0, "Fill up to the amount."),
      Q("Unreachable amounts return?", ["-1", "0", "amount"], 0, "No combination."),
      Q("Coins can be used?", ["Unlimited times", "Once each", "Twice each"], 0, "Unbounded."),
      Q("The base case is?", ["dp(0) = 0", "dp(0) = 1", "dp(1) = 0"], 0, "No coins for 0."),
      Q("Space complexity?", ["O(amount)", "O(1)", "O(coins^2)"], 0, "The DP array.")
    ]
  },
  "problem_0344": {
    description: "Count the number of distinct combinations of coins that sum to a given amount (order does not matter).",
    example: { input: "amount = 5, coins = [1,2,5]", output: "4", why: "distinct combinations summing to 5" },
    quizzes: [
      Q("To count combinations (not permutations) you loop?", ["Coins outer, amount inner", "Amount outer, coins inner", "Randomly"], 0, "Avoids counting orders separately."),
      Q("The recurrence adds?", ["dp(a) += dp(a - coin)", "dp(a) = min(...)", "dp(a) = a"], 0, "Accumulate ways."),
      Q("Looping amount outer would count?", ["Permutations (ordered)", "Combinations", "Nothing"], 0, "Wrong for this problem."),
      Q("Time complexity?", ["O(amount * coins)", "O(amount)", "O(2^coins)"], 0, "Fill the table."),
      Q("The base case is?", ["dp(0) = 1 (empty combination)", "dp(0) = 0", "dp(1) = 1"], 0, "One way to make 0."),
      Q("Coins are used?", ["Unlimited times", "Once each", "Twice each"], 0, "Unbounded."),
      Q("Space complexity?", ["O(amount)", "O(1)", "O(coins^2)"], 0, "The DP array.")
    ]
  },
  "problem_0345": {
    description: "Count the ways to assign + or - to each number so the resulting expression equals a target (Target Sum).",
    example: { input: "nums = [1,1,1,1,1], target = 3", output: "5", why: "five sign assignments reach 3" },
    quizzes: [
      Q("It reduces to a subset summing to?", ["(total + target) / 2", "target", "total"], 0, "Positive subset."),
      Q("If (total + target) is odd or too large, the answer is?", ["0", "1", "total"], 0, "No valid subset."),
      Q("The DP counts?", ["Subsets reaching the derived target", "The max", "Permutations by length"], 0, "Count of ways."),
      Q("Time complexity?", ["O(n * sum)", "O(n)", "O(2^n)"], 0, "Pseudo-polynomial."),
      Q("The naive approach is?", ["O(2^n) sign enumeration", "O(n)", "O(log n)"], 0, "DP improves it."),
      Q("This is equivalent to?", ["Partition with a given difference", "LCS", "Edit distance"], 0, "Same reduction."),
      Q("Space can be?", ["O(sum)", "O(n*sum) only", "O(1)"], 0, "1D array.")
    ]
  },
  "problem_0346": {
    description: "Determine whether a subset of the array sums exactly to a given target.",
    example: { input: "nums = [3,34,4,12,5,2], target = 9", output: "true", why: "4 + 5 = 9" },
    quizzes: [
      Q("The DP tracks?", ["Which target sums are achievable", "The max element", "The count"], 0, "Boolean reachability."),
      Q("For each number you?", ["Include or exclude it", "Always include", "Sort"], 0, "0/1 choice."),
      Q("Time complexity?", ["O(n * target)", "O(n)", "O(2^n)"], 0, "Pseudo-polynomial."),
      Q("Space can be reduced to?", ["O(target) (1D boolean)", "O(n*target) only", "O(1)"], 0, "Rolling array."),
      Q("Iterate the sum dimension?", ["Backward (each number once)", "Forward", "Randomly"], 0, "0/1 constraint."),
      Q("The base case is?", ["Sum 0 is always achievable", "Sum 0 is false", "Sum 1 is true"], 0, "Empty subset."),
      Q("This underlies?", ["Partition and target-sum problems", "Sorting", "Graph DP"], 0, "Core subset-sum.")
    ]
  },
  "problem_0347": {
    description: "Count the number of ordered combinations (permutations) of the array that add up to a target, where numbers may be reused.",
    example: { input: "nums = [1,2,3], target = 4", output: "7", why: "ordered sequences summing to 4" },
    quizzes: [
      Q("Because order matters, you loop?", ["Target outer, numbers inner", "Numbers outer", "Randomly"], 0, "Count permutations."),
      Q("The recurrence adds?", ["dp(t) += dp(t - num)", "dp(t) = min(...)", "dp(t) = t"], 0, "Accumulate ordered ways."),
      Q("Numbers can be reused?", ["Yes, unlimited times", "Once each", "Twice"], 0, "Unbounded."),
      Q("Time complexity?", ["O(target * n)", "O(target)", "O(2^n)"], 0, "Fill the table."),
      Q("The base case is?", ["dp(0) = 1", "dp(0) = 0", "dp(1) = 1"], 0, "Empty sequence."),
      Q("(1,3) and (3,1) are counted?", ["Separately (order matters)", "Once", "Never"], 0, "Permutations."),
      Q("Space complexity?", ["O(target)", "O(1)", "O(n^2)"], 0, "The DP array.")
    ]
  },
  "problem_0335": {
    description: "A thief robs a binary tree of houses; robbing a node forbids robbing its direct children. Maximize the total robbed.",
    example: { input: "a binary tree of values", output: "the maximum non-adjacent sum", why: "tree DP returning rob/not-rob per node" },
    quizzes: [
      Q("Each node returns?", ["Two values: max if robbed, max if not robbed", "One value", "The height"], 0, "Pair per node."),
      Q("If you rob a node, its children must be?", ["Not robbed", "Also robbed", "Sorted"], 0, "Adjacency constraint."),
      Q("The 'robbed' value is?", ["node + children's not-robbed values", "node + children's robbed values", "0"], 0, "Skip children."),
      Q("The 'not-robbed' value is?", ["sum of max(rob, not-rob) of each child", "0", "node only"], 0, "Children free to choose."),
      Q("Time complexity?", ["O(n)", "O(n^2)", "O(2^n)"], 0, "One DFS."),
      Q("The traversal is?", ["Postorder (children first)", "Preorder", "Level order"], 0, "Bottom-up DP."),
      Q("The answer is?", ["max(rob, not-rob) at the root", "rob at the root", "the root value"], 0, "Best of the two.")
    ]
  },
  "problem_0339": {
    description: "Count the number of downward paths in a binary tree whose node values sum to a target (paths need not start at the root).",
    example: { input: "a tree, target", output: "the number of qualifying paths", why: "prefix sums along each root-to-node path" },
    quizzes: [
      Q("The efficient approach uses?", ["Prefix sums with a hash map", "Sorting", "A heap"], 0, "Count sums on the path."),
      Q("You look up?", ["currentSum - target in the map", "the target directly", "the depth"], 0, "Paths ending here."),
      Q("Time complexity?", ["O(n)", "O(n^2)", "O(n log n)"], 0, "With prefix sums."),
      Q("Paths go?", ["Downward (parent to child)", "In any direction", "Root to leaf only"], 0, "Not upward."),
      Q("After visiting a node you must?", ["Remove its prefix sum (backtrack)", "Keep it", "Sort"], 0, "Avoid cross-branch leakage."),
      Q("The map stores?", ["Counts of prefix sums seen", "Node values", "Depths"], 0, "Running-sum frequency."),
      Q("The naive method is?", ["O(n^2) (sum from every node)", "O(n)", "O(log n)"], 0, "Recount per start.")
    ]
  },
  "new-problem": {
    description: "Place the minimum number of cameras on a binary tree so that every node is monitored, where a camera covers its parent, itself, and its direct children.",
    example: { input: "a binary tree", output: "the minimum number of cameras", why: "greedy tree DP by node state" },
    quizzes: [
      Q("Each node is in one of three states?", ["Not covered, covered (no camera), has a camera", "Robbed / not robbed", "Visited / unvisited"], 0, "State-based DP."),
      Q("The DP works?", ["Bottom-up (postorder)", "Top-down", "Level order"], 0, "Leaves inform parents."),
      Q("You place a camera when?", ["A child is uncovered", "Every node", "At leaves"], 0, "Cover upward greedily."),
      Q("Placing cameras at leaves is?", ["Wasteful (cover their parents instead)", "Optimal", "Required"], 0, "Parents cover more."),
      Q("Time complexity?", ["O(n)", "O(n^2)", "O(2^n)"], 0, "One DFS."),
      Q("A camera covers?", ["The node, its parent, and its children", "Only itself", "The whole subtree"], 0, "Local coverage."),
      Q("The greedy choice is proven by?", ["Covering from the bottom up", "Sorting", "A heap"], 0, "Leaf parents first.")
    ]
  },
  "problem_0328": {
    description: "Given matrix dimensions, find the minimum number of scalar multiplications needed to multiply a chain of matrices (matrix chain multiplication).",
    example: { input: "dimensions of a matrix chain", output: "the minimum multiplication cost", why: "interval DP over split points" },
    quizzes: [
      Q("The DP is over?", ["Intervals (subchains) and split points", "Single matrices", "Rows only"], 0, "Interval DP."),
      Q("dp(i,j) is the min cost to multiply?", ["Matrices i through j", "Matrix i only", "The whole chain always"], 0, "A subchain."),
      Q("You try every?", ["Split point k between i and j", "Row", "Column"], 0, "Last multiplication."),
      Q("The cost of a split adds?", ["dim[i-1]*dim[k]*dim[j]", "dim[i]+dim[j]", "1"], 0, "Multiplication count."),
      Q("Time complexity?", ["O(n^3)", "O(n^2)", "O(2^n)"], 0, "Intervals times splits."),
      Q("Matrix multiplication is?", ["Associative (grouping affects cost, not result)", "Commutative", "Neither"], 0, "Reparenthesize."),
      Q("Space complexity?", ["O(n^2)", "O(1)", "O(log n)"], 0, "The DP table.")
    ]
  },
  "problem_0329": {
    description: "Given balloons with values, maximize the coins obtained by bursting them all, where bursting a balloon yields the product of it and its current neighbors.",
    example: { input: "[3,1,5,8]", output: "167", why: "an optimal bursting order" },
    quizzes: [
      Q("The DP thinks about which balloon is burst?", ["Last in an interval", "First", "In input order"], 0, "Neighbors stay fixed."),
      Q("dp(i,j) is the max coins for?", ["The open interval between boundaries i and j", "One balloon", "The whole array always"], 0, "Interval DP."),
      Q("Bursting last means the neighbors are?", ["The interval boundaries", "Already gone", "Random"], 0, "Fixed multipliers."),
      Q("Padding the array with 1s at the ends helps?", ["Handle boundary balloons", "Sort", "Speed up"], 0, "Virtual neighbors."),
      Q("Time complexity?", ["O(n^3)", "O(n^2)", "O(2^n)"], 0, "Intervals times choice."),
      Q("Thinking 'burst first' fails because?", ["Neighbors keep changing", "It's too slow", "The array is small"], 0, "Last-burst fixes them."),
      Q("Space complexity?", ["O(n^2)", "O(1)", "O(log n)"], 0, "The DP table.")
    ]
  },
  "problem_0330": {
    description: "Merge piles of stones (k consecutive piles at a time, cost = their total) into one pile at minimum cost, or report it is impossible.",
    example: { input: "stones, k", output: "the minimum merge cost, or -1", why: "interval DP with a feasibility condition" },
    quizzes: [
      Q("Merging is feasible only when?", ["(n - 1) is divisible by (k - 1)", "n is even", "k = 2 always"], 0, "Reach one pile."),
      Q("The DP is over?", ["Intervals of piles", "Single piles", "Rows"], 0, "Interval DP."),
      Q("The cost of a merge adds?", ["The sum of the merged piles (via prefix sums)", "1", "the count"], 0, "Prefix-sum total."),
      Q("Splits are considered in steps of?", ["(k - 1)", "1", "k"], 0, "Group alignment."),
      Q("Time complexity?", ["O(n^3) (roughly, times k)", "O(n)", "O(2^n)"], 0, "Intervals times splits."),
      Q("If merging is impossible, return?", ["-1", "0", "the total"], 0, "Infeasible case."),
      Q("Prefix sums give?", ["O(1) range totals", "Sorting", "A heap"], 0, "Fast cost lookup.")
    ]
  },
  "problem_0331": {
    description: "Given a stick of a certain length and positions to cut, find the minimum total cost of making all cuts, where each cut costs the length of the stick being cut.",
    example: { input: "length n, cut positions", output: "the minimum total cutting cost", why: "interval DP over cut order" },
    quizzes: [
      Q("The DP is over?", ["Intervals between cuts", "Single cuts", "Rows"], 0, "Interval DP."),
      Q("You add sentinel cuts at?", ["0 and n (the stick ends)", "The middle", "Nowhere"], 0, "Boundaries."),
      Q("The cost of a cut is?", ["The length of the current segment", "1", "The number of cuts"], 0, "Segment length."),
      Q("Cuts should be?", ["Sorted first", "Left unsorted", "Reversed"], 0, "Order the positions."),
      Q("You try every?", ["Cut as the first in an interval", "Row", "Column"], 0, "Split choice."),
      Q("Time complexity?", ["O(m^3) in the number of cuts", "O(n)", "O(2^m)"], 0, "Interval DP."),
      Q("The cut order?", ["Affects the total cost", "Doesn't matter", "Is fixed"], 0, "DP optimizes it.")
    ]
  },
  "problem_0332": {
    description: "Given intervals with associated costs, select or merge them to optimize a total cost using interval dynamic programming.",
    example: { input: "intervals with costs", output: "the optimal total cost", why: "DP over interval combinations" },
    quizzes: [
      Q("The DP state represents?", ["An interval (range) being optimized", "A single point", "A row"], 0, "Interval DP."),
      Q("You combine subintervals by?", ["Trying split points", "Sorting once", "A heap"], 0, "Optimal partition."),
      Q("Sorting intervals first often?", ["Enables clean transitions", "Is unnecessary", "Breaks the DP"], 0, "Order helps."),
      Q("Time complexity is typically?", ["O(n^2) or O(n^3)", "O(n)", "O(2^n)"], 0, "Interval DP range."),
      Q("The objective is to?", ["Optimize the combined cost", "Count intervals", "Sort them"], 0, "Minimize/maximize cost."),
      Q("Overlapping intervals are handled by?", ["The DP transitions", "Ignoring them", "A heap only"], 0, "Merge logic."),
      Q("Space complexity?", ["O(n^2)", "O(1)", "O(log n)"], 0, "The DP table.")
    ]
  },
  "problem_0333": {
    description: "Count the number of ways to parenthesize a boolean expression (with and/or/xor operators) so that it evaluates to true.",
    example: { input: 'an expression like "T|F&T"', output: "the count of true-evaluating parenthesizations", why: "interval DP tracking true/false counts" },
    quizzes: [
      Q("The DP tracks, per interval?", ["Counts of true and false evaluations", "Only true", "The length"], 0, "Both outcomes."),
      Q("You split the expression at?", ["Each operator", "The middle only", "The ends"], 0, "Operator as the root."),
      Q("Combining counts depends on?", ["The operator (and/or/xor)", "The operands only", "Sorting"], 0, "Truth-table logic."),
      Q("Time complexity?", ["O(n^3)", "O(n^2)", "O(2^n)"], 0, "Intervals times splits."),
      Q("You need both true and false counts because?", ["Operators combine both sides' outcomes", "Only true matters", "To sort"], 0, "e.g. XOR needs both."),
      Q("Memoization keys on?", ["The interval (i, j)", "The length only", "Nothing"], 0, "Subexpression range."),
      Q("Space complexity?", ["O(n^2)", "O(1)", "O(log n)"], 0, "Two DP tables.")
    ]
  },
  "prob_dp_stock_1": {
    description: "Find the maximum profit from buying and selling a stock once, given daily prices.",
    example: { input: "[7,1,5,3,6,4]", output: "5", why: "buy at 1, sell at 6" },
    quizzes: [
      Q("You track?", ["The minimum price so far and the best profit", "All pairs", "A heap"], 0, "One pass."),
      Q("At most how many transactions?", ["One", "Two", "Unlimited"], 0, "Single buy/sell."),
      Q("Time complexity?", ["O(n)", "O(n^2)", "O(n log n)"], 0, "One pass."),
      Q("Profit is updated as?", ["price - minSoFar", "price + minSoFar", "the max price"], 0, "Sell high, bought low."),
      Q("You must buy before you?", ["Sell", "The first day", "The last day"], 0, "Order constraint."),
      Q("If prices only fall, the profit is?", ["0 (no transaction)", "Negative", "The drop"], 0, "Don't trade."),
      Q("Space complexity?", ["O(1)", "O(n)", "O(log n)"], 0, "Two variables.")
    ]
  },
  "prob_dp_stock_2": {
    description: "Find the maximum profit when you may buy and sell the stock as many times as you like (but hold at most one share at a time).",
    example: { input: "[7,1,5,3,6,4]", output: "7", why: "gains 4 and 3 from consecutive rises" },
    quizzes: [
      Q("A greedy approach sums?", ["Every positive day-to-day difference", "Only the biggest rise", "All differences"], 0, "Capture each rise."),
      Q("Transactions are?", ["Unlimited", "At most one", "At most two"], 0, "Buy/sell freely."),
      Q("Time complexity?", ["O(n)", "O(n^2)", "O(n log n)"], 0, "One pass."),
      Q("You hold at most?", ["One share at a time", "Two shares", "Unlimited"], 0, "Sell before re-buying."),
      Q("Summing all upward steps equals?", ["The optimal multi-transaction profit", "A lower bound", "Zero"], 0, "Greedy optimality."),
      Q("Falling stretches contribute?", ["Nothing (skip them)", "A loss", "The drop"], 0, "Only buy before rises."),
      Q("Space complexity?", ["O(1)", "O(n)", "O(log n)"], 0, "A running total.")
    ]
  },
  "prob_dp_stock_3": {
    description: "Find the maximum profit with at most two buy-sell transactions.",
    example: { input: "[3,3,5,0,0,3,1,4]", output: "6", why: "two separate profitable trades" },
    quizzes: [
      Q("The DP tracks states for?", ["Up to two transactions (buy1, sell1, buy2, sell2)", "One transaction", "Unlimited"], 0, "Four states."),
      Q("Transactions are limited to?", ["At most two", "At most one", "Unlimited"], 0, "k = 2."),
      Q("Time complexity?", ["O(n)", "O(n^2)", "O(n log n)"], 0, "Fixed states per day."),
      Q("Each state updates based on?", ["The previous day's states", "All future days", "Sorting"], 0, "Transition relations."),
      Q("The answer is?", ["The second-sell state at the end", "The first buy", "The max price"], 0, "After both trades."),
      Q("Space can be?", ["O(1) (a few variables)", "O(n) only", "O(nk)"], 0, "Constant states."),
      Q("This is a special case of?", ["Best Time with at most k transactions", "Single transaction", "Cooldown"], 0, "k = 2.")
    ]
  },
  "prob_dp_stock_4": {
    description: "Find the maximum profit with at most k buy-sell transactions.",
    example: { input: "k = 2, prices = [2,4,1]", output: "2", why: "buy at 2, sell at 4" },
    quizzes: [
      Q("The DP dimensions are?", ["Days and transaction count (and holding state)", "Days only", "Transactions only"], 0, "Multi-state DP."),
      Q("When k >= n/2, the problem reduces to?", ["Unlimited transactions (greedy)", "One transaction", "No profit"], 0, "No practical limit."),
      Q("Time complexity?", ["O(n * k)", "O(n^2)", "O(2^n)"], 0, "Days times transactions."),
      Q("Each transaction is a?", ["Buy followed by a sell", "Buy only", "Sell only"], 0, "A completed trade."),
      Q("The states per day track?", ["Holding or not, per transaction count", "Only the price", "The depth"], 0, "Buy/sell DP."),
      Q("Space can be reduced to?", ["O(k)", "O(nk) only", "O(1)"], 0, "Rolling over days."),
      Q("The large-k shortcut avoids?", ["An O(n*k) blowup", "Sorting", "A heap"], 0, "Switch to greedy.")
    ]
  },
  "prob_dp_stock_5": {
    description: "Find the maximum profit with unlimited transactions, but with a one-day cooldown required after each sell.",
    example: { input: "[1,2,3,0,2]", output: "3", why: "buy, sell, cooldown, buy, sell" },
    quizzes: [
      Q("The states per day are?", ["Hold, sold (just sold), rest/cooldown", "Only hold", "Only sold"], 0, "Three-state DP."),
      Q("After selling you must?", ["Cool down one day before buying", "Buy immediately", "Stop trading"], 0, "The constraint."),
      Q("Time complexity?", ["O(n)", "O(n^2)", "O(2^n)"], 0, "Constant states per day."),
      Q("From the 'sold' state you go to?", ["Cooldown (rest)", "Hold", "Sold again"], 0, "Forced wait."),
      Q("Transactions are?", ["Unlimited (with cooldown)", "At most one", "At most two"], 0, "Many trades."),
      Q("The answer is the max of?", ["The rest and sold states at the end", "Hold only", "The max price"], 0, "Not holding is best."),
      Q("Space can be?", ["O(1)", "O(n) only", "O(nk)"], 0, "A few variables.")
    ]
  },
  "prob_dp_stock_6": {
    description: "Find the maximum profit with unlimited transactions, where a fixed fee is charged per transaction.",
    example: { input: "prices = [1,3,2,8,4,9], fee = 2", output: "8", why: "profit after subtracting fees" },
    quizzes: [
      Q("The states per day are?", ["Holding a share or not holding", "Only holding", "Three states"], 0, "Two-state DP."),
      Q("The fee is subtracted?", ["Once per completed transaction (on sell or buy)", "Every day", "Never"], 0, "Per trade."),
      Q("Time complexity?", ["O(n)", "O(n^2)", "O(2^n)"], 0, "Constant states per day."),
      Q("Transactions are?", ["Unlimited (minus fees)", "At most one", "At most two"], 0, "Many trades."),
      Q("The fee discourages?", ["Trading on tiny price movements", "Holding", "Selling high"], 0, "Only profitable trades."),
      Q("The answer is?", ["The not-holding state at the end", "The holding state", "The max price"], 0, "Cash out."),
      Q("Space can be?", ["O(1)", "O(n) only", "O(nk)"], 0, "Two variables.")
    ]
  },

  // ================= Backtracking =================
  "problem_0263": {
    description: "Return all subsets (the power set) of an array of distinct integers using backtracking.",
    example: { input: "[1,2,3]", output: "8 subsets", why: "each element is included or excluded" },
    quizzes: [
      Q("At each element you decide to?", ["Include it or exclude it", "Always include", "Sort"], 0, "Binary choice."),
      Q("The number of subsets is?", ["2^n", "n^2", "n!"], 0, "Each in or out."),
      Q("Backtracking means you?", ["Add, recurse, then remove the element", "Keep all", "Sort"], 0, "Undo the choice."),
      Q("Time complexity?", ["O(2^n * n)", "O(n^2)", "O(n)"], 0, "Build each subset."),
      Q("Starting the recursion index at i prevents?", ["Reusing earlier elements (duplicate subsets)", "Sorting", "Cycles"], 0, "Move forward only."),
      Q("The empty subset is?", ["Always included", "Excluded", "Optional"], 0, "The base of the tree."),
      Q("Space complexity?", ["O(n) recursion + output", "O(1)", "O(n^2)"], 0, "Path depth.")
    ]
  },
  "problem_0264": {
    description: "Return all unique subsets of an array that may contain duplicate values.",
    example: { input: "[1,2,2]", output: "unique subsets only", why: "duplicates must not repeat a subset" },
    quizzes: [
      Q("To avoid duplicate subsets you first?", ["Sort the array", "Reverse it", "Hash it"], 0, "Group equal values."),
      Q("During recursion you skip?", ["An equal value at the same depth", "Every second value", "Nothing"], 0, "Prevents duplicates."),
      Q("Time complexity?", ["O(2^n * n)", "O(n^2)", "O(n)"], 0, "Enumerate subsets."),
      Q("The skip condition is?", ["i > start and nums[i] == nums[i-1]", "i is even", "Always"], 0, "Same-level duplicate."),
      Q("Sorting helps because?", ["Equal values become adjacent", "It's faster", "It removes duplicates"], 0, "Easy to detect."),
      Q("The result contains?", ["Only unique subsets", "All 2^n subsets", "One subset"], 0, "De-duplicated."),
      Q("Space complexity?", ["O(n) recursion + output", "O(1)", "O(n^2)"], 0, "Path depth.")
    ]
  },
  "problem_0265": {
    description: "Find all unique combinations of candidate numbers that sum to a target, where each number may be used unlimited times.",
    example: { input: "candidates = [2,3,6,7], target = 7", output: "[[2,2,3],[7]]", why: "combinations summing to 7" },
    quizzes: [
      Q("Numbers can be reused, so recursion passes?", ["The same index again", "Only the next index", "A random index"], 0, "Allow repeats."),
      Q("You prune a branch when?", ["The remaining target goes negative", "The list is sorted", "At depth 1"], 0, "Overshoot."),
      Q("To avoid duplicate combinations you?", ["Never go back to earlier candidates", "Sort the output", "Use a heap"], 0, "Non-decreasing picks."),
      Q("You record a combination when?", ["The remaining target reaches 0", "Any node", "The start"], 0, "Exact sum."),
      Q("Backtracking undoes?", ["The last chosen number", "The whole path", "Nothing"], 0, "Try the next option."),
      Q("Time complexity is?", ["Exponential (output-sensitive)", "O(n)", "O(n log n)"], 0, "Many combinations."),
      Q("Sorting candidates enables?", ["Early pruning", "A heap", "O(1) lookup"], 0, "Stop when too big.")
    ]
  },
  "problem_0266": {
    description: "Find all unique combinations of candidates that sum to a target, where each candidate may be used at most once.",
    example: { input: "candidates = [10,1,2,7,6,1,5], target = 8", output: "unique combinations summing to 8", why: "each number used once, no duplicate sets" },
    quizzes: [
      Q("Each candidate is used?", ["At most once", "Unlimited times", "Exactly twice"], 0, "Advance the index."),
      Q("To skip duplicate combinations you?", ["Sort, then skip equal values at the same depth", "Use a heap", "Sort the output"], 0, "Avoid repeats."),
      Q("Recursion passes?", ["The next index (i+1)", "The same index", "A random index"], 0, "No reuse."),
      Q("You prune when?", ["The remaining target is negative", "At depth 1", "Never"], 0, "Overshoot."),
      Q("The skip condition is?", ["i > start and candidates[i] == candidates[i-1]", "i even", "Always"], 0, "Same-level duplicate."),
      Q("You record when?", ["The remaining target is 0", "Any node", "The end"], 0, "Exact sum."),
      Q("Time complexity is?", ["Exponential (output-sensitive)", "O(n)", "O(n log n)"], 0, "Combinatorial.")
    ]
  },
  "problem_0267": {
    description: "Return all permutations of an array of distinct integers.",
    example: { input: "[1,2,3]", output: "6 permutations", why: "3! orderings" },
    quizzes: [
      Q("At each position you choose?", ["Any unused element", "The smallest only", "The next in order"], 0, "Arrange all."),
      Q("The number of permutations is?", ["n!", "2^n", "n^2"], 0, "Orderings."),
      Q("You track?", ["Which elements are used", "Only the sum", "The depth only"], 0, "Avoid reuse."),
      Q("Backtracking marks and then?", ["Unmarks each element after recursing", "Keeps it marked", "Sorts"], 0, "Restore state."),
      Q("Time complexity?", ["O(n! * n)", "O(2^n)", "O(n^2)"], 0, "Build each permutation."),
      Q("An in-place swap method avoids?", ["A used[] array", "Recursion", "Sorting"], 0, "Swap-based generation."),
      Q("A complete permutation has length?", ["n", "2n", "n-1"], 0, "All elements placed.")
    ]
  },
  "problem_0268": {
    description: "Return all unique permutations of an array that may contain duplicate values.",
    example: { input: "[1,1,2]", output: "3 unique permutations", why: "duplicates collapse repeated orderings" },
    quizzes: [
      Q("To avoid duplicate permutations you?", ["Sort, then skip equal unused values at the same level", "Use a heap", "Sort the output"], 0, "Prevent repeats."),
      Q("The skip rule uses the condition?", ["nums[i] == nums[i-1] and nums[i-1] is unused", "i is even", "Always"], 0, "Same value, same level."),
      Q("Sorting first makes duplicates?", ["Adjacent (easy to skip)", "Spread out", "Unordered"], 0, "Group them."),
      Q("You track?", ["Used elements", "Only the sum", "The depth"], 0, "Per-position choice."),
      Q("Time complexity?", ["O(n! * n) worst case", "O(2^n)", "O(n^2)"], 0, "Fewer with duplicates."),
      Q("The result contains?", ["Only distinct orderings", "All n! orderings", "One ordering"], 0, "De-duplicated."),
      Q("Backtracking restores?", ["The used flag after recursing", "Nothing", "The sort order"], 0, "Undo the choice.")
    ]
  },
  "problem_0270": {
    description: "Generate all well-formed combinations of n pairs of parentheses.",
    example: { input: "n = 3", output: '["((()))","(()())","(())()","()(())","()()()"]', why: "all valid arrangements" },
    quizzes: [
      Q("You may add '(' when?", ["Open count < n", "Always", "Close count < n"], 0, "Within the budget."),
      Q("You may add ')' when?", ["Close count < open count", "Always", "Open count < n"], 0, "Keep it valid."),
      Q("A string is complete when?", ["It has n of each (length 2n)", "It has one pair", "It is empty"], 0, "All pairs placed."),
      Q("The constraint keeps the string?", ["Always valid (never more ')' than '(')", "Sorted", "Shortest"], 0, "Balanced prefix."),
      Q("The count of results is the?", ["Catalan number", "Factorial", "Power of two"], 0, "nth Catalan."),
      Q("Backtracking removes?", ["The last added character", "The whole string", "Nothing"], 0, "Try the alternative."),
      Q("Time complexity is?", ["O(Catalan(n) * n)", "O(n^2)", "O(2^n) exactly"], 0, "Output-sensitive.")
    ]
  },
  "problem_0271": {
    description: "Partition a string so that every substring of the partition is a palindrome, and return all such partitions.",
    example: { input: '"aab"', output: '[["a","a","b"],["aa","b"]]', why: "each piece is a palindrome" },
    quizzes: [
      Q("At each step you try?", ["Every prefix that is a palindrome", "Only single characters", "The whole string"], 0, "Cut after a palindrome."),
      Q("After a valid prefix you?", ["Recurse on the remaining suffix", "Stop", "Sort"], 0, "Partition the rest."),
      Q("A palindrome check can be sped up with?", ["A precomputed DP table", "Sorting", "A heap"], 0, "O(1) lookups."),
      Q("You record a partition when?", ["The whole string is consumed", "At depth 1", "The start"], 0, "Nothing left."),
      Q("Backtracking removes?", ["The last chosen substring", "The whole path", "Nothing"], 0, "Try another cut."),
      Q("Time complexity is?", ["Exponential (many partitions)", "O(n)", "O(n log n)"], 0, "Output-sensitive."),
      Q("Each single character is?", ["A palindrome", "Never valid", "Skipped"], 0, "Base pieces.")
    ]
  },
  "problem_0272": {
    description: "Given a digit string, return all valid IP address formations by inserting three dots.",
    example: { input: '"25525511135"', output: '["255.255.11.135","255.255.111.35"]', why: "valid 4-part addresses" },
    quizzes: [
      Q("An IP has?", ["Four parts (octets)", "Three parts", "Any number of parts"], 0, "Separated by dots."),
      Q("Each octet must be?", ["Between 0 and 255", "Positive only", "Even"], 0, "Valid range."),
      Q("Leading zeros are?", ["Invalid (except '0' itself)", "Always valid", "Required"], 0, "No '01'."),
      Q("Each part has length?", ["1 to 3 digits", "Exactly 3", "Any length"], 0, "Bounded segment."),
      Q("You backtrack after trying?", ["Each segment length", "The whole string", "Nothing"], 0, "Undo the cut."),
      Q("A valid result consumes?", ["All digits in exactly 4 parts", "A prefix", "Any split"], 0, "No leftovers."),
      Q("Time complexity is?", ["Constant-bounded (few placements)", "O(2^n)", "O(n!)"], 0, "Limited combinations.")
    ]
  },
  "problem_0273": {
    description: "Place n queens on an n x n board so that no two queens attack each other, and return all distinct solutions.",
    example: { input: "n = 4", output: "2 distinct board arrangements", why: "no shared row, column, or diagonal" },
    quizzes: [
      Q("You place one queen per?", ["Row (or column)", "Cell", "Diagonal"], 0, "One per row."),
      Q("Conflicts are checked on?", ["Columns and both diagonals", "Rows only", "Cells only"], 0, "Attack lines."),
      Q("Diagonals can be tracked by?", ["row+col and row-col keys", "Sorting", "A heap"], 0, "Constant-time checks."),
      Q("Backtracking removes?", ["A queen when a branch fails", "The whole board", "Nothing"], 0, "Try the next column."),
      Q("A solution is found when?", ["All n queens are placed", "One queen is placed", "The board is sorted"], 0, "Complete placement."),
      Q("Time complexity is?", ["Exponential (pruned heavily)", "O(n^2)", "O(n)"], 0, "Backtracking search."),
      Q("Sets for columns/diagonals give?", ["O(1) conflict checks", "Sorting", "A heap"], 0, "Fast pruning.")
    ]
  },
  "problem_0274": {
    description: "Count the number of distinct ways to place n non-attacking queens on an n x n board.",
    example: { input: "n = 4", output: "2", why: "two valid arrangements" },
    quizzes: [
      Q("This differs from N-Queens by?", ["Counting solutions, not listing them", "Allowing attacks", "Using a heap"], 0, "Just the count."),
      Q("You still place one queen per?", ["Row", "Cell", "Diagonal"], 0, "Row by row."),
      Q("Conflicts are tracked on?", ["Columns and both diagonals", "Rows only", "Cells"], 0, "Attack lines."),
      Q("Bitmasks can represent?", ["Occupied columns and diagonals", "The count", "The depth"], 0, "Fast state."),
      Q("Backtracking increments the count when?", ["A full valid placement is reached", "Every node", "At depth 1"], 0, "Complete board."),
      Q("Time complexity is?", ["Exponential (pruned)", "O(n^2)", "O(n)"], 0, "Search tree."),
      Q("No board needs to be stored because?", ["Only the count matters", "It's sorted", "A heap holds it"], 0, "Lighter than listing.")
    ]
  },
  "problem_0275": {
    description: "Determine whether a graph's vertices can be colored with at most m colors so that no two adjacent vertices share a color.",
    example: { input: "a graph and m colors", output: "true if a valid m-coloring exists", why: "backtracking over color assignments" },
    quizzes: [
      Q("You assign colors to vertices one by one, checking?", ["That no neighbor has the same color", "The degree only", "Sorting"], 0, "Validity constraint."),
      Q("If no color fits a vertex, you?", ["Backtrack", "Add a color", "Stop with true"], 0, "Undo and retry."),
      Q("The number of colors is?", ["At most m", "Exactly m", "Unlimited"], 0, "Bounded palette."),
      Q("Time complexity (worst case)?", ["O(m^V)", "O(V^2)", "O(V)"], 0, "Exponential search."),
      Q("A solution exists when?", ["All vertices are validly colored", "One vertex is colored", "The graph is sorted"], 0, "Complete assignment."),
      Q("The chromatic number is the?", ["Minimum m that works", "Maximum m", "The vertex count"], 0, "Smallest valid palette."),
      Q("Ordering vertices by degree can?", ["Prune the search faster", "Change the answer", "Sort the output"], 0, "Heuristic speedup.")
    ]
  },
  "problem_0276": {
    description: "Find a sequence of knight moves that visits every square of a board exactly once (a knight's tour).",
    example: { input: "an n x n board", output: "a valid tour order, or none", why: "backtracking over knight moves" },
    quizzes: [
      Q("A knight moves in?", ["An L-shape (8 possible moves)", "Straight lines", "Diagonals only"], 0, "Chess knight."),
      Q("The tour visits each square?", ["Exactly once", "Multiple times", "Some squares twice"], 0, "Hamiltonian path."),
      Q("Backtracking undoes a move when?", ["No further valid move exists", "Every step", "At the start"], 0, "Dead end."),
      Q("Warnsdorff's heuristic picks the move with?", ["The fewest onward options", "The most options", "The highest value"], 0, "Reduces backtracking."),
      Q("Time complexity (naive) is?", ["Exponential", "O(n^2)", "O(n)"], 0, "Huge search space."),
      Q("A solution is found when?", ["All squares are visited", "One move is made", "The board is sorted"], 0, "Complete tour."),
      Q("You track?", ["Visited squares", "Only the count", "The depth only"], 0, "Avoid revisits.")
    ]
  },
  "problem_0277": {
    description: "Determine whether an array can be partitioned into k subsets with equal sums (via backtracking).",
    example: { input: "[4,3,2,3,5,2,1], k = 4", output: "true", why: "four subsets each summing to 5" },
    quizzes: [
      Q("The target subset sum is?", ["total / k", "total * k", "k"], 0, "Equal shares."),
      Q("A first check is that total is?", ["Divisible by k", "Even", "Prime"], 0, "Else impossible."),
      Q("You fill subsets by?", ["Backtracking, placing numbers into buckets", "Sorting only", "A heap"], 0, "Try placements."),
      Q("Sorting descending helps by?", ["Pruning earlier (place big items first)", "Guaranteeing O(n)", "Removing duplicates"], 0, "Fail fast."),
      Q("Infeasible immediately when?", ["Any element exceeds the target sum", "k = 1", "The array is sorted"], 0, "Can't fit."),
      Q("A bitmask can track?", ["Which elements are used", "The count", "The depth"], 0, "DP/backtracking state."),
      Q("The problem is in general?", ["NP-hard", "O(n)", "Always true"], 0, "Partition is hard.")
    ]
  },
  "problem_added_1779943483521": {
    description: "Determine whether matchsticks of given lengths can be arranged to form a square, using every matchstick exactly once.",
    example: { input: "[1,1,2,2,2]", output: "true", why: "four sides of length 2" },
    quizzes: [
      Q("This is a special case of?", ["Partition into k=4 equal-sum subsets", "Sorting", "A heap"], 0, "Four equal sides."),
      Q("The target side length is?", ["total / 4", "total", "the max stick"], 0, "Equal sides."),
      Q("A first check: total must be?", ["Divisible by 4", "Even", "Prime"], 0, "Else no square."),
      Q("If any stick exceeds the side length, the answer is?", ["false", "true", "depends"], 0, "Can't fit."),
      Q("Sorting descending helps by?", ["Pruning the search early", "Guaranteeing O(n)", "Removing duplicates"], 0, "Place big sticks first."),
      Q("You backtrack when?", ["A stick can't complete any side", "Every step", "At the start"], 0, "Dead end."),
      Q("Time complexity is?", ["Exponential (pruned)", "O(n)", "O(n log n)"], 0, "Backtracking.")
    ]
  },
  "problem_0278": {
    description: "Find a path for a rat from the top-left to the bottom-right of a maze grid, moving through open cells, and return the possible paths.",
    example: { input: "a maze of open (1) and blocked (0) cells", output: "valid path(s), e.g. as move strings", why: "backtracking through open cells" },
    quizzes: [
      Q("You move only onto cells that are?", ["Open (not blocked) and unvisited", "Any cell", "Blocked cells"], 0, "Valid steps."),
      Q("You mark a cell visited to?", ["Avoid cycles / revisiting", "Sort", "Count"], 0, "Prevent loops."),
      Q("Backtracking un-marks a cell when?", ["The path from it fails", "Every step", "At the start"], 0, "Explore alternatives."),
      Q("Movement is typically?", ["Up/down/left/right", "Diagonal only", "One direction"], 0, "4 directions."),
      Q("A path is recorded when?", ["You reach the destination", "At depth 1", "The maze is sorted"], 0, "Goal reached."),
      Q("Time complexity (worst case) is?", ["Exponential", "O(rc)", "O(1)"], 0, "Many paths."),
      Q("The start or end being blocked means?", ["No path", "Trivial path", "An error"], 0, "Infeasible.")
    ]
  },
  "problem_0279": {
    description: "Solve a Sudoku puzzle by filling the empty cells so each row, column, and 3x3 box contains digits 1-9 exactly once.",
    example: { input: "a partially filled 9x9 board", output: "the solved board", why: "constraint-based backtracking" },
    quizzes: [
      Q("For each empty cell you try?", ["Digits 1-9 that don't violate constraints", "Only 1", "Random digits"], 0, "Valid placements."),
      Q("Constraints are checked on?", ["The row, column, and 3x3 box", "The row only", "Diagonals"], 0, "Three regions."),
      Q("Backtracking resets a cell when?", ["No digit leads to a solution", "Every step", "At the start"], 0, "Dead end."),
      Q("Tracking used digits per region gives?", ["O(1) validity checks", "Sorting", "A heap"], 0, "Fast pruning."),
      Q("Choosing the most-constrained cell first?", ["Speeds up the search", "Changes the answer", "Sorts the board"], 0, "MRV heuristic."),
      Q("The board is solved when?", ["No empty cells remain", "One cell is filled", "The board is sorted"], 0, "Complete."),
      Q("Time complexity is?", ["Exponential (heavily pruned)", "O(1)", "O(81)"], 0, "Constraint search.")
    ]
  },
  "problem_0280": {
    description: "Given a board of letters and a list of words, find all words that can be formed by sequentially adjacent cells (a trie-accelerated word search).",
    example: { input: "a letter board and a word list", output: "the words found on the board", why: "DFS guided by a trie of the words" },
    quizzes: [
      Q("A trie of the words lets you?", ["Prune DFS paths that match no word prefix", "Sort", "Use a heap"], 0, "Early termination."),
      Q("You walk the board with?", ["DFS, following adjacent cells", "BFS layers", "Binary search"], 0, "Path search."),
      Q("Cells in the current path must be?", ["Marked visited (no reuse)", "Reused freely", "Sorted"], 0, "One use per word."),
      Q("When a trie node marks a word end you?", ["Record that word", "Stop all search", "Sort"], 0, "Found a match."),
      Q("Pruning dead trie branches avoids?", ["Exploring impossible prefixes", "Sorting", "Cycles only"], 0, "Big speedup."),
      Q("Removing found words from the trie?", ["Prevents duplicate reports and prunes further", "Breaks the search", "Is required"], 0, "Optimization."),
      Q("Time complexity depends on?", ["Board size and word lengths", "Only the alphabet", "n^2 always"], 0, "Search + trie.")
    ]
  },
  "problem_0281": {
    description: "Find the number of distinct paths in a grid that walk from the start to the end, visiting every non-obstacle cell exactly once.",
    example: { input: "a grid with a start, end, and obstacles", output: "the count of qualifying paths", why: "backtracking that must cover all empty cells" },
    quizzes: [
      Q("A valid path must visit?", ["Every non-obstacle cell exactly once", "Any cells", "Only the shortest route"], 0, "Full coverage."),
      Q("You count how many empty cells must be?", ["Covered (to validate at the end)", "Skipped", "Sorted"], 0, "Completeness check."),
      Q("Backtracking un-marks a cell when?", ["The path from it fails", "Every step", "At the start"], 0, "Explore alternatives."),
      Q("A path is valid when it ends at the target and?", ["All empty cells were visited", "Any cell", "It is shortest"], 0, "Hamiltonian-like."),
      Q("Movement is?", ["Up/down/left/right", "Diagonal only", "One direction"], 0, "4 directions."),
      Q("Time complexity is?", ["Exponential", "O(rc)", "O(1)"], 0, "Path enumeration."),
      Q("Obstacles are?", ["Never entered", "Visited once", "The start"], 0, "Blocked cells.")
    ]
  },
  "problem_0282": {
    description: "Starting from any cell, collect the maximum gold by moving to adjacent cells with gold, without revisiting a cell in the same path.",
    example: { input: "a grid of gold amounts (0 = empty)", output: "the maximum gold collected", why: "DFS from each gold cell with backtracking" },
    quizzes: [
      Q("You can start from?", ["Any cell with gold", "The top-left only", "The center"], 0, "Try all starts."),
      Q("You never step on?", ["A 0 (empty) cell, or a visited cell", "Any cell", "Gold cells"], 0, "Path constraints."),
      Q("Backtracking restores a cell after?", ["Exploring it (so other paths can use it)", "Never", "Sorting"], 0, "Un-mark on return."),
      Q("You take the maximum over?", ["All starting cells and directions", "One start", "The first path"], 0, "Best path."),
      Q("Movement is?", ["Up/down/left/right", "Diagonal only", "One direction"], 0, "4 directions."),
      Q("Time complexity is?", ["Exponential in the worst case", "O(rc)", "O(1)"], 0, "Path search."),
      Q("The grid is usually sparse, which?", ["Limits the real search space", "Makes it O(1)", "Requires sorting"], 0, "Few gold cells.")
    ]
  },
  "problem_0283": {
    description: "Given a string of digits, return all letter combinations the number could represent on a phone keypad.",
    example: { input: '"23"', output: '["ad","ae","af","bd","be","bf","cd","ce","cf"]', why: "cartesian product of each digit's letters" },
    quizzes: [
      Q("Each digit maps to?", ["A set of letters (as on a phone keypad)", "One letter", "A number"], 0, "2->abc, etc."),
      Q("The result is the?", ["Cartesian product of the digits' letters", "Union", "Intersection"], 0, "All combinations."),
      Q("You build combinations with?", ["Backtracking (one digit per level)", "Sorting", "A heap"], 0, "DFS over digits."),
      Q("The number of results is?", ["The product of letters-per-digit", "The sum", "n!"], 0, "3*3 = 9 for '23'."),
      Q("A complete combination has length?", ["Equal to the number of digits", "Always 3", "1"], 0, "One letter per digit."),
      Q("Backtracking removes?", ["The last letter added", "The whole string", "Nothing"], 0, "Try the next letter."),
      Q("Digits 7 and 9 map to?", ["Four letters each", "Three letters", "One letter"], 0, "pqrs / wxyz.")
    ]
  },
  "problem_0284": {
    description: "Insert +, -, or * (or nothing) between the digits of a string so the expression evaluates to a target, and return all such expressions.",
    example: { input: 'num = "123", target = 6', output: '["1+2+3","1*2*3"]', why: "both evaluate to 6" },
    quizzes: [
      Q("Between digits you may place?", ["+, -, *, or nothing (concatenate)", "Only +", "Any character"], 0, "Operator choices."),
      Q("Multiplication requires tracking?", ["The last operand (to handle precedence)", "Only the running total", "The depth"], 0, "Undo and re-apply."),
      Q("Leading zeros in a multi-digit operand are?", ["Disallowed", "Allowed", "Required"], 0, "No '05'."),
      Q("You record an expression when?", ["All digits are used and it equals the target", "At depth 1", "Any node"], 0, "Full consume + match."),
      Q("For '*', you subtract the last operand and?", ["Add last * current", "Add current", "Sort"], 0, "Fix precedence."),
      Q("Backtracking undoes?", ["The last operator/operand choice", "The whole string", "Nothing"], 0, "Try alternatives."),
      Q("Time complexity is?", ["Exponential (4 choices per gap)", "O(n)", "O(n log n)"], 0, "Many expressions.")
    ]
  },
  "problem_0285": {
    description: "Generate all structurally distinct full binary trees with a given number of nodes (every node has 0 or 2 children).",
    example: { input: "n = 7", output: "all full binary trees with 7 nodes", why: "recursive construction with memoization" },
    quizzes: [
      Q("A full binary tree has nodes with?", ["0 or 2 children", "0 or 1 child", "Any number"], 0, "By definition."),
      Q("Full binary trees exist only when n is?", ["Odd", "Even", "Prime"], 0, "Internal nodes add pairs."),
      Q("You build trees by splitting the remaining nodes between?", ["The left and right subtrees (both odd)", "Only the left", "Equal halves"], 0, "Recursive composition."),
      Q("Memoization caches results by?", ["Node count n", "Depth", "Value"], 0, "Reuse subtree sets."),
      Q("The number of such trees follows the?", ["Catalan numbers", "Fibonacci numbers", "Powers of two"], 0, "Counting result."),
      Q("For each left/right size pair you?", ["Combine every left tree with every right tree", "Pick one", "Sort"], 0, "Cartesian product."),
      Q("The root always has?", ["Two subtrees (for n > 1)", "One subtree", "No subtree"], 0, "Full tree rule.")
    ]
  },
  "problem_0286": {
    description: "Given a string and a dictionary, return all ways to break it into a space-separated sentence of dictionary words.",
    example: { input: 's="catsanddog", dict=["cat","cats","and","sand","dog"]', output: '["cats and dog","cat sand dog"]', why: "all valid segmentations" },
    quizzes: [
      Q("The technique is?", ["Backtracking (or DFS) with memoization", "Sorting", "A heap"], 0, "Enumerate segmentations."),
      Q("Memoization caches?", ["Sentences for each suffix (start index)", "The word count", "The depth"], 0, "Reuse subproblems."),
      Q("At each position you try?", ["Every dictionary-word prefix of the remaining string", "One character", "The whole string"], 0, "Valid cuts."),
      Q("A first-check feasibility (Word Break I) can?", ["Prune impossible inputs early", "Sort", "Replace the DFS"], 0, "Avoid wasted work."),
      Q("You record a sentence when?", ["The whole string is consumed", "At depth 1", "The start"], 0, "Nothing left."),
      Q("Time complexity is?", ["Exponential in the worst case (output-sensitive)", "O(n)", "O(n log n)"], 0, "Many sentences."),
      Q("A trie or hash set stores?", ["The dictionary for fast lookups", "The output", "The depths"], 0, "Membership checks.")
    ]
  },

  // ================= Greedy =================
  "problem_0287": {
    description: "Merge all overlapping intervals and return the non-overlapping result.",
    example: { input: "[[1,3],[2,6],[8,10],[15,18]]", output: "[[1,6],[8,10],[15,18]]", why: "[1,3] and [2,6] overlap" },
    quizzes: [
      Q("The first step is to?", ["Sort intervals by start time", "Sort by end time", "Use a heap"], 0, "Enable a single pass."),
      Q("Two intervals overlap when?", ["The next start <= the current end", "The starts are equal", "They share no point"], 0, "Overlap condition."),
      Q("Merging extends the end to?", ["max(current end, next end)", "the next end", "the next start"], 0, "Cover both."),
      Q("Time complexity?", ["O(n log n)", "O(n)", "O(n^2)"], 0, "Dominated by sorting."),
      Q("After sorting, the pass is?", ["O(n)", "O(n^2)", "O(n log n)"], 0, "One sweep."),
      Q("Non-overlapping intervals are?", ["Appended as new results", "Merged anyway", "Dropped"], 0, "Separate output."),
      Q("Space complexity?", ["O(n) for output", "O(1)", "O(n^2)"], 0, "The result list.")
    ]
  },
  "problem_0288": {
    description: "Insert a new interval into a sorted list of non-overlapping intervals, merging as needed.",
    example: { input: "[[1,3],[6,9]], newInterval = [2,5]", output: "[[1,5],[6,9]]", why: "[2,5] merges with [1,3]" },
    quizzes: [
      Q("The list is already?", ["Sorted and non-overlapping", "Unsorted", "Overlapping"], 0, "Given precondition."),
      Q("You add intervals ending before the new one?", ["Unchanged", "Merged", "Dropped"], 0, "They come before."),
      Q("Overlapping intervals are?", ["Merged into the new interval", "Kept separate", "Deleted"], 0, "Expand the new one."),
      Q("Time complexity?", ["O(n)", "O(n log n)", "O(n^2)"], 0, "No re-sort needed."),
      Q("Intervals starting after the new one's end are?", ["Added unchanged", "Merged", "Dropped"], 0, "They come after."),
      Q("Merging updates the new interval's bounds to?", ["min start, max end", "the new bounds only", "the first interval"], 0, "Cover the overlap."),
      Q("Space complexity?", ["O(n) for output", "O(1)", "O(n^2)"], 0, "The result list.")
    ]
  },
  "problem_0289": {
    description: "Find the minimum number of intervals to remove so that the rest are non-overlapping.",
    example: { input: "[[1,2],[2,3],[3,4],[1,3]]", output: "1", why: "removing [1,3] leaves them non-overlapping" },
    quizzes: [
      Q("The greedy strategy sorts by?", ["End time", "Start time", "Length"], 0, "Keep earliest-ending."),
      Q("You keep the interval that?", ["Ends earliest (leaves room for more)", "Starts earliest", "Is longest"], 0, "Maximize remaining."),
      Q("An overlapping interval is?", ["Removed (counted)", "Kept", "Merged"], 0, "Resolve the conflict."),
      Q("This equals n minus?", ["The maximum non-overlapping set", "The overlaps", "The starts"], 0, "Activity selection."),
      Q("Time complexity?", ["O(n log n)", "O(n)", "O(n^2)"], 0, "Sorting dominates."),
      Q("Sorting by end time is key because?", ["It greedily frees the most room", "It's faster", "It sorts output"], 0, "Optimal substructure."),
      Q("Space complexity?", ["O(1) beyond sorting", "O(n^2)", "O(n log n)"], 0, "A counter.")
    ]
  },
  "problem_0290": {
    description: "Find the minimum number of meeting rooms required so that no two overlapping meetings share a room.",
    example: { input: "[[0,30],[5,10],[15,20]]", output: "2", why: "[0,30] overlaps the others" },
    quizzes: [
      Q("A min-heap tracks?", ["The earliest ending meeting's end time", "The start times", "The durations"], 0, "Free up rooms."),
      Q("You need a new room when?", ["The next start is before the earliest end", "Meetings are sorted", "Always"], 0, "Overlap requires a room."),
      Q("The answer is the?", ["Maximum concurrent meetings", "Total meetings", "The longest meeting"], 0, "Peak overlap."),
      Q("Meetings are first sorted by?", ["Start time", "End time", "Duration"], 0, "Process chronologically."),
      Q("Time complexity?", ["O(n log n)", "O(n)", "O(n^2)"], 0, "Sort + heap."),
      Q("A sweep-line alternative counts?", ["Starts (+1) and ends (-1) over time", "Only starts", "Durations"], 0, "Track concurrency."),
      Q("When a meeting's room frees, you?", ["Reuse it (pop the heap)", "Add a room", "Sort"], 0, "Reclaim it.")
    ]
  },
  "problem_0291": {
    description: "Find the minimum number of arrows to burst all balloons, where one arrow bursts every balloon whose interval it passes through.",
    example: { input: "[[10,16],[2,8],[1,6],[7,12]]", output: "2", why: "two shots cover all four intervals" },
    quizzes: [
      Q("The greedy approach sorts by?", ["End coordinate", "Start coordinate", "Width"], 0, "Shoot at the earliest end."),
      Q("An arrow is placed at?", ["The current group's smallest end", "The largest start", "The middle"], 0, "Burst overlapping balloons."),
      Q("You need a new arrow when?", ["A balloon starts after the last arrow's position", "Always", "Never"], 0, "No overlap with the shot."),
      Q("Time complexity?", ["O(n log n)", "O(n)", "O(n^2)"], 0, "Sorting dominates."),
      Q("This resembles?", ["Non-overlapping intervals", "Sorting only", "A heap problem"], 0, "Interval greedy."),
      Q("Overlapping balloons share?", ["At least one arrow", "No arrow", "Two arrows"], 0, "One shot suffices."),
      Q("Space complexity?", ["O(1) beyond sorting", "O(n^2)", "O(n log n)"], 0, "A counter.")
    ]
  },
  "problem_0292": {
    description: "Select the maximum number of non-overlapping activities given their start and finish times.",
    example: { input: "activities with start/finish times", output: "the maximum count selectable", why: "greedily pick earliest-finishing activities" },
    quizzes: [
      Q("The greedy rule sorts by?", ["Finish time", "Start time", "Duration"], 0, "Earliest finish first."),
      Q("You pick an activity if?", ["Its start is >= the last chosen finish", "It's the longest", "It starts earliest"], 0, "No overlap."),
      Q("Choosing the earliest-finishing activity?", ["Leaves the most room for others", "Is a heuristic only", "Is wrong"], 0, "Provably optimal."),
      Q("Time complexity?", ["O(n log n)", "O(n)", "O(n^2)"], 0, "Sorting dominates."),
      Q("This is the classic?", ["Activity selection problem", "Knapsack", "Edit distance"], 0, "Greedy archetype."),
      Q("Selecting by earliest start can?", ["Be suboptimal (a long activity blocks many)", "Always be optimal", "Sort output"], 0, "Finish time wins."),
      Q("Space complexity?", ["O(1) beyond sorting", "O(n^2)", "O(n log n)"], 0, "A counter.")
    ]
  },
  "problem_0293": {
    description: "Given an array where each value is the maximum jump length from that position, determine whether you can reach the last index.",
    example: { input: "[2,3,1,1,4]", output: "true", why: "jumps can reach the end" },
    quizzes: [
      Q("The greedy approach tracks?", ["The farthest reachable index so far", "The number of jumps", "The minimum value"], 0, "Running reach."),
      Q("You fail when?", ["The current index exceeds the farthest reach", "The array is sorted", "A value is 0"], 0, "Stuck before it."),
      Q("At each index you update reach to?", ["max(reach, i + nums[i])", "nums[i]", "i"], 0, "Extend the frontier."),
      Q("Time complexity?", ["O(n)", "O(n log n)", "O(n^2)"], 0, "One pass."),
      Q("You can reach the end when?", ["The farthest reach covers the last index", "Every value is positive", "n is even"], 0, "Reach >= last."),
      Q("A zero value is a problem only if?", ["You can't jump over it", "It's at the start", "Always"], 0, "Reach must pass it."),
      Q("Space complexity?", ["O(1)", "O(n)", "O(log n)"], 0, "One variable.")
    ]
  },
  "problem_0294": {
    description: "Given jump-length values, find the minimum number of jumps needed to reach the last index (reaching it is guaranteed).",
    example: { input: "[2,3,1,1,4]", output: "2", why: "jump to index 1, then to the end" },
    quizzes: [
      Q("The greedy (BFS-like) approach tracks?", ["The current jump's end and the farthest reachable", "Only the count", "The minimum value"], 0, "Level expansion."),
      Q("A jump is counted when?", ["You reach the end of the current range", "Every index", "A value is 0"], 0, "Advance a level."),
      Q("Within a range you compute?", ["The farthest reachable next", "The sum", "The min"], 0, "Next jump's reach."),
      Q("Time complexity?", ["O(n)", "O(n log n)", "O(n^2)"], 0, "One pass."),
      Q("This is like BFS because?", ["Each jump is a level of reach", "It uses a queue", "It sorts"], 0, "Breadth expansion."),
      Q("The answer is?", ["The minimum number of jumps", "The maximum reach", "The sum"], 0, "Fewest hops."),
      Q("Space complexity?", ["O(1)", "O(n)", "O(log n)"], 0, "A few variables.")
    ]
  },
  "problem_0295": {
    description: "Given taps along a garden, each covering a range, find the minimum number of taps to open to water the whole garden, or -1 if impossible.",
    example: { input: "n, ranges per tap", output: "the minimum taps, or -1", why: "reduces to a jump-game-style greedy" },
    quizzes: [
      Q("Each tap can be modeled as?", ["An interval it covers", "A single point", "A weight"], 0, "Range to cover."),
      Q("This reduces to?", ["Minimum jumps / interval covering", "Sorting only", "A heap problem"], 0, "Jump Game II style."),
      Q("You greedily extend to?", ["The farthest right reachable in the current range", "The nearest tap", "The largest tap"], 0, "Maximize coverage."),
      Q("If a gap can't be covered, return?", ["-1", "0", "n"], 0, "Impossible."),
      Q("Time complexity?", ["O(n)", "O(n log n)", "O(n^2)"], 0, "Build reach array + pass."),
      Q("The answer is the?", ["Minimum number of taps", "Maximum coverage", "The sum of ranges"], 0, "Fewest taps."),
      Q("For each position you record?", ["The farthest right its tap reaches", "The tap count", "The depth"], 0, "Best reach per start.")
    ]
  },
  "problem_0296": {
    description: "Given pickup/drop-off trips with passenger counts, determine whether a vehicle of a given capacity can complete all trips without exceeding capacity.",
    example: { input: "trips, capacity", output: "true if capacity is never exceeded", why: "sweep-line over passenger changes" },
    quizzes: [
      Q("A sweep-line records?", ["Passengers added at pickups and removed at drop-offs", "Only pickups", "Durations"], 0, "Net change over distance."),
      Q("You check that the running total never?", ["Exceeds the capacity", "Reaches 0", "Is odd"], 0, "Capacity constraint."),
      Q("Events are processed in order of?", ["Location (distance)", "Passenger count", "Trip index"], 0, "Chronological sweep."),
      Q("A difference array can?", ["Mark +p at start and -p at end", "Sort", "Use a heap"], 0, "Efficient accumulation."),
      Q("Time complexity?", ["O(n log n) or O(n + range)", "O(n^2)", "O(2^n)"], 0, "Sort or bucket."),
      Q("If capacity is exceeded anywhere, return?", ["false", "true", "the overflow"], 0, "Infeasible."),
      Q("Drop-offs happen?", ["Before pickups at the same location", "After", "Never"], 0, "Free seats first.")
    ]
  },
  "problem_0297": {
    description: "Arrange a list of non-negative integers so that concatenating them forms the largest possible number.",
    example: { input: "[3,30,34,5,9]", output: '"9534330"', why: "a custom comparator orders the digits" },
    quizzes: [
      Q("The custom comparator compares?", ["a+b versus b+a (as strings)", "a versus b numerically", "lengths"], 0, "Which concatenation is larger."),
      Q("You sort numbers as?", ["Strings using that comparator", "Integers ascending", "By length"], 0, "Order for concatenation."),
      Q("Time complexity?", ["O(n log n * k)", "O(n)", "O(n^2)"], 0, "Sort with string compares."),
      Q("A key edge case is when the result?", ["Starts with 0 (all zeros -> '0')", "Is too long", "Is negative"], 0, "Trim leading zeros."),
      Q("The greedy choice is proven by?", ["The comparator being a valid total order", "Sorting twice", "A heap"], 0, "Exchange argument."),
      Q("Numerically sorting descending?", ["Fails (e.g. 3 vs 30)", "Works", "Is faster and correct"], 0, "Need the string rule."),
      Q("Space complexity?", ["O(n) for strings", "O(1)", "O(n^2)"], 0, "String copies.")
    ]
  },
  "problem_0298": {
    description: "Maximize the value carried in a knapsack where items can be taken fractionally (fractional knapsack).",
    example: { input: "items with value/weight, capacity", output: "the maximum achievable value", why: "greedily take the highest value-per-weight" },
    quizzes: [
      Q("The greedy rule sorts items by?", ["Value-to-weight ratio (descending)", "Value only", "Weight only"], 0, "Best density first."),
      Q("You may take?", ["Fractions of items", "Whole items only", "At most one item"], 0, "Fractional allowed."),
      Q("When an item doesn't fully fit you?", ["Take the fitting fraction", "Skip it", "Take all of it"], 0, "Fill the remainder."),
      Q("Greedy is optimal here because?", ["Fractions allow filling capacity exactly", "It's fast", "It sorts"], 0, "Unlike 0/1 knapsack."),
      Q("Time complexity?", ["O(n log n)", "O(n)", "O(n^2)"], 0, "Sorting dominates."),
      Q("For 0/1 knapsack, greedy by ratio is?", ["Not always optimal", "Always optimal", "Faster and correct"], 0, "DP needed there."),
      Q("Space complexity?", ["O(1) beyond sorting", "O(n^2)", "O(n log n)"], 0, "Running total.")
    ]
  },
  "problem_0299": {
    description: "Partition a string into as many parts as possible so that each letter appears in at most one part, and return the part sizes.",
    example: { input: '"ababcbacadefegdehijhklij"', output: "[9,7,8]", why: "each letter stays within one part" },
    quizzes: [
      Q("First you record each letter's?", ["Last occurrence index", "First occurrence", "Count"], 0, "Boundary of its part."),
      Q("You extend the current part to?", ["The farthest last-occurrence of any letter seen", "The next letter", "The end"], 0, "Cover all copies."),
      Q("A part closes when?", ["The current index reaches the running boundary", "Every letter", "At the start"], 0, "No letter leaks out."),
      Q("Time complexity?", ["O(n)", "O(n log n)", "O(n^2)"], 0, "Two passes."),
      Q("The goal is?", ["As many parts as possible", "The fewest parts", "Equal parts"], 0, "Maximize splits."),
      Q("Each letter appears in?", ["Exactly one part", "Multiple parts", "No part"], 0, "The constraint."),
      Q("Space complexity?", ["O(1) (26 letters)", "O(n)", "O(n^2)"], 0, "Fixed alphabet map.")
    ]
  },
  "problem_0301": {
    description: "Distribute candies to children in a line so that each child gets at least one and a child with a higher rating than a neighbor gets more candies, minimizing the total.",
    example: { input: "[1,0,2]", output: "5", why: "candies [2,1,2]" },
    quizzes: [
      Q("A two-pass greedy sweeps?", ["Left to right, then right to left", "Only left to right", "By sorting"], 0, "Both neighbor directions."),
      Q("The left pass ensures?", ["Higher rating than the left neighbor gets more", "Equal candies", "Minimum total only"], 0, "Left constraint."),
      Q("The right pass takes the?", ["Max of the current and (right neighbor + 1)", "Minimum", "Sum"], 0, "Right constraint."),
      Q("Each child gets at least?", ["1 candy", "0 candies", "2 candies"], 0, "Base requirement."),
      Q("Time complexity?", ["O(n)", "O(n log n)", "O(n^2)"], 0, "Two passes."),
      Q("The total is?", ["Minimized", "Maximized", "Fixed"], 0, "Least candies."),
      Q("Space complexity?", ["O(n)", "O(1)", "O(log n)"], 0, "The candy array.")
    ]
  },
  "problem_0302": {
    description: "Given tasks and a cooldown n between identical tasks, find the minimum number of time units to finish all tasks.",
    example: { input: 'tasks = ["A","A","A","B","B","B"], n = 2', output: "8", why: "A B idle A B idle A B" },
    quizzes: [
      Q("The schedule is dominated by the?", ["Most frequent task", "Least frequent task", "Alphabetical order"], 0, "It sets the frame."),
      Q("The frame length formula uses?", ["(maxFreq - 1) * (n + 1) + (count of tasks at maxFreq)", "n * tasks", "maxFreq only"], 0, "Slots + tail."),
      Q("The answer is the max of that formula and?", ["The total number of tasks", "0", "n"], 0, "No idle if dense."),
      Q("Idle slots appear when?", ["There aren't enough other tasks to fill the gaps", "Always", "Never"], 0, "Cooldown gaps."),
      Q("Time complexity?", ["O(total tasks)", "O(n^2)", "O(2^n)"], 0, "Count frequencies."),
      Q("A max-heap alternative always schedules?", ["The most frequent available task", "The least frequent", "Randomly"], 0, "Greedy choice."),
      Q("Space complexity?", ["O(1) (26 task types)", "O(n^2)", "O(n log n)"], 0, "Fixed frequency map.")
    ]
  },
  "problem_0303": {
    description: "Given train arrival and departure times, find the minimum number of platforms needed so that no train waits.",
    example: { input: "arrivals and departures", output: "the minimum platforms required", why: "maximum simultaneous trains at a station" },
    quizzes: [
      Q("Sort arrivals and departures, then use?", ["Two pointers (or a sweep line)", "A single pass of pairs", "A heap of durations"], 0, "Track concurrency."),
      Q("A platform is needed when?", ["A train arrives before the earliest departs", "Trains are sorted", "Always"], 0, "Overlap."),
      Q("The answer is the?", ["Maximum simultaneous trains", "Total trains", "The longest stay"], 0, "Peak overlap."),
      Q("When a train departs you?", ["Free a platform", "Add one", "Sort"], 0, "Reuse it."),
      Q("Time complexity?", ["O(n log n)", "O(n)", "O(n^2)"], 0, "Sorting dominates."),
      Q("This is equivalent to?", ["Meeting Rooms II", "Knapsack", "Edit distance"], 0, "Interval concurrency."),
      Q("Space complexity?", ["O(1) beyond sorting", "O(n^2)", "O(n log n)"], 0, "Counters.")
    ]
  },
  "problem_0304": {
    description: "Given box types with a count and units-per-box, load a truck of limited box capacity to maximize total units.",
    example: { input: "boxTypes, truckSize", output: "the maximum units loadable", why: "greedily take boxes with the most units first" },
    quizzes: [
      Q("The greedy rule sorts box types by?", ["Units per box (descending)", "Box count", "Alphabetically"], 0, "Densest boxes first."),
      Q("You load boxes until?", ["The truck capacity is reached", "All boxes are loaded", "A box doesn't fit"], 0, "Fill the truck."),
      Q("When a type is partially loadable you?", ["Take as many boxes as fit", "Skip it", "Take all"], 0, "Use remaining capacity."),
      Q("Greedy is optimal because?", ["Higher-unit boxes always help more per slot", "It's fast", "It sorts"], 0, "Exchange argument."),
      Q("Time complexity?", ["O(n log n)", "O(n)", "O(n^2)"], 0, "Sorting dominates."),
      Q("Capacity is measured in?", ["Number of boxes", "Units", "Weight"], 0, "Box slots."),
      Q("Space complexity?", ["O(1) beyond sorting", "O(n^2)", "O(n log n)"], 0, "A running total.")
    ]
  },
  "problem_0269": {
    description: "Rearrange the numbers into the next lexicographically greater permutation in place; if none exists, rearrange to the smallest (ascending) order.",
    example: { input: "[1,2,3]", output: "[1,3,2]", why: "the next greater arrangement" },
    quizzes: [
      Q("First you find the rightmost index i where?", ["nums[i] < nums[i+1]", "nums[i] > nums[i+1]", "nums[i] == nums[i+1]"], 0, "The pivot."),
      Q("Then you find the rightmost element greater than the pivot and?", ["Swap them", "Delete it", "Sort"], 0, "Smallest larger value."),
      Q("After the swap you?", ["Reverse the suffix after i", "Sort the whole array", "Stop"], 0, "Make it the smallest suffix."),
      Q("If no pivot exists, the array is?", ["The last permutation (reverse to ascending)", "Already next", "Invalid"], 0, "Wrap around."),
      Q("Time complexity?", ["O(n)", "O(n log n)", "O(n^2)"], 0, "A few scans."),
      Q("Space complexity?", ["O(1) (in place)", "O(n)", "O(log n)"], 0, "No extra array."),
      Q("The suffix after the pivot is initially?", ["Non-increasing", "Sorted ascending", "Random"], 0, "That's why you reverse it.")
    ]
  }
};

module.exports = { patternContent, questionContent };
