import React, { useEffect, useState } from "react";
import "../../styles/user.css";
import { UserType } from "../AuthProvider";
import {
  DocumentData,
  QueryDocumentSnapshot,
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { Load } from "../Loading";

const Table = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot<
    DocumentData,
    DocumentData
  > | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsers = async (term = "", resetPagination = false) => {
    setLoading(true);
    let q = query(collection(db, "users"), orderBy("username"), limit(5));

    if (term) {
      q = query(
        collection(db, "users"),
        where("username", ">=", term),
        where("username", "<=", term + "\uf8ff"),
        orderBy("username"),
        limit(5)
      );
    }

    if (lastVisible && !resetPagination) {
      q = query(q, startAfter(lastVisible));
    }

    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      const usersArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as UserType[];
      setUsers(resetPagination ? usersArray : [...users, ...usersArray]);
      setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
      setHasMore(snapshot.docs.length === 5);
    } else {
      setHasMore(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers(searchTerm, true);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setLastVisible(null);
  };

  const handleDeleteUser = async (id: string) => {
    const confDele = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (confDele) {
      try {
        await deleteDoc(doc(db, "users", id)).then(async () => {
          await fetchUsers(searchTerm, true);
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="table-responsive">
      <div className="table-wrapper">
        <div className="table-title">
          <div className="d-flex justify-content-between">
            <div>
              <h2>
                User <b>Management</b>
              </h2>
            </div>
            <div className="position-relative">
              <input
                type="text"
                className="form-control"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <div
                onClick={() => fetchUsers(searchTerm, true)}
                className="position-absolute p-1 px-2 rounded search-icon"
                style={{
                  top: "2px",
                  right: "3px",
                  cursor: "pointer",
                  background: "#299be4",
                  border: "1px solid #eee",
                }}
              >
                <i className="fa-solid fa-magnifying-glass"></i>
              </div>
            </div>
          </div>
        </div>
        {loading ? (
          <>
            <div
              className="d-lg-none"
              style={{
                display: "flex",
                margin: "70px",
              }}
            >
              <Load />
            </div>
            <div
              className="d-none d-lg-flex"
              style={{
                justifyContent: "center",
                margin: "70px",
              }}
            >
              <Load />
            </div>
          </>
        ) : (
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Date Created</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody style={{ fontSize: "14px" }}>
              {users.map((user, index) => (
                <tr
                  key={index}
                  className={user?.role === "admin" ? "d-none" : ""}
                >
                  <td>{index + 1}</td>
                  <td>
                    <a
                      href="#"
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "100%",
                        display: "flex",
                        gap: "6px",
                        alignItems: "center",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <img
                        src={user.avatar}
                        className="w-100"
                        alt="Avatar"
                        style={{ borderRadius: "100%" }}
                      />{" "}
                      <span>{user.username}</span>
                    </a>
                  </td>
                  <td>{user.email}</td>
                  <td>
                    <span className={"text-black"}>{user.role || "user"}</span>
                  </td>
                  <td>{user?.timestamp}</td>
                  <td>
                    <a
                      href="#"
                      className="settings"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Edit"
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </a>
                    <a
                      onClick={() => handleDeleteUser(user.id)}
                      href="#"
                      className="delete"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Delete"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Table;
