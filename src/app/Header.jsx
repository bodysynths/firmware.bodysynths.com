import { getAssetPath } from "./utils";

export default function Header() {
  return (
    <div className="card text-primary-content w-full">
      <a href="https://bodysynths.com/">
        <img src={getAssetPath("header.png")} alt="Example Image" />
      </a>
    </div>
  );
}
