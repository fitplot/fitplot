import { NextResponse } from 'next/server';

/** @typedef {import('next/server').NextRequest} NextRequest */

// TODO: fix chalk = require('next/dist/compiled/chalk');
const chalk = {};
chalk.gray = chalk.bold = (identity) => identity;

/**
 * Middleware for the Next.js server.
 *
 * @param {NextRequest} request
 */
export function middleware(request) {
  const start = Date.now();
  console.log(
    '  ' +
      chalk.gray('<--') +
      ' ' +
      chalk.bold(request.method) +
      ' ' +
      chalk.gray(request.nextUrl.pathname),
  );

  NextResponse.next();

  const duration = Date.now() - start;
  console.log(
    '  ' +
      chalk.gray('-->') +
      ' ' +
      chalk.bold(request.method) +
      ' ' +
      chalk.gray(request.nextUrl.pathname) +
      ' ' +
      chalk.gray(duration) +
      'ms',
  );
}
