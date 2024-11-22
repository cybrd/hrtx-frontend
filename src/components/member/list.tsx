import { Button, Modal } from "solid-bootstrap";
import { Index, createResource, createSignal, useContext } from "solid-js";
import toast, { Toaster } from "solid-toast";
import { A } from "@solidjs/router";

import { memberCounts, memberDelete, memberList } from "../../services/member";
import { AuthContext } from "../../context/auth";
import { Query } from "../../models/query";
import { sortBy } from "../helper/sort-by";

export const List = () => {
  const [show, setShow] = createSignal(false);
  const [modalMessage, setModalMessage] = createSignal("");
  const [modalId, setModalId] = createSignal("");
  const handleOpen = (message: string, id: string) => {
    setModalMessage(message);
    setModalId(id);
    setShow(true);
  };
  const handleClose = () => setShow(false);

  const auth = useContext(AuthContext);
  const [options] = createSignal<Query>({
    token: auth.user()?.token || "",
  });
  const [data, { mutate }] = createResource(() => options(), memberList);
  const [counts] = createResource(() => options(), memberCounts);

  const handleDelete = (id: string) => {
    toast
      .promise(memberDelete(id, auth.user()?.token), {
        error: "An error occurred 😔",
        loading: "Loading",
        success: <b>Deleted</b>,
      })
      .then(() => location.reload())
      .catch(console.error);
  };

  return (
    <>
      <p>Total Members: {counts()}</p>
      <table class="table table-striped table-hover table-bordered">
        <thead class="sticky-top bg-white p-2">
          <tr>
            <th onClick={sortBy(data, mutate, "discord_name")}>Discord Name</th>
            <th onClick={sortBy(data, mutate, "ingame_name")}>Ingame Name</th>
            <th onClick={sortBy(data, mutate, "weapon")}>Weapon</th>
            <th onClick={sortBy(data, mutate, "team")}>Team</th>
            <th>-</th>
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
                <td>{item().weapon}</td>
                <td>{item().team}</td>
                <td>
                  {auth.user()?.username && (
                    <>
                      <div>
                        <a
                          href="#"
                          onClick={() =>
                            handleOpen(
                              `${item().discord_name} ${item().ingame_name}`,
                              item().id
                            )
                          }
                        >
                          Delete
                        </a>
                      </div>
                      <div>
                        <A href={`/member/${item().id}?${options().query}`}>
                          Update
                        </A>
                      </div>
                    </>
                  )}
                </td>
              </tr>
            )}
          </Index>
        </tbody>
      </table>

      <Modal show={show()} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Record</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage()}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleDelete(modalId())}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <Toaster />
    </>
  );
};
