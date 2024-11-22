import { SetStoreFunction, createStore } from "solid-js/store";
import toast, { Toaster } from "solid-toast";
import { useContext } from "solid-js";

import { Member, memberTeamList, memberWeaponList } from "../../models/member";
import { AuthContext } from "../../context/auth";
import { memberCreate } from "../../services/member";

const selectWeapon = (setFields: SetStoreFunction<Partial<Member>>) => (
  <div class="form-group row p-1">
    <label for="selectWeapon" class="col-sm-2 form-label text-end">
      Weapon
    </label>
    <div class="col-sm-4">
      <select
        id="selectWeapon"
        onChange={(e) => setFields("weapon", e.target.value)}
      >
        <option value="">----</option>
        {memberWeaponList.map((x) => (
          <option>{x}</option>
        ))}
      </select>
    </div>
  </div>
);

const selectTeam = (setFields: SetStoreFunction<Partial<Member>>) => (
  <div class="form-group row p-1">
    <label for="selectTeam" class="col-sm-2 form-label text-end">
      Team
    </label>
    <div class="col-sm-4">
      <select
        id="selectTeam"
        onChange={(e) => setFields("team", e.target.value)}
      >
        <option value="">----</option>
        {memberTeamList.map((x) => (
          <option>{x}</option>
        ))}
      </select>
    </div>
  </div>
);

const inputDiscordName = (setFields: SetStoreFunction<Partial<Member>>) => (
  <div class="form-group row p-1 align-items-center">
    <label for="inputDiscordName" class="col-sm-2 form-label text-end">
      Discord Name
    </label>
    <div class="col-sm-4">
      <input
        id="inputDiscordName"
        class="form-control"
        onInput={(e) => setFields("discord_name", e.target.value)}
      />
    </div>
  </div>
);

const inputIngameName = (setFields: SetStoreFunction<Partial<Member>>) => (
  <div class="form-group row p-1 align-items-center">
    <label for="inputIngameName" class="col-sm-2 form-label text-end">
      Ingame Name
    </label>
    <div class="col-sm-4">
      <input
        id="inputIngameName"
        class="form-control"
        onInput={(e) => setFields("ingame_name", e.target.value)}
      />
    </div>
  </div>
);

export const Create = () => {
  const auth = useContext(AuthContext);

  let [fields, setFields] = createStore<Partial<Member>>({});

  const submit = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    toast
      .promise(memberCreate(fields as Member, auth.user()?.token), {
        error: "An error occurred 😔",
        loading: "Loading",
        success: <b>Done</b>,
      })
      .then(() => {
        const form = document.getElementById("form") as HTMLFormElement;
        form.reset();
        [fields, setFields] = createStore<Partial<Member>>({});
      })
      .catch(console.error);
  };

  return (
    <div>
      <form id="form" onSubmit={submit}>
        {inputDiscordName(setFields)}
        {inputIngameName(setFields)}
        {selectWeapon(setFields)}
        {selectTeam(setFields)}

        <div class="col-sm-6 text-center">
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
      <Toaster />
    </div>
  );
};
