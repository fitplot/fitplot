# Nano IDs

Related Read:
[Why we chose NanoIDs for PlanetScale’s API](https://planetscale.com/blog/why-we-chose-nanoids-for-planetscales-api)

In an initial prototype of FitPlot, I used [Universally Unique Identifiers (UUIDs)](https://en.wikipedia.org/wiki/Universally_unique_identifier) for primary keys. This is a common choice. UUID's are nearly impossible to generate duplicates of with a massive collision space. The downside, however, is that they take up a lot of space in a URL:

```
fitplot.io/workout/123e4567-e89b-12d3-a456-426614174000
```

Try double clicking on that ID to select and copy it. Usually, you can't. A lot of text fields, renderers, and browsers interpret it as 5 different words.

It may seem minor, but we put love in every detail.

### Nano ID

Nano IDs provide an enticing alternative.

- Shorter than a UUID.
- Easy to select by double clicking.
- Low chance of collisions.
- Easy to generate in multiple programming languages (Node, Rust, and many more).

The choice is [NanoID](https://github.com/ai/nanoid).

Some examples:

```
izkpm55j334u
z2n60bhrj7e8
qoucu12dag1x
```

Which are then much more URL-friendly:

```
fitplot.io/workout/izkpm55j334u
```

### ID length and collisions

An ID collision is when the same ID is generated twice. If this happens seldomly, it’s not a big deal. The application can detect a collision, auto-generate a new ID, and move on. If this is happening often though, it can be a huge problem.

The longer and more complex the ID, the less likely it is to happen. Determining the complexity needed for the ID depends on the application. In our case, we used the NanoID collision tool and decided to use 12 character long IDs with the alphabet of 0123456789abcdefghijklmnopqrstuvwxyz.

This gives us a 1% probability of a collision in the next ~35 years if we are generating 1,000 IDs per hour.

If we ever need to increase this, the change would be as simple as increasing the length in our ID generator and updating our database schema to accept the new size.

To store our Nano ID schema, we can use a Prisma MySQL schema of

```prisma
model User {
  id @id @db.VarChar(12)

  // . . .
}
```

## Final Decision

I will be using server-generated Nano IDs as value for an ID field.

## Trade-Offs

The following trade-offs are acknowledged:

- A
- B
- C

Date: MMM DD, YYYY
