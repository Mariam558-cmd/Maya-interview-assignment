- Where will each of the three requests run?
employee profile and recent posts preview the request will run on server-side fetching
 while exploring posts after a button click the request will run on client-side fetching


- What should remain visible while the server posts preview loads?
since the posts preview has its own laoding area so the rest of dahsboard (profile,button) should remain visible


- Will wrapping a click-handler fetch in Suspense automatically display its fallback?
There is data that the user is waiting for after click, so I predict that Suspense will show its fallback.


- If an HTTP response has status 503, will `fetch` automatically throw?
I predict that fetch will automatically throw an error when it receives a 503 response.