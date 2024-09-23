import { supabase } from "../config/supabaseClient";
import { useEffect, useState } from "react";
import SmoothieCardComp from "../components/Smoothies";

const Home = () => {
  const [error, setError] = useState(null);
  const [smoothies, setSmoothies] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("smoothies").select();

      if (error) {
        setError("Could not fetch the smoothies");
        setSmoothies(null);
        console.error(error);
      }

      if (data) {
        setSmoothies(data);
        setError(null);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="pages home">
      {setError && <p> {error}</p>}
      {smoothies && (
        <div className="smoothies">
          <div className="smoothie-grid">
            {" "}
            {smoothies.map((s) => (
              <SmoothieCardComp smoothie={s} key={s.id} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
