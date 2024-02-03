import "./PostItem.css";
import React, { useState } from "react";
import { useRef } from "react";

function EditPost({ title, author, description, date, author_photo, img }) {
  const PostEdit = ["edit", "delete"];
  const [open, setOpen] = useState(false);
  const menuRef = useRef();
  const iconRef = useRef();
  window.addEventListener("click", (e) => {
    if (e.target !== menuRef.current && e.target !== iconRef.current) {
      setOpen(false);
    }
  });
  return (
    <div className="col-3 d-flex justify-content-end align-items-center">
      <div className="w-90 text-end">
        <i
          className="bi bi-three-dots-vertical"
          style={{ fontSize: "1.6rem" }}
          ref={iconRef}
          onClick={() => setOpen(!open)}
        >
          {open && (
            <div ref={menuRef} className="absolute-left">
              <ul style={{ listStyleType: "none", padding: 0 }}>
                {PostEdit.map((option) => (
                  <h5 key={option}>
                    <li onClick={() => setOpen(!open)}>{option}</li>
                  </h5>
                ))}
              </ul>
            </div>
          )}
        </i>
      </div>
    </div>
  );
}
export default EditPost;
