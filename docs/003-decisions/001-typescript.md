# TypeScript

TypeScript is hella popular. I use it daily at my day job. It promises a variety of well-reasoned benefits that we don't need to review here, google them or check out [Matt Pocock's content](https://www.mattpocock.com/).

However, some reasons not to use TypeScript:

- This brand is driven by a small team that wants to move fast. I find TypeScript often requires an investment of time which is traded for stability for our users. (TODO: Find some users.)
- TypeScript is Turing complete - you can author Conway's Game of Life in types alone - it's type system well-featured and complex. I have found that at times TypeScript encourages authoring advanced types that are perhaps as complex as a feature itself.
- On a related note, these complex types can often be inter-dependent and leaky abastractions. Refactoring complex types that span an application can be a boulder task.
- Types can be a charade. Types can trick the developer into believing data from an API has a given shape or value, when in reality that guarantee only comes from runtime validation. Is the value you have from `window.location.search` or `fetch` actually the value you casted it as?
- TypeScript requires a transpile/compile/build step. I'd rather ship an artifact of bundled JS that looks a tad more like the code we wrote. One less moving part.

## Final Decision

We will be using JavaScript, `.js` file extensions (no `.jsx`), and a `jsconfig.json` file to support path aliasing. Zod will provide runtime type safety.

## Trade-Offs

The following trade-offs are acknowledged:

- There exists the possibility to follow an upgrade path in the future.
- Some awesome tech is on the horizon, such as running TypeScript natively in something like [Jarred Sumner's Bun](https://bun.sh/).
- Some tooling may be TypeScript-centric.

Date: Jul 19, 2023
