import styles from './fetchErrorMessage.module.css';

type Props = {
  error: Error | any;
};

export default function FetchErrorMessage({ error }: Props) {
  return (
    <div className={styles.message}>
      <p>Oops, Something error !!! 😱</p>
      <p>{error?.message}</p>
    </div>
  );
}