# Package Manager

Today it's popular to consider options for a JavaScript package manager:

- npm
- yarn
- pnpm

In my experience, the limitations of npm are largely felt in a monorepo where node modules are installed in multiple workspaces and folders across a monorepo. This is where tools like pnpm shine, as they hash and link dependencies so each package is only downloaded one time.

`npm` has less-than-desirable behavior when working with workspaces. For example, `npm` will run jobs for all workspaces in a batch, but if one fails this does not block npm. Npm will continue until all tasks finish. This is difficult to work with in CI as the error messaging for the failed task can be buried beneath thousands of lines of output from other successful tasks.

However, pnpm comes with non-zero overhead. I find that more engineers are comfortable with npm by default, rather than having to use a reference to use pnpm and its filter commands.

## Final Decision

We will use npm over yarn or pnpm.

## Trade-Offs

The following trade-offs are acknowledged:

- We may reconsider this decision if/when pivoting to a monorepo.
- We may reconsider this decision if/when considering an alternative approach to manage node version (such as `pnpm env`).

Date: Aug 31, 2023
