import "./LargeText.css";

export default function LargeText(props) {
  return props.isMainHeading ? (
    <h1 className={`${props.className} large-text`}>{props.text}</h1>
  ) : (
    <h2 className={`${props.className} large-text`}>{props.text}</h2>
  );
}
