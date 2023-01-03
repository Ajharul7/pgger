import data from "../../constant/data.json";
import "../../styles/pg.css";
const Features = () => {
  const id1 = window.location.pathname;
  const idd = id1.replace("/pg/", "");
  const id = parseInt(idd);
  return (
    <>
      <h4 className="for-feature-page-h4">
        <div>
          {data
            .filter((val) => {
              if (val.id === id) {
                return val;
              } else {
                return 0;
              }
            })
            .map((val) => {
              return (
                <ol>
                  <li>{val.f1}</li>
                  <li>{val.f2}</li>
                  <li>{val.f3}</li>
                  <li>structured programming language </li>
                  <li>
                    Rich structured programming language structured programming
                    language structured programming language
                  </li>
                  <li>
                    Library Memory Rich structured programming language
                    structured
                  </li>
                  <li>
                    Management Fast Speed Rich structured programming language
                    structured
                  </li>
                  <li>
                    Pointers Recursion Extensible Rich structured programming
                    language structured
                  </li>
                </ol>
              );
            })}
        </div>
      </h4>
    </>
  );
};

export default Features;
