import { Resource, Show, createResource, useContext } from "solid-js";
import { SetStoreFunction, createStore } from "solid-js/store";
import toast, { Toaster } from "solid-toast";
import { useNavigate, useParams } from "@solidjs/router";

import { Member, memberTeamList, memberWeaponList } from "../../models/member";
import { memberGet, memberUpdate } from "../../services/member";
import { AuthContext } from "../../context/auth";

const selectWeapon = (
  data: Resource<Member>,
  setFields: SetStoreFunction<Partial<Member>>
) => (
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
        {memberWeaponList.map((x) => {
          if (data()?.weapon === x) {
            return <option selected>{x}</option>;
          }

          return <option>{x}</option>;
        })}
      </select>
    </div>
  </div>
);

const selectTeam = (
  data: Resource<Member>,
  setFields: SetStoreFunction<Partial<Member>>
) => (
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
        {memberTeamList.map((x) => {
          if (data()?.team === x) {
            return <option selected>{x}</option>;
          }

          return <option>{x}</option>;
        })}
      </select>
    </div>
  </div>
);

const inputDiscordName = (
  data: Resource<Member>,
  setFields: SetStoreFunction<Partial<Member>>
) => (
  <div class="form-group row p-1 align-items-center">
    <label for="inputDiscordName" class="col-sm-2 form-label text-end">
      Discord Name
    </label>
    <div class="col-sm-4">
      <input
        id="inputDiscordName"
        class="form-control"
        onInput={(e) => setFields("discord_name", e.target.value)}
        value={data()?.discord_name}
      />
    </div>
  </div>
);

const inputIngameName = (
  data: Resource<Member>,
  setFields: SetStoreFunction<Partial<Member>>
) => (
  <div class="form-group row p-1 align-items-center">
    <label for="inputIngameName" class="col-sm-2 form-label text-end">
      Ingame Name
    </label>
    <div class="col-sm-4">
      <input
        id="inputIngameName"
        class="form-control"
        onInput={(e) => setFields("ingame_name", e.target.value)}
        value={data()?.ingame_name}
      />
    </div>
  </div>
);

export const Update = () => {
  const auth = useContext(AuthContext);
  const params = useParams();
  const navigate = useNavigate();

  const [data] = createResource(() => memberGet(params.id, auth.user()?.token));
  const [fields, setFields] = createStore<Partial<Member>>({});

  const submit = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    toast
      .promise(memberUpdate(params.id, fields as Member, auth.user()?.token), {
        error: "An error occurred 😔",
        loading: "Loading",
        success: <b>Done</b>,
      })
      .then(() => navigate(`/member`))
      .catch(console.error);
  };

  return (
    <Show when={data()}>
      <div>
        <form id="form" onSubmit={submit}>
          {inputDiscordName(data, setFields)}
          {inputIngameName(data, setFields)}
          {selectWeapon(data, setFields)}
          {selectTeam(data, setFields)}

          <div class="col-sm-6 text-center">
            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
        <Toaster />
      </div>
    </Show>
  );
};
