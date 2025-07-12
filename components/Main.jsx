import { onAuthStateChanged } from "firebase/auth";
import { Tagline } from "../info";
import React, { useEffect, useState } from "react";
import auth from "../app/firebase";
import DatePicker from "react-datepicker";
import Form from "./Form";
import { useToken } from "../context/TokenContext";

const Main = () => {
  const [name, setName] = useState("");
  const { token } = useToken();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const name = user.displayName;
        const firstname = name.split(" ", 1)[0];
        setName(firstname);
      }
    });
    return () => unsubscribe();
  }, []);

  



  return (
    <div className="w-auto mx-10 flex items-center flex-col">
      <div className="mb-10">
        <h1 className="text-3xl lg:text-5xl  font-bold text-neutral-400 text-center mb-5">
          Welcome to EMSum{name ? `, ${name}` : ""}
        </h1>
        <p className="text-2xl text-center font-semibold text-neutral-500 ">
          {Tagline}
        </p>
      </div>
      {name ? (
        <Form />
      ) : (
        <div>
          <h1 className="text-2xl text-center font-semibold text-neutral-500">
            Please{" "}
            <a href="/auth" className="hover:underline">
              Sign in
            </a>{" "}
            to use EMSum
          </h1>
        </div>
      )}

    </div>
  );
};

export default Main;
