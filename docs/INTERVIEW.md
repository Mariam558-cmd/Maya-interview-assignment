
## 1. Where will each of the three requests run?

**My Prediction:**

The Employee Profile and Recent Posts Preview requests will run on the server side.
When exploring posts after clicking a button, the request will run on the client side.

**Final Answer:**

- Employee Profile: Server-side fetching using a Server Component.
- Recent Posts Preview: Server-side fetching using an async Server Component.
- Client Post Explorer: Client-side fetching triggered by a button click inside a Client Component.

## 2. What should remain visible while the server posts preview loads?

**My Prediction:**

Since the posts preview has its own loading area, the rest of the dashboard, including the profile and button, should remain visible.

**Final Answer:**

The Employee Profile, page title, introductory content, and Client Post Explorer should remain visible while the Recent Posts Preview is loading.


## 3. Will wrapping a click-handler fetch in Suspense automatically display its fallback?

**My Prediction:**

There is data that the user is waiting for after clicking, so I predict that Suspense will show its fallback.

**Final Answer:**

No. Suspense does not automatically detect ordinary asynchronous fetch operations started inside a click handler.For this client-side interaction, I use a loading state to display loading feedback while the request is running.

## 4. If an HTTP response has status 503, will `fetch` automatically throw?

**My Prediction:**

fetch can't automatically throw an error when it receives for example a 503 response.

**Final Answer:**

Fetch does not automatically throw an error for HTTP error responses such as 503.
It resolves with a Response object, so I must check `response.ok` and throw an error manually when the response is unsuccessful.
