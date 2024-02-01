import { useRef } from "react";

function Search({ doSearch}) {
  const searchBox = useRef(null);

  const search = function () {
    doSearch(searchBox.current.value);
  };

  return (
    <div className="row justify-content-left">
      <div className="search col-5">
        <div className="input-group mb-3 p-2">
          <input
            ref={searchBox}
            onKeyUp={search}
            type="text"
            className="form-control"
            placeholder="Search Facebook"
            aria
            label="Search"
            aria-describedby="button-addon2"
          ></input>
          <button
            className="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
          >
            <i className="bi bi-search me-3"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
export default Search;
