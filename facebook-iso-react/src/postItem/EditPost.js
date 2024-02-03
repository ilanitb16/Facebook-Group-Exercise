import "./PostItem.css";
import React, { useState, useRef } from "react";

function EditPost({ title, postList, setPostList}) {
    const [open, setOpen] = useState(false);
  const menuRef = useRef();
  const iconRef = useRef();

  window.addEventListener("click", (e) => {
    if (e.target !== menuRef.current && e.target !== iconRef.current) {
      setOpen(false);
    }
  });

  const removePost = () => {
    const updatedPosts = postList.filter((post) => post.title !== title);
    setPostList(updatedPosts);
  };

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
                <li key="edit" onClick={() => setOpen(!open)} className="fs-6">
                  <i className="bi bi-sliders"></i> Edit
                </li>
                <li key="delete" onClick={() => {setOpen(!open); removePost();}} className="fs-6">
                <i class="bi bi-trash3"></i>Delete
                </li>
              </ul>
            </div>
          )}
        </i>
      </div>
      
    </div>
  );
}

export default EditPost;
