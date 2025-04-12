import { Comment } from '@components/icon/Comment';
import Image from '@components/image';
import shake from '@utils/animation/shake';
import { motion, useAnimation } from 'framer-motion';
import React, { HTMLAttributes, MouseEvent, useCallback } from 'react';

type Props = HTMLAttributes<HTMLButtonElement> & {
  disabled?: boolean;
};

export function CommentIcon({ onClick, disabled, ...props }: Props) {
  const commentAnimationControl = useAnimation();

  const animateSequence = useCallback(async () => {
    commentAnimationControl.stop();
    commentAnimationControl.start({
      x: shake(3, 11),
      transition: { duration: 1 },
    });
  }, [commentAnimationControl]);

  const handleCommentButtonClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      onClick?.(e);
      animateSequence();
    },
    [animateSequence, onClick]
  );

  return (
    <Image.Root
      as="button"
      type="button"
      onClick={handleCommentButtonClick}
      css={{
        p: '$8',
        margin: '-8px',
      }}
      disabled={disabled}
      {...props}
    >
      <motion.div animate={commentAnimationControl}>
        <Comment />
      </motion.div>
    </Image.Root>
  );
}
