# archiveAt logic

## on delete, archive exercise, find all archived exercises that are older than 10 days, remove all workoutsets on the archived exercises, set archivedAt date back to null

### Prisma schema file including archiveAt date on workout and exercise collections

```
generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["mongoDb"]
}

datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

model exercise {
  id         String                  @id @default(dbgenerated()) @map("_id") @db.ObjectId
  archivedAt DateTime?               @db.Date
  name       String
  userId     String
}

model workout {
  id         String                  @id @default(dbgenerated()) @map("_id") @db.ObjectId
  archivedAt DateTime?               @db.Date
  createdAt  DateTime                @default(now())
  name       String
  updatedAt  DateTime                @updatedAt
  userId     String
}

model workoutset {
  id         String   @id @default(dbgenerated()) @map("_id") @db.ObjectId
  amount     String
  createdAt  DateTime @default(now())
  exerciseId String
  unit       String
  updatedAt  DateTime @updatedAt
  userId     String
  volume     String
  workoutId  String
}
```

### archive exercise code file

```
import { StatusCodes } from 'http-status-codes';

import ArchiveExerciseRequest from '../../../../schemas/exercise/archive-exercise-request';
import {
  archiveExercise,
  deactivateArchivedExercise,
  findArchivedExercises,
} from '../../../../services/exercise';
import { findWorkoutSets } from '../../../../services/set';

export default async function handler(req, res) {
  const { method, body } = req;

  if (method === 'DELETE') {
    const { id: exerciseId, workoutId } = body;

    const { error: validationError } = ArchiveExerciseRequest.validate({ exerciseId, workoutId });
    if (validationError) return res.status(StatusCodes.BAD_REQUEST).send(validationError);

    // archive exercise
    const updatedExercise = await archiveExercise(exerciseId);
    // find all exercises that have archivedAt date > 10 days
    const exercisesToDelete = await findArchivedExercises();

    // find and remove all workout sets for each exercise that have archivedAt date > 10 days
    exercisesToDelete.forEach(async (exercise) => {
      await findWorkoutSets(exercise.id, workoutId);
      await deactivateArchivedExercise(exercise.id);
    });

    return res.status(StatusCodes.OK).send(updatedExercise);
  }

  return res.status(StatusCodes.METHOD_NOT_ALLOWED).send();
}
```

### Prisma queries to archive/find/remove exercise and workoutsets

```
export async function archiveExercise(id) {
  return prisma.exercise.update({
    where: {
      id,
    },
    data: {
      archivedAt: new Date(),
    },
  });
}
```

```
export async function findArchivedExercises() {
  const dateOffset = 24 * 60 * 60 * 1000 * 10;
  const deletionDate = new Date();
  deletionDate.setTime(deletionDate.getTime() - dateOffset);

  return prisma.exercise.findMany({
    where: {
      archivedAt: { lte: deletionDate },
    },
  });
}
```

```
export async function deactivateArchivedExercise(id) {
  return prisma.exercise.update({
    where: {
      id,
    },
    data: {
      archivedAt: null,
    },
  });
}
```
