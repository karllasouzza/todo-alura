import { useEffect, useState } from "react";
import "./sub-heading.style.css";

export function SubHeading({ children }) {
  const [description, setDescription] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setDescription("This is a description");
    }, 200);
  }, []);

  if (!children) return <></>;

  return (
    <div>
      <h2 className="subheading">
        {children}

        {description && <p>{description}</p>}
      </h2>
      ;
    </div>
  );
}
