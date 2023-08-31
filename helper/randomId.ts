export default function randomId() {
  return (Math.random() + 1).toString(36).substring(7);
}
