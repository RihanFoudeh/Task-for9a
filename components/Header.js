import { BiSearch } from "react-icons/bi";
export default function Header({getdata}) {
return  (
<div className="Header">
        <div className="search-box">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              getdata(e.target.name.value);
            }}
          >
            <button className="btn-search">
            
              <i className="fas fa-search">
                <BiSearch />
              </i>
            </button>
            <input
              type="text"
              className="input-search"
              name="name"
              placeholder="Type to Search..."
            />
          </form>
        </div>
      </div>
       
          )
         
         
         
         }