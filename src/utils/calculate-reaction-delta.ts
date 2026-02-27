import { REACTION, type ReactionType } from 'types/articles.type.ts';

export type ReactionDelta = {
  likeDelta: number;
  dislikeDelta: number;
  isToggleOff: boolean;
};

export const calculateReactionDelta = (
  currentReaction: ReactionType | null,
  newType: ReactionType
): ReactionDelta => {
  let likeDelta = 0;
  let dislikeDelta = 0;
  const isToggleOff = currentReaction === newType;

  if (isToggleOff) {
    if (newType === REACTION.LIKE) likeDelta = -1;
    else dislikeDelta = -1;
  } else if (currentReaction === null) {
    if (newType === REACTION.LIKE) likeDelta = 1;
    else dislikeDelta = 1;
  } else {
    likeDelta = newType === REACTION.LIKE ? 1 : -1;
    dislikeDelta = newType === REACTION.DISLIKE ? 1 : -1;
  }

  return { likeDelta, dislikeDelta, isToggleOff };
};
