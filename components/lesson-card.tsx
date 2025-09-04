import Link from 'next/link';
import styles from './lesson-card.module.css'; // Using CSS Modules for scoped styles

type LessonCardProps = {
  title: string;
  description: string;
  slug: string;
  isCompleted: boolean;
};

export default function LessonCard({ title, description, slug, isCompleted }: LessonCardProps) {
  return (
    <div className={styles.card}>
      <h3>{title}</h3>
      <p>{description}</p>
      {isCompleted ? (
        <span className={styles.completed}>Completed</span>
      ) : (
        <Link href={`/lessons/${slug}`} className={styles.link}>
          Start Lesson
        </Link>
      )}
    </div>
  );
}