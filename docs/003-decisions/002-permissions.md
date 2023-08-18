# Permissions

[Role Based Access Control (RBAC)](https://auth0.com/intro-to-iam/what-is-role-based-access-control-rbac) is a common approach to permissions. It is a proven and flexible approach that fits a variety of use cases. As a more established approach it's also easier to find resources to learn about and understand it.

## Final Decision

We implement a RBAC model in Prisma.

```prisma
model Permission {
  id String @id @db.VarChar(12)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  action      String // e.g. create, read, update, delete
  entity      String // e.g. workout, org, user, etc.
  access      String // e.g. own or any
  description String @default("")
  roles       Role[]

  @@unique([action, entity, access])
}

model Role {
  id String @id @db.VarChar(12)

  archivedAt DateTime?
  createdAt  DateTime  @default(now())
  updatedAt  DateTime  @updatedAt

  name        String       @db.Text
  users       User[]
  permissions Permission[]
}

model User {
  id String @id @db.VarChar(12)

  // . . .

  connections   Connection[]
  roles         Role[]
}
```

This provides us fine-tuned controled over permissions. Additionally, we can create utilities for determining whether a user has permission to perform an action and disallow them from doing so if they do not.

## Trade-Offs

RBAC is a solid, widely adopted model. I feel pretty solid that there are few-to-none trade-offs.

One possible alternative may be to outsource a permission model to a user SaaS service, something like [Clerk.dev](https://clerk.dev) which comes at a cost. Acknowledging this, we will roll our own here.

Date: Aug 17, 2023
