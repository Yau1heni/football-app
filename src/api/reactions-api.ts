import { db } from 'configs/firebase-config.ts';
import type { DocumentReference } from 'firebase/firestore';
import { getDoc, writeBatch, increment } from 'firebase/firestore';
import type { ReactionType } from 'types/articles.type.ts';
import { calculateReactionDelta } from 'utils/calculate-reaction-delta.ts';

export type SetUserReactionParams = {
  /** Ссылка на документ реакции пользователя (например articles/{id}/reactions/{userId}) */
  reactionRef: DocumentReference;
  /** Ссылка на родительский документ с полями likesCount и dislikesCount */
  parentRef: DocumentReference;
  /** Тип реакции: like | dislike */
  type: ReactionType;
};

export type GetUserReactionParams<T> = {
  /** Ссылка на документ реакции пользователя c нужным конвертером */
  reactionRef: DocumentReference<T>;
};

export const reactionsApi = {
  setUserReaction: async (params: SetUserReactionParams): Promise<void> => {
    const { reactionRef, parentRef, type } = params;

    const snapshot = await getDoc(reactionRef);
    const currentType = (snapshot.exists() ? snapshot.data().type : null) as ReactionType | null;

    const { likeDelta, dislikeDelta, isToggleOff } = calculateReactionDelta(currentType, type);

    const batch = writeBatch(db);

    if (isToggleOff) {
      batch.delete(reactionRef);
    } else {
      batch.set(reactionRef, { type });
    }

    if (likeDelta !== 0 || dislikeDelta !== 0) {
      const updateData: Record<string, ReturnType<typeof increment>> = {};
      if (likeDelta !== 0) updateData.likesCount = increment(likeDelta);
      if (dislikeDelta !== 0) updateData.dislikesCount = increment(dislikeDelta);
      batch.update(parentRef, updateData);
    }

    await batch.commit();
  },

  getUserReaction: async <T>({ reactionRef }: GetUserReactionParams<T>): Promise<T | null> => {
    const snapshot = await getDoc(reactionRef);
    if (!snapshot.exists()) return null;
    return snapshot.data();
  },
};
