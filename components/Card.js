export default function Card({ main, avatar, artestName }) {
  return (
    <>
      <img src={main} className="MainImg" alt="" />
      <img className="avatar" src={avatar} alt="" />
      <p className="artestName">{artestName}</p>

      <div className="Upper">
        <button className="plus" type="button">
          {" "}
          ➕{" "}
        </button>
        <button className="like" type="button">
          ❤️
        </button>
      </div>
      <button className="down" type="button">
        🔽
      </button>
    </>
  );
}