import { Button } from 'components/ui/button';
import { Textarea } from 'components/ui/textarea';
import type { FC } from 'react';
import { useState } from 'react';

import styles from './comment-form.module.scss';

export type CommentFormProps = {
  /** Отправка текста комментария (родитель сам знает root или reply по контексту). */
  onSubmit: (text: string) => void;
  /** Отмена (закрыть форму, сбросить ответ). */
  onCancel: () => void;
  placeholder?: string;
  loading?: boolean;
};

export const CommentForm: FC<CommentFormProps> = ({
  onSubmit,
  onCancel,
  placeholder = 'Введите комментарий...',
  loading = false,
}) => {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
    setText('');
  };

  const handleCancel = () => {
    setText('');
    onCancel();
  };

  return (
    <div className={styles.root}>
      <Textarea
        value={text}
        onChange={setText}
        placeholder={placeholder}
        rows={3}
        disabled={loading}
      />
      <div className={styles.actions}>
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={!text.trim() || loading}
          loading={loading}
        >
          Отправить
        </Button>
        <Button variant="ghost" onClick={handleCancel} disabled={loading}>
          Отменить
        </Button>
      </div>
    </div>
  );
};
