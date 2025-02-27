import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar/SIdebar";
import { Link } from "react-router-dom";
import { AuthContext } from "../components/AuthProvider";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import { doc, updateDoc, deleteDoc, getDoc } from "firebase/firestore";

const WithdrawRequest = () => {
  const [withdraw, setwithdraw] = useState<any>([]);

  const getData = async () => {
    try {
      await getDocs(collection(db, "withdraw")).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setwithdraw([...withdraw, { ...doc.data(), id: doc.id }]);
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Sidebar>
      <div>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Withdraw Request</h5>
            <div
              className="btn-group my-4"
              role="group"
              aria-label="Basic example"
            >
              <button type="button" className="btn btn-outline-primary">
                Process
              </button>
              <button type="button" className="btn btn-outline-success">
                Success
              </button>
              <button type="button" className="btn btn-outline-danger">
                Failed
              </button>
            </div>
            <div style={{ overflowX: "scroll" }}>
              <History data={withdraw} />
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default WithdrawRequest;

const History = ({ data }: { data: any[] }) => {
  const handleUpdate = async (id: string, amount: number, userId: string) => {
    try {
      // Update status di koleksi "deposit"
      const depositDocRef = doc(db, "deposit", id);
      await updateDoc(depositDocRef, {
        status: "success",
      });

      // Ambil dokumen user
      const userDocRef = doc(db, "users", userId);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const newBalance = userData.balance + amount;

        // Update balance di dokumen user
        await updateDoc(userDocRef, {
          balance: newBalance,
        });

        window.location.reload(); // Memuat ulang halaman setelah dokumen berhasil diperbarui
      } else {
        console.log("User document does not exist");
      }
    } catch (error) {
      console.log("Error updating document: ", error);
    }
  };

  const handleWithdraw = async (id: string, amount: number, userId: string) => {
    try {
      // Update status di koleksi "withdraw"
      const withdrawDocRef = doc(db, "withdraw", id);
      await updateDoc(withdrawDocRef, {
        status: "success",
      });

      // Ambil dokumen user
      const userDocRef = doc(db, "users", userId);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const newBalance = userData.balance - amount || amount;

        // Update balance di dokumen user
        await updateDoc(userDocRef, {
          balance: newBalance,
        });

        window.location.reload(); // Memuat ulang halaman setelah dokumen berhasil diperbarui
      } else {
        console.log("User document does not exist");
      }
    } catch (error) {
      console.log("Error updating document: ", error);
    }
  };

  const handleDelete = async (id: string) => {
    const confUpdate = window.confirm("Are You Sure?");
    if (confUpdate) {
      try {
        await deleteDoc(doc(db, "deposit", id)).then(() => {
          window.location.reload();
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <table className="table table-striped" style={{ minWidth: "1000px" }}>
      <thead>
        <tr>
          <th>No</th>
          <th>User</th>
          <th>Amount</th>
          <th>Payment Method</th>
          <th>Acc Number</th>
          <th>Acc Name</th>
          <th>Status</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((notification, index) => (
          <tr key={index} style={{ fontSize: "14px" }}>
            <td>{index + 1}</td>
            <td>{notification?.username}</td>
            <td>${notification?.amount}</td>
            <td>{notification?.paymentMethod}</td>
            <td>{notification?.accountNumber}</td>
            <td>{notification?.accountName}</td>
            <td>{notification?.status}</td>
            <td>
              {notification?.createdAt?.toDate()?.toDateString() ||
                notification?.date?.toDate()?.toDateString()}
            </td>
            <td>
              {notification?.type === "deposit" && (
                <div
                  onClick={() =>
                    handleUpdate(
                      notification?.id,
                      notification?.amount,
                      notification?.userId
                    )
                  }
                  className="btn btn-primary"
                >
                  CONFIRM DEPOSIT
                </div>
              )}
              <div
                onClick={() =>
                  handleWithdraw(
                    notification?.id,
                    notification?.amount,
                    notification?.userId
                  )
                }
                className="btn btn-primary"
              >
                CONFIRM
              </div>
              <div
                onClick={() => handleDelete(notification?.id)}
                className="btn btn-danger"
              >
                DELETE
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
