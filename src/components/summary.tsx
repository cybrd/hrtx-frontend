import { A, Route } from "@solidjs/router";
import {
  Index,
  ParentComponent,
  createResource,
  createSignal,
  useContext,
} from "solid-js";
import { Title } from "@solidjs/meta";

import { AuthContext } from "../context/auth";
import { Query } from "../models/query";
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
  const [data] = createResource(() => options(), summary);

  return (
    <table class="table table-striped table-hover table-bordered">
      <thead class="sticky-top bg-white p-2">
        <tr>
          <th>Discord Name</th>
          <th>Ingame Name</th>
          <th>Available Points</th>
          <th>Available Points (Archboss)</th>
          <th>Total Points</th>
        </tr>
      </thead>
      <tbody>
        <Index each={data()}>
          {(item) => (
            <tr>
              <td>{item().discord_name}</td>
              <td>
                <A href={`/member/${item().id}/activity`}>
                  {item().ingame_name}
                </A>
              </td>
              <td>{item().available_points}</td>
              <td>{item().available_archboss_points}</td>
              <td>{item().total_points}</td>
            </tr>
          )}
        </Index>
      </tbody>
    </table>
  );
};
