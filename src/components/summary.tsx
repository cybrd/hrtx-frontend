import { A, Route } from "@solidjs/router";
import {
  For,
  ParentComponent,
  createResource,
  createSignal,
  useContext,
} from "solid-js";
import { Title } from "@solidjs/meta";

import { AuthContext } from "../context/auth";
import { Query } from "../models/query";
import { sortBy } from "./helper/sort-by";
import { summary } from "../services/summary";

export const Summary = () => (
  <Route path="/summary" component={SummaryWrapper}>
    <Route path="/" component={List} />
  </Route>
);

export const SummaryWrapper: ParentComponent = (props) => (
  <div>
    <Title>Activity</Title>
    {props.children}
  </div>
);

export const List = () => {
  const auth = useContext(AuthContext);
  const [options, _] = createSignal<Query>({
    token: auth.user()?.token || "",
  });
  const [data, { mutate }] = createResource(() => options(), summary);

  return (
    <table class="table table-striped table-hover table-bordered">
      <thead class="sticky-top bg-white p-2">
        <tr>
          <th onClick={sortBy(data, mutate, "discord_name")}>Discord Name</th>
          <th onClick={sortBy(data, mutate, "ingame_name")}>Ingame Name</th>
          <th onClick={sortBy(data, mutate, "weapon")}>Weapon</th>
          <th onClick={sortBy(data, mutate, "team")}>Team</th>
          <th onClick={sortBy(data, mutate, "available_points")}>
            Available Points
          </th>
          <th onClick={sortBy(data, mutate, "available_archboss_points")}>
            Available Points (Archboss)
          </th>
          <th onClick={sortBy(data, mutate, "total_points")}>Total Points</th>
        </tr>
      </thead>
      <tbody>
        <For each={data()}>
          {(item) => (
            <tr>
              <td>{item.discord_name}</td>
              <td>
                <A href={`/member/${item.id}/activity`}>{item.ingame_name}</A>
              </td>
              <td>{item.weapon}</td>
              <td>{item.team}</td>
              <td>{item.available_points}</td>
              <td>{item.available_archboss_points}</td>
              <td>{item.total_points}</td>
            </tr>
          )}
        </For>
      </tbody>
    </table>
  );
};
