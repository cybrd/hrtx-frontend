import { A, useSearchParams } from "@solidjs/router";
import { Button, Modal } from "solid-bootstrap";
import { Index, createResource, createSignal, useContext } from "solid-js";
import toast, { Toaster } from "solid-toast";

import { memberDelete, memberList } from "../../services/member";
import { AuthContext } from "../../context/auth";
import { Query } from "../../models/query";
import { setParamsAndOptions } from "../helper/params";

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
  const [searchParams, setSearchParams] = useSearchParams();
  const [options, setOptions] = createSignal<Query>({
    token: auth.user()?.token || "",
  });
  const [data] = createResource(() => options(), memberList);

  const handleDelete = (id: string) => {
    toast
      .promise(memberDelete(id, auth.user()?.token), {
        error: "An error occurred 😔",
        loading: "Loading",
        success: <b>Deleted</b>,
      })
      .then(() => {
        setParamsAndOptions(
          setOptions,
          setSearchParams
        )({ page: searchParams.page || "1" });
        handleClose();
      })
      .catch(console.error);
  };

  return (
    <>
      <table class="table table-striped table-hover table-bordered">
        <thead class="sticky-top bg-white p-2">
          <tr>
            <th>Discord Name</th>
            <th>Ingame Name</th>
            <th>-</th>
          </tr>
        </thead>
        <tbody>
          <Index each={data()}>
            {(item) => (
              <tr>
                <td>{item().discord_name}</td>
                <td>{item().ingame_name}</td>
                <td>
                  {auth.user() && (
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
                  )}
                  <div>
                    <A href={`/member/${item().id}?${options().query}`}>
                      Update
                    </A>
                  </div>
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
