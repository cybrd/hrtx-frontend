import { type Component, useContext } from "solid-js";
import { A } from "@solidjs/router";
import { AuthContext } from "../context/auth";

export const Menu: Component = () => {
  const auth = useContext(AuthContext);

  return (
    <div class="text-nowrap p-2 d-print-none">
      <div>
        <A href="/activity">Activity List</A>
      </div>
      <div>
        <A href="/member">Member List</A>
      </div>
      <div>
        <A href="/summary">Summary</A>
      </div>
      {auth.user()?.username && (
        <>
          <div>
            <A href="/activity/create">Activity Create</A>
          </div>
          <div>
            <A href="/member/create">Member Create</A>
          </div>
          <div>
            <A href="/logout">Logout</A>
          </div>
        </>
      )}
    </div>
  );
};
